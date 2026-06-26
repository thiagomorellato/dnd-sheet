export interface BaseStats {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface HP {
  current: number;
  max: number;
  temp: number;
}

export interface CombatConfig {
  baseArmorClass: number;
  shieldOfFaithActive: boolean;
}

export interface SpellSlot {
  current: number;
  max: number;
}

export interface CustomResource {
  id: string;
  name: string;
  current: number;
  max: number;
}

export interface Resources {
  spellSlots: Record<string, SpellSlot>; // e.g. { "L1": { current: 4, max: 4 } }
  customResources: CustomResource[];
}

export interface Coins {
  cp: number; // Copper / Cobre
  sp: number; // Silver / Prata
  ep: number; // Electrum / Electro
  gp: number; // Gold / Ouro
  pp: number; // Platinum / Platina
}

export interface EquipmentItem {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'shield' | 'ring' | 'other';
  equipped: boolean;
  acBonus?: number;
  dmgDice?: string;
  dmgType?: string;
  handedness?: '1 Mão' | '2 Mãos' | 'Versátil';
  properties?: string[];
  isMagic?: boolean;
  rarity?: 'Comum' | 'Incomum' | 'Raro' | 'Muito Raro' | 'Lendário';
  description?: string;
  customResourceName?: string;
  customResourceMax?: number;
  linkedSpellName?: string;
}

export interface HitDice {
  current: number;
  dieType: string;
}

export interface Character {
  id: string;
  name: string;
  characterClass: string;
  level: number;
  baseStats: BaseStats;
  hp: HP;
  combat: CombatConfig;
  resources: Resources;
  proficiencies: string[];
  preparedSpells: string[];
  equipment: EquipmentItem[];
  background?: string;
  coins?: Coins;
  hitDice?: HitDice;
}

export type ActionType = 
  | 'HP_DAMAGE' 
  | 'HP_HEAL' 
  | 'SHIELD_OF_FAITH' 
  | 'SPELL_SLOT_USE' 
  | 'SPELL_SLOT_REGAIN'
  | 'SMITE_USE' 
  | 'RESOURCE_USE'
  | 'RESOURCE_REGAIN';

export interface CombatLogEntry {
  id: string;
  characterId: string;
  timestamp: string;
  action_type: ActionType;
  value_change: string; // e.g., "-5", "+1", "active", "L1 slots: 3/4"
  current_state: string; // snapshot e.g. "HP: 35/40, AC: 18"
}
