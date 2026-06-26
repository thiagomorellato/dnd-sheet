import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, LayoutAnimation, Platform, UIManager, Modal, TextInput, Alert } from 'react-native';
import { HP, CombatConfig, BaseStats, Coins, HitDice } from '../types/character';
import { Ionicons } from '@expo/vector-icons';
import { getHitDieType } from '../utils/dndRules';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface VitalsWidgetProps {
  hp: HP;
  combat: CombatConfig;
  characterName: string;
  characterClass: string;
  onUpdateHP: (updatedHp: HP, changeAmount: number, isHeal: boolean) => void;
  stats: BaseStats;
  proficiencies: string[];
  level: number;
  coins: Coins;
  onUpdateCoins: (coins: Coins) => void;
  hitDice?: HitDice;
  onUpdateHitDice: (current: number) => void;
}

const SKILL_MAPPING: Record<keyof BaseStats, string[]> = {
  str: ['Athletics'],
  dex: ['Acrobatics', 'Sleight', 'Stealth'],
  con: [],
  int: ['Arcana', 'History', 'Investig.', 'Nature', 'Religion'],
  wis: ['Animal H.', 'Insight', 'Medicine', 'Perception', 'Survival'],
  cha: ['Deception', 'Intimid.', 'Perform.', 'Persuasion'],
};

const SKILL_FULL_NAMES: Record<string, string> = {
  'Sleight': 'Sleight of Hand',
  'Investig.': 'Investigation',
  'Animal H.': 'Animal Handling',
  'Intimid.': 'Intimidation',
  'Perform.': 'Performance',
};

