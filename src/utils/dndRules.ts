import { BaseStats } from '../types/character';

export interface ClassData {
  name: string;
  hd: string;
  defaultSlots: Record<number, Record<string, { max: number }>>;
  subclasses: string[];
}

export interface WeaponTemplate {
  name: string;
  dmgDice: string;
  handedness: '1 Mão' | '2 Mãos' | 'Versátil';
  dmgType: 'Cortante' | 'Perfurante' | 'Impacto';
  dmgDiceVersatile?: string; // used if versatile weapon is held with 2 hands
  properties: string[]; // ['Acuidade', 'Arremesso', 'Leve', 'Pesada', 'Alcance', etc.]
  category: 'Simples' | 'Marcial';
  rangeType: 'Corpo-a-corpo' | 'À Distância';
}

export interface ArmorTemplate {
  name: string;
  acBonus: number;
  type: 'armor' | 'shield' | 'ring' | 'other';
  strengthReq?: number; // Minimum Strength score required
  stealthDisadvantage: boolean;
}

export const CLASSES_LIST: ClassData[] = [
  {
    name: 'Bárbaro',
    hd: 'd12',
    defaultSlots: {
      1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {},
    },
    subclasses: ['Caminho do Berserker', 'Caminho do Guerreiro Totêmico', 'Caminho da Magia Selvagem'],
  },
  {
    name: 'Bardo',
    hd: 'd8',
    defaultSlots: {
      1: { L1: { max: 2 } },
      2: { L1: { max: 3 } },
      3: { L1: { max: 4 }, L2: { max: 2 } },
      4: { L1: { max: 4 }, L2: { max: 3 } },
      5: { L1: { max: 4 }, L2: { max: 3 }, L3: { max: 2 } },
      6: { L1: { max: 4 }, L2: { max: 3 }, L3: { max: 3 } },
    },
    subclasses: ['Colégio do Conhecimento', 'Colégio da Bravura', 'Colégio das Espadas'],
  },
  {
    name: 'Bruxo',
    hd: 'd8',
    defaultSlots: {
      1: { L1: { max: 1 } },
      2: { L1: { max: 2 } },
      3: { L2: { max: 2 } },
      4: { L2: { max: 2 } },
      5: { L3: { max: 2 } },
      6: { L3: { max: 2 } },
    },
    subclasses: ['O Corruptor', 'O Arquifada', 'O Grande Antigo', 'Lâmina Maldita'],
  },
  {
    name: 'Clérigo',
    hd: 'd8',
    defaultSlots: {
      1: { L1: { max: 2 } },
      2: { L1: { max: 3 } },
      3: { L1: { max: 4 }, L2: { max: 2 } },
      4: { L1: { max: 4 }, L2: { max: 3 } },
      5: { L1: { max: 4 }, L2: { max: 3 }, L3: { max: 2 } },
      6: { L1: { max: 4 }, L2: { max: 3 }, L3: { max: 3 } },
    },
    subclasses: ['Domínio da Vida', 'Domínio da Tempestade', 'Domínio da Guerra', 'Domínio da Luz'],
  },
  {
    name: 'Druida',
    hd: 'd8',
    defaultSlots: {
      1: { L1: { max: 2 } },
      2: { L1: { max: 3 } },
      3: { L1: { max: 4 }, L2: { max: 2 } },
      4: { L1: { max: 4 }, L2: { max: 3 } },
      5: { L1: { max: 4 }, L2: { max: 3 }, L3: { max: 2 } },
      6: { L1: { max: 4 }, L2: { max: 3 }, L3: { max: 3 } },
    },
    subclasses: ['Círculo da Terra', 'Círculo da Lua', 'Círculo dos Esporos'],
  },
  {
    name: 'Feiticeiro',
    hd: 'd6',
    defaultSlots: {
      1: { L1: { max: 2 } },
      2: { L1: { max: 3 } },
      3: { L1: { max: 4 }, L2: { max: 2 } },
      4: { L1: { max: 4 }, L2: { max: 3 } },
      5: { L1: { max: 4 }, L2: { max: 3 }, L3: { max: 2 } },
      6: { L1: { max: 4 }, L2: { max: 3 }, L3: { max: 3 } },
    },
    subclasses: ['Linhagem Dracônica', 'Magia Selvagem', 'Alma Favorecida'],
  },
  {
    name: 'Guerreiro',
    hd: 'd10',
    defaultSlots: {
      1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {},
    },
    subclasses: ['Campeão', 'Mestre de Batalha', 'Cavaleiro Arcano'],
  },
  {
    name: 'Ladino',
    hd: 'd8',
    defaultSlots: {
      1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {},
    },
    subclasses: ['Ladrão', 'Assassino', 'Trapaceiro Arcano'],
  },
  {
    name: 'Mago',
    hd: 'd6',
    defaultSlots: {
      1: { L1: { max: 2 } },
      2: { L1: { max: 3 } },
      3: { L1: { max: 4 }, L2: { max: 2 } },
      4: { L1: { max: 4 }, L2: { max: 3 } },
      5: { L1: { max: 4 }, L2: { max: 3 }, L3: { max: 2 } },
      6: { L1: { max: 4 }, L2: { max: 3 }, L3: { max: 3 } },
    },
    subclasses: ['Escola de Evocação', 'Escola de Abjuração', 'Escola de Necromancia'],
  },
  {
    name: 'Monge',
    hd: 'd8',
    defaultSlots: {
      1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {},
    },
    subclasses: ['Caminho da Mão Aberta', 'Caminho das Sombras', 'Caminho dos Quatro Elementos'],
  },
  {
    name: 'Paladino',
    hd: 'd10',
    defaultSlots: {
      1: {},
      2: { L1: { max: 2 } },
      3: { L1: { max: 3 } },
      4: { L1: { max: 3 } },
      5: { L1: { max: 4 }, L2: { max: 2 } },
      6: { L1: { max: 4 }, L2: { max: 2 } },
    },
    subclasses: ['Juramento de Devoção', 'Juramento de Vingança', 'Juramento dos Anciões'],
  },
  {
    name: 'Patrulheiro',
    hd: 'd10',
    defaultSlots: {
      1: {},
      2: { L1: { max: 2 } },
      3: { L1: { max: 3 } },
      4: { L1: { max: 3 } },
      5: { L1: { max: 4 }, L2: { max: 2 } },
      6: { L1: { max: 4 }, L2: { max: 2 } },
    },
    subclasses: ['Caçador', 'Mestre das Bestas', 'Gloom Stalker'],
  },
  {
    name: 'Artífice',
    hd: 'd8',
    defaultSlots: {
      1: { L1: { max: 2 } },
      2: { L1: { max: 2 } },
      3: { L1: { max: 3 } },
      4: { L1: { max: 3 }, L2: { max: 2 } },
      5: { L1: { max: 4 }, L2: { max: 2 } },
      6: { L1: { max: 4 }, L2: { max: 3 } },
    },
    subclasses: ['Alquimista', 'Armeiro', 'Artilheiro', 'Serralheiro de Combate'],
  },
];

