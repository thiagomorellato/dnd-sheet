import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, TextInput, Alert } from 'react-native';
import { CombatConfig, BaseStats, EquipmentItem } from '../types/character';
import { Ionicons } from '@expo/vector-icons';
import { isProficientInItem } from '../utils/dndRules';

import SwordIcon from '../../assets/icons/ffffff/transparent/1x1/delapouite/sword-brandish.svg';
import AxeIcon from '../../assets/icons/ffffff/transparent/1x1/delapouite/sharp-axe.svg';
import MaceIcon from '../../assets/icons/ffffff/transparent/1x1/delapouite/flanged-mace.svg';
import DaggerIcon from '../../assets/icons/ffffff/transparent/1x1/lorc/sacrificial-dagger.svg';
import SpearIcon from '../../assets/icons/ffffff/transparent/1x1/lorc/barbed-spear.svg';
import BowIcon from '../../assets/icons/ffffff/transparent/1x1/delapouite/bow-arrow.svg';
import CrossbowIcon from '../../assets/icons/ffffff/transparent/1x1/carl-olsen/crossbow.svg';
import HammerIcon from '../../assets/icons/ffffff/transparent/1x1/delapouite/thor-hammer.svg';
import ArrowIcon from '../../assets/icons/ffffff/transparent/1x1/lorc/arrowhead.svg';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface VitalsWidgetProps {
  combat: CombatConfig;
  stats: BaseStats;
  proficiencies: string[];
  level: number;
  equipment?: EquipmentItem[];
  characterClass: string;
  onUpdateProficiencies?: (updatedProficiencies: string[]) => Promise<void>;
  onUpdateEquipment?: (updatedEq: EquipmentItem[]) => void;
}

export const SKILL_MAPPING: Record<keyof BaseStats, string[]> = {
  str: ['Athletics'],
  dex: ['Acrobatics', 'Sleight', 'Stealth'],
  con: [],
  int: ['Arcana', 'History', 'Investig.', 'Nature', 'Religion'],
  wis: ['Animal H.', 'Insight', 'Medicine', 'Perception', 'Survival'],
  cha: ['Deception', 'Intimid.', 'Perform.', 'Persuasion'],
};

export const SKILL_FULL_NAMES: Record<string, string> = {
  'Sleight': 'Sleight of Hand',
  'Investig.': 'Investigation',
  'Animal H.': 'Animal Handling',
  'Intimid.': 'Intimidation',
  'Perform.': 'Performance',
};

export const STANDARD_SKILLS_SET = new Set([
  'Athletics', 'Acrobatics', 'Sleight of Hand', 'Stealth',
  'Arcana', 'History', 'Investigation', 'Nature', 'Religion',
  'Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival',
  'Deception', 'Intimidation', 'Performance', 'Persuasion',
  'Atletismo', 'Acrobacia', 'Furtividade', 'Prestidigitação',
  'Arcanismo', 'História', 'Investigação', 'Natureza', 'Religião',
  'Adestrar Animais', 'Intuição', 'Medicina', 'Percepção', 'Sobrevivência',
  'Enganação', 'Intimidação', 'Atuação', 'Persuasão',
  'Acrobatics', 'Sleight', 'Arcana', 'History', 'Investig.', 'Nature', 'Religion',
  'Animal H.', 'Insight', 'Medicine', 'Perception', 'Survival',
  'Deception', 'Intimid.', 'Perform.', 'Persuasion'
]);

