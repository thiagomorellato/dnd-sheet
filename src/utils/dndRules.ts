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
  weight?: number;
}

export interface ArmorTemplate {
  name: string;
  acBonus: number;
  type: 'armor' | 'shield' | 'ring' | 'other';
  strengthReq?: number; // Minimum Strength score required
  stealthDisadvantage: boolean;
  weight?: number;
}

export const CLASSES_LIST: ClassData[] = [
  {
    name: 'Bárbaro',
    hd: 'd12',
    defaultSlots: {
      1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {},
    },
    subclasses: [
      'Caminho do Berserker (Berserker)', 
      'Caminho do Guerreiro Totêmico (Totem Warrior)', 
      'Caminho do Arauto da Tempestade (Storm Herald)', 
      'Caminho do Fanático (Zealot)',
      'Caminho do Combatente de Fúria (Battlerager)'
    ],
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
    subclasses: [
      'Colégio do Conhecimento (Lore)', 
      'Colégio da Bravura (Valor)', 
      'Colégio das Espadas (Swords)',
      'Colégio dos Sussurros (Whispers)',
      'Colégio do Glamour (Glamour)',
      'Colégio da Sátira (Satire)'
    ],
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
    subclasses: [
      'O Corruptor (Fiend)', 
      'O Arquifada (Archfey)', 
      'O Grande Antigo (Great Old One)', 
      'A Lâmina Maldita (Hexblade)',
      'O Imortal (Undying)',
      'O Celestial (Celestial)'
    ],
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
    subclasses: [
      'Domínio da Vida (Life)', 
      'Domínio da Tempestade (Tempest)', 
      'Domínio da Guerra (War)', 
      'Domínio da Luz (Light)',
      'Domínio da Natureza (Nature)',
      'Domínio do Conhecimento (Knowledge)',
      'Domínio da Trapaça (Trickery)',
      'Domínio da Sepultura (Grave)',
      'Domínio da Força (Forge)',
      'Domínio da Morte (Death)',
      'Domínio Arcano (Arcana)'
    ],
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
    subclasses: [
      'Círculo da Terra (Land)', 
      'Círculo da Lua (Moon)', 
      'Círculo dos Sonhos (Dreams)', 
      'Círculo do Pastor (Shepherd)'
    ],
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
    subclasses: [
      'Linhagem Dracônica (Draconic)', 
      'Magia Selvagem (Wild Magic)', 
      'Alma Divina (Divine Soul)', 
      'Magia das Sombras (Shadow)',
      'Feitiçaria da Tempestade (Storm)'
    ],
  },
  {
    name: 'Guerreiro',
    hd: 'd10',
    defaultSlots: {
      1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {},
    },
    subclasses: [
      'Campeão (Champion)', 
      'Mestre de Batalha (Battle Master)', 
      'Cavaleiro Arcano (Eldritch Knight)',
      'Cavaleiro do Dragão Púrpura (Purple Dragon Knight)',
      'Arqueiro Arcano (Arcane Archer)',
      'Cavaleiro (Cavalier)',
      'Samurai'
    ],
  },
  {
    name: 'Ladino',
    hd: 'd8',
    defaultSlots: {
      1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {},
    },
    subclasses: [
      'Ladrão (Thief)', 
      'Assassino (Assassin)', 
      'Trapaceiro Arcano (Arcane Trickster)',
      'Estratégico (Mastermind)',
      'Espadachim (Swashbuckler)',
      'Inquisitivo (Inquisitive)',
      'Batedor (Scout)'
    ],
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
    subclasses: [
      'Escola de Abjuração (Abjuration)',
      'Escola de Conjuração (Conjuration)',
      'Escola de Adivinhação (Divination)',
      'Escola de Encantamento (Enchantment)',
      'Escola de Evocação (Evocation)',
      'Escola de Ilusão (Illusion)',
      'Escola de Necromancia (Necromancy)',
      'Escola de Transmutação (Transmutation)',
      'Cantor da Lâmina (Bladesinging)'
    ],
  },
  {
    name: 'Monge',
    hd: 'd8',
    defaultSlots: {
      1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {},
    },
    subclasses: [
      'Caminho da Mão Aberta (Open Hand)', 
      'Caminho das Sombras (Shadow)', 
      'Caminho dos Quatro Elementos (Four Elements)',
      'Caminho da Morte Longa (Long Death)',
      'Caminho da Alma do Sol (Sun Soul)',
      'Caminho do Mestre Bêbado (Drunken Master)',
      'Caminho do Kensei (Kensei)'
    ],
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
    subclasses: [
      'Juramento de Devoção (Devotion)', 
      'Juramento dos Anciões (Ancients)', 
      'Juramento de Vingança (Vengeance)',
      'Quebrador de Juramento (Oathbreaker)',
      'Juramento da Coroa (Crown)',
      'Juramento de Conquista (Conquest)',
      'Juramento de Redenção (Redemption)'
    ],
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
    subclasses: [
      'Caçador (Hunter)', 
      'Mestre das Bestas (Beast Master)', 
      'Caçador das Sombras (Gloom Stalker)',
      'Andarilho do Horizonte (Horizon Walker)',
      'Matador de Monstros (Monster Slayer)'
    ],
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
    subclasses: ['Alquimista (Alchemist)', 'Armeiro (Armorer)', 'Artilheiro (Artillerist)', 'Serralheiro de Combate (Battle Smith)'],
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

export const RACES_LIST = [
  'Humano', 'Anão da Colina', 'Anão da Montanha', 'Duergar', 
  'Alto Elfo', 'Elfo da Floresta', 'Drow (Elfo Negro)', 'Eladrin',
  'Halfling Pés-Leves', 'Halfling Robusto', 'Halfling Ghostwise',
  'Draconato Vermelho (Fogo)', 'Draconato Latão (Fogo)', 'Draconato Ouro (Fogo)', 
  'Draconato Azul (Eletricidade)', 'Draconato Bronze (Eletricidade)', 
  'Draconato Cobre (Ácido)', 'Draconato Preto (Ácido)', 
  'Draconato Verde (Veneno)', 'Draconato Branco (Frio)', 'Draconato Prata (Frio)',
  'Gnomo da Floresta', 'Gnomo das Rochas', 'Gnomo Profundo (Svirfneblin)',
  'Meio-Elfo', 'Meio-Elfo (Drow)', 'Meio-Elfo (Aquático)', 'Meio-Elfo (Elfo da Floresta)',
  'Meio-Orc', 'Tiefling', 'Tiefling Feral', 'Tiefling Devil\'s Tongue', 'Tiefling Hellfire', 'Tiefling Winged',
  'Aarakocra', 'Genasi da Terra', 'Genasi do Ar', 'Genasi do Fogo', 'Genasi da Água',
  'Grave Aasimar', 'Protector Aasimar', 'Fallen Aasimar', 'Scourge Aasimar',
  'Tritão', 'Goliath', 'Tabaxi', 'Goblin', 'Hobgoblin', 'Kenku', 'Orc', 'Lizardfolk', 'Firbolg', 'Yuan-ti Pureblood'
];

export const getRaceStatBonuses = (race: string): Partial<BaseStats> => {
  const r = race.toLowerCase();
  if (r.includes('humano')) return { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 };
  if (r.includes('colina') || r.includes('hill dwarf')) return { con: 2, wis: 1 };
  if (r.includes('montanha') || r.includes('mountain dwarf')) return { con: 2, str: 2 };
  if (r.includes('duergar')) return { con: 2, str: 1 };
  if (r.includes('alto elfo') || r.includes('high elf')) return { dex: 2, int: 1 };
  if (r.includes('floresta') && r.includes('elfo')) return { dex: 2, wis: 1 };
  if (r.includes('drow') || r.includes('negro')) return { dex: 2, cha: 1 };
  if (r.includes('eladrin')) return { dex: 2, cha: 1 };
  if (r.includes('pés-leves') || r.includes('lightfoot')) return { dex: 2, cha: 1 };
  if (r.includes('robusto') || r.includes('stout')) return { dex: 2, con: 1 };
  if (r.includes('ghostwise')) return { dex: 2, wis: 1 };
  if (r.includes('draconato') || r.includes('dragonborn')) return { str: 2, cha: 1 };
  if (r.includes('gnomo da floresta')) return { int: 2, dex: 1 };
  if (r.includes('gnomo das rochas')) return { int: 2, con: 1 };
  if (r.includes('svirfneblin') || r.includes('profundo')) return { int: 2, dex: 1 };
  if (r.includes('meio-elfo')) return { cha: 2, dex: 1, wis: 1 }; // Default choice +1 to two others, simplified here
  if (r.includes('meio-orc') || r.includes('half-orc')) return { str: 2, con: 1 };
  if (r.includes('feral')) return { dex: 2, int: 1 };
  if (r.includes('tiefling')) return { cha: 2, int: 1 };
  if (r.includes('aarakocra')) return { dex: 2, wis: 1 };
  if (r.includes('terra') && r.includes('genasi')) return { con: 2, str: 1 };
  if (r.includes('ar') && r.includes('genasi')) return { con: 2, dex: 1 };
  if (r.includes('fogo') && r.includes('genasi')) return { con: 2, int: 1 };
  if (r.includes('água') && r.includes('genasi')) return { con: 2, wis: 1 };
  if (r.includes('protector')) return { cha: 2, wis: 1 };
  if (r.includes('fallen')) return { cha: 2, str: 1 };
  if (r.includes('scourge') || r.includes('grave')) return { cha: 2, con: 1 };
  if (r.includes('tritão') || r.includes('triton')) return { str: 1, con: 1, cha: 1 };
  if (r.includes('goliath')) return { str: 2, con: 1 };
  if (r.includes('tabaxi')) return { dex: 2, cha: 1 };
  if (r.includes('goblin')) return { dex: 2, con: 1 };
  if (r.includes('hobgoblin')) return { con: 2, int: 1 };
  if (r.includes('kenku')) return { dex: 2, wis: 1 };
  if (r.includes('orc')) return { str: 2, con: 1 };
  if (r.includes('lizardfolk')) return { con: 2, wis: 1 };
  if (r.includes('firbolg')) return { wis: 2, str: 1 };
  if (r.includes('yuan-ti')) return { cha: 2, int: 1 };
  return {};
};

export const SKILLS_LIST = [
  'Atletismo',
  'Acrobacia', 'Prestidigitação', 'Furtividade',
  'Arcanismo', 'História', 'Investigação', 'Natureza', 'Religião',
  'Adestrar Animais', 'Intuição', 'Medicina', 'Percepção', 'Sobrevivência',
  'Enganação', 'Intimidação', 'Atuação', 'Persuasão'
];
export interface AmmunitionTemplate {
  name: string;
  type: 'ammunition';
  customResourceMax: number;
  weight?: number;
}

export const AMMUNITION_TEMPLATES: AmmunitionTemplate[] = [
  { name: 'Flechas', type: 'ammunition', customResourceMax: 20, weight: 1 },
  { name: 'Virotes de Besta', type: 'ammunition', customResourceMax: 20, weight: 1 },
  { name: 'Balas de Funda', type: 'ammunition', customResourceMax: 20, weight: 1 },
  { name: 'Agulhas de Zarabatana', type: 'ammunition', customResourceMax: 50, weight: 1 },
];


export const WEAPON_TEMPLATES: WeaponTemplate[] = [
  {
    "name": "Clava",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Leve (Light)"
    ],
    "category": "Simples",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Adaga",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Acuidade (Finesse)",
      "Leve (Light)",
      "Arremesso (dist. 20/60m)"
    ],
    "category": "Simples",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Clava Grande",
    "dmgDice": "1d8",
    "handedness": "2 Mãos",
    "dmgType": "Cortante",
    "properties": [
      "Duas Mãos"
    ],
    "category": "Simples",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Machadinha",
    "dmgDice": "1d6",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Leve (Light)",
      "Arremesso (dist. 20/60m)"
    ],
    "category": "Simples",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Azagaia",
    "dmgDice": "1d6",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Arremesso (dist. 30/120m)"
    ],
    "category": "Simples",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Light Hammer",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Leve (Light)",
      "Arremesso (dist. 20/60m)"
    ],
    "category": "Simples",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Maça",
    "dmgDice": "1d6",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [],
    "category": "Simples",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Bordão",
    "dmgDice": "1d6",
    "handedness": "Versátil",
    "dmgType": "Cortante",
    "properties": [
      "Versátil (Versatile)"
    ],
    "category": "Simples",
    "rangeType": "Corpo-a-corpo",
    "dmgDiceVersatile": "1d8"
  },
  {
    "name": "Foice Curta",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Leve (Light)"
    ],
    "category": "Simples",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Lança",
    "dmgDice": "1d6",
    "handedness": "Versátil",
    "dmgType": "Cortante",
    "properties": [
      "Arremesso (dist. 20/60m)",
      "Versátil (Versatile)"
    ],
    "category": "Simples",
    "rangeType": "Corpo-a-corpo",
    "dmgDiceVersatile": "1d8"
  },
  {
    "name": "Light Crossbow",
    "dmgDice": "1d8",
    "handedness": "2 Mãos",
    "dmgType": "Cortante",
    "properties": [
      "Munição (dist. 80/320m)",
      "Recarga",
      "Duas Mãos"
    ],
    "category": "Simples",
    "rangeType": "À Distância"
  },
  {
    "name": "Dardo",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Acuidade (Finesse)",
      "Arremesso (dist. 20/60m)"
    ],
    "category": "Simples",
    "rangeType": "À Distância"
  },
  {
    "name": "Arco Curto",
    "dmgDice": "1d6",
    "handedness": "2 Mãos",
    "dmgType": "Cortante",
    "properties": [
      "Munição (dist. 80/320m)",
      "Duas Mãos"
    ],
    "category": "Simples",
    "rangeType": "À Distância"
  },
  {
    "name": "Funda",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Munição (dist. 30/120m)"
    ],
    "category": "Simples",
    "rangeType": "À Distância"
  },
  {
    "name": "Machado de Batalha",
    "dmgDice": "1d8",
    "handedness": "Versátil",
    "dmgType": "Cortante",
    "properties": [
      "Versátil (Versatile)"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo",
    "dmgDiceVersatile": "1d10"
  },
  {
    "name": "Mangual",
    "dmgDice": "1d8",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Glaive",
    "dmgDice": "1d10",
    "handedness": "2 Mãos",
    "dmgType": "Cortante",
    "properties": [
      "Pesada (Heavy)",
      "Alcance (Reach)",
      "Duas Mãos"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Machado Grande",
    "dmgDice": "1d12",
    "handedness": "2 Mãos",
    "dmgType": "Cortante",
    "properties": [
      "Pesada (Heavy)",
      "Duas Mãos"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Espada Grande",
    "dmgDice": "2d6",
    "handedness": "2 Mãos",
    "dmgType": "Cortante",
    "properties": [
      "Pesada (Heavy)",
      "Duas Mãos"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Alabarda",
    "dmgDice": "1d10",
    "handedness": "2 Mãos",
    "dmgType": "Cortante",
    "properties": [
      "Pesada (Heavy)",
      "Alcance (Reach)",
      "Duas Mãos"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Lança de Montaria",
    "dmgDice": "1d12",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Alcance (Reach)",
      "special"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Espada Longa",
    "dmgDice": "1d8",
    "handedness": "Versátil",
    "dmgType": "Cortante",
    "properties": [
      "Versátil (Versatile)"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo",
    "dmgDiceVersatile": "1d10"
  },
  {
    "name": "Malho",
    "dmgDice": "2d6",
    "handedness": "2 Mãos",
    "dmgType": "Cortante",
    "properties": [
      "Pesada (Heavy)",
      "Duas Mãos"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Estrela da Manhã",
    "dmgDice": "1d8",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Pique",
    "dmgDice": "1d10",
    "handedness": "2 Mãos",
    "dmgType": "Cortante",
    "properties": [
      "Pesada (Heavy)",
      "Alcance (Reach)",
      "Duas Mãos"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Rapieira",
    "dmgDice": "1d8",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Acuidade (Finesse)"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Cimitarra",
    "dmgDice": "1d6",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Acuidade (Finesse)",
      "Leve (Light)"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Espada Curta",
    "dmgDice": "1d6",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Acuidade (Finesse)",
      "Leve (Light)"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Tridente",
    "dmgDice": "1d7",
    "handedness": "Versátil",
    "dmgType": "Cortante",
    "properties": [
      "Arremesso (dist. 20/60m)",
      "Versátil (Versatile)"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo",
    "dmgDiceVersatile": "1d8"
  },
  {
    "name": "Picareta de Guerra",
    "dmgDice": "1d8",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Martelo de Guerra",
    "dmgDice": "1d8",
    "handedness": "Versátil",
    "dmgType": "Cortante",
    "properties": [
      "Versátil (Versatile)"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo",
    "dmgDiceVersatile": "1d10"
  },
  {
    "name": "Chicote",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Acuidade (Finesse)",
      "Alcance (Reach)"
    ],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Zarabatana",
    "dmgDice": "1",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Munição (dist. 25/100m)",
      "Recarga"
    ],
    "category": "Marcial",
    "rangeType": "À Distância"
  },
  {
    "name": "Hand Crossbow",
    "dmgDice": "1d6",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Munição (dist. 30/120m)",
      "Leve (Light)",
      "Recarga"
    ],
    "category": "Marcial",
    "rangeType": "À Distância"
  },
  {
    "name": "Heavy Crossbow",
    "dmgDice": "1d10",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Munição (dist. 100/400m)",
      "Pesada (Heavy)",
      "Recarga"
    ],
    "category": "Marcial",
    "rangeType": "À Distância"
  },
  {
    "name": "Arco Longo",
    "dmgDice": "1d8",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "Munição (dist. 150/600m)",
      "Pesada (Heavy)",
      "Recarga"
    ],
    "category": "Marcial",
    "rangeType": "À Distância"
  },
  {
    "name": "Rede",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [
      "special",
      "Arremesso (dist. 5/15m)"
    ],
    "category": "Marcial",
    "rangeType": "À Distância"
  },
  {
    "name": "Arrows (20)",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Blowgun Needles (50)",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Crossbow Bolts (20)",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  },
  {
    "name": "Sling Bullets (20)",
    "dmgDice": "1d4",
    "handedness": "1 Mão",
    "dmgType": "Cortante",
    "properties": [],
    "category": "Marcial",
    "rangeType": "Corpo-a-corpo"
  }
];

export const ARMOR_TEMPLATES: ArmorTemplate[] = [
  {
    "name": "Leather",
    "acBonus": 11,
    "type": "armor",
    "stealthDisadvantage": false
  },
  {
    "name": "Padded",
    "acBonus": 11,
    "type": "armor",
    "stealthDisadvantage": false
  },
  {
    "name": "Studded Leather",
    "acBonus": 12,
    "type": "armor",
    "stealthDisadvantage": false
  },
  {
    "name": "Breastplate",
    "acBonus": 14,
    "type": "armor",
    "stealthDisadvantage": false
  },
  {
    "name": "Chain Shirt",
    "acBonus": 13,
    "type": "armor",
    "stealthDisadvantage": false
  },
  {
    "name": "Half Plate",
    "acBonus": 15,
    "type": "armor",
    "stealthDisadvantage": false
  },
  {
    "name": "Hide",
    "acBonus": 12,
    "type": "armor",
    "stealthDisadvantage": false
  },
  {
    "name": "Scale mail",
    "acBonus": 14,
    "type": "armor",
    "stealthDisadvantage": false
  },
  {
    "name": "Chain Mail",
    "acBonus": 16,
    "type": "armor",
    "stealthDisadvantage": false
  },
  {
    "name": "Ring Mail",
    "acBonus": 14,
    "type": "armor",
    "stealthDisadvantage": false
  },
  {
    "name": "Shield",
    "acBonus": 2,
    "type": "shield",
    "stealthDisadvantage": false
  }
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
    skills: ['Intuição', 'Religião'],
    featureName: 'Abrigo dos Fiéis (Shelter of the Faithful)',
    featureDesc: 'Você e seus companheiros podem receber cura e assistência gratuita em templos de sua fé.',
  },
  {
    name: 'Charlatão (Charlatan)',
    skills: ['Enganação', 'Prestidigitação'],
    featureName: 'Identidade Falsa (False Identity)',
    featureDesc: 'Você criou uma segunda identidade falsa completa e documentos para sustentá-la.',
  },
  {
    name: 'Criminoso (Criminal)',
    skills: ['Enganação', 'Furtividade'],
    featureName: 'Contato Criminoso (Criminal Contact)',
    featureDesc: 'Você tem um contato confiável na rede de crime e sabe como enviar e receber mensagens secretas.',
  },
  {
    name: 'Artista (Entertainer)',
    skills: ['Acrobacia', 'Atuação'],
    featureName: 'Pelo Clamor do Público (By Popular Demand)',
    featureDesc: 'Você sempre consegue encontrar um lugar para se apresentar e receber hospedagem modesta gratuita em troca.',
  },
  {
    name: 'Herói do Povo (Folk Hero)',
    skills: ['Adestrar Animais', 'Sobrevivência'],
    featureName: 'Hospitalidade Rústica (Rustic Hospitality)',
    featureDesc: 'Você encontra abrigo e ajuda fácil entre os plebeus e camponeses locais.',
  },
  {
    name: 'Artesão de Guilda (Guild Artisan)',
    skills: ['Intuição', 'Persuasão'],
    featureName: 'Filiado à Guilda (Guild Membership)',
    featureDesc: 'Sua guilda oferece abrigo, contatos políticos e patrocínio, além de assistência jurídica.',
  },
  {
    name: 'Eremita (Hermit)',
    skills: ['Medicina', 'Religião'],
    featureName: 'Descoberta Única (Discovery)',
    featureDesc: 'Você guarda um segredo, revelação ou verdade única de grande importância para o mundo.',
  },
  {
    name: 'Nobre (Noble)',
    skills: ['História', 'Persuasão'],
    featureName: 'Posição de Privilégio (Position of Privilege)',
    featureDesc: 'Você é bem-recebido pela alta sociedade e as pessoas tendem a assumir que você tem o direito de estar onde está.',
  },
  {
    name: 'Forçasteiro (Outlander)',
    skills: ['Atletismo', 'Sobrevivência'],
    featureName: 'Andarilho (Wanderer)',
    featureDesc: 'Você tem memória excelente para mapas e geografia, e consegue achar comida e água fresca para até 6 pessoas por dia.',
  },
  {
    name: 'Sábio (Sage)',
    skills: ['Arcanismo', 'História'],
    featureName: 'Pesquisador (Researcher)',
    featureDesc: 'Quando você tenta obter uma informação, se você não souber, sabe exatamente onde encontrá-la.',
  },
  {
    name: 'Marinheiro (Sailor)',
    skills: ['Atletismo', 'Percepção'],
    featureName: 'Passagem de Navio (Ship\'s Passage)',
    featureDesc: 'Você consegue passagens gratuitas para você e seu grupo em navios que você conhece.',
  },
  {
    name: 'Soldado (Soldier)',
    skills: ['Atletismo', 'Intimidação'],
    featureName: 'Patente Militar (Military Rank)',
    featureDesc: 'Soldados de patentes inferiores reconhecem sua autoridade e você pode requisitar recursos básicos.',
  },
  {
    name: 'Órfão (Urchin)',
    skills: ['Prestidigitação', 'Furtividade'],
    featureName: 'Segredos Urbanos (City Secrets)',
    featureDesc: 'Você conhece os caminhos ocultos e passagens das cidades, permitindo viajar o dobro da velocidade comum nelas fora de combate.',
  },
  // SCAG Backgrounds
  {
    name: 'Guarda da Cidade (City Watch)',
    skills: ['Atletismo', 'Intuição'],
    featureName: 'Olhar Vigilante (Watcher\'s Eye)',
    featureDesc: 'Você localiza facilmente postos de guarda locais e reconhece atividades criminosas com mais rapidez.',
  },
  {
    name: 'Artesão do Clã (Clan Crafter)',
    skills: ['História', 'Intuição'],
    featureName: 'Respeito dos Anões (Respect of the Stout Folk)',
    featureDesc: 'Você tem grande prestígio e recebe tratamento especial em qualquer comunidade de anões.',
  },
  {
    name: 'Cientista Claustrado (Cloistered Scholar)',
    skills: ['História', 'Arcanismo'], // Defaulting to two of the four choices
    featureName: 'Acesso à Biblioteca (Library Access)',
    featureDesc: 'Você tem passagem livre e privilégios de leitura em grandes bibliotecas e arquivos de conhecimento.',
  },
  {
    name: 'Cortesão (Courtier)',
    skills: ['Intuição', 'Persuasão'],
    featureName: 'Intriga da Corte (Safe Haven)',
    featureDesc: 'Você conhece a etiqueta e o funcionamento interno de cortes nobres, sabendo a quem se direcionar em assuntos burocráticos.',
  },
  {
    name: 'Agente de Facção (Faction Agent)',
    skills: ['Intuição', 'Persuasão'], // Usually Insight and one Intelligence/Wisdom/Charisma skill
    featureName: 'Refúgio Seguro (Safe Haven)',
    featureDesc: 'Você tem acesso a contatos secretos e esconderijos de sua facção aliados na região.',
  },
  {
    name: 'Viajante Distante (Far Traveler)',
    skills: ['Intuição', 'Percepção'],
    featureName: 'Olhares Curiosos (All Eyes on You)',
    featureDesc: 'Sua origem exótica atrai a atenção e curiosidade das pessoas locais, abrindo portas e despertando o interesse de nobres.',
  },
  {
    name: 'Herdeiro (Inheritor)',
    skills: ['Sobrevivência', 'História'], // Usually Survival and one other choice
    featureName: 'Herança Misteriosa (Inheritance)',
    featureDesc: 'Você possui um item ou segredo de valor inestimável deixado como herança que guarda um mistério.',
  },
  {
    name: 'Veterano Mercenário (Mercenary Veteran)',
    skills: ['Atletismo', 'Persuasão'],
    featureName: 'Vida Mercenária (Mercenary Life)',
    featureDesc: 'Você conhece os hábitos mercenários de companhias da região e consegue identificar tavernas e contratos aliados.',
  },
  {
    name: 'Caçador de Recompensas Urbano (Urban Bounty Hunter)',
    skills: ['Enganação', 'Furtividade'], // Pick two from Stealth, Deception, Insight, Persuasion
    featureName: 'Contatos Urbanos (Ear to the Ground)',
    featureDesc: 'Você possui contatos nos submundo e guildas locais, facilitando achar alvos e rastrear informações urbanas.',
  },
  // ToA Backgrounds
  {
    name: 'Antropólogo (Anthropologist)',
    skills: ['Intuição', 'Religião'],
    featureName: 'Diplomacia Cultural (Adept Linguist)',
    featureDesc: 'Você aprende rapidamente a se comunicar de forma rudimentar com tribos isoladas e decifrar intenções culturais.',
  },
  {
    name: 'Arqueólogo (Archaeologist)',
    skills: ['História', 'Sobrevivência'],
    featureName: 'Perito em Ruínas (Historical Knowledge)',
    featureDesc: 'Você consegue identificar a finalidade original de ruínas antigas e detectar a presença de passagens secretas arqueológicas.',
  }
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
    "name": "Plate",
    "type": "armor",
    "acBonus": 18,
    "rarity": "Raro",
    "description": "Plate consists of shaped, interlocking metal plates to cover the entire body. A suit of plate includes gauntlets, heavy leather boots, a visored helmet, and thick layers of padding underneath the armor. Buckles and straps distribute the weight over the body."
  },
  {
    "name": "Splint",
    "type": "armor",
    "acBonus": 17,
    "rarity": "Incomum",
    "description": "This armor is made of narrow vertical strips of metal riveted to a backing of leather that is worn over cloth padding. Flexible chain mail protects the joints."
  },
  {
    "name": "Spyglass",
    "type": "other",
    "rarity": "Raro",
    "description": "Objects viewed through a spyglass are magnified to twice their size."
  },
  {
    "name": "Assassin’s Blood",
    "type": "other",
    "rarity": "Incomum",
    "description": "A creature subjected to this poison must make a DC 10 Constitution saving throw. On a failed save, it takes 6 (1d12) poison damage and is poisoned for 24 hours. On a successful save, the creature takes half damage and isn’t poisoned."
  },
  {
    "name": "Burnt Othur Fumes",
    "type": "other",
    "rarity": "Incomum",
    "description": "A creature subjected to this poison must succeed on a DC 13 Constitution saving throw or take 10 (3d6) poison damage, and must repeat the saving throw at the start of each of its turns. On each successive failed save, the character takes 3 (1d6) poison damage. After three successful saves, the poison ends."
  },
  {
    "name": "Crawler Mucus",
    "type": "other",
    "rarity": "Incomum",
    "description": "This poison must be harvested from a dead or incapacitated crawler. A creature subjected to this poison must succeed on a DC 13 Constitution saving throw or be poisoned for 1 minute. The poisoned creature is paralyzed. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success."
  },
  {
    "name": "Drow Poison",
    "type": "other",
    "rarity": "Incomum",
    "description": "This poison is typically made only by the drow, and only in a place far removed from sunlight. A creature subjected to this poison must succeed on a DC 13 Constitution saving throw or be poisoned for 1 hour. If the saving throw fails by 5 or more, the creature is also unconscious while poisoned in this way. The creature wakes up if it takes damage or if another creature takes an action to shake it awake."
  },
  {
    "name": "Essence of Ether",
    "type": "other",
    "rarity": "Incomum",
    "description": "A creature subjected to this poison must succeed on a DC 15 Constitution saving throw or become poisoned for 8 hours. The poisoned creature is unconscious. The creature wakes up if it takes damage or if another creature takes an action to shake it awake."
  },
  {
    "name": "Malice",
    "type": "other",
    "rarity": "Incomum",
    "description": "A creature subjected to this poison must succeed on a DC 15 Constitution saving throw or become poisoned for 1 hour. The poisoned creature is blinded."
  },
  {
    "name": "Midnight Tears",
    "type": "other",
    "rarity": "Raro",
    "description": "A creature that ingests this poison suffers no effect until the stroke of midnight. If the poison has not been neutralized before then, the creature must succeed on a DC 17 Constitution saving throw, taking 31 (9d6) poison damage on a failed save, or half as much damage on a successful one."
  },
  {
    "name": "Oil of Taggit",
    "type": "other",
    "rarity": "Incomum",
    "description": "A creature subjected to this poison must succeed on a DC 13 Constitution saving throw or become poisoned for 24 hours. The poisoned creature is unconscious. The creature wakes up if it takes damage."
  },
  {
    "name": "Pale Tincture",
    "type": "other",
    "rarity": "Incomum",
    "description": "A creature subjected to this poison must succeed on a DC 16 Constitution saving throw or take 3 (1d6) poison damage and become poisoned. The poisoned creature must repeat the saving throw every 24 hours, taking 3 (1d6) poison damage on a failed save. Until this poison ends, the damage the poison deals can’t be healed by any means. After seven successful saving throws, the effect ends and the creature can heal normally."
  },
  {
    "name": "Purple Worm Poison",
    "type": "other",
    "rarity": "Raro",
    "description": "This poison must be harvested from a dead or incapacitated purple worm. A creature subjected to this poison must make a DC 19 Constitution saving throw, taking 42 (12d6) poison damage on a failed save, or half as much damage on a successful one."
  },
  {
    "name": "Serpent Venom",
    "type": "other",
    "rarity": "Incomum",
    "description": "This poison must be harvested from a dead or incapacitated giant poisonous snake. A creature subjected to this poison must succeed on a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one."
  },
  {
    "name": "Torpor",
    "type": "other",
    "rarity": "Raro",
    "description": "A creature subjected to this poison must succeed on a DC 15 Constitution saving throw or become poisoned for 4d6 hours. The poisoned creature is incapacitated."
  },
  {
    "name": "Truth Serum",
    "type": "other",
    "rarity": "Incomum",
    "description": "A creature subjected to this poison must succeed on a DC 11 Constitution saving throw or become poisoned for 1 hour. The poisoned creature can’t knowingly speak a lie, as if under the effect of a zone of truth spell."
  },
  {
    "name": "Wyvern Poison",
    "type": "other",
    "rarity": "Raro",
    "description": "This poison must be harvested from a dead or incapacitated wyvern. A creature subjected to this poison must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one."
  },
  {
    "name": "Feather Token Anchor",
    "type": "other",
    "rarity": "Raro",
    "description": "This tiny object looks like a feather. Different types of feather tokens exist, each with a different single-use effect.\n\nEffect of this token:\nYou can use an action to touch the token to a boat or ship. For the next 24 hours, the vessel can't be moved by any means. Touching the token to the vessel again ends the effect. When the effect ends, the token disappears."
  },
  {
    "name": "Philter of Love",
    "type": "other",
    "rarity": "Incomum",
    "description": "The next time you see a creature within 10 minutes after drinking this philter, you become charmed by that creature for 1 hour. If the creature is of a species and gender you are normally attracted to, you regard it as your true love while you are charmed. This potion's rose-hued, effervescent liquid contains one easy-to-miss bubble shaped like a heart."
  },
  {
    "name": "Potion of Poison",
    "type": "other",
    "rarity": "Incomum",
    "description": "This concoction looks, smells, and tastes like a potion of healing or other beneficial potion. However, it is actually poison masked by illusion magic. An identify spell reveals its true nature."
  },
  {
    "name": "Dust of Dryness (1 pellet)",
    "type": "other",
    "rarity": "Incomum",
    "description": "This small packet contains 1d6 + 4 pinches of dust. You can use an action to sprinkle a pinch of it over water. The dust turns a cube of water 15 feet on a side into one marble-sized pellet, which floats or rests near where the dust was sprinkled. The pellet's weight is negligible. Someone can use an action to smash the pellet against a hard surface, causing the pellet to shatter and release the water the dust absorbed. Doing so ends that pellet's magic. An elemental composed mostly of water that is exposed to a pinch of the dust must make a DC 13 Constitution saving throw, taking 10d6 necrotic damage on a failed save, or half as much damage on a successful one."
  },
  {
    "name": "Potion of Greater Healing",
    "type": "other",
    "rarity": "Incomum",
    "description": "You regain 4d4 + 4 hit points when you drink this potion. The potion's red liquid glimmers when agitated."
  },
  {
    "name": "Potion of Heroism",
    "type": "other",
    "rarity": "Raro",
    "description": "For 1 hour after drinking it, you gain 10 temporary hit points that last for 1 hour. For the same duration, you are under the effect of the bless spell (no concentration required). This blue potion bubbles and steams as if boiling."
  },
  {
    "name": "Potion of Invisibility",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "This potion's container looks empty but feels as though it holds liquid. When you drink it, you become invisible for 1 hour. Anything you wear or carry is invisible with you. The effect ends early if you attack or cast a spell."
  },
  {
    "name": "Potion of Mind Reading",
    "type": "other",
    "rarity": "Raro",
    "description": "When you drink this potion, you gain the effect of the detect thoughts spell (save DC 13). The potion's dense, purple liquid has an ovoid cloud of pink floating in it."
  },
  {
    "name": "Potion of Water Breathing",
    "type": "other",
    "rarity": "Incomum",
    "description": "You can breathe underwater for 1 hour after drinking this potion. Its cloudy green fluid smells of the sea and has a jellyfish-like bubble floating in it."
  },
  {
    "name": "Marvelous Pigments",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "Typically found in 1d4 pots inside a fine wooden box with a brush (weighing 1 pound in total), these pigments allow you to create three-dimensional objects by painting them in two dimensions. The paint flows from the brush to form the desired object as you concentrate on its image."
  },
  {
    "name": "Potion of Animal Friendship",
    "type": "other",
    "rarity": "Incomum",
    "description": "When you drink this potion, you can cast the animal friendship spell (save DC 13) for 1 hour at will. Agitating this muddy liquid brings little bits into view: a fish scale, a hummingbird tongue, a cat claw, or a squirrel hair."
  },
  {
    "name": "Feather Token Fan",
    "type": "other",
    "rarity": "Raro",
    "description": "This tiny object looks like a feather. Different types of feather tokens exist, each with a different single-use effect.\n\nEffect of this token:\nIf you are on a boat or ship, you can use an action to toss the token up to 10 feet in the air. The token disappears, and a giant flapping fan takes its place. The fan floats and creates a wind strong enough to fill the sails of one ship, increasing its speed by 5 miles per hour for 8 hours. You can dismiss the fan as an action."
  },
  {
    "name": "Feather Token Whip",
    "type": "other",
    "rarity": "Raro",
    "description": "This tiny object looks like a feather. Different types of feather tokens exist, each with a different single-use effect.\n\nEffect of this token:\nYou can use an action to throw the token to a point within 10 feet of you. The token disappears, and a floating whip takes its place. You can then use a Bonus Action to make a melee spell Attack against a creature within 10 feet of the whip, with an Attack bonus of +9. On a hit, the target takes 1d6 + 5 force damage.\nAs a Bonus Action on Your Turn, you can direct the whip to fly up to 20 feet and repeat the Attack against a creature within 10 feet of it. The whip disappears after 1 hour, when you use an action to dismiss it, or when you are incapacitated or die."
  },
  {
    "name": "Potion of Diminution",
    "type": "other",
    "rarity": "Raro",
    "description": "When you drink this potion, you gain the reduce effect of the enlarge/reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it. Shaking the bottle fails to interrupt this process."
  },
  {
    "name": "Potion of Growth",
    "type": "other",
    "rarity": "Incomum",
    "description": "When you drink this potion, you gain the enlarge effect of the enlarge/reduce spell for 1d4 hours (no concentration required). The red in the potion's liquid continuously expands from a tiny bead to color the clear liquid around it and then contracts. Shaking the bottle fails to interrupt this process."
  },
  {
    "name": "Dust of Disappearance",
    "type": "other",
    "rarity": "Incomum",
    "description": "Found in a small packet, this powder resembles very fine sand. There is enough of it for one use. When you use an action to throw the dust into the air, you and each creature and object within 10 feet of you become invisible for 2d4 minutes. The duration is the same for all subjects, and the dust is consumed when its magic takes effect. If a creature affected by the dust attacks or casts a spell, the invisibility ends for that creature."
  },
  {
    "name": "Potion of Gaseous Form",
    "type": "other",
    "rarity": "Raro",
    "description": "When you drink this potion, you gain the effect of the gaseous form spell for 1 hour (no concentration required) or until you end the effect as a bonus action. This potion's container seems to hold fog that moves and pours like water."
  },
  {
    "name": "Potion of Resistance",
    "type": "other",
    "rarity": "Incomum",
    "description": "When you drink this potion, you gain resistance to one type of damage for 1 hour. The GM chooses the type or determines it randomly from the options below.d10Damage Typed10Damage Type1Acid6Necrotic2Cold7Poison3Fire8Psychic4Force9Radiant5Lightning10Thunder"
  },
  {
    "name": "Universal Solvent",
    "type": "other",
    "rarity": "Lendário",
    "description": "This tube holds milky liquid with a strong alcohol smell. You can use an action to pour the contents of the tube onto a surface within reach. The liquid instantly dissolves up to 1 square foot of adhesive it touches, including sovereign glue."
  },
  {
    "name": "Vicious Club",
    "type": "weapon",
    "dmgDice": "1d4",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "When you roll a 20 on your attack roll with this magic weapon, your critical hit deals an extra 2d6 damage of the weapon's type."
  },
  {
    "name": "Vicious Dagger",
    "type": "weapon",
    "dmgDice": "1d4",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "When you roll a 20 on your attack roll with this magic weapon, your critical hit deals an extra 2d6 damage of the weapon's type."
  },
  {
    "name": "Vicious Javelin",
    "type": "weapon",
    "dmgDice": "1d6",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "When you roll a 20 on your attack roll with this magic weapon, your critical hit deals an extra 2d6 damage of the weapon's type."
  },
  {
    "name": "Vicious Sickle",
    "type": "weapon",
    "dmgDice": "1d4",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "When you roll a 20 on your attack roll with this magic weapon, your critical hit deals an extra 2d6 damage of the weapon's type."
  },
  {
    "name": "Vicious Shortbow",
    "type": "weapon",
    "dmgDice": "1d6",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "When you roll a 20 on your attack roll with this magic weapon, your critical hit deals an extra 2d6 damage of the weapon's type."
  },
  {
    "name": "Vicious Battleaxe",
    "type": "weapon",
    "dmgDice": "1d8",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "When you roll a 20 on your attack roll with this magic weapon, your critical hit deals an extra 2d6 damage of the weapon's type."
  },
  {
    "name": "Vicious Greatsword",
    "type": "weapon",
    "dmgDice": "2d6",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "When you roll a 20 on your attack roll with this magic weapon, your critical hit deals an extra 2d6 damage of the weapon's type."
  },
  {
    "name": "Potion of Speed",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "When you drink this potion, you gain the effect of the haste spell for 1 minute (no concentration required). The potion's yellow fluid is streaked with black and swirls on its own."
  },
  {
    "name": "Sovereign Glue",
    "type": "other",
    "rarity": "Lendário",
    "description": "This viscous, milky-white substance can form a permanent adhesive bond between any two objects. It must be stored in a jar or flask that has been coated inside with oil of slipperiness. When found, a container contains 1d6 + 1 ounces. One ounce of the glue can cover a 1-foot square surface. The glue takes 1 minute to set. Once it has done so, the bond it creates can be broken only by the application of universal solvent or oil of etherealness, or with a wish spell."
  },
  {
    "name": "Ivory Goat (Travail)",
    "type": "other",
    "rarity": "Raro",
    "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn’t enough space for the creature, the figurine doesn’t become a creature.\n\nIvory Goats. These ivory statuettes of goats are always created in sets of three. Each goat looks unique and functions differently from the others.\n\nThe goat of travail becomes a giant goat for up to 3 hours. Once it has been used, it can't be used again until 30 days have passed."
  },
  {
    "name": "Horn of Blasting",
    "type": "other",
    "rarity": "Raro",
    "description": "You can use an action to speak the horn's command word and then blow the horn, which emits a thunderous blast in a 30-foot cone that is audible 600 feet away. Each creature in the cone must make a DC 15 Constitution saving throw. On a failed save, a creature takes 5d6 thunder damage and is deafened for 1 minute. On a successful save, a creature takes half as much damage and isn't deafened. Creatures and objects made of glass or crystal have disadvantage on the saving throw and take 10d6 thunder damage instead of 5d6.\nEach use of the horn's magic has a 20 percent chance of causing the horn to explode. The explosion deals 10d6 fire damage to the blower and destroys the horn."
  },
  {
    "name": "Potion of Superior Healing",
    "type": "other",
    "rarity": "Raro",
    "description": "You regain 8d4 + 8 hit points when you drink this potion. The potion's red liquid glimmers when agitated."
  },
  {
    "name": "Dust of Sneezing and Choking",
    "type": "other",
    "rarity": "Incomum",
    "description": "Found in a small container, this powder resembles very fine sand. It appears to be dust of disappearance, and an identify spell reveals it to be such. There is enough of it for one use. When you use an action to throw a handful of the dust into the air, you and each creature that needs to breathe within 30 feet of you must succeed on a DC 15 Constitution saving throw or become unable to breathe, while sneezing uncontrollably. A creature affected in this way is incapacitated and suffocating. As long as it is conscious, a creature can repeat the saving throw at the end of each of its turns, ending the effect on it on a success. The lesser restoration spell can also end the effect on a creature."
  },
  {
    "name": "Necklace of Fireballs",
    "type": "other",
    "rarity": "Raro",
    "description": "This necklace has 1d6 + 3 beads hanging from it. You can use an action to detach a bead and throw it up to 60 feet away. When it reaches the end of its trajectory, the bead detonates as a 3rd-level fireball spell (save DC 15). You can hurl multiple beads, or even the whole necklace, as one action. When you do so, increase the level of the fireball by 1 for each bead beyond the first."
  },
  {
    "name": "Oil of Slipperiness",
    "type": "other",
    "rarity": "Incomum",
    "description": "This sticky black unguent is thick and heavy in the container, but it flows quickly when poured. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of a freedom of movement spell for 8 hours.\nAlternatively, the oil can be poured on the ground as an action, where it covers a 10-foot square, duplicating the effect of the grease spell in that area for 8 hours."
  },
  {
    "name": "Potion of Flying",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "When you drink this potion, you gain a flying speed equal to your walking speed for 1 hour and can hover. If you're in the air when the potion wears off, you fall unless you have some other means of staying aloft. This potion's clear liquid floats at the top of its container and has cloudy white impurities drifting in it."
  },
  {
    "name": "Adamantine Chain Mail",
    "type": "armor",
    "acBonus": 14,
    "rarity": "Incomum",
    "description": "This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit."
  },
  {
    "name": "Adamantine Breastplate",
    "type": "armor",
    "acBonus": 16,
    "rarity": "Incomum",
    "description": "This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any critical hit against you becomes a normal hit."
  },
  {
    "name": "Helm of Comprehending Languages",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this helm, you can use an action to cast the comprehend languages spell from it at will."
  },
  {
    "name": "Golden Lion",
    "type": "other",
    "rarity": "Raro",
    "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn't enough space for the creature, the figurine doesn't become a creature.\n\nThe creature is friendly to you and your companions. It understands your languages and obeys your spoken commands. If you issue no commands, the creature defends itself but takes no other actions.\n\nThe creature exists for a duration specific to each figurine. At the end of the duration, the creature reverts to its figurine form. It reverts to a figurine early if it drops to 0 hit points or if you use an action to speak the command word again while touching it. When the creature becomes a figurine again, its property can't be used again until a certain amount of time has passed, as specified in the figurine's description.\n\nGolden Lions. These gold statuettes of lions are always created in pairs. You can use one figurine or both simultaneously. Each can become a lion for up to 1 hour. Once a lion has been used, it can't be used again until 7 days have passed."
  },
  {
    "name": "Trident of Fish Command",
    "type": "weapon",
    "dmgDice": "1d7",
    "dmgType": "Cortante",
    "rarity": "Incomum",
    "description": "This trident is a magic weapon. It has 3 charges. While you carry it, you can use an action and expend 1 charge to cast dominate beast (save DC 15) from it. on a beast that has an innate swimming speed. The trident regains 1d3 expended charges daily at dawn."
  },
  {
    "name": "Bead of Force",
    "type": "other",
    "rarity": "Raro",
    "description": "This small black sphere measures 3/4 of an inch in diameter and weighs an ounce. Typically, 1d4 + 4 beads of force are found together. You can use an action to throw the bead up to 60 feet. The bead explodes on impact and is destroyed. Each creature within a 10-foot radius of where the bead landed must succeed on a DC 15 Dexterity saving throw or take 5d4 force damage. A sphere of transparent force then encloses the area for 1 minute. Any creature that failed the save and is completely within the area is trapped inside this sphere. Creatures that succeeded on the save, or are partially within the area, are pushed away from the center of the sphere until they are no longer inside it. Only breathable air can pass through the sphere's wall. No attack or other effect can. An enclosed creature can use its action to push against the sphere's wall, moving the sphere up to half the creature's walking speed. The sphere can be picked up, and its magic causes it to weigh only 1 pound, regardless of the weight of creatures inside."
  },
  {
    "name": "Elemental Gem",
    "type": "other",
    "rarity": "Incomum",
    "description": "This gem contains a mote of elemental energy. When you use an action to break the gem, an elemental is summoned as if you had cast the conjure elemental spell, and the gem's magic is lost. The type of gem determines the elemental summoned by the spell. GemSummoned ElementalBlue sapphireAir elementalYellow diamondEarth elementalRed corundumFire elementalEmeraldWater elemental"
  },
  {
    "name": "Potion of Clairvoyance",
    "type": "other",
    "rarity": "Raro",
    "description": "When you drink this potion, you gain the effect of the clairvoyance spell. An eyeball bobs in this yellowish liquid but vanishes when the potion is opened."
  },
  {
    "name": "Potion of Vitality",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "When you drink this potion, it removes any exhaustion you are suffering and cures any disease or poison affecting you. For the next 24 hours, you regain the maximum number of hit points for any Hit Die you spend. The potion's crimson liquid regularly pulses with dull light, calling to mind a heartbeat."
  },
  {
    "name": "Greatsword of Life-Stealing",
    "type": "weapon",
    "dmgDice": "2d6",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 3d6 necrotic damage, provided that the target isn't a construct or an undead. You gain temporary hit points equal to the extra damage dealt."
  },
  {
    "name": "Shortsword of Life-Stealing",
    "type": "weapon",
    "dmgDice": "1d6",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 3d6 necrotic damage, provided that the target isn't a construct or an undead. You gain temporary hit points equal to the extra damage dealt."
  },
  {
    "name": "Eversmoking Bottle",
    "type": "other",
    "rarity": "Incomum",
    "description": "Smoke leaks from the lead-stoppered mouth of this brass bottle, which weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke pours out in a 60-­foot radius from the bottle. The cloud's area is heavily obscured. Each minute the bottle remains open and within the cloud, the radius increases by 10 feet until it reaches its maximum radius of 120 feet.\nThe cloud persists as long as the bottle is open. Closing the bottle requires you to speak its Command Word as an action. Once the bottle is closed, the cloud disperses after 10 minutes. A moderate wind (11 to 20 miles per hour) can also disperse the smoke after 1 minute, and a strong wind (21 or more miles per hour) can do so after 1 round."
  },
  {
    "name": "Ioun Stone of Sustenance",
    "type": "other",
    "rarity": "Raro",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: You don't need to eat or drink while this clear spindle orbits your head."
  },
  {
    "name": "Ring of Warmth",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this ring, you have resistance to cold damage. In addition, you and everything you wear and carry are unharmed by temperatures as low as −50 degrees Fahrenheit."
  },
  {
    "name": "Ivory Goat of Traveling",
    "type": "other",
    "rarity": "Raro",
    "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn’t enough space for the creature, the figurine doesn’t become a creature.\n\nIvory Goats. These ivory statuettes of goats are always created in sets of three. Each goat looks unique and functions differently from the others.\n\nThe goat of traveling can become a Large goat with the same statistics as a riding horse. It has 24 charges, and each hour or portion thereof it spends in beast form costs 1 charge. While it has charges, you can use it as often as you wish. When it runs out of charges, it reverts to a figurine and can't be used again until 7 days have passed, when it regains all its charges."
  },
  {
    "name": "Ioun Stone of Protection",
    "type": "other",
    "rarity": "Raro",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: You gain a +1 bonus to AC while this dusty rose prism orbits your head."
  },
  {
    "name": "Potion of Supreme Healing",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "You regain 10d4 + 20 hit points when you drink this potion. The potion's red liquid glimmers when agitated."
  },
  {
    "name": "Chime of Opening",
    "type": "other",
    "rarity": "Raro",
    "description": "This hollow metal tube measures about 1 foot long and weighs 1 pound. You can strike it as an action, pointing it at an object within 120 feet of you that can be opened, such as a door, lid, or lock. The Chime issues a clear tone, and one lock or latch on the object opens unless the sound can't reach the object. If no locks or latches remain, the object itself opens. The chime can be used ten times. After the tenth time, it cracks and becomes useless."
  },
  {
    "name": "Bracers of Archery",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing these bracers, you have proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons."
  },
  {
    "name": "Circlet of Blasting",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this circlet, you can use an action to cast the scorching ray spell with it. When you make the spell's attacks, you do so with an attack bonus of +5. The circlet can't be used this way again until the next dawn."
  },
  {
    "name": "Javelin of Lightning",
    "type": "weapon",
    "dmgDice": "1d6",
    "dmgType": "Cortante",
    "rarity": "Incomum",
    "description": "This javelin is a magic weapon. When you hurl it and speak its command word, it transforms into a bolt of lightning, forming a line 5 feet wide that extends out from you to a target within 120 feet. Each creature in the line excluding you and the target must make a DC 13 Dexterity saving throw, taking 4d6 lightning damage on a failed save, and half as much damage on a successful one. The lightning bolt turns back into a javelin when it reaches the target. Make a ranged weapon attack against the target. On a hit, the target takes damage from the javelin plus 4d6 lightning damage. The javelin's property can't be used again until the next dawn. In the meantime, the javelin can still be used as a magic weapon."
  },
  {
    "name": "Wind Fan",
    "type": "other",
    "rarity": "Incomum",
    "description": "While holding this fan, you can use an action to cast the gust of wind spell (save DC 13) from it. Once used, the fan shouldn't be used again until the next dawn. Each time it is used again before then, it has a cumulative 20 percent chance of not working and tearing into useless, nonmagical tatters."
  },
  {
    "name": "Goggles of Night",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing these dark lenses, you have darkvision out to a range of 60 feet. If you already have darkvision, wearing the goggles increases its range by 60 feet."
  },
  {
    "name": "Horseshoes of a Zephyr",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "These iron horseshoes come in a set of four. While all four shoes are affixed to the hooves of a horse or similar creature, they allow the creature to move normally while floating 4 inches above the ground. This effect means the creature can cross or stand above nonsolid or unstable surfaces, such as water or lava. The creature leaves no tracks and ignores difficult terrain. In addition, the creature can move at normal speed for up to 12 hours a day without suffering exhaustion from a forced march."
  },
  {
    "name": "Necklace of Adaptation",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this necklace, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors (such as cloudkill and stinking cloud effects, inhaled poisons, and the breath weapons of some dragons)."
  },
  {
    "name": "Ring of Water Walking",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this ring, you can stand on and move across any liquid surface as if it were solid ground."
  },
  {
    "name": "Wand of Magic Detection",
    "type": "other",
    "rarity": "Incomum",
    "description": "This wand has 3 charges. While holding it, you can expend 1 charge as an action to cast the detect magic spell from it. The wand regains 1d3 expended charges daily at dawn."
  },
  {
    "name": "Wand of Secrets",
    "type": "other",
    "rarity": "Incomum",
    "description": "The wand has 3 charges. While holding it, you can use an action to expend 1 of its charges, and if a secret door or trap is within 30 feet of you, the wand pulses and points at the one nearest to you. The wand regains 1d3 expended charges daily at dawn."
  },
  {
    "name": "Greatsword of Sharpness",
    "type": "weapon",
    "dmgDice": "2d6",
    "dmgType": "Cortante",
    "rarity": "Muito Raro",
    "description": "When you attack an object with this magic sword and hit, maximize your weapon damage dice against the target. When you attack a creature with this weapon and roll a 20 on the attack roll, that target takes an extra 4d6 slashing damage. Then roll another d20. If you roll a 20, you lop off one of the target's limbs, with the effect of such loss determined by the GM. If the creature has no limb to sever, you lop off a portion of its body instead. In addition, you can speak the sword's command word to cause the blade to shed bright light in a 10-foot radius and dim light for an additional 10 feet. Speaking the command word again or sheathing the sword puts out the light."
  },
  {
    "name": "Oil of Etherealness",
    "type": "other",
    "rarity": "Raro",
    "description": "Beads of this cloudy gray oil form on the outside of its container and quickly evaporate. The oil can cover a Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the etherealness spell for 1 hour."
  },
  {
    "name": "Dancing Scimitar",
    "type": "weapon",
    "dmgDice": "1d6",
    "dmgType": "Cortante",
    "rarity": "Muito Raro",
    "description": "You can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls. While the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it. After the hovering sword attacks for the fourth time, it flies up to 30 feet and tries to return to your hand. If you have no hand free, it falls to the ground at your feet. If the sword has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or move more than 30 feet away from it."
  },
  {
    "name": "Dancing Rapier",
    "type": "weapon",
    "dmgDice": "1d8",
    "dmgType": "Cortante",
    "rarity": "Muito Raro",
    "description": "You can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of it. The sword uses your attack roll and ability score modifier to damage rolls. While the sword hovers, you can use a bonus action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same bonus action, you can cause the sword to attack one creature within 5 feet of it. After the hovering sword attacks for the fourth time, it flies up to 30 feet and tries to return to your hand. If you have no hand free, it falls to the ground at your feet. If the sword has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or move more than 30 feet away from it."
  },
  {
    "name": "Glamoured Studded Leather",
    "type": "armor",
    "acBonus": 12,
    "rarity": "Raro",
    "description": "While wearing this armor, you gain a +1 bonus to AC. You can also use a bonus action to speak the armor's command word and cause the armor to assume the appearance of a normal set of clothing or some other kind of armor. You decide what it looks like, including color, style, and accessories, but the armor retains its normal bulk and weight. The illusory appearance lasts until you use this property again or remove the armor."
  },
  {
    "name": "Pipes of the Sewers",
    "type": "other",
    "rarity": "Incomum",
    "description": "You must be proficient with wind instruments to use these pipes. While you are attuned to the pipes, ordinary rats and giant rats are indifferent toward you and will not attack you unless you threaten or harm them."
  },
  {
    "name": "Longsword of Wounding",
    "type": "weapon",
    "dmgDice": "1d8",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "Hit points lost to this weapon's damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means. Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature's turns, it takes 1d4 necrotic damage for each time you've wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success."
  },
  {
    "name": "Dagger of Wounding",
    "type": "weapon",
    "dmgDice": "1d4",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "Hit points lost to this weapon's damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means. Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target. At the start of each of the wounded creature's turns, it takes 1d4 necrotic damage for each time you've wounded it, and it can then make a DC 15 Constitution saving throw, ending the effect of all such wounds on itself on a success. Alternatively, the wounded creature, or a creature within 5 feet of it, can use an action to make a DC 15 Wisdom (Medicine) check, ending the effect of such wounds on it on a success."
  },
  {
    "name": "Gloves of Swimming and Climbing",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing these gloves, climbing and swimming don't cost you extra movement, and you gain a +5 bonus to Strength (Athletics) checks made to climb or swim."
  },
  {
    "name": "Handy Haversack",
    "type": "other",
    "rarity": "Raro",
    "description": "This backpack has a central pouch and two side pouches, each of which is an extradimensional space. Each side pouch can hold up to 20 pounds of material, not exceeding a volume of 2 cubic feet. The large central pouch can hold up to 8 cubic feet or 80 pounds of material. The backpack always weighs 5 pounds, regardless of its contents. Placing an object in the haversack follows the normal rules for interacting with objects. Retrieving an item from the haversack requires you to use an action. When you reach into the haversack for a specific item, the item is always magically on top."
  },
  {
    "name": "Rope of Climbing",
    "type": "other",
    "rarity": "Incomum",
    "description": "This 60-foot length of silk rope weighs 3 pounds and can hold up to 3,000 pounds. If you hold one end of the rope and use an action to speak the command word, the rope animates. As a bonus action, you can command the other end to move toward a destination you choose. That end moves 10 feet on your turn when you first command it and 10 feet on each of your turns until reaching its destination, up to its maximum length away, or until you tell it to stop. You can also tell the rope to fasten itself securely to an object or to unfasten itself, to knot or unknot itself, or to coil itself for carrying. If you tell the rope to knot, large knots appear at 1-foot intervals along the rope. While knotted, the rope shortens to a 50-foot length and grants advantage on checks made to climb it. The rope has AC 20 and 20 hit points. It regains 1 hit point every 5 minutes as long as it has at least 1 hit point. If the rope drops to 0 hit points, it is destroyed."
  },
  {
    "name": "Ring of Feather Falling",
    "type": "other",
    "rarity": "Raro",
    "description": "When you fall while wearing this ring, you descend 60 feet per round and take no damage from falling."
  },
  {
    "name": "Staff of the Python",
    "type": "other",
    "rarity": "Incomum",
    "description": "You can use an action to speak this staff's command word and throw the staff on the ground within 10 feet of you. The staff becomes a giant constrictor snake under your control and acts on its own initiative count. By using a bonus action to speak the command word again, you return the staff to its normal form in a space formerly occupied by the snake. On your turn, you can mentally command the snake if it is within 60 feet of you and you aren't incapacitated. You decide what action the snake takes and where it moves during its next turn, or you can issue it a general command, such as to attack your enemies or guard a location. If the snake is reduced to 0 hit points, it dies and reverts to its staff form. The staff then shatters and is destroyed. If the snake reverts to staff form before losing all its hit points, it regains all of them."
  },
  {
    "name": "Frost Brand Greatsword",
    "type": "weapon",
    "dmgDice": "2d6",
    "dmgType": "Cortante",
    "rarity": "Muito Raro",
    "description": "When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage. In freezing temperatures, the blade sheds bright light in a 10-foot radius and dim light for an additional 10 feet. When you draw this weapon, you can extinguish all nonmagical flames within 30 feet of you. This property can be used no more than once per hour."
  },
  {
    "name": "Ioun Stone of Absorption",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: While this pale lavender ellipsoid orbits your head, you can use your reaction to cancel a spell of 4th level or lower cast by a creature you can see and targeting only you."
  },
  {
    "name": "Dagger of Venom",
    "type": "weapon",
    "dmgDice": "1d4",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "You gain a +1 bonus to attack and damage rolls made with this magic weapon. You can use an action to cause thick, black poison to coat the blade. The poison remains for 1 minute or until an attack using this weapon hits a creature. That creature must succeed on a DC 15 Constitution saving throw or take 2d10 poison damage and become poisoned for 1 minute. The dagger can't be used this way again until the next dawn."
  },
  {
    "name": "Boots of Elvenkind",
    "type": "other",
    "rarity": "Incomum",
    "description": "While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently."
  },
  {
    "name": "Eyes of Minute Seeing",
    "type": "other",
    "rarity": "Incomum",
    "description": "These crystal lenses fit over the eyes. While wearing them, you can see much better than normal out to a range of 1 foot. You have advantage on Intelligence (Investigation) checks that rely on sight while searching an area or studying an object within that range."
  },
  {
    "name": "Eyes of the Eagle",
    "type": "other",
    "rarity": "Incomum",
    "description": "These crystal lenses fit over the eyes. While wearing them, you have advantage on Wisdom (Perception) checks that rely on sight. In conditions of clear visibility, you can make out details of even extremely distant creatures and objects as small as 2 feet across."
  },
  {
    "name": "Ring of Jumping",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this ring, you can cast the jump spell from it as a bonus action at will, but can target only yourself when you do so."
  },
  {
    "name": "Feather Token Bird",
    "type": "other",
    "rarity": "Raro",
    "description": "This tiny object looks like a feather. Different types of feather tokens exist, each with a different single-use effect.\n\nEffect of this token:\nYou can use an action to toss the token 5 feet into the air. The token disappears and an enormous, multicolored bird takes its place. The bird has the Statistics of a roc, but it obeys your simple commands and can't Attack. It can carry up to 500 pounds while flying at its maximum speed (16 miles an hour for a maximum of 144 miles per day, with a one-hour rest for every 3 hours of flying), or 1,000 pounds at half that speed. The bird disappears after flying its maximum distance for a day or if it drops to 0 Hit Points. You can dismiss the bird as an action."
  },
  {
    "name": "Feather Token Swan Boat",
    "type": "other",
    "rarity": "Raro",
    "description": "This tiny object looks like a feather. Different types of feather tokens exist, each with a different single-use effect.\n\nEffect of this token:\nYou can use an action to touch the token to a body of water at least 60 feet in diameter. The token disappears, and a 50-foot-long, 20-foot-wide boat shaped like a swan takes its place. The boat is self-propelled and moves across water at a speed of 6 miles per hour. You can use an action while on the boat to Command it to move or to turn up to 90 degrees. The boat can carry up to thirty-two Medium or smaller creatures. A Large creature counts as four Medium creatures, while a Huge creature counts as nine. The boat remains for 24 hours and then disappears. You can dismiss the boat as an action."
  },
  {
    "name": "Gloves of Missile Snaring",
    "type": "other",
    "rarity": "Incomum",
    "description": "These gloves seem to almost meld into your hands when you don them. When a ranged weapon attack hits you while you're wearing them, you can use your reaction to reduce the damage by 1d10 + your Dexterity modifier, provided that you have a free hand. If you reduce the damage to 0, you can catch the missile if it is small enough for you to hold in that hand."
  },
  {
    "name": "Ioun Stone of Agility",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: Your Dexterity score increases by 2, to a maximum of 20, while this deep red sphere orbits your head."
  },
  {
    "name": "Ioun Stone of Fortitude",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: Your Constitution score increases by 2, to a maximum of 20, while this pink rhomboid orbits your head."
  },
  {
    "name": "Ioun Stone of Insight",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: Your Wisdom score increases by 2, to a maximum of 20, while this incandescent blue sphere orbits your head."
  },
  {
    "name": "Ioun Stone of Intellect",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: Your Intelligence score increases by 2, to a maximum of 20, while this marbled scarlet and blue sphere orbits your head."
  },
  {
    "name": "Ioun Stone of Leadership",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: Your Charisma score increases by 2, to a maximum of 20, while this marbled pink and green sphere orbits your head."
  },
  {
    "name": "Ioun Stone of Strength",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: Your Strength score increases by 2, to a maximum of 20, while this pale blue rhomboid orbits your head."
  },
  {
    "name": "Staff of Withering",
    "type": "other",
    "rarity": "Raro",
    "description": "This staff has 3 charges and regains 1d3 expended charges daily at dawn.\nThe staff can be wielded as a magic quarterstaff. On a hit, it deals damage as a normal quarterstaff, and you can expend 1 charge to deal an extra 2d10 necrotic damage to the target. In addition, the target must succeed on a DC 15 Constitution saving throw or have disadvantage for 1 hour on any ability check or saving throw that uses Strength or Constitution."
  },
  {
    "name": "Dimensional Shackles",
    "type": "other",
    "rarity": "Raro",
    "description": "You can use an action to place these shackles on an incapacitated creature. The shackles adjust to fit a creature of Small to Large size. In addition to serving as mundane manacles, the shackles prevent a creature bound by them from using any method of extradimensional movement, including teleportation or travel to a different plane of existence. They don't prevent the creature from passing through an interdimensional portal. You and any creature you designate when you use the shackles can use an action to remove them. Once every 30 days, the bound creature can make a DC 30 Strength (Athletics) check. On a success, the creature breaks free and destroys the shackles."
  },
  {
    "name": "Eyes of Charming",
    "type": "other",
    "rarity": "Incomum",
    "description": "These crystal lenses fit over the eyes. They have 3 charges. While wearing them, you can expend 1 charge as an action to cast the charm person spell (save DC 13) on a humanoid within 30 feet of you, provided that you and the target can see each other. The lenses regain all expended charges daily at dawn."
  },
  {
    "name": "Medallion of Thoughts",
    "type": "other",
    "rarity": "Incomum",
    "description": "The medallion has 3 charges. While wearing it, you can use an action and expend 1 charge to cast the detect thoughts spell (save DC 13) from it. The medallion regains 1d3 expended charges daily at dawn."
  },
  {
    "name": "Ring of Swimming",
    "type": "other",
    "rarity": "Incomum",
    "description": "You have a swimming speed of 40 feet while wearing this ring."
  },
  {
    "name": "Onyx Dog",
    "type": "other",
    "rarity": "Raro",
    "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn’t enough space for the creature, the figurine doesn’t become a creature.\n\nThis onyx statuette of a dog can become a mastiff for up to 6 hours. The mastiff has an Intelligence of 8 and can speak Common. It also has darkvision out to a range of 60 feet and can see invisible creatures and objects within that range. Once it has been used, it can't be used again until 7 days have passed."
  },
  {
    "name": "Oil of Sharpness",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "This clear, gelatinous oil sparkles with tiny, ultrathin silver shards. The oil can coat one slashing or piercing weapon or up to 5 pieces of slashing or piercing ammunition. Applying the oil takes 1 minute. For 1 hour, the coated item is magical and has a +3 bonus to attack and damage rolls."
  },
  {
    "name": "Cloak of Protection",
    "type": "other",
    "rarity": "Incomum",
    "description": "You gain a +1 bonus to AC and saving throws while you wear this cloak."
  },
  {
    "name": "Oathbow",
    "type": "weapon",
    "dmgDice": "1d8",
    "dmgType": "Cortante",
    "rarity": "Muito Raro",
    "description": "When you nock an arrow on this bow, it whispers in Elvish, Swift defeat to my enemies. When you use this weapon to make a ranged attack, you can, as a command phrase, say, Swift death to you who have wronged me. The target of your attack becomes your sworn enemy until it dies or until dawn seven days later. You can have only one such sworn enemy at a time. When your sworn enemy dies, you can choose a new one after the next dawn. \n\nWhen you make a ranged attack roll with this weapon against your sworn enemy, you have advantage on the roll. In addition, your target gains no benefit from cover, other than total cover, and you suffer no disadvantage due to long range. If the attack hits, your sworn enemy takes an extra 3d6 piercing damage. \n\n While your sworn enemy lives, you have disadvantage on attack rolls with all other weapons. \n\n Proficiency with a longbow allows you to add your proficiency bonus to the attack roll for any attack you make with it."
  },
  {
    "name": "Ring of Protection",
    "type": "other",
    "rarity": "Raro",
    "description": "You gain a +1 bonus to AC and saving throws while wearing this ring."
  },
  {
    "name": "Boots of Speed",
    "type": "other",
    "rarity": "Raro",
    "description": "While you wear these boots, you can use a bonus action and click the boots' heels together. If you do, the boots double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll. If you click your heels together again, you end the effect. When the boots' property has been used for a total of 10 minutes, the magic ceases to function until you finish a long rest."
  },
  {
    "name": "Dragon Scale Mail",
    "type": "armor",
    "acBonus": 14,
    "rarity": "Muito Raro",
    "description": "Dragon scale mail is made of the scales of one kind of dragon. Sometimes dragons collect their cast-off scales and gift them to humanoids. Other times, hunters carefully skin and preserve the hide of a dead dragon. In either case, dragon scale mail is highly valued. While wearing this armor, you gain a +1 bonus to AC, you have advantage on saving throws against the Frightful Presence and breath weapons of dragons, and you have resistance to one damage type that is determined by the kind of dragon that provided the scales (see the table). Additionally, you can focus your senses as an action to magically discern the distance and direction to the closest dragon within 30 miles of you that is of the same type as the armor. This special action can't be used again until the next dawn.DragonResistanceDragonResistanceBlackAcidGoldFireBlueLightningGreenPoisonBrassFireRedFireBronzeLightningSilverColdCopperAcidWhiteCold\n"
  },
  {
    "name": "Elven Chain",
    "type": "armor",
    "acBonus": 13,
    "rarity": "Raro",
    "description": "You gain a +1 bonus to AC while you wear this armor. You are considered proficient with this armor even if you lack proficiency with medium armor.\n\nMade of interlocking metal rings, a chain shirt is worn between layers of clothing or leather. This armor offers modest protection to the wearer's upper body and allows the sound of the rings rubbing against one another to be muffled by outer layers."
  },
  {
    "name": "Ioun Stone of Regeneration",
    "type": "other",
    "rarity": "Lendário",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: You regain 15 hit points at the end of each hour this pearly white spindle orbits your head, provided that you have at least 1 hit point."
  },
  {
    "name": "Iron Bands of Bilarro",
    "type": "other",
    "rarity": "Raro",
    "description": "This rusty iron sphere measures 3 inches in diameter and weighs 1 pound. You can use an action to speak the command word and throw the sphere at a Huge or smaller creature you can see within 60 feet of you. As the sphere moves through the air, it opens into a tangle of metal bands. \n\n Make a ranged attack roll with an attack bonus equal to your Dexterity modifier plus your proficiency bonus. On a hit, the target is restrained until you take a bonus action to speak the command word again to release it. Doing so, or missing with the attack, causes the bands to contract and become a sphere once more. \n\n A creature, including the one restrained, can use an action to make a DC 20 Strength check to break the iron bands. On a success, the item is destroyed, and the restrained creature is freed. If the check fails, any further attempts made by that creature automatically fail until 24 hours have elapsed. \n\n Once the bands are used, they can't be used again until the next dawn."
  },
  {
    "name": "Rope of Entanglement",
    "type": "other",
    "rarity": "Raro",
    "description": "This rope is 30 feet long and weighs 3 pounds. If you hold one end of the rope and use an action to speak its command word, the other end darts forward to entangle a creature you can see within 20 feet of you. The target must succeed on a DC 15 Dexterity saving throw or become restrained."
  },
  {
    "name": "Wand of Enemy Detection",
    "type": "other",
    "rarity": "Raro",
    "description": "This wand has 7 charges. While holding it, you can use an action and expend 1 charge to speak its command word. For the next minute, you know the direction of the nearest creature hostile to you within 60 feet, but not its distance from you. The wand can sense the presence of hostile creatures that are ethereal, invisible, disguised, or hidden, as well as those in plain sight. The effect ends if you stop holding the wand. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed."
  },
  {
    "name": "Bag of Holding",
    "type": "other",
    "rarity": "Incomum",
    "description": "This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 15 pounds, regardless of its contents. Retrieving an item from the bag requires an action.\nIf the bag is overloaded, pierced, or torn, it ruptures and is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth, unharmed, but the bag must be put right before it can be used again. Breathing creatures inside the bag can survive up to a number of minutes equal to 10 divided by the number of creatures (minimum 1 minute), after which time they begin to suffocate.\nPlacing a bag of holding inside an extradimensional space created by a handy haversack, portable hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened."
  },
  {
    "name": "Boots of Levitation",
    "type": "other",
    "rarity": "Raro",
    "description": "While you wear these boots, you can use an action to cast the levitate spell on yourself at will."
  },
  {
    "name": "Ring of Animal Influence",
    "type": "other",
    "rarity": "Raro",
    "description": "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expend 1 of its charges to cast one of the following spells:Animal friendship (save DC 13)Fear (save DC 13), targeting only beasts that have an Intelligence of 3 or lowerSpeak with animals"
  },
  {
    "name": "Luckstone",
    "type": "other",
    "rarity": "Incomum",
    "description": "While this polished agate is on your person, you gain a +1 bonus to ability checks and saving throws."
  },
  {
    "name": "Gem of Brightness",
    "type": "other",
    "rarity": "Incomum",
    "description": "This prism has 50 charges. While you are holding it, you can use an action to speak one of three command words to cause one of the following effects:The first command word causes the gem to shed bright light in a 30-foot radius and dim light for an additional 30 feet. This effect doesn't expend a charge. It lasts until you use a bonus action to repeat the command word or until you use another function of the gem.The second command word expends 1 charge and causes the gem to fire a brilliant beam of light at one creature you can see within 60 feet of you. The creature must succeed on a DC 15 Constitution saving throw or become blinded for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.The third command word expends 5 charges and causes the gem to flare with blinding light in a 30-foot cone originating from it. Each creature in the cone must make a saving throw as if struck by the beam created with the second command word. When all of the gem's charges are expended, the gem becomes a nonmagical jewel worth 50 gp."
  },
  {
    "name": "Flame Tongue Dagger",
    "type": "weapon",
    "dmgDice": "1d4",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "You can use a bonus action to speak this magic dagger's command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet. While the dagger is ablaze, it deals an extra 2d6 fire damage to any target it hits. The flames last until you use a bonus action to speak the command word again or until you drop or sheathe the dagger."
  },
  {
    "name": "Periapt of Wound Closure",
    "type": "other",
    "rarity": "Incomum",
    "description": "While you wear this pendant, you stabilize whenever you are dying at the start of your turn. In addition, whenever you roll a Hit Die to regain hit points, double the number of hit points it restores."
  },
  {
    "name": "Ring of Evasion",
    "type": "other",
    "rarity": "Raro",
    "description": "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. When you fail a Dexterity saving throw while wearing it, you can use your reaction to expend 1 of its charges to succeed on that saving throw instead."
  },
  {
    "name": "Ring of the Ram",
    "type": "other",
    "rarity": "Raro",
    "description": "This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expend 1 to 3 of its charges to attack one creature you can see within 60 feet of you. The ring produces a spectral ram's head and makes its attack roll with a +7 bonus. On a hit, for each charge you spend, the target takes 2d10 force damage and is pushed 5 feet away from you."
  },
  {
    "name": "Boots of Striding and Springing",
    "type": "other",
    "rarity": "Incomum",
    "description": "While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn't reduced if you are encumbered or wearing heavy armor. In addition, you can jump three times the normal distance, though you can't jump farther than your remaining movement would allow."
  },
  {
    "name": "Cloak of Arachnida",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "This fine garment is made of black silk interwoven with faint silvery threads. While wearing it, you gain the following benefits:You have resistance to poison damage.You have a climbing speed equal to your walking speed.You can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free.You can't be caught in webs of any sort and can move through webs as if they were difficult terrain.You can use an action to cast the web spell (save DC 13). The web created by the spell fills twice its normal area. Once used, this property of the cloak can't be used again until the next dawn."
  },
  {
    "name": "Cloak of Elvenkind",
    "type": "other",
    "rarity": "Incomum",
    "description": "While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage, and you have advantage on Dexterity (Stealth) checks made to hide, as the cloak's color shifts to camouflage you. Pulling the hood up or down requires an action."
  },
  {
    "name": "Hat of Disguise",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this hat, you can use an action to cast the disguise self spell from it at will. The spell ends if the hat is removed."
  },
  {
    "name": "Horseshoes of Speed",
    "type": "other",
    "rarity": "Raro",
    "description": "These iron horseshoes come in a set of four. While all four shoes are affixed to the hooves of a horse or similar creature, they increase the creature's walking speed by 30 feet."
  },
  {
    "name": "Immovable Rod",
    "type": "other",
    "rarity": "Incomum",
    "description": "This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place. Until you or another creature uses an action to push the button again, the rod doesn't move, even if it is defying gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can use an action to make a DC 30 Strength check, moving the fixed rod up to 10 feet on a success."
  },
  {
    "name": "Lantern of Revealing",
    "type": "other",
    "rarity": "Incomum",
    "description": "While lit, this hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. invisible creatures and objects are visible as long as they are in the lantern's bright light. You can use an action to lower the hood, reducing the light to dim light in a 5-foot radius."
  },
  {
    "name": "Periapt of Health",
    "type": "other",
    "rarity": "Incomum",
    "description": "You are immune to contracting any disease while you wear this pendant. If you are already infected with a disease, the effects of the disease are suppressed you while you wear the pendant."
  },
  {
    "name": "Periapt of Proof Against Poison",
    "type": "other",
    "rarity": "Raro",
    "description": "This delicate silver chain has a brilliant-cut black gem pendant. While you wear it, poisons have no effect on you. You are immune to the poisoned condition and have immunity to poison damage."
  },
  {
    "name": "Slippers of Spider Climbing",
    "type": "other",
    "rarity": "Incomum",
    "description": "While you wear these light shoes, you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed. However, the slippers don't allow you to move this way on a slippery surface, such as one covered by ice or oil."
  },
  {
    "name": "Silver Raven",
    "type": "other",
    "rarity": "Incomum",
    "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn’t enough space for the creature, the figurine doesn’t become a creature.\n\nThis silver statuette of a raven can become a raven for up to 12 hours. Once it has been used, it can't be used again until 2 days have passed. While in raven form, the figurine allows you to cast the animal messenger spell on it at will."
  },
  {
    "name": "Wings of Flying",
    "type": "other",
    "rarity": "Raro",
    "description": "While wearing this cloak, you can use an action to speak its command word. This turns the cloak into a pair of bat wings or bird wings on your back for 1 hour or until you repeat the command word as an action. The wings give you a flying speed of 60 feet. When they disappear, you can't use them again for 1d12 hours."
  },
  {
    "name": "Animated Shield",
    "type": "shield",
    "acBonus": 2,
    "rarity": "Muito Raro",
    "description": "While holding this shield, you can speak its command word as a bonus action to cause it to animate. The shield leaps into the air and hovers in your space to protect you as if you were wielding it, leaving your hands free. The shield remains animated for 1 minute, until you use a bonus action to end this effect, or until you are incapacitated or die, at which point the shield falls to the ground or into your hand if you have one free."
  },
  {
    "name": "Studded Leather of Resistance",
    "type": "armor",
    "acBonus": 12,
    "rarity": "Raro",
    "description": "You have resistance to one type of damage while you wear this armor. The GM chooses the type or determines it randomly from the options below.d10Damage Type1Acid2Cold3Fire4Force5Lightning6Necrotic7Poison8Psychic9Radiant10Thunder"
  },
  {
    "name": "Breastplate of Resistance",
    "type": "armor",
    "acBonus": 14,
    "rarity": "Raro",
    "description": "You have resistance to one type of damage while you wear this armor. The GM chooses the type or determines it randomly from the options below.d10Damage Type1Acid2Cold3Fire4Force5Lightning6Necrotic7Poison8Psychic9Radiant10Thunder"
  },
  {
    "name": "Arrow-Catching Shield",
    "type": "shield",
    "acBonus": 2,
    "rarity": "Raro",
    "description": "You gain a +2 bonus to AC against ranged attacks while you wield this shield. This bonus is in addition to the shield's normal bonus to AC. In addition, whenever an attacker makes a ranged attack against a target within 5 feet of you, you can use your reaction to become the target of the attack instead."
  },
  {
    "name": "Belt of Dwarvenkind",
    "type": "other",
    "rarity": "Raro",
    "description": "While wearing this belt, you gain the following benefits:Your Constitution score increases by 2, to a maximum of 20.You have advantage on Charisma (Persuasion) checks made to interact with dwarves."
  },
  {
    "name": "Bracers of Defense",
    "type": "other",
    "rarity": "Raro",
    "description": "While wearing these bracers, you gain a +2 bonus to AC if you are wearing no armor and using no shield."
  },
  {
    "name": "Ioun Stone of Reserve",
    "type": "other",
    "rarity": "Raro",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: This vibrant purple prism stores spells cast into it, holding them until you use them. The stone can store up to 3 levels worth of spells at a time. When found, it contains 1d4−1 levels of stored spells chosen by the GM.\n\nAny creature can cast a spell of 1st through 3rd level into the stone by touching it as the spell is cast. The spell has no effect, other than to be stored in the stone. If the stone can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses.\n\nWhile this stone orbits your head, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The spell cast from the stone is no longer stored in it, freeing up space."
  },
  {
    "name": "Pearl of Power",
    "type": "other",
    "rarity": "Incomum",
    "description": "While this pearl is on your person, you can use an action to speak its command word and regain one expended spell slot. If the expended slot was of 4th level or higher, the new slot is 3rd level. Once you use the pearl, it can't be used again until the next dawn."
  },
  {
    "name": "Pipes of Haunting",
    "type": "other",
    "rarity": "Incomum",
    "description": "You must be proficient with wind instruments to use these pipes. They have 3 charges. You can use an action to play them and expend 1 charge to create an eerie, spellbinding tune. Each creature within 30 feet of you that hears you play must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. If you wish, all creatures in the area that aren't hostile toward you automatically succeed on the saving throw. A creature that fails the saving throw can repeat it at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its saving throw is immune to the effect of these pipes for 24 hours. The pipes regain 1d3 expended charges daily at dawn."
  },
  {
    "name": "Ring of Resistance",
    "type": "other",
    "rarity": "Raro",
    "description": "You have resistance to one damage type while wearing this ring. The gem in the ring indicates the type, which the GM chooses or determines randomly.d10Damage TypeGem1AcidPearl2ColdTourmaline3FireGarnet4ForceSapphire5LightningCitrine6NecroticJet7PoisonAmethyst8PsychicJade9RadiantTopaz10ThunderSpinel"
  },
  {
    "name": "Robe of Scintillating Colors",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "This robe has 3 charges, and it regains 1d3 expended charges daily at dawn. While you wear it, you can use an action and expend 1 charge to cause the garment to display a shifting pattern of dazzling hues until the end of your next turn. During this time, the robe sheds bright light in a 30-foot radius and dim light for an additional 30 feet. Creatures that can see you have disadvantage on attack rolls against you. In addition, any creature in the bright light that can see you when the robe's power is activated must succeed on a DC 15 Wisdom saving throw or become stunned until the effect ends."
  },
  {
    "name": "Scimitar of Speed",
    "type": "weapon",
    "dmgDice": "1d6",
    "dmgType": "slashing",
    "rarity": "Muito Raro",
    "description": "You gain a +2 bonus to attack and damage rolls made with this magic weapon. In addition, you can make one attack with it as a bonus action on each of your turns."
  },
  {
    "name": "Shield of Missile Attraction",
    "type": "shield",
    "acBonus": 2,
    "rarity": "Raro",
    "description": "While holding this shield, you have resistance to damage from ranged weapon attacks."
  },
  {
    "name": "Cloak of the Bat",
    "type": "other",
    "rarity": "Raro",
    "description": "While wearing this cloak, you have advantage on Dexterity (Stealth) checks. In an area of dim light or darkness, you can grip the edges of the cloak with both hands and use it to fly at a speed of 40 feet. If you ever fail to grip the cloak's edges while flying in this way, or if you are no longer in dim light or darkness, you lose this flying speed."
  },
  {
    "name": "Cloak of the Manta Ray",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this cloak with its hood up, you can breathe underwater, and you have a swimming speed of 60 feet. Pulling the hood up or down requires an action."
  },
  {
    "name": "Ring of X-Ray Vision",
    "type": "other",
    "rarity": "Raro",
    "description": "While wearing this ring, you can use an action to speak its command word. When you do so, you can see into and through solid matter for 1 minute. This vision has a radius of 30 feet. To you, solid objects within that radius appear transparent and don't prevent light from passing through them. The vision can penetrate 1 foot of stone, 1 inch of common metal, or up to 3 feet of wood or dirt. Thicker substances block the vision, as does a thin sheet of lead. Whenever you use the ring again before taking a long rest, you must succeed on a DC 15 Constitution saving throw or gain one level of exhaustion."
  },
  {
    "name": "Marble Elephant",
    "type": "other",
    "rarity": "Raro",
    "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn’t enough space for the creature, the figurine doesn’t become a creature.\n\nThis marble statuette is about 4 inches high and long. It can become an elephant for up to 24 hours. Once it has been used, it can't be used again until 7 days have passed."
  },
  {
    "name": "Ebony Fly",
    "type": "other",
    "rarity": "Raro",
    "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn’t enough space for the creature, the figurine doesn’t become a creature.\n\nThis ebony statuette is carved in the likeness of a horsefly. It can become a giant fly for up to 12 hours and can be ridden as a mount. Once it has been used, it can't be used again until 2 days have passed."
  },
  {
    "name": "Deck of Illusions",
    "type": "other",
    "rarity": "Incomum",
    "description": "This box contains a set of parchment cards. A full deck has 34 cards. A deck found as treasure is usually missing 1d20 − 1 cards.\n\nThe magic of the deck functions only if cards are drawn at random (you can use an altered deck of playing cards to simulate the deck). You can use an action to draw a card at random from the deck and throw it to the ground at a point within 30 feet of you.\n\nAn illusion of one or more creatures forms over the thrown card and remains until dispelled. An illusory creature appears real, of the appropriate size, and behaves as if it were a real creature except that it can do no harm. While you are within 120 feet of the illusory creature and can see it, you can use an action to move it magically anywhere within 30 feet of its card. Any physical interaction with the illusory creature reveals it to be an illusion, because objects pass through it. Someone who uses an action to visually inspect the creature identifies it as illusory with a successful DC 15 Intelligence (Investigation) check. The creature then appears translucent.\n\nThe illusion lasts until its card is moved or the illusion is dispelled. When the illusion ends, the image on its card disappears, and that card can't be used again.   Playing Card Illusion     Ace of hearts Red dragon   King of hearts Knight and four guards   Queen of hearts Succubus or incubus   Jack of hearts Druid   Ten of hearts Cloud giant   Nine of hearts Ettin   Eight of hearts Bugbear   Two of hearts Goblin   Ace of diamonds Beholder   King of diamonds Archmage and mage apprentice   Queen of diamonds Night hag   Jack of diamonds Assassin   Ten of diamonds Fire giant   Nine of diamonds Ogre mage   Eight of diamonds Gnoll   Two of diamonds Kobold   Ace of spades Lich   King of spades Priest and two acolytes   Queen of spades Medusa   Jack of spades Veteran   Ten of spades Frost giant   Nine of spades Troll   Eight of spades Hobgoblin   Two of spades Goblin   Ace of clubs Iron golem   King of clubs Bandit captain and three bandits   Queen of clubs Erinyes   Jack of clubs Berserker   Ten of clubs Hill giant   Nine of clubs Ogre   Eight of clubs Orc   Two of clubs Kobold   Jokers (2) You (the deck's owner)   "
  },
  {
    "name": "Giant Slayer Battleaxe",
    "type": "weapon",
    "dmgDice": "1d8",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "You gain a +1 bonus to attack and damage rolls made with this magic weapon. When you hit a giant with it, the giant takes an extra 2d6 damage of the weapon's type and must succeed on a DC 15 Strength saving throw or fall prone. For the purpose of this weapon, giant refers to any creature with the giant type, including ettins and trolls."
  },
  {
    "name": "Mace of Smiting",
    "type": "weapon",
    "dmgDice": "1d4",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "You gain a +1 bonus to attack and damage rolls made with this magic weapon. The bonus increases to +3 when you use the mace to attack a construct. When you roll a 20 on an attack roll made with this weapon, the target takes an extra 2d6 bludgeoning damage, or 4d6 bludgeoning damage if it's a construct. If a construct has 25 hit points or fewer after taking this damage, it is destroyed."
  },
  {
    "name": "Brooch of Shielding",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this brooch, you have resistance to force damage, and you have immunity to damage from the magic missile spell."
  },
  {
    "name": "Amulet of Health",
    "type": "other",
    "rarity": "Raro",
    "description": "Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution is already 19 or higher."
  },
  {
    "name": "Dragon Slayer Longsword",
    "type": "weapon",
    "dmgDice": "1d8",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "You gain a +1 bonus to attack and damage rolls made with this magic weapon. When you hit a dragon with this weapon, the dragon takes an extra 3d6 damage of the weapon's type. For the purpose of this weapon, dragon refers to any creature with the dragon type, including dragon turtles and wyverns."
  },
  {
    "name": "Gauntlets of Ogre Power",
    "type": "other",
    "rarity": "Incomum",
    "description": "Your Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher."
  },
  {
    "name": "Headband of Intellect",
    "type": "other",
    "rarity": "Incomum",
    "description": "Your Intelligence score is 19 while you wear this headband. It has no effect on you if your Intelligence is already 19 or higher."
  },
  {
    "name": "Mace of Disruption",
    "type": "weapon",
    "dmgDice": "1d4",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "When you hit a fiend or an undead with this magic weapon, that creature takes an extra 2d6 radiant damage. If the target has 25 hit points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed. On a successful save, the creature becomes frightened of you until the end of your next turn. While you hold this weapon, it sheds bright light in a 20-foot radius and dim light for an additional 20 feet."
  },
  {
    "name": "Mace of Terror",
    "type": "weapon",
    "dmgDice": "1d4",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "This magic weapon has 3 charges. While holding it, you can use an action and expend 1 charge to release a wave of terror. Each creature of your choice in a 30-foot radius extending from you must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If it has nowhere it can move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success. The mace regains 1d3 expended charges daily at dawn."
  },
  {
    "name": "Nine Lives Stealer",
    "type": "weapon",
    "dmgDice": "1d4",
    "dmgType": "Cortante",
    "rarity": "Muito Raro",
    "description": "You gain a +2 bonus to attack and damage rolls made with this magic weapon. The sword has 1d8 + 1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body (a construct or an undead is immune). The sword loses 1 charge if the creature is slain. When the sword has no charges remaining, it loses this property."
  },
  {
    "name": "Wand of Magic Missiles",
    "type": "other",
    "rarity": "Incomum",
    "description": "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the magic missile spell from it. For 1 charge, you cast the 1st-level version of the spell. You can increase the spell slot level by one for each additional charge you expend. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed."
  },
  {
    "name": "Wand of Web",
    "type": "other",
    "rarity": "Incomum",
    "description": "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the web spell (save DC 15) from it. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed."
  },
  {
    "name": "Cape of the Mountebank",
    "type": "other",
    "rarity": "Raro",
    "description": "This cape smells faintly of brimstone. While wearing it, you can use it to cast the dimension door spell as an action. This property of the cape can't be used again until the next dawn. When you disappear, you leave behind a cloud of smoke, and you appear in a similar cloud of smoke at your destination. The smoke lightly obscures the space you left and the space you appear in, and it dissipates at the end of your next turn. A light or stronger wind disperses the smoke."
  },
  {
    "name": "Portable Hole",
    "type": "other",
    "rarity": "Raro",
    "description": "This fine black cloth, soft as silk, is folded up to the dimensions of a handkerchief. It unfolds into a circular sheet 6 feet in diameter. \n\n You can use an action to unfold a portable hole and place it on or against a solid surface, whereupon the portable hole creates an extradimensional hole 10 feet deep. The cylindrical space within the hole exists on a different plane, so it can't be used to create open passages. Any creature inside an open portable hole can exit the hole by climbing out of it. \n\n You can use an action to close a portable hole by taking hold of the edges of the cloth and folding it up. Folding the cloth closes the hole, and any creatures or Objects within remain in the extradimensional space. No matter what's in it, the hole weighs next to nothing. \n\n If the hole is folded up, a creature within the hole's extradimensional space can use an action to make a DC 10 Strength check. On a successful check, the creature forces its way out and appears within 5 feet of the portable hole or the creature carrying it. A breathing creature within a closed portable hole can survive for up to 10 minutes, after which time it begins to suffocate. \n\n Placing a portable hole inside an extradimensional space created by a Bag of Holding, Handy Haversack, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate is sucked through it and deposited in a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened."
  },
  {
    "name": "Bowl of Commanding Water Elementals",
    "type": "other",
    "rarity": "Raro",
    "description": "While this bowl is filled with water, you can use an action to speak the bowl's command word and summon a water elemental, as if you had cast the conjure elemental spell. The bowl can't be used this way again until the next dawn. The bowl is about 1 foot in diameter and half as deep. It weighs 3 pounds and holds about 3 gallons."
  },
  {
    "name": "Brazier of Commanding Fire Elementals",
    "type": "other",
    "rarity": "Raro",
    "description": "While a fire burns in this brass brazier, you can use an action to speak the brazier's command word and summon a fire elemental, as if you had cast the conjure elemental spell. The brazier can't be used this way again until the next dawn. The brazier weighs 5 pounds."
  },
  {
    "name": "Censer of Controlling Air Elementals",
    "type": "other",
    "rarity": "Raro",
    "description": "While incense is burning in this censer, you can use an action to speak the censer's command word and summon an air elemental, as if you had cast the conjure elemental spell. The censer can't be used this way again until the next dawn. This 6-inch-wide, 1-foot-high vessel resembles a chalice with a decorated lid. It weighs 1 pound."
  },
  {
    "name": "Stone of Controlling Earth Elementals",
    "type": "other",
    "rarity": "Raro",
    "description": "If the stone is touching the ground, you can use an action to speak its command word and summon an earth elemental, as if you had cast the conjure elemental spell. The stone can't be used this way again until the next dawn. The stone weighs 5 pounds."
  },
  {
    "name": "Bronze Griffon",
    "type": "other",
    "rarity": "Raro",
    "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn’t enough space for the creature, the figurine doesn’t become a creature.\n\nThis bronze statuette is of a griffon rampant. It can become a griffon for up to 6 hours. Once it has been used, it can't be used again until 5 days have passed."
  },
  {
    "name": "Broom of Flying",
    "type": "other",
    "rarity": "Incomum",
    "description": "This wooden broom, which weighs 3 pounds, functions like a mundane broom until you stand astride it and speak its command word. It then hovers beneath you and can be ridden in the air. It has a flying speed of 50 feet. It can carry up to 400 pounds, but its flying speed becomes 30 feet while carrying over 200 pounds. The broom stops hovering when you land. You can send the broom to travel alone to a destination within 1 mile of you if you speak the command word, name the location, and are familiar with that place. The broom comes back to you when you speak another command word, provided that the broom is still within 1 mile of you."
  },
  {
    "name": "Serpentine Owl",
    "type": "other",
    "rarity": "Raro",
    "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn’t enough space for the creature, the figurine doesn’t become a creature.\n\nThis serpentine statuette of an owl can become a giant owl for up to 8 hours. Once it has been used, it can't be used again until 2 days have passed. The owl can telepathically communicate with you at any range if you and it are on the same plane of existence."
  },
  {
    "name": "Winged Boots",
    "type": "other",
    "rarity": "Incomum",
    "description": "While you wear these boots, you have a flying speed equal to your walking speed. You can use the boots to fly for up to 4 hours, all at once or in several shorter flights, each one using a minimum of 1 minute from the duration. If you are flying when the duration expires, you descend at a rate of 30 feet per round until you land. The boots regain 2 hours of flying capability for every 12 hours they aren't in use."
  },
  {
    "name": "Dwarven Plate",
    "type": "armor",
    "acBonus": 10,
    "rarity": "Muito Raro",
    "description": "While wearing this armor, you gain a +2 bonus to AC. In addition, if an effect moves you against your will along the ground, you can use your reaction to reduce the distance you are moved by up to 10 feet.\n\nPlate consists of shaped, interlocking metal plates to cover the entire body. A suit of plate includes gauntlets, heavy leather boots, a visored helmet, and thick layers of padding underneath the armor. Buckles and straps distribute the weight over the body."
  },
  {
    "name": "Staff of Thunder and Lightning",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. It also has the following additional properties. When one of these properties is used, it can't be used again until the next dawn.\n Lightning: When you hit with a melee attack using the staff, you can cause the target to take an extra 2d6 lightning damage.\n Thunder: When you hit with a melee attack using the staff, you can cause the staff to emit a crack of thunder, audible out to 300 feet. The target you hit must succeed on a DC 17 Constitution saving throw or become stunned until the end of your next turn.\n Lightning Strike: You can use an action to cause a bolt of lightning to leap from the staff's tip in a line that is 5 feet wide and 120 feet long. Each creature in that line must make a DC 17 Dexterity saving throw, taking 9d6 lightning damage on a failed save, or half as much damage on a successful one.\n Thunderclap: You can use an action to cause the staff to issue a deafening thunderclap, audible out to 600 feet. Each creature within 60 feet of you (not including you) must make a DC 17 Constitution saving throw. On a failed save, a creature takes 2d6 thunder damage and becomes deafened for 1 minute. On a successful save, a creature takes half damage and isn't deafened.\n Thunder and Lightning: You can use an action to use the Lightning Strike and Thunderclap properties at the same time. Doing so doesn't expend the daily use of those properties, only the use of this one."
  },
  {
    "name": "Wand of Binding",
    "type": "other",
    "rarity": "Raro",
    "description": "This wand has 7 charges for the following properties. It regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.\nSpells: While holding the wand, you can use an action to expend some of its charges to cast one of the following spells (save DC 17): hold monster (5 charges) or hold person (2 charges).\nAssisted Escape: While holding the wand, you can use your reaction to expend 1 charge and gain advantage on a saving throw you make to avoid being paralyzed or restrained, or you can expend 1 charge and gain advantage on any check you make to escape a grapple."
  },
  {
    "name": "Wand of Fear",
    "type": "other",
    "rarity": "Raro",
    "description": "This wand has 7 charges for the following properties. It regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed.\n Command: While holding the wand, you can use an action to expend 1 charge and command another creature to flee or grovel, as with the command spell (save DC 15).\n Cone of Fear: While holding the wand, you can use an action to expend 2 charges, causing the wand's tip to emit a 60-foot cone of amber light. Each creature in the cone must succeed on a DC 15 Wisdom saving throw or become frightened of you for 1 minute. While it is frightened in this way, a creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If it has nowhere it can move, the creature can use the Dodge action. At the end of each of its turns, a creature can repeat the saving throw, ending the effect on itself on a success."
  },
  {
    "name": "Apparatus of Kwalish",
    "type": "other",
    "rarity": "Lendário",
    "description": "This item first appears to be a Large sealed iron barrel weighing 500 pounds. The barrel has a hidden catch, which can be found with a successful DC 20 Intelligence (Investigation) check. Releasing the catch unlocks a hatch at one end of the barrel, allowing two Medium or smaller creatures to crawl inside. Ten levers are set in a row at the far end, each in a neutral position, able to move either up or down. When certain levers are used, the apparatus transforms to resemble a giant lobster. The apparatus of the Crab is a Large object with the following statistics: \n\n Armor Class: 20\n Hit Points: 200\n Speed: 30 ft., swim 30 ft. (or 0 ft. for both if the legs and tail aren't extended)\n Damage Immunities: poison, psychic\n \n\n To be used as a vehicle, the apparatus requires one pilot. While the apparatus's hatch is closed, the compartment is airtight and watertight. The compartment holds enough air for 10 hours of breathing, divided by the number of breathing creatures inside. \n\n The apparatus floats on water. It can also go underwater to a depth of 900 feet. Below that, the vehicle takes 2d6 bludgeoning damage per minute from pressure. \n\n A creature in the compartment can use an action to move as many as two of the apparatus's levers up or down. After each use, a lever goes back to its neutral position. Each lever, from left to right, functions as shown in the Apparatus of the Crab Levers table."
  },
  {
    "name": "Boots of the Winterlands",
    "type": "other",
    "rarity": "Incomum",
    "description": "These furred boots are snug and feel quite warm. While you wear them, you gain the following benefits:You have resistance to cold damage.You ignore difficult terrain created by ice or snow.You can tolerate temperatures as low as −50 degrees Fahrenheit without any additional protection. If you wear heavy clothes, you can tolerate temperatures as low as −100 degrees Fahrenheit."
  },
  {
    "name": "Folding Boat",
    "type": "other",
    "rarity": "Raro",
    "description": "This object appears as a wooden box that measures 12 inches long, 6 inches wide, and 6 inches deep. It weighs 4 pounds and floats. It can be opened to store items inside. This item also has three command words, each requiring you to use an action to speak it. One command word causes the box to unfold into a boat 10 feet long, 4 feet wide, and 2 feet deep. The boat has one pair of oars, an anchor, a mast, and a lateen sail. The boat can hold up to four Medium creatures comfortably. The second command word causes the box to unfold into a ship 24 feet long, 8 feet wide, and 6 feet deep. The ship has a deck, rowing seats, five sets of oars, a steering oar, an anchor, a deck cabin, and a mast with a square sail. The ship can hold fifteen Medium creatures comfortably. When the box becomes a vessel, its weight becomes that of a normal vessel its size, and anything that was stored in the box remains in the boat. The third command word causes the folding boat to fold back into a box, provided that no creatures are aboard. Any objects in the vessel that can't fit inside the box remain outside the box as it folds. Any objects in the vessel that can fit inside the box do so."
  },
  {
    "name": "Ring of Invisibility",
    "type": "other",
    "rarity": "Lendário",
    "description": "While wearing this ring, you can turn invisible as an action. Anything you are wearing or carrying is invisible with you. You remain invisible until the ring is removed, until you attack or cast a spell, or until you use a bonus action to become visible again."
  },
  {
    "name": "Ioun Stone of Awareness",
    "type": "other",
    "rarity": "Raro",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: You can't be surprised while this dark blue rhomboid orbits your head."
  },
  {
    "name": "Staff of Charming",
    "type": "other",
    "rarity": "Raro",
    "description": "While holding this staff, you can use an action to expend 1 of its 10 charges to cast charm person, command, or comprehend languages from it using your spell save DC. The staff can also be used as a magic quarterstaff."
  },
  {
    "name": "Sun Blade",
    "type": "weapon",
    "dmgDice": "1d4",
    "dmgType": "Cortante",
    "rarity": "Raro",
    "description": "This item appears to be a longsword hilt. While grasping the hilt, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear. While the blade exists, this magic longsword has the finesse property. If you are proficient with shortswords or longswords, you are proficient with the sun blade. You gain a +2 bonus to attack and damage rolls made with this weapon, which deals radiant damage instead of slashing damage. When you hit an undead with it, that target takes an extra 1d8 radiant damage. The sword's luminous blade emits bright light in a 15-foot radius and dim light for an additional 15 feet. The light is sunlight. While the blade persists, you can use an action to expand or reduce its radius of bright and dim light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each."
  },
  {
    "name": "Helm of Telepathy",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this helm, you can use an action to cast the detect thoughts spell (save DC 13) from it. As long as you maintain concentration on the spell, you can use a bonus action to send a telepathic message to a creature you are focused on. It can reply—using a bonus action to do so—while your focus on it continues. While focusing on a creature with detect thoughts, you can use an action to cast the suggestion spell (save DC 13) from the helm on that creature. Once used, the suggestion property can't be used again until the next dawn."
  },
  {
    "name": "Carpet of Flying",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "You can speak the carpet's command word as an action to make the carpet hover and fly. It moves according to your spoken directions, provided that you are within 30 feet of it. Four sizes of carpet of flying exist. The GM chooses the size of a given carpet or determines it randomly.d100SizeCapacityFlying Speed01-203ft. x 5 ft.200 lb.80 feet21-554ft. x 6ft.400 lb.60 feet56-805ft. x 7 ft.600 lb.40 feet81-1006ft. x 9 ft.800 lb.30 feet"
  },
  {
    "name": "Ring of Regeneration",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "While wearing this ring, you regain 1d6 hit points every 10 minutes, provided that you have at least 1 hit point. If you lose a body part, the ring causes the missing part to regrow and return to full functionality after 1d6 + 1 days if you have at least 1 hit point the whole time."
  },
  {
    "name": "Staff of Healing",
    "type": "other",
    "rarity": "Raro",
    "description": "This staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC and spellcasting ability modifier: cure wounds (1 charge per spell level, up to 4th), lesser restoration (2 charges), or mass cure wounds (5 charges)."
  },
  {
    "name": "Ring of Shooting Stars",
    "type": "other",
    "rarity": "Comum",
    "description": "While wearing this ring in dim light or darkness, you can cast dancing lights and light from the ring at will. Casting either spell from the ring requires an action.  \n The ring has 6 charges for the following other properties. The ring regains 1d6 expended charges daily at dawn.  \n Faerie Fire. You can expend 1 charge as an action to cast faerie fire from the ring. \n Ball Lightning. You can expend 2 charges as an action to create one to four 3-foot-diameter spheres of lightning. The more spheres you create, the less powerful each sphere is individually.  \n Each sphere appears in an unoccupied space you can see within 120 feet of you. The spheres last as long as you concentrate (as if concentrating on a spell), up to 1 minute. Each sphere sheds dim light in a 30-foot radius.  \n As a bonus action, you can move each sphere up to 30 feet, but no farther than 120 feet away from you. When a creature other than you comes within 5 feet of a sphere, the sphere discharges lightning at that creature and disappears. That creature must make a DC 15 Dexterity saving throw. On a failed save, the creature takes lightning damage based on the number of spheres you created.    Spheres Lightning Damage     4 2d4   3 2d6   2 5d4   1 4d12    Shooting Stars. You can expend 1 to 3 charges as an action. For every charge you expend, you launch a glowing mote of light from the ring at a point you can see within 60 feet of you. Each creature within a 15-foot cube originating from that point is showered in sparks and must make a DC 15 Dexterity saving throw, taking 5d4 fire damage on a failed save, or half as much damage on a successful one."
  },
  {
    "name": "Ioun Stone of Mastery",
    "type": "other",
    "rarity": "Lendário",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: Your proficiency bonus increases by 1 while this pale green prism orbits your head."
  },
  {
    "name": "Sphere of Annihilation",
    "type": "other",
    "rarity": "Lendário",
    "description": "This 2-foot-diameter black sphere is a hole in the multiverse, hovering in space and stabilized by a magical field surrounding it.\n The sphere obliterates all matter it passes through and all matter that passes through it. Artifacts are the exception. Unless an artifact is susceptible to damage from a sphere of annihilation, it passes through the sphere unscathed. Anything else that touches the sphere but isn't wholly engulfed and obliterated by it takes 4d10 force damage.\n The sphere is stationary until someone controls it. If you are within 60 feet of an uncontrolled sphere, you can use an action to make a DC 25 Intelligence (Arcana) check. On a success, the sphere levitates in one direction of your choice, up to a number of feet equal to 5 × your Intelligence modifier (minimum 5 feet). On a failure, the sphere moves 10 feet toward you. A creature whose space the sphere enters must succeed on a DC 13 Dexterity saving throw or be touched by it, taking 4d10 force damage.\n If you attempt to control a sphere that is under another creature's control, you make an Intelligence (Arcana) check contested by the other creature's Intelligence (Arcana) check. The winner of the contest gains control of the sphere and can levitate it as normal.\n If the sphere comes into contact with a planar portal, such as that created by the gate spell, or an extradimensional space, such as that within a portable hole, the GM determines randomly what happens, using the following table.    d100 Result     01-50 The sphere is destroyed.   51-85 The sphere moves through the portal or into the extradimensional space.   86-00 A spatial rift sends each creature and object within 180 feet of the sphere, including the sphere, to a random plane of existence.   "
  },
  {
    "name": "Hammer of Thunderbolts",
    "type": "weapon",
    "dmgDice": "2d6",
    "dmgType": "Cortante",
    "rarity": "Lendário",
    "description": "You gain a +1 bonus to attack and damage rolls made with this magic weapon.\nGiant's Bane (Requires Attunement): You must be wearing a belt of giant strength (any variety) and gauntlets of ogre power** to attune to this weapon. The attunement ends if you take off either of those items. While you are attuned to this weapon and holding it, your Strength score increases by 4 and can exceed 20, but not 30. When you roll a 20 on an attack roll made with this weapon against a giant, the giant must succeed on a DC 17 Constitution saving throw or die.\nThe hammer also has 5 charges. While attuned to it, you can expend 1 charge and make a ranged weapon attack with the hammer, hurling it as if it had the thrown property with a normal range of 20 feet and a long range of 60 feet. If the attack hits, the hammer unleashes a thunderclap audible out to 300 feet. The target and every creature within 30 feet of it must succeed on a DC 17 Constitution saving throw or be stunned until the end of your next turn. The hammer regains 1d4 + 1 expended charges daily at dawn."
  },
  {
    "name": "Staff of Fire",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "You have resistance to fire damage while you hold this staff.\nThe staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: burning hands (1 charge), fireball (3 charges), or wall of fire (4 charges).\nThe staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff blackens, crumbles into cinders, and is destroyed."
  },
  {
    "name": "Staff of Swarming Insects",
    "type": "other",
    "rarity": "Raro",
    "description": "This staff has 10 charges and regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, a swarm of insects consumes and destroys the staff, then disperses.\n Spells. While holding the staff, you can use an action to expend some of its charges to cast one of the following spells from it, using your spell save DC: giant insect (4 charges) or insect plague (5 charges).\n Insect Cloud. While holding the staff, you can use an action and expend 1 charge to cause a swarm of harmless flying insects to spread out in a 30-foot radius from you. The insects remain for 10 minutes, making the area heavily obscured for creatures other than you. The swarm moves with you, remaining centered on you. A wind of at least 10 miles per hour disperses the swarm and ends the effect."
  },
  {
    "name": "Wand of Paralysis",
    "type": "other",
    "rarity": "Raro",
    "description": "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cause a thin blue ray to streak from the tip toward a creature you can see within 60 feet of you. The target must succeed on a DC 15 Constitution saving throw or be paralyzed for 1 minute. At the end of each of the target's turns, it can repeat the saving throw, ending the effect on itself on a success. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed."
  },
  {
    "name": "Cube of Force",
    "type": "other",
    "rarity": "Raro",
    "description": "This cube is about an inch across. Each face has a distinct marking on it that can be pressed. The cube starts with 36 charges, and it regains 1d20 expended charges daily at dawn. You can use an action to press one of the cube's faces, expending a number of charges based on the chosen face, as shown in the Cube of Force Faces table. Each face has a different effect. If the cube has insufficient charges remaining, nothing happens. Otherwise, a barrier of invisible force springs into existence, forming a cube 15 feet on a side. The barrier is centered on you, moves with you, and lasts for 1 minute, until you use an action to press the cube's sixth face, or the cube runs out of charges. You can change the barrier's effect by pressing a different face of the cube and expending the requisite number of charges, resetting the duration. If your movement causes the barrier to come into contact with a solid object that can't pass through the cube, you can't move any closer to that object as long as the barrier remains.Cube of Force FacesFaceChargesEffect11Gases, wind, and fog can't passthrough the barrier.22Nonliving matter can't passthrough the barrier. Walls,floors, and ceilings can passthrough at your discretion.33Living matter can't pass throughthe barrier.44Spell effects can't pass throughthe barrier.55Nothing can pass through thebarrier. Walls, floors, andceilings can pass through atyour discretion.60The barrier deactivates. The cube loses charges when the barrier is targeted by certain spells or comes into contact with certain spell or magic item effects, as shown in the table below.    Spell or item Charges Lost     Disintegrate 1d12   Horn of blasting 1d10   Passwall 1d6   Prismatic spray 1d20   Wall of fire 1d4   "
  },
  {
    "name": "Ring of Mind Shielding",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this ring, you are immune to magic that allows other creatures to read your thoughts, determine whether you are lying, know your alignment, or know your creature type. Creatures can telepathically communicate with you only if you allow it.\nYou can use an action to cause the ring to become invisible until you use another action to make it visible, until you remove the ring, or until you die.If you die while wearing the ring, your soul enters it, unless it already houses a soul. You can remain in the ring or depart for the afterlife. As long as your soul is in the ring, you can telepathically communicate with any creature wearing it. A wearer can't prevent this telepathic communication."
  },
  {
    "name": "Rod of Rulership",
    "type": "other",
    "rarity": "Raro",
    "description": "You can use an action to present the rod and command obedience from each creature of your choice that you can see within 120 feet of you. Each target must succeed on a DC 15 Wisdom saving throw or be charmed by you for 8 hours. While charmed in this way, the creature regards you as its trusted leader. If harmed by you or your companions, or commanded to do something contrary to its nature, a target ceases to be charmed in this way. The rod can't be used again until the next dawn."
  },
  {
    "name": "Ring of Fire Elemental Command",
    "type": "other",
    "rarity": "Lendário",
    "description": "This ring is linked to one of the four Elemental Planes. The GM chooses or randomly determines the linked plane.\n\nWhile wearing this ring, you have advantage on attack rolls against the elementals, and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane.\n\nThe ring has 5 charges. It regains 1d4 + 1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n\nYou can expend 2 of the ring's charges to cast dominate monster on the elemental type. In addition, you have resistance to damage based on the type. You can also speak and understand Ignan.\n\nIf you help slay an elemental of that type while attuned to the ring, you gain access to the following additional properties:\n\nYou are immune to elemental damage of that type.\n\nYou can cast the following spells from the ring, expending the necessary number of charges: burning hands (1 charge), fireball (2 charges), and wall of fire (3 charges)."
  },
  {
    "name": "Dwarven Thrower",
    "type": "weapon",
    "dmgDice": "1d8",
    "dmgType": "Cortante",
    "rarity": "Muito Raro",
    "description": "You gain a +3 bonus to attack and damage rolls made with this magic weapon. It has the thrown property with a normal range of 20 feet and a long range of 60 feet. When you hit with a ranged attack using this weapon, it deals an extra 1d8 damage or, if the target is a giant, 2d8 damage. Immediately after the attack, the weapon flies back to your hand."
  },
  {
    "name": "Plate Armor of Invulnerability",
    "type": "armor",
    "acBonus": 18,
    "rarity": "Lendário",
    "description": "You have resistance to nonmagical damage while you wear this armor. Additionally, you can use an action to make yourself immune to nonmagical damage for 10 minutes or until you are no longer wearing the armor. Once this special action is used, it can't be used again until the next dawn."
  },
  {
    "name": "Ring of Free Action",
    "type": "other",
    "rarity": "Raro",
    "description": "While you wear this ring, difficult terrain doesn't cost you extra movement. In addition, magic can neither reduce your speed nor cause you to be paralyzed or restrained."
  },
  {
    "name": "Amulet of Proof Against Detection and Location",
    "type": "other",
    "rarity": "Incomum",
    "description": "While wearing this amulet, you are hidden from divination magic. You can't be targeted by such magic or perceived through magical scrying sensors."
  },
  {
    "name": "Ivory Goat of Terror",
    "type": "other",
    "rarity": "Raro",
    "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn’t enough space for the creature, the figurine doesn’t become a creature.\n\nIvory Goats. These ivory statuettes of goats are always created in sets of three. Each goat looks unique and functions differently from the others.\n\nThe goat of terror becomes a giant goat for up to 3 hours. The goat can't attack, but you can remove its horns and use them as weapons. One horn becomes a lance, +1, and the other becomes a longsword, +2. Removing a horn requires an action, and the weapons disappear and the horns return when the goat reverts to figurine form. In addition, the goat radiates a 30-foot-radius aura of terror while you are riding it. Any creature hostile to you that starts its turn in the aura must succeed on a DC 15 Wisdom saving throw or be frightened of the goat for 1 minute, or until the goat reverts to figurine form. The frightened creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. Once it successfully saves against the effect, a creature is immune to the goat's aura for the next 24 hours. Once the figurine has been used, it can't be used again until 15 days have passed."
  },
  {
    "name": "Talisman of the Sphere",
    "type": "other",
    "rarity": "Lendário",
    "description": "When you make an Intelligence (Arcana) check to control a sphere of annihilation while you are holding this talisman, you double your proficiency bonus on the check. In addition, when you start your turn with control over a sphere of annihilation, you can use an action to levitate it 10 feet plus a number of additional feet equal to 10 × your Intelligence modifier."
  },
  {
    "name": "Staff of Striking",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "This staff can be wielded as a magic quarterstaff that grants a +3 bonus to attack and damage rolls made with it. The staff has 10 charges. When you hit with a melee attack using it, you can expend up to 3 of its charges. For each charge you expend, the target takes an extra 1d6 force damage. The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff becomes a nonmagical quarterstaff."
  },
  {
    "name": "Ring of Spell Storing",
    "type": "other",
    "rarity": "Raro",
    "description": "This ring stores spells cast into it, holding them until the attuned wearer uses them. The ring can store up to 5 levels worth of spells at a time. When found, it contains 1d6 − 1 levels of stored spells chosen by the GM. \nAny creature can cast a spell of 1st through 5th level into the ring by touching the ring as the spell is cast. The spell has no effect, other than to be stored in the ring. If the ring can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses. \nWhile wearing this ring, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster, but is otherwise treated as if you cast the spell. The spell cast from the ring is no longer stored in it, freeing up space."
  },
  {
    "name": "Vorpal Scimitar",
    "type": "weapon",
    "dmgDice": "1d6",
    "dmgType": "Cortante",
    "rarity": "Lendário",
    "description": "You gain a +3 bonus to attack and damage rolls made with this magic weapon. In addition, the weapon ignores resistance to slashing damage. When you attack a creature that has at least one head with this weapon and roll a 20 on the attack roll, you cut off one of the creature's heads. The creature dies if it can't survive without the lost head. A creature is immune to this effect if it is immune to slashing damage, doesn't have or need a head, has legendary actions, or the GM decides that the creature is too big for its head to be cut off with this weapon. Such a creature instead takes an extra 6d8 slashing damage from the hit."
  },
  {
    "name": "Defender Greatsword",
    "type": "weapon",
    "dmgDice": "2d6",
    "dmgType": "Cortante",
    "rarity": "Lendário",
    "description": "You gain a +3 bonus to attack and damage rolls made with this magic weapon. The first time you attack with the sword on each of your turns, you can transfer some or all of the sword's bonus to your Armor Class, instead of using the bonus on any attacks that turn. For example, you could reduce the bonus to your attack and damage rolls to +1 and gain a +2 bonus to AC. The adjusted bonuses remain in effect until the start of your next turn, although you must hold the sword to gain a bonus to AC from it."
  },
  {
    "name": "Ring of Water Elemental Command",
    "type": "other",
    "rarity": "Lendário",
    "description": "This ring is linked to one of the four Elemental Planes. The GM chooses or randomly determines the linked plane.\n While wearing this ring, you have advantage on attack rolls against elementals from the linked plane, and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the linked plane.\n The ring has 5 charges. It regains 1d4 + 1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n You can expend 2 of the ring's charges to cast dominate monster on a water elemental. In addition, you can stand on and walk across liquid surfaces as if they were solid ground. You can also speak and understand Aquan.\n If you help slay a water elemental while attuned to the ring, you gain access to the following additional properties:\n \n You can breathe underwater and have a swimming speed equal to your walking speed.\n You can cast the following spells from the ring, expending the necessary number of charges: create or destroy water (1 charge), control water (3 charges), ice storm (2 charges), or wall of ice (3 charges)."
  },
  {
    "name": "Rod of Alertness",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "This rod has a flanged head and the following properties.\n\nAlertness: While holding the rod, you have advantage on Wisdom (Perception) checks and on rolls for initiative.\n\nSpells: While holding the rod, you can use an action to cast one of the following spells from it:\n\nDetect evil and good, detect magic, detect poison and disease, or see invisibility.\n"
  },
  {
    "name": "Staff of Frost",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "You have resistance to cold damage while you hold this staff. The staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: cone of cold (5 charges), fog cloud (1 charge), ice storm (4 charges), or wall of ice (4 charges).\nThe staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff turns to water and is destroyed."
  },
  {
    "name": "Rod of Lordly Might",
    "type": "other",
    "rarity": "Lendário",
    "description": "This rod has a flanged head, and it functions as a magic mace that grants a +3 bonus to attack and damage rolls made with it. The rod has properties associated with six different buttons that are set in a row along the haft. It has three other properties as well, detailed below.\n Six Buttons. You can press one of the rod's six buttons as a bonus action. A button's effect lasts until you push a different button or until you push the same button again, which causes the rod to revert to its normal form.\n If you press button 1, the rod becomes a flame tongue, as a fiery blade sprouts from the end opposite the rod's flanged head.\n If you press button 2, the rod's flanged head folds down and two crescent-shaped blades spring out, transforming the rod into a magic battleaxe that grants a +3 bonus to attack and damage rolls made with it.\n If you press button 3, the rod's flanged head folds down, a spear point springs from the rod's tip, and the rod's handle lengthens into a 6-foot haft, transforming the rod into a magic spear that grants a +3 bonus to attack and damage rolls made with it.\n If you press button 4, the rod transforms into a climbing pole up to 50 feet long, as you specify. In surfaces as hard as granite, a spike at the bottom and three hooks at the top anchor the pole. Horizontal bars 3 inches long fold out from the sides, 1 foot apart, forming a ladder. The pole can bear up to 4,000 pounds. More weight or lack of solid anchoring causes the rod to revert to its normal form.\n If you press button 5, the rod transforms into a handheld battering ram and grants its user a +10 bonus to Strength checks made to break through doors, barricades, and other barriers.\n If you press button 6, the rod assumes or remains in its normal form and indicates magnetic north. (Nothing happens if this function of the rod is used in a location that has no magnetic north.) The rod also gives you knowledge of your approximate depth beneath the ground or your height above it.\n Drain Life. When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Constitution saving throw. On a failure, the target takes an extra 4d6 necrotic damage, and you regain a number of hit points equal to half that necrotic damage. This property can't be used again until the next dawn.\n Paralyze. When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Strength saving throw. On a failure, the target is paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on a success. This property can't be used again until the next dawn.\n Terrify. While holding the rod, you can use an action to force each creature you can see within 30 feet of you to make a DC 17 Wisdom saving throw. On a failure, a target is frightened of you for 1 minute. A frightened target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. This property can't be used again until the next dawn."
  },
  {
    "name": "Mantle of Spell Resistance",
    "type": "other",
    "rarity": "Raro",
    "description": "You have advantage on saving throws against spells while you wear this cloak."
  },
  {
    "name": "Ring of Spell Turning",
    "type": "other",
    "rarity": "Lendário",
    "description": "While wearing this ring, you have advantage on saving throws against any spell that targets only you (not in an area of effect). In addition, if you roll a 20 for the save and the spell is 7th level or lower, the spell has no effect on you and instead targets the caster, using the slot level, spell save DC, attack bonus, and spellcasting ability of the caster."
  },
  {
    "name": "Robe of Eyes",
    "type": "other",
    "rarity": "Raro",
    "description": "This robe is adorned with eyelike patterns. While you wear the robe, you gain the following benefits:The robe lets you see in all directions, and you have advantage on Wisdom (Perception) checks that rely on sight.You have darkvision out to a range of 120 feet.You can see invisible creatures and objects, as well as see into the Ethereal Plane, out to a range of 120 feet. The eyes on the robe can't be closed or averted. Although you can close or avert your own eyes, you are never considered to be doing so while wearing this robe.\nA light spell cast on the robe or a daylight spell cast within 5 feet of the robe causes you to be blinded for 1 minute. At the end of each of your turns, you can make a Constitution saving throw (DC 11 for light or DC 15 for daylight), ending the blindness on a success."
  },
  {
    "name": "Ioun Stone of Greater Absorption",
    "type": "other",
    "rarity": "Lendário",
    "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.\n\nWhen you use an action to toss one of these stones into the air, the stone orbits your head at a distance of 1d3 feet and confers a benefit to you. Thereafter, another creature must use an action to grasp or net the stone to separate it from you, either by making a successful attack roll against AC 24 or a successful DC 24 Dexterity (Acrobatics) check. You can use an action to seize and stow the stone, ending its effect.\n\nA stone has AC 24, 10 hit points, and resistance to all damage. It is considered to be an object that is being worn while it orbits your head.\n\nEffect for this Ioun Stone: While this marbled lavender and green ellipsoid orbits your head, you can use your reaction to cancel a spell of 8th level or lower cast by a creature you can see and targeting only you.\n\nOnce the stone has canceled 50 levels of spells, it burns out and turns dull gray, losing its magic. If you are targeted by a spell whose level is higher than the number of spell levels the stone has left, the stone can't cancel it."
  },
  {
    "name": "Ring of Earth Elemental Command",
    "type": "other",
    "rarity": "Lendário",
    "description": "This ring is linked to one of the four Elemental Planes. The GM chooses or randomly determines the linked plane. While wearing this ring, you have advantage on attack rolls against elementals from the linked plane, and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the linked plane. The ring has 5 charges. It regains 1d4 + 1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17. Ring of Earth Elemental Command. You can expend 2 of the ring's charges to cast dominate monster on an earth elemental. In addition, you can move in difficult terrain that is composed of rubble, rocks, or dirt as if it were normal terrain. You can also speak and understand Terran. If you help slay an earth elemental while attuned to the ring, you gain access to the following additional properties:  You have resistance to acid damage. You can move through solid earth or rock as if those areas were difficult terrain. If you end your turn there, you are shunted out to the nearest unoccupied space you last occupied. You can cast the following spells from the ring, expending the necessary number of charges: stone shape (2 charges), stoneskin (3 charges), or wall of stone (3 charges)."
  },
  {
    "name": "Wand of Fireballs",
    "type": "other",
    "rarity": "Raro",
    "description": "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the fireball spell (save DC 15) from it. For 1 charge, you cast the 3rd-level version of the spell. You can increase the spell slot level by one for each additional charge you expend. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed."
  },
  {
    "name": "Wand of Lightning Bolts",
    "type": "other",
    "rarity": "Raro",
    "description": "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the lightning bolt spell (save DC 15) from it. For 1 charge, you cast the 3rd-level version of the spell. You can increase the spell slot level by one for each additional charge you expend. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed."
  },
  {
    "name": "Wand of Polymorph",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the polymorph spell (save DC 15) from it. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll a d20. On a 1, the wand crumbles into ashes and is destroyed."
  },
  {
    "name": "Gem of Seeing",
    "type": "other",
    "rarity": "Raro",
    "description": "This gem has 3 charges. As an action, you can speak the gem's command word and expend 1 charge. For the next 10 minutes, you have truesight out to 120 feet when you peer through the gem. The gem regains 1d3 expended charges daily at dawn."
  },
  {
    "name": "Robe of the Archmagi",
    "type": "other",
    "rarity": "Lendário",
    "description": "This elegant garment is made from exquisite cloth of white, gray, or black and adorned with silvery runes. The robe's color corresponds to the alignment for which the item was created. A white robe was made for good, gray for neutral, and black for evil. You can't attune to a robe of the archmagi that doesn't correspond to your alignment. You gain these benefits while wearing the robe:If you aren't wearing armor, your base Armor Class is 15 + your Dexterity modifier.You have advantage on saving throws against spells and other magical effects.Your spell save DC and spell attack bonus each increase by 2."
  },
  {
    "name": "Ring of Air Elemental Command",
    "type": "other",
    "rarity": "Lendário",
    "description": "This ring is linked to one of the four Elemental Planes. The GM chooses or randomly determines the linked plane.\n\nWhile wearing this ring, you have advantage on attack rolls against the elementals, and they have disadvantage on attack rolls against you. In addition, you have access to properties based on the Elemental Plane.\n\nThe ring has 5 charges. It regains 1d4 + 1 expended charges daily at dawn. Spells cast from the ring have a save DC of 17.\n\nYou can expend 2 of the ring's charges to cast dominate monster on an air elemental. In addition, when you fall, you descend 60 feet per round and take no damage from falling. You can also speak and understand Auran.\nIf you help slay an air elemental while attuned to the ring, you gain access to the following additional properties:  You have resistance to lightning damage. You have a flying speed equal to your walking speed and can hover. You can cast the following spells from the ring, expending the necessary number of charges: chain lightning (3 charges), gust of wind (2 charges), or wind wall (1 charge)."
  },
  {
    "name": "Scarab of Protection",
    "type": "other",
    "rarity": "Lendário",
    "description": "If you hold this beetle-shaped medallion in your hand for 1 round, an inscription appears on its surface revealing its magical nature. It provides two benefits while it is on your person:You have advantage on saving throws against spells.The scarab has 12 charges. If you fail a saving throw against a necromancy spell or a harmful effect originating from an undead creature, you can use your reaction to expend 1 charge and turn the failed save into a successful one. The scarab crumbles into powder and is destroyed when its last charge is expended."
  },
  {
    "name": "Cubic Gate",
    "type": "other",
    "rarity": "Lendário",
    "description": "This cube is 3 inches across and radiates palpable magical energy. The six sides of the cube are each keyed to a different plane of existence, one of which is the Material Plane. The other sides are linked to planes determined by the GM.\n\nYou can use an action to press one side of the cube to cast the gate spell with it, opening a portal to the plane keyed to that side. Alternatively, if you use an action to press one side twice, you can cast the Plane Shift spell (save DC 17) with the cube and transport the Targets to the plane keyed to that side.\n\nThe cube has 3 Charges. Each use of the cube expends 1 charge. The cube regains 1d3 expended Charges daily at dawn."
  },
  {
    "name": "Staff of the Woodlands",
    "type": "other",
    "rarity": "Raro",
    "description": "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you have a +2 bonus to spell attack rolls.\n The staff has 10 charges for the following properties. It regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff loses its properties and becomes a nonmagical quarterstaff.\n Spells. You can use an action to expend 1 or more of the staff's charges to cast one of the following spells from it, using your spell save DC: animal friendship (1 charge), awaken (5 charges), barkskin (2 charges), locate animals or plants (2 charges), speak with animals (1 charge), speak with plants (3 charges), or wall of thorns (6 charges).\n You can also use an action to cast the pass without trace spell from the staff without using any charges.\n Tree Form. You can use an action to plant one end of the staff in fertile earth and expend 1 charge to transform the staff into a healthy tree. The tree is 60 feet tall and has a 5-foot-diameter trunk, and its branches at the top spread out in a 20-foot radius. The tree appears ordinary but radiates a faint aura of transmutation magic if targeted by detect magic. While touching the tree and using another action to speak its command word, you return the staff to its normal form. Any creature in the tree falls when it reverts to a staff."
  },
  {
    "name": "Plate Armor of Etherealness",
    "type": "armor",
    "acBonus": 18,
    "rarity": "Lendário",
    "description": "While you're wearing this armor, you can speak its command word as an action to gain the effect of the etherealness spell, which last for 10 minutes or until you remove the armor or use an action to speak the command word again. This property of the armor can't be used again until the next dawn."
  },
  {
    "name": "Rod of Absorption",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "While holding this rod, you can use your reaction to absorb a spell that is targeting only you and not with an area of effect. The absorbed spell's effect is canceled, and the spell's energy--not the spell itself--is stored in the rod. The energy has the same level as the spell when it was cast. The rod can absorb and store up to 50 levels of energy over the course of its existence. Once the rod absorbs 50 levels of energy, it can't absorb more. If you are targeted by a spell that the rod can't store, the rod has no effect on that spell.\n When you become attuned to the rod, you know how many levels of energy the rod has absorbed over the course of its existence, and how many levels of spell energy it currently has stored.\n If you are a spellcaster holding the rod, you can convert energy stored in it into spell slots to cast spells you have prepared or know. You can create spell slots only of a level equal to or lower than your own spell slots, up to a maximum of 5th level. You use the stored levels in place of your slots, but otherwise cast the spell as normal. For example, you can use 3 levels stored in the rod as a 3rd-level spell slot.\n A newly found rod has 1d10 levels of spell energy stored in it already. A rod that can no longer absorb spell energy and has no energy remaining becomes nonmagical."
  },
  {
    "name": "Spellguard Shield",
    "type": "shield",
    "acBonus": 2,
    "rarity": "Muito Raro",
    "description": "While holding this shield, you have advantage on saving throws against spells and other magical effects, and spell attacks have disadvantage against you."
  },
  {
    "name": "Crystal Ball",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "The typical crystal ball, a very rare item, is about 6 inches in diameter. While touching it, you can cast the scrying spell (save DC 17) with it.\n The following crystal ball variants are legendary items and have additional properties.  \n Crystal Ball of Mind Reading. You can use an action to cast the detect thoughts spell (save DC 17) while you are scrying with the crystal ball, targeting creatures you can see within 30 feet of the spell's sensor. You don't need to concentrate on this detect thoughts to maintain it during its duration, but it ends if scrying ends.  \n Crystal Ball of Telepathy. While scrying with the crystal ball, you can communicate telepathically with creatures you can see within 30 feet of the spell's sensor. You can also use an action to cast the suggestion spell (save DC 17) through the sensor on one of those creatures. You don't need to concentrate on this suggestion to maintain it during its duration, but it ends if scrying ends. Once used, the suggestion power of the crystal ball can't be used again until the next dawn.  \n Crystal Ball of True Seeing. While scrying with the crystal ball, you have truesight with a radius of 120 feet centered on the spell's sensor."
  },
  {
    "name": "Cloak of Displacement",
    "type": "other",
    "rarity": "Raro",
    "description": "While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you. If you take damage, the property ceases to function until the start of your next turn. This property is suppressed while you are incapacitated, restrained, or otherwise unable to move."
  },
  {
    "name": "Robe of Stars",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "This black or dark blue robe is embroidered with small white or silver stars. You gain a +1 bonus to saving throws while you wear it.\n Six stars, located on the robe's upper front portion, are particularly large. While wearing this robe, you can use an action to pull off one of the stars and use it to cast magic missile as a 5th-level spell. Daily at dusk, 1d6 removed stars reappear on the robe.\n While you wear the robe, you can use an action to enter the Astral Plane along with everything you are wearing and carrying. You remain there until you use an action to return to the plane you were on. You reappear in the last space you occupied, or if that space is occupied, the nearest unoccupied space."
  },
  {
    "name": "Talisman of Ultimate Evil",
    "type": "other",
    "rarity": "Lendário",
    "description": "This item symbolizes unrepentant evil. A creature that is neither good nor evil in alignment takes 6d6 necrotic damage upon touching the talisman. A good creature takes 8d6 necrotic damage upon touching the talisman. Either sort of creature takes the damage again each time it ends its turn holding or carrying the talisman. If you are an evil cleric or paladin, you can use the talisman as a holy symbol, and you gain a +2 bonus to spell attack rolls while you wear or hold it. The talisman has 6 charges. If you are wearing or holding it, you can use an action to expend 1 charge from the talisman and choose one creature you can see on the ground within 120 feet of you. If the target is of good alignment, a flaming fissure opens under it. The target must succeed on a DC 20 Dexterity saving throw or fall into the fissure and be destroyed, leaving no remains. The fissure then closes, leaving no trace of its existence. When you expend the last charge, the talisman dissolves into foul-smelling slime and is destroyed."
  },
  {
    "name": "Helm of Teleportation",
    "type": "other",
    "rarity": "Raro",
    "description": "This helm has 3 charges. While wearing it, you can use an action and expend 1 charge to cast the teleport spell from it. The helm regains 1d3 expended charges daily at dawn."
  },
  {
    "name": "Talisman of Pure Good",
    "type": "other",
    "rarity": "Lendário",
    "description": "This talisman is a mighty symbol of goodness. A creature that is neither good nor evil in alignment takes 6d6 radiant damage upon touching the talisman. An evil creature takes 8d6 radiant damage upon touching the talisman. Either sort of creature takes the damage again each time it ends its turn holding or carrying the talisman. If you are a good cleric or paladin, you can use the talisman as a holy symbol, and you gain a +2 bonus to spell attack rolls while you wear or hold it. The talisman has 7 charges. If you are wearing or holding it, you can use an action to expend 1 charge from it and choose one creature you can see on the ground within 120 feet of you. If the target is of evil alignment, a flaming fissure opens under it. The target must succeed on a DC 20 Dexterity saving throw or fall into the fissure and be destroyed, leaving no remains. The fissure then closes, leaving no trace of its existence. When you expend the last charge, the talisman disperses into motes of golden light and is destroyed."
  },
  {
    "name": "Instant Fortress",
    "type": "other",
    "rarity": "Raro",
    "description": "You can use an action to place this 1-inch metal cube on the ground and speak its command word. The cube rapidly grows into a fortress that remains until you use an action to speak the command word that dismisses it, which works only if the fortress is empty."
  },
  {
    "name": "Ring of Telekinesis",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "While wearing this ring, you can cast the telekinesis spell at will, but you can target only objects that aren't being worn or carried."
  },
  {
    "name": "Rod of Security",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "While holding this rod, you can use an action to activate it. The rod then instantly transports you and up to 199 other willing creatures you can see to a paradise that exists in an extraplanar space. You choose the form that the paradise takes. It could be a tranquil garden, lovely glade, cheery tavern, immense palace, tropical island, fantastic carnival, or whatever else you can imagine. Regardless of its nature, the paradise contains enough water and food to sustain its visitors. Everything else that can be interacted with inside the extraplanar space can exist only there. For example, a flower picked from a garden in the paradise disappears if it is taken outside the extraplanar space. For each hour spent in the paradise, a visitor regains hit points as if it had spent 1 Hit Die. Also, creatures don't age while in the paradise, although time passes normally. Visitors can remain in the paradise for up to 200 days divided by the number of creatures present (round down). When the time runs out or you use an action to end it, all visitors reappear in the location they occupied when you activated the rod, or an unoccupied space nearest that location. The rod can't be used again until ten days have passed."
  },
  {
    "name": "Staff of Power",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you gain a +2 bonus to Armor Class, saving throws, and spell attack rolls.  \n The staff has 20 charges for the following properties. The staff regains 2d8 + 4 expended charges daily at dawn. If you expend the last charge, roll a d20. On a 1, the staff retains its +2 bonus to attack and damage rolls but loses all other properties. On a 20, the staff regains 1d8 + 2 charges.  \n Power Strike. When you hit with a melee attack using the staff, you can expend 1 charge to deal an extra 1d6 force damage to the target.  \n Spells. While holding this staff, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC and spell attack bonus: cone of cold (5 charges), fireball (5th-level version, 5 charges), globe of invulnerability (6 charges), hold monster (5 charges), levitate (2 charges), lightning bolt (5th-level version, 5 charges), magic missile (1 charge), ray of enfeeblement (1 charge), or wall of force (5 charges).  \n Retributive Strike. You can use an action to break the staff over your knee or against a solid surface, performing a retributive strike. The staff is destroyed and releases its remaining magic in an explosion that expands to fill a 30-foot-radius sphere centered on it.  \n You have a 50 percent chance to instantly travel to a random plane of existence, avoiding the explosion. If you fail to avoid the effect, you take force damage equal to 16 × the number of charges in the staff. Every other creature in the area must make a DC 17 Dexterity saving throw. On a failed save, a creature takes an amount of damage based on how far away it is from the point of origin, as shown in the following table. On a successful save, a creature takes half as much damage.    Distance from Origin Damage     10 ft. away or closer 8 x the number of charges in the staff   11 to 20 ft. away 6 x the number of charges in the staff   21 to 30 ft. away 4 x the number of charges in the staff   "
  },
  {
    "name": "Obsidian Steed",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature. If the space where the creature would appear is occupied by other creatures or objects, or if there isn’t enough space for the creature, the figurine doesn’t become a creature.\n\nThis polished obsidian horse can become a nightmare for up to 24 hours. The nightmare fights only to defend itself. Once it has been used, it can't be used again until 5 days have passed."
  },
  {
    "name": "Decanter of Endless Water",
    "type": "other",
    "rarity": "Incomum",
    "description": "This stoppered flask sloshes when shaken, as if it contains water. The decanter weighs 2 pounds. You can use an action to remove the stopper and speak one of three command words, whereupon an amount of fresh water or salt water (your choice) pours out of the flask. The water stops pouring out at the start of your next turn. Choose from the following options:\n• Stream produces 1 gallon of water.\n• Fountain produces 5 gallons of water.\n• Geyser produces 30 gallons of water that gushes forth in a geyser 30 feet long and 1 foot wide.\n\nAs a bonus action while holding the decanter, you can aim the geyser at a creature you can see within 30 feet of you. The target must succeed on a DC 13 Strength saving throw or take 1d4 bludgeoning damage and fall prone. Instead of a creature, you can target an object that isn't being worn or carried and that weighs no more than 200 pounds. The object is either knocked over or pushed up to 15 feet away from you."
  },
  {
    "name": "Amulet of the Planes",
    "type": "other",
    "rarity": "Muito Raro",
    "description": "While wearing this amulet, you can use an action to name a location that you are familiar with on another plane of existence. Then make a DC 15 Intelligence check. On a successful check, you cast the plane shift spell. On a failure, you and each creature and object within 15 feet of you travel to a random destination. Roll a d100. On a 1–60, you travel to a random location on the plane you named. On a 61–100, you travel to a randomly determined plane of existence."
  },
  {
    "name": "Holy Avenger Greatsword",
    "type": "weapon",
    "dmgDice": "2d6",
    "dmgType": "Cortante",
    "rarity": "Lendário",
    "description": "You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a fiend or an undead with it, that creature takes an extra 2d10 radiant damage. While you hold the drawn sword, it creates an aura in a 10-foot radius around you. You and all creatures friendly to you in the aura have advantage on saving throws against spells and other magical effects. If you have 17 or more levels in the paladin class, the radius of the aura increases to 30 feet."
  },
  {
    "name": "{modifier}Rags",
    "type": "other",
    "rarity": "Comum",
    "description": "Three {modifier}rags in an old wicker basket."
  },
  {
    "name": "{modifier}Sword",
    "type": "other",
    "rarity": "Comum",
    "description": "A used, {modifier}double-bladed sword."
  },
  {
    "name": "Bucket of {modifier}Eels",
    "type": "other",
    "rarity": "Comum",
    "description": "A small bucket of {modifier}eels. The bucket can be re-used, but it's unlikely the smell of eel will ever truly be washed out."
  },
  {
    "name": "Box of {modifier}Nails",
    "type": "other",
    "rarity": "Comum",
    "description": "A box filled with 20 {modifier}iron nails."
  },
  {
    "name": "{modifier}Beaver Pelts",
    "type": "other",
    "rarity": "Comum",
    "description": "A string of eight {modifier}beaver pelts."
  },
  {
    "name": "{modifier}Belt",
    "type": "other",
    "rarity": "Comum",
    "description": "An old {modifier}leather belt."
  },
  {
    "name": "{modifier}Mask",
    "type": "other",
    "rarity": "Comum",
    "description": "An ornate {modifier}mask stitched with silver thread."
  },
  {
    "name": "{modifier}Blank Scroll",
    "type": "other",
    "rarity": "Comum",
    "description": "A blank scroll. It could have any spell in the world on it, eventually. The possibilities are endless."
  },
  {
    "name": "Woolen Blanket",
    "type": "other",
    "rarity": "Comum",
    "description": "A thick woolen blanket. Something like this is perfect for wrapping up during those long cold nights spent staring at a cave wall."
  },
  {
    "name": "Blood Stained Dress",
    "type": "other",
    "rarity": "Comum",
    "description": "A blood-stained dress which, despite being found in ruins which have lain undisturbed for centuries, is still a vibrant, stunning blue."
  },
  {
    "name": "Blue Quartz Gem",
    "type": "other",
    "rarity": "Comum",
    "description": "A small quartz gemstone shaped in a bevelled square. It is transparent pale blue in color."
  },
  {
    "name": "{modifier}Scarf",
    "type": "other",
    "rarity": "Comum",
    "description": "A spectaculary unspectacular {modifier}woolen scarf."
  },
  {
    "name": "Bone Dice",
    "type": "other",
    "rarity": "Comum",
    "description": "A pair of engraved bone dice."
  },
  {
    "name": "Bone Fragments",
    "type": "other",
    "rarity": "Comum",
    "description": "Bits of bone from an unknown creature."
  },
  {
    "name": "Bone Needle",
    "type": "other",
    "rarity": "Comum",
    "description": "A long needle carved out of bone."
  },
  {
    "name": "Carved Bone Statuette",
    "type": "other",
    "rarity": "Comum",
    "description": "A carved ox bone female figure statue on a wooden base. The statue is 16 in height."
  },
  {
    "name": "Cloth Scrap",
    "type": "other",
    "rarity": "Comum",
    "description": "An old scrap of cloth from a shirt or sheet of some kind."
  },
  {
    "name": "Cloth-of-gold Vestments",
    "type": "other",
    "rarity": "Comum",
    "description": "These holy garments are made of silk interwoven with gold threads."
  },
  {
    "name": "Comb",
    "type": "other",
    "rarity": "Comum",
    "description": "A small wooden comb."
  },
  {
    "name": "Cooking Pot",
    "type": "other",
    "rarity": "Comum",
    "description": "A cast iron cooking pot. It smells like it was last used for soup."
  },
  {
    "name": "Copper Acorns",
    "type": "other",
    "rarity": "Comum",
    "description": "Heavy, solid copper acorns with perfect natural detail."
  },
  {
    "name": "Copper Chalice",
    "type": "other",
    "rarity": "Comum",
    "description": "A small copper chalice with a silver filigree."
  },
  {
    "name": "Crude Box",
    "type": "other",
    "rarity": "Comum",
    "description": "A wooden box. Carved by someone who has had no formal training in woodworking, and it shows."
  },
  {
    "name": "Crude Holy Symbol",
    "type": "other",
    "rarity": "Comum",
    "description": "A crudely carved wooden holy symbol."
  },
  {
    "name": "Crude Pipe",
    "type": "other",
    "rarity": "Comum",
    "description": "A crudely carved wooden pipe."
  },
  {
    "name": "Demon's Vale Wine",
    "type": "other",
    "rarity": "Comum",
    "description": "A one-gallon cask of Demon’s Vale Wine; a fiery red wine known to be made from hot peppers."
  },
  {
    "name": "Dinosaur Bacon",
    "type": "other",
    "rarity": "Comum",
    "description": "18 dried rashers of meat, possibly the largest rashers you have ever seen. They are wrapped in a sheep bladder cloth which has been labelled THUNDERER MEAT in large, rough handwriting."
  },
  {
    "name": "Dire Bat Wings",
    "type": "other",
    "rarity": "Comum",
    "description": "Two large Dire Bat wings. It is unclear how long they have been seperated from the rest of the bat, but they are in good condition and could potentially be used as a crafting material."
  },
  {
    "name": "Disk of Balance",
    "type": "other",
    "rarity": "Comum",
    "description": "A disk of finely polished stone. On one side, the Elvish rune for death is inscribed in blackest obsidian. Upon the other, the Dwarven rune for life is inscribed in the palest ivory."
  },
  {
    "name": "Dried Flower",
    "type": "other",
    "rarity": "Comum",
    "description": "A flower that has been dried out to preserve it."
  },
  {
    "name": "Leather Ball",
    "type": "other",
    "rarity": "Comum",
    "description": "A leather ball stuffed with chicken feathers."
  },
  {
    "name": "Empty Vial",
    "type": "other",
    "rarity": "Comum",
    "description": "An empty vial, just waiting to be filled with something more valuable than itself."
  },
  {
    "name": "Fat Cat Statue",
    "type": "other",
    "rarity": "Comum",
    "description": "A life sized copper statue of a fat cat with amber eyes that purrs when stroked. Curiously, it does not detect as magic."
  },
  {
    "name": "Fine Cheese",
    "type": "other",
    "rarity": "Comum",
    "description": "A 5’ diameter wheel of fine, aged cheese"
  },
  {
    "name": "Flesh Shield",
    "type": "other",
    "rarity": "Comum",
    "description": "A small wooden shield bound in human skin bearing a tattoo that appears to be some sort of map. The skin is held in place with a rim of beaten copper."
  },
  {
    "name": "Flint & Steel",
    "type": "other",
    "rarity": "Comum",
    "description": "A carved steel striker and a piece of shaped flint that allows the user to start a fire."
  },
  {
    "name": "Fool's Gold",
    "type": "other",
    "rarity": "Comum",
    "description": "A handheld water pan with a number of chunks of pyrite in it, otherwise known as Fool's Gold. You might be able to convince someone that these nuggets are real gold, but not for very long."
  },
  {
    "name": "Fragrant Torches",
    "type": "other",
    "rarity": "Comum",
    "description": "A bag containing 1d8 torches infused with pleasant fragrances. This may have been owned by a tanner, to cover the overwhelming stench of tannin that is used in the leathermaking process."
  },
  {
    "name": "{modifier}Garlic",
    "type": "other",
    "rarity": "Comum",
    "description": "A wreath of eight {modifier}garlic buds."
  },
  {
    "name": "Glass Sphere",
    "type": "other",
    "rarity": "Comum",
    "description": "A 14 inch diameter sealed glass sphere containing water and an ornamental fish."
  },
  {
    "name": "Glittering Glass",
    "type": "other",
    "rarity": "Comum",
    "description": "A sparkling handful of raw gems."
  },
  {
    "name": "Glow Stone",
    "type": "other",
    "rarity": "Comum",
    "description": "A small green stone that gives off a feint light that's practically imperceptable in anything other than pitch black darkness. It could be used as a marker or a light source in a pinch."
  },
  {
    "name": "{modifier}Jerky",
    "type": "other",
    "rarity": "Comum",
    "description": "A pound of {modifier}jerky."
  },
  {
    "name": "Gold Bracelet",
    "type": "other",
    "rarity": "Comum",
    "description": "A small gold bracelet. It's design is plain so as to be appropriate for anyone."
  },
  {
    "name": "Gold Locket",
    "type": "other",
    "rarity": "Comum",
    "description": "A charming golden locket with a painted portrait inside."
  },
  {
    "name": "Hematite",
    "type": "other",
    "rarity": "Comum",
    "description": "A rather dull gray-black hematite gem with the remains of a necklace fasten on its back."
  },
  {
    "name": "Holy Ice Symbol",
    "type": "other",
    "rarity": "Comum",
    "description": "An ornate block of ice carved into an ancient holy symbol. The carving has a subtle taint of magic to it, but it's not exactly clear what prevents it from melting."
  },
  {
    "name": "Holy Symbol",
    "type": "other",
    "rarity": "Comum",
    "description": "A wooden holy symbol."
  },
  {
    "name": "Honey",
    "type": "other",
    "rarity": "Comum",
    "description": "A quart of honey."
  },
  {
    "name": "Inhalation Herbs & Essences",
    "type": "other",
    "rarity": "Comum",
    "description": "Inhalation herbs & essences provide natural healing remedies for all manner of symptoms such as headaches, colds and flu."
  },
  {
    "name": "Iron Buckle",
    "type": "other",
    "rarity": "Comum",
    "description": "An iron belt buckle that's beginning to rust."
  },
  {
    "name": "Iron Earring",
    "type": "other",
    "rarity": "Comum",
    "description": "An iron earring. Missing it's twin."
  },
  {
    "name": "Iron Nail",
    "type": "other",
    "rarity": "Comum",
    "description": "A large iron nail, useful for fixing things together."
  },
  {
    "name": "Iron Spike",
    "type": "other",
    "rarity": "Comum",
    "description": "A large iron spike, useful for fixing heavy items together."
  },
  {
    "name": "Jar of Eyeballs",
    "type": "other",
    "rarity": "Comum",
    "description": "A jar containing six eyeballs (2 human, 1 goblin, 1 ogre, 1 worg, and 1 hawk) in a clear liquid."
  },
  {
    "name": "Pile of Coal",
    "type": "other",
    "rarity": "Comum",
    "description": "A pile of coal."
  },
  {
    "name": "Lead Coins",
    "type": "other",
    "rarity": "Comum",
    "description": "Satchel of gold painted lead coins."
  },
  {
    "name": "Little Riding Hood",
    "type": "other",
    "rarity": "Comum",
    "description": "A bright red hooded cape sized for a child, spattered with dried blood."
  },
  {
    "name": "Ring of Engagement",
    "type": "other",
    "rarity": "Comum",
    "description": "Someone used this to get married"
  },
  {
    "name": "Old Hat",
    "type": "other",
    "rarity": "Comum",
    "description": "A ragged old hat with a moth eaten brim."
  },
  {
    "name": "Old Pouch",
    "type": "other",
    "rarity": "Comum",
    "description": "An old pouch. Works as any pouch might, but it has a hole in it."
  },
  {
    "name": "Old Round Shield",
    "type": "other",
    "rarity": "Comum",
    "description": "Father’s old round shield."
  },
  {
    "name": "Parchment",
    "type": "other",
    "rarity": "Comum",
    "description": "A spare bit of parchment."
  },
  {
    "name": "Potpourri",
    "type": "other",
    "rarity": "Comum",
    "description": "A fragrant bowl of potpourri."
  },
  {
    "name": "River Stone",
    "type": "other",
    "rarity": "Comum",
    "description": "A stone that has been worn down to a smooth finish. Probably from a river bed."
  },
  {
    "name": "Saw",
    "type": "other",
    "rarity": "Comum",
    "description": "A simple one-hand saw"
  },
  {
    "name": "Scroll Case",
    "type": "other",
    "rarity": "Comum",
    "description": ""
  },
  {
    "name": "Silk Handkerchief",
    "type": "other",
    "rarity": "Comum",
    "description": "This silk handkerchief is embroidered with a pale pink pattern."
  },
  {
    "name": "Silver Ewer",
    "type": "other",
    "rarity": "Comum",
    "description": "A large jug with a wide mouth coated in silver."
  },
  {
    "name": "Tin Cup",
    "type": "other",
    "rarity": "Comum",
    "description": "A tin drinking cup."
  },
  {
    "name": "Tobacco",
    "type": "other",
    "rarity": "Comum",
    "description": "A small amount of tobacco wrapped in a large soft leaf."
  },
  {
    "name": "Unreadable Note",
    "type": "other",
    "rarity": "Comum",
    "description": "A paper note that's been left on a damp floor. It's completely illegible."
  },
  {
    "name": "Walking Stick",
    "type": "other",
    "rarity": "Comum",
    "description": "A wooden walking stick."
  },
  {
    "name": "Weighted Die (6 Sided)",
    "type": "other",
    "rarity": "Comum",
    "description": "A weighted dice which will almost always land on a 6."
  },
  {
    "name": "Whistle",
    "type": "other",
    "rarity": "Comum",
    "description": "A small wooden whistle."
  },
  {
    "name": "Wolf Pelt",
    "type": "other",
    "rarity": "Comum",
    "description": "A grey and white wolf pelt."
  },
  {
    "name": "Wooden Board",
    "type": "other",
    "rarity": "Comum",
    "description": "A weather worn wooden board, inscribed with patterns which make it clear that it was once used for a game whose rules have long since been lost to time."
  },
  {
    "name": "Wooden Spike",
    "type": "other",
    "rarity": "Comum",
    "description": "A long wooden spike, used to fix soft items together or kill vampires while they sleep."
  },
  {
    "name": "Raisins",
    "type": "other",
    "rarity": "Comum",
    "description": "½ tin of raisins."
  },
  {
    "name": "Soup Ladel",
    "type": "other",
    "rarity": "Comum",
    "description": "A kitchen implement often used for serving delicious soups. It was carved from the wood of a sturdy tree, so it actually packs quite the wallop."
  },
  {
    "name": "Silver-tipped Quill",
    "type": "other",
    "rarity": "Comum",
    "description": "A silver-tipped quill with an elaborate white feather."
  },
  {
    "name": "Marbles",
    "type": "other",
    "rarity": "Comum",
    "description": "A set of simple marbles"
  },
  {
    "name": "Dead Rat",
    "type": "other",
    "rarity": "Comum",
    "description": "An old dead rat. It has begun to decay, and eminates an unpleasant smell."
  },
  {
    "name": "Bones with bitemarks",
    "type": "other",
    "rarity": "Comum",
    "description": "A small pile of bones with bitemarks from rodent."
  },
  {
    "name": "{modifier}Twigs",
    "type": "other",
    "rarity": "Comum",
    "description": "Just some {modifier}twigs."
  },
  {
    "name": "Pile of {modifier}Slime",
    "type": "other",
    "rarity": "Comum",
    "description": "Is this goblin snort?"
  },
  {
    "name": "{modifier}Hay",
    "type": "other",
    "rarity": "Comum",
    "description": "A small bundle of {modifier} hay. Maybe it was meant for a pillow."
  },
  {
    "name": "Glass Shards",
    "type": "other",
    "rarity": "Comum",
    "description": "A few, not very sharp glass shards."
  },
  {
    "name": "Smooth Pebbles",
    "type": "other",
    "rarity": "Comum",
    "description": "Some ordinary, smooth pebbles."
  },
  {
    "name": "{modifier}Human Finger",
    "type": "other",
    "rarity": "Comum",
    "description": "Not a good omen..."
  },
  {
    "name": "Voodoo Doll",
    "type": "other",
    "rarity": "Comum",
    "description": "A small voodoo doll with a lot of puncture holes."
  },
  {
    "name": "{modifier}Shoe",
    "type": "other",
    "rarity": "Comum",
    "description": "A single {modifier}shoe. The fitting counterpart seems to be missing."
  },
  {
    "name": "Ring of Keys",
    "type": "other",
    "rarity": "Comum",
    "description": "A ring with 13 keys in all kind of shapes on it."
  },
  {
    "name": "Single {modifier}Coin",
    "type": "other",
    "rarity": "Comum",
    "description": "A {modifier}coin with an unfamiliar emblem."
  },
  {
    "name": "{modifier}Bandages",
    "type": "other",
    "rarity": "Comum",
    "description": "Some {modifier}bandages. You should really not use them anymore."
  },
  {
    "name": "Broken Mirror",
    "type": "other",
    "rarity": "Comum",
    "description": "Probably brings bad luck to whoever broke it."
  },
  {
    "name": "{modifier}Buttons",
    "type": "other",
    "rarity": "Comum",
    "description": "A set of 15 {modifier}buttons in different designs and sizes"
  },
  {
    "name": "{modifier}Teeth",
    "type": "other",
    "rarity": "Comum",
    "description": "A few {modifier}teeth. Who collects something like that?"
  },
  {
    "name": "Chalk of Identification",
    "type": "other",
    "rarity": "Incomum",
    "description": "This piece of chalk comes in a small wooden box decorated with intricate ornaments. In the wooden box, besides the piece of chalk, there is also a small parchment with instructions on how to use the piece of chalk.\nThe owner can draw a circle with special ornaments on a flat surface and place an object in it which consumes a charge. Over the course of 10 minutes, the chalk particles on the surface are consumed and the person drawing the circle becomes aware of the magical properties of the object placed within it.\nWhen found the Chalk has 1d6 + 2 charges."
  }
];

export const isProficientInItem = (characterClass: string, itemType: string, itemName: string, itemCategory?: string): boolean => {
  const normalizedClass = characterClass.trim().toLowerCase();
  const name = itemName.toLowerCase();
  const type = itemType.toLowerCase();

  // Shields, Rings, Others
  if (type === 'ring' || type === 'other') return true; // rings and miscellaneous don't require training to benefit from them (though some require attunement)

  // Determine armor category for check
  let armorCat: 'light' | 'medium' | 'heavy' | 'shield' | 'none' = 'none';
  if (type === 'shield') {
    armorCat = 'shield';
  } else if (type === 'armor') {
    armorCat = getArmorCategory(itemName);
  }

  // Determine weapon category (Simple vs Martial)
  const isSimpleWeapon = itemCategory === 'Simples' || 
    name.includes('adaga') || name.includes('dagger') ||
    name.includes('lança') || name.includes('spear') ||
    name.includes('bordão') || name.includes('quarterstaff') ||
    name.includes('maça') || name.includes('mace') ||
    name.includes('machadinha') || name.includes('handaxe') ||
    name.includes('curto') || name.includes('shortbow') ||
    name.includes('besta leve') || name.includes('light crossbow') ||
    name.includes('azagaia') || name.includes('javelin') ||
    name.includes('clava') || name.includes('club') ||
    name.includes('adaga') || name.includes('dart') ||
    name.includes('honda') || name.includes('sling');

  const isMartialWeapon = itemCategory === 'Marcial' ||
    name.includes('longa') || name.includes('longsword') ||
    name.includes('curta') || name.includes('shortsword') ||
    name.includes('larga') || name.includes('greatsword') ||
    name.includes('batalha') || name.includes('battleaxe') ||
    name.includes('grande') || name.includes('greataxe') ||
    name.includes('alabarda') || name.includes('halberd') ||
    name.includes('guerra') || name.includes('warhammer') ||
    name.includes('rapieira') || name.includes('rapier') ||
    name.includes('chicote') || name.includes('whip') ||
    name.includes('arco longo') || name.includes('longbow') ||
    name.includes('besta pesada') || name.includes('heavy crossbow');

  // PALADIN, FIGHTER, RANGER
  if (normalizedClass.includes('paladin') || normalizedClass.includes('paladino') ||
      normalizedClass.includes('fighter') || normalizedClass.includes('guerreiro') ||
      normalizedClass.includes('ranger') || normalizedClass.includes('patrulheiro')) {
    return true; // Proficient in all weapons, armors, and shields
  }

  // BARBARIAN
  if (normalizedClass.includes('barbarian') || normalizedClass.includes('bárbaro')) {
    if (type === 'armor') return armorCat === 'light' || armorCat === 'medium';
    if (type === 'shield') return true;
    if (type === 'weapon') return true; // all simple and martial
  }

  // BARD
  if (normalizedClass.includes('bard') || normalizedClass.includes('bardo')) {
    if (type === 'armor') return armorCat === 'light';
    if (type === 'shield') return false;
    if (type === 'weapon') {
      if (isSimpleWeapon) return true;
      // Bards also proficient in longsword, rapier, shortsword, hand crossbow
      return name.includes('longsword') || name.includes('espada longa') ||
             name.includes('rapier') || name.includes('rapieira') ||
             name.includes('shortsword') || name.includes('espada curta') ||
             name.includes('hand crossbow') || name.includes('besta de mão');
    }
  }

  // CLERIC
  if (normalizedClass.includes('cleric') || normalizedClass.includes('clérigo')) {
    const isWarOrLife = normalizedClass.includes('guerra') || normalizedClass.includes('vida') || normalizedClass.includes('tempestade');
    if (type === 'armor') {
      if (armorCat === 'heavy') return isWarOrLife; // War and Life domains get heavy armor
      return armorCat === 'light' || armorCat === 'medium';
    }
    if (type === 'shield') return true;
    if (type === 'weapon') {
      if (isSimpleWeapon) return true;
      if (normalizedClass.includes('guerra') || normalizedClass.includes('tempestade')) return true; // War/Tempest gets martial weapons
      return false;
    }
  }

  // DRUID
  if (normalizedClass.includes('druid') || normalizedClass.includes('druida')) {
    if (type === 'armor') return armorCat === 'light' || armorCat === 'medium';
    if (type === 'shield') return true;
    if (type === 'weapon') {
      return name.includes('club') || name.includes('clava') ||
             name.includes('dagger') || name.includes('adaga') ||
             name.includes('dart') || name.includes('dardo') ||
             name.includes('javelin') || name.includes('azagaia') ||
             name.includes('mace') || name.includes('maça') ||
             name.includes('quarterstaff') || name.includes('bordão') ||
             name.includes('scimitar') || name.includes('cimitarra') ||
             name.includes('sickle') || name.includes('foice') ||
             name.includes('sling') || name.includes('honda') ||
             name.includes('spear') || name.includes('lança');
    }
  }

  // ROGUE
  if (normalizedClass.includes('rogue') || normalizedClass.includes('ladino')) {
    if (type === 'armor') return armorCat === 'light';
    if (type === 'shield') return false;
    if (type === 'weapon') {
      if (isSimpleWeapon) return true;
      return name.includes('longsword') || name.includes('espada longa') ||
             name.includes('rapier') || name.includes('rapieira') ||
             name.includes('shortsword') || name.includes('espada curta') ||
             name.includes('hand crossbow') || name.includes('besta de mão');
    }
  }

  // WIZARD, SORCERER
  if (normalizedClass.includes('wizard') || normalizedClass.includes('mago') ||
      normalizedClass.includes('sorcerer') || normalizedClass.includes('feiticeiro')) {
    if (type === 'armor' || type === 'shield') return false;
    if (type === 'weapon') {
      return name.includes('dagger') || name.includes('adaga') ||
             name.includes('dart') || name.includes('dardo') ||
             name.includes('sling') || name.includes('honda') ||
             name.includes('quarterstaff') || name.includes('bordão') ||
             name.includes('light crossbow') || name.includes('besta leve');
    }
  }

  // WARLOCK
  if (normalizedClass.includes('warlock') || normalizedClass.includes('bruxo')) {
    if (type === 'armor') return armorCat === 'light';
    if (type === 'shield') return false;
    if (type === 'weapon') return isSimpleWeapon;
  }

  // MONK
  if (normalizedClass.includes('monk') || normalizedClass.includes('monge')) {
    if (type === 'armor' || type === 'shield') return false;
    if (type === 'weapon') {
      return isSimpleWeapon || name.includes('shortsword') || name.includes('espada curta');
    }
  }

  // ARTIFICER
  if (normalizedClass.includes('artificer') || normalizedClass.includes('artífice')) {
    if (type === 'armor') return armorCat === 'light' || armorCat === 'medium';
    if (type === 'shield') return true;
    if (type === 'weapon') return isSimpleWeapon;
  }

  return false;
};
