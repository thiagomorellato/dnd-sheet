import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { BaseStats } from '../types/character';
import { Ionicons } from '@expo/vector-icons';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface AttributesGridProps {
  stats: BaseStats;
  proficiencies: string[];
  level: number;
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

export const AttributesGrid: React.FC<AttributesGridProps> = ({ stats, proficiencies = [], level }) => {
  const [expanded, setExpanded] = useState(false);
  const proficiencyBonus = Math.floor((level - 1) / 4) + 2;

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const getModifierVal = (score: number) => {
    return Math.floor((score - 10) / 2);
  };

  const getModifierStr = (score: number) => {
    const mod = getModifierVal(score);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={toggleExpand} activeOpacity={0.7}>
        <View style={styles.titleWrapper}>
          <Ionicons name="git-branch" size={14} color="#F59E0B" style={{ marginRight: 6 }} />
          <Text style={styles.title}>ATRIBUTOS & PERÍCIAS (TOQUE PARA EXPANDIR)</Text>
        </View>
        <View style={styles.rightHeader}>
          <Text style={styles.profText}>Prof. +{proficiencyBonus}</Text>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color="#94A3B8" />
        </View>
      </TouchableOpacity>

      {/* Flex container displaying all 6 columns side-by-side */}
      <View style={styles.gridContainer}>
        {(Object.keys(stats) as Array<keyof BaseStats>).map(stat => {
          const skills = SKILL_MAPPING[stat];
          const modVal = getModifierVal(stats[stat]);

          return (
            <View 
              key={stat} 
              style={[
                styles.statCol, 
                expanded && styles.statColExpanded,
                expanded && skills.length === 0 && styles.statColExpandedNoSkills
              ]}
            >
              {/* Stat Card Header */}
              <View style={styles.statHeader}>
                <Text style={styles.label}>{stat.toUpperCase()}</Text>
                <Text style={styles.modText}>{getModifierStr(stats[stat])}</Text>
                <Text style={styles.scoreText}>{stats[stat]}</Text>
              </View>

              {/* Skills section */}
              {expanded && (
                <View style={styles.skillsSection}>
                  {skills.length > 0 ? (
                    <View style={styles.skillsList}>
                      {skills.map(skill => {
                        const fullName = SKILL_FULL_NAMES[skill] || skill;
                        const isProficient = proficiencies.includes(skill) || proficiencies.includes(fullName);
                        const finalBonus = modVal + (isProficient ? proficiencyBonus : 0);
                        const finalBonusStr = finalBonus >= 0 ? `+${finalBonus}` : `${finalBonus}`;

                        return (
                          <View key={skill} style={styles.skillItem}>
                            <View style={styles.skillRow}>
                              <Ionicons
                                name="ellipse"
                                size={4}
                                color={isProficient ? '#F59E0B' : '#475569'}
                                style={styles.skillDot}
                              />
                              <Text 
                                style={[
                                  styles.skillBonus,
                                  isProficient && styles.skillBonusProficient
                                ]}
                              >
                                {finalBonusStr}
                              </Text>
                            </View>
                            <Text
                              style={[
                                styles.skillName,
                                isProficient && styles.skillNameProficient,
                              ]}
                              numberOfLines={1}
                            >
                              {skill}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  ) : (
                    <Text style={styles.noSkills}>—</Text>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#1E293B',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profText: {
    color: '#F59E0B',
    fontSize: 9,
    fontWeight: '800',
    marginRight: 6,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#F59E0B',
  },
  gridContainer: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCol: {
    flex: 1,
    backgroundColor: '#0F172A',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingVertical: 8,
    paddingHorizontal: 2,
    alignItems: 'center',
    marginHorizontal: 2,
    minHeight: 70,
  },
  statColExpanded: {
    minHeight: 165,
    borderColor: '#334155',
  },
  statColExpandedNoSkills: {
    minHeight: 70,
  },
  statHeader: {
    alignItems: 'center',
    width: '100%',
  },
  label: {
    color: '#64748B',
    fontSize: 8,
    fontWeight: '800',
  },
  modText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '900',
    marginVertical: 1,
  },
  scoreText: {
    color: '#475569',
    fontSize: 9,
    fontWeight: '700',
    marginTop: -2,
  },
  skillsSection: {
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    marginTop: 8,
    paddingTop: 8,
    width: '100%',
    alignItems: 'center',
  },
  skillsList: {
    flexDirection: 'column',
    width: '100%',
  },
  skillItem: {
    marginBottom: 5,
    width: '100%',
    alignItems: 'center',
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1,
  },
  skillDot: {
    marginRight: 2,
  },
  skillBonus: {
    color: '#475569',
    fontSize: 7.5,
    fontWeight: '800',
  },
  skillBonusProficient: {
    color: '#F59E0B',
  },
  skillName: {
    color: '#475569',
    fontSize: 7.5,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 1,
  },
  skillNameProficient: {
    color: '#E2E8F0',
    fontWeight: '800',
  },
  noSkills: {
    color: '#334155',
    fontSize: 8,
    fontWeight: '700',
  },
});
