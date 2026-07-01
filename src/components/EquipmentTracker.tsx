import { useTheme, ThemeColors } from '../context/ThemeContext';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Alert } from '../utils/alert';
import { EquipmentItem } from '../types/character';
import { Ionicons } from '@expo/vector-icons';
import { MAGIC_ITEMS_LIST, MagicItemTemplate, isProficientInItem, WEAPON_TEMPLATES, AMMUNITION_TEMPLATES } from '../utils/dndRules';
import Svg, { Path } from 'react-native-svg';
import SwordIcon from '../../assets/icons/ffffff/transparent/1x1/delapouite/sword-brandish.svg';
import AxeIcon from '../../assets/icons/ffffff/transparent/1x1/delapouite/sharp-axe.svg';
import MaceIcon from '../../assets/icons/ffffff/transparent/1x1/delapouite/flanged-mace.svg';
import DaggerIcon from '../../assets/icons/ffffff/transparent/1x1/lorc/sacrificial-dagger.svg';
import SpearIcon from '../../assets/icons/ffffff/transparent/1x1/lorc/barbed-spear.svg';
import BowIcon from '../../assets/icons/ffffff/transparent/1x1/delapouite/bow-arrow.svg';
import CrossbowIcon from '../../assets/icons/ffffff/transparent/1x1/carl-olsen/crossbow.svg';
import HammerIcon from '../../assets/icons/ffffff/transparent/1x1/delapouite/thor-hammer.svg';
import WizardStaffIcon from '../../assets/icons/ffffff/transparent/1x1/lorc/wizard-staff.svg';
import ArrowIcon from '../../assets/icons/ffffff/transparent/1x1/lorc/arrowhead.svg';

interface EquipmentTrackerProps {
  equipment: EquipmentItem[];
  onToggleEquip: (itemId: string) => void;
  onAddItem: (item: { 
    name: string; 
    type: 'weapon' | 'armor' | 'shield' | 'ring' | 'other' | 'ammunition'; 
    acBonus?: number; 
    dmgDice?: string;
    dmgType?: string;
    handedness?: string;
    properties?: string[];
    isMagic?: boolean;
    rarity?: 'Comum' | 'Incomum' | 'Raro' | 'Muito Raro' | 'Lendário';
    description?: string;
  }) => void;
  onDeleteItem: (itemId: string) => void;
  characterClass: string;
}

type ItemType = 'weapon' | 'armor' | 'shield' | 'ring' | 'other' | 'ammunition';

