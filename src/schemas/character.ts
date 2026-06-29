import { z } from 'zod';

export const BaseStatsSchema = z.object({
  str: z.number().int().min(1).max(30),
  dex: z.number().int().min(1).max(30),
  con: z.number().int().min(1).max(30),
  int: z.number().int().min(1).max(30),
  wis: z.number().int().min(1).max(30),
  cha: z.number().int().min(1).max(30),
});

export const HPSchema = z.object({
  current: z.number().int().min(0),
  max: z.number().int().min(1),
  temp: z.number().int().min(0).default(0),
});

export const CombatConfigSchema = z.object({
  baseArmorClass: z.number().int().min(1).max(40),
  shieldOfFaithActive: z.boolean().default(false),
});

export const SpellSlotSchema = z.object({
  current: z.number().int().min(0),
  max: z.number().int().min(0),
});

export const CustomResourceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  current: z.number().int().min(0),
  max: z.number().int().min(0),
});

export const ResourcesSchema = z.object({
  spellSlots: z.record(z.string(), SpellSlotSchema).default({}),
  customResources: z.array(CustomResourceSchema).default([]),
});

export const CoinsSchema = z.object({
  cp: z.number().int().min(0).default(0),
  sp: z.number().int().min(0).default(0),
  ep: z.number().int().min(0).default(0),
  gp: z.number().int().min(0).default(0),
  pp: z.number().int().min(0).default(0),
});

export const EquipmentItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(['weapon', 'armor', 'shield', 'ring', 'other', 'ammunition']),
  equipped: z.boolean().default(false),
  acBonus: z.number().int().optional(),
  dmgDice: z.string().optional(),
  dmgType: z.string().optional(),
  handedness: z.string().optional(),
  properties: z.array(z.string()).optional(),
  isMagic: z.boolean().optional(),
  rarity: z.enum(['Comum', 'Incomum', 'Raro', 'Muito Raro', 'Lendário']).optional(),
  description: z.string().optional(),
  customResourceName: z.string().optional(),
  customResourceMax: z.number().int().optional(),
  linkedSpellName: z.string().optional(),
});

export const CharacterSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, "Name is required"),
  characterClass: z.string().min(1, "Class is required"),
  level: z.number().int().min(1).max(20),
  baseStats: BaseStatsSchema,
  hp: HPSchema,
  combat: CombatConfigSchema,
  resources: ResourcesSchema,
  proficiencies: z.array(z.string()).default([]),
  preparedSpells: z.array(z.string()).default(['Escudo da Fé', 'Curar Ferimentos']),
  equipment: z.array(EquipmentItemSchema).default([]),
  background: z.string().optional(),
  coins: CoinsSchema.default({ cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 }),
  hitDice: z.object({
    current: z.number().int().min(0),
    dieType: z.string().default('d8'),
  }).optional(),
  imageUrl: z.string().optional(),
});