export const getHitDieType = (characterClass: string): string => {
  const normalized = characterClass.trim().toLowerCase();
  if (normalized.includes('barbarian') || normalized.includes('bárbaro')) return 'd12';
  if (
    normalized.includes('fighter') || normalized.includes('guerreiro') ||
    normalized.includes('paladin') || normalized.includes('paladino') ||
    normalized.includes('ranger') || normalized.includes('patrulheiro')
  ) {
    return 'd10';
  }
  if (
    normalized.includes('sorcerer') || normalized.includes('feiticeiro') ||
    normalized.includes('wizard') || normalized.includes('mago')
  ) {
    return 'd6';
  }
  return 'd8'; // Default to d8 for cleric, druid, rogue, bard, etc.
};

export const getSpellLimit = (className: string, level: number, stats: BaseStats): number => {
  const normalized = className.trim().toLowerCase();
  
  const intMod = Math.floor((stats.int - 10) / 2);
  const wisMod = Math.floor((stats.wis - 10) / 2);
  const chaMod = Math.floor((stats.cha - 10) / 2);

  // Prepared casters
  if (normalized.includes('clérigo') || normalized.includes('cleric') || normalized.includes('druida') || normalized.includes('druid')) {
    return Math.max(1, level + wisMod);
  }
  if (normalized.includes('mago') || normalized.includes('wizard')) {
    return Math.max(1, level + intMod);
  }
  if (normalized.includes('paladino') || normalized.includes('paladin')) {
    return Math.max(1, Math.floor(level / 2) + chaMod);
  }
  if (normalized.includes('artífice') || normalized.includes('artificer')) {
    return Math.max(1, Math.ceil(level / 2) + intMod);
  }

  // Known casters (levels 1-6)
  if (normalized.includes('bardo') || normalized.includes('bard')) {
    const knownTable = [0, 4, 5, 6, 7, 8, 9];
    return knownTable[Math.min(6, Math.max(1, level))];
  }
  if (normalized.includes('feiticeiro') || normalized.includes('sorcerer') || normalized.includes('bruxo') || normalized.includes('warlock')) {
    const knownTable = [0, 2, 3, 4, 5, 6, 7];
    return knownTable[Math.min(6, Math.max(1, level))];
  }
  if (normalized.includes('patrulheiro') || normalized.includes('ranger')) {
    const knownTable = [0, 0, 2, 3, 3, 4, 4];
    return knownTable[Math.min(6, Math.max(1, level))];
  }

  return 0; // Non-casters
};

