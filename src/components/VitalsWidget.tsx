import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager, Image, Modal, TextInput, Alert } from 'react-native';
import { CombatConfig, BaseStats, EquipmentItem } from '../types/character';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import { File, Paths } from 'expo-file-system';
import * as FileSystem from 'expo-file-system/legacy';
import { useTheme, ThemeColors } from '../context/ThemeContext';
import { isProficientInItem } from '../utils/dndRules';

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

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface VitalsWidgetProps {
  combat: CombatConfig;
  stats: BaseStats;
  proficiencies: string[];
  level: number;
  equipment?: EquipmentItem[];
  characterClass: string;
  onUpdateProficiencies?: (updatedProficiencies: string[]) => Promise<void>;
  onUpdateEquipment?: (updatedEq: EquipmentItem[]) => void;
  coins?: any;
  imageUrl?: string;
  onUpdateImageUrl?: (url: string) => void;
  preparedSpells?: string[];
  spellSlots?: Record<string, { current: number; max: number }>;
  onCastSpell?: (spellName: string) => void;
  conditions?: string[];
  onUpdateConditions?: (c: string[]) => void;
}

const CONDITIONS_LIST = [
  { id: 'blinded', name: 'Cego', icon: 'eye-off-outline', color: '#6B7280', description: 'Não pode ver. Desvantagem em ataques.' },
  { id: 'charmed', name: 'Enfeitiçado', icon: 'heart-outline', color: '#EC4899', description: 'Não pode atacar o encantador.' },
  { id: 'deafened', name: 'Ensurdecido', icon: 'ear-outline', color: '#94A3B8', description: 'Não pode ouvir.' },
  { id: 'exhausted', name: 'Exausto', icon: 'battery-dead-outline', color: '#F97316', description: 'Acumulativo: desvantagem → velocidade reduzida → morte.' },
  { id: 'frightened', name: 'Amedrontado', icon: 'alert-circle-outline', color: '#F59E0B', description: 'Desvantagem enquanto puder ver a fonte do medo.' },
  { id: 'grappled', name: 'Agarrado', icon: 'hand-right-outline', color: '#8B5CF6', description: 'Velocidade 0.' },
  { id: 'incapacitated', name: 'Incapacitado', icon: 'ban-outline', color: '#EF4444', description: 'Não pode fazer ações ou reações.' },
  { id: 'invisible', name: 'Invisível', icon: 'glasses-outline', color: '#60A5FA', description: 'Vantagem em ataques, inimigos têm desvantagem.' },
  { id: 'paralyzed', name: 'Paralisado', icon: 'lock-closed-outline', color: '#DC2626', description: 'Incapacitado. Ataques adjacentes são críticos.' },
  { id: 'petrified', name: 'Petrificado', icon: 'cube-outline', color: '#78716C', description: 'Transformado em pedra. Incapacitado.' },
  { id: 'poisoned', name: 'Envenenado', icon: 'flask-outline', color: '#10B981', description: 'Desvantagem em ataques e checks.' },
  { id: 'prone', name: 'Caído', icon: 'arrow-down-outline', color: '#6366F1', description: 'Desvantagem em ataques. Ataques adjacentes têm vantagem.' },
  { id: 'restrained', name: 'Contido', icon: 'lock-open-outline', color: '#D97706', description: 'Velocidade 0. Desvantagem em ataques.' },
  { id: 'stunned', name: 'Atordoado', icon: 'flash-outline', color: '#7C3AED', description: 'Incapacitado, não pode se mover.' },
  { id: 'unconscious', name: 'Inconsciente', icon: 'moon-outline', color: '#4B5563', description: 'Caído e incapacitado. Ataques adjacentes são críticos.' },
];

export const SKILL_MAPPING: Record<keyof BaseStats, string[]> = {
  str: ['Athletics'],
  dex: ['Acrobatics', 'Sleight', 'Stealth'],
  con: [],
  int: ['Arcana', 'History', 'Investig.', 'Nature', 'Religiãon'],
  wis: ['Animal H.', 'Insight', 'Medicine', 'Perception', 'Survival'],
  cha: ['Deception', 'Intimid.', 'Perform.', 'Persuasion'],
};

export const SKILL_FULL_NAMES: Record<string, string> = {
  'Sleight': 'Prestidigitação',
  'Investig.': 'Investigação',
  'Animal H.': 'Adestrar Animais',
  'Intimid.': 'Intimidação',
  'Perform.': 'Atuação',
  'Religiãon': 'Religião',
  'Acrobatics': 'Acrobacia',
  'Athletics': 'Atletismo',
  'Stealth': 'Furtividade',
  'Arcana': 'Arcanismo',
  'History': 'História',
  'Nature': 'Natureza',
  'Insight': 'Intuição',
  'Medicine': 'Medicina',
  'Perception': 'Percepção',
  'Survival': 'Sobrevivência',
  'Deception': 'Enganação',
  'Persuasion': 'Persuasão'
};

export const STANDARD_SKILLS_SET = new Set([
  'Athletics', 'Acrobatics', 'Sleight of Hand', 'Stealth',
  'Arcana', 'History', 'Investigation', 'Nature', 'Religiãon',
  'Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival',
  'Deception', 'Intimidation', 'Performance', 'Persuasion',
  'Atletismo', 'Acrobacia', 'Furtividade', 'Prestidigitação',
  'Arcanismo', 'História', 'Investigação', 'Natureza', 'Religião',
  'Adestrar Animais', 'Intuição', 'Medicina', 'Percepção', 'Sobrevivência',
  'Enganação', 'Intimidação', 'Atuação', 'Persuasão',
  'Acrobatics', 'Sleight', 'Arcana', 'History', 'Investig.', 'Nature', 'Religiãon',
  'Animal H.', 'Insight', 'Medicine', 'Perception', 'Survival',
  'Deception', 'Intimid.', 'Perform.', 'Persuasion'
]);

