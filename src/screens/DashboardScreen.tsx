import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Modal,
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
  useWindowDimensions,
} from 'react-native';
import { Alert } from '../utils/alert';
import { Character, HP, Resources, CombatLogEntry, ActionType, CombatConfig, EquipmentItem, BaseStats, Coins } from '../types/character';
import { StorageService } from '../services/storage';
import { LoggerService } from '../services/logger';
import { VitalsWidget } from '../components/VitalsWidget';
import { ResourceTracker } from '../components/ResourceTracker';
import { EquipmentTracker } from '../components/EquipmentTracker';
import { CharacterTab } from '../components/CharacterTab';
import { Ionicons } from '@expo/vector-icons';
import { getHitDieType, getArmorCategory } from '../utils/dndRules';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface DashboardScreenProps {
  characterId: string;
  onBack: () => void;
}

type TabType = 'tatico' | 'personagem' | 'magias' | 'equipamentos' | 'logs';

const getCharacterBackground = (characterClass: string, isMobile: boolean) => {
  const normalized = characterClass.trim().toLowerCase();
  
  if (isMobile) {
    if (normalized.includes('barbarian') || normalized.includes('bárbaro')) return require('../../assets/barbarian_bgmob.jpg');
    if (normalized.includes('bard') || normalized.includes('bardo')) return require('../../assets/bard_bgmob.png');
    if (normalized.includes('warlock') || normalized.includes('bruxo')) return require('../../assets/warlock_bgmob.jpg');
    if (normalized.includes('cleric') || normalized.includes('clérigo')) return require('../../assets/cleric_bgmob.jpg');
    if (normalized.includes('druid') || normalized.includes('druida')) return require('../../assets/druid_bgmob.jpg');
    if (normalized.includes('sorcerer') || normalized.includes('feiticeiro')) return require('../../assets/sorcerer_bgmob.jpg');
    if (normalized.includes('fighter') || normalized.includes('guerreiro')) return require('../../assets/fighter_bgmob.jpg');
    if (normalized.includes('rogue') || normalized.includes('ladino')) return require('../../assets/rogue_bgmob.jpg');
    if (normalized.includes('wizard') || normalized.includes('mago')) return require('../../assets/wizard_bgmob.jpg');
    if (normalized.includes('monk') || normalized.includes('monge')) return require('../../assets/monk_bgmob.jpg');
    if (normalized.includes('paladin') || normalized.includes('paladino')) return require('../../assets/paladin_bgmob.jpg');
    if (normalized.includes('ranger') || normalized.includes('patrulheiro')) return require('../../assets/ranger_bgmob.jpg');
    if (normalized.includes('artificer') || normalized.includes('artífice')) return require('../../assets/artificer_bgmob.jpg');
    
    return require('../../assets/paladin_bgmob.jpg');
  }

  if (normalized.includes('barbarian') || normalized.includes('bárbaro')) return require('../../assets/barbarian_bg.png');
  if (normalized.includes('bard') || normalized.includes('bardo')) return require('../../assets/bard_bg.png');
  if (normalized.includes('warlock') || normalized.includes('bruxo')) return require('../../assets/warlock_bg.png');
  if (normalized.includes('cleric') || normalized.includes('clérigo')) return require('../../assets/cleric_bg.png');
  if (normalized.includes('druid') || normalized.includes('druida')) return require('../../assets/druid_bg.png');
  if (normalized.includes('sorcerer') || normalized.includes('feiticeiro')) return require('../../assets/sorcerer_bg.png');
  if (normalized.includes('fighter') || normalized.includes('guerreiro')) return require('../../assets/fighter_bg.png');
  if (normalized.includes('rogue') || normalized.includes('ladino')) return require('../../assets/rogue_bg.png');
  if (normalized.includes('wizard') || normalized.includes('mago')) return require('../../assets/wizard_bg.png');
  if (normalized.includes('monk') || normalized.includes('monge')) return require('../../assets/monk_bg.png');
  if (normalized.includes('paladin') || normalized.includes('paladino')) return require('../../assets/paladin_bg.jpg');
  if (normalized.includes('ranger') || normalized.includes('patrulheiro')) return require('../../assets/ranger_bg.png');
  if (normalized.includes('artificer') || normalized.includes('artífice')) return require('../../assets/artificer_bg.png');
  
  return require('../../assets/paladin_bg.jpg');
};

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ characterId, onBack }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

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

  const [multiplier, setMultiplier] = useState<1 | 5 | 10 | 20>(1);
  const [coinsModalVisible, setCoinsModalVisible] = useState(false);
  const [hpModalVisible, setHpModalVisible] = useState(false);

  const [editCP, setEditCP] = useState('0');
  const [editSP, setEditSP] = useState('0');
  const [editEP, setEditEP] = useState('0');
  const [editGP, setEditGP] = useState('0');
  const [editPP, setEditPP] = useState('0');

  const [editCurrentHP, setEditCurrentHP] = useState('0');
  const [editMaxHP, setEditMaxHP] = useState('0');
  const [editTempHP, setEditTempHP] = useState('0');

  const handleSaveCoins = async () => {
    if (!character) return;
    const updatedCoins = {
      cp: parseInt(editCP, 10) || 0,
      sp: parseInt(editSP, 10) || 0,
      ep: parseInt(editEP, 10) || 0,
      gp: parseInt(editGP, 10) || 0,
      pp: parseInt(editPP, 10) || 0,
    };
    await handleUpdateCoins(updatedCoins);
    setCoinsModalVisible(false);
  };

  const handleOpenHPModal = () => {
    if (!character) return;
    setEditCurrentHP(String(character.hp.current));
    setEditMaxHP(String(character.hp.max));
    setEditTempHP(String(character.hp.temp || 0));
    setHpModalVisible(true);
  };

  const handleSaveHP = async () => {
    if (!character) return;
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

    const oldTotal = character.hp.current + (character.hp.temp || 0);
    const newTotal = nextCurrent + nextTemp;
    const change = newTotal - oldTotal;

    if (change !== 0 || character.hp.max !== nextMax) {
      await handleUpdateHP(
        { current: nextCurrent, max: nextMax, temp: nextTemp },
        Math.abs(change),
        change > 0
      );
    }
    setHpModalVisible(false);
  };

  const cycleMultiplier = () => {
    setMultiplier(prev => {
      if (prev === 1) return 5;
      if (prev === 5) return 10;
      if (prev === 10) return 20;
      return 1;
    });
  };

  const handleAdjust = async (isHeal: boolean) => {
    if (!character) return;
    const amount = multiplier;
    let nextHp = character.hp.current;
    let nextTemp = character.hp.temp || 0;

    if (isHeal) {
      if (nextHp < character.hp.max) {
        const needed = character.hp.max - nextHp;
        if (amount <= needed) {
          nextHp += amount;
        } else {
          nextHp = character.hp.max;
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

    const change = (nextHp + nextTemp) - (character.hp.current + (character.hp.temp || 0));
    if (change === 0) return;

    await handleUpdateHP(
      { ...character.hp, current: nextHp, temp: nextTemp },
      Math.abs(change),
      change > 0
    );
  };

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

  const handleUpdateProficiencies = async (updatedProficiencies: string[]) => {
    if (!character) return;
    const updatedChar = { ...character, proficiencies: updatedProficiencies };
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
    } catch (error: any) {
      Alert.alert('Erro', error.message);
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

  const parts = character.characterClass.split(' (');
  const className = parts[0];
  const subclass = parts[1] ? parts[1].replace(')', '') : '';

  return (
    <ImageBackground
      source={getCharacterBackground(character.characterClass, isMobile)}
      style={styles.container}
      imageStyle={styles.bgImageStyles}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtnCompact} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color="#F59E0B" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.charName} numberOfLines={1}>{character.name}</Text>
            <Text style={styles.charSubtitle}>
              {className}{subclass ? ` | ${subclass}` : ''}{character.background ? ` | ${character.background.split(' (')[0]}` : ''}
            </Text>
          </View>
        </View>
        <View style={styles.levelBadgeCircle}>
          <Text style={styles.levelBadgeNumber}>{character.level}</Text>
          <Text style={styles.levelBadgeLabel}>NÍVEL</Text>
        </View>
      </View>

      {/* Main Content Area */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'tatico' && (
          <VitalsWidget
            combat={character.combat}
            stats={character.baseStats}
            proficiencies={character.proficiencies}
            level={character.level}
            equipment={character.equipment}
            characterClass={character.characterClass}
            onUpdateProficiencies={handleUpdateProficiencies}
            onUpdateEquipment={async (updatedEq) => {
              if (character) {
                const updatedChar = { ...character, equipment: updatedEq };
                try {
                  await StorageService.saveCharacter(updatedChar);
                  setCharacter(updatedChar);
                } catch (err) {
                  console.error('Error saving ammo:', err);
                }
              }
            }}
          />
        )}

        {activeTab === 'personagem' && (
          <CharacterTab
            character={character}
            onUpdateProficiencies={handleUpdateProficiencies}
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
            characterClass={character.characterClass}
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

      {/* HP & Moedas Sticky Footer */}
      {activeTab === 'tatico' && (
        <View style={styles.hpStickyFooter}>
          {/* Coins container (transparent background, no borders) */}
          <TouchableOpacity 
            style={styles.coinsContainerBottom} 
            onPress={() => {
              setEditCP(String(character.coins?.cp || 0));
              setEditSP(String(character.coins?.sp || 0));
              setEditEP(String(character.coins?.ep || 0));
              setEditGP(String(character.coins?.gp || 0));
              setEditPP(String(character.coins?.pp || 0));
              setCoinsModalVisible(true);
            }}
            activeOpacity={0.8}
          >
            <View style={styles.coinBadgeCompact}>
              <View style={[styles.coinDot, { backgroundColor: '#F59E0B' }]} />
              <Text style={styles.coinTextCompact}>{(character.coins?.gp || 0)} gp</Text>
            </View>
            <View style={styles.coinBadgeCompact}>
              <View style={[styles.coinDot, { backgroundColor: '#E2E8F0' }]} />
              <Text style={styles.coinTextCompact}>{(character.coins?.pp || 0)} pp</Text>
            </View>
            <View style={styles.coinBadgeCompact}>
              <View style={[styles.coinDot, { backgroundColor: '#A78BFA' }]} />
              <Text style={styles.coinTextCompact}>{(character.coins?.ep || 0)} ep</Text>
            </View>
            <View style={styles.coinBadgeCompact}>
              <View style={[styles.coinDot, { backgroundColor: '#94A3B8' }]} />
              <Text style={styles.coinTextCompact}>{(character.coins?.sp || 0)} sp</Text>
            </View>
            <View style={styles.coinBadgeCompact}>
              <View style={[styles.coinDot, { backgroundColor: '#B45309' }]} />
              <Text style={styles.coinTextCompact}>{(character.coins?.cp || 0)} cp</Text>
            </View>
          </TouchableOpacity>

          {/* HP Progress Bar */}
          {(() => {
            const hpPercentage = Math.max(0, Math.min(100, (character.hp.current / character.hp.max) * 100));
            const getHpColor = () => {
              if (hpPercentage > 50) return '#10B981';
              if (hpPercentage > 20) return '#F59E0B';
              return '#EF4444';
            };
            const hdCurrent = character.hitDice ? character.hitDice.current : character.level;
            const hdMax = character.level;
            const hdType = character.hitDice ? character.hitDice.dieType : getHitDieType(character.characterClass);

            return (
              <>
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
                      {(character.hp.temp ?? 0) > 0 ? (character.hp.current + (character.hp.temp ?? 0)) : character.hp.current}
                    </Text>
                    <Text style={styles.hpMaxLabel}>
                      /{character.hp.max}{(character.hp.temp ?? 0) > 0 ? ` (+${character.hp.temp})` : ''} HP
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
                          handleUpdateHitDice(hdCurrent - 1);
                        } else {
                          handleUpdateHitDice(hdMax);
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
              </>
            );
          })()}
        </View>
      )}

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
          style={[styles.tabItem, activeTab === 'personagem' && styles.tabItemActive]}
          onPress={() => setActiveTab('personagem')}
          activeOpacity={0.8}
        >
          <Ionicons
            name="person"
            size={20}
            color={activeTab === 'personagem' ? '#F59E0B' : '#64748B'}
          />
          <Text style={[styles.tabLabel, activeTab === 'personagem' && styles.tabLabelActive]}>
            PERFIL
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

      {/* Coins Editing Modal */}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  overlay: {
    flex: 1,
    paddingTop: 48,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
  },
  bgImageStyles: {
    opacity: 0.25,
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.4)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  backBtnCompact: {
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 6,
  },
  charName: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '900',
  },
  levelBadgeCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    borderColor: '#F59E0B',
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadgeNumber: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 13,
  },
  levelBadgeLabel: {
    color: '#F59E0B',
    fontSize: 6,
    fontWeight: '800',
    marginTop: 0.5,
  },
  charSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 160, // Padding for Tab Bar + Sticky Footer height
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
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 100,
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
  hpStickyFooter: {
    position: 'absolute',
    bottom: 64,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(51, 65, 85, 0.5)',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
    zIndex: 50,
  },
  coinsContainerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 2,
    marginTop: 2,
    width: '100%',
  },
  coinBadgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#334155',
    marginHorizontal: 4,
  },
  coinDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4,
  },
  coinTextCompact: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 6,
    width: '100%',
    backgroundColor: '#0F172A',
    borderRadius: 3,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#334155',
    marginTop: 4,
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