export const getArmorCategory = (armorName: string): 'light' | 'medium' | 'heavy' => {
  const name = armorName.toLowerCase();
  if (
    name.includes('plate') || name.includes('placas') ||
    name.includes('splint') || name.includes('segmentada') ||
    name.includes('chain mail') || name.includes('cota de malha (chain mail)') ||
    name.includes('ring mail') || name.includes('loriga de anéis')
  ) {
    return 'heavy';
  }
  if (
    name.includes('hide') || name.includes('gibão') ||
    name.includes('shirt') || name.includes('scale') || name.includes('peitoral') || name.includes('breastplate')
  ) {
    return 'medium';
  }
  return 'light';
};

export const RACES_LIST = ['Humano', 'Elfo', 'Anão', 'Halfling', 'Draconato', 'Gnomo', 'Meio-Elfo', 'Meio-Orc', 'Tiefling'];

export const SKILLS_LIST = [
  'Athletics',
  'Acrobatics', 'Sleight of Hand', 'Stealth',
  'Arcana', 'History', 'Investigation', 'Nature', 'Religion',
  'Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival',
  'Deception', 'Intimidation', 'Performance', 'Persuasion'
];

export const WEAPON_TEMPLATES: WeaponTemplate[] = [
  // --- WEAPONS SIMPLES CORPO-A-CORPO ---
  {
    name: 'Adaga (Dagger)',
    dmgDice: '1d4',
    handedness: '1 Mão',
    dmgType: 'Perfurante',
    properties: ['Acuidade (Finesse)', 'Leve (Light)', 'Arremesso (dist. 6/18m)'],
    category: 'Simples',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Lança (Spear)',
    dmgDice: '1d6',
    handedness: 'Versátil',
    dmgType: 'Perfurante',
    dmgDiceVersatile: '1d8',
    properties: ['Versátil (Versatile)', 'Arremesso (dist. 6/18m)'],
    category: 'Simples',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Bordão (Quarterstaff)',
    dmgDice: '1d6',
    handedness: 'Versátil',
    dmgType: 'Impacto',
    dmgDiceVersatile: '1d8',
    properties: ['Versátil (Versatile)'],
    category: 'Simples',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Maça (Mace)',
    dmgDice: '1d6',
    handedness: '1 Mão',
    dmgType: 'Impacto',
    properties: [],
    category: 'Simples',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Machadinha (Handaxe)',
    dmgDice: '1d6',
    handedness: '1 Mão',
    dmgType: 'Cortante',
    properties: ['Leve (Light)', 'Arremesso (dist. 6/18m)'],
    category: 'Simples',
    rangeType: 'Corpo-a-corpo',
  },

  // --- WEAPONS SIMPLES À DISTÂNCIA ---
  {
    name: 'Arco Curto (Shortbow)',
    dmgDice: '1d6',
    handedness: '2 Mãos',
    dmgType: 'Perfurante',
    properties: ['Munição (dist. 24/96m)', 'Duas Mãos'],
    category: 'Simples',
    rangeType: 'À Distância',
  },
  {
    name: 'Besta Leve (Light Crossbow)',
    dmgDice: '1d8',
    handedness: '2 Mãos',
    dmgType: 'Perfurante',
    properties: ['Munição (dist. 24/96m)', 'Recarga', 'Duas Mãos'],
    category: 'Simples',
    rangeType: 'À Distância',
  },

  // --- WEAPONS MARCIAIS CORPO-A-CORPO ---
  {
    name: 'Espada Longa (Longsword)',
    dmgDice: '1d8',
    handedness: 'Versátil',
    dmgType: 'Cortante',
    dmgDiceVersatile: '1d10',
    properties: ['Versátil (Versatile)'],
    category: 'Marcial',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Espada Curta (Shortsword)',
    dmgDice: '1d6',
    handedness: '1 Mão',
    dmgType: 'Perfurante',
    properties: ['Acuidade (Finesse)', 'Leve (Light)'],
    category: 'Marcial',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Espada Larga (Greatsword)',
    dmgDice: '2d6',
    handedness: '2 Mãos',
    dmgType: 'Cortante',
    properties: ['Pesada (Heavy)', 'Duas Mãos'],
    category: 'Marcial',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Machado de Batalha (Battleaxe)',
    dmgDice: '1d8',
    handedness: 'Versátil',
    dmgType: 'Cortante',
    dmgDiceVersatile: '1d10',
    properties: ['Versátil (Versatile)'],
    category: 'Marcial',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Machado Grande (Greataxe)',
    dmgDice: '1d12',
    handedness: '2 Mãos',
    dmgType: 'Cortante',
    properties: ['Pesada (Heavy)', 'Duas Mãos'],
    category: 'Marcial',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Alabarda (Halberd)',
    dmgDice: '1d10',
    handedness: '2 Mãos',
    dmgType: 'Cortante',
    properties: ['Pesada (Heavy)', 'Alcance (Reach)', 'Duas Mãos'],
    category: 'Marcial',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Martelo de Guerra (Warhammer)',
    dmgDice: '1d8',
    handedness: 'Versátil',
    dmgType: 'Impacto',
    dmgDiceVersatile: '1d10',
    properties: ['Versátil (Versatile)'],
    category: 'Marcial',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Rapieira (Rapier)',
    dmgDice: '1d8',
    handedness: '1 Mão',
    dmgType: 'Perfurante',
    properties: ['Acuidade (Finesse)'],
    category: 'Marcial',
    rangeType: 'Corpo-a-corpo',
  },
  {
    name: 'Chicote (Whip)',
    dmgDice: '1d4',
    handedness: '1 Mão',
    dmgType: 'Cortante',
    properties: ['Acuidade (Finesse)', 'Alcance (Reach)'],
    category: 'Marcial',
    rangeType: 'Corpo-a-corpo',
  },

  // --- WEAPONS MARCIAIS À DISTÂNCIA ---
  {
    name: 'Arco Longo (Longbow)',
    dmgDice: '1d8',
    handedness: '2 Mãos',
    dmgType: 'Perfurante',
    properties: ['Munição (dist. 45/180m)', 'Pesada (Heavy)', 'Duas Mãos'],
    category: 'Marcial',
    rangeType: 'À Distância',
  },
  {
    name: 'Besta Pesada (Heavy Crossbow)',
    dmgDice: '1d10',
    handedness: '2 Mãos',
    dmgType: 'Perfurante',
    properties: ['Munição (dist. 30/120m)', 'Pesada (Heavy)', 'Recarga', 'Duas Mãos'],
    category: 'Marcial',
    rangeType: 'À Distância',
  },
];

