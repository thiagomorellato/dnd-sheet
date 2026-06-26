import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Character, HP, Resources, CombatLogEntry, ActionType, CombatConfig, EquipmentItem, BaseStats, Coins } from '../types/character';
import { StorageService } from '../services/storage';
import { LoggerService } from '../services/logger';
import { VitalsWidget } from '../components/VitalsWidget';
import { ResourceTracker } from '../components/ResourceTracker';
import { EquipmentTracker } from '../components/EquipmentTracker';
import { Ionicons } from '@expo/vector-icons';
import { getHitDieType, getArmorCategory } from '../utils/dndRules';

interface DashboardScreenProps {
  characterId: string;
  onBack: () => void;
}

type TabType = 'tatico' | 'magias' | 'equipamentos' | 'logs';

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ characterId, onBack }) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [logs, setLogs] = useState<CombatLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('tatico');

  const loadData = async () => {
    try {
      const char = await StorageService.getCharacter(characterId);
      if (!char) {
        Alert.alert('Error', 'Character not found.');
        onBack();
        return;
      }
      setCharacter(char);
      const logList = await LoggerService.getLogs(characterId);
      setLogs(logList);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [characterId]);

  // Calculates base D&D 5e Armor Class based on equipped gear (armor, shields, rings, etc.)
  const calculateBaseAC = (baseStats: BaseStats, equipment: EquipmentItem[]): number => {
    const dexMod = Math.floor((baseStats.dex - 10) / 2);
    
    // Find equipped armor
    const equippedArmor = equipment.find(item => item.type === 'armor' && item.equipped);
    
    let ac = 10 + dexMod;
    if (equippedArmor) {
      const category = getArmorCategory(equippedArmor.name);
      
      const baseAC = equippedArmor.acBonus || 10;
      if (category === 'heavy') {
        ac = baseAC;
      } else if (category === 'medium') {
        ac = baseAC + Math.min(2, dexMod);
      } else {
        ac = baseAC + dexMod;
      }
    }
    
    // Add bonuses from other equipped items (shields, rings, etc.)
    equipment.forEach(item => {
      if (item.equipped && item.type !== 'armor' && item.acBonus) {
        ac += item.acBonus;
      }
    });
    
    return ac;
  };

  const getHpSummary = (hpState: HP, acVal: number) => {
    return `HP: ${hpState.current}/${hpState.max}, AC: ${acVal}`;
  };

  const handleUpdateHP = async (updatedHp: HP, changeAmount: number, isHeal: boolean) => {
    if (!character) return;

    const updatedChar = { ...character, hp: updatedHp };
    const currentAC = character.combat.baseArmorClass + (character.combat.shieldOfFaithActive ? 2 : 0);
    const hpSummary = getHpSummary(updatedHp, currentAC);

    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);

      await LoggerService.logEvent(
        character.id,
        isHeal ? 'HP_HEAL' : 'HP_DAMAGE',
        isHeal ? `+${changeAmount}` : `-${changeAmount}`,
        hpSummary
      );

      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (error: any) {
      Alert.alert('Error updating HP', error.message);
    }
  };

  const handleToggleShieldOfFaith = async (isActive: boolean) => {
    if (!character) return;

    const updatedCombat = { ...character.combat, shieldOfFaithActive: isActive };
    const updatedChar = { ...character, combat: updatedCombat };
    const currentAC = character.combat.baseArmorClass + (isActive ? 2 : 0);
    const hpSummary = getHpSummary(character.hp, currentAC);

    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);

      await LoggerService.logEvent(
        character.id,
        'SHIELD_OF_FAITH',
        isActive ? 'Shield Active (+2 AC)' : 'Shield Inactive',
        hpSummary
      );

      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleUpdateCombat = async (updatedCombat: CombatConfig) => {
    if (!character) return;
    const updatedChar = { ...character, combat: updatedCombat };
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
      
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  const handleUpdateResources = async (updatedResources: Resources) => {
    if (!character) return;

    const updatedChar = { ...character, resources: updatedResources };
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
    } catch (error: any) {
      Alert.alert('Error updating resources', error.message);
    }
  };

  const handleUpdateCoins = async (updatedCoins: Coins) => {
    if (!character) return;
    const updatedChar = { ...character, coins: updatedCoins };
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
    } catch (error: any) {
      Alert.alert('Erro ao atualizar moedas', error.message);
    }
  };

  const handleUpdateHitDice = async (newHitDiceCount: number) => {
    if (!character) return;
    
    // Determine the hit die type based on the character's class
    const dieType = character.hitDice?.dieType || getHitDieType(character.characterClass);
    const updatedHitDice = {
      current: newHitDiceCount,
      dieType
    };
    
    const updatedChar = {
      ...character,
      hitDice: updatedHitDice
    };
    
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
      
      const totalAC = character.combat.baseArmorClass + (character.combat.shieldOfFaithActive ? 2 : 0);
      await LoggerService.logEvent(
        character.id,
        'RESOURCE_USE',
        `Dados de Vida alterados para: ${newHitDiceCount}/${character.level} (D${dieType})`,
        getHpSummary(character.hp, totalAC)
      );
      
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (error: any) {
      Alert.alert('Erro ao atualizar dados de vida', error.message);
    }
  };

  const handleUpdatePreparedSpells = async (updatedPreparedSpells: string[]) => {
    if (!character) return;
    const updatedChar = { ...character, preparedSpells: updatedPreparedSpells };
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
    } catch (error: any) {
      Alert.alert('Error updating prepared spells', error.message);
    }
  };

  const handleToggleEquip = async (itemId: string) => {
    if (!character) return;

    const updatedEquipment = character.equipment.map(item => {
      if (item.id !== itemId) return item;
      return { ...item, equipped: !item.equipped };
    });

    const toggledItem = character.equipment.find(item => item.id === itemId);
    if (!toggledItem) return;

    // Dynamically calculate new base AC
    const newBaseAC = calculateBaseAC(character.baseStats, updatedEquipment);

    const updatedCombat = {
      ...character.combat,
      baseArmorClass: newBaseAC
    };

    let updatedCustomResources = [...(character.resources.customResources || [])];
    let updatedPreparedSpells = [...(character.preparedSpells || [])];

    const isNowEquipped = !toggledItem.equipped; // toggled state

    if (isNowEquipped) {
      // Add custom resource if item has one
      if (toggledItem.customResourceName && toggledItem.customResourceMax) {
        const resId = `item_res_${toggledItem.id}`;
        if (!updatedCustomResources.some(r => r.id === resId)) {
          updatedCustomResources.push({
            id: resId,
            name: toggledItem.customResourceName,
            current: toggledItem.customResourceMax,
            max: toggledItem.customResourceMax
          });
        }
      }
      // Add linked spell if item has one
      if (toggledItem.linkedSpellName) {
        if (!updatedPreparedSpells.includes(toggledItem.linkedSpellName)) {
          updatedPreparedSpells.push(toggledItem.linkedSpellName);
        }
      }
    } else {
      // Remove custom resource
      const resId = `item_res_${toggledItem.id}`;
      updatedCustomResources = updatedCustomResources.filter(r => r.id !== resId);
      
      // Remove linked spell
      if (toggledItem.linkedSpellName) {
        updatedPreparedSpells = updatedPreparedSpells.filter(s => s !== toggledItem.linkedSpellName);
      }
    }

    const updatedChar = {
      ...character,
      equipment: updatedEquipment,
      combat: updatedCombat,
      resources: {
        ...character.resources,
        customResources: updatedCustomResources
      },
      preparedSpells: updatedPreparedSpells
    };

    const totalAC = newBaseAC + (character.combat.shieldOfFaithActive ? 2 : 0);
    const hpSummary = getHpSummary(character.hp, totalAC);
    const actionLabel = isNowEquipped ? 'Equipado' : 'Guardado na mochila';
    const detail = `${actionLabel}: ${toggledItem.name}`;

    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);

      await LoggerService.logEvent(
        character.id,
        'SHIELD_OF_FAITH',
        detail,
        hpSummary
      );

      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (error: any) {
      Alert.alert('Error updating equipment', error.message);
    }
  };

  const handleAddItem = async (item: { 
    name: string; 
    type: 'weapon' | 'armor' | 'shield' | 'ring' | 'other'; 
    acBonus?: number; 
    dmgDice?: string;
    isMagic?: boolean;
    rarity?: 'Comum' | 'Incomum' | 'Raro' | 'Muito Raro' | 'Lendário';
    description?: string;
    customResourceName?: string;
    customResourceMax?: number;
    linkedSpellName?: string;
  }) => {
    if (!character) return;

    const newItem: EquipmentItem = {
      id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36),
      name: item.name,
      type: item.type,
      equipped: false, // Starts unequipped in inventory
      acBonus: item.acBonus,
      dmgDice: item.dmgDice,
      isMagic: item.isMagic,
      rarity: item.rarity,
      description: item.description,
      customResourceName: item.customResourceName,
      customResourceMax: item.customResourceMax,
      linkedSpellName: item.linkedSpellName
    };

    const updatedEquipment = [...character.equipment, newItem];
    const updatedChar = {
      ...character,
      equipment: updatedEquipment
    };

    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);

      const totalAC = character.combat.baseArmorClass + (character.combat.shieldOfFaithActive ? 2 : 0);
      await LoggerService.logEvent(
        character.id,
        'RESOURCE_REGAIN',
        `Adicionado à mochila: ${newItem.name}`,
        getHpSummary(character.hp, totalAC)
      );

      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (error: any) {
      Alert.alert('Erro ao adicionar item', error.message);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!character) return;

    const itemToDelete = character.equipment.find(item => item.id === itemId);
    if (!itemToDelete) return;

    Alert.alert(
      'Remover Item',
      `Tem certeza que deseja apagar permanentemente o item ${itemToDelete.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: async () => {
            const updatedEquipment = character.equipment.filter(item => item.id !== itemId);
            const newBaseAC = calculateBaseAC(character.baseStats, updatedEquipment);
            
            const updatedCombat = {
              ...character.combat,
              baseArmorClass: newBaseAC
            };

            const resId = `item_res_${itemId}`;
            const updatedCustomResources = (character.resources.customResources || []).filter(r => r.id !== resId);
            let updatedPreparedSpells = [...(character.preparedSpells || [])];
            if (itemToDelete.linkedSpellName) {
              updatedPreparedSpells = updatedPreparedSpells.filter(s => s !== itemToDelete.linkedSpellName);
            }

            const updatedChar = {
              ...character,
              equipment: updatedEquipment,
              combat: updatedCombat,
              resources: {
                ...character.resources,
                customResources: updatedCustomResources
              },
              preparedSpells: updatedPreparedSpells
            };

            try {
              await StorageService.saveCharacter(updatedChar);
              setCharacter(updatedChar);

              const totalAC = newBaseAC + (character.combat.shieldOfFaithActive ? 2 : 0);
              await LoggerService.logEvent(
                character.id,
                'HP_DAMAGE',
                `Descartado item: ${itemToDelete.name}`,
                getHpSummary(character.hp, totalAC)
              );

              const logList = await LoggerService.getLogs(character.id);
              setLogs(logList);
            } catch (error: any) {
              Alert.alert('Erro ao deletar item', error.message);
            }
          }
        }
      ]
    );
  };

  const handleLogAction = async (actionType: ActionType, detail: string, stateSummary: string) => {
    if (!character) return;

    try {
      await LoggerService.logEvent(character.id, actionType, detail, stateSummary);
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearLogs = () => {
    Alert.alert(
      'Limpar Histórico',
      'Tem certeza de que deseja apagar todo o histórico de combate deste personagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            if (!character) return;
            await LoggerService.clearLogs(character.id);
            setLogs([]);
          },
        },
      ]
    );
  };

  const handleExportCSV = async () => {
    if (!character) return;
    try {
      await LoggerService.exportLogsToCSV(character.id, character.name);
      Alert.alert('Sucesso', 'Logs de combate exportados como CSV com sucesso!');
    } catch (e: any) {
      Alert.alert('Exportação falhou', e.message);
    }
  };

  const getLogIcon = (type: ActionType) => {
    switch (type) {
      case 'HP_DAMAGE':
        return { name: 'heart-dislike', color: '#EF4444' };
      case 'HP_HEAL':
        return { name: 'heart-half', color: '#10B981' };
      case 'SHIELD_OF_FAITH':
        return { name: 'shield', color: '#60A5FA' };
      case 'SMITE_USE':
        return { name: 'flame', color: '#F59E0B' };
      default:
        return { name: 'flash', color: '#A78BFA' };
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#F59E0B" />
        <Text style={styles.loadingText}>Carregando Dashboard...</Text>
      </View>
    );
  }

  if (!character) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color="#F8FAFC" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.charName} numberOfLines={1}>{character.name}</Text>
          <Text style={styles.charSubtitle}>
            Nível {character.level} {character.characterClass}{character.background ? ` | ${character.background.split(' (')[0]}` : ''}
          </Text>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'tatico' && (
          <VitalsWidget
            hp={character.hp}
            combat={character.combat}
            characterName={character.name}
            characterClass={character.characterClass}
            onUpdateHP={handleUpdateHP}
            stats={character.baseStats}
            proficiencies={character.proficiencies}
            level={character.level}
            coins={character.coins || { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 }}
            onUpdateCoins={handleUpdateCoins}
            hitDice={character.hitDice}
            onUpdateHitDice={handleUpdateHitDice}
          />
        )}

        {activeTab === 'magias' && (
          <ResourceTracker
            resources={character.resources}
            preparedSpells={character.preparedSpells}
            onUpdateResources={handleUpdateResources}
            onUpdatePreparedSpells={handleUpdatePreparedSpells}
            combat={character.combat}
            onUpdateCombat={handleUpdateCombat}
            hp={character.hp}
            onUpdateHP={handleUpdateHP}
            onLogAction={handleLogAction}
            hpSummary={getHpSummary(
              character.hp,
              character.combat.baseArmorClass + (character.combat.shieldOfFaithActive ? 2 : 0)
            )}
            characterClass={character.characterClass}
            level={character.level}
            stats={character.baseStats}
          />
        )}

        {activeTab === 'equipamentos' && (
          <EquipmentTracker
            equipment={character.equipment}
            onToggleEquip={handleToggleEquip}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
          />
        )}

        {activeTab === 'logs' && (
          <View style={styles.logCard}>
            <View style={styles.logHeader}>
              <View>
                <Text style={styles.logTitle}>HISTÓRICO DE COMBATE (EVENT SOURCING)</Text>
                <Text style={styles.logSubtitle}>Logs prontos para análise PySpark / BI</Text>
              </View>
              
              <View style={styles.logsActionRow}>
                <TouchableOpacity style={styles.logActionBtn} onPress={handleExportCSV}>
                  <Ionicons name="share-social-outline" size={16} color="#F59E0B" />
                  <Text style={styles.logActionLabel}>CSV</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.logActionBtn, styles.logClearBtn]} onPress={handleClearLogs}>
                  <Ionicons name="trash-outline" size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>

            {logs.length === 0 ? (
              <Text style={styles.emptyLogText}>Nenhum evento registrado ainda.</Text>
            ) : (
              <View style={styles.logsList}>
                {logs.map((log) => {
                  const icon = getLogIcon(log.action_type);
                  return (
                    <View key={log.id} style={styles.logItem}>
                      <View style={styles.logItemLeft}>
                        <View style={[styles.logIconBg, { backgroundColor: icon.color + '1A' }]}>
                          <Ionicons name={icon.name as any} size={16} color={icon.color} />
                        </View>
                        <View style={styles.logDetails}>
                          <Text style={styles.logValueChange}>{log.value_change}</Text>
                          <Text style={styles.logState}>{log.current_state}</Text>
                        </View>
                      </View>
                      <Text style={styles.logTime}>
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </Text>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Bottom Tab Navigation Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'tatico' && styles.tabItemActive]}
          onPress={() => setActiveTab('tatico')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="shield"
            size={20}
            color={activeTab === 'tatico' ? '#F59E0B' : '#64748B'}
          />
          <Text style={[styles.tabLabel, activeTab === 'tatico' && styles.tabLabelActive]}>
            TÁTICO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'magias' && styles.tabItemActive]}
          onPress={() => setActiveTab('magias')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="flame"
            size={20}
            color={activeTab === 'magias' ? '#F59E0B' : '#64748B'}
          />
          <Text style={[styles.tabLabel, activeTab === 'magias' && styles.tabLabelActive]}>
            MAGIAS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'equipamentos' && styles.tabItemActive]}
          onPress={() => setActiveTab('equipamentos')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="briefcase"
            size={20}
            color={activeTab === 'equipamentos' ? '#F59E0B' : '#64748B'}
          />
          <Text style={[styles.tabLabel, activeTab === 'equipamentos' && styles.tabLabelActive]}>
            EQUIPOS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'logs' && styles.tabItemActive]}
          onPress={() => setActiveTab('logs')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="list-circle"
            size={20}
            color={activeTab === 'logs' ? '#F59E0B' : '#64748B'}
          />
          <Text style={[styles.tabLabel, activeTab === 'logs' && styles.tabLabelActive]}>
            LOGS
          </Text>
        </TouchableOpacity>
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
  loaderContainer: {
    flex: 1,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12,
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
  charName: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '900',
  },
  charSubtitle: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Padding for Tab Bar height
  },
  logCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 10,
  },
  logTitle: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  logSubtitle: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '600',
    marginTop: 1,
  },
  logsActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
  },
  logActionLabel: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  logClearBtn: {
    marginRight: 0,
    borderColor: '#451A20',
  },
  emptyLogText: {
    color: '#64748B',
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 30,
    fontStyle: 'italic',
  },
  logsList: {
    flexDirection: 'column',
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  logItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  logIconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logDetails: {
    flex: 1,
  },
  logValueChange: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
  logState: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500',
  },
  logTime: {
    color: '#475569',
    fontSize: 11,
    fontWeight: '600',
  },
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabItemActive: {
    borderTopWidth: 2,
    borderTopColor: '#F59E0B',
  },
  tabLabel: {
    color: '#64748B',
    fontSize: 9,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: '#F59E0B',
    fontWeight: '900',
  },
});
