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
  isProficientInItem,
  getRaceStatBonuses,
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

  // Get skills allowed by class and maximum choices allowed
  const getClassSkillRules = (className: string): { limit: number; list: string[] } => {
    const cls = className.toLowerCase();
    if (cls.includes('bárbaro')) return { limit: 2, list: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'] };
    if (cls.includes('bardo')) return { limit: 3, list: SKILLS_LIST }; // Bards can choose any 3 skills
    if (cls.includes('bruxo')) return { limit: 2, list: ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion'] };
    if (cls.includes('clérigo')) return { limit: 2, list: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'] };
    if (cls.includes('druida')) return { limit: 2, list: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'] };
    if (cls.includes('feiticeiro')) return { limit: 2, list: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'] };
    if (cls.includes('guerreiro')) return { limit: 2, list: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'] };
    if (cls.includes('ladino')) return { limit: 4, list: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth'] };
    if (cls.includes('mago')) return { limit: 2, list: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'] };
    if (cls.includes('monge')) return { limit: 2, list: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'] };
    if (cls.includes('paladino')) return { limit: 2, list: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'] };
    if (cls.includes('patrulheiro')) return { limit: 3, list: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'] };
    if (cls.includes('artífice')) return { limit: 2, list: ['Arcana', 'History', 'Investigation', 'Medicine', 'Nature', 'Sleight of Hand'] };
    return { limit: 2, list: [] };
  };

  const toggleSkill = (skill: string) => {
    const bg = BACKGROUNDS_LIST.find(b => b.name === selectedBackground);
    // If the skill is granted by the background, it is locked
    if (bg && bg.skills.includes(skill)) {
      return;
    }

    const classRules = getClassSkillRules(selectedClass);
    setSelectedSkills(prev => {
      if (prev.includes(skill)) {
        return prev.filter(s => s !== skill);
      } else {
        // Count how many non-background skills are currently selected
        const bgSkills = bg ? bg.skills : [];
        const currentClassSkillsCount = prev.filter(s => !bgSkills.includes(s)).length;
        
        if (currentClassSkillsCount >= classRules.limit) {
          Alert.alert(
            'Limite de Perícias',
            `Sua classe (${selectedClass}) permite escolher apenas ${classRules.limit} perícias além daquelas dadas pelo seu Antecedente.`
          );
          return prev;
        }
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

    // Apply racial stat bonuses to base stats
    const racialBonuses = getRaceStatBonuses(selectedRace);
    const finalStats = { ...stats };
    (Object.keys(racialBonuses) as Array<keyof BaseStats>).forEach(stat => {
      if (racialBonuses[stat]) {
        finalStats[stat] = (finalStats[stat] || 0) + (racialBonuses[stat] || 0);
      }
    });

    const calculatedHp = calculateHP(finalStats.con);
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
      // Battle Master Superiority Dice
      if (selectedSubclass.includes('Mestre de Batalha') && level >= 3) {
        customResources.push({ id: 'superiority_dice', name: 'Dados de Superioridade (d8)', current: 4, max: 4 });
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
      const chaMod = Math.max(1, Math.floor((finalStats.cha - 10) / 2));
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
      baseStats: finalStats,
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

            {/* Class description info card */}
            {(() => {
              let classDesc = '';
              const cName = selectedClass.trim();
              if (cName === 'Bárbaro') classDesc = 'Um guerreiro feroz de origem selvagem que pode entrar em fúria para ignorar dano e causar estragos corpo-a-corpo.';
              else if (cName === 'Bardo') classDesc = 'Um mestre da música e da magia que inspira seus aliados, cura ferimentos e manipula a mente dos inimigos.';
              else if (cName === 'Bruxo') classDesc = 'Um conjurador que obteve seus poderes mágicos através de um pacto com uma entidade sobrenatural poderosa.';
              else if (cName === 'Clérigo') classDesc = 'Um guerreiro sacerdotal que canaliza o poder divino de seu deus para curar aliados e punir infiéis.';
              else if (cName === 'Druida') classDesc = 'Um protetor da natureza que assume formas de feras selvagens e conjura magias baseadas nos elementos da terra.';
              else if (cName === 'Feiticeiro') classDesc = 'Um mago nato que possui magia intrínseca em suas veias devido a uma linhagem exótica ou evento cósmico.';
              else if (cName === 'Guerreiro') classDesc = 'Um especialista em combate físico altamente treinado com domínio sobre todas as armas e armaduras existentes.';
              else if (cName === 'Ladino') classDesc = 'Um trapaceiro furtivo especialista em ataques de oportunidade, arrombamento de fechaduras e truques sujos.';
              else if (cName === 'Mago') classDesc = 'Um acadêmico da magia que estuda grimórios e fórmulas arcanas para conjurar magias extremamente versáteis.';
              else if (cName === 'Monge') classDesc = 'Um mestre das artes marciais que canaliza a energia vital do Chi para desferir golpes rápidos e desvios sobrenaturais.';
              else if (cName === 'Paladino') classDesc = 'Um guerreiro sagrado vinculado a um juramento solene, capaz de desferir destruição divina e curar com as mãos.';
              else if (cName === 'Patrulheiro') classDesc = 'Um caçador destemido das fronteiras selvagens, mestre em rastreamento e combate contra inimigos específicos.';
              else if (cName === 'Artífice') classDesc = 'Um inventor genial que combina magia e tecnologia para infundir itens comuns com propriedades mágicas.';

              return (
                <View style={{ backgroundColor: 'rgba(245, 158, 11, 0.03)', borderColor: '#F59E0B', borderWidth: 0.5, borderRadius: 8, padding: 10, marginTop: 4, marginBottom: 12 }}>
                  <Text style={{ color: '#FBBF24', fontSize: 11, fontWeight: '700' }}>Sobre o {selectedClass}:</Text>
                  <Text style={{ color: '#E2E8F0', fontSize: 10, marginTop: 2, lineHeight: 14 }}>{classDesc}</Text>
                </View>
              );
            })()}

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
                        {sub.split(' (')[0]}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                {/* Subclass benefits info card */}
                {(() => {
                  let subclassBenefit = '';
                  const subLower = selectedSubclass.toLowerCase();
                  if (subLower.includes('berserker')) subclassBenefit = 'Ataques adicionais na Fúria e imunidade a charme/medo.';
                  else if (subLower.includes('totem') || subLower.includes('totêmico')) subclassBenefit = 'Ganhe resistências de espíritos animais (Urso: resiste a todo dano exceto psíquico).';
                  else if (subLower.includes('conhecimento') || subLower.includes('lore')) subclassBenefit = 'Ganhe 3 perícias extras e a habilidade Palavras de Corte para reduzir jogadas inimigas.';
                  else if (subLower.includes('bravura') || subLower.includes('valor')) subclassBenefit = 'Proficiência com armaduras médias, escudos, armas marciais e Inspiração de Combate.';
                  else if (subLower.includes('espadas') || subLower.includes('swords')) subclassBenefit = 'Estilo de combate de duelo/duas armas e uso de Inspiração para manobras de ataque.';
                  else if (subLower.includes('corruptor') || subLower.includes('fiend')) subclassBenefit = 'Ganhe HP temporário ao derrotar inimigos e bônus em testes de salvaguarda.';
                  else if (subLower.includes('arquifada') || subLower.includes('archfey')) subclassBenefit = 'Habilidade de enfeitiçar ou amedrontar criaturas ao seu redor.';
                  else if (subLower.includes('grande antigo') || subLower.includes('great old')) subclassBenefit = 'Telepatia com qualquer criatura que você possa ver e defesas mentais.';
                  else if (subLower.includes('lâmina maldita') || subLower.includes('hexblade')) subclassBenefit = 'Use Carisma para jogadas de ataque/dano e amaldiçoe alvos para causar críticos com 19 ou 20.';
                  else if (subLower.includes('vida') || subLower.includes('life')) subclassBenefit = 'Sua cura ganha bônus de 2 + nível da magia. Proficiência em armadura pesada.';
                  else if (subLower.includes('tempestade') || subLower.includes('tempest')) subclassBenefit = 'Retalie atacantes com raio/trovão e maximize dano de eletricidade.';
                  else if (subLower.includes('guerra') || subLower.includes('war')) subclassBenefit = 'Ataque adicional como ação bônus e bônus de +10 no acerto. Proficiência em armadura pesada.';
                  else if (subLower.includes('luz') || subLower.includes('light')) subclassBenefit = 'Use futilidades de luz para impor desvantagem a atacantes e conjure Bola de Fogo.';
                  else if (subLower.includes('lua') || subLower.includes('moon')) subclassBenefit = 'Combata sob a forma de feras muito mais poderosas (Nível de Desafio 1 já no nível 2).';
                  else if (subLower.includes('terra') || subLower.includes('land')) subclassBenefit = 'Recupere slots de magia em descansos curtos e ganhe magias de terrenos.';
                  else if (subLower.includes('dracônica') || subLower.includes('draconic')) subclassBenefit = 'HP extra por nível, armadura natural de 13 + Dex e asas no nível 14.';
                  else if (subLower.includes('selvagem') || subLower.includes('wild')) subclassBenefit = 'Role na tabela de Surtos de Magia Selvagem para efeitos mágicos aleatórios.';
                  else if (subLower.includes('campeão') || subLower.includes('champion')) subclassBenefit = 'Margem de acerto crítico reduzida para 19 ou 20 nos dados.';
                  else if (subLower.includes('mestre de batalha') || subLower.includes('battle')) subclassBenefit = 'Ganhe 4 Dados de Superioridade (d8) e aprenda manobras de combate para desarmar, derrubar, etc.';
                  else if (subLower.includes('arcano') || subLower.includes('knight')) subclassBenefit = 'Aprenda magias de Mago (Abjuração/Evocação) e invoque sua arma vinculada.';
                  else if (subLower.includes('ladrão') || subLower.includes('thief')) subclassBenefit = 'Use as mãos rápidas para usar itens como ação bônus e escale paredes com velocidade.';
                  else if (subLower.includes('assassino') || subLower.includes('assassin')) subclassBenefit = 'Vantagem contra quem não agiu e acertos críticos automáticos contra alvos surpresos.';
                  else if (subLower.includes('espadachim') || subLower.includes('swash')) subclassBenefit = 'Adicione Carisma na Iniciativa e use Ataque Furtivo sem precisar de aliados próximos.';
                  else if (subLower.includes('evocação')) subclassBenefit = 'Esculpa feitiços de área para que seus aliados não sofram dano deles.';
                  else if (subLower.includes('abjuração')) subclassBenefit = 'Crie uma barreira arcana protetora que absorve dano direcionado a você.';
                  else if (subLower.includes('necromancia')) subclassBenefit = 'Recupere vida ao matar inimigos com magias e manipule mortos-vivos com perícia.';
                  else if (subLower.includes('mão aberta') || subLower.includes('open')) subclassBenefit = 'Adicione efeitos extras ao seu Rajada de Golpes (derrubar, empurrar ou impedir reações).';
                  else if (subLower.includes('sombras') || subLower.includes('shadow')) subclassBenefit = 'Fique invisível nas sombras e teletransporte-se através delas.';
                  else if (subLower.includes('devoção') || subLower.includes('devotion')) subclassBenefit = 'Sagrar Arma (soma Carisma no acerto), Efeitos da Aura de Devoção (imunidade a charme) e Canalizar Divindade para expulsar mortos-vivos.';
                  else if (subLower.includes('vingança') || subLower.includes('vengeance')) subclassBenefit = 'Voto de Inimizade (vantagem contra oponente por 1 min) e Abjurar Inimigo (assusta o alvo reduzindo velocidade a 0).';
                  else if (subLower.includes('anciões') || subLower.includes('ancients')) subclassBenefit = 'Ira da Natureza (prende inimigo) e Aura de Proteção dos Anciões (resistência a danos de magias).';
                  else if (subLower.includes('caçador') || subLower.includes('hunter')) subclassBenefit = 'Escolha habilidades ofensivas contra hordas ou presas gigantes.';
                  else if (subLower.includes('bestas') || subLower.includes('beast')) subclassBenefit = 'Obtenha um companheiro animal que luta ao seu lado e obedece aos seus comandos.';
                  else if (subLower.includes('gloom')) subclassBenefit = 'Invisível na escuridão sob visão no escuro e ataque extra no primeiro turno de combate.';
                  else if (subLower.includes('alquimista')) subclassBenefit = 'Crie elixires experimentais que concedem voo, cura, CA ou bônus de ataque.';
                  else if (subLower.includes('armeiro') || subLower.includes('armorer')) subclassBenefit = 'Crie uma armadura tecnológica com modos Guardião (defensivo) ou Infiltrador (furtivo).';
                  else if (subLower.includes('artilheiro') || subLower.includes('artillerist')) subclassBenefit = 'Invoque canhões arcanos móveis que atiram fogo, projéteis de força ou concedem escudos temporários.';
                  else if (subLower.includes('serralheiro') || subLower.includes('smith')) subclassBenefit = 'Lute ao lado de um Defensor de Aço e use Inteligência nas jogadas de ataque físico.';

                  if (!subclassBenefit) return null;
                  return (
                    <View style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: '#F59E0B', borderWidth: 0.5, borderRadius: 8, padding: 10, marginTop: 4, marginBottom: 12 }}>
                      <Text style={{ color: '#FBBF24', fontSize: 11, fontWeight: '700' }}>Benefício do Arquétipo:</Text>
                      <Text style={{ color: '#E2E8F0', fontSize: 10, marginTop: 2, lineHeight: 14 }}>{subclassBenefit}</Text>
                    </View>
                  );
                })()}
              </>
            )}

            <Text style={styles.label}>Raça</Text>
            {(() => {
              // Complete D&D 5e sub-races and sub-types list in PT-BR
              const raceGroups: Record<string, string[]> = {
                'Humano': ['Humano'],
                'Anão': ['Anão da Colina', 'Anão da Montanha', 'Duergar'],
                'Elfo': ['Alto Elfo', 'Elfo da Floresta', 'Drow (Elfo Negro)', 'Eladrin', 'Meio-Elfo', 'Meio-Elfo (Drow)', 'Meio-Elfo (Aquático)', 'Meio-Elfo (Elfo da Floresta)'],
                'Halfling': ['Halfling Pés-Leves', 'Halfling Robusto', 'Halfling Ghostwise'],
                'Gnomo': ['Gnomo da Floresta', 'Gnomo das Rochas', 'Gnomo Profundo (Svirfneblin)'],
                'Tiefling': ['Tiefling', 'Tiefling Feral', 'Tiefling Devil\'s Tongue', 'Tiefling Hellfire', 'Tiefling Winged'],
                'Orc': ['Orc', 'Meio-Orc'],
                'Draconato': [
                  'Draconato Vermelho (Fogo)', 
                  'Draconato Latão (Fogo)', 
                  'Draconato Ouro (Fogo)', 
                  'Draconato Azul (Eletricidade)', 
                  'Draconato Bronze (Eletricidade)', 
                  'Draconato Cobre (Ácido)', 
                  'Draconato Preto (Ácido)', 
                  'Draconato Verde (Veneno)', 
                  'Draconato Branco (Frio)', 
                  'Draconato Prata (Frio)'
                ],
                'Genasi': ['Genasi da Terra', 'Genasi do Ar', 'Genasi do Fogo', 'Genasi da Água'],
                'Aasimar': ['Grave Aasimar', 'Protector Aasimar', 'Fallen Aasimar', 'Scourge Aasimar'],
                'Aarakocra': ['Aarakocra'],
                'Tritão': ['Tritão'],
                'Goliath': ['Goliath'],
                'Tabaxi': ['Tabaxi'],
                'Goblin': ['Goblin'],
                'Hobgoblin': ['Hobgoblin'],
                'Kenku': ['Kenku'],
                'Lizardfolk': ['Lizardfolk'],
                'Firbolg': ['Firbolg'],
                'Yuan-ti': ['Yuan-ti Pureblood']
              };

              // Core races visible in the 3x3 grid by default
              const coreGroupNames = ['Humano', 'Anão', 'Elfo', 'Halfling', 'Gnomo', 'Tiefling', 'Orc', 'Draconato', 'Genasi'];
              
              // Exotic/rare groups hidden under the expander by default
              const extraGroupNames = ['Aasimar', 'Aarakocra', 'Tritão', 'Goliath', 'Tabaxi', 'Goblin', 'Hobgoblin', 'Kenku', 'Lizardfolk', 'Firbolg', 'Yuan-ti'];

              const [isExpanded, setIsExpanded] = useState(false);

              // Identify group of the currently selected race
              const currentGroup = Object.keys(raceGroups).find(group => raceGroups[group].includes(selectedRace)) || 'Humano';

              const visibleGroups = isExpanded 
                ? [...coreGroupNames, ...extraGroupNames] 
                : coreGroupNames;

              return (
                <View style={{ marginBottom: 10 }}>
                  {/* Unified Race Grid */}
                  <View style={styles.pickerRowWrap}>
                    {visibleGroups.map(group => {
                      const isActive = currentGroup === group;
                      return (
                        <TouchableOpacity
                          key={group}
                          style={[
                            styles.pickerBtnWrap, 
                            { width: '31%', marginBottom: 6 }, 
                            isActive ? styles.pickerBtnActive : null
                          ]}
                          onPress={() => {
                            const firstInGroup = raceGroups[group][0];
                            setSelectedRace(firstInGroup);
                          }}
                        >
                          <Text style={[styles.pickerLabel, isActive && styles.pickerLabelActive]}>
                            {group}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}

                    {/* Expand/Collapse Toggle Button in the grid */}
                    <TouchableOpacity
                      style={[
                        styles.pickerBtnWrap, 
                        { width: '31%', marginBottom: 6, borderColor: '#F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.03)' }
                      ]}
                      onPress={() => setIsExpanded(!isExpanded)}
                    >
                      <Text style={[styles.pickerLabel, { color: '#FBBF24', fontWeight: '800' }]}>
                        {isExpanded ? 'Menos ▲' : 'Mais ▼'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Sub-races under selected category (only show if group has sub-races or if it's not a single race) */}
                  {currentGroup && raceGroups[currentGroup].length > 1 && (
                    <View style={{ backgroundColor: '#090D16', padding: 8, borderRadius: 8, marginTop: 4, borderColor: '#1E293B', borderWidth: 1 }}>
                      <Text style={{ color: '#64748B', fontSize: 9, fontWeight: '700', marginBottom: 6, textTransform: 'uppercase' }}>Sub-raça / Origem</Text>
                      <View style={styles.pickerRowWrap}>
                        {raceGroups[currentGroup].map(sub => {
                          const isSel = selectedRace === sub;
                          return (
                            <TouchableOpacity
                              key={sub}
                              style={[styles.pickerBtnWrap, { width: '48%', paddingVertical: 6, marginBottom: 4 }, isSel && styles.pickerBtnActive]}
                              onPress={() => setSelectedRace(sub)}
                            >
                              <Text style={[styles.pickerLabel, isSel && styles.pickerLabelActive]} numberOfLines={1}>
                                {sub.includes('Draconato') ? sub.replace('Draconato ', '') : sub}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  )}

                  {/* Race benefits info card */}
                  {(() => {
                    const bonuses = getRaceStatBonuses(selectedRace);
                    const bonusText = Object.entries(bonuses)
                      .map(([stat, val]) => `${stat.toUpperCase()} +${val}`)
                      .join(', ');

                    let traitText = '';
                    const rLower = selectedRace.toLowerCase();
                    if (rLower.includes('humano')) traitText = 'Versatilidade incomparável. +1 em todos os atributos base.';
                    else if (rLower.includes('colina')) traitText = 'Tenacidade Anã: +1 de Vida máxima extra por nível e Visão no Escuro.';
                    else if (rLower.includes('montanha')) traitText = 'Treinamento com Armaduras Anãs: Proficiência com armaduras leves e médias.';
                    else if (rLower.includes('duergar')) traitText = 'Resistência mental contra ilusões, paralisia e magias de invisibilidade/crescimento inatas.';
                    else if (rLower.includes('alto elfo')) traitText = 'Aprende 1 Truque extra de Mago e ganha proficiência com espadas/arcos.';
                    else if (rLower.includes('floresta')) traitText = 'Pés Ligeiros: Velocidade base aumenta para 10.5m (35ft) e camuflagem natural.';
                    else if (rLower.includes('drow')) traitText = 'Visão no Escuro Superior (24m) e Magia Drow inata (Globo de Trevas).';
                    else if (rLower.includes('eladrin')) traitText = 'Passo Fey: Teletransporte de 9 metros como ação bônus com efeitos sazonais.';
                    else if (rLower.includes('pés-leves')) traitText = 'Furtividade Natural: Consegue se esconder atrás de criaturas maiores que você.';
                    else if (rLower.includes('robusto')) traitText = 'Resiliência dos Robustos: Vantagem e resistência contra venenos.';
                    else if (rLower.includes('ghostwise')) traitText = 'Telepatia silenciosa com criaturas próximas a até 9 metros.';
                    else if (rLower.includes('draconato')) traitText = 'Ancestralidade Dracônica: Arma de Sopro e resistência ao elemento correspondente.';
                    else if (rLower.includes('gnomo da floresta')) traitText = 'Ilusionista Natural: Aprende o truque Ilusão Menor e fala com pequenos animais.';
                    else if (rLower.includes('gnomo das rochas')) traitText = 'Gingado de Engenheiro: Cria pequenos dispositivos mecânicos (brinquedos, isqueiros).';
                    else if (rLower.includes('svirfneblin')) traitText = 'Camuflagem de pedra e visão no escuro superior de 36 metros.';
                    else if (rLower.includes('meio-elfo')) traitText = 'Versatilidade em Perícias: Ganha proficiência em duas perícias à sua escolha.';
                    else if (rLower.includes('meio-orc')) traitText = 'Ataques Selvagens (críticos causam mais dano) e Resistência Inabalável (não cai a 0 de Vida uma vez).';
                    else if (rLower.includes('winged')) traitText = 'Asas de Couro: Possui velocidade de voo natural de 9 metros.';
                    else if (rLower.includes('feral')) traitText = 'Agilidade inata e inteligência apurada típica dos tieflings selvagens.';
                    else if (rLower.includes('tiefling')) traitText = 'Resistência Infernal ao fogo e magias inatas de escuridão e fogo.';
                    else if (rLower.includes('aarakocra')) traitText = 'Velocidade de voo natural de 15 metros (50ft) e garras afiadas.';
                    else if (rLower.includes('goliath')) traitText = 'Resistência de Pedra: Reduz dano sofrido em 1d12 + Con. Considerado tamanho Grande.';
                    else if (rLower.includes('tritão')) traitText = 'Guardião das profundezas: Resiste a frio, fala com animais aquáticos e respira na água.';
                    else if (rLower.includes('tabaxi')) traitText = 'Agilidade Felina: Dobra a velocidade no turno. Garras escaladoras e proficiência em Furtividade.';
                    else if (rLower.includes('goblin')) traitText = 'Fúria dos Pequenos: Causa dano extra contra alvos maiores. Escapa como ação bônus.';
                    else if (rLower.includes('hobgoblin')) traitText = 'Salvo pela União: Ganha bônus em jogadas que falhou perto de aliados.';
                    else if (rLower.includes('kenku')) traitText = 'Treinamento Kenku: Imita sons perfeitamente e é proficiente em duas perícias de ladino.';
                    else if (rLower.includes('lizardfolk')) traitText = 'Armadura natural de 13 + Dex. Mordida regenerativa e produz armas de ossos.';
                    else if (rLower.includes('firbolg')) traitText = 'Magia Firbolg: Invisibilidade curta e disfarces mágicos. Conversa com plantas e feras.';

                    return (
                      <View style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: '#F59E0B', borderWidth: 0.5, borderRadius: 8, padding: 10, marginTop: 6 }}>
                        <Text style={{ color: '#FBBF24', fontSize: 11, fontWeight: '700' }}>Benefícios de {selectedRace}:</Text>
                        <Text style={{ color: '#94A3B8', fontSize: 9, fontWeight: '600', marginTop: 1 }}>Bônus: {bonusText || 'Nenhum'}</Text>
                        {traitText ? <Text style={{ color: '#E2E8F0', fontSize: 10, marginTop: 3, lineHeight: 14 }}>{traitText}</Text> : null}
                      </View>
                    );
                  })()}
                </View>
              );
            })()}

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
            {/* Background info card */}
            {(() => {
              const bg = BACKGROUNDS_LIST.find(b => b.name === selectedBackground);
              if (!bg) return null;
              return (
                <View style={{ backgroundColor: 'rgba(245, 158, 11, 0.05)', borderColor: '#F59E0B', borderWidth: 0.5, borderRadius: 8, padding: 10, marginTop: 6 }}>
                  <Text style={{ color: '#FBBF24', fontSize: 11, fontWeight: '700' }}>Habilidade de {bg.name.split(' (')[0]}:</Text>
                  <Text style={{ color: '#F59E0B', fontSize: 9, fontWeight: '600', marginTop: 1 }}>Perícias Iniciais: {bg.skills.join(', ')}</Text>
                  <Text style={{ color: '#94A3B8', fontSize: 9, fontWeight: '600', marginTop: 1 }}>Recurso: {bg.featureName}</Text>
                  <Text style={{ color: '#E2E8F0', fontSize: 10, marginTop: 3, lineHeight: 14 }}>{bg.featureDesc}</Text>
                </View>
              );
            })()}


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
                const bg = BACKGROUNDS_LIST.find(b => b.name === selectedBackground);
                const isFromBg = bg && bg.skills.includes(skill);
                const isSelected = selectedSkills.includes(skill);
                const classRules = getClassSkillRules(selectedClass);
                const isClassSkill = classRules.list.includes(skill);

                return (
                  <TouchableOpacity
                    key={skill}
                    style={[
                      styles.skillCheckBtn, 
                      isSelected && styles.skillCheckBtnActive,
                      isFromBg && { opacity: 0.8, backgroundColor: 'rgba(37, 99, 235, 0.08)', borderColor: '#2563EB' }
                    ]}
                    onPress={() => toggleSkill(skill)}
                    activeOpacity={isFromBg ? 1.0 : 0.8}
                  >
                    <Ionicons
                      name={isSelected ? 'checkbox' : 'square-outline'}
                      size={18}
                      color={isFromBg ? '#3b82f6' : (isSelected ? '#F59E0B' : '#475569')}
                      style={{ marginRight: 8 }}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={[
                        styles.skillCheckLabel, 
                        isSelected && styles.skillCheckLabelActive,
                        isFromBg && { color: '#60A5FA', fontWeight: '800' }
                      ]}>
                        {skill}
                      </Text>
                      {isFromBg && (
                        <Text style={{ color: '#3b82f6', fontSize: 7, fontWeight: '700', marginTop: 1 }}>ANTECEDENTE</Text>
                      )}
                      {!isFromBg && isClassSkill && (
                        <Text style={{ color: '#10B981', fontSize: 7, fontWeight: '700', marginTop: 1 }}>OPÇÃO CLASSE</Text>
                      )}
                    </View>
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
            {WEAPON_TEMPLATES.map((w, idx) => {
              const isProf = isProficientInItem(selectedClass, 'weapon', w.name, w.category);
              return (
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
                    <View style={styles.creationEquipHeaderRow}>
                      <Text style={styles.equipName}>{w.name}</Text>
                      <View style={[
                        styles.profSmallBadge,
                        isProf ? styles.profSmallBadgeActive : styles.profSmallBadgeInactive
                      ]}>
                        <Text style={[
                          styles.profSmallBadgeText,
                          isProf ? styles.profSmallBadgeTextActive : styles.profSmallBadgeTextInactive
                        ]}>
                          {isProf ? 'Treinado' : 'Sem Treino'}
                        </Text>
                      </View>
                    </View>
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
              );
            })}

            <Text style={[styles.label, { marginTop: 18 }]}>Armadura</Text>
            {ARMOR_TEMPLATES.filter(a => a.type === 'armor').map((a, idx) => {
              const currentStrength = stats.str;
              const meetsStrength = a.strengthReq ? currentStrength >= a.strengthReq : true;
              const isProf = isProficientInItem(selectedClass, 'armor', a.name);

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
                    <View style={styles.creationEquipHeaderRow}>
                      <Text style={styles.equipName}>{a.name}</Text>
                      <View style={[
                        styles.profSmallBadge,
                        isProf ? styles.profSmallBadgeActive : styles.profSmallBadgeInactive
                      ]}>
                        <Text style={[
                          styles.profSmallBadgeText,
                          isProf ? styles.profSmallBadgeTextActive : styles.profSmallBadgeTextInactive
                        ]}>
                          {isProf ? 'Treinado' : 'Sem Treino'}
                        </Text>
                      </View>
                    </View>
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
            {(() => {
              const isShieldProf = isProficientInItem(selectedClass, 'shield', 'Escudo');
              return (
                <View style={[styles.shieldToggleRow, isWeapon2H && styles.shieldToggleRowDisabled]}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.shieldLabel}>Equipar Escudo inicial (+2 AC)</Text>
                      <View style={[
                        styles.profSmallBadge,
                        isShieldProf ? styles.profSmallBadgeActive : styles.profSmallBadgeInactive,
                        { marginLeft: 6 }
                      ]}>
                        <Text style={[
                          styles.profSmallBadgeText,
                          isShieldProf ? styles.profSmallBadgeTextActive : styles.profSmallBadgeTextInactive
                        ]}>
                          {isShieldProf ? 'Treinado' : 'Sem Treino'}
                        </Text>
                      </View>
                    </View>
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
              );
            })()}
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
  creationEquipHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  profSmallBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    marginRight: 6,
    alignSelf: 'center',
  },
  profSmallBadgeActive: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  profSmallBadgeInactive: {
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  profSmallBadgeText: {
    fontSize: 7.5,
    fontWeight: '800',
  },
  profSmallBadgeTextActive: {
    color: '#10B981',
  },
  profSmallBadgeTextInactive: {
    color: '#EF4444',
  },
});