export const ARMOR_TEMPLATES: ArmorTemplate[] = [
  // Armaduras Leves
  { name: 'Couro (Leather Armor)', acBonus: 11, type: 'armor', stealthDisadvantage: false },
  { name: 'Couro Batido (Studded Leather)', acBonus: 12, type: 'armor', stealthDisadvantage: false },
  // Armaduras Médias
  { name: 'Gibão de Peles (Hide)', acBonus: 12, type: 'armor', stealthDisadvantage: false },
  { name: 'Cota de Malha (Chain Shirt)', acBonus: 13, type: 'armor', stealthDisadvantage: false },
  { name: 'Couro Batido com Placas (Scale Mail)', acBonus: 14, type: 'armor', stealthDisadvantage: true },
  { name: 'Peitoral (Breastplate)', acBonus: 14, type: 'armor', stealthDisadvantage: false },
  // Armaduras Pesadas
  { name: 'Loriga de Anéis (Ring Mail)', acBonus: 14, type: 'armor', stealthDisadvantage: true },
  { name: 'Cota de Malha (Chain Mail)', acBonus: 16, type: 'armor', strengthReq: 13, stealthDisadvantage: true },
  { name: 'Loriga Segmentada (Splint Mail)', acBonus: 17, type: 'armor', strengthReq: 15, stealthDisadvantage: true },
  { name: 'Armadura de Placas (Plate Armor)', acBonus: 18, type: 'armor', strengthReq: 15, stealthDisadvantage: true },
  // Escudo
  { name: 'Escudo (Shield)', acBonus: 2, type: 'shield', stealthDisadvantage: false },
  // Outros
  { name: 'Anel de Proteção (Ring of Protection)', acBonus: 1, type: 'ring', stealthDisadvantage: false },
];

