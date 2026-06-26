import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import { Character } from '../types/character';
import { StorageService } from '../services/storage';
import { LoggerService } from '../services/logger';
import { Ionicons } from '@expo/vector-icons';

interface HomeScreenProps {
  onSelectCharacter: (id: string) => void;
  onCreateCharacter: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectCharacter, onCreateCharacter }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [jsonInput, setJsonInput] = useState('');

  // Sample Paladin template to populate portfolio immediately
  const demoPaladin: Character = {
    id: 'lancelot-demo-id',
    name: 'Sir Lancelot',
    characterClass: 'Paladin (Oath of Devotion)',
    level: 5,
    baseStats: { str: 16, dex: 10, con: 14, int: 8, wis: 12, cha: 16 },
    hp: { current: 44, max: 44, temp: 0 },
    combat: { baseArmorClass: 18, shieldOfFaithActive: false },
    resources: {
      spellSlots: {
        L1: { current: 4, max: 4 },
        L2: { current: 2, max: 2 },
      },
      customResources: [
        { id: 'lay_on_hands', name: 'Lay on Hands', current: 25, max: 25 },
        { id: 'channel_divinity', name: 'Channel Divinity', current: 1, max: 1 },
      ],
    },
    proficiencies: ['Athletics', 'Insight', 'Perception', 'Religion', 'Intimidation'],
    preparedSpells: ['Shield of Faith', 'Cure Wounds', 'Bless', 'Aid'],
    equipment: [
      { id: 'eq-sword-1', name: 'Longsword +1', type: 'weapon', equipped: true, dmgDice: '1d8+4' },
      { id: 'eq-plate-1', name: 'Plate Armor', type: 'armor', equipped: true, acBonus: 18 },
      { id: 'eq-shield-1', name: 'Shield', type: 'shield', equipped: true, acBonus: 2 },
      { id: 'eq-ring-1', name: 'Ring of Protection', type: 'ring', equipped: false, acBonus: 1, isMagic: true, rarity: 'Raro', description: 'Você recebe +1 de bônus na AC e nos testes de salvaguarda enquanto usar este anel.' },
    ],
    coins: { cp: 120, sp: 80, ep: 0, gp: 350, pp: 5 },
    hitDice: { current: 5, dieType: 'd10' },
  };

  const loadCharacters = async () => {
    const list = await StorageService.getAllCharacters();
    setCharacters(list);
  };

  useEffect(() => {
    loadCharacters();
  }, []);

  const handleCreateDemo = async () => {
    try {
      await StorageService.saveCharacter(demoPaladin);
      await loadCharacters();
      Alert.alert('Success', 'Sir Lancelot (Demo Paladin) has been imported to your portfolio!');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  const handleImportJSON = async () => {
    if (!jsonInput.trim()) {
      Alert.alert('Warning', 'Please paste a valid JSON schema string.');
      return;
    }

    try {
      const imported = await StorageService.importCharacterFromJSON(jsonInput);
      setImportModalVisible(false);
      setJsonInput('');
      await loadCharacters();
      Alert.alert('Import Success', `Character ${imported.name} loaded and schema validated!`);
    } catch (e: any) {
      Alert.alert('Import Failed', `JSON Validation Error:\n${e.message}`);
    }
  };

  const handleExportJSON = async (char: Character) => {
    try {
      await StorageService.exportCharacterJSON(char);
    } catch (e: any) {
      Alert.alert('Export Failed', e.message);
    }
  };

  const handleExportCSV = async (char: Character) => {
    try {
      await LoggerService.exportLogsToCSV(char.id, char.name);
      Alert.alert('Success', `Combat Log CSV exported successfully!`);
    } catch (e: any) {
      Alert.alert('Export Failed', e.message);
    }
  };

  const handleDelete = (id: string, name: string) => {
    Alert.alert(
      'Delete Character',
      `Are you sure you want to delete ${name}? This will delete all of their combat logs permanently.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await StorageService.deleteCharacter(id);
            await loadCharacters();
          },
        },
      ]
    );
  };

  const renderCharacterCard = ({ item }: { item: Character }) => (
    <View style={styles.charCard}>
      <TouchableOpacity 
        style={styles.charDetails} 
        onPress={() => onSelectCharacter(item.id)}
      >
        <View style={styles.charRow}>
          <Text style={styles.charName}>{item.name}</Text>
          <Text style={styles.charBadge}>Lvl {item.level}</Text>
        </View>
        <Text style={styles.charClass}>
          {item.characterClass}
          {item.background ? ` | ${item.background.split(' (')[0]}` : ''}
        </Text>
        <View style={styles.hpMiniBar}>
          <Ionicons name="heart" size={14} color="#EF4444" style={{ marginRight: 6 }} />
          <Text style={styles.hpText}>
            HP: {item.hp.current} / {item.hp.max}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Control Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleExportJSON(item)}>
          <Ionicons name="download" size={16} color="#60A5FA" />
          <Text style={styles.actionBtnLabel}>JSON</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleExportCSV(item)}>
          <Ionicons name="document-text" size={16} color="#34D399" />
          <Text style={styles.actionBtnLabel}>Logs CSV</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionBtn, styles.deleteBtn]} 
          onPress={() => handleDelete(item.id, item.name)}
        >
          <Ionicons name="trash" size={16} color="#F87171" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Ionicons name="logo-octocat" size={32} color="#F59E0B" />
        <Text style={styles.headerTitle}>D&D 5e Tactical Manager</Text>
        <Text style={styles.headerSubtitle}>Data Architecture Portfólio (NoSQL + Event Sourcing)</Text>
      </View>

      {characters.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="people" size={60} color="#334155" />
          <Text style={styles.emptyText}>No characters loaded yet.</Text>
          <Text style={styles.emptySubtext}>
            Paste a JSON sheet or start with the pre-made template below.
          </Text>
          
          <TouchableOpacity style={styles.primaryBtn} onPress={handleCreateDemo}>
            <Ionicons name="flash" size={18} color="#0F172A" style={{ marginRight: 8 }} />
            <Text style={styles.primaryBtnText}>Load Sir Lancelot (Demo Paladin)</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: '#10B981', marginTop: 12 }]} onPress={onCreateCharacter}>
            <Ionicons name="add-circle" size={18} color="#0F172A" style={{ marginRight: 8 }} />
            <Text style={styles.primaryBtnText}>Criar Novo Personagem</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={characters}
          keyExtractor={item => item.id}
          renderItem={renderCharacterCard}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Floating Action Menu */}
      <View style={styles.floatingMenu}>
        {characters.length > 0 && (
          <TouchableOpacity style={[styles.floatingBtn, styles.demoBtn]} onPress={handleCreateDemo}>
            <Ionicons name="gift" size={22} color="#F59E0B" />
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.floatingBtn, styles.importBtn, { backgroundColor: '#475569' }]} 
          onPress={() => setImportModalVisible(true)}
        >
          <Ionicons name="cloud-upload" size={24} color="#F8FAFC" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.floatingBtn, { backgroundColor: '#10B981' }]} 
          onPress={onCreateCharacter}
        >
          <Ionicons name="add" size={30} color="#F8FAFC" />
        </TouchableOpacity>
      </View>

      {/* Copy-Paste JSON Import Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={importModalVisible}
        onRequestClose={() => setImportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Paste Character JSON</Text>
              <TouchableOpacity onPress={() => setImportModalVisible(false)}>
                <Ionicons name="close" size={24} color="#94A3B8" />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalInstructions}>
              Paste a JSON sheet. Zod will validate typing and structural constraints immediately.
            </Text>
            
            <TextInput
              style={styles.modalInput}
              multiline
              placeholder='{ "id": "char-1", "name": "Hero", "level": 1, ... }'
              placeholderTextColor="#475569"
              value={jsonInput}
              onChangeText={setJsonInput}
            />

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelModalBtn} 
                onPress={() => {
                  setImportModalVisible(false);
                  setJsonInput('');
                }}
              >
                <Text style={styles.cancelModalText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmModalBtn} onPress={handleImportJSON}>
                <Ionicons name="checkmark-done" size={18} color="#F8FAFC" style={{ marginRight: 6 }} />
                <Text style={styles.confirmModalText}>Validate & Import</Text>
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
    flex: 1,
    backgroundColor: '#0F172A',
    paddingTop: 48,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#F8FAFC',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 8,
    fontFamily: 'System',
  },
  headerSubtitle: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: 40,
  },
  emptyText: {
    color: '#E2E8F0',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
  },
  emptySubtext: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 20,
  },
  primaryBtn: {
    flexDirection: 'row',
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  primaryBtnText: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '800',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  charCard: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
    overflow: 'hidden',
  },
  charDetails: {
    padding: 16,
  },
  charRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  charName: {
    color: '#F8FAFC',
    fontSize: 20,
    fontWeight: '800',
  },
  charBadge: {
    backgroundColor: '#334155',
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#475569',
  },
  charClass: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  hpMiniBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  hpText: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    backgroundColor: '#0F172A',
    alignItems: 'center',
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#334155',
  },
  actionBtnLabel: {
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
  },
  deleteBtn: {
    flex: 0.6,
    borderRightWidth: 0,
  },
  floatingMenu: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    flexDirection: 'column',
    alignItems: 'center',
  },
  floatingBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    marginTop: 12,
  },
  importBtn: {
    backgroundColor: '#2563EB',
  },
  demoBtn: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#475569',
    width: 46,
    height: 46,
    borderRadius: 23,
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
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '800',
  },
  modalInstructions: {
    color: '#94A3B8',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  modalInput: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
    borderWidth: 1,
    borderRadius: 8,
    color: '#F8FAFC',
    height: 220,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 20,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelModalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    justifyContent: 'center',
  },
  cancelModalText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '700',
  },
  confirmModalBtn: {
    flexDirection: 'row',
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmModalText: {
    color: '#F8FAFC',
    fontSize: 14,
    fontWeight: '700',
  },
});
