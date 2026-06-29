import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
import { Alert } from '../utils/alert';
import { EquipmentItem } from '../types/character';
import { Ionicons } from '@expo/vector-icons';
import { MAGIC_ITEMS_LIST, MagicItemTemplate, isProficientInItem, WEAPON_TEMPLATES, AMMUNITION_TEMPLATES } from '../utils/dndRules';
import { useTheme, ThemeColors } from '../context/ThemeContext';

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
        return '#EF4444';
      case 'armor':
        return '#3B82F6';
      case 'shield':
        return '#10B981';
      case 'ring':
        return '#F59E0B';
      default:
        return '#A78BFA';
    }
  };

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'Comum': return '#64748B';
      case 'Incomum': return '#10B981';
      case 'Raro': return '#3B82F6';
      case 'Muito Raro': return '#8B5CF6';
      case 'Lendário': return '#EF4444';
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
              <Ionicons name={getIcon(item.type) as any} size={20} color={getIconColor(item.type, item.equipped)} />
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
              </View>
              <Text style={styles.itemType}>
                {item.type.toUpperCase()}
                {item.handedness ? ` | ${item.handedness}` : ''}
                {item.dmgType ? ` (${item.dmgType})` : ''}
                {item.properties && item.properties.length > 0 ? ` | ${item.properties.join(', ')}` : ''}
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
                color={item.equipped ? "#F59E0B" : "#475569"}
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
              <Text style={{ fontSize: 9, fontWeight: '800', marginTop: 4, color: '#F59E0B' }}>
                ✦ INJETA RECURSO: {item.customResourceName.toUpperCase()} ({item.customResourceMax} Cargas)
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
          <Ionicons name="add" size={14} color="#0F172A" style={{ marginRight: 4 }} />
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
      <View style={[styles.section, { borderTopWidth: 1, borderTopColor: '#334155', marginTop: 12, paddingTop: 12 }]}>
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
                <Ionicons name="close" size={22} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            {/* Selector: Custom vs Magic */}
            <View style={styles.modeSelector}>
              <TouchableOpacity 
                style={[styles.modeBtn, creationMode === 'custom' && styles.modeBtnActive]} 
                onPress={() => setCreationMode('custom')}
              >
                <Ionicons name="create-outline" size={14} color={creationMode === 'custom' ? '#0F172A' : '#94A3B8'} style={{ marginRight: 6 }} />
                <Text style={[styles.modeLabel, creationMode === 'custom' && styles.modeLabelActive]}>Customizado</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modeBtn, creationMode === 'magic' && styles.modeBtnActive]} 
                onPress={() => setCreationMode('magic')}
              >
                <Ionicons name="sparkles" size={14} color={creationMode === 'magic' ? '#0F172A' : '#94A3B8'} style={{ marginRight: 6 }} />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
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
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  addBtn: {
    flexDirection: 'row',
    backgroundColor: '#F59E0B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    alignItems: 'center',
  },
  addBtnText: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '800',
  },
  subText: {
    color: '#64748B',
    fontSize: 11,
    marginBottom: 16,
  },
  section: {
    marginVertical: 4,
  },
  sectionTitle: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
  },
  emptyText: {
    color: '#475569',
    fontSize: 12,
    fontStyle: 'italic',
    paddingVertical: 12,
    textAlign: 'center',
  },
  itemCard: {
    flexDirection: 'column',
    backgroundColor: '#0F172A',
    borderColor: '#1E293B',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  itemCardEquipped: {
    borderColor: '#334155',
    backgroundColor: 'rgba(245, 158, 11, 0.03)',
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
    color: '#64748B',
    fontSize: 14,
    fontWeight: '700',
    marginRight: 6,
  },
  itemNameEquipped: {
    color: '#F8FAFC',
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
    color: '#475569',
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemStat: {
    color: '#F59E0B',
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
    borderTopColor: '#1E293B',
  },
  descText: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 16,
    fontStyle: 'italic',
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
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 8,
    padding: 3,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
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
    backgroundColor: '#F59E0B',
  },
  modeLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  modeLabelActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  inputLabel: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    color: '#F8FAFC',
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
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 6,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '1%',
    marginBottom: 8,
  },
  selectorBtnActive: {
    backgroundColor: '#F59E0B',
    borderColor: '#F59E0B',
  },
  selectorLabel: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '700',
  },
  selectorLabelActive: {
    color: '#0F172A',
    fontWeight: '800',
  },
  templateBtn: {
    backgroundColor: 'rgba(51, 65, 85, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#475569',
  },
  templateBtnText: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
  },
  searchBar: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    color: '#F8FAFC',
    height: 36,
    paddingHorizontal: 12,
    fontSize: 13,
    marginBottom: 10,
  },
  magicList: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderColor: '#334155',
    borderWidth: 1,
    padding: 6,
  },
  magicItemRow: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    borderRadius: 6,
    marginBottom: 4,
  },
  magicItemRowActive: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: '#F59E0B',
    borderWidth: 1,
  },
  magicItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  magicItemName: {
    color: '#F8FAFC',
    fontSize: 13,
    fontWeight: '700',
  },
  magicItemRarity: {
    fontSize: 9,
    fontWeight: '800',
  },
  magicItemType: {
    color: '#64748B',
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
  },
  magicItemDesc: {
    color: '#94A3B8',
    fontSize: 11,
    lineHeight: 15,
  },
  emptySearchText: {
    color: '#475569',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 30,
  },
  selectedDetail: {
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    borderWidth: 1,
    padding: 8,
    marginTop: 10,
  },
  selectedTitle: {
    color: '#F59E0B',
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
  profSmallBadge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    marginLeft: 6,
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