export function getSpellSlotsForClass(className: string, level: number): Record<string, { current: number, max: number }> {
  const cls = CLASSES_LIST.find(c => c.name === className);
  if (!cls) return {};
  
  const slotsAtLevel = cls.defaultSlots[level] || cls.defaultSlots[Object.keys(cls.defaultSlots).length] || {};
  
  const result: Record<string, { current: number, max: number }> = {};
  Object.entries(slotsAtLevel).forEach(([lvl, slot]) => {
    result[lvl] = { current: slot.max, max: slot.max };
  });
  
  return result;
}

export interface BackgroundData {
  name: string;
  skills: string[];
  featureName: string;
  featureDesc: string;
}

export const BACKGROUNDS_LIST: BackgroundData[] = [
  {
    name: 'Acólito (Acolyte)',
    skills: ['Insight', 'Religion'],
    featureName: 'Abrigo dos Fiéis (Shelter of the Faithful)',
    featureDesc: 'Você e seus companheiros podem receber cura e assistência gratuita em templos de sua fé.',
  },
  {
    name: 'Criminoso (Criminal)',
    skills: ['Deception', 'Stealth'],
    featureName: 'Contato Criminoso (Criminal Contact)',
    featureDesc: 'Você tem um contato confiável na rede de crime e sabe como enviar e receber mensagens secretas.',
  },
  {
    name: 'Herói do Povo (Folk Hero)',
    skills: ['Animal Handling', 'Survival'],
    featureName: 'Hospitalidade Rústica (Rustic Hospitality)',
    featureDesc: 'Você encontra abrigo e ajuda fácil entre os plebeus e camponeses locais.',
  },
  {
    name: 'Nobre (Noble)',
    skills: ['History', 'Persuasion'],
    featureName: 'Posição de Privilégio (Position of Privilege)',
    featureDesc: 'Você é bem-recebido pela alta sociedade e as pessoas tendem a assumir que você tem o direito de estar onde está.',
  },
  {
    name: 'Sábio (Sage)',
    skills: ['Arcana', 'History'],
    featureName: 'Pesquisador (Researcher)',
    featureDesc: 'Quando você tenta obter uma informação, se você não souber, sabe exatamente onde encontrá-la.',
  },
  {
    name: 'Soldado (Soldier)',
    skills: ['Athletics', 'Intimidation'],
    featureName: 'Patente Militar (Military Rank)',
    featureDesc: 'Soldados de patentes inferiores reconhecem sua autoridade e você pode requisitar recursos básicos.',
  },
  {
    name: 'Forasteiro (Outlander)',
    skills: ['Athletics', 'Survival'],
    featureName: 'Andarilho (Wanderer)',
    featureDesc: 'Você tem memória excelente para mapas e geografia, e consegue achar comida e água fresca para até 6 pessoas por dia.',
  },
  {
    name: 'Charlatão (Charlatan)',
    skills: ['Deception', 'Sleight of Hand'],
    featureName: 'Identidade Falsa (False Identity)',
    featureDesc: 'Você criou uma segunda identidade falsa completa e documentos para sustentá-la.',
  },
];

export interface MagicItemTemplate {
  name: string;
  type: 'weapon' | 'armor' | 'shield' | 'ring' | 'other';
  acBonus?: number;
  dmgDice?: string;
  dmgType?: string;
  rarity: 'Comum' | 'Incomum' | 'Raro' | 'Muito Raro' | 'Lendário';
  description: string;
}