export const EquipmentTracker: React.FC<EquipmentTrackerProps> = ({
  equipment = [],
  onToggleEquip,
  onAddItem,
  onDeleteItem,
  characterClass,
}) => {
  const { colors } = useTheme();
  const styles = useStyles(colors);
  const [modalVisible, setModalVisible] = useState(false);
  const [creationMode, setCreationMode] = useState<'custom' | 'magic'>('custom');
  
  // Custom item states
  const [name, setName] = useState('');
  const [type, setType] = useState<ItemType>('weapon');
  const [acBonus, setAcBonus] = useState('');
  const [dmgDice, setDmgDice] = useState('');
  const [dmgType, setDmgType] = useState('');
  const [handedness, setHandedness] = useState('');
  const [propertiesText, setPropertiesText] = useState('');
  const [description, setDescription] = useState('');
  const [customResourceName, setCustomResourceName] = useState('');
  const [customResourceMax, setCustomResourceMax] = useState('');
  const [linkedSpellName, setLinkedSpellName] = useState('');
  const [weight, setWeight] = useState('');

  // Magic item states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMagicItem, setSelectedMagicItem] = useState<MagicItemTemplate | null>(null);
  const getDynamicIcon = (name: string, color: string, size: number = 20) => {
  const n = name.toLowerCase();
    if (n.includes('machado') || n.includes('axe')) return <AxeIcon width={size} height={size} fill={color} />;
    if (n.includes('arco') || n.includes('bow')) return <BowIcon width={size} height={size} fill={color} />;
    if (n.includes('besta') || n.includes('crossbow')) return <CrossbowIcon width={size} height={size} fill={color} />;
    if (n.includes('adaga') || n.includes('dagger')) return <DaggerIcon width={size} height={size} fill={color} />;
    if (n.includes('lança') || n.includes('spear')) return <SpearIcon width={size} height={size} fill={color} />;
    if (n.includes('bastão') || n.includes('staff')) return <WizardStaffIcon width={size} height={size} fill={color} />;
    if (n.includes('maça') || n.includes('mace') || n.includes('clava')) return <MaceIcon width={size} height={size} fill={color} />;
    if (n.includes('martelo') || n.includes('hammer')) return <HammerIcon width={size} height={size} fill={color} />;
    return <SwordIcon width={size} height={size} fill={color} />;
  };
  const renderAmmunitionIcon = (name: string, color: string) => {
  const n = name.toLowerCase();
    if (n.includes('agulha') || n.includes('needle')) {
      return (
        <Svg width={20} height={20} viewBox="0 0 64 64">
          <Path fill={color} d=" M 10.22 8.29 C 11.74 7.61 13.03 9.00 14.03 9.94 C 17.67 13.65 21.42 17.24 25.01 20.99 C 26.17 21.92 25.62 23.43 26.10 24.64 C 35.86 34.34 45.59 44.06 55.28 53.83 C 56.85 54.64 54.73 56.85 53.86 55.32 C 44.13 45.59 34.37 35.89 24.67 26.13 C 20.92 26.29 18.97 22.74 16.46 20.53 C 13.88 17.83 11.03 15.38 8.64 12.51 C 7.40 11.03 8.61 8.85 10.22 8.29 M 10.28 10.32 L 10.41 11.63 C 14.63 15.73 18.64 20.04 22.97 24.03 C 23.21 23.80 23.71 23.34 23.96 23.11 C 20.25 18.57 15.65 14.70 11.62 10.39 L 10.28 10.32 Z" />
        </Svg>
      );
    }
    if (n.includes('virote') || n.includes('bolt')) {
      return (
        <Svg width={20} height={20} viewBox="0 0 512 512">
          <Path fill={color} d=" M 45.08 34.13 C 53.38 30.37 63.80 32.28 70.22 38.74 C 95.31 63.81 120.40 88.87 145.46 113.97 C 134.97 124.46 124.50 134.97 113.98 145.43 C 88.90 120.38 63.84 95.31 38.77 70.24 C 33.41 65.08 30.93 57.18 32.44 49.89 C 33.73 42.97 38.62 36.90 45.08 34.13 Z" />
          <Path fill={color} d=" M 125.27 156.75 C 135.77 146.28 146.25 135.79 156.73 125.30 C 163.42 131.95 170.08 138.64 176.76 145.31 C 166.30 155.83 155.81 166.32 145.29 176.79 C 138.63 170.10 131.94 163.43 125.27 156.75 Z" />
          <Path fill={color} d=" M 156.67 188.12 C 167.14 177.62 177.63 167.14 188.13 156.65 C 254.74 223.20 321.31 289.80 387.88 356.39 C 377.43 366.92 366.92 377.40 356.41 387.87 C 289.87 321.25 223.23 254.72 156.67 188.12 Z" />
          <Path fill={color} d=" M 338.07 283.94 C 365.79 283.87 393.50 283.85 421.22 283.69 C 437.15 299.40 452.90 315.29 468.70 331.12 C 440.98 331.24 413.26 331.24 385.54 331.36 C 369.66 315.62 353.89 299.76 338.07 283.94 Z" />
          <Path fill={color} d=" M 283.97 338.07 C 299.78 353.90 315.69 369.64 331.39 385.59 C 331.20 413.29 331.25 440.99 331.13 468.69 C 315.33 452.86 299.46 437.09 283.70 421.22 C 283.86 393.50 283.84 365.79 283.97 338.07 Z" />
        </Svg>
      );
    }
    if (n.includes('funda') || n.includes('bullet') || n.includes('bala') || n.includes('slingshot')) {
      return (
        <Svg width={20} height={20} viewBox="0 0 512 512">
          <Path fill={color} d=" M 234.91 173.85 C 247.87 168.52 262.79 168.31 275.94 173.07 C 293.09 179.15 306.90 193.68 312.12 211.10 C 288.51 214.43 267.12 229.85 256.45 251.17 C 245.76 229.89 224.43 214.37 200.80 211.10 C 205.79 194.39 218.68 180.27 234.91 173.85 Z" />
          <Path fill={color} d=" M 185.36 226.48 C 199.88 225.26 214.83 229.71 226.21 238.83 C 237.46 247.65 245.27 260.75 247.59 274.87 C 250.18 289.50 246.69 305.05 238.30 317.29 C 229.76 329.88 216.14 338.96 201.15 341.73 C 186.59 344.67 170.98 341.51 158.55 333.41 C 145.23 324.83 135.63 310.62 132.89 294.99 C 129.97 279.74 133.69 263.40 142.74 250.81 C 152.48 236.97 168.50 227.85 185.36 226.48 Z" />
          <Path fill={color} d=" M 318.36 226.44 C 332.39 225.38 346.79 229.60 357.94 238.20 C 369.60 247.02 377.75 260.37 380.13 274.80 C 383.03 290.98 378.44 308.26 368.09 321.00 C 359.43 331.83 346.80 339.45 333.12 341.84 C 318.12 344.71 302.07 341.12 289.58 332.38 C 276.78 323.57 267.75 309.47 265.28 294.11 C 262.67 279.21 266.36 263.38 275.11 251.06 C 284.94 236.98 301.23 227.69 318.36 226.44 Z" />
        </Svg>
      );
    }
    return (
      <Svg width={20} height={20} viewBox="0 0 50 50">
        <Path fill={color} d=" M 38.10 5.24 C 41.06 4.36 44.01 3.35 47.10 3.01 C 46.55 6.03 45.66 8.97 44.76 11.89 C 42.95 11.90 41.15 12.06 39.34 12.06 C 32.85 18.60 26.36 25.13 19.78 31.59 C 19.55 31.17 19.09 30.32 18.86 29.90 C 25.04 23.32 31.61 17.09 37.95 10.66 C 37.94 8.85 38.10 7.05 38.10 5.24 Z" />
        <Path fill={color} d=" M 9.74 31.80 C 11.79 28.92 15.65 30.26 18.62 30.00 C 15.19 33.36 11.85 36.80 8.41 40.13 C 8.91 40.38 9.91 40.87 10.42 41.12 C 13.51 37.82 16.77 34.68 19.98 31.50 C 19.77 34.42 21.04 38.20 18.23 40.24 C 15.52 42.55 13.52 45.87 10.13 47.26 C 10.08 45.29 10.03 43.32 10.05 41.34 C 9.08 42.28 8.16 43.28 7.09 44.09 C 4.42 43.17 7.66 41.18 8.43 40.02 C 6.52 40.02 4.62 39.87 2.71 39.80 C 4.26 36.52 7.40 34.47 9.74 31.80 Z" />
      </Svg>
    );
  };

  const getIcon = (type: EquipmentItem['type']) => {
    switch (type) {
      case 'weapon':
        return 'sword';
      case 'armor':
        return 'shirt';
      case 'shield':
        return 'shield-half';
      case 'ring':
        return 'finger-print';
      default:
        return 'briefcase';
    }
  };

  const getIconColor = (type: EquipmentItem['type'], equipped: boolean) => {
    if (!equipped) return colors.textMuted;
    switch (type) {
      case 'weapon':
        return colors.accentRed;
      case 'armor':
        return '#3B82F6';
      case 'shield':
        return colors.accentEmerald;
      case 'ring':
        return colors.accentAmber;
      default:
        return colors.accentViolet;
    }
  };

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'Comum': return '#64748B';
      case 'Incomum': return colors.accentEmerald;
      case 'Raro': return '#3B82F6';
      case 'Muito Raro': return '#8B5CF6';
      case 'Lendário': return colors.accentRed;
      default: return '#64748B';
    }
  };

  const handleSave = () => {
    if (creationMode === 'custom') {
      if (!name.trim()) {
        Alert.alert('Aviso', 'Por favor, digite o nome do item.');
        return;
      }

      const newItem: any = {
        name: name.trim(),
        type,
        isMagic: false,
      };

      const parsedWeight = parseFloat(weight.replace(',', '.'));
      if (!isNaN(parsedWeight) && parsedWeight > 0) newItem.weight = parsedWeight;

      if (type === 'weapon') {
        if (dmgDice.trim()) {
          newItem.dmgDice = dmgDice.trim();
        }
        if (dmgType.trim()) {
          newItem.dmgType = dmgType.trim();
        }
        if (handedness.trim()) {
          newItem.handedness = handedness.trim();
        }
        if (propertiesText.trim()) {
          newItem.properties = propertiesText.split(',').map(p => p.trim()).filter(Boolean);
        }
      } else if (type === 'ammunition') {
        newItem.customResourceName = name;
        newItem.customResourceMax = parseInt(dmgDice, 10) || 20;
      } else {
        const bonus = parseInt(acBonus, 10);
        if (!isNaN(bonus) && bonus !== 0) {
          newItem.acBonus = bonus;
        }
      }

      if (description.trim()) {
        newItem.description = description.trim();
        newItem.isMagic = true;
        newItem.rarity = 'Incomum';
      }

      if (customResourceName.trim() && customResourceMax.trim()) {
        const maxVal = parseInt(customResourceMax, 10);
        if (!isNaN(maxVal) && maxVal > 0) {
          newItem.customResourceName = customResourceName.trim();
          newItem.customResourceMax = maxVal;
          newItem.isMagic = true;
          newItem.rarity = 'Incomum';
        }
      }

      if (linkedSpellName.trim()) {
        newItem.linkedSpellName = linkedSpellName.trim();
        newItem.isMagic = true;
        newItem.rarity = 'Incomum';
      }

      onAddItem(newItem);
    } else {
      if (!selectedMagicItem) {
        Alert.alert('Aviso', 'Por favor, selecione um item mágico da lista.');
        return;
      }

      const newItem: any = {
        name: selectedMagicItem.name,
        type: selectedMagicItem.type,
        isMagic: true,
        rarity: selectedMagicItem.rarity,
        description: selectedMagicItem.description,
        acBonus: selectedMagicItem.acBonus,
        dmgDice: selectedMagicItem.dmgDice,
      };

      onAddItem(newItem);
    }

    // Reset Form
    setName('');
    setType('weapon');
    setAcBonus('');
    setDmgDice('');
    setDmgType('');
    setHandedness('');
    setPropertiesText('');
    setDescription('');
    setCustomResourceName('');
    setCustomResourceMax('');
    setLinkedSpellName('');
    setSelectedMagicItem(null);
    setSearchQuery('');
    setModalVisible(false);
  };

  const equippedItems = equipment.filter(item => item.equipped);
  const unequippedItems = equipment.filter(item => !item.equipped);

  const filteredMagicItems = MAGIC_ITEMS_LIST.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.rarity.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItemCard = (item: EquipmentItem) => {
    const isProf = (item.type === 'weapon' || item.type === 'armor' || item.type === 'shield')
      ? isProficientInItem(characterClass, item.type, item.name)
      : true;

    return (
      <View key={item.id} style={[styles.itemCard, item.equipped && styles.itemCardEquipped]}>
        <View style={styles.cardHeaderRow}>
          {/* Equip Toggle Press Area */}
          <TouchableOpacity
            style={styles.itemLeft}
            onPress={() => onToggleEquip(item.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBg, { backgroundColor: getIconColor(item.type, item.equipped) + '1A' }]}>
              {item.type === 'weapon' ? (
                getDynamicIcon(item.name, getIconColor(item.type, item.equipped), 20)
              ) : item.type === 'ammunition' ? (
                renderAmmunitionIcon(item.name, getIconColor(item.type, item.equipped))
              ) : (
                <Ionicons 
                  // Usando nomes que existem no Ionicons:
                  name={item.type === 'armor' ? 'shirt' : item.type === 'shield' ? 'shield-half' : item.type === 'ring' ? 'finger-print' : 'briefcase'} 
                  size={20} 
                  color={getIconColor(item.type, item.equipped)} 
                />
              )}
            </View>
            <View style={styles.itemDetails}>
              <View style={styles.nameRow}>
                <Text style={[styles.itemName, item.equipped && styles.itemNameEquipped]}>{item.name}</Text>
                {(item.type === 'weapon' || item.type === 'armor' || item.type === 'shield') && (
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
                )}
                {item.isMagic && (
                  <View style={[styles.magicBadge, { backgroundColor: getRarityColor(item.rarity) + '22', borderColor: getRarityColor(item.rarity) }]}>
                    <Text style={[styles.magicBadgeText, { color: getRarityColor(item.rarity) }]}>{item.rarity}</Text>
                  </View>
                )}
                {item.customResourceName && item.customResourceMax !== undefined && (
                  <View style={[
                    styles.magicBadge, 
                    { 
                      backgroundColor: item.customResourceMax > 0 ? colors.accentAmber + '22' : '#EF444422', // Fica vermelhinho quando acaba
                      borderColor: item.customResourceMax > 0 ? colors.accentAmber : '#EF4444' 
                    }
                  ]}>
                    <Text style={[
                      styles.magicBadgeText, 
                      { color: item.customResourceMax > 0 ? colors.accentAmber : '#EF4444' }
                    ]}>
                      ⚡ {item.customResourceMax > 0 ? `${item.customResourceMax} Cargas` : 'Sem cargas'}
                    </Text>
                  </View>
                )}
              </View>
              <Text style={styles.itemType}>
                {item.type.toUpperCase()}
                {item.handedness ? ` | ${item.handedness}` : ''}
                {item.dmgType ? ` (${item.dmgType})` : ''}
                {item.properties && item.properties.length > 0 ? ` | ${item.properties.join(', ')}` : ''}
                {item.weight ? ` | ${item.type === 'ammunition' && item.customResourceMax !== undefined ? (item.weight * item.customResourceMax).toFixed(1) : item.weight} lb` : ''}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Item Properties & Actions */}
          <View style={styles.itemRight}>
            {item.acBonus && (
              <Text style={styles.itemStat}>
                +{item.acBonus} AC
              </Text>
            )}
            {item.dmgDice && (
              <Text style={styles.itemStat}>
                {item.dmgDice}
              </Text>
            )}
            
            {/* Toggle Status Indicator */}
            <TouchableOpacity onPress={() => onToggleEquip(item.id)} style={{ marginLeft: 12 }}>
              <Ionicons
                name={item.equipped ? "checkmark-circle" : "ellipse-outline"}
                size={20}
                color={item.equipped ? colors.accentAmber : "#475569"}
              />
            </TouchableOpacity>

            {/* Delete Item Button */}
            <TouchableOpacity onPress={() => onDeleteItem(item.id)} style={styles.deleteBtn}>
              <Ionicons name="trash-outline" size={16} color="#F87171" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Description & Effects for Custom/Magic Items */}
        {(item.description || item.customResourceName || item.linkedSpellName) && (
          <View style={styles.descContainer}>
            {item.description ? <Text style={styles.descText}>{item.description}</Text> : null}
            {item.customResourceName && (
              <Text style={{ fontSize: 10, fontWeight: '700', marginTop: 4, color: colors.accentAmber }}>
                ✦ Adiciona habilidade: {item.customResourceName}
              </Text>
            )}
            {item.linkedSpellName && (
              <Text style={{ fontSize: 9, fontWeight: '800', marginTop: 4, color: '#60A5FA' }}>
                ✦ MAGIA CONCEDIDA: {item.linkedSpellName.toUpperCase()}
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>EQUIPAMENTOS & MOCHILA</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
          <Ionicons name="add" size={14} color={colors.textMain} style={{ marginRight: 4 }} />
          <Text style={styles.addBtnText}>Novo Item</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subText}>Toque em um item para equipar. Itens equipados afetam seus modificadores.</Text>

      {/* Equipped Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>EQUIPADOS</Text>
        {equippedItems.length === 0 ? (
          <Text style={styles.emptyText}>Sem itens equipados.</Text>
        ) : (
          equippedItems.map(renderItemCard)
        )}
      </View>

      {/* Bag / Unequipped Section */}
      <View style={[styles.section, { borderTopWidth: 1, borderTopColor: colors.border, marginTop: 12, paddingTop: 12 }]}>
        <Text style={styles.sectionTitle}>MOCHILA / INVENTÁRIO</Text>
        {unequippedItems.length === 0 ? (
          <Text style={styles.emptyText}>Mochila vazia.</Text>
        ) : (
          unequippedItems.map(renderItemCard)
        )}
      </View>

      {/* Create Item Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Adicionar Novo Item</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Selector: Custom vs Magic */}
            <View style={styles.modeSelector}>
              <TouchableOpacity 
                style={[styles.modeBtn, creationMode === 'custom' && styles.modeBtnActive]} 
                onPress={() => setCreationMode('custom')}
              >
                <Ionicons name="create-outline" size={14} color={creationMode === 'custom' ? colors.accentSky : colors.textMuted} style={{ marginRight: 6 }} />
                <Text style={[styles.modeLabel, creationMode === 'custom' && styles.modeLabelActive]}>Customizado</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modeBtn, creationMode === 'magic' && styles.modeBtnActive]} 
                onPress={() => setCreationMode('magic')}
              >
                <Ionicons name="sparkles" size={14} color={creationMode === 'magic' ? colors.accentSky : colors.textMuted} style={{ marginRight: 6 }} />
                <Text style={[styles.modeLabel, creationMode === 'magic' && styles.modeLabelActive]}>Item Mágico (Livro)</Text>
              </TouchableOpacity>
            </View>

            {creationMode === 'custom' ? (
              <ScrollView style={{ maxHeight: '80%' }} contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Item Name */}
                <Text style={styles.inputLabel}>Nome do Item</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="ex: Espada Longa flamejante"
                  placeholderTextColor="#475569"
                  value={name}
                  onChangeText={setName}
                />

                {/* Item Type Selector */}
                <Text style={styles.inputLabel}>Tipo de Equipamento</Text>
                <View style={styles.selectorRow}>
                  {(['weapon', 'armor', 'shield', 'ring', 'ammunition', 'other'] as ItemType[]).map(t => (
                    <TouchableOpacity
                      key={t}
                      style={[styles.selectorBtn, type === t && styles.selectorBtnActive]}
                      onPress={() => setType(t)}
                    >
                      <Text style={[styles.selectorLabel, type === t && styles.selectorLabelActive]}>
                        {t === 'weapon' ? 'Arma' : t === 'armor' ? 'Armad.' : t === 'shield' ? 'Escudo' : t === 'ammunition' ? 'Munição' : t === 'ring' ? 'Anel' : 'Outro'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Type Specific Fields */}
                {type === 'weapon' ? (
                  <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flex: 1, marginRight: 4 }}>
                        <Text style={styles.inputLabel}>Dano (ex: 1d8)</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="1d8"
                          placeholderTextColor="#475569"
                          value={dmgDice}
                          onChangeText={setDmgDice}
                        />
                      </View>
                      <View style={{ flex: 1, marginLeft: 4 }}>
                        <Text style={styles.inputLabel}>Tipo (ex: Cortante)</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Cortante"
                          placeholderTextColor="#475569"
                          value={dmgType}
                          onChangeText={setDmgType}
                        />
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flex: 1, marginRight: 4 }}>
                        <Text style={styles.inputLabel}>Empunhadura</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="ex: 1 Mão"
                          placeholderTextColor="#475569"
                          value={handedness}
                          onChangeText={setHandedness}
                        />
                      </View>
                      <View style={{ flex: 1, marginLeft: 4 }}>
                        <Text style={styles.inputLabel}>Propriedades</Text>
                        <TextInput
                          style={styles.textInput}
                          placeholder="Acuidade, Leve..."
                          placeholderTextColor="#475569"
                          value={propertiesText}
                          onChangeText={setPropertiesText}
                        />
                      </View>
                    </View>
                    
                    <Text style={[styles.inputLabel, { marginTop: 16 }]}>Ou selecione uma Arma Padrão:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
                      {WEAPON_TEMPLATES.map(wt => (
                        <TouchableOpacity
                          key={wt.name}
                          style={styles.templateBtn}
                          onPress={() => {
                            setName(wt.name);
                            setDmgDice(wt.dmgDice);
                            setDmgType(wt.dmgType);
                            setHandedness(wt.handedness);
                            setPropertiesText(wt.properties.join(', '));
                          }}
                        >
                          <Text style={styles.templateBtnText}>{wt.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ) : type === 'ammunition' ? (
                  <View>
                    <Text style={styles.inputLabel}>Quantidade</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="ex: 20"
                      keyboardType="numeric"
                      placeholderTextColor="#475569"
                      value={dmgDice}
                      onChangeText={setDmgDice}
                    />

                    <Text style={[styles.inputLabel, { marginTop: 16 }]}>Ou selecione um Tipo Padrão:</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 }}>
                      {AMMUNITION_TEMPLATES.map(at => (
                        <TouchableOpacity
                          key={at.name}
                          style={styles.templateBtn}
                          onPress={() => {
                            setName(at.name);
                            setDmgDice(String(at.customResourceMax));
                          }}
                        >
                          <Text style={styles.templateBtnText}>{at.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.inputLabel}>Bônus de Classe de Armadura (AC)</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="ex: 2"
                      placeholderTextColor="#475569"
                      keyboardType="numeric"
                      value={acBonus}
                      onChangeText={setAcBonus}
                    />
                  </View>
                )}

                {/* Description / Lore / Effects */}
                <Text style={styles.inputLabel}>Peso (lb)</Text>
                <TextInput style={styles.textInput} placeholder="Ex: 5 ou 0.5" placeholderTextColor="#475569" value={weight} onChangeText={setWeight} keyboardType="numeric" />

                <Text style={styles.inputLabel}>Descrição do Item (Efeitos especiais)</Text>
                <TextInput
                  style={[styles.textInput, { height: 60, textAlignVertical: 'top', paddingTop: 8 }]}
                  placeholder="ex: Sem Hesitar. Uma vez por descanso longo, repete jogada de ataque perdida..."
                  placeholderTextColor="#475569"
                  multiline
                  value={description}
                  onChangeText={setDescription}
                />

                {/* Custom Resource injection (Habilidade com cargas) */}
                <Text style={styles.inputLabel}>Habilidade Especial (Injeta Cargas no Dashboard)</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TextInput
                    style={[styles.textInput, { width: '65%' }]}
                    placeholder="Nome (ex: Sem Hesitar)"
                    placeholderTextColor="#475569"
                    value={customResourceName}
                    onChangeText={setCustomResourceName}
                  />
                  <TextInput
                    style={[styles.textInput, { width: '30%' }]}
                    placeholder="Qtd Cargas"
                    placeholderTextColor="#475569"
                    keyboardType="numeric"
                    value={customResourceMax}
                    onChangeText={setCustomResourceMax}
                  />
                </View>

                {/* Linked Spell (Libera Magia no Grimório) */}
                <Text style={styles.inputLabel}>Magia Concedida (ex: Bless, Cure Wounds)</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Nome exato da Magia (ex: Bless)"
                  placeholderTextColor="#475569"
                  value={linkedSpellName}
                  onChangeText={setLinkedSpellName}
                />
              </ScrollView>
            ) : (
              <View style={{ flex: 1, minHeight: 320, maxHeight: 400 }}>
                <TextInput
                  style={styles.searchBar}
                  placeholder="Filtrar por nome, raridade ou descrição..."
                  placeholderTextColor="#475569"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                
                <ScrollView style={styles.magicList} nestedScrollEnabled={true}>
                  {filteredMagicItems.map(item => {
                    const isSelected = selectedMagicItem?.name === item.name;
                    return (
                      <TouchableOpacity
                        key={item.name}
                        style={[styles.magicItemRow, isSelected && styles.magicItemRowActive]}
                        onPress={() => setSelectedMagicItem(item)}
                      >
                        <View style={styles.magicItemHeader}>
                          <Text style={styles.magicItemName}>{item.name}</Text>
                          <Text style={[styles.magicItemRarity, { color: getRarityColor(item.rarity) }]}>{item.rarity}</Text>
                        </View>
                        <Text style={styles.magicItemType}>
                          Tipo: {item.type.toUpperCase()}
                          {item.acBonus ? ` | AC: +${item.acBonus}` : ''}
                          {item.dmgDice ? ` | Dano: ${item.dmgDice}` : ''}
                        </Text>
                        <Text style={styles.magicItemDesc} numberOfLines={2}>{item.description}</Text>
                      </TouchableOpacity>
                    );
                  })}
                  {filteredMagicItems.length === 0 && (
                    <Text style={styles.emptySearchText}>Nenhum item mágico encontrado.</Text>
                  )}
                </ScrollView>

                {selectedMagicItem && (
                  <View style={styles.selectedDetail}>
                    <Text style={styles.selectedTitle}>Selecionado: {selectedMagicItem.name}</Text>
                    <Text style={styles.selectedDesc}>{selectedMagicItem.description}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Modal Actions */}
            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Adicionar Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const useStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: colors.accentAmber,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignItems: 'center',
  },
  addBtnText: {
    color: colors.textMain,
    fontSize: 11,
    fontWeight: '800',
  },
  subText: {
    color: colors.textMuted,
    fontSize: 11,
    marginBottom: 16,
  },
  section: {
    marginVertical: 4,
  },
  sectionTitle: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
    paddingVertical: 12,
    textAlign: 'center',
  },
  itemCard: {
    flexDirection: 'column',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  itemCardEquipped: {
    borderColor: colors.border,
    backgroundColor: colors.accentAmberBg,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  itemName: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    marginRight: 6,
  },
  itemNameEquipped: {
    color: colors.textMain,
  },
  magicBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
  },
  magicBadgeText: {
    fontSize: 8,
    fontWeight: '900',
  },
  itemType: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemStat: {
    color: colors.accentAmber,
    fontSize: 12,
    fontWeight: '800',
  },
  deleteBtn: {
    marginLeft: 14,
    padding: 4,
  },
  descContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  descText: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 16,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    maxHeight: '85%',
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
    color: colors.textMain,
    fontSize: 16,
    fontWeight: '800',
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  modeBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 6,
  },
  modeBtnActive: {
    backgroundColor: colors.accentAmber,
  },
  modeLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  modeLabelActive: {
    color: colors.textMain,
    fontWeight: '800',
  },
  inputLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    color: colors.textMain,
    height: 40,
    paddingHorizontal: 12,
    fontSize: 14,
    marginBottom: 8,
  },
  selectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 0,
  },
  selectorBtn: {
    width: '31%',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 6,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '1%',
    marginBottom: 8,
  },
  selectorBtnActive: {
    backgroundColor: colors.accentAmber,
    borderColor: colors.accentAmber,
  },
  selectorLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
  },
  selectorLabelActive: {
    color: colors.textMain,
    fontWeight: '800',
  },
  templateBtn: {
    backgroundColor: colors.surfaceHighlight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  templateBtnText: {
    color: colors.textMain,
    fontSize: 12,
    fontWeight: '600',
  },
  searchBar: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    color: colors.textMain,
    height: 36,
    paddingHorizontal: 12,
    fontSize: 13,
    marginBottom: 10,
  },
  magicList: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 6,
  },
  magicItemRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    borderRadius: 6,
    marginBottom: 4,
  },
  magicItemRowActive: {
    backgroundColor: colors.accentAmberBg,
    borderColor: colors.accentAmber,
    borderWidth: 1,
  },
  magicItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  magicItemName: {
    color: colors.textMain,
    fontSize: 13,
    fontWeight: '700',
  },
  magicItemRarity: {
    fontSize: 9,
    fontWeight: '800',
  },
  magicItemType: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  magicItemDesc: {
    color: colors.textMuted,
    fontSize: 11,
    lineHeight: 15,
  },
  emptySearchText: {
    color: colors.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 30,
  },
  selectedDetail: {
    backgroundColor: colors.background,
    borderRadius: 8,
    borderColor: colors.accentAmberBg,
    borderWidth: 1,
    padding: 8,
    marginTop: 10,
  },
  selectedTitle: {
    color: colors.accentAmber,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  selectedDesc: {
    color: '#E2E8F0',
    fontSize: 11,
    lineHeight: 15,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
  },
  cancelBtnText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
  },
  saveBtn: {
    backgroundColor: colors.accentAmber,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  saveBtnText: {
    color: colors.textMain,
    fontSize: 14,
    fontWeight: '800',
  },
  profSmallBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    marginLeft: 6,
    alignSelf: 'center',
  },
  profSmallBadgeActive: {
    backgroundColor: colors.accentEmeraldBg,
    borderColor: colors.accentEmeraldBg,
  },
  profSmallBadgeInactive: {
    backgroundColor: colors.accentRedBg,
    borderColor: colors.accentRedBg,
  },
  profSmallBadgeText: {
    fontSize: 7.5,
    fontWeight: '800',
  },
  profSmallBadgeTextActive: {
    color: colors.accentEmerald,
  },
  profSmallBadgeTextInactive: {
    color: colors.accentRed,
  },
});