export const getClassProficienciesSummary = (characterClass: string) => {
  const normalized = characterClass.trim().toLowerCase();
  
  let armors = "Nenhuma";
  let weapons = "Nenhuma";
  let savingThrows = "Nenhuma";
  let tools = [] as string[];

  if (normalized.includes('paladin') || normalized.includes('paladino') ||
      normalized.includes('fighter') || normalized.includes('guerreiro')) {
    armors = "Leves, Médias, Pesadas, Escudos";
    weapons = "Armas Simples, Armas Marciais";
    savingThrows = (normalized.includes('paladin') || normalized.includes('paladino')) ? "Sabedoria, Carisma" : "Força, Constituição";
  } else if (normalized.includes('barbarian') || normalized.includes('bárbaro')) {
    armors = "Leves, Médias, Escudos";
    weapons = "Armas Simples, Armas Marciais";
    savingThrows = "Força, Constituição";
  } else if (normalized.includes('ranger') || normalized.includes('patrulheiro')) {
    armors = "Leves, Médias, Escudos";
    weapons = "Armas Simples, Armas Marciais";
    savingThrows = "Força, Destreza";
  } else if (normalized.includes('rogue') || normalized.includes('ladino')) {
    armors = "Leves";
    weapons = "Armas Simples, Besta de Mão, Rapieira, Espada Curta, Espada Longa";
    savingThrows = "Destreza, Inteligência";
    tools.push("Ferramentas de Ladrão");
  } else if (normalized.includes('bard') || normalized.includes('bardo')) {
    armors = "Leves";
    weapons = "Armas Simples, Besta de Mão, Rapieira, Espada Curta, Espada Longa";
    savingThrows = "Destreza, Carisma";
    tools.push("3 Instrumentos Musicais");
  } else if (normalized.includes('cleric') || normalized.includes('clérigo')) {
    const isWarOrLife = normalized.includes('guerra') || normalized.includes('vida') || normalized.includes('tempestade');
    armors = isWarOrLife ? "Leves, Médias, Pesadas, Escudos" : "Leves, Médias, Escudos";
    weapons = (normalized.includes('guerra') || normalized.includes('tempestade')) ? "Armas Simples, Armas Marciais" : "Armas Simples";
    savingThrows = "Sabedoria, Carisma";
    savingThrows = "Sabedoria, Carisma";
  } else if (normalized.includes('druid') || normalized.includes('druida')) {
    armors = "Leves, Médias (não-metálicas), Escudos";
    weapons = "Adaga, Dardo, Clava, Maça, Foice, Cimitarra, Lança, Funda, Bordão";
    savingThrows = "Inteligência, Sabedoria";
    tools.push("Kit de Herbalismo");
  } else if (normalized.includes('monk') || normalized.includes('monge')) {
    armors = "Nenhuma";
    weapons = "Armas Simples, Espada Curta";
    savingThrows = "Força, Destreza";
  } else if (normalized.includes('wizard') || normalized.includes('mago') ||
             normalized.includes('sorcerer') || normalized.includes('feiticeiro')) {
    armors = "Nenhuma";
    weapons = "Adaga, Dardo, Funda, Bordão, Besta Leve";
    savingThrows = (normalized.includes('sorcerer') || normalized.includes('feiticeiro')) ? "Constituição, Carisma" : "Inteligência, Sabedoria";
    savingThrows = (normalized.includes('sorcerer') || normalized.includes('feiticeiro')) ? "Constituição, Carisma" : "Inteligência, Sabedoria";
  } else if (normalized.includes('warlock') || normalized.includes('bruxo')) {
    armors = "Leves";
    weapons = "Armas Simples";
    savingThrows = "Sabedoria, Carisma";
  } else if (normalized.includes('artificer') || normalized.includes('artífice')) {
    armors = "Leves, Médias, Escudos";
    weapons = "Armas Simples";
    savingThrows = "Constituição, Inteligência";
    tools.push("Ferramentas de Ladrão", "Ferramentas de Inventor");
  }

  return { armors, weapons, savingThrows, tools };
};

