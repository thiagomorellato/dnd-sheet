import { useTheme, ThemeColors } from '../context/ThemeContext';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import { Alert } from '../utils/alert';
import { Resources, SpellSlot, CustomResource, CombatConfig, HP, BaseStats } from '../types/character';
import { SPELLS_DATABASE, Spell } from '../utils/dndSpells';
import { Ionicons } from '@expo/vector-icons';
import { getSpellLimit } from '../utils/dndRules';
interface ResourceTrackerProps {
  resources: Resources;
  preparedSpells: string[];
  onUpdateResources: (updatedResources: Resources) => void;
  onUpdatePreparedSpells: (updatedPreparedSpells: string[]) => void;
  combat: CombatConfig;
  onUpdateCombat: (updatedCombat: CombatConfig) => void;
  hp: HP;
  onUpdateHP: (updatedHp: HP, changeAmount: number, isHeal: boolean) => void;
  onLogAction: (actionType: any, targetName: string, stateSummary: string) => void;
  hpSummary: string;
  characterClass: string;
  level: number;
  stats: BaseStats;
}
export const ResourceTracker: React.FC<ResourceTrackerProps> = ({
  resources,
  preparedSpells = [],
  onUpdateResources,
  onUpdatePreparedSpells,
  combat,
  onUpdateCombat,
  hp,
  onUpdateHP,
  onLogAction,
  hpSummary,
  characterClass,
  level,
  stats
}) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [targets, setTargets] = useState<Record<string, string>>({}); // Tracks target inputs per spell
  const [smiteModalVisible, setSmiteModalVisible] = useState(false);
  const [smiteTarget, setSmiteTarget] = useState('Self');

  // Spell slot level limit check
  const maxLevelAvailable = Object.keys(resources.spellSlots).reduce((max, key) => {
    const lvlNum = parseInt(key.replace('L', ''), 10);
    return lvlNum > max ? lvlNum : max;
  }, 0);
  const isSpellcasterClass = (cls: string): boolean => {
    const norm = cls.trim().toLowerCase();
    return norm.includes('paladin') || norm.includes('paladino') || norm.includes('cleric') || norm.includes('clérigo') || norm.includes('wizard') || norm.includes('mago') || norm.includes('bard') || norm.includes('bardo') || norm.includes('druid') || norm.includes('druida') || norm.includes('sorcerer') || norm.includes('feiticeiro') || norm.includes('warlock') || norm.includes('bruxo') || norm.includes('ranger') || norm.includes('patrulheiro') || norm.includes('artificer') || norm.includes('artífice');
  };
  const getNormalizedClass = (cls: string): string => {
    const norm = cls.trim().toLowerCase();
    if (norm.includes('paladin') || norm.includes('paladino')) return 'Paladino';
    if (norm.includes('cleric') || norm.includes('clérigo')) return 'Clérigo';
    if (norm.includes('wizard') || norm.includes('mago')) return 'Mago';
    if (norm.includes('bard') || norm.includes('bardo')) return 'Bardo';
    if (norm.includes('druid') || norm.includes('druida')) return 'Druida';
    if (norm.includes('sorcerer') || norm.includes('feiticeiro')) return 'Feiticeiro';
    if (norm.includes('warlock') || norm.includes('bruxo')) return 'Bruxo';
    if (norm.includes('ranger') || norm.includes('patrulheiro')) return 'Patrulheiro';
    if (norm.includes('artificer') || norm.includes('artífice')) return 'Artífice';
    return cls;
  };
  const baseClass = characterClass.split(' (')[0];
  const isSpellcaster = isSpellcasterClass(baseClass);
  const normalizedClass = getNormalizedClass(baseClass);
  const prepLimit = getSpellLimit(normalizedClass, level, stats);

  // Available spells filter based on class rules
  const classSpells = SPELLS_DATABASE.filter(s => s.classes.includes(normalizedClass) && s.level <= maxLevelAvailable);
  const selectedPreparedCount = preparedSpells.filter(name => {
    const s = SPELLS_DATABASE.find(sd => sd.name === name);
    return s && s.level > 0;
  }).length;
  const handleSpellSlotAdjust = (levelKey: string, amount: number) => {
    const slot = resources.spellSlots[levelKey];
    if (!slot) return;
    let nextCurrent = slot.current + amount;
    if (nextCurrent < 0) nextCurrent = 0;
    if (nextCurrent > slot.max) nextCurrent = slot.max;
    if (nextCurrent === slot.current) return;
    const updatedSlots = {
      ...resources.spellSlots,
      [levelKey]: {
        ...slot,
        current: nextCurrent
      }
    };
    const action = amount < 0 ? 'SPELL_SLOT_USE' : 'SPELL_SLOT_REGAIN';
    const detail = amount < 0 ? `Gastou Espaço de Nível ${levelKey.replace('L', '')}` : `Recuperou Espaço de Nível ${levelKey.replace('L', '')}`;
    const nextSummary = `${hp.current}/${hp.max} HP, AC: ${combat.baseArmorClass + (combat.shieldOfFaithActive ? 2 : 0)}`;
    const newStateStr = `${nextSummary}, Espaço de Nível ${levelKey.replace('L', '')}: ${nextCurrent}/${slot.max}`;
    onUpdateResources({
      ...resources,
      spellSlots: updatedSlots
    });
    onLogAction(action, detail, newStateStr);
  };
  const handleCustomResourceAdjust = (id: string, amount: number) => {
    const updatedCustom = resources.customResources.map(res => {
      if (res.id !== id) return res;
      let nextCurrent = res.current + amount;
      if (nextCurrent < 0) nextCurrent = 0;
      if (nextCurrent > res.max) nextCurrent = res.max;
      if (nextCurrent === res.current) return res;
      const action = amount < 0 ? 'RESOURCE_USE' : 'RESOURCE_REGAIN';
      const detail = amount < 0 ? `Usou ${res.name}` : `Recuperou ${res.name}`;
      const nextSummary = `${hp.current}/${hp.max} HP, AC: ${combat.baseArmorClass + (combat.shieldOfFaithActive ? 2 : 0)}`;
      const newStateStr = `${nextSummary}, ${res.name}: ${nextCurrent}/${res.max}`;
      onLogAction(action, detail, newStateStr);
      return {
        ...res,
        current: nextCurrent
      };
    });
    onUpdateResources({
      ...resources,
      customResources: updatedCustom
    });
  };
  const executeSmiteCast = (selectedLevelKey: string, target: string) => {
    const slot = resources.spellSlots[selectedLevelKey];
    if (!slot || slot.current <= 0) return;
    const nextCurrent = slot.current - 1;
    const updatedSlots = {
      ...resources.spellSlots,
      [selectedLevelKey]: {
        ...slot,
        current: nextCurrent
      }
    };
    onUpdateResources({
      ...resources,
      spellSlots: updatedSlots
    });
    const nextSummary = `${hp.current}/${hp.max} HP, AC: ${combat.baseArmorClass + (combat.shieldOfFaithActive ? 2 : 0)}`;
    const newStateStr = `${nextSummary}, Espaço de Nível ${selectedLevelKey.replace('L', '')}: ${nextCurrent}/${slot.max}`;
    onLogAction('SMITE_USE', `Divine Smite! (Gasto Espaço de Nível ${selectedLevelKey.replace('L', '')}) em ${target}`, newStateStr);
    const slotLvl = parseInt(selectedLevelKey.replace('L', ''), 10);
    const diceCount = 1 + slotLvl;
    Alert.alert('Divine Smite Conjurado', `Divine Smite conjurado em ${target}!\n\nDano Extra: ${diceCount}d8 de dano radiante (+1d8 extra se o alvo for morto-vivo ou corruptor).`);
  };
  const handleTogglePrepareSpell = (spellName: string) => {
    const spell = SPELLS_DATABASE.find(s => s.name === spellName);
    if (!spell) return;
    const isCantrip = spell.level === 0;
    let updated: string[];
    if (preparedSpells.includes(spellName)) {
      updated = preparedSpells.filter(name => name !== spellName);
    } else {
      if (!isCantrip && selectedPreparedCount >= prepLimit) {
        Alert.alert('Limite Atingido', `Você só pode preparar no máximo ${prepLimit} magias (excluindo truques).`);
        return;
      }
      updated = [...preparedSpells, spellName];
    }
    onUpdatePreparedSpells(updated);
  };
  const handleCastSpell = (spellName: string, spellLevel: number) => {
    const target = (targets[spellName] || '').trim() || 'Self';

    // Intercept Divine Smite to show custom slot level selection modal
    if (spellName === 'Divine Smite (Destruição Divina)') {
      const availableSlots = Object.entries(resources.spellSlots).filter(([_, slot]) => slot.current > 0);
      if (availableSlots.length === 0) {
        Alert.alert('Sem Espaços de Magia', 'Não há espaços de magia disponíveis para conjurar Divine Smite.');
        return;
      }
      setSmiteTarget(target);
      setSmiteModalVisible(true);
      return;
    }
    const slotKey = `L${spellLevel}`;
    const isCantrip = spellLevel === 0;
    let nextCurrent = 0;
    let slot: SpellSlot | undefined;
    if (!isCantrip) {
      slot = resources.spellSlots[slotKey];
      if (!slot || slot.current <= 0) {
        Alert.alert('Falha na Conjuração', `Você precisa de um espaço de magia de Nível ${spellLevel} disponível para conjurar ${spellName}.`);
        return;
      }

      // Deduct spell slot
      nextCurrent = slot.current - 1;
      const updatedSlots = {
        ...resources.spellSlots,
        [slotKey]: {
          ...slot,
          current: nextCurrent
        }
      };
      onUpdateResources({
        ...resources,
        spellSlots: updatedSlots
      });
    }
    let hpSummaryText = hpSummary;
    const detailPrefix = isCantrip ? `Conjurou Truque ${spellName}` : `Conjurou ${spellName} (Espaço de Nível ${spellLevel})`;
    const stateSuffix = isCantrip ? hpSummaryText : `${hpSummaryText}, Espaço ${slotKey}: ${nextCurrent}/${slot?.max}`;

    // Special logic for Shield of Faith / Escudo da Fé
    if (spellName.toLowerCase().includes('shield of faith') || spellName.toLowerCase().includes('escudo da fé')) {
      const isSelf = target.toLowerCase() === 'self' || target.toLowerCase() === 'lancelot' || target === '';
      if (isSelf) {
        onUpdateCombat({
          ...combat,
          shieldOfFaithActive: true
        });
        const nextSummary = `${hp.current}/${hp.max} HP, AC: ${combat.baseArmorClass + 2}`;
        hpSummaryText = nextSummary;
        onLogAction('SHIELD_OF_FAITH', `Conjurou Escudo da Fé em Si Mesmo`, isCantrip ? nextSummary : `${nextSummary}, Espaço L${spellLevel}: ${nextCurrent}/${slot?.max}`);
      } else {
        onUpdateCombat({
          ...combat,
          shieldOfFaithActive: false
        });
        const nextSummary = `${hp.current}/${hp.max} HP, AC: ${combat.baseArmorClass}`;
        hpSummaryText = nextSummary;
        onLogAction('SHIELD_OF_FAITH', `Conjurou Escudo da Fé em ${target}`, isCantrip ? nextSummary : `${nextSummary}, Espaço L${spellLevel}: ${nextCurrent}/${slot?.max}`);
      }
    }
    // Special logic for Cure Wounds / Curar Ferimentos (Heal)
    else if (spellName.toLowerCase().includes('cure wounds') || spellName.toLowerCase().includes('curar ferimentos')) {
      const isSelf = target.toLowerCase() === 'self' || target.toLowerCase() === 'lancelot' || target === '';
      const roll = Math.floor(Math.random() * 8) + 1;
      const wisMod = Math.max(0, Math.floor((stats.wis - 10) / 2));
      const healAmt = roll + (normalizedClass === 'Paladino' ? Math.max(0, Math.floor((stats.cha - 10) / 2)) : wisMod);
      if (isSelf) {
        let nextCurrentHp = hp.current;
        let nextTempHp = hp.temp ?? 0;
        if (nextCurrentHp < hp.max) {
          const needed = hp.max - nextCurrentHp;
          if (healAmt <= needed) {
            nextCurrentHp += healAmt;
          } else {
            nextCurrentHp = hp.max;
            nextTempHp += healAmt - needed;
          }
        } else {
          nextTempHp += healAmt;
        }
        onUpdateHP({
          ...hp,
          current: nextCurrentHp,
          temp: nextTempHp
        }, healAmt, true);
        const displayCurrent = nextTempHp > 0 ? nextCurrentHp + nextTempHp : nextCurrentHp;
        const nextSummary = `${displayCurrent}/${hp.max} HP, AC: ${combat.baseArmorClass + (combat.shieldOfFaithActive ? 2 : 0)}`;
        hpSummaryText = nextSummary;
        onLogAction('HP_HEAL', `Conjurou Curar Ferimentos em Si Mesmo: Curou +${healAmt}`, isCantrip ? nextSummary : `${nextSummary}, Espaço L${spellLevel}: ${nextCurrent}/${slot?.max}`);
        Alert.alert('Cura Realizada', `Você se curou em +${healAmt} PV!`);
      } else {
        onLogAction('HP_HEAL', `Conjurou Curar Ferimentos em ${target}: Curou +${healAmt}`, isCantrip ? hpSummaryText : `${hpSummaryText}, Espaço L${spellLevel}: ${nextCurrent}/${slot?.max}`);
        Alert.alert('Cura no Aliado', `Curou o aliado ${target} em +${healAmt} PV!`);
      }
    }
    // General spellcast
    else {
      onLogAction('SPELL_SLOT_USE', `${detailPrefix} em ${target}`, stateSuffix);
      Alert.alert('Magia Conjurada', `${spellName} foi conjurada em ${target}!`);
    }
  };
  const handleEndShieldOfFaith = () => {
    onUpdateCombat({
      ...combat,
      shieldOfFaithActive: false
    });
    const nextSummary = `${hp.current}/${hp.max} HP, AC: ${combat.baseArmorClass}`;
    onLogAction('SHIELD_OF_FAITH', 'Escudo da Fé encerrado (Concentração perdida)', `${nextSummary}`);
  };
  const handleTargetChange = (spellName: string, text: string) => {
    setTargets(prev => ({
      ...prev,
      [spellName]: text
    }));
  };
  return <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>GERENCIAMENTO DE MAGIAS</Text>
        <Ionicons name="flash" size={18} color={colors.accentSky} />
      </View>

      {/* Quick Divine Smite Banner removed - integrated as spell */}

      {/* Spell slots list */}
      {isSpellcaster && <View style={styles.slotsCard}>
          <Text style={styles.sectionTitle}>ESPAÇOS DE MAGIA (SLOTS)</Text>
          {Object.keys(resources.spellSlots).length === 0 ? <Text style={styles.emptySpellsText}>Não há espaços de magia disponíveis neste nível.</Text> : Object.entries(resources.spellSlots).map(([levelKey, slot]) => <View key={levelKey} style={styles.slotRow}>
                <View>
                  <Text style={styles.slotName}>Nível {levelKey.replace('level', '').replace('L', '')}</Text>
                  <Text style={styles.slotSub}>{slot.current} / {slot.max} restantes</Text>
                </View>
                <View style={styles.slotControls}>
                  <TouchableOpacity style={[styles.slotBtn, slot.current === 0 && styles.slotBtnDisabled]} disabled={slot.current === 0} onPress={() => handleSpellSlotAdjust(levelKey, -1)}>
                    <Ionicons name="remove" size={16} color={colors.textMain} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.slotBtn, slot.current === slot.max && styles.slotBtnDisabled]} disabled={slot.current === slot.max} onPress={() => handleSpellSlotAdjust(levelKey, 1)}>
                    <Ionicons name="add" size={16} color={colors.textMain} />
                  </TouchableOpacity>
                </View>
              </View>)}
        </View>}

      {/* Prepared Spells Toggle */}
      {isSpellcaster && <View style={styles.menuHeader}>
          <Text style={styles.sectionTitle}>LIVRO DE MAGIAS PREPARADAS</Text>
          <TouchableOpacity style={styles.prepareToggleBtn} onPress={() => setIsEditMode(!isEditMode)}>
            <Ionicons name={isEditMode ? "checkbox" : "create-outline"} size={16} color={colors.accentSky} style={{
          marginRight: 6
        }} />
            <Text style={styles.prepareToggleText}>
              {isEditMode ? 'Pronto' : 'Preparar Magias'}
            </Text>
          </TouchableOpacity>
        </View>}

      {/* Concentration Status Shield of Faith */}
      {combat.shieldOfFaithActive && <View style={styles.concentrationBar}>
          <Ionicons name="eye" size={16} color={colors.accentSky} style={{
        marginRight: 8
      }} />
          <Text style={styles.concentrationText}>Concentrando em: Escudo da Fé</Text>
          <TouchableOpacity style={styles.endConcBtn} onPress={handleEndShieldOfFaith}>
            <Text style={styles.endConcBtnText}>Encerrar</Text>
          </TouchableOpacity>
        </View>}

      {isSpellcaster ? isEditMode ? (/* Edit Mode: Select which spells to prepare */
    <View style={styles.spellsList}>
              <View style={styles.spellLimitBanner}>
                <Text style={styles.spellLimitText}>
                  Limite: {selectedPreparedCount} de {prepLimit} magias preparadas (Truques são à vontade)
                </Text>
              </View>
            
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={16} color={colors.textMuted} style={{ marginRight: 8 }} />
              <TextInput
                id="spell-search-input"
                style={styles.searchInput}
                placeholder="Buscar magia por nome..."
                placeholderTextColor={colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={16} color={colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>

            {classSpells.filter(s => 
              s.name !== 'Divine Smite (Destruição Divina)' && 
              s.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map(spell => {
        const isPrepared = preparedSpells.includes(spell.name);
        const isCantrip = spell.level === 0;
        return <TouchableOpacity key={spell.name} style={[styles.spellPrepItem, isPrepared && styles.spellPrepItemActive]} onPress={() => handleTogglePrepareSpell(spell.name)} activeOpacity={0.8}>
                  <Ionicons name={isPrepared ? "checkbox" : "square-outline"} size={20} color={isPrepared ? colors.accentAmber : colors.textMuted} style={{
            marginRight: 12
          }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.spellPrepName}>{spell.name}</Text>
                    <View style={styles.spellTagsRow}>
                      <View style={styles.spellTag}><Text style={styles.spellTagText}>{spell.school}</Text></View>
                      <View style={styles.spellTag}><Text style={styles.spellTagText}>{spell.castingTime}</Text></View>
                      <View style={styles.spellTag}><Text style={styles.spellTagText}>{spell.range}</Text></View>
                      <View style={styles.spellTag}><Text style={styles.spellTagText}>{spell.duration}</Text></View>
                    </View>
                    <Text style={styles.spellPrepDesc}>{spell.description}</Text>
                  </View>
                  <Text style={styles.spellPrepLvl}>
                    {isCantrip ? 'Truque' : `Lvl ${spell.level}`}
                  </Text>
                </TouchableOpacity>;
      })}
          </View>) : (/* Casting Mode: Cast prepared spells with targets */
    <View style={styles.spellsList}>
            {classSpells.filter(s => preparedSpells.includes(s.name) || s.name === 'Divine Smite (Destruição Divina)').length === 0 ? <Text style={styles.emptySpellsText}>
                Nenhuma magia preparada. Clique em "Preparar Magias" acima para montar seu livro.
              </Text> : classSpells.filter(spell => preparedSpells.includes(spell.name) || spell.name === 'Divine Smite (Destruição Divina)').map(spell => {
        const targetVal = targets[spell.name] || '';
        const isCantrip = spell.level === 0;
        return <View key={spell.name} style={styles.spellCastCard}>
                      <View style={styles.spellCastInfo}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.spellCastName}>{spell.name}</Text>
                          <View style={styles.spellTagsRow}>
                            <View style={styles.spellTag}><Text style={styles.spellTagText}>{spell.school}</Text></View>
                            <View style={styles.spellTag}><Text style={styles.spellTagText}>{spell.castingTime}</Text></View>
                            <View style={styles.spellTag}><Text style={styles.spellTagText}>{spell.range}</Text></View>
                            <View style={styles.spellTag}><Text style={styles.spellTagText}>{spell.duration}</Text></View>
                          </View>
                          <Text style={styles.spellCastDesc}>{spell.description}</Text>
                        </View>
                        <Text style={styles.spellCastLvl}>
                          {isCantrip ? 'Truque' : `Lvl ${spell.level}`}
                        </Text>
                      </View>

                      {/* Target Selector */}
                      <View style={styles.targetRow}>
                        <TextInput style={styles.targetInput} placeholder="Alvo (ex: Self, Arthur)" placeholderTextColor={colors.borderHighlight} value={targetVal} onChangeText={text => handleTargetChange(spell.name, text)} />
                        <TouchableOpacity style={styles.castBtn} onPress={() => handleCastSpell(spell.name, spell.level)}>
                          <Ionicons name="sparkles" size={14} color={colors.background} style={{
                marginRight: 6
              }} />
                          <Text style={styles.castBtnText}>Cast</Text>
                        </TouchableOpacity>
                      </View>
                    </View>;
      })}
          </View>) : <View style={styles.noSpellsBanner}>
          <Ionicons name="flash-off" size={32} color={colors.borderHighlight} style={{
        marginBottom: 8
      }} />
          <Text style={styles.noSpellsText}>Classe sem Magias</Text>
          <Text style={styles.noSpellsSub}>Guerreiros usam força e equipamentos, sem conjurações.</Text>
        </View>}

      {/* Ability charges (lay on hands, channel divinity) */}
      <View style={[styles.slotsCard, {
      marginTop: 20
    }]}>
        <Text style={styles.sectionTitle}>HABILIDADES DA CLASSE</Text>
        {resources.customResources.length === 0 ? <Text style={styles.emptySpellsText}>Nenhuma habilidade com cargas registrada.</Text> : resources.customResources.map(res => <View key={res.id} style={styles.slotRow}>
              <View>
                <Text style={styles.slotName}>{res.name}</Text>
                <Text style={styles.slotSub}>{res.current} / {res.max} cargas</Text>
              </View>
              <View style={styles.slotControls}>
                <TouchableOpacity style={[styles.slotBtn, res.current === 0 && styles.slotBtnDisabled]} disabled={res.current === 0} onPress={() => handleCustomResourceAdjust(res.id, -1)}>
                  <Ionicons name="remove" size={16} color={colors.textMain} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.slotBtn, res.current === res.max && styles.slotBtnDisabled]} disabled={res.current === res.max} onPress={() => handleCustomResourceAdjust(res.id, 1)}>
                  <Ionicons name="add" size={16} color={colors.textMain} />
                </TouchableOpacity>
              </View>
            </View>)}
      </View>

      {/* Divine Smite Level Selection Modal */}
      <Modal animationType="fade" transparent={true} visible={smiteModalVisible} onRequestClose={() => setSmiteModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Destruição Divina (Divine Smite)</Text>
              <TouchableOpacity onPress={() => setSmiteModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.modalSubtitle}>
              Escolha o nível do espaço de magia para conjurar no alvo: <Text style={{
              color: colors.accentAmber,
              fontWeight: '800'
            }}>{smiteTarget}</Text>
            </Text>

            <View style={styles.smiteLevelButtonsContainer}>
              {Object.entries(resources.spellSlots).filter(([_, slot]) => slot.current > 0).sort((a, b) => a[0].localeCompare(b[0])).map(([levelKey, slot]) => <TouchableOpacity key={levelKey} style={styles.smiteLevelBtn} onPress={() => {
              setSmiteModalVisible(false);
              executeSmiteCast(levelKey, smiteTarget);
            }}>
                    <Ionicons name="flame" size={16} color={colors.accentSky} style={{
                marginRight: 8
              }} />
                    <Text style={styles.smiteLevelBtnText}>
                      Espaço de Nível {levelKey.replace('L', '')} ({slot.current}/{slot.max})
                    </Text>
                  </TouchableOpacity>)}
            </View>

            <TouchableOpacity style={styles.smiteCancelBtn} onPress={() => setSmiteModalVisible(false)}>
              <Text style={styles.smiteCancelBtnText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>;
};
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  title: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5
  },
  smiteBtn: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderColor: colors.accentAmber,
    borderWidth: 1.5,
    borderRadius: 10,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  smiteBtnText: {
    color: colors.accentAmber,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1
  },
  slotsCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20
  },
  sectionTitle: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.borderHighlight,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    height: 40,
  },
  searchInput: {
    flex: 1,
    color: colors.textMain,
    fontSize: 13,
  },
  slotRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  slotName: {
    color: colors.textMain,
    fontSize: 14,
    fontWeight: '700'
  },
  slotSub: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 1
  },
  slotControls: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  slotBtn: {
    backgroundColor: colors.border,
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8
  },
  slotBtnDisabled: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    opacity: 0.5
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14
  },
  prepareToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.borderHighlight
  },
  prepareToggleText: {
    color: colors.accentAmber,
    fontSize: 11,
    fontWeight: '700'
  },
  concentrationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderColor: '#2563EB',
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginBottom: 12
  },
  concentrationText: {
    color: colors.accentSky,
    fontSize: 11,
    fontWeight: '700',
    flex: 1
  },
  endConcBtn: {
    backgroundColor: colors.accentRed,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4
  },
  endConcBtnText: {
    color: colors.textMain,
    fontSize: 9,
    fontWeight: '800'
  },
  spellsList: {
    flexDirection: 'column'
  },
  spellPrepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border
  },
  spellPrepItemActive: {
    borderColor: colors.border,
    backgroundColor: colors.accentAmberBg
  },
  spellPrepName: {
    color: colors.textMain,
    fontSize: 14,
    fontWeight: '700'
  },
  spellPrepDesc: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2
  },
  spellPrepLvl: {
    color: colors.accentAmber,
    fontSize: 11,
    fontWeight: '800',
    backgroundColor: colors.surface,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border
  },
  emptySpellsText: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 20,
    lineHeight: 18,
    fontStyle: 'italic'
  },
  spellCastCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 10
  },
  spellCastInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10
  },
  spellCastName: {
    color: colors.textMain,
    fontSize: 15,
    fontWeight: '700'
  },
  spellCastDesc: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2
  },
  spellCastLvl: {
    color: colors.accentAmber,
    fontSize: 10,
    fontWeight: '800'
  },
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  targetInput: {
    flex: 1,
    height: 34,
    backgroundColor: colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.textMain,
    paddingHorizontal: 10,
    marginRight: 8,
    fontSize: 12
  },
  castBtn: {
    flexDirection: 'row',
    backgroundColor: colors.accentSky,
    height: 34,
    paddingHorizontal: 14,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  castBtnText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '800'
  },
  spellLimitBanner: {
    backgroundColor: colors.accentSkyBg,
    borderColor: colors.accentAmber,
    borderWidth: 0.5,
    borderRadius: 8,
    padding: 10,
    marginBottom: 16
  },
  spellLimitText: {
    color: colors.accentAmber,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center'
  },
  noSpellsBanner: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  noSpellsText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6
  },
  noSpellsSub: {
    color: colors.borderHighlight,
    fontSize: 12,
    textAlign: 'center'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  modalTitle: {
    color: colors.textMain,
    fontSize: 16,
    fontWeight: '800'
  },
  modalSubtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginBottom: 16
  },
  smiteLevelButtonsContainer: {
    flexDirection: 'column',
    marginBottom: 10
  },
  smiteLevelBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.accentAmber,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10
  },
  smiteLevelBtnText: {
    color: colors.textMain,
    fontSize: 13,
    fontWeight: '700'
  },
  smiteCancelBtn: {
    alignSelf: 'flex-end',
    paddingVertical: 10,
    paddingHorizontal: 16
  },
  smiteCancelBtnText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700'
  },
  spellTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
    marginBottom: 4
  },
  spellTag: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.border
  },
  spellTagText: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: '700'
  }
});