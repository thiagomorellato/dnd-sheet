import { useTheme, ThemeColors } from '../context/ThemeContext';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, ImageBackground, Modal, TextInput, LayoutAnimation, Platform, UIManager, useWindowDimensions, Image } from 'react-native';
import { Alert } from '../utils/alert';
import { Character, HP, Resources, CombatLogEntry, ActionType, CombatConfig, EquipmentItem, BaseStats, Coins } from '../types/character';
import { StorageService } from '../services/storage';
import { LoggerService } from '../services/logger';
import { VitalsWidget } from '../components/VitalsWidget';
import { ResourceTracker } from '../components/ResourceTracker';
import { EquipmentTracker } from '../components/EquipmentTracker';
import { CharacterTab } from '../components/CharacterTab';
import { SpellbookWidget } from '../components/SpellbookWidget';
import { DiceRollerWidget } from '../components/DiceRollerWidget';
import { RestModal } from '../components/RestModal';
import { StatusConditions } from '../components/StatusConditions';
import { Ionicons } from '@expo/vector-icons';
import { getHitDieType, getArmorCategory, getSpellSlotsForClass, XP_THRESHOLDS } from '../utils/dndRules';
import Svg, { Circle } from 'react-native-svg';
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
    if (normalized.includes('paladin') || normalized.includes('paladino')) return require('../../assets/paladin_bgmob.jpg');
    if (normalized.includes('rogue') || normalized.includes('ladino')) return require('../../assets/rogue_bgmob.jpg');
    if (normalized.includes('wizard') || normalized.includes('mago')) return require('../../assets/wizard_bgmob.jpg');
    if (normalized.includes('monk') || normalized.includes('monge')) return require('../../assets/monk_bgmob.jpg');
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
  if (normalized.includes('paladin') || normalized.includes('paladino')) return require('../../assets/paladin_bg.jpg');
  if (normalized.includes('rogue') || normalized.includes('ladino')) return require('../../assets/rogue_bg.png');
  if (normalized.includes('wizard') || normalized.includes('mago')) return require('../../assets/wizard_bg.png');
  if (normalized.includes('monk') || normalized.includes('monge')) return require('../../assets/monk_bg.png');
  if (normalized.includes('ranger') || normalized.includes('patrulheiro')) return require('../../assets/ranger_bg.png');
  if (normalized.includes('artificer') || normalized.includes('artífice')) return require('../../assets/artificer_bg.png');
  return require('../../assets/paladin_bg.jpg');
};
export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  characterId,
  onBack
}) => {
  const {
    colors,
    toggleTheme,
      theme
  } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
  const {
    width
  } = useWindowDimensions();
  const isMobile = width < 768;
  const [character, setCharacter] = useState<Character | null>(null);
  const [logs, setLogs] = useState<CombatLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('tatico');
  const [restModalVisible, setRestModalVisible] = useState(false);
  const [xpDetailsModalVisible, setXpDetailsModalVisible] = useState(false);
  const promptCastSpell = (spellName: string) => {
    if (!character) return;

    // Filtra apenas os slots que são maiores que zero
    const availableSlots = Object.entries(character.resources.spellSlots)
      .filter(([_, slotData]) => slotData.current > 0)
      .map(([level, _]) => ({
        text: `Slot Nível ${level.replace('level', '')}`,
        onPress: () => executeCastSpell(spellName, level)
      }));

    if (availableSlots.length === 0) {
      Alert.alert('Sem Magia!', 'Você não tem mais espaços de magia disponíveis.');
      return;
    }

    Alert.alert(
      `Lançar ${spellName}`,
      'Gastar qual espaço de magia?',
      [...availableSlots, { text: 'Cancelar', style: 'cancel' }]
    );
  };

  // Função que realmente desconta o slot e salva
  const executeCastSpell = async (spellName: string, slotLevel: string) => {
    if (!character) return;
    setIsSaving(true);
    
    try {
      const updatedSlots = { ...character.resources.spellSlots };
      if (updatedSlots[slotLevel] && updatedSlots[slotLevel].current > 0) {
        updatedSlots[slotLevel] = {
          ...updatedSlots[slotLevel],
          current: updatedSlots[slotLevel].current - 1
        };
      }

      const updatedChar = {
        ...character,
        resources: { ...character.resources, spellSlots: updatedSlots }
      };

      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);

      const totalAC = character.combat.baseArmorClass + (character.combat.shieldOfFaithActive ? 2 : 0);
      await LoggerService.logEvent(
        character.id,
        'RESOURCE_USE',
        `✨ Lançou magia: ${spellName} (Usou slot Nível ${slotLevel.replace('level', '')})`,
        getHpSummary(character.hp, totalAC)
      );
      
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (e: any) {
      Alert.alert('Erro ao lançar magia', e.message);
    } finally {
      setIsSaving(false);
    }
  };
  const [xpInputValue, setXpInputValue] = useState('');
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
      pp: parseInt(editPP, 10) || 0
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
      nextTemp += nextCurrent - nextMax;
      nextCurrent = nextMax;
    } else if (nextCurrent < 0) {
      nextCurrent = 0;
    }
    const oldTotal = character.hp.current + (character.hp.temp || 0);
    const newTotal = nextCurrent + nextTemp;
    const change = newTotal - oldTotal;
    if (change !== 0 || character.hp.max !== nextMax) {
      await handleUpdateHP({
        current: nextCurrent,
        max: nextMax,
        temp: nextTemp
      }, Math.abs(change), change > 0);
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
          nextTemp += amount - needed;
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
    const change = nextHp + nextTemp - (character.hp.current + (character.hp.temp || 0));
    if (change === 0) return;
    await handleUpdateHP({
      ...character.hp,
      current: nextHp,
      temp: nextTemp
    }, Math.abs(change), change > 0);
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
    const updatedChar = {
      ...character,
      hp: updatedHp
    };
    const currentAC = character.combat.baseArmorClass + (character.combat.shieldOfFaithActive ? 2 : 0);
    const hpSummary = getHpSummary(updatedHp, currentAC);
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
      await LoggerService.logEvent(character.id, isHeal ? 'HP_HEAL' : 'HP_DAMAGE', isHeal ? `+${changeAmount}` : `-${changeAmount}`, hpSummary);
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (error: any) {
      Alert.alert('Error updating HP', error.message);
    }
  };
  const handleToggleShieldOfFaith = async (isActive: boolean) => {
    if (!character) return;
    const updatedCombat = {
      ...character.combat,
      shieldOfFaithActive: isActive
    };
    const updatedChar = {
      ...character,
      combat: updatedCombat
    };
    const currentAC = character.combat.baseArmorClass + (isActive ? 2 : 0);
    const hpSummary = getHpSummary(character.hp, currentAC);
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
      await LoggerService.logEvent(character.id, 'SHIELD_OF_FAITH', isActive ? 'Shield Active (+2 AC)' : 'Shield Inactive', hpSummary);
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };
  const handleUpdateCombat = async (updatedCombat: CombatConfig) => {
    if (!character) return;
    const updatedChar = {
      ...character,
      combat: updatedCombat
    };
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
    const updatedChar = {
      ...character,
      resources: updatedResources
    };
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
    } catch (error: any) {
      Alert.alert('Error updating resources', error.message);
    }
  };
  const handleUpdateCoins = async (updatedCoins: Coins) => {
    if (!character) return;
    const updatedChar = {
      ...character,
      coins: updatedCoins
    };
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
      await LoggerService.logEvent(character.id, 'RESOURCE_USE', `Dados de Vida alterados para: ${newHitDiceCount}/${character.level} (D${dieType})`, getHpSummary(character.hp, totalAC));
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (error: any) {
      Alert.alert('Erro ao atualizar dados de vida', error.message);
    }
  };
  const handleUpdatePreparedSpells = async (updatedPreparedSpells: string[]) => {
    if (!character) return;
    const updatedChar = {
      ...character,
      preparedSpells: updatedPreparedSpells
    };
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
    } catch (error: any) {
      Alert.alert('Error updating prepared spells', error.message);
    }
  };
  const handleUpdateProficiencies = async (updatedProficiencies: string[]) => {
    if (!character) return;
    const updatedChar = {
      ...character,
      proficiencies: updatedProficiencies
    };
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
      return {
        ...item,
        equipped: !item.equipped
      };
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
      await LoggerService.logEvent(character.id, isNowEquipped ? 'EQUIP_ITEM' : 'UNEQUIP_ITEM', detail, hpSummary);
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } catch (error: any) {
      Alert.alert('Error updating equipment', error.message);
    }
  };
  const handleAddItem = async (item: {
    name: string;
    type: 'weapon' | 'armor' | 'shield' | 'ring' | 'other' | 'ammunition';
    acBonus?: number;
    dmgDice?: string;
    isMagic?: boolean;
    rarity?: 'Comum' | 'Incomum' | 'Raro' | 'Muito Raro' | 'Lendário';
    description?: string;
    customResourceName?: string;
    customResourceMax?: number;
    linkedSpellName?: string;
    weight?: number;
  }) => {
    if (!character) return;
    
    let updatedEquipment = [...character.equipment];
    
    if (item.type === 'ammunition') {
      const existingAmmoIdx = updatedEquipment.findIndex(e => e.type === 'ammunition' && e.name === item.name);
      if (existingAmmoIdx >= 0) {
        const existing = updatedEquipment[existingAmmoIdx];
        updatedEquipment[existingAmmoIdx] = {
          ...existing,
          customResourceMax: (existing.customResourceMax || 0) + (item.customResourceMax || 0)
        };
      } else {
        const newItem: EquipmentItem = {
          id: crypto.randomUUID(),
          name: item.name,
          type: item.type as 'ammunition',
          equipped: false,
          acBonus: item.acBonus,
          dmgDice: item.dmgDice,
          isMagic: item.isMagic,
          rarity: item.rarity,
          description: item.description,
          customResourceName: item.customResourceName,
          customResourceMax: item.customResourceMax,
          linkedSpellName: item.linkedSpellName,
          weight: item.weight
        };
        updatedEquipment.push(newItem);
      }
    } else {
      const newItem: EquipmentItem = {
        id: crypto.randomUUID(),
        name: item.name,
        type: item.type as any,
        equipped: false,
        acBonus: item.acBonus,
        dmgDice: item.dmgDice,
        isMagic: item.isMagic,
        rarity: item.rarity,
        description: item.description,
        customResourceName: item.customResourceName,
        customResourceMax: item.customResourceMax,
        linkedSpellName: item.linkedSpellName,
        weight: item.weight
      };
      updatedEquipment.push(newItem);
    }

    const updatedChar = {
      ...character,
      equipment: updatedEquipment
    };
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
      const totalAC = character.combat.baseArmorClass + (character.combat.shieldOfFaithActive ? 2 : 0);
      await LoggerService.logEvent(character.id, 'RESOURCE_REGAIN', `Adicionado à mochila: ${item.name}`, getHpSummary(character.hp, totalAC));
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
    Alert.alert('Remover Item', `Tem certeza que deseja apagar permanentemente o item ${itemToDelete.name}?`, [{
      text: 'Cancelar',
      style: 'cancel'
    }, {
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
          await LoggerService.logEvent(character.id, 'HP_DAMAGE', `Descartado item: ${itemToDelete.name}`, getHpSummary(character.hp, totalAC));
          const logList = await LoggerService.getLogs(character.id);
          setLogs(logList);
        } catch (error: any) {
          Alert.alert('Erro ao deletar item', error.message);
        }
      }
    }]);
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

  // XP and Level Up
  const handleAddXP = async (amount: number) => {
    if (!character) return;
    setIsSaving(true);
    try {
      const currentXP = character.xp ?? 0;
      const newXP = currentXP + amount;
      const updatedChar = { ...character, xp: newXP };
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
      const totalAC = character.combat.baseArmorClass + (character.combat.shieldOfFaithActive ? 2 : 0);
      await LoggerService.logEvent(character.id, 'XP_GAIN', `+${amount} XP (Total: ${newXP.toLocaleString('pt-BR')})`, getHpSummary(character.hp, totalAC));
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
      // Check if leveled up
      const nextLevelThreshold = XP_THRESHOLDS[character.level + 1];
      if (nextLevelThreshold !== undefined && newXP >= nextLevelThreshold) {
        Alert.alert('🎉 Level Up disponível!', `Você atingiu ${newXP.toLocaleString('pt-BR')} XP! Já pode subir para o Nível ${character.level + 1}.`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleLevelUp = async () => {
    if (!character || character.level >= 20) return;
    const newLevel = character.level + 1;
    const dieType = character.hitDice?.dieType || getHitDieType(character.characterClass);
    const dieSize = parseInt(dieType.replace('d', ''), 10);
    const conMod = Math.floor((character.baseStats.con - 10) / 2);
    const hpRoll = Math.floor(Math.random() * dieSize) + 1;
    const hpGain = Math.max(1, hpRoll + conMod);

    // Get base class name for spell slots
    const baseClass = character.characterClass.split(' (')[0];
    const getNormClass = (cls: string) => {
      const n = cls.trim().toLowerCase();
      if (n.includes('paladino') || n.includes('paladin')) return 'Paladino';
      if (n.includes('clérigo') || n.includes('cleric')) return 'Clérigo';
      if (n.includes('mago') || n.includes('wizard')) return 'Mago';
      if (n.includes('bardo') || n.includes('bard')) return 'Bardo';
      if (n.includes('druida') || n.includes('druid')) return 'Druida';
      if (n.includes('feiticeiro') || n.includes('sorcerer')) return 'Feiticeiro';
      if (n.includes('bruxo') || n.includes('warlock')) return 'Bruxo';
      if (n.includes('patrulheiro') || n.includes('ranger')) return 'Patrulheiro';
      if (n.includes('artífice') || n.includes('artificer')) return 'Artífice';
      return cls;
    };
    const normClass = getNormClass(baseClass);
    const newSpellSlots = getSpellSlotsForClass(normClass, newLevel);

    const updatedChar: Character = {
      ...character,
      level: newLevel,
      hp: { ...character.hp, max: character.hp.max + hpGain, current: character.hp.current + hpGain },
      resources: { ...character.resources, spellSlots: newSpellSlots },
      hitDice: { current: (character.hitDice?.current ?? character.level) + 1, dieType },
    };
    setIsSaving(true);
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
      await LoggerService.logEvent(
        character.id, 'LEVEL_UP',
        `⬆️ Subiu para Nível ${newLevel}! HP +${hpGain} (rolou ${hpRoll} + ${conMod} CON)`,
        `Nível ${newLevel} | HP: ${updatedChar.hp.current}/${updatedChar.hp.max}`
      );
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
      Alert.alert(`🎉 Nível ${newLevel}!`, `Parabéns! Você subiu para o Nível ${newLevel}!\n\nHP ganho: +${hpGain} (rolou ${hpRoll} + ${conMod} CON)`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShortRest = async (hpGained: number, hitDiceUsed: number) => {
    if (!character) return;
    setIsSaving(true);
    try {
      const newCurrentHp = Math.min(character.hp.max, character.hp.current + hpGained);
      const newHitDiceCurrent = Math.max(0, (character.hitDice?.current ?? character.level) - hitDiceUsed);
      const dieType = character.hitDice?.dieType || getHitDieType(character.characterClass);
      const updatedChar: Character = {
        ...character,
        hp: { ...character.hp, current: newCurrentHp },
        hitDice: { current: newHitDiceCurrent, dieType },
      };
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
      const totalAC = character.combat.baseArmorClass + (character.combat.shieldOfFaithActive ? 2 : 0);
      await LoggerService.logEvent(character.id, 'HP_HEAL', `💤 Descanso Curto: +${hpGained} HP (${hitDiceUsed}x ${dieType} gastos)`, getHpSummary(updatedChar.hp, totalAC));
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLongRest = async () => {
    if (!character) return;
    setIsSaving(true);
    try {
      const restoredSlots = Object.fromEntries(
        Object.entries(character.resources.spellSlots).map(([k, v]) => [k, { ...v, current: v.max }])
      );
      const restoredResources = character.resources.customResources.map(r => ({ ...r, current: r.max }));
      const dieType = character.hitDice?.dieType || getHitDieType(character.characterClass);
      const updatedChar: Character = {
        ...character,
        hp: { ...character.hp, current: character.hp.max, temp: 0 },
        hitDice: { current: character.level, dieType },
        resources: { spellSlots: restoredSlots, customResources: restoredResources },
      };
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
      await LoggerService.logEvent(character.id, 'RESOURCE_REGAIN', '🌙 Descanso Longo: HP, slots e recursos restaurados ao máximo', `HP: ${character.hp.max}/${character.hp.max}`);
      const logList = await LoggerService.getLogs(character.id);
      setLogs(logList);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateConditions = async (conditions: string[]) => {
    if (!character) return;
    const updatedChar = { ...character, conditions };
    try {
      await StorageService.saveCharacter(updatedChar);
      setCharacter(updatedChar);
    } catch (error: any) {
      console.error('Error updating conditions:', error.message);
    }
  };
  const handleClearLogs = () => {
    Alert.alert('Limpar Histórico', 'Tem certeza de que deseja apagar todo o histórico de combate deste personagem?', [{
      text: 'Cancelar',
      style: 'cancel'
    }, {
      text: 'Limpar',
      style: 'destructive',
      onPress: async () => {
        if (!character) return;
        await LoggerService.clearLogs(character.id);
        setLogs([]);
      }
    }]);
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
        return { name: 'heart-dislike', color: colors.accentRed };
      case 'HP_HEAL':
        return { name: 'heart-half', color: colors.accentEmerald };
      case 'SHIELD_OF_FAITH':
        return { name: 'shield', color: colors.accentSky };
      case 'SMITE_USE':
        return { name: 'flame', color: colors.accentAmber };
      case 'EQUIP_ITEM':
        return { name: 'bag-add', color: colors.accentEmerald };
      case 'UNEQUIP_ITEM':
        return { name: 'bag-remove', color: colors.textMuted };
      case 'ITEM_ADDED':
        return { name: 'add-circle', color: colors.accentEmerald };
      case 'ITEM_REMOVED':
        return { name: 'remove-circle', color: colors.accentRed };
      case 'LEVEL_UP':
        return { name: 'arrow-up-circle', color: '#F59E0B' };
      case 'XP_GAIN':
        return { name: 'star', color: '#F59E0B' };
      case 'DICE_ROLL':
        return { name: 'dice', color: colors.accentSky };
      default:
        return { name: 'flash', color: colors.accentViolet };
    }
  };
  if (loading) {
    return <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.accentSky} />
        <Text style={styles.loadingText}>Carregando Dashboard...</Text>
      </View>;
  }
  if (!character) return null;
  const parts = character.characterClass.split(' (');
  const className = parts[0];
  const subclass = parts[1] ? parts[1].replace(')', '') : '';

  // --- CÁLCULO DE XP ---
  const currentXP = character.xp ?? 0;
  const level = character.level;
  const nextLevelXP = XP_THRESHOLDS[level + 1];
  const currentLevelXP = XP_THRESHOLDS[level] ?? 0;
  
  let progress = 1;
  if (nextLevelXP) {
    const xpNeeded = nextLevelXP - currentLevelXP;
    const xpEarned = currentXP - currentLevelXP;
    progress = Math.max(0, Math.min(1, xpEarned / xpNeeded));
  }
  const canLevelUp = nextLevelXP !== undefined && currentXP >= nextLevelXP;
  // ---------------------
  const totalCurrentSlots = character.resources?.spellSlots ? Object.values(character.resources.spellSlots).reduce((acc, slot) => acc + (slot.current || 0), 0) : 0;
  const totalMaxSlots = character.resources?.spellSlots ? Object.values(character.resources.spellSlots).reduce((acc, slot) => acc + (slot.max || 0), 0) : 0;

  return <ImageBackground source={getCharacterBackground(character.characterClass, isMobile)} style={styles.container} imageStyle={styles.bgImageStyles} resizeMode="cover">
      <View style={styles.overlay}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtnCompact} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color={colors.accentSky} />
          </TouchableOpacity>
          {character.imageUrl && <Image source={{
            uri: character.imageUrl
          }} style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            marginRight: 8,
            borderWidth: 1,
            borderColor: colors.accentAmber
          }} />}
          <View style={styles.headerTitleContainer}>
            <Text style={styles.charName} numberOfLines={1}>{character.name}</Text>
            <Text style={styles.charSubtitle}>
              {className}{subclass ? ` | ${subclass}` : ''}{character.background ? ` | ${character.background.split(' (')[0]}` : ''}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {isSaving && <ActivityIndicator size="small" color={colors.accentSky} style={{marginRight: 8}} />}
          <TouchableOpacity onPress={toggleTheme} style={{marginRight: 12}}>
            <Ionicons name={theme === 'dark' ? "sunny" : "moon"} size={20} color={colors.accentSky} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setXpInputValue(''); setXpDetailsModalVisible(true); }} style={styles.levelBadgeContainer}>
            <Svg width="44" height="44" style={{ position: 'absolute' }}>
              <Circle
                stroke={colors.surfaceSecondary}
                fill="none"
                cx="22"
                cy="22"
                r="19"
                strokeWidth="3"
              />
              <Circle
                stroke="#F59E0B"
                fill="none"
                cx="22"
                cy="22"
                r="19"
                strokeWidth="3"
                strokeDasharray={2 * Math.PI * 19}
                strokeDashoffset={(2 * Math.PI * 19) * (1 - progress)}
                strokeLinecap="round"
                transform="rotate(-90 22 22)"
              />
            </Svg>
            <View style={styles.levelBadgeInner}>
              <Text style={styles.levelBadgeNumber}>{character.level}</Text>
              <Text style={styles.levelBadgeLabel}>NÍVEL</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
<ScrollView contentContainerStyle={styles.scrollContent}>
        {activeTab === 'tatico' && <>
          
          <VitalsWidget
              combat={character.combat}
              stats={character.baseStats}
              proficiencies={character.proficiencies}
              level={character.level}
              equipment={character.equipment}
              characterClass={character.characterClass}
              coins={character.coins}
              imageUrl={character.imageUrl}
              preparedSpells={character.preparedSpells}
              spellSlots={character.resources.spellSlots}
              onCastSpell={promptCastSpell}
              conditions={character.conditions ?? []}
              onUpdateConditions={handleUpdateConditions}
              onUpdateImageUrl={async (url) => {
                if (character) {
                  const updatedChar = { ...character, imageUrl: url };
                  try {
                    await StorageService.saveCharacter(updatedChar);
                    setCharacter(updatedChar);
                  } catch (err) {}
                }
              }}
              onUpdateProficiencies={handleUpdateProficiencies}
              onUpdateEquipment={async updatedEq => {
                if (character) {
                  const updatedChar = { ...character, equipment: updatedEq };
                  try {
                    await StorageService.saveCharacter(updatedChar);
                    setCharacter(updatedChar);
                  } catch (err) { console.error('Error saving ammo:', err); }
                }
              }}
            />
        </>}

        {activeTab === 'personagem' && <CharacterTab character={character} onUpdateProficiencies={handleUpdateProficiencies} />}

        {activeTab === 'magias' && <ResourceTracker resources={character.resources} preparedSpells={character.preparedSpells} onUpdateResources={handleUpdateResources} onUpdatePreparedSpells={handleUpdatePreparedSpells} combat={character.combat} onUpdateCombat={handleUpdateCombat} hp={character.hp} onUpdateHP={handleUpdateHP} onLogAction={handleLogAction} hpSummary={getHpSummary(character.hp, character.combat.baseArmorClass + (character.combat.shieldOfFaithActive ? 2 : 0))} characterClass={character.characterClass} level={character.level} stats={character.baseStats} key={JSON.stringify(character.resources.spellSlots)} />}

        {activeTab === 'equipamentos' && <EquipmentTracker equipment={character.equipment} onToggleEquip={handleToggleEquip} onAddItem={handleAddItem} onDeleteItem={handleDeleteItem} characterClass={character.characterClass} />}

        {activeTab === 'logs' && <View style={styles.logCard}>
            <View style={styles.logHeader}>
              <View>
                <Text style={styles.logTitle}>HISTÓRICO DE COMBATE (EVENT SOURCING)</Text>
                <Text style={styles.logSubtitle}>Logs prontos para análise PySpark / BI</Text>
              </View>
              
              <View style={styles.logsActionRow}>
                <TouchableOpacity style={styles.logActionBtn} onPress={handleExportCSV}>
                  <Ionicons name="share-social-outline" size={16} color={colors.accentSky} />
                  <Text style={styles.logActionLabel}>CSV</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.logActionBtn, styles.logClearBtn]} onPress={handleClearLogs}>
                  <Ionicons name="trash-outline" size={16} color={colors.accentRed} />
                </TouchableOpacity>
              </View>
            </View>

            {logs.length === 0 ? <Text style={styles.emptyLogText}>Nenhum evento registrado ainda.</Text> : <View style={styles.logsList}>
                {logs.map(log => {
              const icon = getLogIcon(log.action_type);
              return <View key={log.id} style={styles.logItem}>
                      <View style={styles.logItemLeft}>
                        <View style={[styles.logIconBg, {
                    backgroundColor: icon.color + '1A'
                  }]}>
                          <Ionicons name={icon.name as any} size={16} color={icon.color} />
                        </View>
                        <View style={styles.logDetails}>
                          <Text style={styles.logValueChange}>{log.value_change}</Text>
                          <Text style={styles.logState}>{log.current_state}</Text>
                        </View>
                      </View>
                      <Text style={styles.logTime}>
                        {new Date(log.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                      </Text>
                    </View>;
            })}
              </View>}
          </View>}
      </ScrollView>

      {/* HP & Moedas Sticky Footer */}
      {activeTab === 'tatico' && <View style={styles.hpStickyFooter}>
          {/* Coins & Rest Container */}
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'center', // Centraliza o conteúdo principal (moedas)
            alignItems: 'center', 
            marginBottom: 8, 
            width: '100%',
            position: 'relative' // Permite o posicionamento absoluto do filho
          }}>
            
            {/* Coins container (centralizado absolutamente) */}
            <TouchableOpacity 
              style={styles.coinsContainerBottom} // Removi o flex: 1 para ele ficar natural no centro
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
                <View style={[styles.coinDot, { backgroundColor: colors.accentSky }]} />
                <Text style={styles.coinTextCompact}>{character.coins?.gp || 0} gp</Text>
              </View>
              
              <View style={styles.coinBadgeCompact}>
                <View style={[styles.coinDot, { backgroundColor: colors.textSecondary }]} />
                <Text style={styles.coinTextCompact}>{character.coins?.pp || 0} pp</Text>
              </View>
              
              <View style={styles.coinBadgeCompact}>
                <View style={[styles.coinDot, { backgroundColor: colors.accentViolet }]} />
                <Text style={styles.coinTextCompact}>{character.coins?.ep || 0} ep</Text>
              </View>
              
              <View style={styles.coinBadgeCompact}>
                <View style={[styles.coinDot, { backgroundColor: colors.textMuted }]} />
                <Text style={styles.coinTextCompact}>{character.coins?.sp || 0} sp</Text>
              </View>
              
              <View style={styles.coinBadgeCompact}>
                <View style={[styles.coinDot, { backgroundColor: '#B45309' }]} />
                <Text style={styles.coinTextCompact}>{character.coins?.cp || 0} cp</Text>
              </View>
            </TouchableOpacity>

            {/* Rest Button absoluto na direita */}
            <TouchableOpacity 
              onPress={() => setRestModalVisible(true)} 
              style={{ position: 'absolute', right: 0, padding: 4 }}
            >
              <Ionicons name="bed" size={20} color={colors.textMuted} />
            </TouchableOpacity>

          </View>

          {/* HP Progress Bar */}
          {(() => {
          const hpPercentage = Math.max(0, Math.min(100, character.hp.current / character.hp.max * 100));
          const getHpColor = () => {
            if (hpPercentage > 50) return colors.accentEmerald;
            if (hpPercentage > 20) return colors.accentAmber;
            return colors.accentRed;
          };
          const hdCurrent = character.hitDice ? character.hitDice.current : character.level;
          const hdMax = character.level;
          const hdType = character.hitDice ? character.hitDice.dieType : getHitDieType(character.characterClass);
          return <>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, {
                width: `${hpPercentage}%`,
                backgroundColor: getHpColor()
              }]} />
                </View>

                <View style={styles.hpControlsRow}>
                  {/* Left: HP values editing trigger */}
                  <TouchableOpacity style={styles.hpValuesWrapper} onPress={handleOpenHPModal} activeOpacity={0.7}>
                    <Text style={styles.hpCurrentLabel}>
                      {(character.hp.temp ?? 0) > 0 ? character.hp.current + (character.hp.temp ?? 0) : character.hp.current}
                    </Text>
                    <Text style={styles.hpMaxLabel}>
                      /{character.hp.max}{(character.hp.temp ?? 0) > 0 ? ` (+${character.hp.temp})` : ''} HP
                    </Text>
                    <Ionicons name="create-outline" size={10} color={colors.textMuted} style={{
                  marginLeft: 3,
                  alignSelf: 'center'
                }} />
                  </TouchableOpacity>

                  {/* Middle: HP Adjustments (- / + / Multiplier) */}
                  <View style={styles.quickControls}>
                    <TouchableOpacity style={[styles.controlBtnCompact, styles.btnDamageCompact]} onPress={() => handleAdjust(false)}>
                      <Ionicons name="remove" size={18} color="#FFF" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.controlBtnCompact, styles.btnHealCompact]} onPress={() => handleAdjust(true)}>
                      <Ionicons name="add" size={18} color="#FFF" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.multiplierBtnCompact} onPress={cycleMultiplier}>
                      <Text style={styles.multiplierValCompact}>{multiplier}x</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Right: Hit Dice Section (visual icons above numeric text) */}
                  <View style={styles.hitDiceSection}>
                    <TouchableOpacity style={styles.hitDiceInteractiveContainer} onPress={() => {
                  if (hdCurrent > 0) {
                    handleUpdateHitDice(hdCurrent - 1);
                  } else {
                    handleUpdateHitDice(hdMax);
                  }
                }} activeOpacity={0.7}>
                      {/* Row of cubes above text */}
                      <View style={styles.hitDiceCubesRow}>
                        {Array.from({
                      length: hdMax
                    }).map((_, idx) => <Ionicons key={idx} name={idx < hdCurrent ? "cube" : "cube-outline"} size={10} color={idx < hdCurrent ? colors.accentRed : colors.borderHighlight} style={{
                      marginRight: 2
                    }} />)}
                      </View>
                      <Text style={styles.hitDiceTextCompact}>
                        {hdCurrent}/{hdMax} ({hdType})
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>;
        })()}
        </View>}

      {/* Bottom Tab Navigation Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={[styles.tabItem, activeTab === 'tatico' && styles.tabItemActive]} onPress={() => setActiveTab('tatico')} activeOpacity={0.8}>
          <Ionicons name="shield" size={20} color={activeTab === 'tatico' ? colors.accentAmber : colors.textMuted} />
          <Text style={[styles.tabLabel, activeTab === 'tatico' && styles.tabLabelActive]}>
            TÁTICO
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabItem, activeTab === 'personagem' && styles.tabItemActive]} onPress={() => setActiveTab('personagem')} activeOpacity={0.8}>
          <Ionicons name="person" size={20} color={activeTab === 'personagem' ? colors.accentAmber : colors.textMuted} />
          <Text style={[styles.tabLabel, activeTab === 'personagem' && styles.tabLabelActive]}>
            PERFIL
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabItem, activeTab === 'magias' && styles.tabItemActive]} onPress={() => setActiveTab('magias')} activeOpacity={0.8}>
          <Ionicons name="flame" size={20} color={activeTab === 'magias' ? colors.accentAmber : colors.textMuted} />
          <Text style={[styles.tabLabel, activeTab === 'magias' && styles.tabLabelActive]}>
            MAGIAS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabItem, activeTab === 'equipamentos' && styles.tabItemActive]} onPress={() => setActiveTab('equipamentos')} activeOpacity={0.8}>
          <Ionicons name="briefcase" size={20} color={activeTab === 'equipamentos' ? colors.accentAmber : colors.textMuted} />
          <Text style={[styles.tabLabel, activeTab === 'equipamentos' && styles.tabLabelActive]}>
            EQUIPOS
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabItem, activeTab === 'logs' && styles.tabItemActive]} onPress={() => setActiveTab('logs')} activeOpacity={0.8}>
          <Ionicons name="list-circle" size={20} color={activeTab === 'logs' ? colors.accentAmber : colors.textMuted} />
          <Text style={[styles.tabLabel, activeTab === 'logs' && styles.tabLabelActive]}>
            LOGS
          </Text>
        </TouchableOpacity>
      </View>
      {/* RestModal */}
      <RestModal
        visible={restModalVisible}
        character={character}
        onClose={() => setRestModalVisible(false)}
        onShortRest={handleShortRest}
        onLongRest={handleLongRest}
      />
      {/* Detalhes de XP e Nível Modal */}
      <Modal animationType="fade" transparent visible={xpDetailsModalVisible} onRequestClose={() => setXpDetailsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { maxHeight: 'auto', width: '90%' }]}>
            <View style={styles.modalHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Ionicons name="star" size={18} color="#F59E0B" />
                <Text style={styles.modalTitle}>Experiência (XP)</Text>
              </View>
              <TouchableOpacity onPress={() => setXpDetailsModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
            
            {/* Infos Atuais */}
            <View style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6 }}>
                <Text style={{ color: colors.textMain, fontSize: 16, fontWeight: '800' }}>Nível {level}</Text>
                <Text style={{ color: colors.textMuted, fontSize: 13, fontWeight: '600' }}>
                  {currentXP.toLocaleString('pt-BR')} / {nextLevelXP ? nextLevelXP.toLocaleString('pt-BR') : 'Máx'} XP
                </Text>
              </View>
              <View style={[styles.xpBarBg, { backgroundColor: colors.surfaceSecondary, marginBottom: 4 }]}>
                <View style={[styles.xpBarFill, { width: `${progress * 100}%` as any }]} />
              </View>
              <Text style={{ color: colors.textMuted, fontSize: 11, textAlign: 'right' }}>
                {nextLevelXP 
                  ? `Faltam ${(nextLevelXP - currentXP).toLocaleString('pt-BR')} XP para o Nível ${level + 1}`
                  : 'Nível máximo alcançado!'}
              </Text>
            </View>

            {/* Ação: Subir de Nível ou Adicionar XP */}
            {canLevelUp ? (
              <TouchableOpacity
                style={[styles.levelUpBtn, { backgroundColor: '#F59E0B', paddingVertical: 12, justifyContent: 'center', marginTop: 8 }]}
                onPress={() => {
                  handleLevelUp();
                  setXpDetailsModalVisible(false);
                }}
              >
                <Ionicons name="arrow-up-circle" size={18} color="#000" style={{ marginRight: 6 }} />
                <Text style={[styles.levelUpBtnText, { fontSize: 14 }]}>Subir para Nível {level + 1}!</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ marginTop: 8 }}>
                <Text style={{ color: colors.textMuted, fontSize: 13, marginBottom: 8, fontWeight: '600' }}>
                  Adicionar XP Ganho:
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <TextInput
                    style={[styles.coinTextInput, { flex: 1, height: 42, fontSize: 18, fontWeight: '800' }]}
                    keyboardType="numeric"
                    value={xpInputValue}
                    onChangeText={setXpInputValue}
                    placeholder="Ex: 450"
                    placeholderTextColor={colors.borderHighlight}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      const amount = parseInt(xpInputValue, 10);
                      if (!isNaN(amount) && amount > 0) {
                        handleAddXP(amount);
                        setXpDetailsModalVisible(false);
                      }
                    }}
                    style={{ backgroundColor: '#F59E0B', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 20 }}
                  >
                    <Text style={{ color: '#000', fontWeight: '800' }}>Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>


      {/* Coins Editing Modal */}

      <Modal animationType="slide" transparent={true} visible={coinsModalVisible} onRequestClose={() => setCoinsModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Gerenciador de Moedas</Text>
                <Text style={{ color: colors.textMuted, fontSize: 13, marginTop: 4, fontWeight: '500' }}>
                  Peso total: {(((parseInt(editCP)||0) + (parseInt(editSP)||0) + (parseInt(editEP)||0) + (parseInt(editGP)||0) + (parseInt(editPP)||0)) / 50).toFixed(1)} lb
                </Text>
              </View>
              <TouchableOpacity onPress={() => setCoinsModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ flexShrink: 1 }}>
              <View style={styles.coinInputsContainer}>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, {
                  backgroundColor: colors.accentSky
                }]} />
                <Text style={styles.coinInputLabel}>Ouro (PO):</Text>
                <TextInput style={styles.coinTextInput} keyboardType="numeric" value={editGP} onChangeText={setEditGP} />
              </View>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, {
                  backgroundColor: colors.textSecondary
                }]} />
                <Text style={styles.coinInputLabel}>Platina (PL):</Text>
                <TextInput style={styles.coinTextInput} keyboardType="numeric" value={editPP} onChangeText={setEditPP} />
              </View>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, {
                  backgroundColor: colors.accentViolet
                }]} />
                <Text style={styles.coinInputLabel}>Electro (PE):</Text>
                <TextInput style={styles.coinTextInput} keyboardType="numeric" value={editEP} onChangeText={setEditEP} />
              </View>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, {
                  backgroundColor: colors.textMuted
                }]} />
                <Text style={styles.coinInputLabel}>Prata (PP):</Text>
                <TextInput style={styles.coinTextInput} keyboardType="numeric" value={editSP} onChangeText={setEditSP} />
              </View>
              <View style={styles.coinInputRow}>
                <View style={[styles.coinDot, {
                  backgroundColor: '#B45309'
                }]} />
                <Text style={styles.coinInputLabel}>Cobre (PC):</Text>
                <TextInput style={styles.coinTextInput} keyboardType="numeric" value={editCP} onChangeText={setEditCP} />
              </View>
            </View>
            </ScrollView>

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
      <Modal animationType="slide" transparent={true} visible={hpModalVisible} onRequestClose={() => setHpModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Gerenciador de Pontos de Vida</Text>
              <TouchableOpacity onPress={() => setHpModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ flexShrink: 1 }}>
              <View style={styles.coinInputsContainer}>
                <View style={styles.coinInputRow}>
                  <View style={[styles.coinDot, { backgroundColor: colors.accentEmerald }]} />
                  <Text style={styles.coinInputLabel}>PV Atuais (Current HP):</Text>
                  <TextInput style={styles.coinTextInput} keyboardType="numeric" value={editCurrentHP} onChangeText={setEditCurrentHP} />
                </View>
                <View style={styles.coinInputRow}>
                  <View style={[styles.coinDot, { backgroundColor: colors.accentRed }]} />
                  <Text style={styles.coinInputLabel}>PV Máximos (Max HP):</Text>
                  <TextInput style={styles.coinTextInput} keyboardType="numeric" value={editMaxHP} onChangeText={setEditMaxHP} />
                </View>
                <View style={styles.coinInputRow}>
                  <View style={[styles.coinDot, { backgroundColor: '#3B82F6' }]} />
                  <Text style={styles.coinInputLabel}>PV Temporários (Temp HP):</Text>
                  <TextInput style={styles.coinTextInput} keyboardType="numeric" value={editTempHP} onChangeText={setEditTempHP} />
                </View>
              </View>
            </ScrollView>

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
    </ImageBackground>;
};
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  overlay: {
    flex: 1,
    paddingTop: 48,
    backgroundColor: colors.dashboardOverlay
  },
  bgImageStyles: {
    opacity: 0.25
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 12
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12
  },
  backBtnCompact: {
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 6
  },
  charName: {
    color: colors.textMain,
    fontSize: 20,
    fontWeight: '900'
  },
  levelBadgeContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadgeInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelBadgeNumber: {
    color: colors.textMain,
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 13
  },
  levelBadgeLabel: {
    color: colors.accentAmber,
    fontSize: 6,
    fontWeight: '800',
    marginTop: 0.5
  },
  charSubtitle: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 160, // Padding for Tab Bar + Sticky Footer height
    flexGrow: 1
  },
  logCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10
  },
  logTitle: {
    color: colors.textMain,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  logSubtitle: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '600',
    marginTop: 1
  },
  logsActionRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6
  },
  logActionLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4
  },
  logClearBtn: {
    marginRight: 0,
    borderColor: '#451A20'
  },
  emptyLogText: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 30,
    fontStyle: 'italic'
  },
  logsList: {
    flexDirection: 'column'
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.surface
  },
  logItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8
  },
  logIconBg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  logDetails: {
    flex: 1
  },
  logValueChange: {
    color: colors.textMain,
    fontSize: 14,
    fontWeight: '700'
  },
  logState: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 2,
    fontWeight: '500'
  },
  logTime: {
    color: colors.borderHighlight,
    fontSize: 11,
    fontWeight: '600'
  },
  tabBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: colors.overlayBg,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 100
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  tabItemActive: {
    borderTopWidth: 2,
    borderTopColor: colors.accentAmber
  },
  tabLabel: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: 0.5
  },
  tabLabelActive: {
    color: colors.accentAmber,
    fontWeight: '900'
  },
  hpStickyFooter: {
    position: 'absolute',
    bottom: 64,
    left: 0,
    right: 0,
    backgroundColor: colors.overlayBg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 4,
    zIndex: 50
  },
  coinsContainerBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 2,
    marginTop: 2,
    width: '100%'
  },
  coinBadgeCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: colors.border,
    marginHorizontal: 4
  },
  coinDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 4
  },
  coinTextCompact: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700'
  },
  progressBarBg: {
    height: 6,
    width: '100%',
    backgroundColor: colors.background,
    borderRadius: 3,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: colors.border,
    marginTop: 4
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3
  },
  hpControlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    width: '100%'
  },
  hpValuesWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flex: 1
  },
  hpCurrentLabel: {
    color: colors.textMain,
    fontSize: 15,
    fontWeight: '900'
  },
  hpMaxLabel: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    marginLeft: 1.5
  },
  quickControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.2
  },
  controlBtnCompact: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnDamageCompact: {
    backgroundColor: colors.accentRed
  },
  btnHealCompact: {
    backgroundColor: colors.accentEmerald,
    marginLeft: 8
  },
  multiplierBtnCompact: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.overlayBg,
    borderWidth: 1,
    borderColor: colors.accentAmber,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4
  },
  multiplierValCompact: {
    color: colors.accentAmber,
    fontSize: 9,
    fontWeight: '900'
  },
  hitDiceSection: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1
  },
  hitDiceInteractiveContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  hitDiceCubesRow: {
    flexDirection: 'row',
    marginBottom: 2
  },
  hitDiceTextCompact: {
    color: colors.textSecondary,
    fontSize: 9,
    fontWeight: '700'
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
    maxHeight: '80%',
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
  coinInputsContainer: {
    flexDirection: 'column',
    marginBottom: 10
  },
  coinInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8
  },
  coinInputLabel: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 8
  },
  coinTextInput: {
    backgroundColor: colors.surface,
    color: colors.textMain,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 6,
    width: 80,
    height: 32,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '800'
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10
  },
  cancelBtnText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700'
  },
  saveBtn: {
    backgroundColor: colors.accentSky,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8
  },
  saveBtnText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '800'
  },
  xpBarBg: {
    height: 6,
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
    marginBottom: 6,
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 3,
  },
  xpFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  xpNextLabel: {
    fontSize: 10,
    fontWeight: '600',
  },
  levelUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  levelUpBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#000',
  },
  actionCard: {
    width: 72,
    height: 72,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionCardText: {
    fontSize: 10,
    fontWeight: '800',
    marginTop: 6,
  },
  spellItemBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 8,
  borderWidth: 1,
  gap: 6,
  margin: 4, // Espaçamento entre os botões
  minWidth: '45%', // Isso forçará até 2 por linha. Se quiser 3, use '30%'
  },
  spellItemText: {
    fontSize: 12, // Fonte um pouco menor
    fontWeight: '700',
    flex: 1,
  }
});