export const getClassProficienciesSummary = (characterClass: string) => {
  const normalized = characterClass.trim().toLowerCase();
  
  let armors = "Nenhuma";
  let weapons = "Nenhuma";
  let tools = [] as string[];

  if (normalized.includes('paladin') || normalized.includes('paladino') ||
      normalized.includes('fighter') || normalized.includes('guerreiro')) {
    armors = "Leves, Médias, Pesadas, Escudos";
    weapons = "Armas Simples, Armas Marciais";
  } else if (normalized.includes('barbarian') || normalized.includes('bárbaro')) {
    armors = "Leves, Médias, Escudos";
    weapons = "Armas Simples, Armas Marciais";
  } else if (normalized.includes('ranger') || normalized.includes('patrulheiro')) {
    armors = "Leves, Médias, Escudos";
    weapons = "Armas Simples, Armas Marciais";
  } else if (normalized.includes('rogue') || normalized.includes('ladino')) {
    armors = "Leves";
    weapons = "Armas Simples, Besta de Mão, Rapieira, Espada Curta, Espada Longa";
    tools.push("Ferramentas de Ladrão");
  } else if (normalized.includes('bard') || normalized.includes('bardo')) {
    armors = "Leves";
    weapons = "Armas Simples, Besta de Mão, Rapieira, Espada Curta, Espada Longa";
    tools.push("3 Instrumentos Musicais");
  } else if (normalized.includes('cleric') || normalized.includes('clérigo')) {
    const isWarOrLife = normalized.includes('guerra') || normalized.includes('vida') || normalized.includes('tempestade');
    armors = isWarOrLife ? "Leves, Médias, Pesadas, Escudos" : "Leves, Médias, Escudos";
    weapons = (normalized.includes('guerra') || normalized.includes('tempestade')) ? "Armas Simples, Armas Marciais" : "Armas Simples";
  } else if (normalized.includes('druid') || normalized.includes('druida')) {
    armors = "Leves, Médias (não-metálicas), Escudos";
    weapons = "Adaga, Dardo, Clava, Maça, Foice, Cimitarra, Lança, Funda, Bordão";
    tools.push("Kit de Herbalismo");
  } else if (normalized.includes('monk') || normalized.includes('monge')) {
    armors = "Nenhuma";
    weapons = "Armas Simples, Espada Curta";
  } else if (normalized.includes('wizard') || normalized.includes('mago') ||
             normalized.includes('sorcerer') || normalized.includes('feiticeiro')) {
    armors = "Nenhuma";
    weapons = "Adaga, Dardo, Funda, Bordão, Besta Leve";
  } else if (normalized.includes('warlock') || normalized.includes('bruxo')) {
    armors = "Leves";
    weapons = "Armas Simples";
  } else if (normalized.includes('artificer') || normalized.includes('artífice')) {
    armors = "Leves, Médias, Escudos";
    weapons = "Armas Simples";
    tools.push("Ferramentas de Ladrão", "Ferramentas de Inventor");
  }

  return { armors, weapons, tools  };
};