const WeaponCard = ({
  item,
  atkBonusStr,
  currentDmg,
  rangeText,
  getSvgIcon,
  styles
}: any) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
      }}
      style={styles.weaponHudCardCompact}
    >
      <View style={styles.weaponHudHeader}>
        <View style={styles.weaponIconWrapper}>
          {getSvgIcon(item.name)}
        </View>
        <Text style={styles.weaponAtkCompact}>{atkBonusStr}</Text>
        <Text style={styles.weaponDmgCompact}>{currentDmg}</Text>
      </View>
      
      {expanded && (
        <View style={styles.weaponHudExpanded}>
          <Text style={styles.weaponNameCompact} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.weaponRangeCompact}>Alcance: {rangeText}</Text>
          {item.properties && item.properties.length > 0 && (
            <Text style={styles.weaponPropsCompact}>{item.properties.jáoin(', ')}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export const VitalsWidget: React.FC<VitalsWidgetProps> = ({
  combat,
  stats,
  proficiencies = [],
  level,
  equipment = [],
  characterClass,
  onUpdateProficiencies,
  onUpdateEquipment,
  coins,
  imageUrl,
  onUpdateImageUrl,
  preparedSpells = [],
  spellSlots = {},
  onCastSpell,
  conditions = [],
  onUpdateConditions,
}) => {
  const [skillsExpanded, setSkillsExpanded] = useState(false);
  const [newProfText, setNewProfText] = useState('');
  const [activeDetail, setActiveDetail] = useState<string | null>(null);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');
  const [spellbookVisible, setSpellbookVisible] = useState(false);
  const [conditionsVisible, setConditionsVisible] = useState(false);
  const { colors } = useTheme();
  const styles = useStyles(colors);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        
        if (Platform.OS === 'web' && asset.uri) {
          // Web flow (blob -> base64 fallback)
          try {
            const response = await fetch(asset.uri);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onloadend = () => {
              if (onUpdateImageUrl) onUpdateImageUrl(reader.result as string);
              setAvatarModalVisible(false);
            };
            reader.readAsDataURL(blob);
          } catch (fetchErr) {
            console.warn("Erro ao converter blob para base64", fetchErr);
            if (onUpdateImageUrl) onUpdateImageUrl(asset.uri);
            setAvatarModalVisible(false);
          }
        } else {
          // Native flow (File System API)
          const sourceUri = asset.uri;
          const filename = sourceUri.split('/').pop() || `avatar_${Date.now()}.jpg`;
          
          try {
            const sourceFile = new File(sourceUri);
            const destFile = new File(Paths.document, filename);
            await sourceFile.copy(destFile);
            
            if (onUpdateImageUrl) onUpdateImageUrl(destFile.uri);
          } catch (fsErr) {
            console.warn("Erro ao copiar arquivo:", fsErr);
            // Fallback to original URI if copy fails
            if (onUpdateImageUrl) onUpdateImageUrl(sourceUri);
          }
          setAvatarModalVisible(false);
        }
      }
    } catch (e) {
      console.warn("Erro ao selecionar imagem", e);
    }
  };




  const renderAmmunitionIcon = (name: string, color: string) => {
    const n = name.toLowerCase();
    if (n.includes('agulha') || n.includes('needle')) {
      return (
        <Svg width={14} height={14} viewBox="0 0 64 64">
          <Path fill={color} d=" M 10.22 8.29 C 11.74 7.61 13.03 9.00 14.03 9.94 C 17.67 13.65 21.42 17.24 25.01 20.99 C 26.17 21.92 25.62 23.43 26.10 24.64 C 35.86 34.34 45.59 44.06 55.28 53.83 C 56.85 54.64 54.73 56.85 53.86 55.32 C 44.13 45.59 34.37 35.89 24.67 26.13 C 20.92 26.29 18.97 22.74 16.46 20.53 C 13.88 17.83 11.03 15.38 8.64 12.51 C 7.40 11.03 8.61 8.85 10.22 8.29 M 10.28 10.32 L 10.41 11.63 C 14.63 15.73 18.64 20.04 22.97 24.03 C 23.21 23.80 23.71 23.34 23.96 23.11 C 20.25 18.57 15.65 14.70 11.62 10.39 L 10.28 10.32 Z" />
        </Svg>
      );
    }
    if (n.includes('virote') || n.includes('bolt')) {
      return (
        <Svg width={14} height={14} viewBox="0 0 512 512">
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
        <Svg width={14} height={14} viewBox="0 0 512 512">
          <Path fill={color} d=" M 234.91 173.85 C 247.87 168.52 262.79 168.31 275.94 173.07 C 293.09 179.15 306.90 193.68 312.12 211.10 C 288.51 214.43 267.12 229.85 256.45 251.17 C 245.76 229.89 224.43 214.37 200.80 211.10 C 205.79 194.39 218.68 180.27 234.91 173.85 Z" />
          <Path fill={color} d=" M 185.36 226.48 C 199.88 225.26 214.83 229.71 226.21 238.83 C 237.46 247.65 245.27 260.75 247.59 274.87 C 250.18 289.50 246.69 305.05 238.30 317.29 C 229.76 329.88 216.14 338.96 201.15 341.73 C 186.59 344.67 170.98 341.51 158.55 333.41 C 145.23 324.83 135.63 310.62 132.89 294.99 C 129.97 279.74 133.69 263.40 142.74 250.81 C 152.48 236.97 168.50 227.85 185.36 226.48 Z" />
          <Path fill={color} d=" M 318.36 226.44 C 332.39 225.38 346.79 229.60 357.94 238.20 C 369.60 247.02 377.75 260.37 380.13 274.80 C 383.03 290.98 378.44 308.26 368.09 321.00 C 359.43 331.83 346.80 339.45 333.12 341.84 C 318.12 344.71 302.07 341.12 289.58 332.38 C 276.78 323.57 267.75 309.47 265.28 294.11 C 262.67 279.21 266.36 263.38 275.11 251.06 C 284.94 236.98 301.23 227.69 318.36 226.44 Z" />
        </Svg>
      );
    }
    // Default Arrow
    return (
      <Svg width={14} height={14} viewBox="0 0 50 50">
        <Path fill={color} d=" M 38.10 5.24 C 41.06 4.36 44.01 3.35 47.10 3.01 C 46.55 6.03 45.66 8.97 44.76 11.89 C 42.95 11.90 41.15 12.06 39.34 12.06 C 32.85 18.60 26.36 25.13 19.78 31.59 C 19.55 31.17 19.09 30.32 18.86 29.90 C 25.04 23.32 31.61 17.09 37.95 10.66 C 37.94 8.85 38.10 7.05 38.10 5.24 Z" />
        <Path fill={color} d=" M 9.74 31.80 C 11.79 28.92 15.65 30.26 18.62 30.00 C 15.19 33.36 11.85 36.80 8.41 40.13 C 8.91 40.38 9.91 40.87 10.42 41.12 C 13.51 37.82 16.77 34.68 19.98 31.50 C 19.77 34.42 21.04 38.20 18.23 40.24 C 15.52 42.55 13.52 45.87 10.13 47.26 C 10.08 45.29 10.03 43.32 10.05 41.34 C 9.08 42.28 8.16 43.28 7.09 44.09 C 4.42 43.17 7.66 41.18 8.43 40.02 C 6.52 40.02 4.62 39.87 2.71 39.80 C 4.26 36.52 7.40 34.47 9.74 31.80 Z" />
      </Svg>
    );
  };



  let totalWeight = 0;
  equipment?.forEach(eq => {
    if (eq.weight) {
      if (eq.type === 'ammunition' && eq.customResourceMax !== undefined) {
        totalWeight += eq.weight * eq.customResourceMax;
      } else {
        totalWeight += eq.weight;
      }
    }
  });
  const coinsWeight = coins ? ((coins.cp || 0) + (coins.sp || 0) + (coins.ep || 0) + (coins.gp || 0) + (coins.pp || 0)) / 50 : 0;
  totalWeight += coinsWeight;
  const maxWeight = stats.str * 15;
  const isOverweight = totalWeight > maxWeight;

  const classDefaults = getClassProficienciesSummary(characterClass);
  const handleToggleVitals = () => {};
  const handleShowDetail = (detail: string) => setActiveDetail(detail);

  const handleAddProficiency = () => {
    const trimmed = newProfText.trim();
    if (!trimmed) return;
    if (proficiencies.includes(trimmed)) {
      Alert.alert('Aviso', 'Esta proficiência jáá existe!');
      return;
    }
    const nextProfs = [...proficiencies, trimmed];
    onUpdateProficiencies?.(nextProfs);
    setNewProfText('');
  };

  const handleRemoveCustomProficiency = (prof: string) => {
    const nextProfs = proficiencies.filter(p => p !== prof);
    onUpdateProficiencies?.(nextProfs);
  };

  const handleToggleSkills = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSkillsExpanded(prev => !prev);
  };

  const getSvgIcon = (name: string) => {
    const n = name.toLowerCase();
    const size = 16;
    const color = colors.textMain;

    if (n.includes('machado') || n.includes('axe')) return <AxeIcon width={size} height={size} fill={color} />;
    if (n.includes('arco') || n.includes('bow')) return <BowIcon width={size} height={size} fill={color} />;
    if (n.includes('besta') || n.includes('crossbow')) return <CrossbowIcon width={size} height={size} fill={color} />;
    if (n.includes('adaga') || n.includes('dagger')) return <DaggerIcon width={size} height={size} fill={color} />;
    if (n.includes('lança') || n.includes('spear') || n.includes('pike')) return <SpearIcon width={size} height={size} fill={color} />;
    if (n.includes('maça') || n.includes('mace') || n.includes('clava')) return <MaceIcon width={size} height={size} fill={color} />;
    if (n.includes('bastão') || n.includes('staff')) return <WizardStaffIcon width={size} height={size} fill={color} />;
    if (n.includes('martelo') || n.includes('hammer')) return <HammerIcon width={size} height={size} fill={color} />;
    
    return <SwordIcon width={size} height={size} fill={color} />;
  };

  const currentAC = combat.baseArmorClass + (combat.shieldOfFaithActive ? 2 : 0);
  const proficiencyBonus = Math.floor((level - 1) / 4) + 2;
  const dexMãod = Math.floor((stats.dex - 10) / 2);
  const initiativeStr = dexMãod >= 0 ? `+${dexMãod}` : `${dexMãod}`;
  const hasPerceptionProf = proficiencies.includes('Perception') || proficiencies.includes('Percepção');
  const wisMãod = Math.floor((stats.wis - 10) / 2);
  const passivePerception = 10 + wisMãod + (hasPerceptionProf ? proficiencyBonus : 0);

  const acDisplay = combat.shieldOfFaithActive 
    ? `${combat.baseArmorClass}+2` 
    : `${combat.baseArmorClass}`;

  return (
    <View style={styles.container}>
      {/* Horizontal Attributes Grid */}
      <View style={styles.horizontalAttributesRow}>
        {(Object.keys(stats) as Array<keyof BaseStats>).map(stat => {
          const modVal = Math.floor((stats[stat] - 10) / 2);
          const modStr = modVal >= 0 ? `+${modVal}` : `${modVal}`;

          return (
            <TouchableOpacity
              key={stat}
              style={[
                styles.attributeCardHorizontal,
                skillsExpanded && styles.attributeCardHorizontalActive
              ]}
              onPress={handleToggleSkills}
              activeOpacity={0.7}
            >
              <Text style={styles.attributeLabelHorizontal}>{stat === "str" ? "FOR" : stat === "dex" ? "DES" : stat === "con" ? "CON" : stat === "int" ? "INT" : stat === "wis" ? "SAB" : stat === "cha" ? "CAR" : (stat as string).toUpperCase()}</Text>
              <Text style={[styles.attributeMãodHorizontal, { color: colors.textMain }]}>{modStr}</Text>
              <Text style={styles.attributeScoreHorizontal}>{stats[stat]}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 6-Column Collapsible Skills Grid directly under stats */}
      {skillsExpanded && (
        <>
          <View style={styles.skillsColumnsRow}>
            {(Object.keys(stats) as Array<keyof BaseStats>).map(stat => {
              const skills = SKILL_MAPPING[stat];

              return (
                <View key={stat} style={styles.skillsColumn}>
                  
                  <View 
                    style={[
                      styles.columnSkillItem,
                      classDefaults.savingThrows.includes({str:'Força',dex:'Destreza',con:'Constituição',int:'Inteligência',wis:'Sabedoria',cha:'Carisma'}[stat] || '') && styles.columnSkillItemProficient,
                      { marginBottom: 4 }
                    ]}
                  >
                    <View style={{ marginRight: 4, justifyContent: 'center' }}>
                      <Ionicons name="ellipse" size={4} color={classDefaults.savingThrows.includes({str:'Força',dex:'Destreza',con:'Constituição',int:'Inteligência',wis:'Sabedoria',cha:'Carisma'}[stat] || '') ? colors.accentAmber : colors.textMuted} />
                    </View>
                    <Text 
                      style={[styles.columnSkillName, classDefaults.savingThrows.includes({str:'Força',dex:'Destreza',con:'Constituição',int:'Inteligência',wis:'Sabedoria',cha:'Carisma'}[stat] || '') && styles.columnSkillNameProficient]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.75}
                    >
                      Salvaguarda
                    </Text>
                  </View>
                  {skills.map(skill => {
                    const fullName = SKILL_FULL_NAMES[skill] || skill;
                    const isProficient = proficiencies.includes(skill) || proficiencies.includes(fullName);
                    const modVal = Math.floor((stats[stat] - 10) / 2);
                    const finalBonus = modVal + (isProficient ? proficiencyBonus : 0);
                    const finalBonusStr = finalBonus >= 0 ? `+${finalBonus}` : `${finalBonus}`;

                    return (
                      <View 
                        key={skill} 
                        style={[
                          styles.columnSkillItem,
                          isProficient && styles.columnSkillItemProficient
                        ]}
                      >
                        <View style={{ marginRight: 4, justifyContent: 'center' }}>
                          <Ionicons name="ellipse" size={4} color={isProficient ? colors.accentAmber : colors.textMuted} />
                        </View>
                        <Text 
                          style={[styles.columnSkillName, isProficient && styles.columnSkillNameProficient]}
                          numberOfLines={1}
                          adjustsFontSizeToFit
                          minimumFontScale={0.75}
                        >
                          {SKILL_FULL_NAMES[skill] || skill}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>

          {/* Other Proficiencies Section */}
          {(() => {
            const classDefaults = getClassProficienciesSummary(characterClass);
            const customProficiencies = proficiencies.filter(p => !STANDARD_SKILLS_SET.has(p));
            const allTools = [...classDefaults.tools, ...customProficiencies];

            return (
              <View style={styles.otherProfsContainer}>
                <View style={styles.proficienciesDivider} />
                <Text style={styles.otherProfsTitle}>Outras Proficiências & Treinamentos</Text>
                
                <View style={styles.otherProfsCard}>
                  {/* Armor row */}
                  <View style={styles.otherProfRow}>
                    <View style={styles.otherProfRowLeft}>
                      <Ionicons name="shield-half-outline" size={13} color="#60A5FA" style={{ marginRight: 6 }} />
                      <Text style={styles.otherProfLabel}>Armaduras & Escudos:</Text>
                    </View>
                    <Text style={styles.otherProfValue}>{classDefaults.armors}</Text>
                  </View>
                  
                                    {/* Weapons row */}
                  <View style={styles.otherProfRow}>
                    <View style={styles.otherProfRowLeft}>
                      <Ionicons name="cut-outline" size={13} color={colors.accentSky} style={{ marginRight: 6 }} />
                      <Text style={styles.otherProfLabel}>Armas:</Text>
                    </View>
                    <Text style={styles.otherProfValue}>{classDefaults.weapons}</Text>
                  </View>
                  
                  {/* Saving Throws row */}
                  <View style={styles.otherProfRow}>
                    <View style={styles.otherProfRowLeft}>
                      <Ionicons name="body-outline" size={13} color={colors.accentRed} style={{ marginRight: 6 }} />
                      <Text style={styles.otherProfLabel}>Salvaguardas:</Text>
                    </View>
                    <Text style={styles.otherProfValue}>{classDefaults.savingThrows}</Text>
                  </View>
                  
                  {/* Tools row */}
                  <View style={[styles.otherProfRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                    <View style={styles.otherProfRowLeft}>
                      <Ionicons name="hammer-outline" size={13} color={colors.accentEmerald} style={{ marginRight: 6 }} />
                      <Text style={styles.otherProfLabel}>Ferramentas & Idiomas:</Text>
                    </View>
                    <View style={styles.toolsBadgesContainer}>
                      {allTools.length === 0 ? (
                        <Text style={styles.otherProfValueEmpty}>Nenhum treinamento listado</Text>
                      ) : (
                        allTools.map((prof, index) => {
                          const isCustom = customProficiencies.includes(prof);
                          return (
                            <View key={prof + '-' + index} style={[styles.toolBadge, isCustom && styles.toolBadgeCustom]}>
                              <Text style={[styles.toolBadgeText, isCustom && styles.toolBadgeTextCustom]}>{prof}</Text>
                              {isCustom && onUpdateProficiencies && (
                                <TouchableOpacity 
                                  onPress={() => handleRemoveCustomProficiency(prof)}
                                  style={styles.toolBadgeDelete}
                                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                >
                                  <Ionicons name="close-circle" size={11} color={colors.accentRed} style={{ marginLeft: 3 }} />
                                </TouchableOpacity>
                              )}
                            </View>
                          );
                        })
                      )}
                    </View>
                  </View>

                  {/* Add Custom Proficiency Input Row */}
                  {onUpdateProficiencies && (
                    <View style={styles.addProfInputRow}>
                      <TextInput
                        style={styles.addProfInput}
                        placeholder="Adicionar ferramenta, idioma ou outro..."
                        placeholderTextColor="#64748B"
                        value={newProfText}
                        onChangeText={setNewProfText}
                        onSubmitEditing={handleAddProficiency}
                      />
                      <TouchableOpacity style={styles.addProfBtn} onPress={handleAddProficiency} activeOpacity={0.7}>
                        <Ionicons name="add" size={16} color={colors.textMain} />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            );
          })()}
        </>
      )}

      {/* Central View (Mãodel placeholder taking 100% width with absolute stats overlay) */}
      <View style={styles.modelContainerFull}>
        <View style={styles.modelPlaceholder}>
          {imageUrl ? (
            <TouchableOpacity onPress={() => setAvatarModalVisible(true)} activeOpacity={0.8} style={{ width: '100%', height: '100%', borderRadius: 12, overflow: 'hidden' }}>
              <Image source={{ uri: imageUrl }} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setAvatarModalVisible(true)} activeOpacity={0.8} style={{ alignItems: 'center' }}>
              <Ionicons name="body-outline" size={32} color={colors.border} />
              <Text style={styles.modelPlaceholderText}>ADICIONAR AVATAR</Text>
              <Text style={styles.modelPlaceholderSub}>Toque para inserir URL da imagem</Text>
            </TouchableOpacity>
          )}

          {/* Avatar URL Modal */}
          <Modal visible={avatarModalVisible} transparent animationType="fade">
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', padding: 20 }}>
              <View style={{ backgroundColor: colors.surface, borderRadius: 12, padding: 20 }}>
                <Text style={{ color: colors.textMain, fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>URL do Avatar</Text>
                <TextInput
                  style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, color: colors.textMain, marginBottom: 16 }}
                  placeholder="https://..."
                  placeholderTextColor={colors.textMuted}
                  value={tempImageUrl}
                  onChangeText={setTempImageUrl}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                  <TouchableOpacity 
                    onPress={pickImage} 
                    style={{ flex: 1, padding: 12, backgroundColor: colors.surfaceHighlight, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: colors.border }}
                  >
                    <Text style={{ color: colors.textMain, fontWeight: 'bold' }}><Ionicons name="images-outline" size={16} style={{ marginRight: 6 }} /> Da Galeria</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <TouchableOpacity onPress={() => setAvatarModalVisible(false)} style={{ padding: 12, marginRight: 8 }}>
                    <Text style={{ color: colors.textMuted }}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => {
                      if (onUpdateImageUrl) onUpdateImageUrl(tempImageUrl);
                      setAvatarModalVisible(false);
                    }} 
                    style={{ padding: 12, backgroundColor: colors.accentAmber, borderRadius: 8 }}
                  >
                    <Text style={{ color: '#000', fontWeight: 'bold' }}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal visible={spellbookVisible} transparent animationType="fade">
            <TouchableOpacity 
              style={styles.modalBackdrop} 
              activeOpacity={1} 
              onPress={() => setSpellbookVisible(false)}
            >
              <TouchableOpacity activeOpacity={1} style={styles.detailModalContent}>
                <Text style={styles.detailModalTitle}>Grimório</Text>
                
                <View style={styles.spellContainer}>
                  {preparedSpells.length > 0 ? (
                    preparedSpells.map((spell, index) => (
                      <TouchableOpacity 
                        key={index} 
                        style={styles.spellBox}
                        onPress={() => {
                          onCastSpell?.(spell); // Executa a magia
                          setSpellbookVisible(false); // Fecha o modal
                        }}
                      >
                        <Text style={styles.spellBoxText}>{spell}</Text>
                      </TouchableOpacity>
                    ))
                  ) : (
                    <Text style={styles.detailModalText}>Nenhuma magia preparada.</Text>
                  )}
                </View>

                <TouchableOpacity 
                  onPress={() => setSpellbookVisible(false)} 
                  style={{ marginTop: 20, padding: 8 }}
                >
                  <Text style={{ color: colors.textMuted }}>Fechar</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>

          {/* Absolute HUD Badges Overlays */}
          <View pointerEvents="box-none" style={styles.hudBadgesRow}>
            <View pointerEvents="box-none" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                          {/* CA and Prof stacked left */}
              <TouchableOpacity onPress={() => handleShowDetail('ca')} activeOpacity={0.7} style={[styles.hudBadge, { marginBottom: 8 }]}>
                <Ionicons name="shield" size={16} color={combat.shieldOfFaithActive ? '#60A5FA' : colors.accentAmber} style={{ marginRight: 6 }} />
                <Text style={styles.hudBadgeValue}>{acDisplay}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleShowDetail('prof')} activeOpacity={0.7} style={styles.hudBadge}>
                <Ionicons name="star" size={16} color={colors.accentSky} style={{ marginRight: 6 }} />
                <Text style={styles.hudBadgeValue}>+{proficiencyBonus}</Text>
              </TouchableOpacity>

            </View>
            
            <View pointerEvents="box-none" style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', flex: 1, paddingLeft: 16 }}>
              <TouchableOpacity onPress={() => handleShowDetail('init')} activeOpacity={0.7} style={[styles.hudBadge, { marginBottom: 8, marginLeft: 8 }]}>
                <Ionicons name="flash" size={16} color={colors.accentSky} style={{ marginRight: 6 }} />
                <Text style={styles.hudBadgeValue}>{initiativeStr}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleShowDetail('speed')} activeOpacity={0.7} style={[styles.hudBadge, { marginBottom: 8, marginLeft: 8 }]}>
                <Ionicons name="footsteps" size={16} color={colors.accentEmerald} style={{ marginRight: 6 }} />
                <Text style={styles.hudBadgeValue}>9m</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleShowDetail('perception')} activeOpacity={0.7} style={[styles.hudBadge, { marginBottom: 8, marginLeft: 8 }]}>
                <Ionicons name="eye" size={16} color={colors.accentViolet} style={{ marginRight: 6 }} />
                <Text style={styles.hudBadgeValue}>{passivePerception}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleShowDetail('weight')} activeOpacity={0.7} style={[styles.hudBadge, { marginLeft: 8, borderColor: isOverweight ? colors.accentRed : colors.border }]}>
                <Ionicons name="scale-outline" size={16} color={isOverweight ? colors.accentRed : colors.accentAmber} style={{ marginRight: 6 }} />
                <Text style={[styles.hudBadgeValue, { color: isOverweight ? colors.accentRed : colors.textMain }]}>{totalWeight.toFixed(1)} / {maxWeight} lb</Text>
              </TouchableOpacity>
              
            </View>
            
          </View>
        {/* 2. Container Inferior: Grimório e Armas (Posicionado Absolutamente no Bottom) */}
          <View pointerEvents="box-none" style={{ position: 'absolute', bottom: 6, left: 6, right: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            
            {/* Grimório (Esquerda) */}
            <View>
              {(() => {
                const totalCurrentSlots = Object.values(spellSlots).reduce((a, s) => a + (s.current || 0), 0);
                const totalMaxSlots = Object.values(spellSlots).reduce((a, s) => a + (s.max || 0), 0);
                if (totalMaxSlots === 0 && preparedSpells.length === 0) return null;
                return (
                  <TouchableOpacity style={styles.spellbookBtn} onPress={() => setSpellbookVisible(true)} activeOpacity={0.75}>
                    <Ionicons name="book" size={18} color={colors.textMain} />
                    <View style={{ marginLeft: 6 }}>
                      <Text style={styles.spellbookBtnSlots}>{totalCurrentSlots}/{totalMaxSlots} slots</Text>
                    </View>
                  </TouchableOpacity>
                );
              })()}
            </View>
            {/* Condições (Centro) */}
            <View style={{ alignItems: 'center' }}>
            {conditions.length > 0 && (
              <View style={styles.conditionsContainer}>
                {conditions.slice(0, 15).map(id => { // Agora pega até 15
                  const C = CONDITIONS_LIST.find(c => c.id === id);
                  return C ? (
                    <View 
                      key={id} 
                      style={[styles.conditionIndicator, { backgroundColor: C.color }]} 
                    />
                  ) : null;
                })}
              </View>

              )}
              
              <TouchableOpacity 
                style={[styles.spellbookBtn, { paddingHorizontal: 12, paddingVertical: 6 }]} // Botão mais compacto
                onPress={() => setConditionsVisible(true)} 
                activeOpacity={0.75}
              >
                <Ionicons 
                  name="medical-outline" 
                  size={16} // Ícone ligeiramente menor
                  color={conditions.length > 0 ? '#EF4444' : colors.textMain} 
                />
              </TouchableOpacity>
            </View>

            {/* Armas (Direita) */}
            <View style={{ alignItems: 'flex-end' }}>
              {(() => {
                const equippedWeapons = equipment.filter(i => i.type === 'weapon' && i.equipped);
                const ammos = equipment.filter(e => e.type === 'ammunition');
                return (
                  <>
                    {equippedWeapons.map(item => {
                      const isProficient = isProficientInItem(characterClass, 'weapon', item.name);
                      const props2 = item.properties || [];
                      const isFinesse = props2.some(p => p.toLowerCase().includes('acuidade') || p.toLowerCase().includes('finesse'));
                      const nLow = item.name.toLowerCase();
                      const isRanged = nLow.includes('arco') || nLow.includes('bow') || nLow.includes('besta') || nLow.includes('crossbow') || props2.some(p => p.toLowerCase().includes('distância') || p.toLowerCase().includes('ranged'));
                      const strMod = Math.floor((stats.str - 10) / 2);
                      const dexMod = Math.floor((stats.dex - 10) / 2);
                      let mod = isRanged ? dexMod : isFinesse ? Math.max(strMod, dexMod) : strMod;
                      const magicMatch = item.name.match(/\+(\d+)/);
                      const magicBonus = magicMatch ? parseInt(magicMatch[1], 10) : 0;
                      const atkBonus = mod + (isProficient ? proficiencyBonus : 0) + magicBonus;
                      const atkBonusStr = atkBonus >= 0 ? `+${atkBonus}` : `${atkBonus}`;
                      let baseDice = (item.dmgDice || '1d4').replace(/^(\d+d\d+).*/, '$1');
                      const dmgMod = mod + magicBonus;
                      const dmgModStr = dmgMod > 0 ? `+${dmgMod}` : dmgMod < 0 ? `${dmgMod}` : '';
                      return <WeaponCard key={item.id} styles={styles} item={item} atkBonusStr={atkBonusStr} currentDmg={`${baseDice}${dmgModStr}`} rangeText="1.5m" getSvgIcon={getSvgIcon} />;
                    })}
                    {ammos.map(ammo => (
                      <TouchableOpacity key={ammo.id} style={styles.ammoCard} onPress={() => {
                        if (ammo.customResourceMax !== undefined && ammo.customResourceMax > 0 && onUpdateEquipment)
                          onUpdateEquipment(equipment.map(e => e.id === ammo.id ? { ...e, customResourceMax: (e.customResourceMax || 0) - 1 } : e));
                      }}>
                        {renderAmmunitionIcon(ammo.name, colors.textMain)}
                        <Text style={styles.ammoCount}>{ammo.customResourceMax || 0}</Text>
                      </TouchableOpacity>
                    ))}
                  </>
                );
              })()}
            </View>
          </View>
          {/* Vitals Expanded Breakdown */}
          
          {/* Detail Modal */}
          <Modal visible={!!activeDetail} transparent animationType="fade">
            <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setActiveDetail(null)}>
              <TouchableOpacity activeOpacity={1} style={styles.detailModalContent}>
                {activeDetail === 'ca' && (
                  <>
                    <Text style={styles.detailModalTitle}>Classe de Armadura</Text>
                    <Text style={styles.detailModalText}>{combat.baseArmorClass} (Base/Equipamentos) {combat.shieldOfFaithActive ? '+ 2 (Escudo da Fé)' : ''}</Text>
                    <Text style={styles.detailModalText}>Total: {currentAC}</Text>
                  </>
                )}
                {activeDetail === 'init' && (
                  <>
                    <Text style={styles.detailModalTitle}>Iniciativa</Text>
                    <Text style={styles.detailModalText}>{dexMãod >= 0 ? `+${dexMãod}` : dexMãod} (Mãodificador de Destreza)</Text>
                  </>
                )}
                {activeDetail === 'speed' && (
                  <>
                    <Text style={styles.detailModalTitle}>Deslocamento</Text>
                    <Text style={styles.detailModalText}>9m (Base)</Text>
                  </>
                )}
                {activeDetail === 'perception' && (
                  <>
                    <Text style={styles.detailModalTitle}>Percepção Passiva</Text>
                    <Text style={styles.detailModalText}>10 + {wisMãod} (Sabedoria) = {passivePerception}</Text>
                  </>
                )}
                {activeDetail === 'weight' && (
                  <>
                    <Text style={styles.detailModalTitle}>Peso do Equipamento</Text>
                    <Text style={styles.detailModalText}>Atual: {totalWeight.toFixed(1)} lb</Text>
                    <Text style={styles.detailModalText}>Máximo: {maxWeight} lb ({stats.str} * 15)</Text>
                    {isOverweight && <Text style={[styles.detailModalText, { color: colors.accentRed, marginTop: 8 }]}>Você está sobrecarregado! Seu deslocamento cai em 3m.</Text>}
                  </>
                )}
                {activeDetail === 'prof' && (
                  <View style={{ width: '100%' }}>
                    <Text style={styles.detailModalTitle}>Proficiências e Treinamentos</Text>
                    <View style={styles.otherProfRow}>
                      <View style={styles.otherProfRowLeft}>
                        <Ionicons name="shield-half-outline" size={13} color="#60A5FA" style={{ marginRight: 6 }} />
                        <Text style={styles.otherProfLabel}>Armaduras & Escudos:</Text>
                      </View>
                      <Text style={styles.otherProfValue}>{classDefaults.armors}</Text>
                    </View>
                    <View style={styles.otherProfRow}>
                      <View style={styles.otherProfRowLeft}>
                        <Ionicons name="cut-outline" size={13} color={colors.accentSky} style={{ marginRight: 6 }} />
                        <Text style={styles.otherProfLabel}>Armas:</Text>
                      </View>
                      <Text style={styles.otherProfValue}>{classDefaults.weapons}</Text>
                    </View>
                    <View style={styles.otherProfRow}>
                      <View style={styles.otherProfRowLeft}>
                        <Ionicons name="body-outline" size={13} color={colors.accentRed} style={{ marginRight: 6 }} />
                        <Text style={styles.otherProfLabel}>Salvaguardas:</Text>
                      </View>
                      <Text style={styles.otherProfValue}>{classDefaults.savingThrows}</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          </Modal>

<Modal visible={conditionsVisible} transparent animationType="fade">
  <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setConditionsVisible(false)}>
    <TouchableOpacity activeOpacity={1} style={[styles.detailModalContent, { maxWidth: 360 }]}>
      <Text style={styles.detailModalTitle}>Condições</Text>
      
      {/* Container Grid */}
      <View style={styles.conditionsGrid}>
        {CONDITIONS_LIST.map(cond => {
          const isActive = conditions.includes(cond.id);
          return (
            <TouchableOpacity
              key={cond.id}
              style={[
                styles.conditionBox, 
                { 
                  borderColor: isActive ? cond.color : colors.border, 
                  backgroundColor: isActive ? cond.color + '22' : 'transparent' 
                }
              ]}
              onPress={() => {
                if (!onUpdateConditions) return;
                onUpdateConditions(isActive ? conditions.filter(c => c !== cond.id) : [...conditions, cond.id]);
              }}
            >
              <Ionicons name={cond.icon as any} size={20} color={isActive ? cond.color : colors.textMuted} />
              <Text style={[styles.conditionBoxText, { color: isActive ? cond.color : colors.textMain }]}>
                {cond.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity onPress={() => setConditionsVisible(false)} style={{ marginTop: 20, padding: 8 }}>
        <Text style={{ color: colors.textMuted }}>Fechar</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  </TouchableOpacity>
</Modal>



        </View>
      </View>

    </View>
  );
};

const useStyles = (colors: ThemeColors) => StyleSheet.create({

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  detailModalContent: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.accentSkyBg,
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  detailModalTitle: {
    color: colors.textMain,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  detailModalText: {
    color: colors.textMuted,
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },

  container: {
    width: '100%',
    marginBottom: 16,
    flex: 1,
  },
  horizontalAttributesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
  },
  attributeCardHorizontal: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.surfaceHighlight,
    paddingVertical: 6,
    marginHorizontal: 1.5,
    alignItems: 'center',
  },
  attributeCardHorizontalActive: {
    borderColor: colors.accentAmber,
    backgroundColor: colors.accentAmberBg,
  },
  attributeLabelHorizontal: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: '800',
  },
  attributeMãodHorizontal: {
    color: colors.textMain,
    fontSize: 14,
    fontWeight: '900',
    marginVertical: 1,
  },
  attributeScoreHorizontal: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: '700',
    marginTop: -2,
  },
  skillsColumnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  skillsColumn: {
    flex: 1,
    marginHorizontal: 1.5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  columnSkillItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: colors.surfaceHighlight,
    paddingVertical: 3,
    paddingHorizontal: 2,
    marginBottom: 4,
    width: '100%',
  },
  columnSkillItemProficient: {
    borderColor: colors.accentAmber,
    backgroundColor: colors.accentAmberBg,
  },
  columnSkillBonus: {
    color: colors.textMuted,
    fontSize: 9.5,
    fontWeight: '900',
  },
  columnSkillBonusProficient: {
    color: colors.accentAmber,
  },
  columnSkillName: {
    color: colors.textMuted,
    fontSize: 7.5,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 1,
    width: '100%',
    paddingHorizontal: 1,
  },
  columnSkillNameProficient: {
    color: colors.textMain,
    fontWeight: '800',
  },
  modelContainerFull: {
    width: '100%',
    flex: 1,
    marginTop: 2,
    marginBottom: 6,
  },
  modelPlaceholder: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    minHeight: 180,
    position: 'relative',
  },
  modelPlaceholderText: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '800',
    marginTop: 8,
    letterSpacing: 0.5,
  },
  modelPlaceholderSub: {
    color: colors.textMuted,
    fontSize: 8,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 4,
  },
  hudBadgesRow: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  hudBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    minWidth: 46,
  },
  hudBadgeValue: {
    color: colors.textMain,
    fontSize: 13,
    fontWeight: '900',
  },
  vitalsExpandedPanel: {
    position: 'absolute',
    top: 48,
    left: 8,
    right: 8,
    backgroundColor: colors.surfaceSecondary,
    borderColor: colors.surfaceHighlight,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  vitalsPanelTitle: {
    color: colors.textMain,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceHighlight,
    paddingBottom: 4,
  },
  vitalsPanelRow: {
    marginBottom: 6,
  },
  vitalsPanelLabel: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
  },
  vitalsPanelValue: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '600',
  },
  buffBadgeFloating: {
    position: 'absolute',
    top: 36,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.25)',
    borderColor: '#3b82f6',
    borderWidth: 0.5,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 10,
  },
  buffTextFloating: {
    color: '#60A5FA',
    fontSize: 8,
    fontWeight: '800',
  },
  footerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceHighlight,
    gap: 8,
  },
  footerSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  spellbookBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  conditionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 6,
  },
  conditionBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 6,
    flex: 1,
  },
  conditionDesc: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 3,
    marginLeft: 24,
  },
  spellbookBtnLabel: {
    color: colors.textMain,
    fontSize: 12,
    fontWeight: '800',
  },
  spellbookBtnSlots: {
    color: colors.textMain,
    fontSize: 10,
    fontWeight: '600',
  },
  spellbookModal: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%' as any,
    borderWidth: 1,
    borderColor: colors.border,
  },
  spellChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 3,
  },
  spellChipText: {
    color: colors.textMain,
    fontSize: 11,
    fontWeight: '600',
  },
  weaponHudCardCompact: {
    flexDirection: 'column',
    backgroundColor: colors.surfaceSecondary, // blending more with dark theme
    borderColor: colors.surfaceHighlight, // subtle border instead of yellow
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    minWidth: 90,
  },
  weaponHudHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weaponIconWrapper: {
    marginRight: 6,
    opacity: 0.9,
  },
  weaponHudExpanded: {
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceHighlight,
  },
  weaponNameCompact: {
    color: '#E2E8F0',
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 2,
  },
  weaponAtkCompact: {
    color: colors.accentEmerald,
    fontSize: 12,
    fontWeight: '900',
    marginRight: 6,
  },
  weaponDmgCompact: {
    color: colors.accentAmber,
    fontSize: 12,
    fontWeight: '800',
  },
  weaponRangeCompact: {
    color: colors.textMuted,
    fontSize: 9,
    fontWeight: '600',
  },
  weaponPropsCompact: {
    color: colors.textMuted,
    fontSize: 8,
    fontWeight: '500',
    marginTop: 2,
  },
  ammoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceSecondary,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 2,
    alignSelf: 'flex-end',
  },
  ammoCount: {
    color: colors.textMain,
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 6,
  },
  otherProfsContainer: {
    marginTop: 12,
    paddingTop: 12,
  },
  proficienciesDivider: {
    height: 1,
    backgroundColor: colors.surfaceHighlight,
    marginBottom: 8,
  },
  otherProfsTitle: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  otherProfsCard: {
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.surfaceHighlight,
    padding: 8,
  },
  otherProfRow: {
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceHighlight,
    paddingBottom: 6,
    marginBottom: 6,
  },
  otherProfRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  otherProfLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
  },
  otherProfValue: {
    color: colors.textMuted,
    fontSize: 9,
    lineHeight: 14,
  },
  toolsBadgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  otherProfValueEmpty: {
    color: colors.textMuted,
    fontSize: 9,
    fontStyle: 'italic',
  },
  toolBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceHighlight,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 4,
  },
  toolBadgeCustom: {
    backgroundColor: colors.accentEmeraldBg,
    borderColor: colors.accentEmeraldBg,
    borderWidth: 0.5,
  },
  toolBadgeText: {
    color: colors.textSecondary,
    fontSize: 9,
  },
  toolBadgeTextCustom: {
    color: '#34D399',
    fontWeight: '600',
  },
  toolBadgeDelete: {
    padding: 2,
  },
  addProfInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceHighlight,
  },
  addProfInput: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    borderColor: colors.surfaceHighlight,
    borderWidth: 1,
    borderRadius: 6,
    color: colors.textMain,
    fontSize: 10,
    paddingHorizontal: 8,
    height: 32,
  },
  addProfBtn: {
    backgroundColor: colors.accentSky,
    borderRadius: 6,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  spellContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 10,
  },
  spellBox: {
    backgroundColor: colors.surfaceSecondary,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    margin: 5,
    width: '45%', // Ajusta para duas colunas
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3,
  },
  spellBoxText: {
    color: colors.textMain,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  conditionBox: {
    width: '30%', // Ajuste para caber 3 por linha. Use '45%' se quiser apenas 2.
    aspectRatio: 1, // Mantém quadrado
    margin: '1.5%',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conditionBoxText: {
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  conditionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite quebrar a linha
    justifyContent: 'center',
    width: 70, // (6px largura + 4px margem total) * 5 colunas = 50px + um pouco de folga
    marginBottom: 4,
  },
  conditionIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 2, // Margem para dar espaçamento entre elas
  }
});

