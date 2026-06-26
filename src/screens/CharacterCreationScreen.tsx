import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Switch,
} from 'react-native';
import { Alert } from '../utils/alert';
import { Character, BaseStats, HP, Resources, EquipmentItem } from '../types/character';
import { StorageService } from '../services/storage';
import {
  CLASSES_LIST,
  RACES_LIST,
  SKILLS_LIST,
  WEAPON_TEMPLATES,
  ARMOR_TEMPLATES,
  getSpellSlotsForClass,
  BACKGROUNDS_LIST,
  getHitDieType,
  getSpellLimit,
  getArmorCategory,
} from '../utils/dndRules';
import { SPELLS_DATABASE, Spell } from '../utils/dndSpells';
import { Ionicons } from '@expo/vector-icons';

interface CharacterCreationScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

type StepType = 1 | 2 | 3 | 4 | 5; // 1: Info, 2: Stats, 3: Perícias, 4: Equipamentos, 5: Magias

export const CharacterCreationScreen: React.FC<CharacterCreationScreenProps> = ({ onBack, onSuccess }) => {
  const [step, setStep] = useState<StepType>(1);

  // Step 1: Info
  const [name, setName] = useState('');
  const [selectedClass, setSelectedClass] = useState('Paladino');
  const [selectedSubclass, setSelectedSubclass] = useState('Juramento de Devoção');
  const [selectedRace, setSelectedRace] = useState('Humano');
  const [selectedBackground, setSelectedBackground] = useState('Acólito (Acolyte)');
  const [level, setLevel] = useState(5);

  // Step 2: Stats (Standard Array allocation)
  const standardArrayValues = [15, 14, 13, 12, 10, 8];
  const [stats, setStats] = useState<Record<keyof BaseStats, number>>({
    str: 15,
    dex: 14,
    con: 13,
    int: 12,
    wis: 10,
    cha: 8,
  });

  // Step 3: Skills (Defaulting to Acolyte skills)
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Insight', 'Religion']);

  // Step 4: Equipment
  const [selectedWeaponIdx, setSelectedWeaponIdx] = useState(0);
  const [selectedArmorIdx, setSelectedArmorIdx] = useState(1); // Default Chain Mail
  const [hasShield, setHasShield] = useState(true);

  // Step 5: Spells
  const [selectedSpells, setSelectedSpells] = useState<string[]>([]);

  const selectedClassObj = CLASSES_LIST.find(c => c.name === selectedClass);

  // Helpers to check spell slots limit
  const getMaxSpellLevel = (className: string, lvl: number): number => {
    if (className === 'Paladino' || className === 'Patrulheiro') {
      if (lvl >= 5) return 2;
      if (lvl >= 2) return 1;
      return 0;
    }
    if (['Clérigo', 'Mago', 'Bardo', 'Druida', 'Feiticeiro', 'Bruxo'].includes(className)) {
      if (lvl >= 5) return 3;
      if (lvl >= 3) return 2;
      return 1;
    }
    if (className === 'Artífice') {
      if (lvl >= 5) return 2;
      return 1;
    }
    return 0;
  };

  const maxSpellLevel = getMaxSpellLevel(selectedClass, level);
  const prepLimit = getSpellLimit(selectedClass, level, stats);

  const availableSpells = SPELLS_DATABASE.filter(
    s => s.classes.includes(selectedClass) && s.level <= maxSpellLevel
  );

  const isSpellcaster = ['Paladino', 'Clérigo', 'Mago', 'Bardo', 'Druida', 'Feiticeiro', 'Bruxo', 'Patrulheiro', 'Artífice'].includes(selectedClass);

  const selectedPreparedCount = selectedSpells.filter(name => {
    const s = SPELLS_DATABASE.find(sd => sd.name === name);
    return s && s.level > 0;
  }).length;

  // Handles standard array assignment and resolves duplicates by swapping
  const handleAssignStatValue = (targetStat: keyof BaseStats, value: number) => {
    const duplicateStat = (Object.keys(stats) as Array<keyof BaseStats>).find(
      s => s !== targetStat && stats[s] === value
    );

    setStats(prev => {
      const updated = { ...prev };
      if (duplicateStat) {
        updated[duplicateStat] = prev[targetStat];
      }
      updated[targetStat] = value;
      return updated;
    });
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill);
      } else {
        return [...prev, skill];
      }
    });
  };

  const toggleSpellSelection = (spellName: string) => {
    const spell = SPELLS_DATABASE.find(s => s.name === spellName);
    if (!spell) return;

    const isCantrip = spell.level === 0;

    setSelectedSpells(prev => {
      if (prev.includes(spellName)) {
        return prev.filter(s => s !== spellName);
      } else {
        // Enforce preparation limit for non-cantrips
        if (!isCantrip && selectedPreparedCount >= prepLimit) {
          Alert.alert(
            'Limite Atingido',
            `Você só pode preparar no máximo ${prepLimit} magias (excluindo truques).`
          );
          return prev;
        }
        return [...prev, spellName];
      }
    });
  };

  // Helper to calculate HP based on D&D 5e class rules and Constitution
  const calculateHP = (conValue: number): HP => {
    const conMod = Math.floor((conValue - 10) / 2);
    const cls = CLASSES_LIST.find(c => c.name === selectedClass);
    
    let hitDie = 10;
    if (cls?.hd === 'd12') hitDie = 12;
    if (cls?.hd === 'd8') hitDie = 8;
    if (cls?.hd === 'd6') hitDie = 6;

    const lvl1Hp = hitDie + conMod;
    const avgHpPerLevel = Math.floor(hitDie / 2) + 1 + conMod;
    const totalMax = lvl1Hp + avgHpPerLevel * (level - 1);

    return {
      current: totalMax,
      max: totalMax,
      temp: 0,
    };
  };

  // Calculate starting Armor Class from starting gear according to rules
  const calculateStartingAC = (): number => {
    const dexMod = Math.floor((stats.dex - 10) / 2);
    const armor = ARMOR_TEMPLATES.filter(a => a.type === 'armor')[selectedArmorIdx];
    
    let ac = 10 + dexMod;
    if (armor) {
      const category = getArmorCategory(armor.name);
      
      if (category === 'heavy') {
        ac = armor.acBonus;
      } else if (category === 'medium') {
        ac = armor.acBonus + Math.min(2, dexMod);
      } else {
        ac = armor.acBonus + dexMod;
      }
    }
    
    if (hasShield && (!WEAPON_TEMPLATES[selectedWeaponIdx] || WEAPON_TEMPLATES[selectedWeaponIdx].handedness !== '2 Mãos')) {
      ac += 2;
    }

    return ac;
  };

  const handleSaveCharacter = async () => {
    if (!name.trim()) {
      Alert.alert('Erro', 'Por favor, digite o nome do personagem.');
      return;
    }

    const calculatedHp = calculateHP(stats.con);
    const startingBaseAC = calculateStartingAC();

    const customResources: any[] = [];
    if (selectedClass === 'Paladino') {
      customResources.push(
        { id: 'lay_on_hands', name: 'Mãos Milagrosas (HP)', current: level * 5, max: level * 5 },
        { id: 'channel_divinity', name: 'Canalizar Divindade', current: 1, max: 1 }
      );
    } else if (selectedClass === 'Guerreiro') {
      customResources.push(
        { id: 'second_wind', name: 'Retomar o Fôlego', current: 1, max: 1 }
      );
      if (level >= 2) {
        customResources.push({ id: 'action_surge', name: 'Surto de Ação', current: 1, max: 1 });
      }
    } else if (selectedClass === 'Clérigo') {
      customResources.push(
        { id: 'channel_divinity', name: 'Canalizar Divindade', current: 1, max: 1 }
      );
    } else if (selectedClass === 'Bárbaro') {
      const rageCounts = level >= 6 ? 4 : (level >= 3 ? 3 : 2);
      customResources.push(
        { id: 'rage', name: 'Fúrias (Rages)', current: rageCounts, max: rageCounts }
      );
    } else if (selectedClass === 'Bardo') {
      const chaMod = Math.max(1, Math.floor((stats.cha - 10) / 2));
      customResources.push(
        { id: 'bardic_inspiration', name: 'Inspiração Bárdica', current: chaMod, max: chaMod }
      );
    } else if (selectedClass === 'Druida') {
      customResources.push(
        { id: 'wild_shape', name: 'Forma Selvagem (Wild Shape)', current: 2, max: 2 }
      );
    } else if (selectedClass === 'Monge') {
      customResources.push(
        { id: 'ki_points', name: 'Pontos de Chi', current: level, max: level }
      );
    } else if (selectedClass === 'Feiticeiro' && level >= 2) {
      customResources.push(
        { id: 'sorcery_points', name: 'Pontos de Feitiçaria', current: level, max: level }
      );
    }

    const generatedId = Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
    const equipment: EquipmentItem[] = [];
    
    // Weapon assignment using rules stats
    const weaponTemplate = WEAPON_TEMPLATES[selectedWeaponIdx];
    if (weaponTemplate) {
      const strMod = Math.floor((stats.str - 10) / 2);
      const dexMod = Math.floor((stats.dex - 10) / 2);
      const isFinesse = weaponTemplate.properties.some(p => p.toLowerCase().includes('acuidade') || p.toLowerCase().includes('finesse'));
      
      // Dex modifier used for finesse if higher, or for ranged weapons
      const isRanged = weaponTemplate.rangeType === 'À Distância';
      let mod = strMod;
      if (isRanged) {
        mod = dexMod;
      } else if (isFinesse) {
        mod = Math.max(strMod, dexMod);
      }
      const modStr = mod >= 0 ? `+${mod}` : `${mod}`;

      equipment.push({
        id: 'eq-w-' + generatedId,
        name: weaponTemplate.name,
        type: 'weapon',
        equipped: true,
        dmgDice: `${weaponTemplate.dmgDice}${modStr}`,
        dmgType: weaponTemplate.dmgType,
        handedness: weaponTemplate.handedness,
        properties: weaponTemplate.properties,
      });
    }

    // Armor
    const armorTemplate = ARMOR_TEMPLATES.filter(a => a.type === 'armor')[selectedArmorIdx];
    if (armorTemplate) {
      equipment.push({
        id: 'eq-a-' + generatedId,
        name: armorTemplate.name,
        type: 'armor',
        equipped: true,
        acBonus: armorTemplate.acBonus,
      });
    }

    // Shield
    if (hasShield && weaponTemplate?.handedness !== '2 Mãos') {
      equipment.push({
        id: 'eq-s-' + generatedId,
        name: 'Escudo',
        type: 'shield',
        equipped: true,
        acBonus: 2,
      });
    }

    const characterClassFull = selectedSubclass ? `${selectedClass} (${selectedSubclass})` : selectedClass;

    const characterData: Character = {
      id: generatedId,
      name: name.trim(),
      characterClass: characterClassFull,
      level,
      baseStats: stats,
      hp: calculatedHp,
      combat: {
        baseArmorClass: startingBaseAC,
        shieldOfFaithActive: false,
      },
      resources: {
        spellSlots: getSpellSlotsForClass(selectedClass, level),
        customResources,
      },
      proficiencies: selectedSkills,
      preparedSpells: selectedSpells,
      equipment,
      background: selectedBackground,
      coins: { cp: 0, sp: 0, ep: 0, gp: 100, pp: 0 },
      hitDice: {
        current: level,
        dieType: getHitDieType(selectedClass)
      },
    };

    try {
      await StorageService.saveCharacter(characterData);
      Alert.alert('Sucesso', `${name} foi criado com sucesso!`);
      onSuccess();
    } catch (e: any) {
      Alert.alert('Erro na Validação', e.message);
    }
  };

  const isWeapon2H = WEAPON_TEMPLATES[selectedWeaponIdx]?.handedness === '2 Mãos';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#F8FAFC" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Criação de Personagem</Text>
          <Text style={styles.headerSubtitle}>Passo {step} de 5</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepTitle}>Informações Básicas</Text>
            
            <Text style={styles.label}>Nome do Herói</Text>
            <TextInput
              style={styles.input}
              placeholder="ex: Lancelot, Aragorn"
              placeholderTextColor="#475569"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Classe</Text>
            <View style={styles.pickerRowWrap}>
              {CLASSES_LIST.map(c => (
                <TouchableOpacity
                  key={c.name}
                  style={[styles.pickerBtnWrap, selectedClass === c.name && styles.pickerBtnActive]}
                  onPress={() => {
                    setSelectedClass(c.name);
                    setSelectedSpells([]); // Reset spell selections when class changes
                    if (c.subclasses && c.subclasses.length > 0) {
                      setSelectedSubclass(c.subclasses[0]);
                    } else {
                      setSelectedSubclass('');
                    }
                  }}
                >
                  <Text style={[styles.pickerLabel, selectedClass === c.name && styles.pickerLabelActive]}>
                    {c.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedClassObj?.subclasses && selectedClassObj.subclasses.length > 0 && (
              <>
                <Text style={styles.label}>Arquétipo / Subclasse</Text>
                <View style={styles.pickerRowWrap}>
                  {selectedClassObj.subclasses.map(sub => (
                    <TouchableOpacity
                      key={sub}
                      style={[styles.pickerBtnWrap, { width: '48%' }, selectedSubclass === sub && styles.pickerBtnActive]}
                      onPress={() => setSelectedSubclass(sub)}
                    >
                      <Text style={[styles.pickerLabel, selectedSubclass === sub && styles.pickerLabelActive]} numberOfLines={1}>
                        {sub}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            <Text style={styles.label}>Raça</Text>
            <View style={styles.pickerRowWrap}>
              {RACES_LIST.map(r => (
                <TouchableOpacity
                  key={r}
                  style={[styles.pickerBtnWrap, selectedRace === r && styles.pickerBtnActive]}
                  onPress={() => setSelectedRace(r)}
                >
                  <Text style={[styles.pickerLabel, selectedRace === r && styles.pickerLabelActive]}>
                    {r}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Antecedente</Text>
            <View style={styles.pickerRowWrap}>
              {BACKGROUNDS_LIST.map(bg => (
                <TouchableOpacity
                  key={bg.name}
                  style={[styles.pickerBtnWrap, { width: '48%' }, selectedBackground === bg.name && styles.pickerBtnActive]}
                  onPress={() => {
                    setSelectedBackground(bg.name);
                    setSelectedSkills(prev => {
                      const allBackgroundSkills = BACKGROUNDS_LIST.reduce<string[]>((acc, b) => [...acc, ...b.skills], []);
                      const baseSkills = prev.filter(s => !allBackgroundSkills.includes(s));
                      return [...baseSkills, ...bg.skills];
                    });
                  }}
                >
                  <Text style={[styles.pickerLabel, selectedBackground === bg.name && styles.pickerLabelActive]} numberOfLines={1}>
                    {bg.name.split(' (')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>Nível (1 - 6)</Text>
            <View style={styles.levelRow}>
              {[1, 2, 3, 4, 5, 6].map(lvl => (
                <TouchableOpacity
                  key={lvl}
                  style={[styles.lvlBtn, level === lvl && styles.lvlBtnActive]}
                  onPress={() => {
                    setLevel(lvl);
                    setSelectedSpells([]); // Reset spells when level shifts slots
                  }}
                >
                  <Text style={[styles.lvlLabel, level === lvl && styles.lvlLabelActive]}>
                    {lvl}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* STEP 2: Stats Assignment */}
        {step === 2 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepTitle}>Atribuição de Status (Standard Array)</Text>
            <Text style={styles.stepDesc}>
              Distribua os valores padrão: 15, 14, 13, 12, 10 e 8 entre os atributos do seu herói.
            </Text>

            {(Object.keys(stats) as Array<keyof BaseStats>).map(stat => (
              <View key={stat} style={styles.statAssignRow}>
                <View style={styles.statAssignMeta}>
                  <Text style={styles.statAssignLabel}>{stat.toUpperCase()}</Text>
                  <Text style={styles.statAssignSub}>
                    Mod: {Math.floor((stats[stat] - 10) / 2) >= 0 ? '+' : ''}
                    {Math.floor((stats[stat] - 10) / 2)}
                  </Text>
                </View>

                {/* Score values selector */}
                <View style={styles.arraySelector}>
                  {standardArrayValues.map(val => {
                    const isSelected = stats[stat] === val;
                    return (
                      <TouchableOpacity
                        key={val}
                        style={[styles.arrayValBtn, isSelected && styles.arrayValBtnActive]}
                        onPress={() => handleAssignStatValue(stat, val)}
                      >
                        <Text style={[styles.arrayValLabel, isSelected && styles.arrayValLabelActive]}>
                          {val}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* STEP 3: Skill Proficiencies */}
        {step === 3 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepTitle}>Proficiências de Perícias</Text>
            <Text style={styles.stepDesc}>
              Selecione as perícias nas quais seu herói tem treinamento especial (Proficiência).
            </Text>

            <View style={styles.skillsGrid}>
              {SKILLS_LIST.map(skill => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <TouchableOpacity
                    key={skill}
                    style={[styles.skillCheckBtn, isSelected && styles.skillCheckBtnActive]}
                    onPress={() => toggleSkill(skill)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={isSelected ? 'checkbox' : 'square-outline'}
                      size={18}
                      color={isSelected ? '#F59E0B' : '#475569'}
                      style={{ marginRight: 8 }}
                    />
                    <Text style={[styles.skillCheckLabel, isSelected && styles.skillCheckLabelActive]}>
                      {skill}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* STEP 4: Equipment Presets */}
        {step === 4 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepTitle}>Equipamento Inicial</Text>
            <Text style={styles.stepDesc}>
              Escolha os itens que seu herói levará para o combate baseados nos moldes do livro.
            </Text>

            <Text style={styles.label}>Arma Principal</Text>
            {WEAPON_TEMPLATES.map((w, idx) => (
              <TouchableOpacity
                key={w.name}
                style={[styles.equipOption, selectedWeaponIdx === idx && styles.equipOptionActive]}
                onPress={() => {
                  setSelectedWeaponIdx(idx);
                  if (w.handedness === '2 Mãos') {
                    setHasShield(false);
                  }
                }}
                activeOpacity={0.8}
              >
                <Ionicons name={"sword" as any} size={16} color={selectedWeaponIdx === idx ? '#F59E0B' : '#475569'} style={{ marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.equipName}>{w.name}</Text>
                  <Text style={styles.equipSub}>
                    Dano: {w.dmgDice} ({w.dmgType}) | Empunhadura: {w.handedness}
                    {w.dmgDiceVersatile ? ` (Dano 2M: ${w.dmgDiceVersatile})` : ''}
                  </Text>
                  {w.properties.length > 0 && (
                    <Text style={styles.equipProperties}>
                      Propriedades: {w.properties.join(', ')}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <Text style={[styles.label, { marginTop: 18 }]}>Armadura</Text>
            {ARMOR_TEMPLATES.filter(a => a.type === 'armor').map((a, idx) => {
              const currentStrength = stats.str;
              const meetsStrength = a.strengthReq ? currentStrength >= a.strengthReq : true;

              return (
                <TouchableOpacity
                  key={a.name}
                  style={[
                    styles.equipOption, 
                    selectedArmorIdx === idx && styles.equipOptionActive,
                    !meetsStrength && styles.equipOptionDisabled
                  ]}
                  onPress={() => {
                    if (!meetsStrength) {
                      Alert.alert(
                        'Requisito de Força',
                        `Esta armadura requer Força ${a.strengthReq}. Sua Força é ${currentStrength}. Você terá desvantagens se equipá-la.`
                      );
                    }
                    setSelectedArmorIdx(idx);
                  }}
                  activeOpacity={0.8}
                >
                  <Ionicons name={"shirt" as any} size={16} color={selectedArmorIdx === idx ? '#F59E0B' : '#475569'} style={{ marginRight: 10 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.equipName}>{a.name}</Text>
                    <Text style={styles.equipSub}>
                      Classe de Armadura (AC): {a.acBonus}
                      {a.strengthReq ? ` | Req. Força: ${a.strengthReq}` : ''}
                      {a.stealthDisadvantage ? ' | Desv. Furtividade' : ' | Sem Desv. Furtiv.'}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}

            {/* Shield Option Toggle */}
            <View style={[styles.shieldToggleRow, isWeapon2H && styles.shieldToggleRowDisabled]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.shieldLabel}>Equipar Escudo inicial (+2 AC)</Text>
                <Text style={styles.shieldSub}>
                  {isWeapon2H
                    ? 'Desabilitado: Usando arma de duas mãos.'
                    : 'Disponível apenas para armas de 1 mão ou versáteis.'}
                </Text>
              </View>
              <Switch
                disabled={isWeapon2H}
                trackColor={{ false: '#0F172A', true: '#2563EB' }}
                thumbColor={hasShield ? '#60A5FA' : '#64748B'}
                onValueChange={(val) => {
                  if (val && isWeapon2H) {
                    Alert.alert('Aviso D&D', 'Não é possível equipar escudo enquanto usa arma de duas mãos.');
                    return;
                  }
                  setHasShield(val);
                }}
                value={hasShield && !isWeapon2H}
              />
            </View>
          </View>
        )}

        {/* STEP 5: Spells Selection */}
        {step === 5 && (
          <View style={styles.stepCard}>
            <Text style={styles.stepTitle}>Magias Preparadas</Text>
            <Text style={styles.stepDesc}>
              Escolha suas magias iniciais de acordo com as regras de conjuração do livro de regras.
            </Text>

            {isSpellcaster ? (
              <View>
                {maxSpellLevel > 0 ? (
                  <View style={styles.spellLimitBanner}>
                    <Text style={styles.spellLimitText}>
                      Limite: {selectedPreparedCount} de {prepLimit} magias preparadas (Truques não contam para o limite)
                    </Text>
                  </View>
                ) : (
                  <View style={styles.spellLimitBanner}>
                    <Text style={styles.spellLimitText}>
                      Neste nível você só pode conjurar truques (Nível 0).
                    </Text>
                  </View>
                )}

                {availableSpells.length === 0 ? (
                  <Text style={styles.emptyText}>Nenhuma magia disponível para sua classe neste nível.</Text>
                ) : (
                  availableSpells.map(spell => {
                    const isSelected = selectedSpells.includes(spell.name);
                    const isCantrip = spell.level === 0;

                    return (
                      <TouchableOpacity
                        key={spell.name}
                        style={[styles.spellCard, isSelected && styles.spellCardActive]}
                        onPress={() => toggleSpellSelection(spell.name)}
                        activeOpacity={0.8}
                      >
                        <View style={styles.spellHeader}>
                          <Text style={styles.spellName}>{spell.name}</Text>
                          <Text style={styles.spellMeta}>
                            {isCantrip ? 'Truque (Lvl 0)' : `Nível ${spell.level}`}
                          </Text>
                        </View>
                        <View style={styles.spellStatsRow}>
                          <View style={styles.spellStatBadge}>
                            <Text style={styles.spellStatText}>{spell.school}</Text>
                          </View>
                          <View style={styles.spellStatBadge}>
                            <Text style={styles.spellStatText}>Conj: {spell.castingTime}</Text>
                          </View>
                          <View style={styles.spellStatBadge}>
                            <Text style={styles.spellStatText}>Alc: {spell.range}</Text>
                          </View>
                          <View style={styles.spellStatBadge}>
                            <Text style={styles.spellStatText}>Dur: {spell.duration}</Text>
                          </View>
                        </View>
                        <Text style={styles.spellDesc}>{spell.description}</Text>
                      </TouchableOpacity>
                    );
                  })
                )}
              </View>
            ) : (
              <View style={styles.noSpellsBanner}>
                <Ionicons name="flash-off" size={44} color="#475569" style={{ marginBottom: 12 }} />
                <Text style={styles.noSpellsText}>{selectedClass} não conjura magias</Text>
                <Text style={styles.noSpellsSub}>
                  Guerreiros não possuem slots de magias. Clique em "Finalizar" para concluir a criação de personagem.
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Footer Navigation Buttons */}
      <View style={styles.footer}>
        {step > 1 ? (
          <TouchableOpacity style={styles.footerBackBtn} onPress={() => setStep((step - 1) as StepType)}>
            <Text style={styles.footerBackBtnText}>Voltar</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ flex: 0.8 }} />
        )}

        {step < 5 ? (
          <TouchableOpacity style={styles.footerNextBtn} onPress={() => setStep((step + 1) as StepType)}>
            <Text style={styles.footerNextBtnText}>Avançar</Text>
            <Ionicons name="arrow-forward" size={16} color="#0F172A" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.footerNextBtn, styles.saveBtn]} onPress={handleSaveCharacter}>
            <Ionicons name="checkmark-circle" size={16} color="#0F172A" style={{ marginRight: 6 }} />
            <Text style={styles.footerNextBtnText}>Finalizar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '900',
  },
  headerSubtitle: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  stepCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
    marginBottom: 20,
  },
  stepTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  stepDesc: {
    color: '#94A3B8',
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 16,
  },
  label: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    color: '#F8FAFC',
    height: 44,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerBtn: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 6,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  pickerBtnActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  pickerLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '700',
  },
  pickerLabelActive: {
    color: '#0F172A',
    fontWeight: '900',
  },
  pickerRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pickerBtnWrap: {
    width: '31%',
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 6,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lvlBtn: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 6,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  lvlBtnActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  lvlLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '800',
  },
  lvlLabelActive: {
    color: '#0F172A',
    fontWeight: '900',
  },
  statAssignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#334155',
  },
  statAssignMeta: {
    flex: 1,
  },
  statAssignLabel: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
  },
  statAssignSub: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '700',
    marginTop: 2,
  },
  arraySelector: {
    flexDirection: 'row',
    flex: 2.8,
    justifyContent: 'flex-end',
  },
  arrayValBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0F172A',
    borderWidth: 0.5,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 1,
  },
  arrayValBtnActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  arrayValLabel: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '800',
  },
  arrayValLabelActive: {
    color: '#0F172A',
    fontWeight: '900',
  },
  skillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillCheckBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  skillCheckBtnActive: {
    borderColor: '#475569',
    backgroundColor: 'rgba(245, 158, 11, 0.03)',
  },
  skillCheckLabel: {
    color: '#64748B',
    fontSize: 11,
    fontWeight: '600',
  },
  skillCheckLabelActive: {
    color: '#F8FAFC',
    fontWeight: '800',
  },
  equipOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  equipOptionActive: {
    borderColor: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.04)',
  },
  equipOptionDisabled: {
    opacity: 0.5,
  },
  equipName: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  equipSub: {
    color: '#64748B',
    fontSize: 10,
    marginTop: 2,
  },
  equipProperties: {
    color: '#94A3B8',
    fontSize: 9,
    marginTop: 2,
    fontStyle: 'italic',
  },
  shieldToggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderWidth: 0.5,
    borderColor: '#334155',
    padding: 12,
    borderRadius: 8,
    marginTop: 14,
  },
  shieldToggleRowDisabled: {
    opacity: 0.5,
  },
  shieldLabel: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  shieldSub: {
    color: '#475569',
    fontSize: 10,
    marginTop: 2,
  },
  spellCard: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  spellCardActive: {
    borderColor: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.04)',
  },
  spellHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  spellName: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '800',
  },
  spellMeta: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '700',
  },
  spellStatsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  spellStatBadge: {
    backgroundColor: '#1E293B',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 4,
  },
  spellStatText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '600',
  },
  spellDesc: {
    color: '#64748B',
    fontSize: 11,
    lineHeight: 16,
  },
  spellLimitBanner: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: '#F59E0B',
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  spellLimitText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  noSpellsBanner: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  noSpellsText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  noSpellsSub: {
    color: '#475569',
    fontSize: 12,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  footerBackBtn: {
    flex: 0.8,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBackBtnText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
  },
  footerNextBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F59E0B',
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerNextBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
  },
  saveBtn: {
    backgroundColor: '#10B981',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 16,
    fontStyle: 'italic',
  },
});