export const VitalsWidget: React.FC<VitalsWidgetProps> = ({
  hp,
  combat,
  characterName,
  characterClass,
  onUpdateHP,
  stats,
  proficiencies = [],
  level,
  coins = { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 },
  onUpdateCoins,
  hitDice,
  onUpdateHitDice,
}) => {
  const [multiplier, setMultiplier] = useState<1 | 5 | 10 | 20>(1);
  const [statsExpanded, setStatsExpanded] = useState(false);
  const [coinsModalVisible, setCoinsModalVisible] = useState(false);
  const [hpModalVisible, setHpModalVisible] = useState(false);

  const [editCP, setEditCP] = useState(String(coins.cp));
  const [editSP, setEditSP] = useState(String(coins.sp));
  const [editEP, setEditEP] = useState(String(coins.ep));
  const [editGP, setEditGP] = useState(String(coins.gp));
  const [editPP, setEditPP] = useState(String(coins.pp));

  const [editCurrentHP, setEditCurrentHP] = useState(String(hp.current));
  const [editMaxHP, setEditMaxHP] = useState(String(hp.max));
  const [editTempHP, setEditTempHP] = useState(String(hp.temp || 0));

  const handleSaveCoins = () => {
    onUpdateCoins({
      cp: parseInt(editCP, 10) || 0,
      sp: parseInt(editSP, 10) || 0,
      ep: parseInt(editEP, 10) || 0,
      gp: parseInt(editGP, 10) || 0,
      pp: parseInt(editPP, 10) || 0,
    });
    setCoinsModalVisible(false);
  };

  const handleOpenHPModal = () => {
    setEditCurrentHP(String(hp.current));
    setEditMaxHP(String(hp.max));
    setEditTempHP(String(hp.temp || 0));
    setHpModalVisible(true);
  };

  const handleSaveHP = () => {
    const nextMax = Math.max(1, parseInt(editMaxHP, 10) || 1);
    let nextCurrent = parseInt(editCurrentHP, 10) || 0;
    let nextTemp = Math.max(0, parseInt(editTempHP, 10) || 0);

    // Overflow extra healing/current HP into temporary HP
    if (nextCurrent > nextMax) {
      nextTemp += (nextCurrent - nextMax);
      nextCurrent = nextMax;
    } else if (nextCurrent < 0) {
      nextCurrent = 0;
    }

    const oldTotal = hp.current + (hp.temp || 0);
    const newTotal = nextCurrent + nextTemp;
    const change = newTotal - oldTotal;

    if (change !== 0 || hp.max !== nextMax) {
      onUpdateHP(
        { current: nextCurrent, max: nextMax, temp: nextTemp },
        Math.abs(change),
        change > 0
      );
    }
    setHpModalVisible(false);
  };

  const hpPercentage = Math.max(0, Math.min(100, (hp.current / hp.max) * 100));
  const currentAC = combat.baseArmorClass + (combat.shieldOfFaithActive ? 2 : 0);
  const proficiencyBonus = Math.floor((level - 1) / 4) + 2;

  const cycleMultiplier = () => {
    setMultiplier(prev => {
      if (prev === 1) return 5;
      if (prev === 5) return 10;
      if (prev === 10) return 20;
      return 1;
    });
  };

  const handleAdjust = (isHeal: boolean) => {
    const amount = multiplier;
    let nextHp = hp.current;
    let nextTemp = hp.temp || 0;

    if (isHeal) {
      if (nextHp < hp.max) {
        const needed = hp.max - nextHp;
        if (amount <= needed) {
          nextHp += amount;
        } else {
          nextHp = hp.max;
          nextTemp += (amount - needed);
        }
      } else {
        nextTemp += amount;
      }
    } else {
      if (nextTemp > 0) {
        if (amount <= nextTemp) {
          nextTemp -= amount;
        } else {
          const remainingDamage = amount - nextTemp;
          nextTemp = 0;
          nextHp = Math.max(0, nextHp - remainingDamage);
        }
      } else {
        nextHp = Math.max(0, nextHp - amount);
      }
    }

    const change = (nextHp + nextTemp) - (hp.current + (hp.temp || 0));
    if (change === 0) return;

    onUpdateHP(
      { ...hp, current: nextHp, temp: nextTemp },
      Math.abs(change),
      change > 0
    );
  };

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setStatsExpanded(!statsExpanded);
  };

  const getHpColor = () => {
    if (hpPercentage > 50) return '#10B981'; // Green
    if (hpPercentage > 20) return '#F59E0B'; // Orange/Amber
    return '#EF4444'; // Red
  };

  const hdCurrent = hitDice ? hitDice.current : level;
  const hdMax = level;
  const hdType = hitDice ? hitDice.dieType : getHitDieType(characterClass);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/paladin_bg.jpg')}
        style={styles.bgImage}
        imageStyle={styles.bgImageStyles}
      >
        <View style={styles.overlay}>
          <View style={styles.mainRow}>
            
            <View style={styles.leftColumn}>
              <TouchableOpacity
                style={styles.attributesHeaderVertical}
                onPress={toggleExpand}
                activeOpacity={0.7}
              >
                <Ionicons name="git-branch" size={12} color="#F59E0B" style={{ marginRight: 4 }} />
                <Text style={styles.attributesTitleVertical}>ATRIBUTOS</Text>
                <Ionicons name={statsExpanded ? 'chevron-up' : 'chevron-down'} size={12} color="#94A3B8" style={{ marginLeft: 2 }} />
              </TouchableOpacity>
              
              <View style={styles.verticalStatsContainer}>
                {(Object.keys(stats) as Array<keyof BaseStats>).map(stat => {
                  const skills = SKILL_MAPPING[stat];
                  const modVal = Math.floor((stats[stat] - 10) / 2);
                  const modStr = modVal >= 0 ? `+${modVal}` : `${modVal}`;

                  return (
                    <View
                      key={stat}
                      style={[
                        styles.statCardVertical,
                        statsExpanded && skills.length > 0 && styles.statCardVerticalExpanded
                      ]}
                    >
                      <View style={styles.statCardHeader}>
                        <Text style={styles.statLabelVertical}>{stat.toUpperCase()}</Text>
                        <Text style={styles.modTextVertical}>{modStr}</Text>
                        <Text style={styles.scoreTextVertical}>{stats[stat]}</Text>
                      </View>

                      {statsExpanded && skills.length > 0 && (
                        <View style={styles.skillsSectionVertical}>
                          {skills.map(skill => {
                            const fullName = SKILL_FULL_NAMES[skill] || skill;
                            const isProficient = proficiencies.includes(skill) || proficiencies.includes(fullName);
                            const finalBonus = modVal + (isProficient ? proficiencyBonus : 0);
                            const finalBonusStr = finalBonus >= 0 ? `+${finalBonus}` : `${finalBonus}`;

                            return (
                              <View key={skill} style={styles.skillItemVertical}>
                                <Ionicons
                                  name="ellipse"
                                  size={4}
                                  color={isProficient ? '#F59E0B' : '#475569'}
                                  style={styles.skillDotVertical}
                                />
                                <Text style={[styles.skillBonusVertical, isProficient && styles.skillBonusProficientVertical]}>
                                  {finalBonusStr}
                                </Text>
                                <Text style={[styles.skillNameVertical, isProficient && styles.skillNameProficientVertical]} numberOfLines={1}>
                                  {skill}
                                </Text>
                              </View>
                            );
                          })}
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.middleColumn}>
              <View style={styles.modelPlaceholder}>
                <Ionicons name="body-outline" size={24} color="rgba(148, 163, 184, 0.25)" />
                <Text style={styles.modelPlaceholderText}>MODELO DE BONECO</Text>
                <Text style={styles.modelPlaceholderSub}>Espaço reservado para visualização do personagem</Text>
              </View>
            </View>

            <View style={styles.rightColumn}>
              <View style={styles.badgesRow}>
                <View style={styles.acBadgeCompact}>
                  <View style={styles.acIconWrapperCompact}>
                    <Ionicons name="shield" size={32} color={combat.shieldOfFaithActive ? '#60A5FA' : '#94A3B8'} />
                    <Text style={styles.acTextCompact}>{currentAC}</Text>
                  </View>
                  <Text style={styles.badgeLabelCompact}>C.A.</Text>
                </View>

                <View style={styles.profBadgeCompact}>
                  <View style={styles.profIconWrapperCompact}>
                    <Ionicons name="medal" size={32} color="#94A3B8" />
                    <Text style={styles.profTextCompact}>+{proficiencyBonus}</Text>
                  </View>
                  <Text style={styles.badgeLabelCompact}>PROF</Text>
                </View>
              </View>

              {combat.shieldOfFaithActive && (
                <View style={styles.buffBadgeCompact}>
                  <Ionicons name="sparkles" size={10} color="#60A5FA" style={{ marginRight: 4 }} />
                  <Text style={styles.buffTextCompact}>SHIELD OF FAITH ON SELF</Text>
                </View>
              )}

              <Text style={styles.charTitleCompact} numberOfLines={1}>{characterName.toUpperCase()}</Text>

              <TouchableOpacity 
                style={styles.coinsContainerCompact} 
                onPress={() => {
                  setEditCP(String(coins.cp));
                  setEditSP(String(coins.sp));
                  setEditEP(String(coins.ep));
                  setEditGP(String(coins.gp));
                  setEditPP(String(coins.pp));
                  setCoinsModalVisible(true);
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="wallet" size={11} color="#F59E0B" style={{ marginRight: 4 }} />
                <View style={styles.coinBadgeCompact}>
                  <View style={[styles.coinDot, { backgroundColor: '#F59E0B' }]} />
                  <Text style={styles.coinTextCompact}>{coins.gp} gp</Text>
                </View>
                <View style={styles.coinBadgeCompact}>
                  <View style={[styles.coinDot, { backgroundColor: '#E2E8F0' }]} />
                  <Text style={styles.coinTextCompact}>{coins.pp} pp</Text>
                </View>
                <View style={styles.coinBadgeCompact}>
                  <View style={[styles.coinDot, { backgroundColor: '#94A3B8' }]} />
                  <Text style={styles.coinTextCompact}>{coins.sp} sp</Text>
                </View>
                <View style={styles.coinBadgeCompact}>
                  <View style={[styles.coinDot, { backgroundColor: '#B45309' }]} />
                  <Text style={styles.coinTextCompact}>{coins.cp} cp</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.bottomArea}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${hpPercentage}%`, backgroundColor: getHpColor() },
                ]}
              />
            </View>

            <View style={styles.hpControlsRow}>
              <TouchableOpacity style={styles.hpValuesWrapper} onPress={handleOpenHPModal} activeOpacity={0.7}>
                <Text style={styles.hpCurrentLabel}>
                  {(hp.temp ?? 0) > 0 ? (hp.current + (hp.temp ?? 0)) : hp.current}
                </Text>
                <Text style={styles.hpMaxLabel}>
                  /{hp.max}{(hp.temp ?? 0) > 0 ? ` (+${hp.temp})` : ''} HP
                </Text>
                <Ionicons name="create-outline" size={10} color="#64748B" style={{ marginLeft: 3, alignSelf: 'center' }} />
              </TouchableOpacity>

              <View style={styles.quickControls}>
                <TouchableOpacity style={[styles.controlBtnCompact, styles.btnDamageCompact]} onPress={() => handleAdjust(false)}>
                  <Ionicons name="remove" size={14} color="#F8FAFC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.multiplierBtnCompact} onPress={cycleMultiplier}>
                  <Text style={styles.multiplierValCompact}>{multiplier}x</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.controlBtnCompact, styles.btnHealCompact]} onPress={() => handleAdjust(true)}>
                  <Ionicons name="add" size={14} color="#F8FAFC" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.hitDiceRow}>
              <View style={styles.hitDiceTopRow}>
                <Text style={styles.hitDiceLabel}>DADOS DE VIDA</Text>
                <View style={styles.diceContainer}>
                  {Array.from({ length: hdMax }).map((_, idx) => {
                    const isActive = idx < hdCurrent;
                    return (
                      <TouchableOpacity
                        key={idx}
                        onPress={() => {
                          if (isActive) {
                            onUpdateHitDice(idx);
                          } else {
                            onUpdateHitDice(idx + 1);
                          }
                        }}
                        style={styles.dieButton}
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name={isActive ? 'dice' : 'dice-outline'}
                          size={16}
                          color={isActive ? '#F59E0B' : '#475569'}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <Text style={styles.hitDiceValueSub}>
                {hdCurrent}/{hdMax} ({hdType})
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      <Modal
        animationType="slide"
        transparent={true}
        visible={coinsModalVisible}
        onRequestClose={() => setCoinsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Gerenciador de Moedas</Text>
              <TouchableOpacity onPress={() => setCoinsModalVisible(false)}>
                <Ionicons name="close" size={22} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <View style={styles.coinInputsContainer}>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, { backgroundColor: '#F59E0B' }]} />
                <Text style={styles.coinInputLabel}>Ouro (PO):</Text>
                <TextInput
                  style={styles.coinTextInput}
                  keyboardType="numeric"
                  value={editGP}
                  onChangeText={setEditGP}
                />
              </View>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, { backgroundColor: '#E2E8F0' }]} />
                <Text style={styles.coinInputLabel}>Platina (PL):</Text>
                <TextInput
                  style={styles.coinTextInput}
                  keyboardType="numeric"
                  value={editPP}
                  onChangeText={setEditPP}
                />
              </View>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, { backgroundColor: '#A78BFA' }]} />
                <Text style={styles.coinInputLabel}>Electro (PE):</Text>
                <TextInput
                  style={styles.coinTextInput}
                  keyboardType="numeric"
                  value={editEP}
                  onChangeText={setEditEP}
                />
              </View>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, { backgroundColor: '#94A3B8' }]} />
                <Text style={styles.coinInputLabel}>Prata (PP):</Text>
                <TextInput
                  style={styles.coinTextInput}
                  keyboardType="numeric"
                  value={editSP}
                  onChangeText={setEditSP}
                />
              </View>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, { backgroundColor: '#B45309' }]} />
                <Text style={styles.coinInputLabel}>Cobre (PC):</Text>
                <TextInput
                  style={styles.coinTextInput}
                  keyboardType="numeric"
                  value={editCP}
                  onChangeText={setEditCP}
                />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setCoinsModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveCoins}>
                <Text style={styles.saveBtnText}>Salvar Moedas</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* HP Editing Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={hpModalVisible}
        onRequestClose={() => setHpModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Gerenciador de Pontos de Vida</Text>
              <TouchableOpacity onPress={() => setHpModalVisible(false)}>
                <Ionicons name="close" size={22} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <View style={styles.coinInputsContainer}>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.coinInputLabel}>PV Atuais (Current HP):</Text>
                <TextInput
                  style={styles.coinTextInput}
                  keyboardType="numeric"
                  value={editCurrentHP}
                  onChangeText={setEditCurrentHP}
                />
              </View>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, { backgroundColor: '#EF4444' }]} />
                <Text style={styles.coinInputLabel}>PV Máximos (Max HP):</Text>
                <TextInput
                  style={styles.coinTextInput}
                  keyboardType="numeric"
                  value={editMaxHP}
                  onChangeText={setEditMaxHP}
                />
              </View>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, { backgroundColor: '#3B82F6' }]} />
                <Text style={styles.coinInputLabel}>PV Temporários (Temp HP):</Text>
                <TextInput
                  style={styles.coinTextInput}
                  keyboardType="numeric"
                  value={editTempHP}
                  onChangeText={setEditTempHP}
                />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setHpModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveHP}>
                <Text style={styles.saveBtnText}>Salvar PV</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
    backgroundColor: '#1E293B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  bgImage: {
    width: '100%',
  },
  bgImageStyles: {
    opacity: 0.35,
  },
  overlay: {
    padding: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  leftColumn: {
    width: '24%',
  },
  middleColumn: {
    width: '46%',
  },
  modelPlaceholder: {
    flex: 1,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(148, 163, 184, 0.15)',
    borderRadius: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    minHeight: 180,
  },
  modelPlaceholderText: {
    color: '#64748B',
    fontSize: 8.5,
    fontWeight: '800',
    marginTop: 6,
    letterSpacing: 0.5,
  },
  modelPlaceholderSub: {
    color: '#475569',
    fontSize: 7,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  rightColumn: {
    width: '26%',
    flexDirection: 'column',
  },
  attributesHeaderVertical: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 2,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.4)',
    marginBottom: 4,
  },
  attributesTitleVertical: {
    color: '#94A3B8',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  verticalStatsContainer: {
    flexDirection: 'column',
  },
  statCardVertical: {
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.4)',
    paddingVertical: 1.5,
    paddingHorizontal: 3,
    marginBottom: 2,
    alignItems: 'center',
    width: '100%',
  },
  statCardVerticalExpanded: {
    borderColor: 'rgba(245, 158, 11, 0.4)',
  },
  statCardHeader: {
    alignItems: 'center',
    width: '100%',
  },
  statLabelVertical: {
    color: '#64748B',
    fontSize: 7,
    fontWeight: '800',
  },
  modTextVertical: {
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '900',
    marginVertical: 0,
  },
  scoreTextVertical: {
    color: '#475569',
    fontSize: 7,
    fontWeight: '700',
  },
  skillsSectionVertical: {
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(51, 65, 85, 0.4)',
    marginTop: 2,
    paddingTop: 2,
    width: '100%',
  },
  skillItemVertical: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
    width: '100%',
  },
  skillDotVertical: {
    marginRight: 2,
  },
  skillBonusVertical: {
    color: '#64748B',
    fontSize: 7.5,
    fontWeight: '800',
    marginRight: 2,
    minWidth: 12,
  },
  skillBonusProficientVertical: {
    color: '#F59E0B',
  },
  skillNameVertical: {
    color: '#64748B',
    fontSize: 7.5,
    fontWeight: '500',
    flex: 1,
  },
  skillNameProficientVertical: {
    color: '#E2E8F0',
    fontWeight: '700',
  },
  badgesRow: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 4,
  },
  acBadgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 4,
    width: '100%',
  },
  acIconWrapperCompact: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  acTextCompact: {
    position: 'absolute',
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '900',
    zIndex: 10,
  },
  profBadgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    width: '100%',
  },
  profIconWrapperCompact: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  profTextCompact: {
    position: 'absolute',
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '900',
    zIndex: 10,
  },
  badgeLabelCompact: {
    color: '#94A3B8',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginLeft: 4,
    flex: 1,
  },
  buffBadgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
    borderColor: '#3b82f6',
    borderWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buffTextCompact: {
    color: '#60A5FA',
    fontSize: 8,
    fontWeight: '800',
  },
  charTitleCompact: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 4,
  },
  progressBarBg: {
    height: 6,
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: 3,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#334155',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  hpControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    width: '100%',
  },
  hpValuesWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flex: 1.2,
  },
  hpCurrentLabel: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '900',
  },
  hpMaxLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 1.5,
  },
  quickControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1.8,
  },
  controlBtnCompact: {
    width: 24,
    height: 24,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDamageCompact: {
    backgroundColor: '#EF4444',
  },
  btnHealCompact: {
    backgroundColor: '#10B981',
  },
  multiplierBtnCompact: {
    width: 24,
    height: 24,
    borderRadius: 5,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderWidth: 1,
    borderColor: '#F59E0B',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  multiplierValCompact: {
    color: '#F59E0B',
    fontSize: 9,
    fontWeight: '900',
  },
  coinsContainerCompact: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 4,
    paddingHorizontal: 4,
    marginTop: 6,
    width: '100%',
  },
  coinBadgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 3,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#334155',
    margin: 1.5,
  },
  coinDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginRight: 3,
  },
  coinTextCompact: {
    color: '#E2E8F0',
    fontSize: 7.5,
    fontWeight: '700',
  },
  bottomArea: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(51, 65, 85, 0.4)',
    paddingTop: 10,
    width: '100%',
  },
  hitDiceRow: {
    flexDirection: 'column',
    marginTop: 8,
    width: '100%',
  },
  hitDiceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  hitDiceLabel: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '800',
  },
  diceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dieButton: {
    paddingHorizontal: 3,
  },
  hitDiceValueSub: {
    color: '#475569',
    fontSize: 8,
    fontWeight: '700',
    textAlign: 'right',
    marginTop: 2,
    paddingRight: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
  },
  coinInputsContainer: {
    flexDirection: 'column',
    marginBottom: 10,
  },
  coinInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  coinInputLabel: {
    flex: 1,
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8,
  },
  coinTextInput: {
    backgroundColor: '#1E293B',
    color: '#F8FAFC',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 6,
    width: 80,
    height: 32,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '800',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  cancelBtnText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
  },
  saveBtn: {
    backgroundColor: '#F59E0B',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  saveBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
  },
});