const WeaponCard = ({ 
  item, 
  atkBonusStr, 
  currentDmg, 
  rangeText,
  getSvgIcon 
}: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
      }}
      style={styles.weaponHudCardCompact}
    >
      <View style={styles.weaponHudHeader}>
        <View style={styles.weaponIconWrapper}>
          {getSvgIcon(item.name)}
        </View>
        <Text style={styles.weaponAtkCompact}>{atkBonusStr}</Text>
        <Text style={styles.weaponDmgCompact}>{currentDmg}</Text>
      </View>
      
      {expanded && (
        <View style={styles.weaponHudExpanded}>
          <Text style={styles.weaponNameCompact} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.weaponRangeCompact}>Alcance: {rangeText}</Text>
          {item.properties && item.properties.length > 0 && (
            <Text style={styles.weaponPropsCompact}>{item.properties.join(', ')}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export const VitalsWidget: React.FC<VitalsWidgetProps> = ({
  combat,
  stats,
  proficiencies = [],
  level,
  equipment = [],
  characterClass,
  onUpdateProficiencies,
  onUpdateEquipment
}) => {
  const [skillsExpanded, setSkillsExpanded] = useState(false);
  const [newProfText, setNewProfText] = useState('');

  const handleAddProficiency = () => {
    const trimmed = newProfText.trim();
    if (!trimmed) return;
    if (proficiencies.includes(trimmed)) {
      Alert.alert('Aviso', 'Esta proficiência já existe!');
      return;
    }
    const nextProfs = [...proficiencies, trimmed];
    onUpdateProficiencies?.(nextProfs);
    setNewProfText('');
  };

  const handleRemoveCustomProficiency = (prof: string) => {
    const nextProfs = proficiencies.filter(p => p !== prof);
    onUpdateProficiencies?.(nextProfs);
  };

  const handleToggleSkills = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSkillsExpanded(prev => !prev);
  };

  const getSvgIcon = (name: string) => {
    const n = name.toLowerCase();
    const size = 16;
    const color = "#94A3B8";

    if (n.includes('machado') || n.includes('axe')) return <AxeIcon width={size} height={size} fill={color} />;
    if (n.includes('arco') || n.includes('bow')) return <BowIcon width={size} height={size} fill={color} />;
    if (n.includes('besta') || n.includes('crossbow')) return <CrossbowIcon width={size} height={size} fill={color} />;
    if (n.includes('adaga') || n.includes('dagger')) return <DaggerIcon width={size} height={size} fill={color} />;
    if (n.includes('lança') || n.includes('spear') || n.includes('pike')) return <SpearIcon width={size} height={size} fill={color} />;
    if (n.includes('maça') || n.includes('mace') || n.includes('clava')) return <MaceIcon width={size} height={size} fill={color} />;
    if (n.includes('martelo') || n.includes('hammer')) return <HammerIcon width={size} height={size} fill={color} />;
    
    return <SwordIcon width={size} height={size} fill={color} />;
  };

  const currentAC = combat.baseArmorClass + (combat.shieldOfFaithActive ? 2 : 0);
  const proficiencyBonus = Math.floor((level - 1) / 4) + 2;
  const dexMod = Math.floor((stats.dex - 10) / 2);
  const initiativeStr = dexMod >= 0 ? `+${dexMod}` : `${dexMod}`;
  const hasPerceptionProf = proficiencies.includes('Perception') || proficiencies.includes('Percepção');
  const wisMod = Math.floor((stats.wis - 10) / 2);
  const passivePerception = 10 + wisMod + (hasPerceptionProf ? proficiencyBonus : 0);

  return (
    <View style={styles.container}>
      {/* Horizontal Attributes Grid */}
      <View style={styles.horizontalAttributesRow}>
        {(Object.keys(stats) as Array<keyof BaseStats>).map(stat => {
          const modVal = Math.floor((stats[stat] - 10) / 2);
          const modStr = modVal >= 0 ? `+${modVal}` : `${modVal}`;

          return (
            <TouchableOpacity
              key={stat}
              style={[
                styles.attributeCardHorizontal,
                skillsExpanded && styles.attributeCardHorizontalActive
              ]}
              onPress={handleToggleSkills}
              activeOpacity={0.7}
            >
              <Text style={styles.attributeLabelHorizontal}>{stat.toUpperCase()}</Text>
              <Text style={styles.attributeModHorizontal}>{modStr}</Text>
              <Text style={styles.attributeScoreHorizontal}>{stats[stat]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 6-Column Collapsible Skills Grid directly under stats */}
      {skillsExpanded && (
        <>
          <View style={styles.skillsColumnsRow}>
            {(Object.keys(stats) as Array<keyof BaseStats>).map(stat => {
              const skills = SKILL_MAPPING[stat];

              return (
                <View key={stat} style={styles.skillsColumn}>
                  {skills.map(skill => {
                    const fullName = SKILL_FULL_NAMES[skill] || skill;
                    const isProficient = proficiencies.includes(skill) || proficiencies.includes(fullName);
                    const modVal = Math.floor((stats[stat] - 10) / 2);
                    const finalBonus = modVal + (isProficient ? proficiencyBonus : 0);
                    const finalBonusStr = finalBonus >= 0 ? `+${finalBonus}` : `${finalBonus}`;

                    return (
                      <View 
                        key={skill} 
                        style={[
                          styles.columnSkillItem,
                          isProficient && styles.columnSkillItemProficient
                        ]}
                      >
                        <Text style={[styles.columnSkillBonus, isProficient && styles.columnSkillBonusProficient]}>
                          {finalBonusStr}
                        </Text>
                        <Text 
                          style={[styles.columnSkillName, isProficient && styles.columnSkillNameProficient]}
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          minimumFontScale={0.75}
                        >
                          {skill}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>

          {/* Other Proficiencies Section */}
          {(() => {
            const classDefaults = getClassProficienciesSummary(characterClass);
            const customProficiencies = proficiencies.filter(p => !STANDARD_SKILLS_SET.has(p));
            const allTools = [...classDefaults.tools, ...customProficiencies];

            return (
              <View style={styles.otherProfsContainer}>
                <View style={styles.proficienciesDivider} />
                <Text style={styles.otherProfsTitle}>Outras Proficiências & Treinamentos</Text>
                
                <View style={styles.otherProfsCard}>
                  {/* Armor row */}
                  <View style={styles.otherProfRow}>
                    <View style={styles.otherProfRowLeft}>
                      <Ionicons name="shield-half-outline" size={13} color="#60A5FA" style={{ marginRight: 6 }} />
                      <Text style={styles.otherProfLabel}>Armaduras & Escudos:</Text>
                    </View>
                    <Text style={styles.otherProfValue}>{classDefaults.armors}</Text>
                  </View>
                  
                  {/* Weapons row */}
                  <View style={styles.otherProfRow}>
                    <View style={styles.otherProfRowLeft}>
                      <Ionicons name="cut-outline" size={13} color="#F59E0B" style={{ marginRight: 6 }} />
                      <Text style={styles.otherProfLabel}>Armas:</Text>
                    </View>
                    <Text style={styles.otherProfValue}>{classDefaults.weapons}</Text>
                  </View>
                  
                  {/* Tools row */}
                  <View style={[styles.otherProfRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                    <View style={styles.otherProfRowLeft}>
                      <Ionicons name="hammer-outline" size={13} color="#10B981" style={{ marginRight: 6 }} />
                      <Text style={styles.otherProfLabel}>Ferramentas & Idiomas:</Text>
                    </View>
                    <View style={styles.toolsBadgesContainer}>
                      {allTools.length === 0 ? (
                        <Text style={styles.otherProfValueEmpty}>Nenhum treinamento listado</Text>
                      ) : (
                        allTools.map((prof, index) => {
                          const isCustom = customProficiencies.includes(prof);
                          return (
                            <View key={prof + '-' + index} style={[styles.toolBadge, isCustom && styles.toolBadgeCustom]}>
                              <Text style={[styles.toolBadgeText, isCustom && styles.toolBadgeTextCustom]}>{prof}</Text>
                              {isCustom && onUpdateProficiencies && (
                                <TouchableOpacity 
                                  onPress={() => handleRemoveCustomProficiency(prof)}
                                  style={styles.toolBadgeDelete}
                                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                >
                                  <Ionicons name="close-circle" size={11} color="#EF4444" style={{ marginLeft: 3 }} />
                                </TouchableOpacity>
                              )}
                            </View>
                          );
                        })
                      )}
                    </View>
                  </View>

                  {/* Add Custom Proficiency Input Row */}
                  {onUpdateProficiencies && (
                    <View style={styles.addProfInputRow}>
                      <TextInput
                        style={styles.addProfInput}
                        placeholder="Adicionar ferramenta, idioma ou outro..."
                        placeholderTextColor="#64748B"
                        value={newProfText}
                        onChangeText={setNewProfText}
                        onSubmitEditing={handleAddProficiency}
                      />
                      <TouchableOpacity style={styles.addProfBtn} onPress={handleAddProficiency} activeOpacity={0.7}>
                        <Ionicons name="add" size={16} color="#0F172A" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            );
          })()}
        </>
      )}

      {/* Central View (Model placeholder taking 100% width with absolute stats overlay) */}
      <View style={styles.modelContainerFull}>
        <View style={styles.modelPlaceholder}>
          {/* Absolute HUD Badges Overlays */}
          <View style={styles.hudBadgesRow}>
            {/* C.A. */}
            <View style={styles.hudBadge}>
              <Ionicons name="shield" size={12} color={combat.shieldOfFaithActive ? '#60A5FA' : '#94A3B8'} style={{ marginRight: 3 }} />
              <Text style={styles.hudBadgeValue}>{currentAC}</Text>
              <Text style={styles.hudBadgeLabel}>C.A.</Text>
            </View>

            {/* INICIA. */}
            <View style={styles.hudBadge}>
              <Ionicons name="flash" size={12} color="#F59E0B" style={{ marginRight: 3 }} />
              <Text style={styles.hudBadgeValue}>{initiativeStr}</Text>
              <Text style={styles.hudBadgeLabel}>INIC.</Text>
            </View>

            {/* DESLOC. */}
            <View style={styles.hudBadge}>
              <Ionicons name="footsteps" size={12} color="#10B981" style={{ marginRight: 3 }} />
              <Text style={styles.hudBadgeValue}>9m</Text>
              <Text style={styles.hudBadgeLabel}>DESL.</Text>
            </View>

            {/* PERC. PASSIVA */}
            <View style={styles.hudBadge}>
              <Ionicons name="eye" size={12} color="#60A5FA" style={{ marginRight: 3 }} />
              <Text style={styles.hudBadgeValue}>{passivePerception}</Text>
              <Text style={styles.hudBadgeLabel}>PERC. P.</Text>
            </View>

            {/* PROF. */}
            <View style={styles.hudBadge}>
              <Ionicons name="star" size={12} color="#A78BFA" style={{ marginRight: 3 }} />
              <Text style={styles.hudBadgeValue}>+{proficiencyBonus}</Text>
              <Text style={styles.hudBadgeLabel}>PROF.</Text>
            </View>
          </View>

          {combat.shieldOfFaithActive && (
            <View style={styles.buffBadgeFloating}>
              <Ionicons name="sparkles" size={8} color="#60A5FA" style={{ marginRight: 3 }} />
              <Text style={styles.buffTextFloating}>SHIELD OF FAITH</Text>
            </View>
          )}

          {/* Skeleton Placeholder */}
          <Ionicons name="body-outline" size={32} color="rgba(148, 163, 184, 0.25)" />
          <Text style={styles.modelPlaceholderText}>MODELO DE BONECO</Text>
          <Text style={styles.modelPlaceholderSub}>Espaço reservado para visualização do personagem</Text>
        </View>
      </View>

      {/* Equipped Weapons HUD (Compact, Bottom Right) */}
      <View style={styles.weaponsHudContainer}>
        {(() => {
          const equippedWeapons = equipment.filter(item => item.type === 'weapon' && item.equipped);
          if (equippedWeapons.length === 0) return null;

          return equippedWeapons.map(item => {
            const isProficient = isProficientInItem(characterClass, 'weapon', item.name);
            const properties = item.properties || [];
            const isFinesse = properties.some(p => p.toLowerCase().includes('acuidade') || p.toLowerCase().includes('finesse'));
            
            const nameLower = item.name.toLowerCase();
            const isRanged = nameLower.includes('arco') || nameLower.includes('bow') || nameLower.includes('besta') || nameLower.includes('crossbow') || nameLower.includes('honda') || nameLower.includes('sling') || nameLower.includes('dardo') || nameLower.includes('dart') || properties.some(p => p.toLowerCase().includes('distância') || p.toLowerCase().includes('munição') || p.toLowerCase().includes('ranged'));
            
            const strMod = Math.floor((stats.str - 10) / 2);
            const dexMod = Math.floor((stats.dex - 10) / 2);
            
            let mod = strMod;
            if (isRanged) mod = dexMod;
            else if (isFinesse) mod = Math.max(strMod, dexMod);
            
            let magicBonus = 0;
            const magicMatch = item.name.match(/\+(\d+)/);
            if (magicMatch) magicBonus = parseInt(magicMatch[1], 10);
            
            const atkBonus = mod + (isProficient ? proficiencyBonus : 0) + magicBonus;
            const atkBonusStr = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
            
            let baseDice = item.dmgDice || '1d4';
            const diceMatch = baseDice.match(/^(\d+d\d+)/);
            if (diceMatch) baseDice = diceMatch[1];
            
            const dmgMod = mod + magicBonus;
            const dmgModStr = dmgMod > 0 ? `+${dmgMod}` : dmgMod < 0 ? `${dmgMod}` : '';
            const currentDmg = `${baseDice}${dmgModStr}`;
            
            let rangeText = '1.5m';
            const rangeProp = properties.find(p => p.toLowerCase().includes('dist.') || p.toLowerCase().includes('alcance'));
            if (rangeProp) {
              const distMatch = rangeProp.match(/dist\.\s*([^)]+)/i);
              if (distMatch) rangeText = distMatch[1];
              else if (rangeProp.toLowerCase().includes('alcance')) rangeText = '3m';
            }
            
            return (
              <WeaponCard 
                key={item.id}
                item={item}
                atkBonusStr={atkBonusStr}
                currentDmg={currentDmg}
                rangeText={rangeText}
                getSvgIcon={getSvgIcon}
              />
            );
          });
        })()}

        {/* Ammunition Trackers */}
        {(() => {
          const ammos = equipment?.filter(e => e.type === 'ammunition') || [];
          return ammos.map(ammo => (
            <TouchableOpacity 
              key={ammo.id} 
              style={styles.ammoCard}
              onPress={() => {
                console.log('Ammo clicked!', ammo.name, ammo.customResourceMax, !!onUpdateEquipment);
                if (ammo.customResourceMax !== undefined && ammo.customResourceMax > 0 && onUpdateEquipment) {
                  const newEq = equipment.map(e => 
                    e.id === ammo.id 
                      ? { ...e, customResourceMax: (e.customResourceMax || 0) - 1 }
                      : e
                  );
                  console.log('Calling onUpdateEquipment with new max:', (ammo.customResourceMax || 0) - 1);
                  onUpdateEquipment(newEq);
                } else {
                  console.log('Condition failed:', { val: ammo.customResourceMax, fn: !!onUpdateEquipment });
                }
              }}
            >
              <ArrowIcon width={14} height={14} fill="#64748B" />
              <Text style={styles.ammoCount}>{ammo.customResourceMax || 0}</Text>
            </TouchableOpacity>
          ));
        })()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  horizontalAttributesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  attributeCardHorizontal: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.4)',
    paddingVertical: 6,
    marginHorizontal: 1.5,
    alignItems: 'center',
  },
  attributeCardHorizontalActive: {
    borderColor: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
  },
  attributeLabelHorizontal: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '800',
  },
  attributeModHorizontal: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '900',
    marginVertical: 1,
  },
  attributeScoreHorizontal: {
    color: '#475569',
    fontSize: 8,
    fontWeight: '700',
    marginTop: -2,
  },
  skillsColumnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  skillsColumn: {
    flex: 1,
    marginHorizontal: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  columnSkillItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(51, 65, 85, 0.3)',
    paddingVertical: 3,
    paddingHorizontal: 2,
    marginBottom: 4,
    width: '100%',
  },
  columnSkillItemProficient: {
    borderColor: 'rgba(245, 158, 11, 0.4)',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
  },
  columnSkillBonus: {
    color: '#94A3B8',
    fontSize: 9.5,
    fontWeight: '900',
  },
  columnSkillBonusProficient: {
    color: '#F59E0B',
  },
  columnSkillName: {
    color: '#64748B',
    fontSize: 7.5,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 1,
    width: '100%',
    paddingHorizontal: 1,
  },
  columnSkillNameProficient: {
    color: '#E2E8F0',
    fontWeight: '800',
  },
  modelContainerFull: {
    width: '100%',
    marginTop: 2,
    marginBottom: 6,
  },
  modelPlaceholder: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(148, 163, 184, 0.15)',
    borderRadius: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    minHeight: 180,
    position: 'relative',
  },
  modelPlaceholderText: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '800',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  modelPlaceholderSub: {
    color: '#475569',
    fontSize: 8,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  hudBadgesRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  hudBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  hudBadgeValue: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '900',
    marginRight: 2,
  },
  hudBadgeLabel: {
    color: '#94A3B8',
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  buffBadgeFloating: {
    position: 'absolute',
    top: 36,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.25)',
    borderColor: '#3b82f6',
    borderWidth: 0.5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 10,
  },
  buffTextFloating: {
    color: '#60A5FA',
    fontSize: 8,
    fontWeight: '800',
  },
  weaponsHudContainer: {
    position: 'absolute',
    bottom: -8,
    right: 4,
    alignItems: 'flex-end',
    zIndex: 20,
    flexDirection: 'column',
  },
  weaponHudCardCompact: {
    flexDirection: 'column',
    backgroundColor: 'rgba(15, 23, 42, 0.75)', // blending more with dark theme
    borderColor: 'rgba(51, 65, 85, 0.5)', // subtle border instead of yellow
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    minWidth: 90,
  },
  weaponHudHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weaponIconWrapper: {
    marginRight: 6,
    opacity: 0.9,
  },
  weaponHudExpanded: {
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(51, 65, 85, 0.4)',
  },
  weaponNameCompact: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 2,
  },
  weaponAtkCompact: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '900',
    marginRight: 6,
  },
  weaponDmgCompact: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '800',
  },
  weaponRangeCompact: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '600',
  },
  weaponPropsCompact: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '500',
    marginTop: 2,
  },
  ammoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderColor: 'rgba(51, 65, 85, 0.6)',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  ammoCount: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 6,
  },
});
