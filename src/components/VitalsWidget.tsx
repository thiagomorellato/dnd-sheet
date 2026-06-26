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
  const [activeStat, setActiveStat] = useState<keyof BaseStats | null>(null);

  const handleToggleStat = (stat: keyof BaseStats) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (activeStat === stat) {
      setActiveStat(null);
    } else {
      setActiveStat(stat);
    }
  };
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
      {/* Horizontal Attributes Grid */}
      <View style={styles.horizontalAttributesRow}>
        {(Object.keys(stats) as Array<keyof BaseStats>).map(stat => {
          const modVal = Math.floor((stats[stat] - 10) / 2);
          const modStr = modVal >= 0 ? `+${modVal}` : `${modVal}`;
          const isActive = activeStat === stat;

          return (
            <TouchableOpacity
              key={stat}
              style={[
                styles.attributeCardHorizontal,
                isActive && styles.attributeCardHorizontalActive
              ]}
              onPress={() => handleToggleStat(stat)}
              activeOpacity={0.7}
            >
              <Text style={styles.attributeLabelHorizontal}>{stat.toUpperCase()}</Text>
              <Text style={styles.attributeModHorizontal}>{modStr}</Text>
              <Text style={styles.attributeScoreHorizontal}>{stats[stat]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Interactive Skills Panel (Collapsible drawer below attributes) */}
      {activeStat && (
        <View style={styles.skillsDrawer}>
          <View style={styles.skillsDrawerHeader}>
            <Text style={styles.skillsDrawerTitle}>
              PERÍCIAS ({activeStat.toUpperCase()})
            </Text>
            <TouchableOpacity onPress={() => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
              setActiveStat(null);
            }}>
              <Ionicons name="close-circle" size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>
          <View style={styles.skillsDrawerContent}>
            {SKILL_MAPPING[activeStat].length > 0 ? (
              <View style={styles.skillsDrawerGrid}>
                {SKILL_MAPPING[activeStat].map(skill => {
                  const fullName = SKILL_FULL_NAMES[skill] || skill;
                  const isProficient = proficiencies.includes(skill) || proficiencies.includes(fullName);
                  const modVal = Math.floor((stats[activeStat] - 10) / 2);
                  const finalBonus = modVal + (isProficient ? proficiencyBonus : 0);
                  const finalBonusStr = finalBonus >= 0 ? `+${finalBonus}` : `${finalBonus}`;

                  return (
                    <View key={skill} style={styles.drawerSkillItem}>
                      <Ionicons
                        name="ellipse"
                        size={5}
                        color={isProficient ? '#F59E0B' : '#475569'}
                        style={{ marginRight: 4 }}
                      />
                      <Text style={[styles.drawerSkillBonus, isProficient && styles.drawerSkillBonusProficient]}>
                        {finalBonusStr}
                      </Text>
                      <Text style={[styles.drawerSkillName, isProficient && styles.drawerSkillNameProficient]}>
                        {fullName}
                      </Text>
                    </View>
                  );
                })}
              </View>
            ) : (
              <Text style={styles.noSkillsText}>Nenhuma perícia vinculada a {activeStat.toUpperCase()}.</Text>
            )}
          </View>
        </View>
      )}

      {/* Central View (Model placeholder and Combat info side-by-side) */}
      <View style={styles.middleRow}>
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
                <Ionicons name="star" size={32} color="#94A3B8" />
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

      {/* Bottom Area (HP Progress Bar & Combat Controls at the bottom) */}
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
          {/* Left: HP values editing trigger */}
          <TouchableOpacity style={styles.hpValuesWrapper} onPress={handleOpenHPModal} activeOpacity={0.7}>
            <Text style={styles.hpCurrentLabel}>
              {(hp.temp ?? 0) > 0 ? (hp.current + (hp.temp ?? 0)) : hp.current}
            </Text>
            <Text style={styles.hpMaxLabel}>
              /{hp.max}{(hp.temp ?? 0) > 0 ? ` (+${hp.temp})` : ''} HP
            </Text>
            <Ionicons name="create-outline" size={10} color="#64748B" style={{ marginLeft: 3, alignSelf: 'center' }} />
          </TouchableOpacity>

          {/* Middle: HP Adjustments (- / + / Multiplier) */}
          <View style={styles.quickControls}>
            <TouchableOpacity style={[styles.controlBtnCompact, styles.btnDamageCompact]} onPress={() => handleAdjust(false)}>
              <Ionicons name="remove" size={14} color="#F8FAFC" />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.controlBtnCompact, styles.btnHealCompact]} onPress={() => handleAdjust(true)}>
              <Ionicons name="add" size={14} color="#F8FAFC" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.multiplierBtnCompact} onPress={cycleMultiplier}>
              <Text style={styles.multiplierValCompact}>{multiplier}x</Text>
            </TouchableOpacity>
          </View>

          {/* Right: Hit Dice Section (visual icons above numeric text) */}
          <View style={styles.hitDiceSection}>
            <TouchableOpacity
              style={styles.hitDiceInteractiveContainer}
              onPress={() => {
                if (hdCurrent > 0) {
                  onUpdateHitDice(hdCurrent - 1);
                } else {
                  onUpdateHitDice(hdMax);
                }
              }}
              activeOpacity={0.7}
            >
              {/* Row of cubes above text */}
              <View style={styles.hitDiceCubesRow}>
                {Array.from({ length: hdMax }).map((_, idx) => (
                  <Ionicons
                    key={idx}
                    name={idx < hdCurrent ? "cube" : "cube-outline"}
                    size={10}
                    color={idx < hdCurrent ? "#EF4444" : "#475569"}
                    style={{ marginRight: 2 }}
                  />
                ))}
              </View>
              <Text style={styles.hitDiceTextCompact}>
                {hdCurrent}/{hdMax} ({hdType})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
    width: '100%',
    marginBottom: 16,
  },
  rightSideControls: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  overlay: {
    padding: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
  },
  horizontalAttributesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  attributeCardHorizontal: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.4)',
    paddingVertical: 4,
    marginHorizontal: 1.5,
    alignItems: 'center',
  },
  attributeCardHorizontalActive: {
    borderColor: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
  },
  attributeLabelHorizontal: {
    color: '#64748B',
    fontSize: 7.5,
    fontWeight: '800',
  },
  attributeModHorizontal: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '900',
    marginVertical: 0,
  },
  attributeScoreHorizontal: {
    color: '#475569',
    fontSize: 7.5,
    fontWeight: '700',
    marginTop: -2,
  },
  skillsDrawer: {
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.5)',
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  skillsDrawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
    paddingBottom: 4,
    marginBottom: 8,
  },
  skillsDrawerTitle: {
    color: '#F59E0B',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  skillsDrawerContent: {
    width: '100%',
  },
  skillsDrawerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  drawerSkillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 5,
  },
  drawerSkillBonus: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '800',
    marginRight: 4,
    minWidth: 14,
  },
  drawerSkillBonusProficient: {
    color: '#F59E0B',
  },
  drawerSkillName: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '600',
    flex: 1,
  },
  drawerSkillNameProficient: {
    color: '#E2E8F0',
    fontWeight: '800',
  },
  noSkillsText: {
    color: '#475569',
    fontSize: 8,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 4,
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    width: '100%',
    marginTop: 2,
    marginBottom: 8,
  },
  middleColumn: {
    width: '58%',
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
    minHeight: 110,
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
    width: '38%',
    flexDirection: 'column',
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  acBadgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    flex: 1,
    marginRight: 4,
  },
  acIconWrapperCompact: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  acTextCompact: {
    position: 'absolute',
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '900',
    zIndex: 10,
  },
  profBadgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    flex: 1,
  },
  profIconWrapperCompact: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
  },
  profTextCompact: {
    position: 'absolute',
    color: '#F8FAFC',
    fontSize: 10,
    fontWeight: '900',
    zIndex: 10,
  },
  badgeLabelCompact: {
    color: '#94A3B8',
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginLeft: 3,
    flex: 1,
  },
  buffBadgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
    borderColor: '#3b82f6',
    borderWidth: 0.5,
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    borderRadius: 6,
    marginBottom: 4,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  buffTextCompact: {
    color: '#60A5FA',
    fontSize: 7.5,
    fontWeight: '800',
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
    flex: 1,
  },
  hpCurrentLabel: {
    color: '#F8FAFC',
    fontSize: 15,
    fontWeight: '900',
  },
  hpMaxLabel: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '700',
    marginLeft: 1.5,
  },
  quickControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.2,
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
    marginLeft: 4,
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
    marginLeft: 4,
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
    paddingVertical: 3,
    paddingHorizontal: 3,
    marginTop: 4,
    width: '100%',
  },
  coinBadgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 2.5,
    paddingVertical: 0.5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#334155',
    margin: 1,
  },
  coinDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginRight: 2,
  },
  coinTextCompact: {
    color: '#E2E8F0',
    fontSize: 7,
    fontWeight: '700',
  },
  bottomArea: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(51, 65, 85, 0.4)',
    paddingTop: 8,
    width: '100%',
  },
  hitDiceSection: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
  },
  hitDiceInteractiveContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  hitDiceCubesRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  hitDiceTextCompact: {
    color: '#E2E8F0',
    fontSize: 9,
    fontWeight: '700',
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
