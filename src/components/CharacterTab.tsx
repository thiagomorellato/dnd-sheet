import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { BaseStats, Character } from '../types/character';
import { Ionicons } from '@expo/vector-icons';
import {
  SKILL_MAPPING,
  SKILL_FULL_NAMES,
  STANDARD_SKILLS_SET,
  getClassProficienciesSummary
} from './VitalsWidget';

interface CharacterTabProps {
  character: Character;
  onUpdateProficiencies: (updatedProficiencies: string[]) => Promise<void>;
}

export const CharacterTab: React.FC<CharacterTabProps> = ({
  character,
  onUpdateProficiencies,
}) => {
  const [newProfText, setNewProfText] = useState('');

  const classDefaults = getClassProficienciesSummary(character.characterClass);
  const customProficiencies = (character.proficiencies || []).filter(p => !STANDARD_SKILLS_SET.has(p));
  const allTools = [...classDefaults.tools, ...customProficiencies];

  const handleAddProficiency = () => {
    const trimmed = newProfText.trim();
    if (!trimmed) return;
    if ((character.proficiencies || []).includes(trimmed)) {
      Alert.alert('Aviso', 'Esta proficiência jáá existe!');
      return;
    }
    const nextProfs = [...(character.proficiencies || []), trimmed];
    onUpdateProficiencies(nextProfs);
    setNewProfText('');
  };

  const handleRemoveCustomProficiency = (prof: string) => {
    const nextProfs = (character.proficiencies || []).filter(p => p !== prof);
    onUpdateProficiencies(nextProfs);
  };

  const parts = character.characterClass.split(' (');
  const className = parts[0];
  const subclass = parts[1] ? parts[1].replace(')', '') : 'Nenhuma';
  
  return (
    <View style={styles.container}>
      {/* Background Info */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>INFORMAÇÕES GERAIS</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Raça:</Text>
          <Text style={styles.infoValue}>{character.race}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Classe:</Text>
          <Text style={styles.infoValue}>{className}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Arquétipo/Subclasse:</Text>
          <Text style={styles.infoValue}>{subclass}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Antecedente:</Text>
          <Text style={styles.infoValue}>{character.background || 'Nenhum'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Tendência:</Text>
          <Text style={styles.infoValue}>{character.alignment || 'Neutro'}</Text>
        </View>
      </View>

      {/* Proficiencies */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>TREINAMENTOS & PROFICIÊNCIAS</Text>
        
        <View style={styles.otherProfRow}>
          <View style={styles.otherProfRowLeft}>
            <Ionicons name="shield-half-outline" size={14} color="#60A5FA" style={{ marginRight: 6 }} />
            <Text style={styles.otherProfLabel}>Armaduras & Escudos:</Text>
          </View>
          <Text style={styles.otherProfValue}>{classDefaults.armors}</Text>
        </View>
        
        <View style={styles.otherProfRow}>
          <View style={styles.otherProfRowLeft}>
            <Ionicons name="cut-outline" size={14} color="#F59E0B" style={{ marginRight: 6 }} />
            <Text style={styles.otherProfLabel}>Armas:</Text>
          </View>
          <Text style={styles.otherProfValue}>{classDefaults.weapons}</Text>
        </View>

        <View style={styles.otherProfRow}>
          <View style={styles.otherProfRowLeft}>
            <Ionicons name="body-outline" size={14} color="#EF4444" style={{ marginRight: 6 }} />
            <Text style={styles.otherProfLabel}>Salvaguardas:</Text>
          </View>
          <Text style={styles.otherProfValue}>{classDefaults.savingThrows}</Text>
        </View>


        <View style={styles.otherProfRowCol}>
          <View style={styles.otherProfRowLeft}>
            <Ionicons name="hammer-outline" size={14} color="#10B981" style={{ marginRight: 6 }} />
            <Text style={styles.otherProfLabel}>Ferramentas, Instrumentos e Idiomas:</Text>
          </View>
          <View style={styles.toolsBadgesContainer}>
            {allTools.length === 0 ? (
              <Text style={styles.otherProfValueEmpty}>Nenhum listado</Text>
            ) : (
              allTools.map((prof, index) => {
                const isCustom = customProficiencies.includes(prof);
                return (
                  <View key={prof + '-' + index} style={[styles.toolBadge, isCustom && styles.toolBadgeCustom]}>
                    <Text style={[styles.toolBadgeText, isCustom && styles.toolBadgeTextCustom]}>{prof}</Text>
                    {isCustom && (
                      <TouchableOpacity 
                        onPress={() => handleRemoveCustomProficiency(prof)}
                        style={styles.toolBadgeDelete}
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                      >
                        <Ionicons name="close-circle" size={14} color="#EF4444" style={{ marginLeft: 4 }} />
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })
            )}
          </View>
        </View>
        
        <View style={styles.addProfInputRow}>
          <TextInput
            style={styles.addProfInput}
            placeholder="Adicionar novo idioma, ferramenta, etc..."
            placeholderTextColor="#64748B"
            value={newProfText}
            onChangeText={setNewProfText}
            onSubmitEditing={handleAddProficiency}
          />
          <TouchableOpacity style={styles.addProfBtn} onPress={handleAddProficiency} activeOpacity={0.7}>
            <Ionicons name="add" size={16} color="#0F172A" />
            <Text style={{ color: '#0F172A', fontSize: 11, fontWeight: '800', marginLeft: 4 }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.3)',
    padding: 12,
    marginBottom: 12,
  },
  cardTitle: {
    color: '#94A3B8',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.3)',
    paddingBottom: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.15)',
  },
  infoLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },
  infoValue: {
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
  },
  otherProfRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.2)',
  },
  otherProfRowCol: {
    flexDirection: 'column',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(51, 65, 85, 0.2)',
  },
  otherProfRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  otherProfLabel: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
  },
  otherProfValue: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
    marginLeft: 10,
  },
  otherProfValueEmpty: {
    color: '#64748B',
    fontSize: 11,
    fontStyle: 'italic',
  },
  toolsBadgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  toolBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderColor: 'rgba(51, 65, 85, 0.5)',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  toolBadgeCustom: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  toolBadgeText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: '600',
  },
  toolBadgeTextCustom: {
    color: '#93C5FD',
  },
  toolBadgeDelete: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addProfInputRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  addProfInput: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderColor: 'rgba(51, 65, 85, 0.5)',
    borderWidth: 1,
    borderRadius: 6,
    color: '#F8FAFC',
    paddingHorizontal: 10,
    fontSize: 12,
    height: 36,
  },
  addProfBtn: {
    backgroundColor: '#F59E0B',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
