import { useTheme, ThemeColors } from '../context/ThemeContext';
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
  str: ['Atletismo'],
  dex: ['Acrobacia', 'Furtividade', 'Prestidigitação'],
  con: [],
  int: ['Arcanismo', 'História', 'Investigação', 'Natureza', 'Religião'],
  wis: ['Adestrar Animais', 'Intuição', 'Medicina', 'Percepção', 'Sobrevivência'],
  cha: ['Atuação', 'Enganação', 'Intimidação', 'Persuasão']
};
const SKILL_FULL_NAMES: Record<string, string> = {};
export const AttributesGrid: React.FC<AttributesGridProps> = ({
  stats,
  proficiencies = [],
  level
}) => {
  const {
    colors
  } = useTheme();
  const styles = React.useMemo(() => createStyles(colors), [colors]);
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
  return <View style={styles.card}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={toggleExpand} activeOpacity={0.7}>
        <View style={styles.titleWrapper}>
          <Ionicons name="git-branch" size={14} color={colors.accentAmber} style={{
          marginRight: 6
        }} />
          <Text style={styles.title}>ATRIBUTOS & PERÍCIAS (TOQUE PARA EXPANDIR)</Text>
        </View>
        <View style={styles.rightHeader}>
          <Text style={styles.profText}>Prof. +{proficiencyBonus}</Text>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={14} color={colors.textMuted} />
        </View>
      </TouchableOpacity>

      {/* Flex container displaying all 6 columns side-by-side */}
      <View style={styles.gridContainer}>
        {(Object.keys(stats) as Array<keyof BaseStats>).map(stat => {
        const skills = SKILL_MAPPING[stat];
        const modVal = getModifierVal(stats[stat]);
        return <View key={stat} style={[styles.statCol, expanded && styles.statColExpanded, expanded && skills.length === 0 && styles.statColExpandedNoSkills]}>
              <View style={styles.statHeader}>
                <Text style={styles.label}>{
                  stat === 'str' ? 'FOR' :
                  stat === 'dex' ? 'DES' :
                  stat === 'con' ? 'CON' :
                  stat === 'int' ? 'INT' :
                  stat === 'wis' ? 'SAB' :
                  stat === 'cha' ? 'CAR' : (stat as string).toUpperCase()
                }</Text>
                <Text style={styles.modText}>{getModifierStr(stats[stat])}</Text>
                <Text style={styles.scoreText}>{stats[stat]}</Text>
              </View>

              {/* Skills section */}
              {expanded && <View style={styles.skillsSection}>
                  {skills.length > 0 ? <View style={styles.skillsList}>
                      {skills.map(skill => {
                const fullName = SKILL_FULL_NAMES[skill] || skill;
                const isProficient = proficiencies.includes(skill) || proficiencies.includes(fullName);
                const finalBonus = modVal + (isProficient ? proficiencyBonus : 0);
                const finalBonusStr = finalBonus >= 0 ? `+${finalBonus}` : `${finalBonus}`;
                return <View key={skill} style={styles.skillItem}>
                            <View style={styles.skillRow}>
                              <Ionicons name="ellipse" size={4} color={isProficient ? colors.accentAmber : colors.borderHighlight} style={styles.skillDot} />
                            </View>
                            <Text style={[styles.skillName, isProficient && styles.skillNameProficient]} numberOfLines={1}>
                              {skill}
                            </Text>
                          </View>;
              })}
                    </View> : <Text style={styles.noSkills}>—</Text>}
                </View>}
            </View>;
      })}
      </View>
    </View>;
};
const createStyles = (colors: ThemeColors) => StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profText: {
    color: colors.accentAmber,
    fontSize: 9,
    fontWeight: '800',
    marginRight: 6,
    backgroundColor: colors.accentAmberBg,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: colors.accentAmber
  },
  gridContainer: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  statCol: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 2,
    alignItems: 'center',
    marginHorizontal: 2,
    minHeight: 70
  },
  statColExpanded: {
    minHeight: 165,
    borderColor: colors.border
  },
  statColExpandedNoSkills: {
    minHeight: 70
  },
  statHeader: {
    alignItems: 'center',
    width: '100%'
  },
  label: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: '800'
  },
  modText: {
    color: colors.textMain,
    fontSize: 16,
    fontWeight: '900',
    marginVertical: 1
  },
  scoreText: {
    color: colors.borderHighlight,
    fontSize: 9,
    fontWeight: '700',
    marginTop: -2
  },
  skillsSection: {
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    marginTop: 8,
    paddingTop: 8,
    width: '100%',
    alignItems: 'center'
  },
  skillsList: {
    flexDirection: 'column',
    width: '100%'
  },
  skillItem: {
    marginBottom: 5,
    width: '100%',
    alignItems: 'center'
  },
  skillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 1
  },
  skillDot: {
    marginRight: 2
  },
  skillBonus: {
    color: colors.borderHighlight,
    fontSize: 7.5,
    fontWeight: '800'
  },
  skillBonusProficient: {
    color: colors.accentAmber
  },
  skillName: {
    color: colors.borderHighlight,
    fontSize: 7.5,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 1
  },
  skillNameProficient: {
    color: colors.textSecondary,
    fontWeight: '800'
  },
  noSkills: {
    color: colors.border,
    fontSize: 8,
    fontWeight: '700'
  }
});