export const MAGIC_ITEMS_LIST: MagicItemTemplate[] = [
  {
    name: 'Arma +1 (Weapon +1)',
    type: 'weapon',
    dmgDice: '+1',
    rarity: 'Incomum',
    description: 'Você recebe +1 de bônus nas jogadas de ataque e dano feitas com esta arma mágica.',
  },
  {
    name: 'Armadura de Placas +1 (Plate Armor +1)',
    type: 'armor',
    acBonus: 19,
    rarity: 'Raro',
    description: 'Você recebe +1 de bônus na AC enquanto usar esta armadura (total 19 AC).',
  },
  {
    name: 'Escudo +1 (Shield +1)',
    type: 'shield',
    acBonus: 3,
    rarity: 'Incomum',
    description: 'Você recebe +1 de bônus na AC enquanto usar este escudo (total +3 AC).',
  },
  {
    name: 'Anel de Proteção (Ring of Protection)',
    type: 'ring',
    acBonus: 1,
    rarity: 'Raro',
    description: 'Você recebe +1 de bônus na AC e nos testes de salvaguarda enquanto usar este anel.',
  },
  {
    name: 'Espada de Língua de Fogo (Flame Tongue)',
    type: 'weapon',
    dmgDice: '1d8 + 2d6 Fogo',
    dmgType: 'Cortante / Fogo',
    rarity: 'Raro',
    description: 'Você pode usar uma ação bônus para ativar a lâmina flamejante. Ela causa 2d6 de dano de fogo adicional ao atingir.',
  },
  {
    name: 'Manto de Proteção (Cloak of Protection)',
    type: 'ring',
    acBonus: 1,
    rarity: 'Incomum',
    description: 'Este manto de seda fina garante +1 de bônus na AC e nos testes de salvaguarda.',
  },
  {
    name: 'Sacola de Carga (Bag of Holding)',
    type: 'other',
    rarity: 'Incomum',
    description: 'Esta sacola abre em um espaço extra-dimensional que pode conter até 250 kg de carga, pesando sempre apenas 7 kg.',
  },
  {
    name: 'Garras de Força de Ogre (Gauntlets of Ogre Power)',
    type: 'other',
    rarity: 'Incomum',
    description: 'Sua Força se torna 19 enquanto você usar estas luvas. Elas não têm efeito se sua Força for igual ou maior a 19.',
  },
  {
    name: 'Tiara de Intelecto (Headband of Intellect)',
    type: 'other',
    rarity: 'Incomum',
    description: 'Sua Inteligência se torna 19 enquanto você usar esta tiara. Ela não tem efeito se sua Inteligência for igual ou maior a 19.',
  },
  {
    name: 'Amuleto da Saúde (Amulet of Health)',
    type: 'other',
    rarity: 'Raro',
    description: 'Sua Constituição se torna 19 enquanto você usar este amuleto. Ele não tem efeito se sua Constituição for igual ou maior a 19.',
  },
  {
    name: 'Botas de Furtividade (Boots of Elvenkind)',
    type: 'other',
    rarity: 'Incomum',
    description: 'Seus passos não fazem som. Você tem vantagem em testes de Destreza (Furtividade) que dependam de silêncio.',
  },
  {
    name: 'Cota de Malha de Mithral (Mithral Chain Mail)',
    type: 'armor',
    acBonus: 16,
    rarity: 'Incomum',
    description: 'Esta armadura de malha é feita de mithral, sendo muito leve. Ela não impõe desvantagem em Furtividade e não tem requisito de Força.',
  },
  {
    name: 'Armadura de Adamantina (Adamantine Plate)',
    type: 'armor',
    acBonus: 18,
    rarity: 'Incomum',
    description: 'Esta armadura reforçada com adamantina anula o dano extra de qualquer acerto crítico desferido contra você.',
  },
  {
    name: 'Espada do Sol (Sun Blade)',
    type: 'weapon',
    dmgDice: '1d8 + 2',
    dmgType: 'Radiante',
    rarity: 'Raro',
    description: 'Esta espada emite luz solar brilhante e causa dano radiante (+2 no acerto/dano). Tem vantagem contra mortos-vivos.',
  },
  {
    name: 'Pérola do Poder (Pearl of Power)',
    type: 'other',
    rarity: 'Incomum',
    description: 'Uma vez por dia, você pode usar uma ação para recuperar um slot de magia de até 3º nível.',
  },
];
