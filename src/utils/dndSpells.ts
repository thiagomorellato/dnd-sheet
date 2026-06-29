export interface Spell {
  name: string;
  level: number;
  classes: string[];
  school: string;
  castingTime: string;
  range: string;
  duration: string;
  description: string;
}

export const SPELLS_DATABASE: Spell[] = [
  {
    "name": "Esguicho de Ácido",
    "level": 0,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "You hurl a bubble of acid. Escolha uma criatura dentro do alcance, or escolha duas criaturas dentro do alcance that are a até 1,5 metro of each other. A alvo must succeed on a Teste de resistência de Destreza or take 1d6 dano de ácido.\n\nThis spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
  },
  {
    "name": "Alarme",
    "level": 1,
    "classes": [
      "Patrulheiro",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "8 horas",
    "description": "You set an alarm against unwanted intrusion. Choose a door, a window, or an area dentro do alcance that is no larger than a cubo de 6 metros. Até a magia terminar, an alarm alerts you whenever a Tiny or larger criatura touches or enters the warded area. When você conjura a magia, you can designate criaturas that won't set off the alarm. You also choose whether the alarm is mental or audible.\n\nA mental alarm alerts you with a ping in your mind if you are within 1,5 quilômetro of the warded area. This ping awakens you if you are sleeping.\n\nAn audible alarm produces the sound of a hand bell for 10 seconds a até 18 metros."
  },
  {
    "name": "Amizade com Animais",
    "level": 1,
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "24 horas",
    "description": "This spell lets you convince a besta that you mean it no harm. Choose a besta that que você possa ver dentro do alcance. It must see and hear you. If the besta's Intelligence is 4 ou superior, the spell fails. Otherwise, the besta must succeed on a Teste de resistência de Sabedoria or be enfeitiçado by you for the spell's duration. If you or one of your companions harms the alvo, the magia termina."
  },
  {
    "name": "Perdição",
    "level": 1,
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Up to three criaturas of your choice that que você possa ver dentro do alcance must make Teste de resistência de Carismas. Whenever a alvo that fails this teste de resistência makes an jogada de ataque or a teste de resistência before the magia termina, the alvo must roll a d4 and subtract the number rolled from the jogada de ataque or teste de resistência."
  },
  {
    "name": "Proteção contra Lâminas",
    "level": 0,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "1 rodada",
    "description": "You extend your hand and trace a sigil of warding in the air. Until the end of your next turn, you have resistance against bludgeoning, piercing, and dano cortante dealt by weapon attacks."
  },
  {
    "name": "Abençoar",
    "level": 1,
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You bless up to three criaturas of your choice dentro do alcance. Whenever a alvo makes an jogada de ataque or a teste de resistência before the magia termina, the alvo can roll a d4 and add the number rolled to the jogada de ataque or teste de resistência."
  },
  {
    "name": "Mãos Ardentes",
    "level": 1,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Self (15-foot cone)",
    "duration": "Instantâneo",
    "description": "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each criatura in a 4,5 metros cone must make a Teste de resistência de Destreza. A criatura takes 3d6 dano de fogo em um teste de resistência falho, or metade do dano on a successful one.\n\nThe fire ignites any flammable objects in the area that aren’t being worn or carried."
  },
  {
    "name": "Enfeitiçar Pessoa",
    "level": 1,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 hora",
    "description": "You attempt to charm a humanoide que você possa ver dentro do alcance. It must make a Teste de resistência de Sabedoria, and does so with vantagem if you or your companions are fighting it. If it fails the teste de resistência, it is enfeitiçado by you até a magia terminar or until you or your companions do anything harmful to it. The enfeitiçado criatura regards you as a friendly acquaintance. When the magia termina, the criatura knows it was enfeitiçado by you."
  },
  {
    "name": "Toque Gélido",
    "level": 0,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "1 rodada",
    "description": "Você cria a ghostly, skeletal hand in the space of a criatura dentro do alcance. Make a ataque de magia à distância against the criatura to assail it with the chill of the grave. No sucesso, the alvo takes 1d8 dano necrótico, and it can't regain pontos de vida until the start of your next turn. Until then, the hand clings to the alvo.\n\nIf you sucesso an mortos-vivos alvo, it also has desvantagem on jogada de ataques against you until the end of your next turn.\n\nThis spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
  },
  {
    "name": "Chromatic Orb",
    "level": 1,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Instantâneo",
    "description": "You hurl a 4-inch-diameter sphere of energy at a criatura that que você possa ver dentro do alcance. You choose acid, cold, fire, lightning, poison, or thunder for the type of orb Você cria, and then make a ataque de magia à distância against the alvo. If the attack sucessos, the criatura takes 3d8 of the type you chose."
  },
  {
    "name": "Aspersão de Cores",
    "level": 1,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "Self (15-foot cone)",
    "duration": "1 rodada",
    "description": "A dazzling array of flashing, colored light springs from your hand. Roll 6d10; the total is how many pontos de vida of criaturas this spell can effect. Criaturas in a 4,5 metros cone originating from you are affected in ascending order of their current pontos de vida (ignoring inconsciente criaturas and criaturas that can't see).\n\nStarting with the criatura that has the lowest current pontos de vida, each criatura affected by this spell is cego até a magia terminar. Subtract each criatura's pontos de vida from the total before moving on to the criatura with the next lowest pontos de vida. A criatura's pontos de vida must be equal to or less than the remaining total for that criatura to be affected."
  },
  {
    "name": "Comando",
    "level": 1,
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 rodada",
    "description": "You speak a one-word command to a criatura que você possa ver dentro do alcance. The alvo must succeed on a Teste de resistência de Sabedoria or follow the command on its next turn. The spell has no effect if the alvo is mortos-vivos, if it doesn't understand your language, or if your command is directly harmful to it. \n\n Some typical commands and their effects follow. You might issue a command other than one described here. If you do so, the GM determines how the alvo behaves. If the alvo can't follow your command, the magia termina. \n\nApproach: The alvo moves toward you by the shortest and most direct route, ending its turn if it moves a até 1,5 metro of you. \n\nDrop: The alvo drops whatever it is holding and then ends its turn. \n\nFlee: The alvo spends its turn moving away from you by the fastest available means. \n\nGrovel: The alvo falls caído and then ends its turn. \n\nHalt: The alvo doesn't move and takes no ações. A flying criatura stays aloft, provided that it is able to do so. If it must move to stay aloft, it flies the minimum distance needed to remain in the air."
  },
  {
    "name": "Compelled Duel",
    "level": 1,
    "classes": [
      "Paladino"
    ],
    "school": "Encantamento",
    "castingTime": "1 bonus ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You attempt to compel a criatura into a duel. One criatura that que você possa ver dentro do alcance must make a Teste de resistência de Sabedoria. Em um teste de resistência falho, the criatura is drawn to you, compelled by your divine demand. For the duration, it has desvantagem on jogada de ataques against criaturas other than you, and must make a Teste de resistência de Sabedoria each time it attempts to move into a space that is more than 9 metros away from you; if it succeeds on this teste de resistência, the spell doesn't restrict the alvo's movimento for that turn.\n\nThe magia termina if you attack any other criatura, if you cast a spell that alvos a hostile criatura other than the alvo, if a criatura friendly to you damages the alvo or casts a harmful spell on it, or if you end your turn more than 9 metros away from the alvo."
  },
  {
    "name": "Compreender Idiomas",
    "level": 1,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "1 hora",
    "description": "For the duration, you understand the literal meaning of any spoken language that you hear. You also understand any written language that you see, but you must be touching the surface on which the words are written. It takes about 1 minuto to read one page of text.\n\nThis spell doesn’t decode secret messages in a text or a glyph, such as an arcane sigil, that isn’t part of a written language."
  },
  {
    "name": "Criar ou Destruir Água",
    "level": 1,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "You either create or destroy water.\n\nCreate Water: Você cria up to 10 gallons of clean water dentro do alcance in an open container. Alternatively, the water falls as rain in a 9 metros cube dentro do alcance, extinguishing exposed flames in the area.\n\nDestroy Water: You destroy up to 10 gallons of water in an open container dentro do alcance. Alternatively, you destroy fog in a 9 metros cube dentro do alcance."
  },
  {
    "name": "Curar Ferimentos",
    "level": 1,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladino",
      "Patrulheiro"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "A criatura you touch regains a number of pontos de vida equal to 1d8 + your atributo de conjuração modifier. This spell has no effect on mortos-vivos or constructoos."
  },
  {
    "name": "Luzes Dançantes",
    "level": 0,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você cria up to four torch-sized lights dentro do alcance, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. You can also combine the four lights into one glowing vaguely humanoide form of Medium size. Whichever form you choose, each light sheds dim light in a raio de 3 metros. As a ação bônus on your turn, you can move the lights up to 18 metros to a new spot dentro do alcance. A light must be within 20 feet of another light created by this spell, and a light winks out if it exceeds the spell’s range."
  },
  {
    "name": "Detectar o Bem e o Mal",
    "level": 1,
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "For the duration, you know if there is an aberration, celestial, elemental, feérico, inimigo, or mortos-vivos a até 9 metros of you, as well as where the criatura is located. Similarly, you know if there is a place or object a até 9 metros of you that has been magically consecrated or desecrated.\n\nThe spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
  },
  {
    "name": "Detectar Magia",
    "level": 1,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladino",
      "Patrulheiro",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "For the duration, you sense the presence of magic a até 9 metros of you. If you sense magic in this way, you can use your ação to see a faint aura arodada any visible criatura or object in the area that bears magic, and you learn its school of magic, if any.\n\nThe spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
  },
  {
    "name": "Detectar Veneno e Doenças",
    "level": 1,
    "classes": [
      "Clérigo",
      "Druida",
      "Paladino",
      "Patrulheiro"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "For the duration, you can sense the presence and location of poisons, poisonous criaturas, and diseases a até 9 metros of you. You also identify the kind of poison, poisonous criatura, or disease in each case.\n\nThe spell can penetrate most barriers, but it is blocked by 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood or dirt."
  },
  {
    "name": "Disfarçar a Si Mesmo",
    "level": 1,
    "classes": [
      "Bardo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "1 hora",
    "description": "You make yourself - including your clothing, armor, weapons, and other belongings on your person - look different até a magia terminar or until you use your ação to disfalha it. Que você possa verm 1 foot shorter or taller and can appear thin, fat, or in between. You can't change your body type, so you must adopt a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you.\n\nThe changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to your outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel your head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair.\n\nTo discern that you are disguised, a criatura can use its ação to inspect your apperance and must succeed on an Intelligence (Investigation) check against your CD de resistência de magia."
  },
  {
    "name": "Favor Divino",
    "level": 1,
    "classes": [
      "Paladino"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "Your prayer empowers you with divine radiance. Até a magia terminar, your weapon attacks deal an extra 1d4 dano radiante No sucesso."
  },
  {
    "name": "Sussurros Dissonantes",
    "level": 1,
    "classes": [
      "Bardo"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "You whisper a discordant melody that only one criatura of your choice dentro do alcance can hear, wracking it with terrible pain. The alvo must make a Teste de resistência de Sabedoria. Em um teste de resistência falho, it takes 3d6 dano psíquico and must immediately use its reação, if available, to move as far as its velocidade allows away from you. The criatura doesn't move into obviously dangerous grodada, such as a fire or a pit. Em um teste de resistência bem-sucedido, the alvo takes metade do dano and doesn't have to move away. A ensurdecido criatura automatically succeeds on the save."
  },
  {
    "name": "Arte Druídica",
    "level": 0,
    "classes": [
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "Whispering to the spirits of nature, Você cria one of the following effects dentro do alcance:Você cria a tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 horas. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 rodada.You instantly make a flower bloom, a seed pod open, or a leaf bud bloom.Você cria an instantenous, harmless sensory effect, such as falling leaves, a puff of wind, the sound of a small animal, or the faint order of skunk. The effect must fit in a 1,5 metro cube.You instantly light or snuff out a candle, a torch, or a small campfire."
  },
  {
    "name": "Rajada Mística",
    "level": 0,
    "classes": [
      "Bruxo"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantâneo",
    "description": "A beam of crackling energy streaks toward a criatura dentro do alcance. Make a ataque de magia à distância against the alvo. No sucesso, the alvo takes 1d10 dano de força. \n\n The spell creates more than one beam when you reach nível superiors: two beams at 5th level, three beams at 11th level, and four beams at 17th level. You can direct the beams at the same alvo or at different ones. Make a separate jogada de ataque for each beam."
  },
  {
    "name": "Ensnaring Strike",
    "level": 1,
    "classes": [
      "Patrulheiro"
    ],
    "school": "Conjuração",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "The next time you sucesso a criatura with a weapon attack before this magia termina, a writhing mass of thorny vines appears at the point of impact, and the alvo must succeed on a Teste de resistência de Força or be imobilizado by the magical vines até a magia terminar. A Large or larger criatura has vantagem on this teste de resistência. If the alvo succeeds on the save, the vines shrivel away.\n\nWhile imobilizado by this spell, the alvo takes 1d6 dano perfurante at the start of each of its turns. A criatura imobilizado by the vines or one that can touch a criatura can use its ação to make a Strength check against your CD de resistência de magia. On a success, the alvo is freed."
  },
  {
    "name": "Emaranhar",
    "level": 1,
    "classes": [
      "Druida"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Grasping weeds and vines sprout from the grodada in a 20-foot square starting form a point dentro do alcance. For the duration, these plantaas turn the grodada in the area into difficult terrain.\n\nA criatura in the area when você conjura a magia must succeed on a Teste de resistência de Força or be imobilizado by the entangling plantaas até a magia terminar. A criatura imobilizado by the plantaas can use its ação to make a Strength check against your CD de resistência de magia. On a success, it frees itself.\n\nWhen the magia termina, the conjured plantaas wilt away."
  },
  {
    "name": "Fogo Feérico",
    "level": 1,
    "classes": [
      "Bardo",
      "Druida"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Each object in a cubo de 6 metros dentro do alcance is outlined in blue, green, or violet light (your choice). Any criatura in the area when the spell is cast is also outlined in light if it fails a Teste de resistência de Destreza. For the duration, objects and affected criaturas shed dim light in a raio de 3 metros.\n\nAny jogada de ataque against an affected criatura or object has vantagem if the attacker can see it, and the affected criatura or object can't benefit from being invisível."
  },
  {
    "name": "Retirada Apressada",
    "level": 1,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "This spell allows you to move at an incredible pace. Quando você conjura essa magia, and then as a ação bônus on each of your turns até a magia terminar, you can take the Dash ação."
  },
  {
    "name": "Falsa Vida",
    "level": 1,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "1 hora",
    "description": "Bolstering yourself with a necromantic facsimile of life, you gain 1d4 + 4 temporary pontos de vida for the duration."
  },
  {
    "name": "Queda de Pena",
    "level": 1,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 reação, which you take when you or a creature within 60 feet of you falls",
    "range": "18 metros",
    "duration": "1 minuto",
    "description": "Escolha até five falling criaturas dentro do alcance. A falling criatura's rate of descent slows to 18 metros per rodada até a magia terminar. If the criatura lands before the magia termina, it takes no falling damage and can land on its feet, and the magia termina for that criatura."
  },
  {
    "name": "Encontrar Familiar",
    "level": 1,
    "classes": [
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 hour",
    "range": "3 metros",
    "duration": "Instantâneo",
    "description": "You gain the service of a familiar, a spirit that takes an animal form you choose: bat, cat, crab, frog (toad), hawk, lizard, octopus, owl, poisonous snake, fish (quipper), rat, raven, sea horse, spider, or weasel. Appearing in an unoccupied space dentro do alcance, the familiar has the statistics of the chosen form, though it is a celestial, feérico, or inimigo (your choice) instead of a besta. \n\n Your familiar acts independently of you, but it always obeys your commands. In combat, it rolls its own initiative and acts on its own turn. A familiar can't attack, but it can take other ações as normal.\n\nWhen the familiar drops to 0 pontos de vida, it disappears, leaving behind no physical form. It reappears after you cast this spell again.\n\nWhile your familiar is within 100 feet of you, you can communicate with it telepathically. Additionally, as an ação, que você possa ver through your familiar's eyes and hear what it hears until the start of your next turn, gaining the benefits of any special senses that the familiar has. During this time, you are deaf and blind with regard to your own senses.\n\nAs an ação, you can temporarily disfalha your familiar. It disappears into a pocket dimension where it awaits your summons. Alternatively, you can disfalha it forever. As an ação while it is temporarily disfalhaed, you can cause it to reappear in any unoccupied space a até 9 metros of you.\n\nYou can't have more than one familiar at a time. If you cast this spell while you already have a familiar, you instead cause it to adopt a new form. Escolha uma of the forms from the above list. Your familiar transforms into the chosen criatura.\n\nFinally, when you cast a spell with a range of touch, your familiar can deliver the spell as if it had cast the spell. Your familiar must be within 100 feet of you, and it must use its reação to deliver the spell when you cast it. If the spell requires an jogada de ataque, you use your ação modifier for the roll."
  },
  {
    "name": "Raio de Fogo",
    "level": 0,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantâneo",
    "description": "You hurl a mote of fire at a criatura or object dentro do alcance. Make a ataque de magia à distância against the alvo. No sucesso, the alvo takes 1d10 dano de fogo. A flammable object sucesso by this spell ignites if it isn't being worn or carried.\n\nThis spell’s damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10)."
  },
  {
    "name": "Nuvem de Névoa",
    "level": 1,
    "classes": [
      "Druida",
      "Patrulheiro",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "Você cria a 20-foot-radius sphere of fog centered on a point dentro do alcance. The sphere spreads arodada corners, and its area is heavily obscured. It lasts for the duration or until a wind of moderate or greater velocidade (at least 10 miles per hora) disperses it."
  },
  {
    "name": "Amigos",
    "level": 0,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "For the duration, you have vantagem on all Charisma checks directed at one criatura of your choice that isn't hostile toward you. When the magia termina, the criatura realizes that you have used magic to influence its mood and becomes hostile toward you. A criatura caído to violence might attack you. Another criatura might seek retribution in other ways (at the DM's discretion), depending on the nature of your interação with it."
  },
  {
    "name": "Boa Baga",
    "level": 1,
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "Up to ten berries appear in your hand and are infused with magic for the duration. A criatura can use its ação to eat one berry. Eating a berry restores 1 ponto de vida, and the berry provides enough nourishment to sustain a criatura for a day.\n\nThe berries lose their potency if they have not been consumed within 24 horas of the casting of this spell."
  },
  {
    "name": "Graxa",
    "level": 1,
    "classes": [
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 minuto",
    "description": "Slick grease covers the grodada in a 3 metros square centered on a point dentro do alcance and turns it into difficult terrain for the duration.\n\nWhen the grease appears, each criatura standing in its area must succeed on a Teste de resistência de Destreza or fall caído. A criatura that enters the area or ends its turn there must also succeed on a Teste de resistência de Destreza or fall caído."
  },
  {
    "name": "Orientação",
    "level": 0,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 minute",
    "description": "You touch one criatura voluntária. Once before the magia termina, the alvo can roll a d4 and add the number rolled to one teste de habilidade of its choice. It can roll the die before or after making the teste de habilidade. The spell then ends."
  },
  {
    "name": "Raio Guiado",
    "level": 1,
    "classes": [
      "Clérigo"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "1 rodada",
    "description": "A flash of light streaks toward a criatura of your choice dentro do alcance. Make a ataque de magia à distância against the alvo. No sucesso, the alvo takes 4d6 dano radiante, and the next jogada de ataque made against this alvo before the end of your next turn has vantagem, thanks to the mystical dim light glittering on the alvo until then."
  },
  {
    "name": "Hail of Thorns",
    "level": 1,
    "classes": [
      "Patrulheiro"
    ],
    "school": "Conjuração",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "The next time you sucesso a criatura with a ataque à distância com arma before this magia termina, this spell creates a rain of thorns that sprouts from your ranged weapon or ammunition. In addition to the normal effects of the attack, the alvo of the attack and each criatura a até 1,5 metro of it must make a Teste de resistência de Destreza. A criatura takes 1d10 dano perfurante em um teste de resistência falho, or metade do dano on a successful one."
  },
  {
    "name": "Palavra de Cura",
    "level": 1,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "A criatura of your choice that que você possa ver dentro do alcance regains pontos de vida equal to 1d4 + your atributo de conjuração modifier. This spell has no effect on mortos-vivos or constructoos."
  },
  {
    "name": "Represália Infernal",
    "level": 1,
    "classes": [
      "Bruxo"
    ],
    "school": "Evocação",
    "castingTime": "1 reação, which you take in response to being damaged by a creature within 60 feet of you that you can see.",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "You point your finger, and the criatura that damaged you is momentarily surrodadaed by hellish flames. The criatura must make a Teste de resistência de Destreza. It takes 2d10 dano de fogo em um teste de resistência falho, or metade do dano on a successful one."
  },
  {
    "name": "Hex",
    "level": 1,
    "classes": [
      "Bruxo"
    ],
    "school": "Encantamento",
    "castingTime": "1 bonus ação",
    "range": "27 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "You place a curse on a criatura that que você possa ver dentro do alcance. Até a magia terminar, you deal an extra 1d6 dano necrótico to the alvo whenever you sucesso it with an attack. Also escolha uma ability when você conjura a magia. The alvo has desvantagem on teste de habilidades made with the chosen ability.\n\nIf the alvo drops to 0 pontos de vida before this magia termina, you can use a ação bônus on a subsequent turn of yours to curse a new criatura.\n\nA remove curse cast on the alvo ends this spell early."
  },
  {
    "name": "Heroísmo",
    "level": 1,
    "classes": [
      "Bardo",
      "Paladino"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 minute",
    "description": "A criatura voluntária you touch is imbued with bravery. Até a magia terminar, the criatura is immune to being amedrontado and gains temporary pontos de vida equal to your atributo de conjuração modifier at the start of each of its turns. When the magia termina, the alvo loses any remaining temporary pontos de vida from this spell."
  },
  {
    "name": "Marca do Caçador",
    "level": 1,
    "classes": [
      "Patrulheiro"
    ],
    "school": "Adivinhação",
    "castingTime": "1 bonus ação",
    "range": "27 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "You choose a criatura que você possa ver dentro do alcance and mystically mark it as your quarry. Até a magia terminar, you deal an extra 1d6 damage to the alvo whenever you sucesso it with a weapon attack, and you have vantagem on any Wisdom (Perception) or Wisdom (Survival) check you make to find it. If the alvo drops to 0 pontos de vida before this magia termina, you can use a ação bônus on a subsequent turn of yours to mark a new criatura."
  },
  {
    "name": "Identificar",
    "level": 1,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 minute",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You escolha uma object that you must touch throughout the casting of the spell. If it is a magic item or some other magic-imbued object, you learn its properties and how to use them, whether it requires attunement to use, and how many charges it has, if any. You learn whether any spells are affecting the item and what they are. If the item was created by a spell, you learn which spell created it.\n\nIf you instead touch a criatura throughout the casting, you learn what spells, if any, are currently affecting it."
  },
  {
    "name": "Escrita Ilusória",
    "level": 1,
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 minute",
    "range": "Toque",
    "duration": "10 dias",
    "description": "You write on parchment, paper, or some other suitable writing material and imbue it with a potent illusion that lasts for the duration.\n\nTo you and any criaturas you designate when você conjura a magia, the writing appears normal, written in your hand, and conveys whatever meaning you intended when you wrote the text. To all others, the writing appears as if it were written in an unknown or magical script that is unintelligible. Alternatively, you can cause the writing to appear to be an entirely different message, written in a different hand and language, though the language must be one you know.\n\nShould the spell be dispelled, the original script and the illusion both disappear.\n\nA criatura with truesight can read the hidden message."
  },
  {
    "name": "Infligir Ferimentos",
    "level": 1,
    "classes": [
      "Clérigo"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "Make a ataque de magia corpo a corpo against a criatura you can reach. No sucesso, the alvo takes 3d10 dano necrótico."
  },
  {
    "name": "Saltar",
    "level": 1,
    "classes": [
      "Druida",
      "Patrulheiro",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 minuto",
    "description": "You touch a criatura. The criatura's jump distance is tripled até a magia terminar."
  },
  {
    "name": "Luz",
    "level": 0,
    "classes": [
      "Bardo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "description": "You touch one object that is no larger than 3 metros in any dimension. Até a magia terminar, the object sheds bright light in a raio de 6 metros and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The magia termina if you cast it again or disfalha it as an ação.\n\nIf you alvo an object held or worn by a hostile criatura, that criatura must succeed on a Teste de resistência de Destreza to avoid the spell."
  },
  {
    "name": "Passo Longo",
    "level": 1,
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "description": "You touch a criatura. The alvo's velocidade increases by 3 metros até a magia terminar."
  },
  {
    "name": "Armadura de Mago",
    "level": 1,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "8 horas",
    "description": "You touch a criatura voluntária who isn’t wearing armor, and a protective magical force surrodadas it até a magia terminar. The alvo’s base AC becomes 13 + its Modificador de Destreza. The magia termina if the alvo dons armor or if you disfalha the spell as an ação."
  },
  {
    "name": "Mão Mágica",
    "level": 0,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 minuto",
    "description": "A spectral, floating hand appears at a point you choose dentro do alcance. The hand lasts for the duration or until you disfalha it as an ação. The hand vanishes if it is ever more than 9 metros away from you or if you cast this spell again.\n\nYou can use your ação to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 9 metros each time you use it.\n\nThe hand can’t attack, activate magic items, or carry more than 10 pounds."
  },
  {
    "name": "Míssil Mágico",
    "level": 1,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantâneo",
    "description": "Você cria three glowing darts of magical force. Each dart sucessos a criatura of your choice that que você possa ver dentro do alcance. A dart deals 1d4 + 1 dano de força to its alvo. The darts all strike simultaneously, and you can direct them to sucesso one criatura or several."
  },
  {
    "name": "Remendar",
    "level": 0,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 minute",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "This spell repairs a single break or tear in an object you touch, such as a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no longer than 1 foot in any dimension, you mend it, leaving no trace of the former damage.\n\nThis spell can physically repair a magic item or constructo, but the spell can’t restore magic to such an object."
  },
  {
    "name": "Mensagem",
    "level": 0,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "1 rodada",
    "description": "You point your finger toward a criatura dentro do alcance and whisper a message. The alvo (and only the alvo) hears the message and can reply in a whisper that only you can hear.\n\nYou can cast this spell through solid objects if you are familiar with the alvo and know it is beyond the barrier. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the spell. The spell doesn't have to follow a straight line and can travel freely arodada corners or through openings."
  },
  {
    "name": "Ilusão Menor",
    "level": 0,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 minuto",
    "description": "Você cria a sound or an image of an object dentro do alcance that lasts for the duration. The illusion also ends if you disfalha it as an ação or cast this spell again.\n\nIf Você cria a sound, its volume can range from a whisper to a scream. It can be your voice, someone else’s voice, a lion’s roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the magia termina.\n\nIf Você cria an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than a 1,5 metro cube. The image can’t create sound, light, smell, or any other sensory effect. Physical interação with the image reveals it to be an illusion, because things can pass through it.\n\nIf a criatura uses its ação to examine the sound or image, the criatura can determine that it is an illusion with a successful Intelligence (Investigation) check against your CD de resistência de magia. If a criatura discerns the illusion for what it is, the illusion becomes faint to the criatura."
  },
  {
    "name": "Borrifo de Veneno",
    "level": 0,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "Instantâneo",
    "description": "You extend your hand toward a criatura que você possa ver dentro do alcance and project a puff of noxious gas from your palm. The criatura must succeed on a Teste de resistência de Constituição or take 1d12 dano de veneno.\n\nThis spell's damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12)."
  },
  {
    "name": "Prestidigitação",
    "level": 0,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "Até 1 hora",
    "description": "This spell is a minor magical trick that novice spellcasters use for practice. Você cria one of the following magical effects dentro do alcance:Você cria an Instantâneo, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.You Instantâneoly light or snuff out a candle, a torch, or a small campfire.You Instantâneoly clean or soil an object no larger than 1 cubic foot.You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hora.You make a color, a small mark, or a symbol appear on an object or a surface for 1 hora.Você cria a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.If you cast this spell multiple times, you can have up to three of its non-Instantâneo effects active at a time, and you can disfalha such an effect as an ação."
  },
  {
    "name": "Produzir Chamas",
    "level": 0,
    "classes": [
      "Druida"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "10 minutos",
    "description": "A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment. The flame sheds bright light in a raio de 3 metros and dim light for an additional 3 metros. The magia termina if you disfalha it as an ação or if you cast it again.\n\nYou can also attack with the flame, although doing so ends the spell. Quando você conjura essa magia, or as an ação on a later turn, you can hurl the flame at a criatura a até 9 metros of you. Make a ataque de magia à distância. No sucesso, the alvo takes 1d8 dano de fogo.\n\nThis spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
  },
  {
    "name": "Proteção contra o Bem e o Mal",
    "level": 1,
    "classes": [
      "Clérigo",
      "Paladino",
      "Bruxo",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 10 minutes",
    "description": "Até a magia terminar, one criatura voluntária you touch is protected against certain types of criaturas: aberrations, celestiais, elementais, feérico, inimigos, and mortos-vivos.\n\nThe protection grants several benefits. Criaturas of those types have desvantagem on jogada de ataques against the alvo. The alvo also can't be enfeitiçado, amedrontado, or possessed by them. If the alvo is already enfeitiçado, amedrontado, or possessed by such a criatura, the alvo has vantagem on any new teste de resistência against the relevant effect."
  },
  {
    "name": "Purificar Comida e Água",
    "level": 1,
    "classes": [
      "Clérigo",
      "Druida",
      "Paladino"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "Instantâneo",
    "description": "All nonmagical food and drink within a 1,5 metro radius sphere centered on a point of your choice dentro do alcance is purified and rendered free of poison and disease."
  },
  {
    "name": "Raio de Gelo",
    "level": 0,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "A frigid beam of blue-wsucessoe light streaks toward a criatura dentro do alcance. Make a ataque de magia à distância against the alvo. No sucesso, it takes 1d8 dano de frio, and its velocidade is reduced by 3 metros until the start of your next turn.\n\nThe spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
  },
  {
    "name": "Raio de Doença",
    "level": 1,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "A ray of sickening greenish energy lashes out toward a criatura dentro do alcance. Make a ataque de magia à distância against the alvo. No sucesso, the alvo takes 2d8 dano de veneno and must make a Teste de resistência de Constituição. Em um teste de resistência falho, it is also envenenado until the end of your next turn."
  },
  {
    "name": "Remover Maldição",
    "level": 3,
    "classes": [
      "Clérigo",
      "Paladino",
      "Bruxo",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "At your touch, all curses affecting one criatura or object end. If the object is a cursed magical item, its curse remains, but the spell breaks its owner's attunement to the object so it can be removed or discarded."
  },
  {
    "name": "Resistência",
    "level": 0,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 minute",
    "description": "You touch one criatura voluntária. Once before the magia termina, the alvo can roll a d4 and add the number rolled to one teste de resistência of its choice. It can roll the die before or after making the teste de resistência. The spell then ends."
  },
  {
    "name": "Chama Sagrada",
    "level": 0,
    "classes": [
      "Clérigo"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "Flame-like radiance descends on a criatura that que você possa ver dentro do alcance. The alvo must succeed on a Teste de resistência de Destreza or take 1d8 dano radiante. The alvo gains no benefit from cover for this teste de resistência.\n\nThe spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
  },
  {
    "name": "Santuário",
    "level": 1,
    "classes": [
      "Clérigo"
    ],
    "school": "Abjuração",
    "castingTime": "1 bonus ação",
    "range": "9 metros",
    "duration": "1 minuto",
    "description": "You ward a criatura dentro do alcance against attack. Até a magia terminar, any criatura who alvos the warded criatura with an attack or a harmful spell must first make a Teste de resistência de Sabedoria. Em um teste de resistência falho, the criatura must choose a new alvo or lose the attack or spell. This spell doesn’t protect the warded criatura from area effects, such as the explosion of a fireball.\n\nIf the warded criatura makes an attack or casts a spell that affects an enemy criatura, this magia termina."
  },
  {
    "name": "Escudo da Fé",
    "level": 1,
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "school": "Abjuração",
    "castingTime": "1 bonus ação",
    "range": "18 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "A shimmering field appears and surrodadas a criatura of your choice dentro do alcance, granting it a +2 bonus to AC for the duration."
  },
  {
    "name": "Searing Smite",
    "level": 1,
    "classes": [
      "Paladino"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "The next time you sucesso a criatura wiht a ataque corpo a corpo com arma during the spell's duration, your weapon flares with wsucessoe-hot intensity, and the attack deals an extra 1d6 dano de fogo to the alvo and causes the alvo to ignite in flames. At the start of each of its turns até a magia terminar, the alvo must make a Teste de resistência de Constituição. Em um teste de resistência falho, it takes 1d6 dano de fogo. Em um teste de resistência bem-sucedido, the magia termina. If the alvo or a criatura a até 1,5 metro of it uses an ação to put out the flames, or if some other effect douses the flames (such as the alvo being submerged in water), the magia termina."
  },
  {
    "name": "Escudo",
    "level": 1,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 reação, which you take when you are hit by an attack or targeted by the magic missile spell",
    "range": "Si mesmo",
    "duration": "1 rodada",
    "description": "An invisível barrier of magical force appears and protects you. Until the start of your next turn, you have a +5 bonus to AC, including against the triggering attack, and you take no damage from magic falhaile."
  },
  {
    "name": "Shillelagh",
    "level": 0,
    "classes": [
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "1 bonus ação",
    "range": "Toque",
    "duration": "1 minuto",
    "description": "The wood of a club or a quarterstaff you are holding is imbued with nature's power. For the duration, you can use your atributo de conjuração instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon's damage die becomes a d8. The weapon also becomes magical, if it isn't already. The magia termina if you cast it again or if you let go of the weapon."
  },
  {
    "name": "Toque Chocante",
    "level": 0,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "Lightning springs from your hand to deliver a shock to a criatura you try to touch. Make a ataque de magia corpo a corpo against the alvo. You have vantagem on the jogada de ataque if the alvo is wearing armor made of metal. No sucesso, the alvo takes 1d8 dano de raio, and it can’t take reaçãos until the start of its next turn.\n\nThe spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
  },
  {
    "name": "Imagem Silenciosa",
    "level": 1,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Você cria the image of an object, a criatura, or some other visible phenomenon that is no larger than a 4,5 metros cube. The image appears at a spot dentro do alcance and lasts for the duration. The image is purely visual; it isn’t accompanied by sound, smell, or other sensory effects.\n\nYou can use your ação to cause the image to move to any spot dentro do alcance. As the image changes location, you can alter its appearance so that its movimentos appear natural for the image. For example, if Você cria an image of a criatura and move it, you can alter the image so that it appears to be walking.\n\nPhysical interação with the image reveals it to be an illusion, because things can pass through it. A criatura that uses its ação to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your CD de resistência de magia. If a criatura discerns the illusion for what it is, the criatura can see through the image."
  },
  {
    "name": "Sono",
    "level": 1,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "1 minuto",
    "description": "This spell sends criaturas into a magical slumber. Roll 5d8; the total is how many pontos de vida of criaturas this spell can affect. Criaturas within 20 feet of a point you choose dentro do alcance are affected in ascending order of their current pontos de vida (ignoring inconsciente criaturas).\n\nStarting with the criatura that has the lowest current pontos de vida, each criatura affected by this spell falls inconsciente até a magia terminar, the sleeper takes damage, or someone uses an ação to shake or slap the sleeper awake. Subtract each criatura’s pontos de vida from the total before moving on to the criatura with the next lowest pontos de vida. A criatura’s pontos de vida must be equal to or less than the remaining total for that criatura to be affected.\n\nMortos-vivos and criaturas immune to being enfeitiçado aren’t affected by this spell."
  },
  {
    "name": "Salvar os Moribundos",
    "level": 0,
    "classes": [
      "Clérigo"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You touch a living criatura that has 0 pontos de vida. The criatura becomes stable. This spell has no effect on mortos-vivos or constructoos."
  },
  {
    "name": "Falar com Animais",
    "level": 1,
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "10 minutos",
    "description": "You gain the ability to comprehend and verbally communicate with bestas for the duration. The knowledge and awareness of many bestas is limited by their intelligence, but at a minimum, bestas can give you information about nearby locations and monsters, including whatever they can perceive or have perceived within the past day. You might be able to persuade a besta to perform a small favor for you, at the DM's discretion."
  },
  {
    "name": "Taumaturgia",
    "level": 0,
    "classes": [
      "Clérigo"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Até 1 minuto",
    "description": "You manifest a minor wonder, a sign of supernatural power, dentro do alcance. Você cria one of the following magical effects dentro do alcance:Your voice booms up to three times as loud as normal for 1 minuto.Você causa flames to flicker, brighten, dim, or change color for 1 minuto.Você causa harmless tremors in the grodada for 1 minuto.Você cria an Instantâneo sound that originates from a point of your choice dentro do alcance, such as a rumble of thunder, the cry of a raven, or ominous whispers.You Instantâneoly cause an unlocked door or window to fly open or slam shut.You alter the appearance of your eyes for 1 minuto.If you cast this spell multiple times, you can have up to three of its 1-minuto effects active at a time, and you can disfalha such an effect as an ação."
  },
  {
    "name": "Thorn Whip",
    "level": 0,
    "classes": [
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "Você cria a long, vine-like whip covered in thorns that lashes out at your command toward a criatura in range. Make a ataque de magia corpo a corpo against the alvo. If the attack sucessos, the criatura takes 1d6 dano perfurante, and if the criatura is Large or smaller, you pull the criatura up to 3 metros closer to you.\n\nThis spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
  },
  {
    "name": "Thunderous Smite",
    "level": 1,
    "classes": [
      "Paladino"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "The first time you sucesso with a ataque corpo a corpo com arma during this spell's duration, your weapon rings with thunder that is audible within 300 feet of you, and the attack deals an extra 2d6 dano sônico to the alvo. Additionally, if the alvo is a criatura, it must succeed on a Teste de resistência de Força or be pushed 3 metros away from you and knocked caído."
  },
  {
    "name": "Onda Trovejante",
    "level": 1,
    "classes": [
      "Bardo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Self (15-foot cube)",
    "duration": "Instantâneo",
    "description": "A wave of thunderous force sweeps out from you. Each criatura in a 4,5 metros cube originating from you must make a Teste de resistência de Constituição. Em um teste de resistência falho, a criatura takes 2d8 dano sônico and is pushed 3 metros away from you. Em um teste de resistência bem-sucedido, the criatura takes metade do dano and isn’t pushed. In addition, unsecured objects that are completely within the area of effect are automatically pushed 3 metros away from you by the spell’s effect, and the spell emits a thunderous boom audible out to 300 feet."
  },
  {
    "name": "Golpe Certeiro",
    "level": 0,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 round",
    "description": "You extend your hand and point a finger at a alvo in range. Your magic grants you a brief insight into the alvo's defenses. On your next turn, you gain vantagem on your first jogada de ataque against the alvo, provided that this spell hasn't ended."
  },
  {
    "name": "Servo Invisível",
    "level": 1,
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 hora",
    "description": "This spell creates an invisível, mindless, shapeless force that performs simple tasks at your command até a magia terminar. The servant springs into existence in an unoccupied space on the grodada dentro do alcance. It has AC 10, 1 ponto de vida, and a Strength of 2, and it can't attack. If it drops to 0 pontos de vida, the magia termina.\n\nOnce on each of your turns as a ação bônus, you can mentally command the servant to move up to 4,5 metros and interact with an object. The servant can perform simple tasks that a human servant could do, such as fetching things, cleaning, mending, folding clothes, lighting fires, serving food, and pouring wine. Once you give the command, the servant performs the task to the best of its ability until it completes the task, then waits for your next command.\n\nIf you command the servant to perform a task that would move it more than 18 metros away from you, the magia termina."
  },
  {
    "name": "Zombaria Viciosa",
    "level": 0,
    "classes": [
      "Bardo"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "You unleash a string of insults laced with subtle enchantments at a criatura que você possa ver dentro do alcance. If the alvo can hear you (though it need not understand you), it must succeed on a Teste de resistência de Sabedoria or take 1d4 dano psíquico and have desvantagem on the next jogada de ataque it makes before the end of its next turn.\n\nThis spell's damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4)."
  },
  {
    "name": "Raio da Bruxa",
    "level": 1,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A beam of crackling, blue energy lances out toward a criatura dentro do alcance, forming a sustained arc of lightning between you and the alvo. Make a ataque de magia à distância against that criatura. No sucesso, the alvo takes 1d12 dano de raio, and on each of your turns for the duration, you can use your ação to deal 1d12 dano de raio to the alvo automatically. The magia termina if you use your ação to do anything else. The spell also ends if the alvo is ever outside the spell's range or if it has total cover from you."
  },
  {
    "name": "Wrathful Smite",
    "level": 1,
    "classes": [
      "Paladino"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "The next time you sucesso with a ataque corpo a corpo com arma during this spell's duration, your attack deals an extra 1d6 dano psíquico. Additionally, if the alvo is a criatura, it must make a Teste de resistência de Sabedoria or be amedrontado of you até a magia terminar. As an ação, the criatura can make a Wisdom check against your CD de resistência de magia to steel its resolve and end this spell."
  },
  {
    "name": "Auxílio",
    "level": 2,
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "8 horas",
    "description": "Your spell bolsters your allies with toughness and resolve. Escolha até three criaturas dentro do alcance. Each alvo’s ponto de vida maximum and current pontos de vida increase by 5 for the duration."
  },
  {
    "name": "Mensageiro Animal",
    "level": 2,
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "24 horas",
    "description": "By means of this spell, you use an animal to deliver a message. Choose a Tiny besta que você possa ver dentro do alcance, such as a squirrel, a blue jay, or a bat. You specify a location, which you must have visited, and a recipient who matches a general description, such as “a man or woman dressed in the uniform of the town guard” or “a red-haired dwarf wearing a pointed hat.” You also speak a message of up to twenty-five words. The alvo besta travels for the duration of the spell toward the specified location, covering about 50 miles per 24 horas for a flying messenger, or 25 miles for other animals.\n\nWhen the messenger arrives, it delivers your message to the criatura that you described, replicating the sound of your voice. The messenger speaks only to a criatura matching the description you gave. If the messenger doesn’t reach its destination before the magia termina, the message is lost, and the besta makes its way back to where you cast this spell."
  },
  {
    "name": "Cegueira/Surdez",
    "level": 2,
    "classes": [
      "Bardo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 minuto",
    "description": "You can blind or deafen a foe. Escolha uma criatura that que você possa ver dentro do alcance to make a Teste de resistência de Constituição. If it fails, the alvo is either cego or ensurdecido (your choice) for the duration. At the end of each of its turns, the alvo can make a Teste de resistência de Constituição. On a success, the magia termina."
  },
  {
    "name": "Augúrio",
    "level": 2,
    "classes": [
      "Clérigo"
    ],
    "school": "Adivinhação",
    "castingTime": "1 minute",
    "range": "Si mesmo",
    "duration": "Instantâneo",
    "description": "By casting gem-inlaid sticks, rolling dragão bones, laying out ornate cards, or employing some other divining tool, you receive an omen from an otherworldly entity about the results of a specific course of ação that you plan to take within the next 30 minutos. The DM chooses from the following possible omens:Weal, for good resultsWoe, for bad resultsWeal and woe*, for both good and bad resultsNothing, for results that aren’t especially good or badThe spell doesn’t take into account any possible circumstances that might change the outcome, such as the casting of additional spells or the loss or gain of a companion.\n\nIf você conjura a magia two or more times before completing your next descanso longo, there is a cumulative 25 percent chance for each casting after the first that you get a random reading. The DM makes this roll in secret."
  },
  {
    "name": "Acalmar Emoções",
    "level": 2,
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You attempt to suppress strong emotions in a group of people. Each humanoide in a 20-foot-radius sphere centered on a point you choose dentro do alcance must make a Teste de resistência de Carisma; a criatura can choose to fail this teste de resistência if it wishes. If a criatura fails its teste de resistência, escolha uma of the following two effects. You can suppress any effect causing a alvo to be enfeitiçado or amedrontado. When this magia termina, any suppressed effect resumes, provided that its duration has not expired in the meantime.\n\nAlternatively, you can make a alvo indifferent about criaturas o f your choice that it is hostile toward. This indifference ends if the alvo is attacked or harmed by a spell or if it witnesses any of its friends being harmed. When the magia termina, the criatura becomes hostile again, unless the DM rules otherwise."
  },
  {
    "name": "Paralisar Pessoa",
    "level": 2,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Choose a humanoide that que você possa ver dentro do alcance. The alvo must succeed on a Teste de resistência de Sabedoria or be paralisado for the duration. At the end of each of its turns, the alvo can make another Teste de resistência de Sabedoria. On a success, the magia termina on the alvo."
  },
  {
    "name": "Restauração Menor",
    "level": 2,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladino",
      "Patrulheiro"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You touch a criatura and can end either one disease or one condition afflicting it. The condition can be cego, ensurdecido, paralisado, or envenenado."
  },
  {
    "name": "Oração de Cura",
    "level": 2,
    "classes": [
      "Clérigo"
    ],
    "school": "Evocação",
    "castingTime": "10 minutes",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "Up to six criaturas of your choice that que você possa ver dentro do alcance each regain pontos de vida equal to 2d8 + your atributo de conjuração modifier. This spell has no effect on mortos-vivos or constructoos."
  },
  {
    "name": "Silêncio",
    "level": 2,
    "classes": [
      "Bardo",
      "Clérigo",
      "Patrulheiro"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "For the duration, no sound can be created within or pass through a 20-foot-radius sphere centered on a point you choose dentro do alcance. Any criatura or object entirely inside the sphere is immune to dano sônico, and criaturas are ensurdecido while entirely inside it."
  },
  {
    "name": "Arma Espiritual",
    "level": 2,
    "classes": [
      "Clérigo"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "18 metros",
    "duration": "1 minuto",
    "description": "Você cria a floating, spectral weapon dentro do alcance that lasts for the duration or until you cast this spell again. When você conjura a magia, you can make a ataque de magia corpo a corpo against a criatura a até 1,5 metro of the weapon. No sucesso, the alvo takes dano de força equal to 1d8 + your atributo de conjuração modifier.\n\nAs a ação bônus on your turn, you can move the weapon up to 20 feet and repeat the attack against a criatura a até 1,5 metro of it. The weapon can take whatever form you choose. Clerics of deities who are associated with a particular weapon (as St. Cuthbert is known for his mace and Thor for his hammer) make this spell’s effect resemble that weapon."
  },
  {
    "name": "Vínculo de Proteção",
    "level": 2,
    "classes": [
      "Clérigo"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "description": "This spell wards a criatura voluntária you touch and creates a mystic connection between you and the alvo até a magia terminar. While the alvo is a até 18 metros of you, it gains a +1 bonus to AC and testes de resistência, and it has resistance to all damage. Also, each time it takes damage, you take the same amount of damage.\n\nThe magia termina if you drop to 0 pontos de vida or if you and the  alvo become separated by more than 18 metros. It also ends if the spell is cast again on either of the connected criaturas. You can also disfalha the spell as an ação."
  },
  {
    "name": "Animar os Mortos",
    "level": 3,
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 minute",
    "range": "3 metros",
    "duration": "Instantâneo",
    "description": "This spell creates an mortos-vivos servant. Choose a pile of bones or a corpse of a Medium or Small humanoide dentro do alcance. Your spell imbues the alvo with a foul mimicry of life, raising it as an mortos-vivos criatura. The alvo becomes a skeleton if you chose bones or a zombie if you chose a corpse (the DM has the criatura’s game statistics).\n\nOn each of your turns, you can use a ação bônus to mentally command any criatura you made with this spell if the criatura is a até 18 metros of you (if you control multiple criaturas, you can command any or all of them at the same time, issuing the same command to each one). You decide what ação the criatura will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the criatura only defends itself against hostile criaturas. Once given an order, the criatura continues to follow it until its task is complete.\n\nThe criatura is under your control for 24 horas, after which it stops obeying any command you’ve given it. To maintain control of the criatura for another 24 horas, you must cast this spell on the criatura again before the current 24-hora period ends. This use of the spell reasserts your control over up to four criaturas you have animated with this spell, rather than animating a new one."
  },
  {
    "name": "Olho Arcano",
    "level": 4,
    "classes": [
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "Você cria an invisível, magical eye dentro do alcance that hovers in the for the duration.\n\nYou mentally recieve visual information from the eye, which has normal vision and darkvision out to 9 metros. The eye can look in every direction.\n\nAs an ação, you can move the eye up to 9 metros in any direction. There is no limit to how far away from you the eye can move, but it can't enter another plane of existence. A solid barrier blocks the eye's movimento, but the eye can pass through an opening as small as 1 inch in diameter."
  },
  {
    "name": "Aura de Vida",
    "level": 4,
    "classes": [
      "Paladino"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Self (30-foot radius)",
    "duration": "Concentração, up to 10 minutes",
    "description": "Life-preserving energy radiates from you in an aura with a 9 metros radius. Até a magia terminar, the aura moves with you, centered on you. Each nonhostile criatura in the aura (including you) has resistance to dano necrótico, and its ponto de vida maximum can't be reduced. In addition, a nonhostile, living criatura regains 1 ponto de vida when it starts its turn in the aura with 0 pontos de vida."
  },
  {
    "name": "Aura de Pureza",
    "level": 4,
    "classes": [
      "Paladino"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Self (30-foot radius)",
    "duration": "Concentração, up to 10 minutes",
    "description": "Purifying energy radiates from you in an aura with a 9 metros radius. Até a magia terminar, the aura moves with you, centered on you. Each nonhostile criatura in the aura (including you) can't become diseased, has resistance to dano de veneno, and has vantagem on testes de resistência against effects that cause any of the following conditions: cego, enfeitiçado, ensurdecido, amedrontado, paralisado, envenenado, and atordoado."
  },
  {
    "name": "Aura Of Vitality",
    "level": 3,
    "classes": [
      "Paladino"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Self (30-foot radius)",
    "duration": "Concentração, up to 1 minute",
    "description": "Healing energy radiates from you in an aura with a 9 metros radius. Até a magia terminar, the aura moves with you, centered on you. You can use a ação bônus to cause one criatura in the aura (including you) to regain 2d6 pontos de vida."
  },
  {
    "name": "Banimento",
    "level": 4,
    "classes": [
      "Clérigo",
      "Paladino",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You attempt to send one criatura that que você possa ver dentro do alcance to another plane of existence. The alvo must succeed on a Teste de resistência de Carisma or be banished.\n\nIf the alvo is native to the plane of existance you're on, you banish the alvo to a harmless demiplane. While there, the alvo is incapacitado. The alvo remains there até a magia terminar, at which point the alvo reappears in the space it left or in the nearest unoccupied space if that space is occupied.\n\nIf the alvo is native to a different plane of existance than the one you're on, the alvo is banished with a faint popping noise, returning to its home plane. If the magia termina before 1 minuto has passed, the alvo reappears in the space it left or in the nearest unoccupied space if that space is occupied. Otherwise, the alvo doesn't return."
  },
  {
    "name": "Balizador da Esperança",
    "level": 3,
    "classes": [
      "Clérigo"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "This spell bestows hope and vitality. Choose any number of criaturas dentro do alcance. For the duration, each alvo has vantagem on Teste de resistência de Sabedorias and death testes de resistência, and regains the maximum number of pontos de vida possible from any healing."
  },
  {
    "name": "Praga",
    "level": 4,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "Necromantic energy washes over a criatura of your choice that que você possa ver dentro do alcance, draining moisture and vitality from it. The alvo must make a Teste de resistência de Constituição. The alvo takes 8d8 dano necrótico em um teste de resistência falho, or metade do dano on a successful one. The spell has no effect on mortos-vivos or constructoos.\n\nIf you alvo a planta criatura or a magical planta, it makes the teste de resistência with desvantagem, and the spell deals maximum damage to it.\n\nIf you alvo a nonmagical planta that isn't a criatura, such as a tree or shrub, it doesn't make a teste de resistência; it simply withers and dies."
  },
  {
    "name": "Impor Maldição",
    "level": 3,
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 minute",
    "description": "You touch a criatura, and that criatura must succeed on a Teste de resistência de Sabedoria or become cursed for the duration of the spell. Quando você conjura essa magia, choose the nature of the curse from the following options:\n\n* Escolha uma ability score. While cursed, the alvo has desvantagem on teste de habilidades and testes de resistência made with that ability score.\n* While cursed, the alvo has desvantagem on jogada de ataques against you.\n* While cursed, the alvo must make a Teste de resistência de Sabedoria at the start of each of its turns. If it fails, it wastes its ação that turn doing nothing.\n* While the alvo is cursed, your attacks and spells deal an extra 1d8 dano necrótico to the alvo.\n\nA remove curse magia termina this effect. At the DM’s option, you may choose an alternative curse effect, but it should be no more powerful than those described above. The DM has final say on such a curse’s effect."
  },
  {
    "name": "Blinding Smite",
    "level": 3,
    "classes": [
      "Paladino"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "The next time you sucesso a criatura with a ataque corpo a corpo com arma during this spell’s duration, your weapon flares with bright light, and the attack deals an extra 3d8 dano radiante to the alvo. Additionally, the alvo must succeed on a Teste de resistência de Constituição or be cego até a magia terminar.\n\nA criatura cego by this spell makes another Teste de resistência de Constituição at the end of each of its turns. Em um teste de resistência bem-sucedido, it is no longer cego."
  },
  {
    "name": "Piscar",
    "level": 3,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "1 minuto",
    "description": "Roll a d20 at the end of each of your turns for the duration of the spell. On a roll of 11 ou superior, you vanish from your current plane of existence and appear in the Ethereal Plane (the spell fails and the casting is wasted if you were already on that plane). At the start of your next turn, and when the magia termina if you are on the Ethereal Plane, you return to an unoccupied space of your choice that que você possa ver a até 3 metros of the space you vanished from. If no unoccupied space is available within that range, you appear in the nearest unoccupied space (chosen at random if more than one space is equally near). You can disfalha this spell as an ação.\n\nWhile on the Ethereal Plane, que você possa ver and hear the plane you originated from, which is cast in shades of gray, and you can’t see anything there more than 18 metros away. You can only affect and be affected by other criaturas on the Ethereal Plane. Criaturas that aren’t there can’t perceive you or interact with you, unless they have the ability to do so."
  },
  {
    "name": "Invocar Relâmpago",
    "level": 3,
    "classes": [
      "Druida"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "A storm cloud appears in the shape of a cylinder that is 3 metros tall with a 18 metros radius, centered on a point que você possa ver 100 feet directly above you. The spell fails if you can’t see a point in the air where the storm cloud could appear (for example, if you are in a room that can’t accommodate the cloud).\n\nWhen você conjura a magia, choose a point que você possa ver dentro do alcance. A bolt of lightning flashes down from the cloud to that point. Each criatura a até 1,5 metro of that point must make a Teste de resistência de Destreza. A criatura takes 3d10 dano de raio em um teste de resistência falho, or metade do dano on a successful one. On each of your turns até a magia terminar, you can use your ação to call down lightning in this way again, alvoing the same point or a different one.\n\nIf you are outdoors in stormy conditions Quando você conjura essa magia, the spell gives you control over the existing storm instead of creating a new one. Under such conditions, the spell’s damage increases by 1d10."
  },
  {
    "name": "Clarividência",
    "level": 3,
    "classes": [
      "Bardo",
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "10 minutes",
    "range": "1 mile",
    "duration": "Concentração, up to 10 minutes",
    "description": "Você cria an invisível sensor dentro do alcance in a location familiar to you (a place you have visited or seen before) or in an obvious location that is unfamiliar to you (such as behind a door, arodada a corner, or in a grove of trees). The sensor remains in place for the duration, and it can’t be attacked or otherwise interacted with.\n\nWhen você conjura a magia, you choose seeing or hearing. You can use the chosen sense through the sensor as if you were in its space. As your ação, you can switch between seeing and hearing.\n\nA criatura that can see the sensor (such as a criatura benefiting from see invisibility (lvl 2) or truesight sees a luminous, intangible orb about the size of your fist."
  },
  {
    "name": "Nuvem de Adagas",
    "level": 2,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You fill the air with spinning daggers in a cube 1,5 metro on each side, centered on a point you choose dentro do alcance. A criatura takes 4d4 dano cortante when it enters the spell’s area for the first time on a turn or starts its turn there."
  },
  {
    "name": "Compulsão",
    "level": 4,
    "classes": [
      "Bardo"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Criaturas of your choice that que você possa ver dentro do alcance and that can hear you must make a Teste de resistência de Sabedoria. A alvo automatically succeeds on this teste de resistência if it can't be enfeitiçado. Em um teste de resistência falho, a alvo is affected by this spell. Até a magia terminar, you can use a ação bônus on each of your turns to designate a direction that is horizontal to you. Each affected alvo must use as much of its movimento as possible to move in that direction on its next turn. It can take any ação before it moves. After moving in this way, it can make another Wisdom save to try to end the effect.\n\nA alvo isn't compelled to move into an obviously deadly hazard, such as a fire or a pit, but it will provoke ataque de oportunidades to move in the designated direction."
  },
  {
    "name": "Convocar Animais",
    "level": 3,
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "Você convoca feérico spirits that take the form of bestas and appear in unoccupied spaces that que você possa ver dentro do alcance. Escolha uma of the following options for what appears:One besta of challenge rating 2 or lower\nTwo bestas of challenge rating 1 or lower\nFour bestas of challenge rating 1/2 or lower\nEight bestas of challenge rating 1/4 or lowerEach besta is also considered feérico, and it disappears when it drops to 0 pontos de vida or when the magia termina.\n\nThe summoned criaturas are friendly to you and your companions. Roll initiative for the summoned criaturas as a group, which has its own turns. They obey any verbal commands that you issue to them (no ação required by you). If you don’t issue any commands to them, they defend themselves from hostile criaturas, but otherwise take no ações.\n\nThe DM has the criaturas’ statistics."
  },
  {
    "name": "Convocar Barragem",
    "level": 3,
    "classes": [
      "Patrulheiro"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "Self (60-foot cone)",
    "duration": "Instantâneo",
    "description": "You throw a nonmagical weapon or fire a piece of nonmagical ammunition into the air to create a cone of identical weapons that shoot forward and then disappear. Each criatura in a 18 metros cone must succeed on a Teste de resistência de Destreza. A criatura takes 3d8 damage em um teste de resistência falho, or metade do dano on a successful one. The damage type is the same as that of the weapon or ammunition used as a component."
  },
  {
    "name": "Contramagia",
    "level": 3,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 reação, which you take when you see a creature within 60 feet of you casting a spell.",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "You attempt to interrupt a criatura in the process of casting a spell. If the criatura is casting a spell of 3rd level or lower, its spell fails and has no effect. If it is casting a spell of 4th level ou superior, make an teste de habilidade using your atributo de conjuração. The DC equals 10 + the spell’s level. On a success, the criatura’s spell fails and has no effect."
  },
  {
    "name": "Criar Comida e Água",
    "level": 3,
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "Você cria 45 pounds of food and 30 gallons of water on the grodada or in containers dentro do alcance, enough to sustain up to fifteen humanoidees or five steeds for 24 horas. The food is bland but nourishing, and spoils if uneaten after 24 horas. The water is clean and doesn’t go bad."
  },
  {
    "name": "Manto do Cruzado",
    "level": 3,
    "classes": [
      "Paladino"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "Holy power radiates from you in an aura with a 9 metros radius, awakening boldness in friendly criaturas. Até a magia terminar, the aura moves with you, centered on you. While in the aura, each nonhostile criatura in the aura (including you) deals an extra 1d4 dano radiante when it sucessos with a weapon attack."
  },
  {
    "name": "Luz do Dia",
    "level": 3,
    "classes": [
      "Clérigo",
      "Druida",
      "Patrulheiro",
      "Feiticeiro"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 hora",
    "description": "A 18 metros-radius sphere of light spreads out from a point you choose dentro do alcance. The sphere is bright light and sheds dim light for an additional 18 metros.\n\nIf you chose a point on an object you are holding or one that isn’t being worn or carried, the light shines from the object and moves with it. Completely covering the affected object with an opaque object, such as a bowl or a helm, blocks the light.\n\nIf any of this spell’s area overlaps with an area of darkness created by a spell of 3rd level or lower, the spell that created the darkness is dispelled."
  },
  {
    "name": "Dissipar Magia",
    "level": 3,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladino",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantâneo",
    "description": "Escolha uma criatura, object, or magical effect dentro do alcance. Any spell of 3rd level or lower on the alvo ends. For each spell of 4th level ou superior on the alvo, make an teste de habilidade using your atributo de conjuração. The DC equals 10 + the spell’s level. On a successful check, the magia termina."
  },
  {
    "name": "Arma Elemental",
    "level": 3,
    "classes": [
      "Paladino"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 hour",
    "description": "A nonmagical weapon you touch becomes a magic weapon. Escolha uma of the following damage types: acid, cold, fire, lightning, or thunder. For the duration, the weapon has a +1 bonus to jogada de ataques and deals an extra 1d4 damage of the chosen type when it sucessos."
  },
  {
    "name": "Medo",
    "level": 3,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "Self (30-foot cone)",
    "duration": "Concentração, up to 1 minute",
    "description": "You project a phantasmal image of a criatura’s worst fears. Each criatura in a 9 metros cone must succeed on a Teste de resistência de Sabedoria or drop whatever it is holding and become amedrontado for the duration.\n\nWhile amedrontado by this spell, a criatura must take the Dash ação and move away from you by the safest available route on each of its turns, unless there is nowhere to move. If the criatura ends its turn in a location where it doesn’t have line of sight to you, the criatura can make a Teste de resistência de Sabedoria. Em um teste de resistência bem-sucedido, the magia termina for that criatura."
  },
  {
    "name": "Fingir a Morte",
    "level": 3,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "description": "You touch a criatura voluntária and put it into a cataleptic state that is indistinguishable from death.\n\nFor the spell’s duration, or until you use an ação to touch the alvo and disfalha the spell, the alvo appears dead to all outward inspection and to spells used to determine the alvo’s status. The alvo is cego and incapacitado, and its velocidade drops to 0. The alvo has resistance to all damage except dano psíquico. If the alvo is diseased or envenenado when você conjura a magia, or becomes diseased or envenenado while under the spell’s effect, the disease and poison have no effect até a magia terminar."
  },
  {
    "name": "Bola de Fogo",
    "level": 3,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantâneo",
    "description": "A bright streak flashes from your pointing finger to a point you choose dentro do alcance and then blossoms with a low roar into an explosion of flame. Each criatura in a 20-foot-radius sphere centered on that point must make a Teste de resistência de Destreza. A alvo takes 8d6 dano de fogo em um teste de resistência falho, or metade do dano on a successful one.\n\nThe fire spreads arodada corners. It ignites flammable objects in the area that aren't being worn or carried."
  },
  {
    "name": "Voar",
    "level": 3,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 10 minutes",
    "description": "You touch a criatura voluntária. The alvo gains a flying velocidade of 18 metros for the duration. When the magia termina, the alvo falls if it is still aloft, unless it can stop the fall."
  },
  {
    "name": "Forma Gasosa",
    "level": 3,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 hour",
    "description": "You transform a criatura voluntária you touch, along with everything it’s wearing and carrying, into a misty cloud for the duration. The magia termina if the criatura drops to 0 pontos de vida. An incorporeal criatura isn’t affected.\n\nWhile in this form, the alvo’s only method of movimento is a flying velocidade of 3 metros. The alvo can enter and occupy the space of another criatura. The alvo has resistance to nonmagical damage, and it has vantagem on Strength, Dexterity, and Teste de resistência de Constituiçãos. The alvo can pass through small holes, narrow openings, and even mere cracks, though it treats liquids as though they were solid surfaces. The alvo can't fall and remains hovering in the air even when atordoado or otherwise incapacitado.\n\nWhile in the form of a misty cloud, the alvo can’t talk or manipulate objects, and any objects it w as carrying or holding can’t be dropped, used, or otherwise interacted with. The alvo can’t attack or cast spells."
  },
  {
    "name": "Aceleração",
    "level": 3,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Choose a criatura voluntária that que você possa ver dentro do alcance. Até a magia terminar, the alvo’s velocidade is doubled, it gains a +2 bonus to AC, it has vantagem on Teste de resistência de Destrezas, and it gains an additional ação on each of its turns. That ação can be used only to take the Attack (one weapon attack only), Dash, Disengage, Hide, or Use an Object ação.\n\nWhen the magia termina, the alvo can’t move or take ações until after its next turn, as a wave of lethargy sweeps over it."
  },
  {
    "name": "Padrão Hipnótico",
    "level": 3,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você cria a twisting pattern of colors that weaves through the air inside a 9 metros cube dentro do alcance. The pattern appears for a moment and vanishes. Each criatura in the area who sees the pattern must make a Teste de resistência de Sabedoria. Em um teste de resistência falho, the criatura becomes enfeitiçado for the duration. While enfeitiçado by this spell, the criatura is incapacitado and has a velocidade of 0.\n\nThe magia termina for an affected criatura if it takes any damage or if someone else uses an ação to shake the criatura out of its stupor."
  },
  {
    "name": "Flecha de Relâmpago",
    "level": 3,
    "classes": [
      "Patrulheiro"
    ],
    "school": "Transmutação",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "The next time you make a ranged w eapon attack during the spell’s duration, the weapon’s ammunition, or the weapon itself if it’s a thrown weapon, transforms into a bolt of lightning. Make the jogada de ataque as normal. The alvo takes 4d8 dano de raio No sucesso, or metade do dano on a falha, instead of the weapon’s normal damage.\n\nWhether you sucesso or falha, each criatura a até 3 metros of the alvo must make a Teste de resistência de Destreza. Each of these criaturas takes 2d8 dano de raio em um teste de resistência falho, or metade do dano on a successful one.\n\nThe piece of ammunition or weapon then returns to its normal form."
  },
  {
    "name": "Círculo Mágico",
    "level": 3,
    "classes": [
      "Clérigo",
      "Paladino",
      "Bruxo",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 minute",
    "range": "3 metros",
    "duration": "1 hora",
    "description": "Você cria a 3 metros-radius, 20-foot-tall cylinder of magical energy centered on a point on the grodada that que você possa ver dentro do alcance. Glowing runes appear wherever the cylinder intersects with the floor or other surface.\n\n* The criatura can’t willingly enter the cylinder by nonmagical means. If the criatura tries to use teleportation or interplanar travel to do so, it must first succeed on a Teste de resistência de Carisma.\n\n* The criatura has desvantagem on jogada de ataques against alvos within the cylinder.\n\n* Alvos within the cylinder can’t be enfeitiçado, amedrontado, or possessed by the criatura.\n\nQuando você conjura essa magia, you can elect to cause its magic to operate in the reverse direction, preventing a criatura of the specified type from leaving the cylinder and protecting alvos outside it."
  },
  {
    "name": "Imagem Maior",
    "level": 3,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Você cria the image of an object, a criatura, or some other visible phenomenon that is no larger than a cubo de 6 metros. The image appears at a spot that que você possa ver dentro do alcance and lasts for the duration. It seems completely real, including sounds, smells, and temperature appropriate to the thing depicted. You can’t create sufficient heat or cold to cause damage, a sound loud enough to deal dano sônico or deafen a criatura, or a smell that might sicken a criatura (like a troglodyte’s stench).\n\nAs long as you are dentro do alcance o f the illusion, you can use your ação to cause the image to move to any other spot dentro do alcance. As the image changes location, you can alter its appearance so that its movimentos appear natural for the image. For example, if Você cria an image o f a criatura and move it, you can alter the image so that it appears to be walking. Similarly, you can cause the illusion to make different sounds at different times, even making it carry on a conversation, for example.\n\nPhysical interação with the image reveals it to be an illusion, because things can pass through it. A criatura that uses its ação to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your CD de resistência de magia. If a criatura discerns the illusion for what it is, the criatura can see through the image, and its other sensory qualities become faint to the criatura."
  },
  {
    "name": "Palavra de Cura em Massa",
    "level": 3,
    "classes": [
      "Clérigo"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "As you call out words of restoration, up to six criaturas of your choice that que você possa ver dentro do alcance regain pontos de vida equal to 1d4 + your atributo de conjuração modifier. This spell has no effect on mortos-vivos or constructoos."
  },
  {
    "name": "Alterar a Si Mesmo",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 hour",
    "description": "You assume a different form. When você conjura a magia, escolha uma of the following options, the effects of which last for the duration of the spell. While the spell lasts, you can end one option as an ação to gain the benefits of a different one. \n\nAquatic Adaptation:\n You adapt your body to an aquatic environment, sprouting gills and growing webbing between your fingers. You can breathe underwater and gain a swimming velocidade equal to your walking velocidade. \nChange Appearance:\n You transform your appearance. You decide what you look like, including your height, weight, facial features, sound of your voice, hair length, coloration, and distinguishing characteristics, if any. You can make yourself appear as a member of another race, though none of your statistics change. You also can't appear as a criatura of a different size than you, and your basic shape stays the same; if you're bipedal, you can't use this spell to become quadrupedal, for instance. At any time for the duration of the spell, you can use your ação to change your appearance in this way again. \nNatural Weapons:\nYou grow claws, fangs, spines, horns, or a different natural weapon of your choice. Your unarmed strikes deal 1d6 bludgeoning, piercing, or dano cortante, as appropriate to the natural weapon you chose, and you are proficient with your unarmed strikes. Finally, the natural weapon is magic and you have a +1 bonus to the attack and damage rolls you make using it."
  },
  {
    "name": "Fechadura Arcana",
    "level": 2,
    "classes": [
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Até ser dissipada",
    "description": "You touch a closed door, window, gate, chest, or other entryway, and it becomes locked for the duration. You and the criaturas you designate Quando você conjura essa magia can open the object normally. You can also set a password that, when spoken a até 1,5 metro of the object, suppresses this spell for 1 minuto. Otherwise, it is impassable until it is broken or the spell is dispelled or suppressed. Casting knock on the object suppresses arcane lock for 10 minutos.\n\nWhile affected by this spell, the object is more difficult to break or force open; the DC to break it or pick any locks on it increases by 10."
  },
  {
    "name": "Pele de Casca",
    "level": 2,
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 hour",
    "description": "You touch a criatura voluntária. Até a magia terminar, the alvo’s skin has a rough, bark-like appearance, and the alvo’s AC can’t be less than 16, regardless of what kind of armor it is wearing."
  },
  {
    "name": "Indetectável",
    "level": 3,
    "classes": [
      "Bardo",
      "Clérigo",
      "Patrulheiro"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "8 horas",
    "description": "For the duration, you hide a alvo that you touch from divination magic. The alvo can be a criatura voluntária or a place or an object no larger than 3 metros in any dimension. The alvo can’t be alvoed by any divination magic or perceived through magical scrying sensors."
  },
  {
    "name": "Fundir-se com a Pedra",
    "level": 3,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "8 horas",
    "description": "You step into a stone object or surface large enough to fully contain your body, melding yourself and all the equipment you carry with the stone for the duration. Using your movimento, you step into the stone at a point you can touch. Nothing of your presence remains visible or otherwise detectable by nonmagical senses.\n\nWhile merged with the stone, you can’t see what occurs outside it, and any Wisdom (Perception) checks you make to hear sounds outside it are made with desvantagem. You remain aware of the passage of time and can cast spells on yourself while merged in the stone. You can use your movimento to leave the stone where you entered it, which ends the spell. You otherwise can’t move.\n\nMinor physical damage to the stone doesn’t harm you, but its partial destruction or a change in its shape (to the extent that you no longer fit w ithin it) expels you and deals 6d6 dano de concussão to you. The stone’s complete destruction (or transmutation into a different substance) expels you and deals 50 dano de concussão to you. If expelled, you fall caído in an unoccupied space closest to where you first entered."
  },
  {
    "name": "Phantom Steed",
    "level": 3,
    "classes": [
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 minute",
    "range": "9 metros",
    "duration": "1 hora",
    "description": "A Large quasi-real, horselike criatura appears on the grodada in an unoccupied space of your choice dentro do alcance. You decide the criatura’s appearance, but it is equipped with a saddle, bit, and bridle. Any of the equipment created by the spell vanishes in a puff of smoke if it is carried more than 3 metros away from the steed.\n\nFor the duration, you or a criatura you choose can ride the steed. The criatura uses the statistics for a riding horse, except it has a velocidade of 100 feet and can travel 10 miles in an hora, or 13 miles at a fast pace. When the magia termina, the steed gradually fades, giving the rider 1 minuto to dismount. The magia termina if you use an ação to disfalha it or if the steed takes any damage."
  },
  {
    "name": "Crescimento Vegetal",
    "level": 3,
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação or 8 hours",
    "range": "45 metros",
    "duration": "Instantâneo",
    "description": "This spell channels vitality into plantaas within a specific area. There are two possible uses for the spell, granting either immediate or long-term benefits.\n\nIf you cast this spell using 1 ação, choose a point dentro do alcance. All normal plantaas in a 100-foot radius centered on that point become thick and overgrown. A criatura moving through the area must spend 4 feet of movimento for every 1 foot it moves.\n\nYou can exclude one or more areas of any size within the spell’s area from being affected.\n\nIf you cast this spell over 8 horas, you enrich the land. All plantaas in a half-mile radius centered on a point dentro do alcance become enriched for 1 year. The plantaas yield twice the normal amount of food when harvested."
  },
  {
    "name": "Proteção da Energia",
    "level": 3,
    "classes": [
      "Clérigo",
      "Druida",
      "Patrulheiro",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 minute",
    "description": "For the duration, the criatura voluntária you touch has resistance to one damage type of your choice: acid, cold, fire, lightning, or thunder."
  },
  {
    "name": "Revivificar",
    "level": 3,
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You touch a criatura that has died within the last minuto. That criatura returns to life with 1 ponto de vida. This spell can’t return to life a criatura that has died of old age, nor can it restore any falhaing body parts."
  },
  {
    "name": "Mensagem",
    "level": 3,
    "classes": [
      "Bardo",
      "Clérigo",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Unlimited",
    "duration": "1 rodada",
    "description": "You send a short message of twenty-five words or less to a criatura with which you are familiar. The criatura hears the message in its mind, recognizes you as the sender if it knows you, and can answer in a like manner immediately. The spell enables criaturas with Intelligence scores of at least 1 to understand the meaning of your message.\n\nYou can send the message across any distance and even to other planes of existence, but if the alvo is on a different plane than you, there is a 5 percent chance that the message doesn’t arrive."
  },
  {
    "name": "Tempestade de Granizo",
    "level": 3,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Até a magia terminar, freezing rain and sleet fall in a 20-foot-tall cylinder with a 40-foot radius centered on a point you choose dentro do alcance. The area is heavily obscured, and exposed flames in the area are doused.\n\nThe grodada in the area is covered with slick ice, making it difficult terrain. When a criatura enters the spell’s area for the first time on a turn or starts its turn there, it must make a Teste de resistência de Destreza. Em um teste de resistência falho, it falls caído.\n\nIf a criatura is concentrating in the spell’s area, the criatura must make a successful Teste de resistência de Constituição against your CD de resistência de magia or lose concentração."
  },
  {
    "name": "Lentidão",
    "level": 3,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You alter time arodada up to six criaturas of your choice in a 40-foot cube dentro do alcance. Each alvo must succeed on a teste de resistência de Sabedoriaor be affected by this spell for the duration.\n\nAn affected alvo’s velocidade is halved, it takes a -2 penalty to AC and Teste de resistência de Destrezas, and it can’t use reaçãos. On its turn, it can use either an ação or a ação bônus, not both. Regardless of the criatura’s abilities or magic items, it can’t make more than one melee or ranged attack during its turn.\n\nIf the criatura attempts to cast a spell with a casting time of 1 ação, roll a d20. On an 11 ou superior, the spell doesn’t take effect until the criatura’s next turn, and the criatura must use its ação on that turn to complete the spell. If it can’t, the spell is wasted.\n\nA criatura affected by this spell makes another Teste de resistência de Sabedoriaat the end of its turn. Em um teste de resistência bem-sucedido, the effect ends for it."
  },
  {
    "name": "Falar com os Mortos",
    "level": 3,
    "classes": [
      "Bardo",
      "Clérigo"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "10 minutos",
    "description": "You grant the semblance o f life and intelligence to a corpse of your choice dentro do alcance, allowing it to answer the questions you pose. The corpse must still have a mouth and can’t be mortos-vivos. The spell fails if the corpse was the alvo o f this spell within the last 10 days.\n\nAté a magia terminar, you can ask the corpse up to five questions. The corpse knows only what it knew in life, including the languages it knew. Answers are usually brief, cryptic, or repetitive, and the corpse is under no compulsion to offer a truthful answer if you are hostile to it or it recognizes you as an enemy. This spell doesn’t return the criatura’s soul to its body, only its animating spirit. Thus, the corpse can’t learn new information, doesn’t comprehend anything that has happened since it died, and can’t speculate about future events."
  },
  {
    "name": "Falar com Plantas",
    "level": 3,
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Self (30-foot radius",
    "duration": "10 minutos",
    "description": "You imbue plantaas a até 9 metros of you with limited sentience and animation, giving them the ability to communicate with you and follow your simple commands. You can question plantaas about events in the spell’s area within the past day, gaining information about criaturas that have passed, weather, and other circumstances.\n\nYou can also turn difficult terrain caused by planta growth (such as thickets and undergrowth) into ordinary terrain that lasts for the duration. Or you can turn ordinary terrain where plantaas are present into difficult terrain that lasts for the duration, causing v ines and branches to hinder pursuers, for example.\n\nPlantaas might be able to perform other tasks on your behalf, at the DM’s discretion. The spell doesn’t enable plantaas to uproot themselves and move about, but they can freely move branches, tendrils, and stalks.\n\nIf a planta criatura is in the area, you can communicate with it as if you shared a common language, but you gain no magical ability to influence it.\n\nThis spell can cause the plantaas created by the entangle spell to release a imobilizado criatura."
  },
  {
    "name": "Guardiões Espirituais",
    "level": 3,
    "classes": [
      "Clérigo"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "Self (15-foot radius)",
    "duration": "Concentração, up to 10 minutes",
    "description": "You call forth spirits to protect you. They flit arodada you to a distance of 4,5 metros for the duration. If you are good or neutral, their spectral form appears angelic or feérico (your choice). If you are evil, they appear inimigoish.\n\nQuando você conjura essa magia, you can designate any number of criaturas que você possa ver to be unaffected by it. An affected criatura’s velocidade is halved in the area, and when the criatura enters the area for the first time on a turn or starts its turn there, it must make a Teste de resistência de Sabedoria. Em um teste de resistência falho, the criatura takes 3d8 dano radiante (if you are good or neutral) or 3d8 dano necrótico (if you are evil). Em um teste de resistência bem-sucedido, the criatura takes metade do dano."
  },
  {
    "name": "Nuvem Fedorenta",
    "level": 3,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você cria a 20-foot-radius sphere of yellow, nauseating gas centered on a point dentro do alcance. The cloud spreads arodada corners, and its area is heavily obscured. The cloud lingers in the air for the duration.\n\nEach criatura that is completely within the cloud at the start of its turn must make a Teste de resistência de Constituição against poison. Em um teste de resistência falho, the criatura spends its ação that turn retching and reeling. Criaturas that don’t need to breathe or are immune to poison automatically succeed on this teste de resistência.\n\nA moderate wind (at least 10 miles per hora) disperses the cloud after 4 rodadas. A strong wind (at least 20 miles per hora) disperses it after 1 rodada."
  },
  {
    "name": "Confusão",
    "level": 4,
    "classes": [
      "Bardo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "This spell assaults and twists criaturas' minds, spawning delusions and provoking uncontrolled ação. Each criatura in a raio de 3 metros sphere centered on a point you choose dentro do alcance must succeed on a Teste de resistência de Sabedoria Quando você conjura essa magia or by affected by it.\n\nAn affected alvo can't take reaçãos and must roll a d10 at the start of each of its turns to determine its behaviour for that turn.\n    d10 Behavior     1  The criatura uses all its movimento to move in a random direction. To determine the direction, roll a d8 and assign a direction to each die face. The criatura doesn't take an ação this turn.    2-6  The criatura doesn't move or take ações this turn.    7-8  The criatura uses its ação to make a melee attack against a randomly determined criatura within its reach. If there is no criatura within its reach, the criatura does nothing this turn.    9-10  The criatura can act and move normally.    \nAt the end of each of its turns, an affected alvo can make a Teste de resistência de Sabedoria. If it succeeds, this effect ends for that alvo"
  },
  {
    "name": "Convocar Elementais Menores",
    "level": 4,
    "classes": [
      "Druida",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 minute",
    "range": "27 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "Você convoca elementais that appear in unoccupied spaces that que você possa ver dentro do alcance. You escolha uma the following options for what appears: One elemental of challenge rating 2 or lowerTwo elementais of challenge rating 1 or lowerFour elementais of challenge rating 1/2 or lowerEight elementais of challenge rating 1/4 or lower. An elemental summoned by this spell disappears when it drops to 0 pontos de vida or when the magia termina. \n\n The summoned criaturas are friendly to you and your companions. Roll initiative for the summoned criaturas as a group, which has its own turns. They obey any verbal commands that you issue to them (no ação required by you). If you don't issue any commands to them, they defend themselves from hostile criaturas, but otherwise take no ações. \n\n The GM has the criaturas' statistics."
  },
  {
    "name": "Controlar Água",
    "level": 4,
    "classes": [
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "90 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Até a magia terminar, you control any freestanding water inside an area you choose that is a cube up to 100 feet on a side. You can choose from any of the following effects Quando você conjura essa magia. As an ação on your turn, you can repeat the same effect or choose a different one. \n\nFlood: Você causa the water level of all standing water in the area to rise by as much as 20 feet. If the area includes a shore, the flooding water spills over onto dry land. \n\n If you choose an area in a large body of water, you instead create a 20-foot tall wave that travels from one side of the area to the other and then crashes down. Any Huge or smaller vehicles in the wave's path are carried with it to the other side. Any Huge or smaller vehicles struck by the wave have a 25 percent chance of capsizing. \n\n The water level remains elevated até a magia terminar or you choose a different effect. If this effect produced a wave, the wave repeats on the start of your next turn while the flood effect lasts. \n\nPart Water: Você causa water in the area to move apart and create a trench. The trench extends across the spell's area, and the separated water forms a wall to either side. The trench remains até a magia terminar or you choose a different effect. The water then slowly fills in the trench over the course of the next rodada until the normal water level is restored. \n\nRedirect Flow: Você causa flowing water in the area to move in a direction you choose, even if the water has to flow over obstacles, up walls, or in other unlikely directions. The water in the area moves as you direct it, but once it moves beyond the spell's area, it resumes its flow based on the terrain conditions. The water continues to move in the direction you chose até a magia terminar or you choose a different effect. \n\nWhirlpool: This effect requires a body of water at least 50 feet square and 21,5 metro deep. Você causa a whirlpool to form in the center of the area. The whirlpool forms a vortex that is 1,5 metro wide at the base, up to 50 feet wide at the top, and 21,5 metro tall. Any criatura or object in the water and within 21,5 metro of the vortex is pulled 3 metros toward it. A criatura can swim away from the vortex by making a Strength (Athletics) check against your CD de resistência de magia. \n\n When a criatura enters the vortex for the first time on a turn or starts its turn there, it must make a Teste de resistência de Força. Em um teste de resistência falho, the criatura takes 2d8 dano de concussão and is caught in the vortex até a magia terminar. Em um teste de resistência bem-sucedido, the criatura takes half damage, and isn't caught in the vortex. A criatura caught in the vortex can use its ação to try to swim away from the vortex as described above, but has desvantagem on the Strength (Athletics) check to do so. \n\n The first time each turn that an object enters the vortex, the object takes 2d8 dano de concussão; this damage occurs each rodada it remains in the vortex."
  },
  {
    "name": "Convocar Seres Florestais",
    "level": 4,
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "Você convoca feérico criaturas that appear in unoccupied spaces that que você possa ver dentro do alcance. Escolha uma of the following options for what appears: One feérico criatura of challenge rating 2 or lowerTwo feérico criaturas of challenge rating 1 or lowerFour feérico criaturas of challenge rating 1/2 or lowerEight feérico criaturas of challenge rating 1/4 or lower A summoned criatura disappears when it drops to 0 pontos de vida or when the magia termina. \n\n The summoned criaturas are friendly to you and your companions. Roll initiative for the summoned criaturas as a group, which have their own turns. They obey any verbal commands that you issue to them (no ação required by you). If you don't issue any commands to them, they defend themselves from hostile criaturas, but otherwise take no ações. \n\n The GM has the criaturas' statistics."
  },
  {
    "name": "Proteção Mortal",
    "level": 4,
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "8 horas",
    "description": "You touch a criatura and grant it a measure of protection from death.\n\nThe first time the alvo would drop to 0 pontos de vida as a result of taking damage, the alvo instead drops to 1 ponto de vida, and the magia termina.\n\nIf the spell is still in effect when the alvo is subjected to an effect that would kill it Instantâneoly without dealing damage, that effect is instead negated against the alvo, and the magia termina."
  },
  {
    "name": "Línguas",
    "level": 3,
    "classes": [
      "Bardo",
      "Clérigo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "description": "This spell grants the criatura you touch the ability to understand any spoken language it hears. Moreover, when the alvo speaks, any criatura that knows at least one language and can hear the alvo understands what it says."
  },
  {
    "name": "Beast Sense",
    "level": 2,
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 hour",
    "description": "You touch a willing besta. For the duration of the spell, you can use your ação to see through the besta’s eyes and hear what it hears, and continue to do so until you use your ação to return to your normal senses.\n\nWhile perceiving through the besta’s senses, you gain the benefits of any special senses possessed by that criatura, though you are cego and ensurdecido to your own surrodadaings."
  },
  {
    "name": "Borrar",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "Your body becomes blurred, shifting and wavering to all who can see you. For the duration, any criatura has desvantagem on jogada de ataques against you. An attacker is immune to this effect if it doesn’t rely on sight, as with blindsight, or can see through illusions, as with truesight."
  },
  {
    "name": "Branding Smite",
    "level": 2,
    "classes": [
      "Paladino"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "The next time you sucesso a criatura with a weapon attack before this magia termina, the weapon gleams with astral radiance as you strike. The attack deals an extra 2d6 dano radiante to the alvo, which becomes visible if it’s invisível, and the alvo sheds dim light in a 1,5 metro radius and can’t become invisível até a magia terminar."
  },
  {
    "name": "Cordon Of Arrows",
    "level": 2,
    "classes": [
      "Patrulheiro"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "2 metros",
    "duration": "8 horas",
    "description": "You planta four pieces of nonmagical ammunition—arrows or crossbow bolts—in the grodada dentro do alcance and lay magic upon them to protect an area. Até a magia terminar, whenever a criatura other than you comes a até 9 metros of the ammunition for the first time on a turn or ends its turn there, one piece of ammunition flies up to strike it. The criatura must succeed on a Teste de resistência de Destreza or take 1d6 dano perfurante. The piece of ammunition is then destroyed. The magia termina when no ammunition remains.\n\nQuando você conjura essa magia, you can designate any criaturas you choose, and the spell ignores them."
  },
  {
    "name": "Coroa da Loucura",
    "level": 2,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "One humanoide of your choice that que você possa ver dentro do alcance must succeed on a Teste de resistência de Sabedoria or become enfeitiçado by you for the duration. \n\n While the alvo is enfeitiçado in this way, a twisted crown of jagged iron appears on its head, and a madness glows in its eyes. \n\n The enfeitiçado alvo must use its ação before moving on each of its turns to make a melee attack against a criatura other than itself that you mentally choose. The alvo can act normally on its turn if you choose no criatura or if none are within its reach. \n\n On your subsequent turns, you must use your ação to maintain control over the alvo, or the magia termina. Also, the alvo can make a Teste de resistência de Sabedoria at the end of each of its turns. On a success, the magia termina."
  },
  {
    "name": "Escuridão",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Magical darkness spreads from a point you choose dentro do alcance to fill a 4,5 metros-radius sphere for the duration. The darkness spreads arodada corners. A criatura with darkvision can’t see through this darkness, and nonmagical light can’t illuminate it. If the point you choose is on an object you are holding or one that isn’t being worn or carried, the darkness emanates from the object and moves with it. Completely covering the source of the darkness with an opaque object, such as a bowl or a helm, blocks the darkness. If any of this spell’s area overlaps with an area of light created by a spell of 2nd level or lower, the spell that created the light is dispelled."
  },
  {
    "name": "Visão no Escuro",
    "level": 2,
    "classes": [
      "Druida",
      "Patrulheiro",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "8 horas",
    "description": "You touch a criatura voluntária to grant it the ability to see in the dark. For the duration, that criatura has darkvision out to a range of 18 metros."
  },
  {
    "name": "Detectar Pensamentos",
    "level": 2,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "For the duration, you can read the thoughts of certain criaturas. When você conjura a magia and as your ação on each turn até a magia terminar, you can focus your mind on any one criatura that que você possa ver a até 9 metros of you. If the criatura you choose has an Intelligence of 3 or lower or doesn’t speak any language, the criatura is unaffected.\n\nYou initially learn the surface thoughts of the criatura—what is most on its mind in that moment. As an ação, you can either shift your attention to another criatura’s thoughts or attempt to probe deeper into the same criatura’s mind. If you probe deeper, the alvo must make a Teste de resistência de Sabedoria. If it fails, you gain insight into its reasoning (if any), its emotional state, and something that looms large in its mind (such as something it worries over, loves, or hates). If it succeeds, the magia termina. Either way, the alvo knows that you are probing into its mind, and unless you shift your attention to another criatura’s thoughts, the criatura can use its ação on its turn to make an Intelligence check contested by your Intelligence check; if it succeeds, the magia termina.\n\nQuestions verbally directed at the alvo criatura naturally shape the course of its thoughts, so this spell is particularly effective as part of an interrogation. You can also use this spell to detect the presence of thinking criaturas you can’t see. When você conjura a magia or as your ação during the duration, you can search for thoughts a até 9 metros of you. The spell can penetrate barriers, but 2 feet of rock, 2 inches of any metal other than lead, or a thin sheet of lead blocks you. You can’t detect a criatura with an Intelligence of 3 or lower or one that doesn’t speak any language.\n\nOnce you detect the presence of a criatura in this way, you can read its thoughts for the rest of the duration as described above, even if you can’t see it, but it must still be dentro do alcance."
  },
  {
    "name": "Formas Animais",
    "level": 8,
    "classes": [
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 24 hours",
    "description": "Your magic turns others into bestas. Choose any number of criaturas voluntárias that que você possa ver dentro do alcance. You transform each alvo into the form of a Large or smaller besta with a challenge rationg of 4 or lower.  On subsequent turns, you can use your ação to transform affected criaturas into new forms.\n\nThe transformation lasts for the duration for each alvo, or until the alvo drops to 0 pontos de vida or dies.  You can choose a different form for each alvo. A alvo's game statistics are replaced by the statistics of the chosen besta, thought the alvo retains its alignment and Intelligence, Wisdom, and Charisma scores. The alvo assumes the pontos de vida of its new form, and when it reverts to its normal form, it returns to the number of pontos de vida it had before it transformed. If it reverts as a result of dropping to 0 pontos de vida, any excess damage carries over to its normal form. As long as the excess damage doesn't reduce the criatura's normal form to 0 pontos de vida, it isn't knocked inconsciente. The criatura is limited in the ações it can perform by the nature of its new form, and it can't speak or cast spells.\n\nThe alvo's gear melds into the new form. The alvo can't activate, wield, or otherwise benefit from any of its equipment."
  },
  {
    "name": "Campo Antimágico",
    "level": 8,
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Self (10-foot-radius sphere)",
    "duration": "Concentração, up to 1 hour",
    "description": "A 3 metros-radius invisível sphere of antimagic surrodadas you. This area is divorced from the magical energy that suffuses the multiverse. Within the sphere, spells can't be cast, summoned criaturas disappear, and even magic items become mundane. Até a magia terminar, the sphere moves with you, centered on you. \n\n Spells and other magical effects, except those created by an artifact or a deity, are suppressed in the sphere and can't protrude into it. A slot expended to cast a suppressed spell is consumed. While an effect is suppressed, it doesn't function, but the time it spends suppressed counts against its duration. \n\nAlvoed Effects: Spells and other magical effects, such as magic falhaile and charm person, that alvo a criatura or an object in the sphere have no effect on that alvo. \n\nAreas of Magic: The area of another spell or magical effect, such as fireball, can't extend into the sphere. If the sphere overlaps an area of magic, the part of the area that is covered by the sphere is suppressed. For example, the flames created by a wall of fire are suppressed within the sphere, creating a gap in the wall if the overlap is large enough. \n\nSpells: Any active spell or other magical effect on a criatura or an object in the sphere is suppressed while the criatura or object is in it. \n\nMagic Items: The properties and powers of magic items are suppressed in the sphere. For example, a longsword, +1 in the sphere functions as a nonmagical longsword. \n\n A magic weapon's properties and powers are suppressed if it is used against a alvo in the sphere or wielded by an attacker in the sphere. If a magic weapon or a piece of magic ammunition fully leaves the sphere (for example, if you fire a magic arrow or throw a magic spear at a alvo outside the sphere), the magic of the item ceases to be suppressed as soon as it exits. \n\nMagical Travel: Teleportation and planar travel fail to work in the sphere, whether the sphere is the destination or the departure point for such magical travel. A portal to another location, world, or plane of existence, as well as an opening to an extradimensional space such as that created by the rope trick spell, temporarily closes while in the sphere. \n\nCriaturas and Objects: A criatura or object summoned or created by magic temporarily winks out of existence in the sphere. Such a criatura instantly reappears once the space the criatura occupied is no longer within the sphere. \n\nDispel Magic: Spells and magical effects such as dispel magic have no effect on the sphere. Likewise, the spheres created by different antimagic field spells don't nullify each other."
  },
  {
    "name": "Antipatia/Simpatia",
    "level": 8,
    "classes": [
      "Druida",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 hour",
    "range": "18 metros",
    "duration": "10 dias",
    "description": "This spell attracts or repels criaturas of your choice. You alvo something dentro do alcance, either a Huge or smaller object or criatura or an erea that is no larger than a 200-foot cube. Then specify a kind of intelligent criatura such as red dragões, goblins or vampires. You invest the alvo with an aura that either attracts or repels the specified criaturas for the duration. Choose antipathy or sympathy as the aura's effect.\n\nIf the alvo damages or otherwise harms an affected criatura, the affected criatura can make a Teste de resistência de Sabedoria to end the effect, as described below.\n\nA criatura that successfully saves against this affect is immune to it for 1 minuto, after which time it can be affected again."
  },
  {
    "name": "Projeção Astral",
    "level": 9,
    "classes": [
      "Clérigo",
      "Bruxo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 hour",
    "range": "3 metros",
    "duration": "Especial",
    "description": "You and up to eight criaturas voluntárias dentro do alcance project your astral bodies into the Astral Plane (the spell fails and the casting is wasted if you are already on that plane). The material body you leave behind is inconsciente and in a state of suspended animation; it doesn't need food or air and doesn't age.\n\nYour astral body resembles your mortal form in almost every way, replicating your game statistics and possessions. The principal difference is the addition of a silvery cord that extends from between your shoulder blades and trails behind you, fading to invisibility after 1 foot. This cord is your tether to your material body. As long as the tether remains intact, you can find your way home. If the cord is cut--something that can happen only when an effect specifically states that it does--your soul and body are separated, killing you instantly.\n\nYour astral form can freely travel through the Astral Plane and can pass through portals there leading to any other plane. If you enter a new plane or return to the plane you were on when casting this spell, your body and possessions are transported along the silver cord, allowing you to re-enter your body as you enter the new plane. Your astral form is a separate incarnation. Any damage or other effects that apply to it have no effect on your physical body, nor do they persist when you return to it.\n\nThe magia termina for you and your companions when you use your ação to disfalha it. When the magia termina, the affected criatura returns to its physical body, and it awakens.\n\nThe spell might also end early for you or one of your companions. A successful _dispel magic_ spell used against an astral or physical body ends the spell for that criatura. If a criatura's original body or its astral form drops to 0 pontos de vida, the magia termina for that criatura. If the magia termina and the silver cord is intact, the cord pulls the criatura's astral form back to its body, ending its state of suspended animation.\n\nIf you are returned to your body prematurely, your companions remain in their astral forms and must find their own way back to their bodies, usually by dropping to 0 pontos de vida."
  },
  {
    "name": "Clonar",
    "level": 8,
    "classes": [
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 hour",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "This spell grows an inert duplicate of a living criatura as a safeguard against death. This clone forms inside a sealed vessel and grows to full size and maturity after 120 days; you can also choose to have the clone be a younger version of th esame criatura. It remains inert and endures indefinitely, as long as its vessel remains undisturbed.\n\nAt any time after the clone matures, if the original criatura dies, its soul tranfers to the clone, provided that the soul is free and willing to return. The clone is physically identical to the original and has the same personality, memories, and abilities, but none of the original's equipment. The original criatura's physical remains, if they still exist, become inert and can't thereafter be restured to life, since the criatura's soul is elsewhere."
  },
  {
    "name": "Controlar o Clima",
    "level": 8,
    "classes": [
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "10 minutes",
    "range": "Self (5-mile radius)",
    "duration": "Concentração, up to 8 hours",
    "description": "You take control of the weather within 5 miles of you for the duration. You must be outdoors to cast this spell. Moving to a place where you don't have a clear path to the sky ends the spell early.\n\n When você conjura a magia, you change the current weather conditions, which are determined by the DM based on the climate and season. You can change precipitation, temperature, and wind. It takes 1d4 × 10 minutos for the new conditions to take effect. Once they do so, you can change the conditions again. When the magia termina, the weather gradually returns to normal. \n\n When you change the weather conditions, find a current condition on the following tables and change its stage by one, up or down. When changing the wind, you can change its direction.\n\nTemperatureStageCondition1Unbearable heat2Hot3Warm4Cool5Cold6Arctic coldWindStageCondition1Calm2Moderate wind3Strong wind4Gale5StormPrecipitationStageCondition1Clear2Light clouds3Overcast or grodada fog4Rain, hail, or snow5Torrential rain, driving hail, or blizzard"
  },
  {
    "name": "Demiplano",
    "level": 8,
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 hora",
    "description": "Você cria a shadowy door on a flat solid surface that que você possa ver dentro do alcance. The door is large enough to allow Medium criaturas to pass through unhindered. When opened, the door leads to a demiplane that appears to be an empty room 9 metros in each dimension, made of wood or stone. When the magia termina, the door disappears, and any criaturas or objects inside the demiplane remain trapped there, as the door also disappears from the other side.\n\nEach time you cast this spell, you can create a new demiplane, or have the shadowy door connect to a demiplane Você criad with a previous casting of this spell.  Additionally, if you know the nature and contents of a demiplane created by a casting of this spell by another criatura, you can have the shadowy door connect to its demiplane instead."
  },
  {
    "name": "Dominar Monstro",
    "level": 8,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "You attempt to beguile a criatura that que você possa ver dentro do alcance. It must succeed on a Teste de resistência de Sabedoria or be enfeitiçado by you for the duration. If you or criaturas that are friendly to you are fighting it, it has vantagem on the teste de resistência.\n\nWhile the criatura is enfeitiçado, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the criatura while you are conscious (no ação required), which it does its best to obey. You can specify a simple and general course of ação, such as Attack that criatura, Run over there, or Fetch that object. If the criatura completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability.\n\nYou can use your ação to take total and precise control of the alvo. Until the end of your next turn, the criatura takes only the ações you choose, and doesn't do anything that you don't allow it to do. During this time, you can also cause the criatura to use a reação, but this requires you to use your own reação as well.\n\nEach time the alvo takes damage, it makes a new Teste de resistência de Sabedoria against the spell. If the teste de resistência succeeds, the magia termina."
  },
  {
    "name": "Terremoto",
    "level": 8,
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "150 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você cria a seismic disturbance at a point on the grodada that que você possa ver dentro do alcance. For the duration, an intense tremor rips through the grodada in a 100-foot-radius circle centered on that point and shakes criaturas and structures in contact with the grodada in that area. \n\n The grodada in the area becomes difficult terrain. Each criatura on the grodada that is concentrating must make a Teste de resistência de Constituição. Em um teste de resistência falho, the criatura's concentração is broken. \n\n Quando você conjura essa magia and at the end of each turn you spend concentrating on it, each criatura on the grodada in the area must make a Teste de resistência de Destreza. Em um teste de resistência falho, the criatura is knocked caído. \n\n This spell can have additional effects depending on the terrain in the area, as determined by the GM. \n\nFissures: Fissures open throughout the spell's area at the start of your next turn after você conjura a magia. A total of 1d6 such fissures open in locations chosen by the GM. Each is 1d10 × 3 metros deep, 3 metros wide, and extends from one edge of the spell's area to the opposite side. A criatura standing on a spot where a fissure opens must succeed on a Teste de resistência de Destreza or fall in. A criatura that successfully saves moves with the fissure's edge as it opens. \n\n A fissure that opens beneath a structure causes it to automatically collapse (see below). \n\nStructures: The tremor deals 50 dano de concussão to any structure in contact with the grodada in the area when você conjura a magia and at the start of each of your turns até a magia terminar. If a structure drops to 0 pontos de vida, it collapses and potentially damages nearby criaturas. A criatura within half the distance of a structure's height must make a Teste de resistência de Destreza. Em um teste de resistência falho, the criatura takes 5d6 dano de concussão, is knocked caído, and is buried in the rubble, requiring a DC 20 Strength (Athletics) check as an ação to escape. The GM can adjust the DC higher or lower, depending on the nature of the rubble. Em um teste de resistência bem-sucedido, the criatura takes metade do dano and doesn't fall caído or become buried."
  },
  {
    "name": "Debilitar Mente",
    "level": 8,
    "classes": [
      "Bardo",
      "Druida",
      "Bruxo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantâneo",
    "description": "You blast the mind of a criatura that que você possa ver dentro do alcance, attempting to shatter its intellect and personality. The alvo takes 4d6 dano psíquico and must make an Teste de resistência de Inteligência. \n\n Em um teste de resistência falho, the criatura's Intelligence and Charisma scores become 1. The criatura can't cast spells, activate magic items, understand language, or communicate in any intelligible way. The criatura can, however, identify its friends, follow them, and even protect them. \n\n At the end of every 30 days, the criatura can repeat its teste de resistência against this spell. If it succeeds on its teste de resistência, the magia termina. \n\n The spell can also be ended by greater restoration, heal, or wish."
  },
  {
    "name": "Presciência",
    "level": 9,
    "classes": [
      "Bardo",
      "Druida",
      "Bruxo",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 minute",
    "range": "Toque",
    "duration": "8 horas",
    "description": "You touch a criatura voluntária and bestow a limited ability to see into the immediate future. For the duration the alvo can't be surprised and has vantagem on jogada de ataques, teste de habilidades, and testes de resistência. Additionally, other criaturas have desvantagem on jogada de ataques against the alvo for the duration.\n\nThis spell immediately ends if you cast it again before its duration ends."
  },
  {
    "name": "Portal",
    "level": 9,
    "classes": [
      "Clérigo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você conjura a portal linking an unoccupied space que você possa ver wsucessohin range to a precise location on a different plane of existence. The portal is a circular opening, which you can make 5 to 20 feet in diameter. You can orient the portal in any direction you choose. The portal lasts for the duration.\n\nThe portal has a front and a back on each plane where it appears. Travel through the portal is possible only by moving through its front. Anything that does so is instantly transported to the other plane, appearing in the unoccupied space nearest to the portal.\n\nDeities and other planar rulers can prevent portals created by this spell from opening in their presence or anywhere within their domains.\n\nQuando você conjura essa magia, you can speak the name of a specific criatura (a pseudonym, title or nickname doesn't work). If that criatura is on a plane other than the one you are on, the portal opens in the named criatura's immediate vicinity and draws the criatura through it to the nearest unoccupied space on your side of the portal. You gain no special power over the criatura, and it is free to act as the DM deems appropriate. It might leave, attack you or help you."
  },
  {
    "name": "Fluência",
    "level": 8,
    "classes": [
      "Bardo",
      "Bruxo"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "1 hora",
    "description": "Até a magia terminar, when you make a Charisma check, you can replace the number you roll with a 15. Additionally, no matter what you say, magic that would determine if you are telling the truth indicates that you are being truthful."
  },
  {
    "name": "Aura Sagrada",
    "level": 8,
    "classes": [
      "Clérigo"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "Divine light washes out from you and coalesces in a soft radiance in a 9 metros radius arodada you. Criaturas of your choice in that radius Quando você conjura essa magia shed dim light in a 1,5 metro radius and have vantagem on all testes de resistência, and other criaturas have desvantagem on jogada de ataques against them até a magia terminar. In addition, when a inimigo or an mortos-vivos sucessos an affected criatura with a melee attack, the aura flashes with brilliant light. The attacker must succeed on a Teste de resistência de Constituição or be cego até a magia terminar."
  },
  {
    "name": "Aprisionamento",
    "level": 9,
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 minute",
    "range": "9 metros",
    "duration": "Até ser dissipada",
    "description": "Você cria a magical restraint to hold a criatura that que você possa ver dentro do alcance. The alvo must succeed on a Teste de resistência de Sabedoria or be bound by the spell; if it succeeds, it is immune to this spell if you cast it again. While affected by this spell, the criatura doesn't need to breathe, eat, or drink, and it doesn't age. Divination spells can't locate or perceive the alvo. \n\n When você conjura a magia, you escolha uma of the following forms of imprisonment. \n\nBurial: The alvo is entombed far beneath the earth in a sphere of magical force that is just large enough to contain the alvo. Nothing can pass through the sphere, nor can any criatura teleport or use planar travel to get into or out of it. \n\n The special component for this version of the spell is a small mithral orb. \n\nChaining: Heavy chains, firmly rooted in the grodada, hold the alvo in place. The alvo is imobilizado até a magia terminar, and it can't move or be moved by any means until then. \n\n The special component for this version of the spell is a fine chain of precious metal. \n\nHedged Prison: The spell transports the alvo into a tiny demiplane that is warded against teleportation and planar travel. The demiplane can be a labyrinth, a cage, a tower, or any similar confined structure or area of your choice. \n\n The special component for this version of the spell is a miniature representation of the prison made from jade. \n\nMinimus Containment: The alvo shrinks to a height of 1 inch and is imprisoned inside a gemstone or similar object. Light can pass through the gemstone normally (allowing the alvo to see out and other criaturas to see in), but nothing else can pass through, even by means of teleportation or planar travel. The gemstone can't be cut or broken while the spell remains in effect. \n\n The special component for this version of the spell is a large, transparent gemstone, such as a corundum, diamond, or ruby. \n\nSlumber: The alvo falls asleep and can't be awoken. The special component for this version of the spell consists of rare soporific herbs. \n\nEnding the Spell: During the casting of the spell, in any of its versions, you can specify a condition that will cause the spell to end and release the alvo. The condition can be as specific or as elaborate as you choose, but the GM must agree that the condition is reasonable and has a likelihood of coming to pass. The conditions can be based on a criatura's name, identity, or deity but otherwise must be based on observable ações or qualities and not based on intangibles such as level, class, or pontos de vida. \n\n A dispel magic spell can end the spell only if it is cast as a 9th-level spell, alvoing either the prison or the special component used to create it. \n\n You can use a particular special component to create only one prison at a time. If você conjura a magia again using the same component, the alvo of the first casting is immediately freed from its binding."
  },
  {
    "name": "Nuvem Incendiária",
    "level": 8,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A swirling cloud of smoke shot through with wsucessoe-hot embers appears in a 20-foot-range. The cloud spreads arodada corners and is heavily obscured. It lasts for the duration or until a wind of moderate or greater velocidade (at least 10 miles per hora) disperses it.\n\nWhen the cloud appears, each criatura in it must make a Teste de resistência de Destreza. A criatura takes 10d8 dano de fogo em um teste de resistência falho, or metade do dano on a successful one. A criatura must also make this teste de resistência when it enters the spell's area for the first time on a turn or ends its turn there.\n\nThe cloud moves 3 metros directly away from you in a direction that you choose at the start of each of your turns."
  },
  {
    "name": "Curar em Massa",
    "level": 9,
    "classes": [
      "Clérigo"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "A flood of healing energy flows from you into injured criaturas arodada you. You restore up to 700 pontos de vida, divided as you choose among any number of criaturas that que você possa ver dentro do alcance. Criaturas healed by this spell are also cured of all diseases and any effect making them cego or ensurdecido. This spell has no effect on mortos-vivos or constructoos."
  },
  {
    "name": "Labirinto",
    "level": 8,
    "classes": [
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "You banish a criatura that que você possa ver dentro do alcance into a labyrinthine demiplane. The alvo remains there for the duration or until it escapes the maze.\n\nThe alvo can use its ação to attempt to escape. When it does so, it makes a DC 20 Intelligence check. If it succeeds, it escapes, and the magia termina (a minotaur or goristro demon automatically succeeds).\n\nWhen the magia termina, the alvo reappears in the space it left or, if that space is occupied, in the nearest unoccupied space."
  },
  {
    "name": "Chuva de Meteoros",
    "level": 9,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "1 mile",
    "duration": "Instantâneo",
    "description": "Blazing orbs of fire plummet to the grodada at four different points que você possa ver dentro do alcance. Each criatura in a 40-foot-radius sphere centered on each point you choose must make a Teste de resistência de Destreza. The sphere spreads arodada corners. A criatura takes 20d6 dano de fogo and 20d6 dano de concussão em um teste de resistência falho, or metade do dano on a successful one. A criatura in the area of more than one fiery burst is affected only once.\n\nThe spell damages objects in the area and ignites flammable objects that aren't being worn or carried."
  },
  {
    "name": "Mente em Branco",
    "level": 8,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "24 horas",
    "description": "Até a magia terminar, one criatura voluntária you touch is immune to dano psíquico, any effect that would sense its emotions or read its thoughts, divination spells, and the enfeitiçado condition. The spell even foils wish spells and spells or effects of similar power used to affect the alvo's mind or to gain information about the alvo."
  },
  {
    "name": "Palavra de Poder: Curar",
    "level": 9,
    "classes": [
      "Bardo"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "A wave of healing energy washes over the criatura you touch. The alvo regains all its pontos de vida. If the criatura is enfeitiçado, amedrontado, paralisado, or atordoado, the condition ends. If the criatura is caído, it can use its reação to stand up. This spell has no effect on mortos-vivos or constructoos."
  },
  {
    "name": "Palavra de Poder: Matar",
    "level": 9,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "You utter a word of power that can compel one criatura que você possa ver dentro do alcance to die instantly. If the criatura you choose has 100 pontos de vida or fewer, it dies. Otherwise, the spell has no effect."
  },
  {
    "name": "Palavra de Poder: Atordoar",
    "level": 8,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "You speak a word of power that can overwhelm the mind of one criatura que você possa ver dentro do alcance, leaving it dumbfounded. If the alvo has 150 pontos de vida or fewer, it is atordoado. Otherwise, the spell has no effect.\n\nThe atordoado alvo must make a Teste de resistência de Constituição at the end of each of its turns.  Em um teste de resistência bem-sucedido, this stunning effect ends."
  },
  {
    "name": "Muro Prismático",
    "level": 9,
    "classes": [
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "10 minutos",
    "description": "A shimmering, multicolored plane of light forms a vertical opaque wall--up to 27 metros long, 9 metros high, and 1 inch thick--centered on a point que você possa ver dentro do alcance. Alternatively, you can shape the wall into a sphere up to 9 metros in diameter centered on a point you choose dentro do alcance. The wall remains in place for the duration. If you position the wall so that it passes through a space occupied by a criatura, the spell fails, and your ação and the espaço de magia are wasted. \n\n The wall sheds bright light out to a range of 100 feet and dim light for an additional 100 feet. You and criaturas you designate at the time você conjura a magia can pass through and remain near the wall without harm. If another criatura that can see the wall moves to within 20 feet of it or starts its turn there, the criatura must succeed on a Teste de resistência de Constituição or become cego for 1 minuto. \n\n The wall consists of seven layers, each with a different color. When a criatura attempts to reach into or pass through the wall, it does so one layer at a time through all the wall's layers. As it passes or reaches through each layer, the criatura must make a Teste de resistência de Destreza or be affected by that layer's properties as described below. \n\n The wall can be destroyed, also one layer at a time, in order from red to violet, by means specific to each layer. Once a layer is destroyed, it remains so for the duration of the spell. Antimagic field has no effect on the wall, and dispel magic can affect only the violet layer. Red The criatura takes 10d6 dano de fogo em um teste de resistência falho, or metade do dano on a successful one. While this layer is in place, nonmagical ranged attacks can't pass through the wall. The layer can be destroyed by dealing at least 25 dano de frio to it.Orange The criatura takes 10d6 dano de ácido em um teste de resistência falho, or metade do dano on a successful one. While this layer is in place, magical ranged attacks can't pass through the wall. The layer is destroyed by a strong wind.Yellow The criatura takes 10d6 dano de raio em um teste de resistência falho, or metade do dano on a successful one. This layer can be destroyed by dealing at least 60 dano de força to it.Green The criatura takes 10d6 dano de veneno em um teste de resistência falho, or metade do dano on a successful one. A passwall spell, or another spell of equal or greater level that can open a portal on a solid surface, destroys this layer.Blue The criatura takes 10d6 dano de frio em um teste de resistência falho, or metade do dano on a successful one. This layer can be destroyed by dealing at least 25 dano de fogo to it.Indigo Em um teste de resistência falho, the criatura is imobilizado. It must then make a Teste de resistência de Constituição at the end of each of its turns. If it successfully saves three times, the magia termina. If it fails its save three times, it permanently turns to stone and is subjected to the petrificado condition. The successes and failures don't need to be consecutive; keep track of both until the criatura collects three of a kind. While this layer is in place, spells can't be cast through the wall. The layer is destroyed by bright light shed by a daylight spell or a similar spell of equal or nível superior.Violet Em um teste de resistência falho, the criatura is cego. It must then make a Teste de resistência de Sabedoria at the start of your next turn. A successful save ends the blindness. If it fails that save, the criatura is transported to another plane of the GM's choosing and is no longer cego. (Typically, a criatura that is on a plane that isn't its home plane is banished home, while other criaturas are usually cast into the Astral or Ethereal planes.) This layer is destroyed by a dispel magic spell or a similar spell of equal or nível superior that can end spells and magical effects."
  },
  {
    "name": "Metamorfose",
    "level": 9,
    "classes": [
      "Druida",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 hour",
    "description": "You assume the form of a different criatura for the duration. The new form can be of any criatura with a challenge rating equal to your level or lower. The criatura can't be a constructo or an mortos-vivos, and you must have seen the sort of criatura at least once. You transform into an average example of that criatura, one without any class levels or the Spellcasting trait. \n\n Your game statistics are replaced by the statistics of the chosen criatura, though you retain your alignment and Intelligence, Wisdom, and Charisma scores. You also retain all of your skill and teste de resistência proficiencies, in addition to gaining those of the criatura. If the criatura has the same proficiency as you and the bonus listed in its statistics is higher than yours, use the criatura's bonus in place of yours. You can't use any legendary ações or lair ações of the new form. \n\n You assume the pontos de vida and Sucesso Dice of the new form. When you revert to your normal form, you return to the number of pontos de vida you had before you transformed. If you revert as a result of dropping to 0 pontos de vida, any excess damage carries over to your normal form. As long as the excess damage doesn't reduce your normal form to 0 pontos de vida, you aren't knocked inconsciente. \n\n You retain the benefit of any features from your class, race, or other source and can use them, provided that your new form is physically capable of doing so. You can't use any special senses you have (for example, darkvision) unless your new form also has that sense. You can only speak if the criatura can normally speak. \n\n When you transform, you choose whether your equipment falls to the grodada, merges into the new form, or is worn by it. Worn equipment functions as normal. The GM determines whether it is practical for the new form to wear a piece of equipment, based on the criatura's shape and size. Your equipment doesn't change shape or size to match the new form, and any equipment that the new form can't wear must either fall to the grodada or merge into your new form. Equipment that merges has no effect in that state. \n\n During this spell's duration, you can use your ação to assume a different form following the same restrictions and rules for the original form, with one exception: if your new form has more pontos de vida than your current one, your pontos de vida remain at their current value."
  },
  {
    "name": "Tempestade de Vingança",
    "level": 9,
    "classes": [
      "Druida"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "Sight",
    "duration": "Concentração, up to 1 minute",
    "description": "A churning storm cloud forms, centered on a point que você possa ver and spreading to a radius of 318 metros. Lightning flashes in the area, thunder booms, and strong winds roar. Each criatura under the cloud (no more than 5,000 feet beneath the cloud) when it appears must make a Teste de resistência de Constituição. Em um teste de resistência falho, a criatura takes 2d6 dano sônico and becomes ensurdecido for 5 minutos. \n\n Each rodada you maintain concentração on this spell, the storm produces different effects on your turn. \n\nRodada 2: Acidic rain falls from the cloud. Each criatura and object under the cloud takes 1d6 dano de ácido. \n\nRodada 3: You call six bolts of lightning from the cloud to strike six criaturas or objects of your choice beneath the cloud. A given criatura or object can't be struck by more than one bolt. A struck criatura must make a Teste de resistência de Destreza. The criatura takes 10d6 dano de raio em um teste de resistência falho, or metade do dano on a successful one. \n\nRodada 4: Hailstones rain down from the cloud. Each criatura under the cloud takes 2d6 dano de concussão. \n\nRodada 5–10: Gusts and freezing rain assail the area under the cloud. The area becomes difficult terrain and is heavily obscured. Each criatura there takes 1d6 dano de frio. Ataque à distância com armas in the area are impossible. The wind and rain count as a severe distração for the purposes of maintaining concentração on spells. Finally, gusts of strong wind (ranging from 20 to 50 miles per hora) automatically disperse fog, mists, and similar phenomena in the area, whether mundane or magical."
  },
  {
    "name": "Telepatia",
    "level": 8,
    "classes": [
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Unlimited",
    "duration": "24 horas",
    "description": "Você cria a telepathic link between yourself and a criatura voluntária with which you are familiar. The criatura can be anywhere on the same plane of existence as you. The magia termina if you or the alvo are no longer on the same plane.\n\nAté a magia terminar, you and the alvo can Instantâneoly share words, images, sounds and other sensory messages with one another through the link, and the alvo recognizes you as the criatura it is communicating with. The spell enables a criatura with an Intelligence score of at least 1 to understand the meaning of your words and take in the scope of any sensory messages you send to it."
  },
  {
    "name": "Explosão Solar",
    "level": 8,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantâneo",
    "description": "Brilliant sunlight flashes in a 18 metros radius centered on a point you choose dentro do alcance. Each criatura in that light must make a Teste de resistência de Constituição. Em um teste de resistência falho, a criatura takes 12d6 dano radiante and is cego for 1 minuto. Em um teste de resistência bem-sucedido, it takes metade do dano and isn't cego by this spell. Mortos-vivos and gosmas have desvantagem on this teste de resistência.\n\nA criatura cego by this spell makes another Teste de resistência de Constituição at the end of each of its turns. Em um teste de resistência bem-sucedido, it is no longer cego.\n\nThis spell dispels any darkness in its area that was created by a spell."
  },
  {
    "name": "Parar o Tempo",
    "level": 9,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Instantâneo",
    "description": "You briefly stop the flow of time for everyone but yourself. No time passes for other criaturas, while you take 1d4 + 1 turns in a row, during which you can use ações and move as normal.\n\nThis magia termina if one of the ações you use during this period, or any effects that Você cria during this period, affects a criatura other than you or an object being worn or carried by someone other than you. In addition, the magia termina if you move to a place more than 1,000 feet form the location where you cast it."
  },
  {
    "name": "Polimorfismo Verdadeiro",
    "level": 9,
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "Escolha uma criatura or nonmagical object that que você possa ver dentro do alcance. You transform the criatura into a different criatura, the criatura into a nonmagical object, or the object into a criatura (the object must be neither worn nor carried by another criatura). The spell lasts for the duration, or until the alvo drops to 0 pontos de vida or dies. If you concentrate on this spell for the full duration, the spell lasts until it is dispelled. \n\n This spell has no effect on a shapechanger or a criatura with 0 pontos de vida. An uncriatura voluntária can make a Teste de resistência de Sabedoria, and if it succeeds, it isn’t affected by this spell. \n\nCriatura into Criatura: If you turn a criatura into another kind of criatura, the new form can be any kind you choose whose challenge rating is equal to or less than the alvo’s (or its level, if the alvo doesn’t have a challenge rating). The alvo’s game statistics, including mental ability scores, are replaced by the statistics of the new form. It retains its alignment and personality. \n\n The alvo assumes the pontos de vida of its new form, and when it reverts to its normal form, the criatura returns to the number of pontos de vida it had before it transformed. If it reverts as a result of dropping to 0 pontos de vida, any excess damage carries over to its normal form. As long as the excess damage doesn’t reduce the criatura’s normal form to 0 pontos de vida, it isn’t knocked inconsciente. \n\n The criatura is limited in the ações it can perform by the nature of its new form, and it can’t speak, cast spells, or take any other ação that requires hands or speech, unless its new form is capable of such ações. \n\n The alvo’s gear melds into the new form. The criatura can’t activate, use, wield, or otherwise benefit from any of its equipment. \n\nObject into Criatura: You can turn an object into any kind of criatura, as long as the criatura’s size is no larger than the object’s size and the criatura’s challenge rating is 9 or lower. The criatura is friendly to you and your companions. It acts on each of your turns. You decide what ação it takes and how it moves. The GM has the criatura’s statistics and resolves all of its ações and movimento. \n\n If the spell becomes permanent, you no longer control the criatura. It might remain friendly to you, depending on how you have treated it. \n\nCriatura into Object: If you turn a criatura into an object, it transforms along with whatever it is wearing and carrying into that form, as long as the object’s size is no larger than the criatura’s size. The criatura’s statistics become those of the object, and the criatura has no memory of time spent in this form, after the magia termina and it returns to its normal form."
  },
  {
    "name": "Tsunami",
    "level": 8,
    "classes": [
      "Druida"
    ],
    "school": "Conjuração",
    "castingTime": "1 minute",
    "range": "Sight",
    "duration": "Concentração, up to 6 rounds",
    "description": "A wall of water springs into existence at a point you choose dentro do alcance. You can make the wall up to 300 feet long, 300 feet high, and 50 feet thick. The wall lasts for the duration.\n\nWhen the wall appears, each criatura within its area must make a Teste de resistência de Força. Em um teste de resistência falho, a criatura takes 6d10 dano de concussão, or metade do dano em um teste de resistência bem-sucedido.\n\nAt the start of each of your turns after the wall appears, the wall, along with any criaturas in it, moves 50 feet away from you. Any Huge or smaller criatura inside the wall or whose space the wall enters when it moves must succeed on a Teste de resistência de Força or take 5d10 dano de concussão. A criatura can take theis damage only once per rodada. At the end of the turn, the wall's height is reduced by 50 feet, and the damage criaturas take from the the spell on subsequent rodadas is reduced by 1d10. When the wall reaches 0 feet in height, the magia termina.\n\nA criatura caught in the wall can move by swimming. Because of the force of the wave, though, the criatura must make a successful Strength (Athletics) check against your CD de resistência de magia in order to move at all. If it fails the check, it can't move. A criatura that moves out of the area falls to the grodada."
  },
  {
    "name": "Ressurreição Verdadeira",
    "level": 9,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "school": "Necromancia",
    "castingTime": "1 hour",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You touch a criatura that has been dead for no longer than 200 years and that died for any reason except old age. If the criatura's soul is free and willing, the criatura is restored to life with all its pontos de vida.\n\nThis spell closes all wounds, neutralizes any poison, cures all diseases, and lifts any curses affecting the criatura when it died. The spell replaces damaged or falhaing organs and limbs.\n\nThe spell can even provide a new body if the original no longer exists, in which case you must speak the criatura's name. The criatura then appears in an unoccupied space you choose a até 3 metros of you."
  },
  {
    "name": "Pesadelo",
    "level": 9,
    "classes": [
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Drawing on the deepest fears of a group of criaturas, Você cria illusory criaturas in their minds, visible only to them. Each criatura in a 9 metros-radius sphere centered on a point of your choice dentro do alcance must make a Teste de resistência de Sabedoria. Em um teste de resistência falho, a criatura becomes amedrontado for the duration. The illusion calls on the criatura's deepest fears, manifesting its worst nightmares as an implacable threat. At the start of each of the amedrontado criatura's turns, it must succeed on a Teste de resistência de Sabedoria or take 4d10 dano psíquico. Em um teste de resistência bem-sucedido, the magia termina for that criatura."
  },
  {
    "name": "Desejo",
    "level": 9,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Instantâneo",
    "description": "Wish is the mightiest spell a mortal criatura can cast. By simply speaking aloud, you can alter the very foundations of reality in accord with your desires.\n\nThe basic use of this spell is to duplicate any other spell of 8th level or lower. You don't need to meet any requirements in that spell, including costly components. The spell simply takes effect. Você cria one object of up to 25,000 gp in value that isn't a magic item. The object can be no more than 300 feet in any dimension, and it appears in an unoccupied space que você possa ver on the grodada.You allow up to twenty criaturas that que você possa ver to regain all pontos de vida, and you end all effects on them described in the greater restoration spell.You grant up to ten criaturas that que você possa ver resistance to a damage type you choose.You grant up to ten criaturas que você possa ver immunity to a single spell or other magical effect for 8 horas. For instance, you could make yourself and all your companions immune to a lich's life drain attack.You undo a single recent event by forcing a reroll of any roll made within the last rodada (including your last turn). Reality reshapes itself to accomodate the new result. For example, a wish spell could undo an opponent's successful save, a foe's critical sucesso, or a friend's failed save. You can force the reroll to be made with vantagem or desvantagem, and you can choose whether to use the reroll or the original roll. You might be able to achieve something beyond the scope of the above examples. State your wish to the DM as precisely as possible. The DM has great latitude in ruling what occurs in such an instance; the greater the wish, the greater the likelihood that something goes wrong. This spell might simply fail, the effect you desire might only be partly achieved, or you might suffer some unforeseen consequence as a result of how you worded the wish. For example, wishing that a villain were dead might propel you forward in time to a period when that villain is no longer alive, effectively removing you from the game. Similarly, wishing for a legendary magic item or artifact might instantly transport you to the presence of the item's current owner.\n\nThe stress of casting this spell to produce any effect other than duplicating another spell weakens you. After enduring that stress, each time you cast a spell until you finish a descanso longo, you take 1d10 dano necrótico per level of that spell. This damage can't be reduced or prevented in any way. In addition, you Strength drops to 3 if it isn't 3 or lower already, for 2d4 days. For each of those days that you spend resting and doing nothing more than light activity, your remaining recovery time decreases by 2 days. Finally, there is a 33 percent chance that you are unable to cast wish ever again if you suffer this stress."
  },
  {
    "name": "Convocar Celestial",
    "level": 7,
    "classes": [
      "Clérigo"
    ],
    "school": "Conjuração",
    "castingTime": "1 minute",
    "range": "27 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "Você convoca a celestial of challenge rating 4 or lower, which apperas in an unoccupied space that que você possa ver dentro do alcance. The celestial disappears when it drops to 0 pontos de vida or when the magia termina.\n\nThe celestial is friendly to you and your companions for the duration. Roll initiative for the celestial, which has its own turns. It obeys any verbal commands that you issue to it (no ação required by you), as long as they don't violate its alignment. If you don't issue any commands to the celestial, it defends itself from hostile criaturas but otherwise takes no ações.\n\nThe DM has the celestial's statistics."
  },
  {
    "name": "Bola de Fogo de Explosão Retardada",
    "level": 7,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A beam of yellow light flashes from your pointing finger, then condenses to linger at a chose point dentro do alcance as a glowing bead for the duration. When the magia termina, either because your concentração is broken or because you decide to end it, the bead blossoms with a low roar into an explosion of flame that spreads arodada corners. Each criatura in a 20-foot-radius sphere centered on that point must make a Teste de resistência de Destreza. A criatura takes dano de fogo equal to the total accumulated damage em um teste de resistência falho, or metade do dano on a successful one.\n\nThe spell's base damage is 12d6. If at the end of your turn the bead has not yet detonated, the damage increases by 1d6.\n\nIf the glowing bead is touched before the interval has expired, the criatura touching it must make a Teste de resistência de Destreza. Em um teste de resistência falho, the magia termina immediately, causing the bead to erupt in flame. Em um teste de resistência bem-sucedido, the criatura can throw the bead up to 40 feet. When it strikes a criatura or a solid object, the magia termina, and the bead explodes.\n\nThe dano de fogos objects in the area dn ignites flammable objects that aren't being worn or carried."
  },
  {
    "name": "Porta Dimensional",
    "level": 4,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "150 metros",
    "duration": "Instantâneo",
    "description": "You teleport yourself from your current location to any other spot dentro do alcance. You arrive at exactly the spot desired. It can be a place que você possa ver, one you can visualise, or one you can describe by stating distance and direction, such as 200 feet straight downward or upward to the northwest at a 45-degree angle, 300 feet.\n\nYou can bring along objects as long as their weight doesn't exceed what you can carry. You can also bring one criatura voluntária of your size or smaller who is carrying gear up to its carrying capacity. The criatura must be a até 1,5 metro of you Quando você conjura essa magia.\n\nIf you would arrive in a place already occupied by an object or a criatura, you and any criatura travelling with you each take 4d6 dano de força, and the spell fails to teleport you."
  },
  {
    "name": "Palavra Divina",
    "level": 7,
    "classes": [
      "Clérigo"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "You utter a divine word, imbued with the power that shaped the world at the dawn of creation. Choose any number of criaturas que você possa ver dentro do alcance. Each criatura that can hear you must make a Teste de resistência de Carisma. Em um teste de resistência falho, a criatura suffers an effect based on its current pontos de vida: 50 pontos de vida or fewer: ensurdecido for 1 minuto40 pontos de vida or fewer: ensurdecido and cego for 10 minutos30 pontos de vida or fewer: cego, ensurdecido, and atordoado for 1 hora20 pontos de vida or fewer: killed instantly Regardless of its current pontos de vida, a celestial, an elemental, a feérico, or a inimigo that fails its save is forced back to its plane of origin (if it isn't there already) and can't return to your current plane for 24 horas by any means short of a wish spell."
  },
  {
    "name": "Etereidade",
    "level": 7,
    "classes": [
      "Bardo",
      "Clérigo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Até 8 horas",
    "description": "You step into the border regions of the Ethereal Plane, in the area where it overlaps with your current plane. You remain in the Border Ethereal for the duration or until you use your ação to disfalha the spell. During this time, you can move in any direction. If you move up or down, every foot of movimento costs an extra foot. Que você possa ver and hear the plane you originated from, but everything there looks gray, and you can't see anything more than 18 metros away.\n\nWhile on the Ethereal Plane, you can only affect and be affected by other criaturas on that plane. Criaturas that aren't on the Ethereal Plane can't perceive you and can't interact with you, unless a special ability or magic has given them the ability to do so.\n\nYou ignore all objects and effects that aren't on the Ethereal Plane, allowing you to move through objects you perceive on the plane you originated from.\n\nWhen the magia termina, you immediately return to the plan you originated from in the spot you currently occupy.  If you occupy the same spot as a solid object or criatura when this happens, you are immediately shunted to the nearest unoccupied space that you can occupy and take dano de força equal to twice the number of feet you are moved.\n\nThis spell has no effect if you cast it while you are on the Ethereal Plane or a plane that doesn't border it, such as one of the Outer Planes."
  },
  {
    "name": "Dedo da Morte",
    "level": 7,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "You send negative engery coursing through a criatura that que você possa ver dentro do alcance, causing it searing pain. The alvo must make a Teste de resistência de Constituição. It takes 7d8 + 30 dano necrótico em um teste de resistência falho, or metade do dano on a successful one.\n\nA humanoide killed by this spell rises at the start of your next turn as a zombie that is permanently under your command, following your verbal orders to the best of its ability."
  },
  {
    "name": "Tempestade de Fogo",
    "level": 7,
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantâneo",
    "description": "A storm made up of sheets of roaring flame appears in a location you choose dentro do alcance. The area of the storm consists of up to ten 3 metros-cubes, which you can arrange as you wish. Each cube must have at least one face adjacent to the face of another cube. Each criatura in the area must make a Teste de resistência de Destreza. It takes 7d10 dano de fogo em um teste de resistência falho, or metade do dano on a successful one.\n\nThe dano de fogos objects in the area and ignites flammable objects that aren't being worn or carried. If you choose, planta life in the area is unaffected by this spell."
  },
  {
    "name": "Gaiola de Força",
    "level": 7,
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "30 metros",
    "duration": "1 hora",
    "description": "An immobile, invisível, cube-shaped prison composed of magical force springs into existence arodada an area you choose dentro do alcance. The prison can be a cage or a solid box, as you choose.\n\nA prison in the shape of a cage can be up to 20 feet on a side and is made from 1/2-inch diameter bars spaced 1/2-inch apart.\n\nA prison in the shape of a box can be up to 3 metros on a size, creating a solid barrier that prevents any matter from passing through it and blocking any spells cast into or out from the area.\n\nWhen você conjura a magia, any criatura that is completely inside the cage's area is trapped. Criaturas only partially within the area, or those too large to fit inside the area, are pushed away from the center of the area until they are completely outside the area.\n\nA criatura inside the cage can't leave it by nonmagical means. If the criatura tries to use teleportation or interplanar travel to leave the cage, it must first make a Teste de resistência de Carisma. On a success, the criatura can use that magic to exit the cage. On a failure, the criatura can't exit the cage and wastes the use of the spell or effect. The cage also extends into the Ethereal Plane, blocking ethereal travel.\n\nThis spell can't be dispelled by dispel magic."
  },
  {
    "name": "Miragem Arcana",
    "level": 7,
    "classes": [
      "Bardo",
      "Druida",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "10 minutes",
    "range": "Sight",
    "duration": "10 dias",
    "description": "You make terrain in a area up to 1,5 quilômetro square look, sound, smell, and even feel like some other sort of terrain. The terrain's general shape remains the same, however. Open fields or a road could be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gental slope, or a rock-strewn gully like a wide and smooth road.\n\nSimilarly, you can alter the appearance of structures, and add them where none are present. The spell doesn't disguise, conceal or add criaturas.\n\nThe illusion includes audible, visual, tactile, and olfactory elements, so it can turn clear grodada into difficult terrain (or vice versa) or otherwise impede movimento through the area. Any piece of the illusory terrain (such as a rock or stick) that is removed from the spell's area disappears immediately.\n\nCriaturas with truesight can see through the illusion to the terrain's true form; however, all other elements of the illusion remain, so while the criatura is aware of the illusion's presence, the criatura can still physically interact with the illusion."
  },
  {
    "name": "Aspersão Prismática",
    "level": 7,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Self (60-foot cone)",
    "duration": "Instantâneo",
    "description": "Eight multicolored rays of light flash from your hand. Each ray is a different color and has a different power and purpose. Each criatura in a 18 metros cone must make a Teste de resistência de Destreza. For each alvo, roll a d8 to determine which color ray affects it. Red: The alvo takes 10d6 dano de fogo em um teste de resistência falho, or metade do dano on a successful one. Orange: The alvo takes 10d6 dano de ácido em um teste de resistência falho, or metade do dano on a successful one.Yellow: The alvo takes 10d6 dano de raio em um teste de resistência falho, or metade do dano on a successful one.Green: The alvo takes 10d6 dano de veneno em um teste de resistência falho, or metade do dano on a successful one.Blue: The alvo takes 10d6 dano de frio em um teste de resistência falho, or metade do dano on a successful one.Indigo: Em um teste de resistência falho, the alvo is imobilizado. It must then make a Teste de resistência de Constituição at the end of each of its turns. If it successfully saves three times, the magia termina. If it fails its save three times, it permanently turns to stone and is subjected to the petrificado condition. The successes and failures don't need to be consecutive; keep track of both until the alvo collects three of a kind.Violet: Em um teste de resistência falho, the alvo is cego. It must then make a Teste de resistência de Sabedoria at the start of your next turn. A successful save ends the blindness. If it fails that save, the criatura is transported to another plane of existence of the GM's choosing and is no longer cego. (Typically, a criatura that is on a plane that isn't its home plane is banished home, while other criaturas are usually cast into the Astral or Ethereal planes.) Special: The alvo is struck by two rays. Roll twice more, rerolling any 8."
  },
  {
    "name": "Projetar Imagem",
    "level": 7,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "500 miles",
    "duration": "Concentração, up to 1 day",
    "description": "Você cria an illusory copy of yourself that lasts for the duration. The copy can appear at any location dentro do alcance that you have seen before, regardless of intervening obstacles. The illusion looks and sounds like you but is intangible. If the illusion takes any damage, it disappears, and the magia termina.\n\nYou can use your ação to move this illusion up to twice your velocidade, and make it gesture, speak, and behave in whatever way you choose. It mimics your mannerisms perfectly.\n\nQue você possa ver through its eyes and hear through its ears as if you were in its space. On your turn as a ação bônus, you can switch from using its senses to using your own, or back again. While you are using its senses, you are cego and ensurdecido in regard to your own surrodadaings.\n\nPhysical interação with the image reveals it to be an illusion, because things can pass through it. A criatura that uses its ação to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your CD de resistência de magia. If a criatura discerns the illusion for what it is, the criatura can see through the image, and any noise it makes sounds hollow to the criatura."
  },
  {
    "name": "Mudança Planar",
    "level": 7,
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You and up to eight criaturas voluntárias who link hands in a circle are transported to a different plane of existence. You can specify a alvo destination in general terms, such as the City of Brass on the Elemental Plane of Fire or the palace of Dispater on the second level of the Nine Hells, and you appear in or near that destination. If you are trying to reach the City of Brass, for example, you might arrive in is Street of Steel, before its Gate of Ashes, or looking at the city from across the Sea of Fire, at the DM's discretion.\n\nAlternatively, if you know the sigil sequence of a teleportation circle on another plane of existence, this spell can take you to that circle. If the teleportation circle is too small to hold all the criaturas you transported, they appear in the closest unoccupied spaces next to the circle.\n\nYou can use this spell to banish an uncriatura voluntária to another plane.  Chose a criatura within your reach and make a ataque de magia corpo a corpo against it. No sucesso, the criatura must make a Teste de resistência de Carisma. If the criatura fails this save, it is transported to a random location on the plane of existence you specify. A criatura so transported must find its own way back to your current plane of existence."
  },
  {
    "name": "Regenerar",
    "level": 7,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "1 minute",
    "range": "Toque",
    "duration": "1 hora",
    "description": "You touch a criatura and stimulate its natural healing ability. The alvo regains 4d8 + 15 pontos de vida. For the duration of the spell, the alvo regains 1 ponto de vida at the start of each of its turns (10 pontos de vida each minuto).\n\nThe alvo's severed body members (fingers, legs, tails, and so on), if any, are restored after 2 minutos. If you have the severed part and hold it to the stump, the spell Instantâneoly causes the limb to knit to the stump."
  },
  {
    "name": "Ressurreição",
    "level": 7,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "school": "Necromancia",
    "castingTime": "1 hour",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You touch a dead criatura that has been dead for no more than a century, that didn't die of old age, and that isn't mortos-vivos. If its soul is free and willing, the alvo returns to life with all its pontos de vida.\n\nThis spell neutralizes any poisons and cures normal diseases afflicting the criatura when it died. It doesn't however, remove magical diseases, curses, and the like; if such effects aren't removed prior to casting the spell, the afflict the alvo on its return to life.\n\nThis spell closes all mortal wounds and restores any falhaing body parts.\n\nComing back from the dead is an ordeal. The alvo takes a -4 penalty to all jogada de ataques, testes de resistência, and teste de habilidades. Every time the alvo finishes a descanso longo, the penalty is reduced by 1 until it disappears.\n\nCasting this spell to restore life to a criatura that has been dead for one year or longer taxes you greatly. Until you finish a descanso longo, you can't cast spells again, and you have desvantagem on all jogada de ataques, teste de habilidades, and testes de resistência."
  },
  {
    "name": "Inverter a Gravidade",
    "level": 7,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "30 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "This spell reverses gravity in a 50-foot-radius, 100-foot high cylinder centered on a point dentro do alcance. All criaturas and objects that aren't somehow anchored to the grodada in the area fall upward and reach the top of the area Quando você conjura essa magia. A criatura can make a Teste de resistência de Destreza to grab onto a fixed object it can reach, thus avoiding the fall.\n\nIf some solid object (such as a ceiling) is encountered in this fall, falling objects and criatura strike it just as they would during a normal downward fall. If an object or criatura reaches the top of the area without striking anything, it remains there, oscillating slightly, for the duration.\n\nAt the end of the duration, affected objects and criaturas fall back down."
  },
  {
    "name": "Sequestrar",
    "level": 7,
    "classes": [
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Até ser dissipada",
    "description": "By means of this spell, a criatura voluntária or an object can be hidden away, safe from detection for the duration. When você conjura a magia and touch the alvo, it becomes invisível and can't be alvoed by divination spells or perceived through scrying sensors created by divination spells.\n\nIf the alvo is a criatura, it falls into a state of suspended animation. Time ceases to flow for it, and it doesn't grow older.\n\nYou can set a condition for the spell to end early. The condition can be anything you choose, but it must occur or be visible within 1,5 quilômetro of the alvo.  Examples include after 1,000 years or when the tarrasque awakens. This spell also ends if the alvo takes any damage."
  },
  {
    "name": "Simulacro",
    "level": 7,
    "classes": [
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "12 hours",
    "range": "Toque",
    "duration": "Até ser dissipada",
    "description": "You shape an illusory duplicate of one besta or humanoide that is dentro do alcance for the entire casting time of the spell. The duplicate is a criatura, partially real and formed from ice or snow, and it can take ações and otherwise be affected as a normal criatura. It appears to be the same as the original, but it has half the criatura's ponto de vida maximum and is formed without any equipment. Otherwise, the illusion uses all the statistics of the criatura it duplicates.\n\nThe simulacrum is friendly to you and criaturas you designate. It obeys your spoken commands, moving and acting in accordance with your wishes and acting on your turn in combat. The simulacrum lacks the ability to learn or become more powerful, so it never increases its level or other abilities, nor can it regain expended espaços de magia.\n\nIf the simulacrum is damaged, you can repair it in an alchemical laboratory, using rare herbs and minerals worth 100gp per ponto de vida it regains. The simulacrum lasts until it drops to 0 pontos de vida, at which point it reverts to snow and melts instantly.\n\nIf you cast this spell again, any currently active duplicates Você criad with this spell are instantly destroyed."
  },
  {
    "name": "Símbolo",
    "level": 7,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 minute",
    "range": "Toque",
    "duration": "Até ser dissipada ou acionada",
    "description": "Quando você conjura essa magia, you inscribe a harmful glyph either on a surface (such as a section of floor, a wall, or a table) or within an object that can be closed to conceal the glyph (such as a book, a scroll, or a treasure chest). If you choose a surface, the glyph can cover an area of the surface no larger than 3 metros in diameter. If you choose an object, that object must remain in its place; if the object is moved more than 3 metros from where you cast this spell, the glyph is broken, and the magia termina without being triggered. \n\n The glyph is nearly invisível, requiring an Intelligence (Investigation) check against your CD de resistência de magia to find it. \n\n You decide what triggers the glyph when você conjura a magia. For glyphs inscribed on a surface, the most typical triggers include touching or stepping on the glyph, removing another object covering it, approaching within a certain distance of it, or manipulating the object that holds it. For glyphs inscribed within an object, the most common triggers are opening the object, approaching within a certain distance of it, or seeing or reading the glyph. \n\n You can further refine the trigger so the spell is activated only under certain circumstances or according to a criatura's physical characteristics (such as height or weight), or physical kind (for example, the ward could be set to affect hags or shapechangers). You can also specify criaturas that don't trigger the glyph, such as those who say a certain password. \n\n When you inscribe the glyph, escolha uma of the options below for its effect. Once triggered, the glyph glows, filling a 18 metros-radius sphere with dim light for 10 minutos, after which time the magia termina. Each criatura in the sphere when the glyph activates is alvoed by its effect, as is a criatura that enters the sphere for the first time on a turn or ends its turn there. \n\nDeath: Each alvo must make a Teste de resistência de Constituição, taking 10d10 dano necrótico em um teste de resistência falho, or metade do dano em um teste de resistência bem-sucedido. \n\nDiscord: Each alvo must make a Teste de resistência de Constituição. Em um teste de resistência falho, a alvo bickers and argues with other criaturas for 1 minuto. During this time, it is incapable of meaningful communication and has desvantagem on jogada de ataques and teste de habilidades. \n\nFear: Each alvo must make a Teste de resistência de Sabedoria and becomes amedrontado for 1 minuto em um teste de resistência falho. While amedrontado, the alvo drops whatever it is holding and must move at least 9 metros away from the glyph on each of its turns, if able. \n\nHopelessness: Each alvo must make a Teste de resistência de Carisma. Em um teste de resistência falho, the alvo is overwhelmed with despair for 1 minuto. During this time, it can't attack or alvo any criatura with harmful abilities, spells, or other magical effects. \n\nInsanity: Each alvo must make an Teste de resistência de Inteligência. Em um teste de resistência falho, the alvo is driven insane for 1 minuto. An insane criatura can't take ações, can't understand what other criaturas say, can't read, and speaks only in gibberish. The GM controls its movimento, which is erratic. \n\nPain: Each alvo must make a Teste de resistência de Constituição and becomes incapacitado with excruciating pain for 1 minuto em um teste de resistência falho. \n\nSleep: Each alvo must make a Teste de resistência de Sabedoria and falls inconsciente for 10 minutos em um teste de resistência falho. A criatura awakens if it takes damage or if someone uses an ação to shake or slap it awake. \n\nStunning: Each alvo must make a Teste de resistência de Sabedoria and becomes atordoado for 1 minuto em um teste de resistência falho."
  },
  {
    "name": "Teletransporte",
    "level": 7,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "Instantâneo",
    "description": "This spell instantly transports you and up to eight criaturas voluntárias of your choice that que você possa ver dentro do alcance, or a single object that que você possa ver dentro do alcance, to a destination you select. If you alvo an object, it must be able to fit entirely inside a cubo de 3 metros, and it can't be held or carried by an uncriatura voluntária. \n\n The destination you choose must be known to you, and it must be on the same plane of existence as you. Your familiarity with the destination determines whether you arrive there successfully. The GM rolls d100 and consults the table. FamiliarityMishapSimilar AreaOff AlvoOn AlvoPermanent circle---01-100Associated object---01-100Very familiar01-0506-1314-2425-100Seen casually01-3334-4344-5354-100Viewed once01-4344-5354-7374-100Description01-4344-5354-7374-100False destination01-5051-100--Familiarity: Permanent circle means a permanent teleportation circle whose sigil sequence you know.\n Associated object means that you possess an object taken from the desired destination within the last six months, such as a book from a wizard's library, bed linen from a royal suite, or a chunk of marble from a lich's secret tomb. \n Very familiar is a place you have been very often, a place you have carefully studied, or a place que você possa ver when você conjura a magia.\nSeen casually is someplace you have seen more than once but with which you aren't very familiar.\nViewed once is a place you have seen once, possibly using magic.\nDescription is a place whose location and appearance you know through someone else's description, perhaps from a map.\nFalse destination is a place that doesn't exist. Perhaps you tried to scry an enemy's sanctum but instead viewed an illusion, or you are attempting to teleport to a familiar location that no longer exists. \n\nOn Alvo: You and your group (or the alvo object) appear where you want to. \n\nOff Alvo: You and your group (or the alvo object) appear a random distance away from the destination in a random direction. Distance off alvo is 1d10 × 1d10 percent of the distance that was to be traveled. For example, if you tried to travel 120 miles, landed off alvo, and rolled a 5 and 3 on the two d10s, then you would be off alvo by 15 percent, or 18 miles. The GM determines the direction off alvo randomly by rolling a d8 and designating 1 as north, 2 as northeast, 3 as east, and so on arodada the points of the compass. If you were teleporting to a coastal city and wound up 18 miles out at sea, you could be in trouble. \n\nSimilar Area: You and your group (or the alvo object) wind up in a different area that's visually or thematically similar to the alvo area. If you are heading for your home laboratory, for example, you might wind up in another wizard's laboratory or in an alchemical supply shop that has many of the same tools and implements as your laboratory. Generally, you appear in the closest similar place, but since the spell has no range limit, you could conceivably wind up anywhere on the plane. \n\nMishap: The spell's unpredictable magic results in a difficult journey. Each teleporting criatura (or the alvo object) takes 3d10 dano de força, and the GM rerolls on the table to see where you wind up (multiple mishaps can occur, dealing damage each time)."
  },
  {
    "name": "Sugestão",
    "level": 2,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 8 hours",
    "description": "You suggest a course of activity (limited to a sentence or two) and magically influence a criatura que você possa ver dentro do alcance that can hear and understand you. Criaturas that can't be enfeitiçado are immune to this effect. The suggestion must be worded in such a manner as to make the course of ação sound reasonable. Asking the criatura to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act ends the spell.\n\nThe alvo must make a Teste de resistência de Sabedoria. Em um teste de resistência falho, it pursues the course of ação you described to the best of its ability. The suggested course of ação can continue for the entire duration. If the suggested activity can be completed in a shorter time, the magia termina when the subject finishes what it was asked to do.\n\nYou can also specify conditions that will trigger a special activity during the duration. For example, you might suggest that a knight give her warhorse to the first beggar she meets. If the condition isn't met before the spell expires, the activity isn't performed.\n\nIf you or any of your companions damage the alvo, the magia termina."
  },
  {
    "name": "Invisibilidade",
    "level": 2,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 hour",
    "description": "A criatura you touch becomes invisível até a magia terminar. Anything the alvo is wearing or carrying is invisível as long as it is on the alvo's person. The magia termina for a alvo that attacks or casts a spell."
  },
  {
    "name": "Animar Objetos",
    "level": 5,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Objects come to life at your command. Escolha até ten nonmagical objects dentro do alcance that are not being worn or carried. Medium alvos count as two objects, Large alvos count as four objects, Huge alvos count as eight objects. You can't animate any object larger than Huge. Each alvo animates and becomes a criatura under your control até a magia terminar or until reduced to 0 pontos de vida.\n\nAs a ação bônus, you can mentally command any criatura you made with this spell if the criatura is within 500 feet of you (if you control multiple criaturas, you can command any or all of them at the same time, issuing the same command to each one). You decide what ação the criatura will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the criatura only defends itself against hostile criaturas. Once given an order, the criatura continues to follow it until its task is complete. SizeHPACStrDexAttackTiny2018418+8 to sucesso, 1d4 + 4 damageSmall2516614+6 to sucesso, 1d8 + 2 damageMedium40131012+5 to sucesso, 2d6 + 1 damageLarge50101410+6 to sucesso, 2d10 + 2 damageHuge8010186+8 to sucesso, 2d12 + 4 damage An animated object is a constructo with AC, pontos de vida, attacks, Strength, and Dexterity determined by its size. Its Constitution is 10 and its Intelligence and Wisdom are 3, and its Charisma is 1. Its velocidade is 9 metros; if the object lacks legs or other appendages it can use for locomotion, it instead has a flying velocidade of 9 metros and can hover. If the object is securely attached to a surface or a larger object, such as a chain bolted to a wall, its velocidade is 0. It has blindsight with a radius of 9 metros and is blind beyond that distance. When the animated object drops to 0 pontos de vida, it reverts to its original object form, and any remaining damage carries over to its original object form.\n\nIf you command an object to attack, it can make a single melee attack against a criatura a até 1,5 metro of it. It makes a slam attack with an attack bonus and dano de concussão determined by its size. The DM might rule that a specific object inflicts slashing or dano perfurante based on its form."
  },
  {
    "name": "Escudo Anticriaturas Vivas",
    "level": 5,
    "classes": [
      "Druida"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Self (10-foot radius)",
    "duration": "Concentração, up to 1 hour",
    "description": "A shimmering barrier extends out from you in a raio de 3 metros and moves with you, remaining centered on you and hedging out criaturas other than mortos-vivos and constructoos. The barrier lasts for the duration.\n\nThe barrier prevents an affected criatura from passing or reaching through. An affected criatura can cast spells or make attacks with ranged or reach weapons through the barrier.\n\nIf you move so an affected criatura is forced to pass through the barrier, the magia termina."
  },
  {
    "name": "Portal Arcano",
    "level": 6,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "150 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Você cria linked teleportation portals that remain open for the duration. Escolha duas points on the grodada that que você possa ver, one point a até 3 metros of you and one point within 500 feet of you. A circular portal, 3 metros in diameter, opens over each point. If the portal would open in the space occupied by a criatura, the spell fails, and the casting is lost.\n\nThe portals are two-dimensional glowing rings filled with mist, hovering inches from the grodada and perpendicular to it at the points you choose. A ring is visible only from one side (your choice), which is the side that functions as a portal.\n\nAny criatura or object entering the portal exits from the other portal as if the two were adjacent to each other; passing through a portal from the nonportal side has no effect. The mist that fills each portal is opaque and blocks vision through it. On your turn, you can rotate the rings as a ação bônus so that the active side faces in a different direction."
  },
  {
    "name": "Despertar",
    "level": 5,
    "classes": [
      "Bardo",
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "8 hours",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "After spending the casting time tracing magical pathways within a precious gemstone, you touch a Huge or smaller besta or planta. The alvo must have either no Intelligence score or an Intelligence of 3 or less. The alvo gains an Intelligence of 10. The alvo also gains the ability to speak one language you know. If the alvo is a planta, it gains the ability to move its limbs, roots, vines, creepers, and so forth, and it gains senses similar to a human's. Your DM chooses statistics appropriate for the awakened planta, such as the statistics for the awakened shrub or the awakened tree.\n\nThe awakened besta or planta is enfeitiçado by you for 30 days or until you or your companions do anything harmful to it. When the enfeitiçado condition ends, the awakened criatura chooses whether to remain friendly to you, based on how you treated it while it was enfeitiçado."
  },
  {
    "name": "Golpe do Banimento",
    "level": 5,
    "classes": [
      "Paladino"
    ],
    "school": "Abjuração",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "The next time you sucesso a criatura with a weapon attack before this magia termina, your weapon crackles with force, and the attack deals an extra 5d10 dano de força to the alvo. Additionally, if this attack reduces the alvo to 50 pontos de vida or fewer, you banish it. If the alvo is native to a different plane of existence than the one you're on, the alvo disappears, returning to its home plane. If the alvo is native to the plane you're on, the criatura vanishes into a harmless demiplane. While there, the alvo is incapacitado. It remains there até a magia terminar, at which point the alvo reappears in the space it left or in the nearest unoccupied space if that space is occupied."
  },
  {
    "name": "Relâmpago em Cadeia",
    "level": 6,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantâneo",
    "description": "Você cria a bolt of lightning that arcs toward a alvo of your choice that que você possa ver dentro do alcance. Three bolts then leap from that alvo to as many as three other alvos, each of which must be a até 9 metros of the first alvo. A alvo can be a criatura or an object and can be alvoed by only one of the bolts.\n\nA alvo must make a Teste de resistência de Destreza. The alvo takes 10d8 dano de raio em um teste de resistência falho, or metade do dano on a successful one."
  },
  {
    "name": "Barreira de Lâminas",
    "level": 6,
    "classes": [
      "Clérigo"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Você cria a vertical wall of whirling, razor-sharp blades made of magical energy. The wall appears dentro do alcance and lasts for the duration. You can make a straight wall up to 100 feet long, 20 feet high, and 1,5 metro thick, or a ringed wall up to 18 metros in diameter, 20 feet high, and 1,5 metro thick. The wall provides three-quarters cover to criaturas behind it, and its space is difficult terrain.\n\nWhen a criatura enters the wall's area for the first time on a turn or starts its turn there, the criatura must make a Teste de resistência de Destreza. Em um teste de resistência falho, the criatura takes 6d10 dano cortante. Em um teste de resistência bem-sucedido, the criatura takes metade do dano."
  },
  {
    "name": "Círculo da Morte",
    "level": 6,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantâneo",
    "description": "A sphere of negative energy ripples out in a 18 metros- radius sphere from a point dentro do alcance. Each criatura in that area must make a Teste de resistência de Constituição. A alvo takes 8d6 dano necrótico em um teste de resistência falho, or metade do dano on a successful one."
  },
  {
    "name": "Círculo de Poder",
    "level": 5,
    "classes": [
      "Paladino"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Self (30-foot radius)",
    "duration": "Concentração, up to 10 minutes",
    "description": "Divine energy radiates from you, distorting and diffusing magical energy a até 9 metros of you. Até a magia terminar, the sphere moves with you, centered on you. For the duration, each friendly criatura in the area (including you) has vantagem on testes de resistência against spells and other magical effects. Additionally, when an affected criatura succeeds on a teste de resistência made against a spell or magical effect that allows it to make a teste de resistência to take only half damage, it instead takes no damage if it succeeds on the teste de resistência."
  },
  {
    "name": "Matar na Nuvem",
    "level": 5,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Você cria a 20-foot-radius sphere of poisonous, yellow-green fog centered on a point you choose dentro do alcance. The fog spreads arodada corners. It lasts for the duration or until strong wind disperses the fog, ending the spell. Its area is heavily obscured.\n\nWhen a criatura enters the spell's area for the first time on a turn or starts its turn there, that criatura must make a Teste de resistência de Constituição. The criatura takes 5d8 dano de veneno em um teste de resistência falho, or metade do dano on a successful one. Criaturas are affected even if they hold their breath or don't need to breathe.\n\nThe fog moves 3 metros away from you at the start of each of your turns, rolling along the surface of the grodada. The vapors, being heavier than air, sink to the lowest level of the land, even pouring down openings."
  },
  {
    "name": "Comungar com a Natureza",
    "level": 5,
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "school": "Adivinhação",
    "castingTime": "1 minute",
    "range": "Si mesmo",
    "duration": "Instantâneo",
    "description": "You briefly become one with nature and gain knowledge of the surrodadaing territory. In the outdoors, the spell gives you knowledge of the land within 3 miles of you. In caves and other natural undergrodada settings, the radius is limited to 300 feet. The spell doesn't function where nature has been replaced by constructoion, such as in dungeons and towns. terrain and bodies of waterprevalent plantaas, minerals, animals, or peoplespowerful celestiais, feérico, inimigos, elementais, or mortos-vivosinfluence from other planes of existencebuildings For example, you could determine the location of powerful mortos-vivos in the area, the location of major sources of safe drinking water, and the location of any nearby towns."
  },
  {
    "name": "Comungar",
    "level": 5,
    "classes": [
      "Clérigo"
    ],
    "school": "Adivinhação",
    "castingTime": "1 minute",
    "range": "Si mesmo",
    "duration": "1 minuto",
    "description": "You contact your deity or a divine proxy and ask up to three questions that can be answered with a yes or no. You must ask your questions before the magia termina. You receive a correct answer for each question.\n\nDivine beings aren't necessarily omniscient, so you might receive unclear as an answer if a question pertains to information that lies beyond the deity's knowledge. In a case where a one-word answer could be misleading or contrary to the deity's interests, the DM might offer a short phrase as an answer instead.\n\nIf você conjura a magia two or more times before finishing your next descanso longo, there is a cumulative 25 percent chance for each casting after the first that you get no answer. The DM makes this roll in secret."
  },
  {
    "name": "Cone de Frio",
    "level": 5,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Self (60-foot cone)",
    "duration": "Instantâneo",
    "description": "A blast of cold air erupts from your hands. Each criatura in a 18 metros cone must make a Teste de resistência de Constituição. A criatura takes 8d8 dano de frio em um teste de resistência falho, or metade do dano on a successful one.\n\nA criatura killed by this spell becomes a frozen statue until it thaws."
  },
  {
    "name": "Convocar Elemental",
    "level": 5,
    "classes": [
      "Druida",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 minute",
    "range": "27 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "You call forth an elemental servant. Choose an area of air, earth, fire, or water that fills a cubo de 3 metros dentro do alcance. An elemental of challenge rating 5 or lower appropriate to the area you chose appears in an unoccupied space a até 3 metros of it. For example, a fire elemental emerges from a bonfire, and an earth elemental rises up from the grodada. The elemental disappears when it drops to 0 pontos de vida or when the magia termina.\n\nThe elemental is friendly to you and your companions for the duration. Roll initiative for the elemental, which has its own turns. It obeys any verbal commands that you issue to it (no ação required by you). If you don't issue any commands to the elemental, it defends itself from hostile criaturas but otherwise takes no ações.\n\nIf your concentração is broken, the elemental doesn't disappear. Instead, you lose control of the elemental, it becomes hostile toward you and your companions, and it might attack. An uncontrolled elemental can't be disfalhaed by you, and it disappears 1 hora after Você convocaed it.\n\nThe DM has the elemental's statistics."
  },
  {
    "name": "Convocar o Feérico",
    "level": 6,
    "classes": [
      "Druida",
      "Bruxo"
    ],
    "school": "Conjuração",
    "castingTime": "1 minute",
    "range": "27 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "Você convoca a feérico criatura of challenge rating 6 or lower, or a feérico spirit that takes the form of a besta of challenge rating 6 or lower. It appears in an unoccupied space that que você possa ver dentro do alcance. The feérico criatura disappears when it drops to 0 pontos de vida or when the magia termina.\n\nThe feérico criatura is friendly to you and your companions for the duration. Roll initiative for the criatura, which has its own turns. It obeys any verbal commands that you issue to it (no ação required by you), as long as they don't violate its alignment. If you don't issue any commands to the feérico criatura, it defends itself from hostile criaturas but otherwise takes no ações.\n\nIf your concentração is broken, the feérico criatura doesn't disappear. Instead, you lose control of the feérico criatura, it becom es hostile toward you and your companions, and it might attack. An uncontrolled feérico criatura can't be disfalhaed by you, and it disappears 1 hora after Você convocaed it.\n\nThe DM has the feérico criatura's statistics."
  },
  {
    "name": "Convocar Salva",
    "level": 5,
    "classes": [
      "Patrulheiro"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantâneo",
    "description": "You fire a piece of nonmagical ammunition from a ranged weapon or throw a nonmagical weapon into the air and choose a point dentro do alcance. Hundreds of duplicates of the ammunition or weapon fall in a volley from above and then disappear. Each criatura in a 40-foot-radius, 20-foot-high cylinder centered on that point must make a Teste de resistência de Destreza. A criatura takes 8d8 damage em um teste de resistência falho, or metade do dano on a successful one. The damage type is the same as that of the ammunition or weapon."
  },
  {
    "name": "Contatar Outro Plano",
    "level": 5,
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 minute",
    "range": "Si mesmo",
    "duration": "1 minuto",
    "description": "You mentally contact a demigod, the spirit of a long-dead sage, or some other mysterious entity from another plane. Contacting this extraplanar intelligence can strain or even break your mind. Quando você conjura essa magia, make a DC 15 Teste de resistência de Inteligência. On a failure, you take 6d6 dano psíquico and are insane until you finish a descanso longo. While insane, you can't take ações, can't understand what other criaturas say, can't read, and speak only in gibberish. A greater restoration spell cast on you ends this effect.\n\nEm um teste de resistência bem-sucedido, you can ask the entity up to five questions. You must ask your questions before the magia termina. The DM answers each question with one word, such as yes, no, maybe, never, irrelevant, or unclear (if the entity doesn't know the answer to the question). If a one-word answer would be misleading, the DM might instead offer a short phrase as an answer."
  },
  {
    "name": "Contágio",
    "level": 5,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "7 dias",
    "description": "Your touch inflicts disease. Make a ataque de magia corpo a corpo against a criatura within your reach. No sucesso, the alvo is envenenado. \n\n At the end of each of the envenenado alvo’s turns, the alvo must make a Teste de resistência de Constituição. If the alvo succeeds on three of these saves, it is no longer envenenado, and the magia termina. If the alvo fails three of these saves, the alvo is no longer envenenado, but escolha uma of the diseases below. The alvo is subjected to the chosen disease for the spell’s duration. \n\n Since this spell induces a natural disease in its alvo, any effect that removes a disease or otherwise ameliorates a disease’s effects apply to it. \n\nBlinding Sickness: Pain grips the criatura’s mind, and its eyes turn milky wsucessoe. The criatura has desvantagem on Wisdom checks and Teste de resistência de Sabedorias and is cego. \n\nFilth Fever: A raging fever sweeps through the criatura’s body. The criatura has desvantagem on Strength checks, Teste de resistência de Forças, and jogada de ataques that use Strength. \n\nFlesh Rot: The criatura’s flesh decays. The criatura has desvantagem on Charisma checks and vulnerability to all damage. \n\nMindfire: The criatura’s mind becomes feverish. The criatura has desvantagem on Intelligence checks and Teste de resistência de Inteligências, and the criatura behaves as if under the effects of the confusion spell during combat. \n\nSeizure: The criatura is overcome with shaking. The criatura has desvantagem on Dexterity checks, Teste de resistência de Destrezas, and jogada de ataques that use Dexterity. \n\nSlimy Doom: The criatura begins to bleed uncontrollably. The criatura has desvantagem on Constitution checks and Teste de resistência de Constituiçãos. In addition, whenever the criatura takes damage, it is atordoado until the end of its next turn."
  },
  {
    "name": "Contingência",
    "level": 6,
    "classes": [
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "10 minutes",
    "range": "Si mesmo",
    "duration": "10 dias",
    "description": "Choose a spell of 5th level or lower that you can cast, that has a casting time of 1 ação, and that can alvo you. You cast that spell--called the contingent spell--as part of casting contingency, expending espaços de magia for both, but the contingent spell doesn't come into effect. Instead, it takes effect when a certain circumstance occurs. You describe that circumstance when you cast the two spells. For example, a contingency cast with water breathing (lvl 3) might stipulate that water breathing comes into effect when you are engulfed in water or a similar liquid.\n\nThe contingent spell takes effect immediately after the circumstance is met for the first time, whether or not you want it to. And then contingency ends.\n\nThe contingent spell takes effect only on you, even if it can normally alvo others. You can use only one contingency spell at a time. If you cast this spell again, the effect of another contingency spell on you ends. Also, contingency ends on you if its material component is ever not on your person."
  },
  {
    "name": "Criar Morto-Vivo",
    "level": 6,
    "classes": [
      "Clérigo",
      "Bruxo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 minute",
    "range": "3 metros",
    "duration": "Instantâneo",
    "description": "You can cast this spell only at night. Escolha até three corpses of Medium or Small humanoidees dentro do alcance. Each corpse becomes a ghoul under your control. (The DM has game statistics for these criaturas.)\n\nAs a ação bônus on each of your turns, you can mentally command any criatura you animated with this spell if the criatura is within 36 metros of you (if you control multiple criaturas, you can command any or all of them at the same time, issuing the same command to each one). You decide what ação the criatura will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you issue no commands, the criatura only defends itself against hostile criaturas. Once given an order, the criatura continues to follow it until its task is complete.\n\nThe criatura is under your control for 24 horas, after which it stops obeying any command you have given it. To maintain control of the criatura for another 24 horas, you must cast this spell on the criatura before the current 24-hora period ends. This use of the spell reasserts your control over up to three criaturas you have animated with this spell, rather than animating new ones."
  },
  {
    "name": "Chama Contínua",
    "level": 2,
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Até ser dissipada",
    "description": "A flame, equivalent in brightness to a torch, springs forth from an object that you touch. The effect looks like a regular flame, but it creates no heat and doesn't use oxygen. A continual flame can be covered or hidden but not smothered or quenched."
  },
  {
    "name": "Criação",
    "level": 5,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 minute",
    "range": "9 metros",
    "duration": "Especial",
    "description": "You pull wisps of shadow material from the Shadowfell to create a nonliving object of vegetable matter dentro do alcance: soft goods, rope, wood, or something similar. You can also use this spell to create mineral objects such as stone, crystal, or metal. The object created must be no larger than a 1,5 metro cube, and the object must be of a form and material that you have seen before.\n\nThe duration depends on the object's material. If the object is composed of multiple materials, use the shortest duration. MaterialDurationVegetable matter1 day&nbsp;Stone or crystal12 horas&nbsp;Precious metals1 hora&nbsp;Gems10 minutos&nbsp;Adamantine or mithral1 minuto&nbsp; Using any material created by this spell as another spell's material component causes that spell to fail."
  },
  {
    "name": "Onda Destrutiva",
    "level": 5,
    "classes": [
      "Paladino"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Self (30-foot radius)",
    "duration": "Instantâneo",
    "description": "You strike the grodada, creating a burst of divine energy that ripples outward from you. Each criatura you choose a até 9 metros of you must succeed on a Teste de resistência de Constituição or take 5d6 dano sônico, as well as 5d6 radiant or dano necrótico (your choice), and be knocked caído. A criatura that succeeds on its teste de resistência takes metade do dano and isn't knocked caído."
  },
  {
    "name": "Desintegrar",
    "level": 6,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "A thin green ray springs from your pointing finger to a alvo that que você possa ver dentro do alcance. The alvo can be a criatura, an object, or a creation of magical force, such as the wall created by wall of force (lvl 5).\n\nA criatura alvoed by this spell must make a Teste de resistência de Destreza. Em um teste de resistência falho, the alvo takes 10d6 + 40 dano de força. If this damage reduces the alvo to 0 pontos de vida, it is disintegrated.\n\nA disintegrated criatura and everything it is wearing and carrying, except magic items, are reduced to a pile of fine gray dust. The criatura can be restored to life only by means of a true resurrection (lvl 9) or a wish (lvl 9) spell.\n\nThis spell automatically disintegrates a Large or smaller nonmagical object or a creation of magical force. If the alvo is a Huge or larger object or creation of force, this spell disintegrates a 3 metros-cube portion of it. A magic item is unaffected by this spell."
  },
  {
    "name": "Adivinhação",
    "level": 4,
    "classes": [
      "Clérigo"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Instantâneo",
    "description": "Your magic and an offering put you in contact with a god or a god's servants. You ask a single question concerning a specific goal, event, or activity to occur within 7 dias. The DM offers a truthful reply. The reply might be a short phrase, a cryptic rhyme, or an omen.\n\nThe spell doesn't take into account any possible circumstances that might change the outcome, such as the casting of additional spells or the loss or gain of a companion.\n\nIf you cast this spell two or more times before finishing your next descanso longo, there is a cumulative 25 percent chance for each casting after the first that you get a random reading. The DM makes this roll in secret."
  },
  {
    "name": "Dissipar o Bem e o Mal",
    "level": 5,
    "classes": [
      "Clérigo",
      "Paladino"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "Shimmering energy surrodadas and protects you from feérico, mortos-vivos, and criaturas originating from beyond the Material Plane. For the duration, celestiais, elementais, feérico, inimigos, and mortos-vivos have desvantagem on jogada de ataques against you.\n\nYou can end the spell early by using either of the following special functions. \n\nBreak Enchantment: As your ação, you touch a criatura you can reach that is enfeitiçado, amedrontado, or possessed by a celestial, an elemental, a feérico, a inimigo, or an mortos-vivos. The criatura you touch is no longer enfeitiçado, amedrontado, or possessed by such criaturas. \n\nDisfalhaal: As your ação, make a ataque de magia corpo a corpo against a celestial, an elemental, a feérico, a inimigo, or an mortos-vivos you can reach. No sucesso, you attempt to drive the criatura back to its home plane. The criatura must succeed on a Teste de resistência de Carisma or be sent back to its home plane (if it isn't there already). If they aren't on their home plane, mortos-vivos are sent to the Shadowfell, and feérico are sent to the Feéricowild."
  },
  {
    "name": "Dominar Besta",
    "level": 4,
    "classes": [
      "Druida",
      "Feiticeiro"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You attempt to beguile a besta that que você possa ver dentro do alcance. It must succeed on a Teste de resistência de Sabedoria or be enfeitiçado by you for the duration. If you or criaturas that are friendly to you are fighting it, it has vantagem on the teste de resistência.\n\nWhile the besta is enfeitiçado, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the criatura while you are conscious (no ação required), which it does its best to obey. You can specify a simple and general course of ação, such as Attack that criatura, Run over there, or Fetch that object. If the criatura completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability.\n\nYou can use your ação to take total and precise control of the alvo. Until the end of your next turn, the criatura takes only the ações you choose, and doesn't do anything that you don't allow it to do. During this time, you can also cause the criatura to use a reação, but this requires you to use your own reação as well. Each time the alvo takes damage, it makes a new Teste de resistência de Sabedoria against the spell. If the teste de resistência succeeds, the magia termina."
  },
  {
    "name": "Dominar Pessoa",
    "level": 5,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You attempt to beguile a humanoide that que você possa ver dentro do alcance. It must succeed on a Teste de resistência de Sabedoria or be enfeitiçado by you for the duration. If you or criaturas that are friendly to you are fighting it, it has vantagem on the teste de resistência.\n\nWhile the alvo is enfeitiçado, you have a telepathic link with it as long as the two of you are on the same plane of existence. You can use this telepathic link to issue commands to the criatura while you are conscious (no ação required), which it does its best to obey. You can specify a simple and general course of ação, such as Attack that criatura, Run over there, or Fetch that object. If the criatura completes the order and doesn't receive further direction from you, it defends and preserves itself to the best of its ability.\n\nYou can use your ação to take total and precise control of the alvo. Until the end of your next turn, the criatura takes only the ações you choose, and doesn't do anything that you don't allow it to do. During this time you can also cause the criatura to use a reação, but this requires you to use your own reação as well. Each time the alvo takes damage, it makes a new Teste de resistência de Sabedoria against the spell. If the teste de resistência succeeds, the magia termina."
  },
  {
    "name": "Sonho",
    "level": 5,
    "classes": [
      "Bardo",
      "Bruxo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 minute",
    "range": "Special",
    "duration": "8 horas",
    "description": "This spell shapes a criatura's dreams. Choose a criatura known to you as the alvo of this spell. The alvo must be on the same plane of existence as you. Criaturas that don't sleep, such as elves, can't be contacted by this spell. You, or a criatura voluntária you touch, enters a trance state, acting as a messenger. While in the trance, the messenger is aware of his or her surrodadaings, but can't take ações or move.\n\nIf the alvo is asleep, the messenger appears in the alvo's dreams and can converse with the alvo as long as it remains asleep, through the duration of the spell. The messenger can also shape the environment of the dream, creating landscapes, objects, and other images. The messenger can emerge from the trance at any time, ending the effect of the spell early. The alvo recalls the dream perfectly upon waking. If the alvo is awake when você conjura a magia, the messenger knows it, and can either end the trance (and the spell) or wait for the alvo to fall asleep, at which point the messenger appears in the alvo's dreams.\n\nYou can make the messenger appear monstrous and terrifying to the alvo. If you do, the messenger can deliver a message of no more than ten words and then the alvo must make a Teste de resistência de Sabedoria. Em um teste de resistência falho, echoes of the phantasmal monstruosidade spawn a nightmare that lasts the duration of the alvo's sleep and prevents the alvo from gaining any benefit from that rest. In addition, when the alvo wakes up, it takes 3d6 dano psíquico.\n\nIf you have a body part, lock of hair, clipping from a nail, or similar portion of the alvo's body, the alvo makes its teste de resistência with desvantagem."
  },
  {
    "name": "Aprimorar Habilidade",
    "level": 2,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Feiticeiro"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 hour",
    "description": "You touch a criatura and bestow upon it a magical enhancement. Escolha uma of the following effects; the alvo gains that effect até a magia terminar. \n\nBear's Endurance: The alvo has vantagem on Constitution checks. It also gains 2d6 temporary pontos de vida, which are lost when the magia termina. \n\nBull's Strength: The alvo has vantagem on Strength checks, and his or her carrying capacity doubles. \n\nCat's Grace: The alvo has vantagem on Dexterity checks. It also doesn't take damage from falling 20 feet or less if it isn't incapacitado. \n\nEagle's Splendor: The alvo has vantagem on Charisma checks. \n\nFox's Cunning: The alvo has vantagem on Intelligence checks. \n\nOwl's Wisdom: The alvo has vantagem on Wisdom checks."
  },
  {
    "name": "Aumentar/Reduzir",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você causa a criatura or an object que você possa ver dentro do alcance to grow larger or smaller for the duration. Choose either a criatura or an object that is neither worn nor carried. If the alvo is unwilling, it can make a Teste de resistência de Constituição. On a success, the spell has no effect. \n\n If the alvo is a criatura, everything it is wearing and carrying changes size with it. Any item dropped by an affected criatura returns to normal size at once. \n\nEnlarge: The alvo's size doubles in all dimensions, and its weight is multiplied by eight. This growth increases its size by one category-- from Medium to Large, for example. If there isn't enough room for the alvo to double its size, the criatura or object attains the maximum possible size in the space available. Até a magia terminar, the alvo also has vantagem on Strength checks and Teste de resistência de Forças. The alvo's weapons also grow to match its new size. While these weapons are enlarged, the alvo's attacks with them deal 1d4 extra damage. \n\nReduce: The alvo's size is halved in all dimensions, and its weight is reduced to one-eighth of normal. This reduction decreases its size by one category--from Medium to Small, for example. Até a magia terminar, the alvo also has desvantagem on Strength checks and Teste de resistência de Forças. The alvo's weapons also shrink to match its new size. While these weapons are reduced, the alvo's attacks with them deal 1d4 less damage (this can't reduce the damage below 1)."
  },
  {
    "name": "Fascinar",
    "level": 2,
    "classes": [
      "Bardo",
      "Bruxo"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "1 minuto",
    "description": "You weave a distracting string of words, causing criaturas of your choice that que você possa ver dentro do alcance and that can hear you to make a Teste de resistência de Sabedoria. Any criatura that can't be enfeitiçado succeeds on this teste de resistência automatically, and if you or your companions are fighting a criatura, it has vantagem on the save. Em um teste de resistência falho, the alvo has desvantagem on Wisdom (Perception) checks made to perceive any criatura other than you até a magia terminar or until the alvo can no longer hear you. The magia termina if you are incapacitado or can no longer speak."
  },
  {
    "name": "Fabricar",
    "level": 4,
    "classes": [
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "10 minutes",
    "range": "36 metros",
    "duration": "Instantâneo",
    "description": "You convert raw materials into products of the same material. For example, you can fabricate a wooden bridge from a clump of trees, a rope from a patch of hemp, and clothes from flax or wool.\n\nChoose raw materials that que você possa ver dentro do alcance. You can fabricate a Large or smaller object (contained within a cubo de 3 metros, or eight connected 1,5 metro cubes), given a sufficient quantity of raw material. If you are working with metal, stone, or another mineral substance, however, the fabricated object can be no larger than Medium (contained within a single 1,5 metro cube). The quality of objects made by the spell is commensurate with the quality of the raw materials.\n\nCriaturas or magic items can't be created or transmuted by this spell. You also can't use it to create items that ordinarily require a high degree of craftsmanship, such as jewelry, weapons, glass, or armor, unless you have proficiency with the type of artisan's tools used to craft such objects."
  },
  {
    "name": "Mordida do Olhar",
    "level": 6,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "For the spell's duration, your eyes become an inky void imbued with dread power. One criatura of your choice a até 18 metros of you that que você possa ver must succeed on a Teste de resistência de Sabedoria or be affected by one of the following effects of your choice for the duration. On each of your turns até a magia terminar, you can use your ação to alvo another criatura but can't alvo a criatura again if it has succeeded on a teste de resistência against this casting of eyebite. \n\nAsleep: The alvo falls inconsciente. It wakes up if it takes any damage or if another criatura uses its ação to shake the sleeper awake. \n\nPanicked: The alvo is amedrontado of you. On each of its turns, the amedrontado criatura must take the Dash ação and move away from you by the safest and shortest available route, unless there is nowhere to move. If the alvo moves to a place at least 18 metros away from you where it can no longer see you, this effect ends. \n\nSickened: The alvo has desvantagem on jogada de ataques and teste de habilidades. At the end of each of its turns, it can make another Teste de resistência de Sabedoria. If it succeeds, the effect ends."
  },
  {
    "name": "Encontrar Corcel",
    "level": 2,
    "classes": [
      "Paladino"
    ],
    "school": "Conjuração",
    "castingTime": "10 minutes",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "Você convoca a spirit that assumes the form of an unusually intelligent, strong, and loyal steed, creating a long-lasting bond with it. Appearing in an unoccupied space dentro do alcance, the steed takes on a form that you choose, such as a warhorse, a pony, a camel, an elk, or a mastiff. (Your DM mught allow other animals to be summoned as steeds.) The steed has the statistics of the chosen form, though it is a celestial, feérico, or inimigo (your choice) instead of its normal type. Additionally, if your steed has an Intelligence of 5 or less, its Intelligence becomes 6, and it gains the ability to understand one language of your choice that you speak.\n\nYour steed serves you as a mount, both in combat and out, and you have an instinctive bond with it that allows you to fight as a seamless unit. While mounted on your steed, you can make any spell you cast that alvos only you also alvo your steed.\n\nWhen the steed drops to 0 pontos de vida, it disappears, leaving behind no physical form. You can also disfalha your steed at any time as an ação, causing it to disappear. In either case, casting this spell again summons the same steed, restored to its ponto de vida maximum.\n\nWhile your steed is within 1,5 quilômetro of you, you can communicate with it telepathically.\n\nYou can't have more than one steed bonded by this spell at a time. As an ação, you can release the steed from its bond at any time, causing it to disappear."
  },
  {
    "name": "Encontrar o Caminho",
    "level": 6,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "school": "Adivinhação",
    "castingTime": "1 minute",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 day",
    "description": "This spell allows you to find the shortest, most direct physical route to a specific fixed location that you are familiar with on the same plane of existence. If you name a destination on another plan of existence, a destination that moves (such as a mobile fortress), or a destination that isn't specific (such as a green dragão's lair), the spell fails.\n\nFor the duration, as long as you are on the same plane of existence as the destination, you know how far it is and in what direction it lies. While you are traveling there, whenever you are presented with a choice of paths along the way, you atomatically determine which path is the shortest and most direct route (but not necessarily the safest route) to the destination."
  },
  {
    "name": "Encontrar Armadilhas",
    "level": 2,
    "classes": [
      "Clérigo",
      "Druida",
      "Patrulheiro"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantâneo",
    "description": "You sense the presence of any trap dentro do alcance that is within line of sight. A trap, for the purpose of this spell, includes anything that would inflict a sudden or unexpected effect you consider harmful or undesirable, which was specifically intended as such by its creator. Thus, the spell would sense an area affected by the alarm (lvl 1) spell, a glyph of warding (lvl 3), or a mechanical pit trap, but it would not reveal a natural weakness in the floor, an unstable ceiling, or a hidden sinkhole.\n\nThis spell merely reveals that a trap is present. You don't learn the location of each trap, but you do learn the general nature of the danger posed by a trap you sense."
  },
  {
    "name": "Escudo de Fogo",
    "level": 4,
    "classes": [
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "10 minutos",
    "description": "Thin and wispy flames wreathe your body for the duration, shedding bright light in a raio de 3 metros and dim light for an additional 3 metros, You can end the spell early by using an ação to disfalha it.\n\nThe flames provide you with a warm shield or a chill shield, as you choose. The warm shield grants you resistance to dano de frio, and the chill shield grants you resistance to dano de fogo.\n\nIn addition, whenever a criatura a até 1,5 metro of you sucessos you with a melee attack, the shield erupts with flame. The attacker takes 2d8 dano de fogo from a warm shield, or 2d8 dano de frio from a cold shield."
  },
  {
    "name": "Flame Blade",
    "level": 2,
    "classes": [
      "Druida"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "You evoke a fiery blade in your free hand. The blade is similar in size and shape to a scimitar, and it lasts for the duration. If you let go of the blade, it disappears, but you can evoke the blade again as a ação bônus.\n\nYou can use your ação to make a ataque de magia corpo a corpo with the fiery blade. No sucesso, the alvo takes 3d6 dano de fogo.\n\nThe flaming blade sheds bright light in a raio de 3 metros and dim light for an additional 3 metros."
  },
  {
    "name": "Golpe de Chama",
    "level": 5,
    "classes": [
      "Clérigo"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "A vertical column of divine fire roars down from the heavens in a location you specify. Each criatura in a raio de 3 metros, 40-foot-high cylinder centered on a point dentro do alcance must make a Teste de resistência de Destreza. A criatura takes 4d6 dano de fogo and 4d6 dano radiante em um teste de resistência falho, or metade do dano on a successful one."
  },
  {
    "name": "Esfera Flamejante",
    "level": 2,
    "classes": [
      "Druida",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A 1,5 metro-diameter sphere of fire appears in an unoccupied space of your choice dentro do alcance and lasts for the duration. Any criatura that ends its turn a até 1,5 metro of the sphere must make a Teste de resistência de Destreza. The criatura takes 2d6 dano de fogo em um teste de resistência falho, or metade do dano on a successful one.\n\nAs a ação bônus, you can move the sphere up to 9 metros. If you ram the sphere into a criatura, that criatura must make the teste de resistência against the sphere's damage, and the sphere stops moving this turn.\n\nWhen you move the sphere, you can direct it over barriers up to 1,5 metro tall and jump it across pits up to 3 metros wide. The sphere ignites flammable objects not being worn or carried, and it sheds bright light in a raio de 6 metros and dim light for an additional 20 feet."
  },
  {
    "name": "Carne em Pedra",
    "level": 6,
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You attempt to turn one criatura that que você possa ver dentro do alcance into stone. If the alvo's body is made of flesh, the criatura must make a Teste de resistência de Constituição. Em um teste de resistência falho, it is imobilizado as its flesh begins to harden. Em um teste de resistência bem-sucedido, the criatura isn't affected.\n\nA criatura imobilizado by this spell must make another Consititution teste de resistência at the end of each of its turns. If it successfully saves against this spell three times, the magia termina. If it fails saves three times, it is turned to stone and subjected to the petrificado condition for the duration. The successes and failures don't need to be consecutive; keep track of both until the alvo collects three of a kind.\n\nIf the criatura is physically broken while petrificado, it suffers from similar deformities if it reverts to its original state.\n\nIf you maintain your concentração on this spell for the entire possible duration, the criatura is turned to stone until the effect is removed."
  },
  {
    "name": "Proibição",
    "level": 6,
    "classes": [
      "Clérigo"
    ],
    "school": "Abjuração",
    "castingTime": "10 minutes",
    "range": "Toque",
    "duration": "1 day",
    "description": "Você cria a ward against magical travel that protects up to 40,000 square feet of floor space to a height of 9 metros above the floor. For the duration, criaturas can't teleport into the area or use portals, such as those created by the gate (lvl 9) spell, to enter the area. The spell proofs the area against planar travel, and therefore prevents criaturas from accessing the area by way of the Astral Plane, Ethereal Plane, Feéricowild, Shadowfell, or the plane shift (lvl 7) spell.\n\nIn addition, the spell damages types of criaturas that you choose when you cast it. Escolha uma or more of the following: celestiais, elementais, feérico, inimigos, and mortos-vivos. When a chosen criatura enters the spell's area for the first time on a turn or starts its turn there, the criatura takes 5d10 radiant or dano necrótico (your choice Quando você conjura essa magia).\n\nQuando você conjura essa magia, you can designate a password. A criatura that speaks the password as it enters the area takes no damage from the spell.\n\nThe spell's area can't overlap with the area of another *forbiddance* spell. If you cast *forbiddance* every day for 30 days in the same location, the spell lasts until it is dispelled, and the material components are consumed on the last casting."
  },
  {
    "name": "Liberdade de Movimentos",
    "level": 4,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Patrulheiro"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "description": "You touch a criatura voluntária. For the duration, the alvo's movimento is unaffected by difficult terrain, and spells and other magical effects can neither reduce the alvo's velocidade nor cause the alvo to be paralisado or imobilizado.\n\nThe alvo can also spend 1,5 metro of movimento to automatically escape from nonmagical restraints, such as manacles or a criatura that has it agarrado. Finally, being underwater imposes no penalties on the alvo's movimento or attacks."
  },
  {
    "name": "Compromisso",
    "level": 5,
    "classes": [
      "Clérigo",
      "Mago",
      "Paladino",
      "Druida",
      "Bardo"
    ],
    "school": "Encantamento",
    "castingTime": "1 minute",
    "range": "18 metros",
    "duration": "30 dias",
    "description": "You place a magical command on a criatura that que você possa ver dentro do alcance, forcing it to carry out some service or refrain from some ação or course of activity as you decide. If the criatura can understand you, it must succeed on a Teste de resistência de Sabedoria or become enfeitiçado by you for the duration. While the criatura is enfeitiçado by you, it takes 5d10 dano psíquico each time it acts in a manner directly counter to your instructions, but no more than once each day. A criatura that can't understand you is unaffected by the spell.\n\nYou can issue any command you choose, short of an activity that would result in certain death. Should you issue a suicidal command, the magia termina.\n\nYou can end the spell early by using an ação to disfalha it. A remove curse (lvl 3), greater restoration (lvl 5), or wish (lvl 9) spell also ends it."
  },
  {
    "name": "Repouso Gentil",
    "level": 2,
    "classes": [
      "Clérigo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "10 dias",
    "description": "You touch a corpse or other remains. For the duration, the alvo is protected from decay and can’t become mortos-vivos.\n\nThe spell also effectively extends the time limit on raising the alvo from the dead, since days spent under the influence of this spell don’t count against the time limit of spells such as raise dead (lvl 5)."
  },
  {
    "name": "Inseto Gigante",
    "level": 4,
    "classes": [
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "You transform up to ten centipedes, three spiders, five wasps, or one scorpion dentro do alcance into versions of their natural forms for the duration. A centipede becomes a gigante centipede, a spider becomes a gigante spider, a wasp becomes a gigante wasp, and a scorpion becomes a gigante scorpion.\n\nEach criatura obeys your verbal commands, and in combat they act on your turn each rodada. The DM has the statistics for these criaturas and resolves their ações and moment.\n\nA criatura remains in its gigante size for the duration until it drops to 0 pontos de vida, or until you use an ação to disfalha the effect on it.\n\nThe DM might allow you to choose different alvos. for example, if you transform a bee, its gigante version might have the same stats as a gigante wasp."
  },
  {
    "name": "Globo de Invulnerabilidade",
    "level": 6,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "An immobile, faintly shimmering barrier springs into existence in a raio de 3 metros arodada you and remains for the duration.\n\nAny spell of 5th level or lower cast from outside the barrier can’t affect criaturas or objects within it, even if the spell is cast using a nível superior espaço de magia. Such a spell can alvo criaturas and objects within the barrier, but the spell has no effect on them. Similarly, the area within the barrier is excluded from the areas affected by such spells."
  },
  {
    "name": "Glifo de Proteção",
    "level": 3,
    "classes": [
      "Clérigo",
      "Mago",
      "Bardo"
    ],
    "school": "Abjuração",
    "castingTime": "1 hour",
    "range": "Toque",
    "duration": "Até ser dissipada ou acionada",
    "description": "Quando você conjura essa magia, you inscribe a glyph that later unleashes a magical effect. You inscribe it either on a surface (such as a table or a section of floor or wall) or within an object that can be closed (such as a book, a scroll, or a treasure chest) to conceal the glyph. The glyph can cover an area no larger than 3 metros in diameter. If the surface or object is moved more than 3 metros from where you cast this spell, the glyph is broken, and the magia termina without being triggered. \n\n The glyph is nearly invisível and requires a successful Intelligence (Investigation) check against your CD de resistência de magia to be found. \n\n You decide what triggers the glyph when você conjura a magia. For glyphs inscribed on a surface, the most typical triggers include touching or standing on the glyph, removing another object covering the glyph, approaching within a certain distance of the glyph, or manipulating the object on which the glyph is inscribed. For glyphs inscribed within an object, the most common triggers include opening that object, approaching within a certain distance of the object, or seeing or reading the glyph. Once a glyph is triggered, this magia termina. \n\n You can further refine the trigger so the spell activates only under certain circumstances or according to physical characteristics (such as height or weight), criatura kind (for example, the ward could be set to affect aberrations or drow), or alignment. You can also set conditions for criaturas that don’t trigger the glyph, such as those who say a certain password. \n\n When you inscribe the glyph, choose explosive runes or a spell glyph. \n\nExplosive Runes: When triggered, the glyph erupts with magical energy in a 20-foot-radius sphere centered on the glyph. The sphere spreads arodada corners. Each criatura in the area must make a Teste de resistência de Destreza. A criatura takes 5d8 acid, cold, fire, lightning, or dano sônico on a failed teste de resistência (your choice when Você cria the glyph), or metade do dano on a successful one. \n\nSpell Glyph: You can store a prepared spell of 3rd level or lower in the glyph by casting it as part of creating the glyph. The spell must alvo a single criatura or an area. The spell being stored has no immediate effect when cast in this way. When the glyph is triggered, the stored spell is cast. If the spell has a alvo, it alvos the criatura that triggered the glyph. If the spell affects an area, the area is centered on that criatura. If the spell summons hostile criaturas or creates harmful objects or traps, they appear as close as possible to the intruder and attack it. If the spell requires concentração, it lasts until the end of its full duration."
  },
  {
    "name": "Videira Apreensora",
    "level": 4,
    "classes": [
      "Patrulheiro",
      "Druida"
    ],
    "school": "Conjuração",
    "castingTime": "1 bonus ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você conjura a vine that sprouts from the grodada in an unoccupied space of your choice that que você possa ver dentro do alcance. Quando você conjura essa magia, you can direct the vine to lash out at a criatura a até 9 metros of it that que você possa ver. That criatura must succeed on a Teste de resistência de Destreza or be pulled 20 feet directly toward the vine.\n\nAté a magia terminar, you can direct the vine to lash out at the same criatura or another one as a ação bônus on each of your turns."
  },
  {
    "name": "Invisibilidade Superior",
    "level": 4,
    "classes": [
      "Feiticeiro",
      "Mago",
      "Bardo"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 minute",
    "description": "You or a criatura you touch becomes invisível até a magia terminar. Anything the alvo is wearing or carrying is invisível as long as it is on the alvo’s person."
  },
  {
    "name": "Restauração Superior",
    "level": 5,
    "classes": [
      "Clérigo",
      "Druida",
      "Bardo"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You imbue a criatura you touch with positive energy to undo a debilitating effect. You can reduce the alvo's exaustão level by one, or end one of the following effects on the alvo:\n\nOne effect that enfeitiçado or petrificado the alvoOne curse, including the alvo’s attunement to a cursed magic itemAny reduction to one of the alvo’s ability scoresOne effect reducing the alvo’s ponto de vida maximum"
  },
  {
    "name": "Guardião da Fé",
    "level": 4,
    "classes": [
      "Clérigo"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "8 horas",
    "description": "A Large spectral guardian appears and hovers for the duration in an unoccupied space of your choice that que você possa ver dentro do alcance. The guardian occupies that space and is indistinct except for a gleaming sword and shield emblazoned with the symbol of your deity.\n\nAny criatura hostile to you that moves to a space a até 3 metros of the guardian for the first time on a turn must succeed on a Teste de resistência de Destreza. The criatura takes 20 dano radiante em um teste de resistência falho, or metade do dano on a successful one. The guardian vanishes when it has dealt a total of 60 damage."
  },
  {
    "name": "Guardas e Vigias",
    "level": 6,
    "classes": [
      "Mago",
      "Bardo"
    ],
    "school": "Abjuração",
    "castingTime": "10 minutes",
    "range": "Toque",
    "duration": "24 horas",
    "description": "Você cria a ward that protects up to 2,500 square feet of floor space (an area 50 feet square, or one hundred 1,5 metro squares or twenty-five 3 metros squares). The warded area can be up to 20 feet tall, and shaped as you desire. You can ward several stories of a stronghold by dividing the area among them, as long as you can walk into each contiguous area while you are casting the spell.\n\nQuando você conjura essa magia, you can specify individuals that are unaffected by any or all of the effects that you choose. You can also specify a password that, when spoken aloud, makes the speaker immune to these effects. Guards and wards creates the following effects within the warded area. Place dancing lights (cantrip) in four corridors. You can designate a simple program that the lights repeat as long as guards and wards lasts.Place magic mouth (lvl 2) in two locations.Place stinking cloud (lvl 3) in two locations. The vapors appear in the places you designate; They return within 10 minutos if dispersed by wind while guards and wards lasts.Place a constant gust of wind (lvl 2) in one corridor or room.Place a suggestion (lvl 2) in one location. You select an area of up to 1,5 metro square, and any criatura that enters or passes through the area recieves the suggestion mentally. The whole warded area radiates magic. A dispel magic (lvl 3) cast on a specific effect, if successful, removes only that effect.\n\nYou can create a permanently guarded and warded structure by casting this spell there every day for one year."
  },
  {
    "name": "Rajada de Vento",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Mago",
      "Druida"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Self (60-foot line)",
    "duration": "Concentração, up to 1 minute",
    "description": "A line of strong wind 18 metros long and 3 metros wide blasts from you in a direction you choose for the spell's duration. Each criatura that starts its turn in the line must succeed on a Teste de resistência de Força or be pushed 4,5 metros away from you in a direction following the line.\n\nAny criatura in the line must spend 2 feet of movimento for every 1 foot it moves when moving closer to you.\n\nThe gust disperses gas or vapor, and it extinguishes candles, torches, and similar unprotected flames in the area. It causes protected fiames, such as those of lanterns, to dance wildly and has a 50 percent chance to extinguish them.\n\nAs a ação bônus on each of your turns before the magia termina, you can change the direction in which the line blasts from you."
  },
  {
    "name": "Terreno Alucinatório",
    "level": 4,
    "classes": [
      "Bardo",
      "Druida",
      "Bruxo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "10 minutes",
    "range": "90 metros",
    "duration": "24 horas",
    "description": "You make natural terrain in a 150-foot cube in range look, sound, and smell like some other sort of natural terrain. Thus, open fields or a road can be made to resemble a swamp, hill, crevasse, or some other difficult or impassable terrain. A pond can be made to seem like a grassy meadow, a precipice like a gentle slope, or a rock-strewn gully like a wide and smooth road. Manufactured structures, equipment, and criaturas within the area aren’t changed in appearance.\n\nThe tactile characteristics of the terrain are unchanged, so criaturas entering the area are likely to see through the illusion. If the difference isn’t obvious by touch, a criatura carefully examining the illusion can attempt an Intelligence (Investigation) check against your CD de resistência de magia to disbelieve it. A criatura who discerns the illusion for what it is, sees it as a vague image superimposed on the terrain."
  },
  {
    "name": "Consagrar",
    "level": 5,
    "classes": [
      "Clérigo"
    ],
    "school": "Evocação",
    "castingTime": "24 hours",
    "range": "Toque",
    "duration": "Até ser dissipada",
    "description": "You touch a point and infuse an area arodada it with holy (or unholy) power. The area can have a radius up to 18 metros, and the spell fails if the radius includes an area already under the effect a hallow spell. The affected area is subject to the following effects. First, celestiais, elementais, feérico, inimigos, and mortos-vivos can't enter the area, nor can such criaturas charm, frighten, or possess criaturas within it. Any criatura enfeitiçado, amedrontado, or possessed by such a criatura is no longer enfeitiçado, amedrontado, or possessed upon entering the area. You can exclude one or more of those types of criaturas from this effect. Second, you can bind an extra effect to the area. Choose the effect from the following list, or choose an effect offered by the GM. Some of these effects apply to criaturas in the area; you can designate whether the effect applies to all criaturas, criaturas that follow a specific deity or leader, or criaturas of a specific sort, such as orcs or trolls. When a criatura that would be affected enters the spell's area for the first time on a turn or starts its turn there, it can make a Teste de resistência de Carisma. On a success, the criatura ignores the extra effect until it leaves the area. \n\nCourage: Affected criaturas can't be amedrontado while in the area. \n\nDarkness: Darkness fills the area. Normal light, as well as magical light created by spells of a lower level than the slot you used to cast this spell, can't illuminate the area. \n\nDaylight: Bright light fills the area. Magical darkness created by spells of a lower level than the slot you used to cast this spell can't extinguish the light. \n\nEnergy Protection: Affected criaturas in the area have resistance to one damage type of your choice, except for bludgeoning, piercing, or slashing. \n\nEnergy Vulnerability: Affected criaturas in the area have vulnerability to one damage type of your choice, except for bludgeoning, piercing, or slashing. \n\nEverlasting Rest: Dead bodies interred in the area can't be turned into mortos-vivos. \n\nExtradimensional Interference: Affected criaturas can't move or travel using teleportation or by extradimensional or interplanar means. \n\nFear: Affected criaturas are amedrontado while in the area. \n\nSilence: No sound can emanate from within the area, and no sound can reach into it. \n\nTongues: Affected criaturas can communicate with any other criatura in the area, even if they don't share a common language."
  },
  {
    "name": "Causar Dano",
    "level": 6,
    "classes": [
      "Clérigo"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "You unleash a virulent disease on a criatura that que você possa ver dentro do alcance. The alvo must make a Teste de resistência de Constituição. Em um teste de resistência falho, it takes 14d6 dano necrótico, or metade do dano em um teste de resistência bem-sucedido. The damage can’t reduce the alvo’s pontos de vida below 1. If the alvo fails the teste de resistência, its ponto de vida maximum is reduced for 1 hora by an amount equal to the dano necrótico it took. Any effect that removes a disease allows a criatura’s ponto de vida maximum to return to normal before that time passes."
  },
  {
    "name": "Aquecer Metal",
    "level": 2,
    "classes": [
      "Druida",
      "Bardo"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Choose a manufactured metal object, such as a metal weapon or a suit of heavy or medium metal armor, that que você possa ver dentro do alcance. Você causa the object to glow red-hot. Any criatura in physical contact with the object takes 2d8 dano de fogo when você conjura a magia. Até a magia terminar, you can use a ação bônus on each of your subsequent turns to cause this damage again.\n\nIf a criatura is holding or wearing the object and takes the damage from it, the criatura must succeed on a Teste de resistência de Constituição or drop the object if it can. If it doesn’t drop the object, it has desvantagem on jogada de ataques and teste de habilidades until the start of your next turn."
  },
  {
    "name": "Curar",
    "level": 6,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "Choose a criatura that que você possa ver dentro do alcance. A surge of positive energy washes through the criatura, causing it to regain 70 pontos de vida. This spell also ends blindness, deafness, and any diseases affecting the alvo. This spell has no effect on constructoos or mortos-vivos."
  },
  {
    "name": "Banquete dos Heróis",
    "level": 6,
    "classes": [
      "Clérigo",
      "Druida"
    ],
    "school": "Conjuração",
    "castingTime": "10 minutes",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "You bring forth a great feast, including magnificent food and drink. The feast takes 1 hora to consume and disappears at the end of that time, and the beneficial effects don’t set in until this hora is over. Up to twelve other criaturas can partake of the feast.\n\nA criatura that partakes of the feast gains several benefits. The criatura is cured of all diseases and poison, becomes immune to poison and being amedrontado, and makes all Teste de resistência de Sabedorias with vantagem. Its ponto de vida maximum also increases by 2d10, and it gains the same number of pontos de vida. These benefits last for 24 horas."
  },
  {
    "name": "Paralisar Monstro",
    "level": 5,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Choose a criatura that que você possa ver dentro do alcance. The alvo must succeed on a Teste de resistência de Sabedoria or be paralisado for the duration. This spell has no effect on mortos-vivos. At the end of each of its turns, the alvo can make another Teste de resistência de Sabedoria. On a success, the magia termina on the alvo."
  },
  {
    "name": "Tempestade de Gelo",
    "level": 4,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "90 metros",
    "duration": "Instantâneo",
    "description": "A hail of rock-hard ice pounds to the grodada in a 20-foot-radius, 40-foot-high cylinder centered on a point dentro do alcance. Each criatura in the cylinder must make a Teste de resistência de Destreza. A criatura takes 2d8 dano de concussão and 4d6 dano de frio em um teste de resistência falho, or metade do dano on a successful one.\n\nHailstones turn the storm’s area of effect into difficult terrain until the end of your next turn."
  },
  {
    "name": "Praga de Insetos",
    "level": 5,
    "classes": [
      "Clérigo",
      "Druida",
      "Feiticeiro"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "90 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Swarming, biting locusts fill a 20-foot-radius sphere centered on a point you choose dentro do alcance, The sphere spreads arodada corners. The sphere remains for the duration, and its area is lightly obscured. The sphere's area is difficult terrain.\n\nWhen the area appears, each criatura in it must make a Teste de resistência de Constituição. A criatura takes 4d10 dano perfurante em um teste de resistência falho, or metade do dano on a successful one. A criatura must also make this teste de resistência when it enters the spell's area for the first time on a turn or ends its turn there."
  },
  {
    "name": "Destravar",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Mago",
      "Bardo"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "Choose an object that que você possa ver dentro do alcance. The object can be a door, a box, a chest, a set of manacles, a padlock, or another object that contains a mundane or magical means that prevents access.\n\nA alvo that is held shut by a mundane lock ar that is stuck or barred becomes unlocked, unstuck, or unbarred. If the object has multiple locks, only one of them is unlocked.\n\nIf you choose a alvo that is held shut with arcane lock (lvl 2), that spell is suppressed for 10 minutos, during which time the alvo can be opened and shut normally.\n\nWhen você conjura a magia, a loud knock, audible from as far away as 300 feet, emanates from the alvo object."
  },
  {
    "name": "Conhecimento Lendário",
    "level": 5,
    "classes": [
      "Clérigo",
      "Mago",
      "Bardo"
    ],
    "school": "Adivinhação",
    "castingTime": "10 minutes",
    "range": "Si mesmo",
    "duration": "Instantâneo",
    "description": "Name or describe a person, place, or object. The spell brings to your mind a brief summary of the significant lore about the thing you named. The lore might consist of current tales, forgotten stories, or even secret lore that has never been widely known. If the thing you named isn't of legendary importance, you gain no information. The more information you already have about the thing, the more precise and detailed the information you receive is.\n\nThe information you learn is accurate but might be couched in figurative language. For example, if you have a mysterious magic axe on hand, the spell might yield this information: Woe to the evildoer whose hand touches the axe, for even the haft slices the hand of the evil ones. Only a true Child of Stone, lover and beloved of Moradin, may awaken the true powers of the axe, and only with the sacred word Rudnogg on the lips."
  },
  {
    "name": "Levitar",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "One criatura or object of your choice that que você possa ver dentro do alcance rises vertically, up to 20 feet, and remains suspended there for the duration. The spell can levitate a alvo that weighs up to 500 pounds. An uncriatura voluntária that succeeds on a Teste de resistência de Constituição is unaffected.\n\nThe alvo can move only by pushing or pulling against a fixed object or surface within reach (such as a wall or a ceiling), which allows it to move as if it were climbing. You can change the alvo's altitude by up to 20 feet in either direction on your turn. If you are the alvo, you can move up or down as part of your move. Otherwise, you can use your ação to move the alvo, which must remain within the spell's range.\n\nWhen the magia termina, the alvo floats gently to the grodada if it is still aloft."
  },
  {
    "name": "Localizar Animais ou Plantas",
    "level": 2,
    "classes": [
      "Bardo",
      "Druida",
      "Patrulheiro"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Instantâneo",
    "description": "Describe or name a specific kind of besta or planta. Concentrating on the voice of nature in your surrodadaings, you learn the direction and distance to the closest criatura or planta of that kind within 5 miles, if any are present."
  },
  {
    "name": "Raio",
    "level": 3,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Self (100-foot line)",
    "duration": "Instantâneo",
    "description": "A stroke of lightning forming a line 100 feet long and 1,5 metro wide blasts out from you in a direction you choose. Each criatura in the line must make a Teste de resistência de Destreza. A criatura takes 8d6 dano de raio em um teste de resistência falho, or metade do dano on a successful one.\n\nThe lightning ignites flammable objects in the area that aren't being worn or carried."
  },
  {
    "name": "Localizar Criatura",
    "level": 4,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladino",
      "Patrulheiro",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 hour",
    "description": "Describe or name a criatura that is familiar to you. You sense the direction to the criatura's location, as long as that criatura is within 1,000 feet of you. If the criatura is moving, you know the direction of its movimento.\n\nThe spell can locate a specific criatura known to you, or the nearest criatura of a specific kind (such as a human or a unicorn), so long as you have seen such a criatura up close - a até 9 metros - at least once. If the criatura you described or named is in a different form, such as being under the effects of a polymorph (lvl 4) spell, this spell doesn’t locate the criatura.\n\nThis spell can't locate a criatura if running water at least 3 metros wide blocks a direct path between you and the criatura."
  },
  {
    "name": "Localizar Objeto",
    "level": 2,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Paladino",
      "Patrulheiro",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "Describe or name an object that is familiar to you. You sense the direction to the object's location, as long as that object is within 1,000 feet of you. If the object is in motion, you know the direction of its movimento.\n\nThe spell can locate a specific object known to you, as long as you have seen it up close - a até 9 metros — at least once. Alternatively, the spell can locate the nearest object of a particular kind, such as a certain kind of apparel, jewelry, furniture, tool, or weapon.\n\nThis spell can't locate an object if any thickness of lead, even a thin sheet, blocks a direct path between you and the object."
  },
  {
    "name": "Jarro Mágico",
    "level": 6,
    "classes": [
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 minute",
    "range": "Si mesmo",
    "duration": "Até ser dissipada",
    "description": "Your body falls into a catatonic state as your soul leaves it and enters the container you used for the spell's material component. While your soul inhabits the container, you are aware of your surrodadaings as if you were in the container's space. You can't move or use reaçãos. The only ação you can take is to project your soul up to 100 feet out of the container, either returning to your living body (and ending the spell) or attempting to possess a humanoide's body.\n\nYou can attempt to possess any humanoide within 100 feet of you that que você possa ver (criaturas warded by a protection from evil and good (lvl 1) or magic circle (lvl 3) spell can't be possessed). The alvo must make a Teste de resistência de Carisma. On a failure, your soul moves into the alvo's body, and the alvo's soul becomes trapped in the container. On a success, the alvo resists your efforts to possess it, and you can't attempt to possess it again for 24 horas.\n\nOnce you possess a criatura's body, you control it. Your game statistics are replaced by the statistics of the criatura, though you retain your alignment and your Intelligence, Wisdom, and Charisma scores. You retain the benefit of your own class features. If the alvo has any class levels, you can't use any of its class features.\n\nMeanwhile, the possessed criatura's soul can perceive from the container using its own senses, but it can't move or take ações at all.\n\nWhile possessing a body, you can use your ação to return from the host body to the container if it is within 100 feet of you, returning the host criatura's soul to its body. If the host body dies while you're in it, the criatura dies, and you must make a Teste de resistência de Carisma against your own spellcasting DC. On a success, you return to the container if it is within 100 feet of you. Otherwise, you die.\n\nIf the container is destroyed or the magia termina, your soul immediately returns to your body. If your body is more than 100 feet away from you or if your body is dead when you attempt to return to it, you die. If another criatura's soul is in the container when it is destroyed, the criatura's soul returns to its body if the body is alive and within 100 feet. Otherwise, that criatura dies.\n\nWhen the magia termina, the container is destroyed."
  },
  {
    "name": "Arma Mágica",
    "level": 2,
    "classes": [
      "Paladino",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 bonus ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 hour",
    "description": "You touch a nonmagical weapon. Até a magia terminar, that weapon becomes a magic weapon with a +1 bonus to jogada de ataques and damage rolls."
  },
  {
    "name": "Boca Mágica",
    "level": 2,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 minute",
    "range": "9 metros",
    "duration": "Até ser dissipada",
    "description": "You implanta a message within an object in range, a message that is uttered when a trigger condition is met. Choose an object that que você possa ver that isn't being worn or carried by another criatura, then speak the message, which must be 25 words or less, though it can be delivered over as long as ten minutos. Finally, determine the circumstance that will trigger the spell to deliver your message.\n\nWhen that circumstance occurs, a magical mouth appears on the object and recites the message in your voice at the same volume you spoke. If the object you chose has a mouth or something that looks like a mouth (for example, the mouth of a statue) the magical mouth appears there so that the words appear to come from the object's mouth. Quando você conjura essa magia, you can have the spell end after it delivers its message or it can remain and repeat its message whenever the trigger occurs.\n\nThe triggering circumstance can be as general or as detailed as you like, though it must be based on visual or audible conditions that occur a até 9 metros of the object. For example, you could instruct the mouth to speak when any criatura moves a até 9 metros of the object or when a silver bell rings a até 9 metros."
  },
  {
    "name": "Curar Ferimentos em Massa",
    "level": 5,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "A wave of healing energy washes out from a point of your choice dentro do alcance. Escolha até six criaturas in a 9 metros-radius sphere centered on that point. Each alvo regains pontos de vida equal to 3d8 + your atributo de conjuração modifier. This spell has no effect on mortos-vivos or constructoos."
  },
  {
    "name": "Sugestão em Massa",
    "level": 6,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "24 horas",
    "description": "You suggest a course of activity (limited to a sentence or two) and magically influence up to twelve criaturas of your choice that que você possa ver dentro do alcance and that can hear and understand you. Criaturas that can't be enfeitiçado are immune to this effect. The suggestion must be worded in such a manner as to make the course of ação sound reasonable. Asking the criatura to stab itself, throw itself onto a spear, immolate itself, or do some other obviously harmful act automatically negates the effect of the spell.\n\nEach alvo must make a Teste de resistência de Sabedoria. Em um teste de resistência falho, it pursues the course of ação you described to the best of its ability. The suggested course of ação can continue for the entire duration. If the suggested activity can be completed in a shorter time, the magia termina when the subject finishes what it was asked to do.\n\nYou can also specify conditions that will trigger a special activity during the duration. For example, you might suggest that a group of soldiers give all their money to the first beggar they meet. If the condition isn't met before the magia termina, the activity isn’t performed.\n\nIf you or any of your companions damage a criatura affected by this spell, the magia termina for that criatura."
  },
  {
    "name": "Imagem Espelhada",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "1 minuto",
    "description": "Three illusory duplicates of yourself appear in your space. Até a magia terminar, the duplicates move with you and mimic your ações, shifting position so it's impossible to track which image is real. You can use your ação to disfalha the illusory duplicates.\n\nEach time a criatura alvos you with an attack during the spell's duration, roll a d20 to determine whether the attack instead alvos one of your duplicates.\n\nlf you have three duplicates, you must roll a 6 ou superior to change the attack's alvo to a duplicate. With two duplicates, you must roll an 8 ou superior. With one duplicate, you must roll an 11 ou superior.\n\nA duplicate's AC equals 10 + your Modificador de Destreza. If an attack sucessos a duplicate, the duplicate is destroyed. A duplicate can be destroyed only by an attack that sucessos it. It ignores all other damage and effects. The magia termina when all three duplicates are destroyed.\n\nA criatura is unaffected by this spell if it can't see, if it relies on senses other than sight, such as blindsight, or if it can perceive illusions as false, as with truesight."
  },
  {
    "name": "Enganar",
    "level": 5,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 hour",
    "description": "You become invisível at the same time that an illusory double of you appears where you are standing. The double lasts for the duration, but the invisibility ends if you attack or cast a spell.\n\nYou can use your ação to move your illusory double up to twice your velocidade and make it gesture, speak, and behave in whatever way you choose.\n\nQue você possa ver through its eyes and hear through its ears as if you were located where it is. On each of your turns as a ação bônus, you can switch from using its senses to using your own, or back again. While you are using its senses, you are cego and ensurdecido in regard to your own surrodadaing."
  },
  {
    "name": "Passo Nebuloso",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Instantâneo",
    "description": "Briefly surrodadaed by silvery mist, you teleport up to 9 metros to an unoccupied space that que você possa ver."
  },
  {
    "name": "Modificar Memória",
    "level": 5,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You attempt to reshape another criatura's memories. One criatura that que você possa ver must make a Teste de resistência de Sabedoria. If you are fighting the criatura, it has vantagem on the teste de resistência. Em um teste de resistência falho, the alvo becomes enfeitiçado by you for the duration. The enfeitiçado alvo is incapacitado and unaware of its surrodadaings, though it can still hear you. If it takes any damage or is alvoed by another spell, this magia termina, and none of the alvo's memories are modified.\n\nWhile this charm lasts, you can affect the alvo's memory of an event that it experienced within the last 24 horas and that lasted no more than 10 minutos. You can permanently eliminate all memory of the event, allow the alvo to recall the event with perfect clarity and exacting detail, change its memory of the details of the event, or create a memory of some other event.\n\nYou must speak to the alvo to describe how its memories are affected, and it must be able to understand your language for the modified memories to take root. Its mind fills in any gaps in the details of your description. If the magia termina before you have finished describing the modified memories, the criatura's memory isn’t altered. Otherwise, the modified memories take hold when the magia termina.\n\nA modified memory doesn’t necessarily affect how a criatura behaves, particularly if the memory contradicts the criatura's natural inclinations, alignment, or beliefs. An illogical modified memory, such as implantaing a memory of how much the criatura enjoyed dousing itself in acid, is disfalhaed, perhaps as a bad dream. The DM might deem a modified memory too nonsensical to affect a criatura in a significant manner.\n\nA remove curse (lvl 3) or greater restoration (lvl 5) spell cast on the alvo restores the criatura's true memory."
  },
  {
    "name": "Raio de Lua",
    "level": 2,
    "classes": [
      "Druida"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A silvery beam of pale light shines down in a 1,5 metro-radius, 40-foot-high cylinder centered on a point dentro do alcance. Até a magia terminar, dim light fills the cylinder.\n\nWhen a criatura enters the spell's area for the first time on a turn or starts its turn there, it is engulfed in ghostly flames that cause searing pain, and it must make a Teste de resistência de Constituição. It takes 2d10 dano radiante em um teste de resistência falho, or half as much on a successful one.\n\nA shapechanger makes its teste de resistência with desvantagem. If it fails, it also instantly reverts to its original form and can't assume a different form until it leaves the spells light.\n\nOn each of your turns after you cast this spell use can use an ação to move the beam 18 metros in any direction."
  },
  {
    "name": "Mover a Terra",
    "level": 6,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 2 hours",
    "description": "Choose an area of terrain no larger than 40 feet on a side dentro do alcance. You can reshape dirt, sand, or clay in the area in any manner you choose for the duration. You can raise or lower the area's elevation, create or fill in a trench, erect or flatten a wall, or form a pillar. The extent of any such changes can't exceed half the area's largest dimension. So, if you affect a 40-foot square, you can create a pillar up to 20 feet high, raise or lower the square's elevation by up to 20 feet, dig a trench up to 20 feet deep, and so on. It takes 10 minutos for these changes to complete.\n\nAt the end of every 10 minutos you spend concentrating on the spell, you can choose a new area of terrain to affect.\n\nBecause the terrain’s transformation occurs slowly, criaturas in the area can't usually be trapped or injured by the grodada's movimento. This spell can't manipulate natural stone or stone constructoion. Rocks and structures shift to accommodate the new terrain. If the way you shape the terrain would make a structure unstable, it might collapse.\n\nSimilarly, this spell doesn't directly affect planta growth. The moved earth carries any plantaas along with it."
  },
  {
    "name": "Passagem sem Rastros",
    "level": 2,
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 hour",
    "description": "A veil of shadows and silence radiates from you, masking you and your companions from detection. For the duration, each criatura you choose a até 9 metros of you (including you) has a +10 bonus to Dexterity (Stealth) checks and can’t be tracked except by magical means. A criatura that receives this bonus leaves behind no tracks or other traces of its passage."
  },
  {
    "name": "Passagem Mural",
    "level": 5,
    "classes": [
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 hora",
    "description": "A passage appears at a point of your choice that que você possa ver on a wooden, plaster, or stone surface (such as a wall, a ceiling, or a floor) dentro do alcance, and lasts for the duration. You choose the opening's dimensions: up to 1,5 metro wide, 8 feet tall, and 20 feet deep. The passage creates no instability in a structure surrodadaing it.\n\nWhen the opening disappears, any criaturas or objects still in the passage created by the spell are safely ejected to an unoccupied space nearest to the surface on which você conjura a magia."
  },
  {
    "name": "Assassino Fantasmal",
    "level": 4,
    "classes": [
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You tap into the nightmares of a criatura que você possa ver dentro do alcance and create an illusory manifestation of its deepest fears, visible only to that criatura. The alvo must make a Teste de resistência de Sabedoria. Em um teste de resistência falho, the alvo becomes amedrontado for the duration. At the start of each of the alvo's turns before the magia termina, the alvo must succeed on a Teste de resistência de Sabedoria or take 4d10 dano psíquico. Em um teste de resistência bem-sucedido, the magia termina."
  },
  {
    "name": "Phantasmal Force",
    "level": 2,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "You craft an illusion that takes root in the mind of a criatura that que você possa ver dentro do alcance. The alvo must make an Teste de resistência de Inteligência. Em um teste de resistência falho, Você cria a phantasmal object, criatura, or other visible phenomenon of your choice that is no larger than a 1O-foot cube and that is perceivable only to the alvo for the duration. This spell has no effect on mortos-vivos or constructoos.\n\nThe phantasm includes sound, temperature, and other stimuli, also evident only to the criatura.\n\nThe alvo can use its ação to examine the phantasm with an Intelligence (Investigation) check against your CD de resistência de magia. If the check succeeds, the alvo realizes that the phantasm is an illusion, and the magia termina.\n\nWhile a alvo is affected by the spell, the alvo treats the phantasm as if it were real. The alvo rationalizes any illogical outcomes from interacting with the phantasm. For example, a alvo attempting to walk across a phantasmal bridge that spans a chasm falls once it steps onto the bridge. If the alvo survives the fall, it still believes that the bridge exists and comes up with some other explanation for its fall--it was pushed, it slipped, or a strong wind might have knocked it off.\n\nAn affected alvo is so convinced of the phantasm's reality that it can even take damage from the illusion. A phantasm created to appear as a criatura can attack the alvo. Similarly. a phantasm created to appear as fire, a pool of acid, or lava can burn the alvo. Each rodada on your turn, the phantasm can deal 1d6 dano psíquico to the alvo if it is in the phantasm's area or a até 1,5 metro of the phantasm, provided that the illusion is of a criatura ar hazard that could logically deal damage, such as by attacking. The alvo perceives the damage as a type appropriate to the illusion."
  },
  {
    "name": "Planar Ally",
    "level": 6,
    "classes": [
      "Clérigo"
    ],
    "school": "Conjuração",
    "castingTime": "10 minutes",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "You beseech an otherworldly entity for aid. The being must be known to you: a god, a primordial, a demon prince, or some other being of cosmic power. That entity sends a celestial, an elemental, or a inimigo loyal to it to aid you, making the criatura appear in an unoccupied space dentro do alcance. If you know a specific criatura's name, you can speak that name Quando você conjura essa magia to request that criatura, though you might get a different criatura anyway (GM's choice).\n\nWhen the criatura appears, it is under no compulsion to behave in any particular way. You can ask the criatura to perform a service in exchange for payment, but it isn’t obliged to do so. The requested task could range from simple (fly us across the chasm, or help us fight a battle) to complex (spy on our enemies, or protect us during our foray into the dungeon). You must be able to communicate with the criatura to bargain for its services.\n\nPayment can take a variety of forms. A celestial might require a sizable donation of gold or magic items to an allied temple, while a inimigo might demand a living sacrifice or a gift of treasure. Some criaturas might exchange their service for a quest undertaken by you. As a rule of thumb, a task that can be measured in minutos requires a payment worth 100 gp per minuto. A task measured in horas requires 1,000 gp per hora. And a task measured in days (up to 10 days) requires 10,000 gp per day. The DM can adjust these payments based on the circumstances under which você conjura a magia. If the task is aligned with the criatura's ethos, the payment might be halved or even waived. Nonhazardous tasks typically require only half the suggested payment, while especially dangerous tasks might require a greater gift. Criaturas rarely accept tasks that seem suicidal.\n\nAfter the criatura completes the task, or when the agreed-upon duration of service expires, the criatura returns to its home plane after reporting back to you, if appropriate to the task and if possible. If you are unable to agree on a price for the criatura’s service, the criatura immediately returns to its home plane.\n\nA criatura enlisted to join your group counts as a member of it, receiving a full share of experience points awarded."
  },
  {
    "name": "Vínculo Planar",
    "level": 5,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 hour",
    "range": "18 metros",
    "duration": "24 horas",
    "description": "With this spell, you attempt to bind a celestial, an elemental, a feérico, or a inimigo to your service. The criatura must be dentro do alcance for the entire casting of the spell. (Typically, the criatura is first summoned into the center of an inverted magic circle in order to keep it trapped while this spell is cast.) At the completion of the casting, the alvo must make a Teste de resistência de Carisma. Em um teste de resistência falho, it is bound to serve you for the duration. If the criatura was summoned or created by another spell, that spell's duration is extended to match the duration of this spell.\n\nA bound criatura must follow your instructions to the best of its ability. You might command the criatura to accompany you on an adventure, to guard a location, or to deliver a message. The criatura obeys the letter of your instructions, but if the criatura is hostile to you, it strives to twist your words to achieve its own objectives. If the criatura carries out your instructions completely before the magia termina, it travels to you to report this fact if you are on the same plane of existence. If you are on a different plane of existence, it returns to the place where you bound it and remains there até a magia terminar."
  },
  {
    "name": "Polimorfismo",
    "level": 4,
    "classes": [
      "Bardo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "This spell transforms a criatura that que você possa ver dentro do alcance into a new form. An uncriatura voluntária must make a Teste de resistência de Sabedoria to avoid the effect. A shapechanger automatically succeeds on this teste de resistência.\n\nThe transformation lasts for the duration, or until the alvo drops to 0 pontos de vida or dies. The new form can be any besta whose challenge rating is equal to or less than the alvo's (or the alvo's level, if it doesn’t have a challenge rating). The alvo's game statistics, including mental ability scores, are replaced by the statistics of the chosen besta. It retains its alignment and personality.\n\nThe alvo assumes the pontos de vida of its new form. When it reverts to its normal form, the criatura returns to the number of pontos de vida it had before it transformed. If it reverts as a result of dropping to 0 pontos de vida, any excess damage carries over to its normal form.\n\nAs long as the excess damage doesn't reduce the criatura's normal form to 0 pontos de vida, it isn't knocked inconsciente.\n\nThe criatura is limited in the ações it can perform by the nature of its new form, and it can't speak, cast spells, or take any other ação that requires hands or speech.\n\nThe alvo's gear melds into the new form. The criatura can't activate, use, wield, or otherwise benefit from any of its equipment."
  },
  {
    "name": "Ilusão Programada",
    "level": 6,
    "classes": [
      "Bardo",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Até ser dissipada",
    "description": "Você cria an illusion of an object, a criatura, or some other visible phenomenon dentro do alcance that activates when a specific condition occurs. The illusion is imperceptible until then. It must be no larger than a 9 metros cube, and you decide when você conjura a magia how the illusion behaves and what sounds it makes. This scripted performance can last up to 5 minutos.\n\nWhen the condition you specify occurs, the illusion springs into existence and performs in the manner you described. Once the illusion finishes performing, it disappears and remains dormant for 10 minutos. After this time, the illusion can be activated again. The triggering condition can be as general or as detailed as you like, though it must be based on visual or audible conditions that occur a até 9 metros of the area. For example, you could create an illusion of yourself to appear and warn off others who attempt to open a trapped door, or you could set the illusion to trigger only when a criatura says the correct word or phrase.\n\nPhysical interação with the image reveals it to be an illusion, because things can pass through it. A criatura that uses its ação to examine the image can determine that it is an illusion with a successful Intelligence (Investigation) check against your CD de resistência de magia. If a criatura discerns the illusion for what it is, the criatura can see through the image, and any noise it makes sounds hollow to the criatura."
  },
  {
    "name": "Ressuscitar os Mortos",
    "level": 5,
    "classes": [
      "Clérigo",
      "Paladino",
      "Bardo"
    ],
    "school": "Necromancia",
    "castingTime": "1 hour",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You return a dead criatura you touch to life, provided that it has been dead no longer than 10 days. If the criatura's soul is both willing and at liberty to rejoin the body, the criatura returns to life with 1 ponto de vida.\n\nThis spell also neutralizes any poisons and cures nonmagical diseases that affected the criatura at the time it died. This spell doesn't, however, remove magical diseases, curses, or similar effects; if these aren't first removed prior to casting the spell, they take effect when the criatura returns to life. The spell can’t return an mortos-vivos criatura to life.\n\nThis spell closes all mortal wounds, but it doesn't restore falhaing body parts. If the criatura is lacking body parts or organs integral for its survival—its head, for instance—the spell automatically fails.\n\nComing back from the dead is an ordeal. The alvo takes a −4 penalty to all jogada de ataques, testes de resistência, and teste de habilidades. Every time the alvo finishes a descanso longo, the penalty is reduced by 1 until it disappears."
  },
  {
    "name": "Proteção contra Veneno",
    "level": 2,
    "classes": [
      "Clérigo",
      "Patrulheiro",
      "Paladino",
      "Druida"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "description": "You touch a criatura. If it is envenenado, you neutralize the poison. If more than one poison afflicts the alvo, you neutralize one poison that you know is present, or you neutralize one at random. For the duration, the alvo has vantagem on testes de resistência against being envenenado, and it has resistance to dano de veneno."
  },
  {
    "name": "Raio de Enfraquecer",
    "level": 2,
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A black beam of enervating energy springs from your finger toward a criatura dentro do alcance. Make a ataque de magia à distância against the alvo. No sucesso, the alvo deals only half damage with weapon attacks that use Strength até a magia terminar.\n\nAt the end of each of the alvo's turns, it can make a Teste de resistência de Constituição against the spell. On a success, the magia termina."
  },
  {
    "name": "Reencarnar",
    "level": 5,
    "classes": [
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "1 hour",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You touch a dead humanoide or a piece of a dead humanoide. Provided that the criatura has been dead no longer than 10 days, the spell forms a new adult body for it and then calls the soul to enter that body. If the alvo's soul isn't free or willing to do so, the spell fails.\n\nThe magic fashions a new body for the criatura to inhabit, which likely causes the criatura's race to change. The DM rolls a d100 and consults the following table to determine what form the criatura takes when restored to life, or the DM d100Race01-04Dragãoborn05-13Dwarf, hill14-21Dwarf, mountain22-25Elf, dark26-34Elf, high35-42Elf, wood43-46Gnome, forest47-52Gnome, rock53-56Half-elf57-60Half-orc61-68Halfling, lightfoot69-76Halfling, stout77-96Human97-100Tiefling The reincarnated criatura recalls its former life and experiences. It retains the capabilities it had in its original form, except it exchanges its original race for the new one and changes its racial traits accordingly."
  },
  {
    "name": "Truque da Corda",
    "level": 2,
    "classes": [
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "description": "You touch a length of rope that is up to 18 metros long. One end of the rope then rises into the air until the whole rope hangs perpendicular to the grodada. At the upper end of the rope, an invisível entrance opens to an extradimensional space that lasts até a magia terminar.\n\nThe extradimensional space can be reached by climbing to the top of the rope. The space can hold as many as eight Medium or smaller criaturas. The rope can be pulled into the space, making the rope disappear from view outside the space.\n\nAttacks and spells can't cross through the entrance into or out of the extradimensional space, but those inside can see out of it as if through a 3-foot-by-1,5 metro window centered on the rope.\n\nAnything inside the extradimensional space drops out when the magia termina."
  },
  {
    "name": "Scorching Ray",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantâneo",
    "description": "Você cria three rays of fire and hurl them at alvos dentro do alcance. You can hurl them at one alvo or several.\n\nMake a ataque de magia à distância for each ray. No sucesso, the alvo takes 2d6 dano de fogo."
  },
  {
    "name": "Escrutinar",
    "level": 5,
    "classes": [
      "Bardo",
      "Clérigo",
      "Druida",
      "Bruxo",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "10 minutes",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "Que você possa ver and hear a particular criatura you choose that is on the same plane of existence as you. The alvo must make a Teste de resistência de Sabedoria, which is modified by how well you know the alvo and the sort of physical connection you have to it. If a alvo knows you're casting this spell, it can fail the teste de resistência voluntarily if it wants to be observed. KnowledgeSave ModifierSecondhand (you have heard of the alvo)+5Firsthand (you have met the alvo)0Familiar (you know the alvo well)-5ConnectionSave ModifierLikeness or picture-2Possession or garment-4Body part, lock of hair, bit of nail, or the like-10 Em um teste de resistência bem-sucedido, the alvo isn't affected, and you can't use this spell against it again for 24 horas. Em um teste de resistência falho, the spell creates an invisível sensor a até 3 metros of the alvo. Que você possa ver and hear through the sensor as if you were there. The sensor moves with the alvo, remaining a até 3 metros of it for the duration. A criatura that can see invisível objects sees the sensor as a luminous orb about the size of your fist.\n\nInstead of alvoing a criatura, you can choose a location you have seen before as the alvo of this spell. When you do, the sensor appears at that location and doesn’t move."
  },
  {
    "name": "Aparência",
    "level": 5,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "8 horas",
    "description": "This spell allows you to change the appearance of any number of criaturas that que você possa ver dentro do alcance. You give each alvo you choose a new, illusory appearance. An unwilling alvo can make a Teste de resistência de Carisma, and if it succeeds, it is unaffected by this spell.\n\nThe spell disguises physical appearance as well as clothing, armor, weapons, and equipment. You can make each criatura seem 1 foot shorter or taller and appear thin, fat, or in between. You can't change a alvo's body type, so you must choose a form that has the same basic arrangement of limbs. Otherwise, the extent of the illusion is up to you. The spell lasts for the duration, unless you use your ação to disfalha it sooner.\n\nThe changes wrought by this spell fail to hold up to physical inspection. For example, if you use this spell to add a hat to a criatura's outfit, objects pass through the hat, and anyone who touches it would feel nothing or would feel the criatura's head and hair. If you use this spell to appear thinner than you are, the hand of someone who reaches out to touch you would bump into you while it was seemingly still in midair.\n\nA criatura can use its ação to inspect a alvo and make an Intelligence (Investigation) check against your CD de resistência de magia. If it succeeds, it becomes aware that the alvo is disguised."
  },
  {
    "name": "Ver Invisibilidade",
    "level": 2,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "1 hora",
    "description": "For the duration, you see invisível criaturas and objects as if they were visible, and que você possa ver into the Ethereal Plane. Ethereal criaturas and objects appear ghostly and translucent."
  },
  {
    "name": "Estilhaçar",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "A sudden loud ringing noise, painfully intense, erupts from a point of your choice dentro do alcance. Each criatura in a lO-foot-radius sphere centered on that point must make a Teste de resistência de Constituição. A criatura takes 3d8 dano sônico em um teste de resistência falho, or metade do dano on a successful one. A criatura made of inorganic material such as stone, crystal, or metal has desvantagem on this teste de resistência.\n\nA nonmagical object that isn't being worn or carried also takes the damage if it's in the spell's area."
  },
  {
    "name": "Escalar como Aranha",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 hour",
    "description": "Até a magia terminar, one criatura voluntária you touch gains the ability to move up, down, and across vertical surfaces and upside down along ceilings, while leaving its hands free. The alvo also gains a c1imbing velocidade equal to its walking velocidade."
  },
  {
    "name": "Crescimento de Espinhos",
    "level": 2,
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "The grodada in a raio de 6 metros centered on a point dentro do alcance twists and sprouts hard spikes and thorns. The area becomes difficult terrain for the duration. When a criatura moves into or within the area, it takes 2d4 dano perfurante for every 1,5 metro it travels.\n\nThe transformation of the grodada is camouflaged to look natural. Any criatura that can't see the area at the time the spell is cast must make a Wisdom (Perception) check against your CD de resistência de magia to recognize the terrain as hazardous before entering it."
  },
  {
    "name": "Staggering Smite",
    "level": 4,
    "classes": [
      "Paladino"
    ],
    "school": "Evocação",
    "castingTime": "1 bonus ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "The next time you sucesso a criatura with a ataque corpo a corpo com arma during this spell's duration, your weapon pierces both body and mind, and the attack deals an extra 4d6 dano psíquico to the alvo. The alvo must make a Teste de resistência de Sabedoria. Em um teste de resistência falho, it has desvantagem on jogada de ataques and teste de habilidades, and can't take reaçãos, until the end of its next turn."
  },
  {
    "name": "Moldar Pedra",
    "level": 4,
    "classes": [
      "Clérigo",
      "Druida",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You touch a stone object of Medium size or smaller or a section of stone no more than 1,5 metro in any dimension and form it into any shape that suits your purpose. So, for example, you could shape a large rock into a weapon, idol, or coffer, or make a small passage through a wall, as long as the wall is less than 1,5 metro thick. You could also shape a stone door or its frame to seal the door shut. The object Você cria can have up to two hinges and a latch, but finer mechanical detail isn’t possible."
  },
  {
    "name": "Raio de Sol",
    "level": 6,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Self (60-foot line)",
    "duration": "Concentração, up to 1 minute",
    "description": "A beam of brilliant light flashes out from your hand in a 1,5 metro-wide, 18 metros-long line. Each criatura in the line must make a Teste de resistência de Constituição. Em um teste de resistência falho, a criatura takes 6d8 dano radiante and is cego until your next turn. Em um teste de resistência bem-sucedido, it takes metade do dano and isn't cego by this spell. Mortos-vivos and gosmas have desvantagem on this teste de resistência.\n\nYou can create a new line of radiance as your ação on any turn até a magia terminar.\n\nFor the duration, a mote of brilliant radiance shines in your hand. It sheds bright light in a 9 metros radius and dim light for an additional 9 metros. This light is sunlight."
  },
  {
    "name": "Pele de Pedra",
    "level": 4,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Patrulheiro",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 hour",
    "description": "This spell turns the flesh of a criatura voluntária you touch as hard as stone. Até a magia terminar, the alvo has resistance to nonmagical bludgeoning, piercing, and dano cortante."
  },
  {
    "name": "Aljava Veloz",
    "level": 5,
    "classes": [
      "Patrulheiro"
    ],
    "school": "Transmutação",
    "castingTime": "1 bonus ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 minute",
    "description": "You transmute your quiver so it produces an endless supply of nonmagical ammunition, which seems to leap into your hand when you reach for it.\n\nOn each of your turns até a magia terminar, you can use a ação bônus to make two attacks with a weapon that uses ammunition from the quiver. Each time you make such a ranged attack, your quiver magically replaces the piece of ammunition you used with a similar piece of nonmagical ammunition. Any pieces of ammunition created by this spell disintegrate when the magia termina. If the quiver leaves your possession, the magia termina."
  },
  {
    "name": "Telecinese",
    "level": 5,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "You gain the ability to move or manipulate criaturas or objects by thought. When você conjura a magia, and as your ação each rodada for the duration, you can exert your will on one criatura or object that que você possa ver dentro do alcance, causing the appropriate effect below. You can affect the same alvo rodada after rodada, or choose a new one at any time. If you switch alvos, the prior alvo is no longer affected by the spell. \n\nCriatura: You can try to move a Huge or smaller criatura. Make an teste de habilidade with your atributo de conjuração contested by the criatura's Strength check. If you win the contest, you move the criatura up to 9 metros in any direction, including upward but not beyond the range of this spell. Until the end of your next turn, the criatura is imobilizado in your telekinetic grip. A criatura lifted upward is suspended in mid-air. \n\n On subsequent rodadas, you can use your ação to attempt to maintain your telekinetic grip on the criatura by repeating the contest. \n\nObject: You can try to move an object that weighs up to 1,000 pounds. If the object isn't being worn or carried, you automatically move it up to 9 metros in any direction, but not beyond the range of this spell. \n\n If the object is worn or carried by a criatura, you must make an teste de habilidade with your atributo de conjuração contested by that criatura's Strength check. If you succeed, you pull the object away from that criatura and can move it up to 9 metros in any direction but not beyond the range of this spell. \n\n You can exert fine control on objects with your telekinetic grip, such as manipulating a simple tool, opening a door or a container, stowing or retrieving an item from an open container, or pouring the contents from a vial."
  },
  {
    "name": "Círculo de Teletransporte",
    "level": 5,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 minute",
    "range": "3 metros",
    "duration": "1 rodada",
    "description": "As você conjura a magia, you draw a 3 metros-diameter circle on the grodada inscribed with sigils that link your location to a permanent teleportation circle of your choice, whose sigil sequence you know and that is on the same plane of existence as you. A shimmering portal opens within the circle you drew and remains open until the end of your next turn. Any criatura that enters the portal instantly appears a até 1,5 metro of the destination circle or in the nearest unoccupied space if that space is occupied.\n\nMany major temples, guilds, and other important places have permanent teleportation circles inscribed somewhere within their confines. Each such circle includes a unique sigil sequence - a string of magical runes arranged in a particular pattern. When you first gain the ability to cast this spell, you learn the sigil sequences for two destinations on the Material Plane, determined by the DM. You can learn additional sigil sequences during your adventures. You can commit a new sigil sequence to memory after studying it for 1 minuto.\n\nYou can create a permanent teleportation circle by casting this spell in the same location every day for one year. You need not use the circle to teleport when você conjura a magia in this way."
  },
  {
    "name": "Transporte via Plantas",
    "level": 6,
    "classes": [
      "Druida"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "3 metros",
    "duration": "1 rodada",
    "description": "This spell creates a magical link between a Large or larger inanimate planta dentro do alcance and another planta, at any distance, on the same plane of existence. You must have seen or touched the destination planta at least once before. For the duration, any criatura can step into the alvo planta and exit from the destination planta by using 1,5 metro of movimento."
  },
  {
    "name": "Passo Arbóreo",
    "level": 5,
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "You gain the ability to enter a tree and move from inside it to inside another tree of the same kind within 500 feet. Both trees must be living and at least the same size as you. You must use 1,5 metro of movimento to enter a tree. You instantly know the location of all other trees of the same kind within 500 feet and, as part of the move used to enter the tree, can either pass into one of those trees or step out of the tree you're in. You appear in a spot of your choice a até 1,5 metro of the destination tree, using another 1,5 metro of movimento. If you have no movimento left, you appear a até 1,5 metro of the tree you entered.\n\nYou can use this transportation ability once per rodada for the duration. You must end each turn outside a tree."
  },
  {
    "name": "Visão Verdadeira",
    "level": 6,
    "classes": [
      "Bardo",
      "Clérigo",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "1 hora",
    "description": "This spell gives the criatura voluntária you touch the ability to see things as they actually are. For the duration, the criatura has truesight, notices secret doors hidden by magic, and can see into the Ethereal Plane, all out to a range of 36 metros."
  },
  {
    "name": "Toque Vampírico",
    "level": 3,
    "classes": [
      "Bruxo",
      "Mago"
    ],
    "school": "Necromancia",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "The touch of your shadow-wreathed hand can siphon life force from others to heal your wounds. Make a ataque de magia corpo a corpo against a criatura within your reach. No sucesso, the alvo takes 3d6 dano necrótico, and you regain pontos de vida equal to half the amount of dano necrótico dealt. Até a magia terminar, you can make the attack again on each of your turns as an ação."
  },
  {
    "name": "Muro de Fogo",
    "level": 4,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você cria a wall of fire on a solid surface dentro do alcance. You can make the wall up to 18 metros long, 20 feet high, and 1 foot thick, or a ringed wall up to 20 feet in diameter, 20 feet high, and 1 foot thick. The wall is opaque and lasts for the duration.\n\nWhen the wall appears, each criatura within its area must make a Teste de resistência de Destreza. Em um teste de resistência falho, a criatura takes 5d8 dano de fogo, or metade do dano em um teste de resistência bem-sucedido.\n\nOne side of the wall, selected by you Quando você conjura essa magia, deals 5d8 dano de fogo to each criatura that ends its turn a até 3 metros of that side or inside the wall. A criatura takes the same damage when it enters the wall for the first time on a turn or ends its turn there. The other side of the wall deals no damage."
  },
  {
    "name": "Muro de Gelo",
    "level": 6,
    "classes": [
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Você cria a wall of ice on a solid surface dentro do alcance. You can form it into a hemispherical dome or a sphere with a radius of up to 3 metros, or you can shape a flat surface made up of ten 3 metros-square panels. Each panel must be contiguous with another panel. In any form, the wall is 1 foot thick and lasts for the duration.\n\nIf the wall cuts through a criatura’s space when it appears, the criatura within its area is pushed to one side of the wall and must make a Teste de resistência de Destreza. Em um teste de resistência falho, the criatura takes 10d6 dano de frio, or metade do dano em um teste de resistência bem-sucedido.\n\nThe wall is an object that can be damaged and thus breached. It has AC 12 and 30 pontos de vida per 3 metros section, and it is vulnerable to dano de fogo. Reducing a 3 metros section of wall to 0 pontos de vida destroys it and leaves behind a sheet of frigid air in the space the wall occupied. A criatura moving through the sheet of frigid air for the first time on a turn must make a Teste de resistência de Constituição. That criatura takes 5d6 dano de frio em um teste de resistência falho, or metade do dano on a successful one."
  },
  {
    "name": "Muro de Força",
    "level": 5,
    "classes": [
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "An invisível wall of force springs into existence at a point you choose dentro do alcance. The wall appears in any orientation you choose, as a horizontal or vertical barrier or at an angle. It can be free floating or resting on a solid surface. You can form it into a hemispherical dome or a sphere with a radius of up to 3 metros, or you can shape a flat surface made up of ten 3 metros-by-3 metros panels. Each panel must be contiguous with another panel. In any form, the wall is 1/4 inch thick. It lasts for the duration. If the wall cuts through a criatura’s space when it appears, the criatura is pushed to one side of the wall (your choice which side).\n\nNothing can physically pass through the wall. It is immune to all damage and can’t be dispelled by dispel magic (lvl 3). A disintegrate (lvl 6) spell destroys the wall instantly, however. The wall also extends into the Ethereal Plane, blocking ethereal travel through the wall."
  },
  {
    "name": "Muro de Pedra",
    "level": 5,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "A nonmagical wall of solid stone springs into existence at a point you choose dentro do alcance. The wall is 6 inches thick and is composed of ten 3 metros-by-3 metros panels. Each panel must be contiguous with at least one other panel. Alternatively, you can create 3 metros-by-20-foot panels that are only 3 inches thick.\n\nIf the wall cuts through a criatura's space when it appears, the criatura is pushed to one side of the wall (your choice). If a criatura would be surrodadaed on all sides by the wall (or the wall and another solid surface), that criatura can make a Teste de resistência de Destreza. On a success, it can use its reação to move up to its velocidade so that it is no longer enclosed by the wall.\n\nThe wall can have any shape you desire, though it can't occupy the same space as a criatura or object. The wall doesn't need to be vertical or rest on any firm foundation. It must, however, merge with and be solidly supported by existing stone. Thus, you can use this spell to bridge a chasm or create a ramp.\n\nIf Você cria a span greater than 20 feet in length, you must halve the size of each panel to create supports. You can crudely shape the wall to create crenellations, battlements, and so on.\n\nThe wall is an object made of stone that can be damaged and thus breached. Each panel has AC 15 and 30 pontos de vida per inch of thickness. Reducing a panel to 0 pontos de vida destroys it and might cause connected panels to collapse at the DM’s discretion.\n\nIf you maintain your concentração on this spell for its whole duration, the wall becomes permanent and can't be dispelled. Otherwise, the wall disappears when the magia termina."
  },
  {
    "name": "Muro de Espinhos",
    "level": 6,
    "classes": [
      "Druida"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Você cria a wall of tough, pliable, tangled brush bristling with needle-sharp thorns. The wall appears dentro do alcance on a solid surface and lasts for the duration. You choose to make the wall up to 18 metros long, 3 metros high, and 1,5 metro thick or a circle that has a 20-foot diameter and is up to 20 feet high and 1,5 metro thick. The wall blocks line of sight.\n\nWhen the wall appears, each criatura within its area must make a Teste de resistência de Destreza. Em um teste de resistência falho, a criatura takes 7d8 dano perfurante, or metade do dano em um teste de resistência bem-sucedido.\n\nA criatura can move through the wall, albeit slowly and painfully. For every 1 foot a criatura moves through the wall, it must spend 4 feet of movimento. Furthermore, the first time a criatura enters the wall on a turn or ends its turn there, the criatura must make a Teste de resistência de Destreza. It takes 7d8 dano cortante em um teste de resistência falho, or metade do dano on a successful one."
  },
  {
    "name": "Respirar na Água",
    "level": 3,
    "classes": [
      "Druida",
      "Patrulheiro",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "24 horas",
    "description": "This spell grants up to ten criaturas voluntárias que você possa ver dentro do alcance the abilily to breathe underwater até a magia terminar. Affected criaturas also retain their normal mode of respiration."
  },
  {
    "name": "Caminhar nas Águas",
    "level": 3,
    "classes": [
      "Clérigo",
      "Druida",
      "Patrulheiro",
      "Feiticeiro"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 hora",
    "description": "This spell grants the ability to move across any liquid surface--such as water, acid, mud, snow, quicksand, or lava--as if it were harmless solid grodada (criaturas crossing molten lava can still take damage from the heal). Up to ten criaturas voluntárias que você possa ver dentro do alcance gain this abilily for the duration.\n\nlf you alvo a criatura submerged in a liquid, the spell carries the alvo to the surface of the liquid at a rate of 18 metros per rodada."
  },
  {
    "name": "Teia",
    "level": 2,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "Você conjura a mass of thick, sticky webbing at a point of your choice dentro do alcance. The webs fill a cubo de 6 metros from that point for the duration. The webs are difficult terrain and lightly obscure their area.\n\nIf the webs aren't anchored between two solid masses (such as walls or trees) or layered across a floor, wall, or ceiling, the conjured web collapses on itself, and the magia termina at the start of your next turn. Webs layered over a flat surface have a depth of 1,5 metro.\n\nEach criatura that starts its turn in the webs or that enters them during its turn must make a Teste de resistência de Destreza. Em um teste de resistência falho, the criatura is imobilizado as long as it remains in the webs or until it breaks free.\n\nA criatura imobilizado by the webs can use its ação to make a Strength check against your CD de resistência de magia. If it suceeeds, it is no longer imobilizado.\n\nThe webs are flammable. Any 1,5 metro cube of webs exposed to fire burns away in 1 rodada, dealing 2d4 dano de fogo to any criatura that starts its turn in the fire."
  },
  {
    "name": "Caminhar no Vento",
    "level": 6,
    "classes": [
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "1 minute",
    "range": "9 metros",
    "duration": "8 horas",
    "description": "You and up to ten criaturas voluntárias que você possa ver dentro do alcance assume a gaseous form for the duration, appearing as wisps of cloud. While in this cloud form, a criatura has a flying velocidade of 300 feet and has resistance to damage from nonmagical weapons. The only ações a criatura can take in this form are the Dash ação or to revert to its normal form. Reverting takes 1 minuto, during which time a criatura is incapacitado and can’t move. Até a magia terminar, a criatura can revert to cloud form, which also requires the 1-minuto transformation.\n\nIf a criatura is in cloud form and flying when the effect ends, the criatura descends 18 metros per rodada for 1 minuto until it lands, which it does safely. If it can’t land after 1 minuto, the criatura falls the remaining distance."
  },
  {
    "name": "Muro de Vento",
    "level": 3,
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A wall of strong wind rises from the grodada at a point you choose dentro do alcance. You can make the wall up to 50 feet long, 4,5 metros high, and 1 foot thick. You can shape the wall in any way you choose so long as it makes one continuous path along the grodada. The wall lasts for the duration.\n\nWhen the wall appears, each criatura within its area must make a Teste de resistência de Força. A criatura takes 3d8 dano de concussão em um teste de resistência falho, or metade do dano on a successful one.\n\nThe strong wind keeps fog, smoke, and other gases at bay. Small or smaller flying criaturas or objects can't pass through the wall. Loose, lightweight materials brought into the wall fly upward. Arrows, bolts, and other ordinary projectiles launched at alvos behind the wall are deflected upward and automatically falha. (Boulders hurled by gigantes or siege engines, and similar projectiles, are unaffected.) Criaturas in gaseous form can’t pass through it."
  },
  {
    "name": "Palavra de Retorno",
    "level": 6,
    "classes": [
      "Clérigo"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "2 metros",
    "duration": "Instantâneo",
    "description": "You and up to five criaturas voluntárias a até 1,5 metro of you instantly teleport to a previously designated sanctuary. You and any criaturas that teleport with you appear in the nearest unoccupied space to the spot you designated when you prepared your sanctuary (see below). If you cast this spell without first preparing a sanctuary, the spell has no effect.\n\nYou must designate a sanctuary by casting this spell within a location, such as a temple, dedicated to or strongly linked to your deity. If you attempt to cast the spell in this manner in an area that isn’t dedicated to your deity, the spell has no effect."
  },
  {
    "name": "Zona da Verdade",
    "level": 2,
    "classes": [
      "Bardo",
      "Clérigo",
      "Paladino"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "10 minutos",
    "description": "Você cria a magical zone that guards against deception in a 4,5 metros-radius sphere centered on a point of your choice dentro do alcance. Até a magia terminar, a criatura that enters the spell's area for the first time on turn or starts its turn there must make a Teste de resistência de Carisma. Em um teste de resistência falho, a criatura can't speak a deliberate lie while in the radius. you know whether each criatura succeeds or fails on its teste de resistência.\n\nAn affected criatura is aware of the spell and can thus avoid answering questions to which it would normally respond with a lie. Such a criatura can be evasive in its answers as long as it remains within the boundaries of the truth."
  },
  {
    "name": "Tremor de Terra",
    "level": 1,
    "classes": [
      "Bardo",
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Self (10-foot radius)",
    "duration": "Instantâneo",
    "description": "Você causa a tremor in the grodada in a raio de 3 metros. Each criatura other than you in that area must make a Teste de resistência de Destreza. Em um teste de resistência falho, a criatura takes 1d6 dano de concussão and is knocked caído. If the grodada in that area is loose earth or stone, it becomes difficult terrain until cleared."
  },
  {
    "name": "Pirotecnia",
    "level": 2,
    "classes": [
      "Bardo",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "Choose an area of nonmagical flame that que você possa ver and that fits within a 1,5 metro cube dentro do alcance. You can extinguish the fire in that area, and Você cria either fireworks or smoke when you do so. \n\nFireworks: The alvo explodes with a dazzling display of colors. Each criatura a até 3 metros of the alvo must succeed on a Teste de resistência de Constituição or become cego until the end of your next turn. \n\nSmoke: Thick black smoke spreads out from the alvo in a raio de 6 metros, moving arodada corners. The area of the smoke is heavily obscured. The smoke persists for 1 minuto or until a strong wind disperses it."
  },
  {
    "name": "Escrever no Céu",
    "level": 2,
    "classes": [
      "Bardo",
      "Druida",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Sight",
    "duration": "Concentração, up to 1 hour",
    "description": "Você causa up to ten words to form in a part of the sky que você possa ver. The words appear to be made of cloud and remain in place for the spell’s duration. The words dissipate when the magia termina. A strong wind can disperse the clouds and end the spell early."
  },
  {
    "name": "Trovejada",
    "level": 0,
    "classes": [
      "Bardo",
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Self (5-foot radius)",
    "duration": "Instantâneo",
    "description": "Você cria a burst of thunderous sound, which can be heard 100 feet away. Each criatura other than you a até 1,5 metro of you must make a Teste de resistência de Constituição. Em um teste de resistência falho, the criatura takes 1d6 dano sônico.\n\nThe spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
  },
  {
    "name": "Vento de Proteção",
    "level": 2,
    "classes": [
      "Bardo",
      "Druida",
      "Feiticeiro"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "A strong wind (20 miles per hora) blows arodada you in a raio de 3 metros and moves with you, remaining centered on you. The wind lasts for the spell’s duration. It deafens you and other criaturas in its area.It extinguishes unprotected flames in its area that are torch-sized or smaller.The area is difficult terrain for criaturas other than you.The jogada de ataques of ataque à distância com armas have desvantagem if they pass in or out of the wind.It hedges out vapor, gas, and fog that can be dispersed by strong wind."
  },
  {
    "name": "Controlar Chamas",
    "level": 0,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "You choose nonmagical flame that que você possa ver dentro do alcance and that fits within a 1,5 metro cube. You affect it in one of the following ways:  You Instantâneoly expand the flame 1,5 metro in one direction, provided that wood or other fuel is present in the new location.  You Instantâneoly extinguish the flames within the cube.  You double or halve the area of bright light and dim light cast by the flame, change its color, or both. The change lasts for 1 hora.  Você causa simple shapes—such as the vague form of a criatura, an inanimate object, or a location—to appear within the flames and animate as you like. The shapes last for 1 hora.  If you cast this spell multiple times, you can have up to three of its non-Instantâneo effects active at a time, and you can disfalha such an effect as an ação."
  },
  {
    "name": "Criar Fogueira",
    "level": 0,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você cria a bonfire on grodada that que você possa ver dentro do alcance. Até a magia terminar, the bonfire fills a 1,5 metro cube. Any criatura in the bonfire’s space when você conjura a magia must succeed on a Teste de resistência de Destreza or take 1d8 dano de fogo. A criatura must also make the teste de resistência when it enters the bonfire’s space for the first time on a turn or ends its turn there.\n\nThe spell’s damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8)."
  },
  {
    "name": "Queimadura de Gelo",
    "level": 0,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "Você causa numbing frost to form on one criatura that que você possa ver dentro do alcance. The alvo must make a Teste de resistência de Constituição. Em um teste de resistência falho, the alvo takes 1d6 dano de frio, and it has desvantagem on the next weapon jogada de ataque it makes before the end of its next turn.\n\nThe spell’s damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6)."
  },
  {
    "name": "Rajada",
    "level": 0,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "You seize the air and compel it to create one of the following effects at a point que você possa ver dentro do alcance: One Medium or smaller criatura that you choose must succeed on a Teste de resistência de Força or be pushed up to 1,5 metro away from you.Você cria a small blast of air capable of moving one object that is neither held nor carried and that weighs no more than 5 pounds. The object is pushed up to 3 metros away from you. It isn’t pushed with enough force to cause damage.Você cria a harmless sensory affect using air, such as causing leaves to rustle, wind to slam shutters shut, or your clothing to ripple in a breeze."
  },
  {
    "name": "Pedra Mágica",
    "level": 0,
    "classes": [
      "Druida",
      "Bruxo"
    ],
    "school": "Transmutação",
    "castingTime": "1 bonus ação",
    "range": "Toque",
    "duration": "1 minuto",
    "description": "You touch one to three pebbles and imbue them with magic. You or someone else can make a ataque de magia à distância with one of the pebbles by throwing it or hurling it with a sling. If thrown, it has a range of 18 metros. If someone else attacks with the pebble, that attacker adds your atributo de conjuração modifier, not the attacker’s, to the jogada de ataque. No sucesso, the alvo takes dano de concussão equal to 1d6 + your atributo de conjuração modifier. Sucesso or falha, the spell then ends on the stone.\n\nIf you cast this spell again, the magia termina early on any pebbles still affected by it."
  },
  {
    "name": "Moldar a Terra",
    "level": 0,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "You choose a portion of dirt or stone that que você possa ver dentro do alcance and that fits within a 1,5 metro cube. You manipulate it in one of the following ways: If you alvo an area of loose earth, you can Instantâneoly excavate it, move it along the grodada, and deposit it up to 1,5 metro away. This movimento doesn’t have enough force to cause damage.Você causa shapes, colors, or both to appear on the dirt or stone, spelling out words, creating images, or shaping patterns. The changes last for 1 hora.If the dirt or stone you alvo is on the grodada, Você causa it to become difficult terrain. Alternatively, you can cause the grodada to become normal terrain if it is already difficult terrain. This change lasts for 1 hora. If you cast this spell multiple times, you can have no more than two of its non-Instantâneo effects active at a time, and you can disfalha such an effect as an ação."
  },
  {
    "name": "Modelar Água",
    "level": 0,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Instantâneo",
    "description": "You choose an area of water that que você possa ver dentro do alcance and that fits within a 1,5 metro cube. You manipulate it in one of the following ways:  You Instantâneoly move or otherwise change the flow of the water as you direct, up to 1,5 metro in any direction. This movimento doesn’t have enough force to cause damage.  Você causa the water to form into simple shapes and animate at your direction. This change lasts for 1 hora.  You change the water’s color or opacity. The water must be changed in the same way throughout. This change lasts for 1 hora.  You freeze the water, provided that there are no criaturas in it. The water unfreezes in 1 hora.  If you cast this spell multiple times, you can have no more than two of its non-Instantâneo effects active at a time, and you can disfalha such an effect as an ação."
  },
  {
    "name": "Absorver Elementos",
    "level": 1,
    "classes": [
      "Druida",
      "Patrulheiro",
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "1 reação, which you take when you take acid, cold, fire, lightning, or thunder damage",
    "range": "Si mesmo",
    "duration": "1 rodada",
    "description": "The spell captures some of the incoming energy, lessening its effect on you and storing it for your next melee attack. You have resistance to the triggering damage type until the start of your next turn. Also, the first time you sucesso with a melee attack on your next turn, the alvo takes an extra 1d6 damage of the triggering type, and the magia termina."
  },
  {
    "name": "Beast Bond",
    "level": 1,
    "classes": [
      "Druida",
      "Patrulheiro"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 10 minutes",
    "description": "You establish a telepathic link with one besta you touch that is friendly to you or enfeitiçado by you. The spell fails if the besta’s Intelligence is 4 ou superior. Até a magia terminar, the link is active while you and the besta are within line of sight of each other. Through the link, the besta can understand your telepathic messages to it, and it can telepathically communicate simple emotions and concepts back to you. While the link is active, the besta gains vantagem on jogada de ataques against any criatura a até 1,5 metro of you that que você possa ver."
  },
  {
    "name": "Faca de Gelo",
    "level": 1,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Instantâneo",
    "description": "Você cria a shard of ice and fling it at one criatura dentro do alcance. Make a ataque de magia à distância against the alvo. No sucesso, the alvo takes 1d10 dano perfurante. Sucesso or falha, the shard then explodes. The alvo and each criatura a até 1,5 metro of the point where the ice exploded must succeed on a Teste de resistência de Destreza or take 2d6 dano de frio."
  },
  {
    "name": "Prender à Terra",
    "level": 2,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "90 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Escolha uma criatura que você possa ver dentro do alcance. Yellow strips of magical energy loop arodada the criatura. The alvo must succeed on a Teste de resistência de Força or its flying velocidade (if any) is reduced to 0 feet for the spell’s duration. An airborne criatura affected by this spell descends at 18 metros per rodada until it reaches the grodada or the magia termina."
  },
  {
    "name": "Redemoinho de Poeira",
    "level": 2,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Choose an unoccupied 1,5 metro cube of air that que você possa ver dentro do alcance. An elemental force that resembles a dust devil appears in the cube and lasts for the spell’s duration.\n\nAny criatura that ends its turn a até 1,5 metro of the dust devil must make a Teste de resistência de Força. Em um teste de resistência falho, the criatura takes 1d8 dano de concussão and is pushed 3 metros away. Em um teste de resistência bem-sucedido, the criatura takes metade do dano and isn’t pushed.\n\nAs a ação bônus, you can move the dust devil up to 9 metros in any direction. If the dust devil moves over sand, dust, loose dirt, or small gravel, it sucks up the material and forms a 3 metros-radius cloud of debris arodada itself that lasts until the start of your next turn. The cloud heavily obscures its area."
  },
  {
    "name": "Catapulta",
    "level": 1,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantâneo",
    "description": "Escolha uma object weighing 1 to 5 pounds dentro do alcance that isn’t being worn or carried. The object flies in a straight line up to 27 metros in a direction you choose before falling to the grodada, stopping early if it impacts against a solid surface. If the object would strike a criatura, that criatura must make a Teste de resistência de Destreza. Em um teste de resistência falho, the object strikes the alvo and stops moving. In either case, both the object and the criatura or solid surface take 3d8 dano de concussão."
  },
  {
    "name": "Controlar Ventos",
    "level": 5,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "90 metros",
    "duration": "Concentração, up to 1 hour",
    "description": "You take control of the air in a 100-foot cube that que você possa ver dentro do alcance. Escolha uma of the following effects when você conjura a magia. The effect lasts for the spell’s duration, unless you use your ação on a later turn to switch to a different effect. You can also use your ação to temporarily halt the effect or to restart one you’ve halted. \n\nGusts: A wind picks up within the cube, continually blowing in a horizontal direction you designate. You choose the intensity of the wind: calm, moderate, or strong. If the wind is moderate or strong, ataque à distância com armas that enter or leave the cube or pass through it have desvantagem on their jogada de ataques. If the wind is strong, any criatura moving against the wind must spend 1 extra foot of movimento for each foot moved. \n\nDowndraft: Você causa a sustained blast of strong wind to blow downward from the top of the cube. Ataque à distância com armas that pass through the cube or that are made against alvos within it have desvantagem on their jogada de ataques. A criatura must make a Teste de resistência de Força if it flies into the cube for the first time on a turn or starts its turn there flying. Em um teste de resistência falho, the criatura is knocked caído. \n\nUpdraft: Você causa a sustained updraft within the cube, rising upward from the cube’s bottom side. Criaturas that end a fall within the cube take only half damage from the fall. When a criatura in the cube makes a vertical jump, the criatura can jump up to 3 metros higher than normal."
  },
  {
    "name": "Bones of the Earth",
    "level": 6,
    "classes": [
      "Druida"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantâneo",
    "description": "Você causa up to six pillars of stone to burst from places on the grodada that que você possa ver dentro do alcance. Each pillar is a cylinder that has a diameter of 1,5 metro and a height of up to 9 metros. The grodada where a pillar appears must be wide enough for its diameter, and you can alvo grodada under a criatura if that criatura is Medium or smaller. Each pillar has AC 5 and 30 pontos de vida. When reduced to 0 pontos de vida, a pillar crumbles into rubble, which creates an area of difficult terrain with a raio de 3 metros. The rubble lasts until cleared.\n\nIf a pillar is created under a criatura, that criatura must succeed on a Teste de resistência de Destreza or be lifted by the pillar. A criatura can choose to fail the save.\n\nIf a pillar is prevented from reaching its full height because of a ceiling or other obstacle, a criatura on the pillar takes 6d6 dano de concussão and is imobilizado, pinched between the pillar and the obstacle. The imobilizado criatura can use an ação to make a Strength or Dexterity check (the criatura’s choice) against the spell’s teste de resistência DC. On a success, the criatura is no longer imobilizado and must either move off the pillar or fall off it."
  },
  {
    "name": "Terra em Erupção",
    "level": 3,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantâneo",
    "description": "Choose a point que você possa ver on the grodada dentro do alcance. A fountain of churned earth and stone erupts in a cubo de 6 metros centered on that point. Each criatura in that area must make a Teste de resistência de Destreza. A criatura takes 3d12 dano de concussão em um teste de resistência falho, or metade do dano on a successful one. Additionally, the grodada in that area becomes difficult terrain until cleared away. Each 1,5 metro-square portion of the area requires at least 1 minuto to clear by hand."
  },
  {
    "name": "Perdição Elemental",
    "level": 4,
    "classes": [
      "Druida",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Escolha uma criatura que você possa ver dentro do alcance, and escolha uma of the following damage types: acid, cold, fire, lightning, or thunder. The alvo must succeed on a Teste de resistência de Constituição or be affected by the spell for its duration. The first time each turn the affected alvo takes damage of the chosen type, the alvo takes an extra 2d6 damage of that type. Moreover, the alvo loses any resistance to that damage type até a magia terminar."
  },
  {
    "name": "Flechas em Chamas",
    "level": 3,
    "classes": [
      "Druida",
      "Patrulheiro",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Concentração, up to 1 hour",
    "description": "You touch a quiver containing arrows or bolts. When a alvo is sucesso by a ataque à distância com arma using a piece of ammunition drawn from the quiver, the alvo takes an extra 1d6 dano de fogo. The spell’s magic ends on the piece of ammunition when it sucessos or falhaes, and the magia termina when twelve pieces of ammunition have been drawn from the quiver."
  },
  {
    "name": "Investidura de Chamas",
    "level": 6,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "Flames race across your body, shedding bright light in a 9 metros radius and dim light for an additional 9 metros for the spell’s duration. The flames don’t harm you. Até a magia terminar, you gain the following benefits: You are immune to dano de fogo and have resistance to dano de frio.Any criatura that moves a até 1,5 metro of you for the first time on a turn or ends its turn there takes 1d10 dano de fogo.You can use your ação to create a line of fire 4,5 metros long and 1,5 metro wide extending from you in a direction you choose. Each criatura in the line must make a Teste de resistência de Destreza. A criatura takes 4d8 dano de fogo em um teste de resistência falho, or metade do dano on a successful one."
  },
  {
    "name": "Investidura de Gelo",
    "level": 6,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "Até a magia terminar, ice rimes your body, and you gain the following benefits: You are immune to dano de frio and have resistance to dano de fogo.You can move across difficult terrain created by ice or snow without spending extra movimento.The grodada in a raio de 3 metros arodada you is icy and is difficult terrain for criaturas other than you. The radius moves with you.You can use your ação to create a 4,5 metros cone of freezing wind extending from your outstretched hand in a direction you choose. Each criatura in the cone must make a Teste de resistência de Constituição. A criatura takes 4d6 dano de frio em um teste de resistência falho, or metade do dano on a successful one. A criatura that fails its save against this effect has its velocidade halved until the start of your next turn."
  },
  {
    "name": "Investidura de Pedra",
    "level": 6,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "Até a magia terminar, bits of rock spread across your body, and you gain the following benefits: You have resistance to bludgeoning, piercing, and dano cortante from nonmagical weapons.You can use your ação to create a small earthquake on the grodada in a 4,5 metros radius centered on you. Other criaturas on that grodada must succeed on a Teste de resistência de Destreza or be knocked caído.You can move across difficult terrain made of earth or stone without spending extra movimento. You can move through solid earth or stone as if it was air and without destabilizing it, but you can’t end your movimento there. If you do so, you are ejected to the nearest unoccupied space, this magia termina, and you are atordoado until the end of your next turn."
  },
  {
    "name": "Investidura de Vento",
    "level": 6,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Bruxo",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 10 minutes",
    "description": "Até a magia terminar, wind whirls arodada you, and you gain the following benefits: Ataque à distância com armas made against you have desvantagem on the jogada de ataque.You gain a flying velocidade of 18 metros. If you are still flying when the magia termina, you fall, unless you can somehow prevent it.You can use your ação to create a 4,5 metros cube of swirling wind centered on a point que você possa ver a até 18 metros of you. Each criatura in that area must make a Teste de resistência de Constituição. A criatura takes 2d10 dano de concussão em um teste de resistência falho, or metade do dano on a successful one. If a Large or smaller criatura fails the save, that criatura is also pushed up to 3 metros away from the center of the cube."
  },
  {
    "name": "Maelstrom",
    "level": 5,
    "classes": [
      "Druida"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A mass of 1,5 metro-deep water appears and swirls in a 9 metros radius centered on a point que você possa ver dentro do alcance. The point must be on grodada or in a body of water. Até a magia terminar, that area is difficult terrain, and any criatura that starts its turn there must succeed on a Teste de resistência de Força or take 6d6 dano de concussão and be pulled 3 metros toward the center."
  },
  {
    "name": "Proteção Primordial",
    "level": 6,
    "classes": [
      "Druida"
    ],
    "school": "Abjuração",
    "castingTime": "1 ação",
    "range": "Si mesmo",
    "duration": "Concentração, up to 1 minute",
    "description": "You have resistance to acid, cold, fire, lightning, and dano sônico for the spell’s duration.\n\nWhen you take damage of one of those types, you can use your reação to gain immunity to that type of damage, including against the triggering damage. If you do so, the resistances end, and you have the immunity until the end of your next turn, at which time the magia termina."
  },
  {
    "name": "Onda Tidal",
    "level": 3,
    "classes": [
      "Druida",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantâneo",
    "description": "Você conjura up a wave of water that crashes down on an area dentro do alcance. The area can be up to 9 metros long, up to 3 metros wide, and up to 3 metros tall. Each criatura in that area must make a Teste de resistência de Destreza. On a failure, a criatura takes 4d8 dano de concussão and is knocked caído. On a success, a criatura takes metade do dano and isn’t knocked caído. The water then spreads out across the grodada in all directions, extinguishing unprotected flames in its area and a até 9 metros of it."
  },
  {
    "name": "Transmutar Rocha",
    "level": 5,
    "classes": [
      "Druida",
      "Mago"
    ],
    "school": "Transmutação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Instantâneo",
    "description": "You choose an area of stone or mud that que você possa ver that fits within a 40-foot cube and is dentro do alcance, and escolha uma of the following effects. \n\nTransmute Rock to Mud: Nonmagical rock of any sort in the area becomes an equal volume of thick, flowing mud that remains for the spell’s duration. \n\n The grodada in the spell’s area becomes muddy enough that criaturas can sink into it. Each foot that a criatura moves through the mud costs 4 feet of movimento, and any criatura on the grodada when você conjura a magia must make a Teste de resistência de Força. A criatura must also make the teste de resistência when it moves into the area for the first time on a turn or ends its turn there. Em um teste de resistência falho, a criatura sinks into the mud and is imobilizado, though it can use an ação to end the imobilizado condition on itself by pulling itself free of the mud. \n\n If você conjura a magia on a ceiling, the mud falls. Any criatura under the mud when it falls must make a Teste de resistência de Destreza. A criatura takes 4d8 dano de concussão em um teste de resistência falho, or metade do dano on a successful one. \n\nTransmute Mud to Rock. Nonmagical mud or quicksand in the area no more than 3 metros deep transforms into soft stone for the spell’s duration. Any criatura in the mud when it transforms must make a Teste de resistência de Destreza. Em um teste de resistência bem-sucedido, a criatura is shunted safely to the surface in an unoccupied space. Em um teste de resistência falho, a criatura becomes imobilizado by the rock. A imobilizado criatura, or another criatura within reach, can use an ação to try to break the rock by succeeding on a DC 20 Strength check or by dealing damage to it. The rock has AC 15 and 25 pontos de vida, and it is immune to poison and dano psíquico."
  },
  {
    "name": "Muro de Água",
    "level": 3,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Você conjura up a wall of water on the grodada at a point que você possa ver dentro do alcance. You can make the wall up to 9 metros long, 3 metros high, and 1 foot thick, or you can make a ringed wall up to 20 feet in diameter  20 feet high, and 1 foot thick. The wall vanishes when the magia termina. The wall’s space is difficult terrain.\n\nAny ataque à distância com arma that enters the wall’s space has desvantagem on the jogada de ataque, and dano de fogo is halved if the fire effect passes through the wall to reach its alvo. Spells that deal dano de frio that pass through the wall cause the area of the wall they pass through to freeze solid (at least a 1,5 metro square section is frozen). Each 1,5 metro-square frozen section has AC 5 and 15 pontos de vida. Reducing a frozen section to 0 pontos de vida destroys it. When a section is destroyed, the wall’s water doesn’t fill it."
  },
  {
    "name": "Esfera de Água",
    "level": 4,
    "classes": [
      "Druida",
      "Feiticeiro",
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você conjura up a sphere of water with a raio de 3 metros on a point que você possa ver dentro do alcance. The sphere can hover in the air, but no more than 3 metros off the grodada. The sphere remains for the spell’s duration.\n\nAny criatura in the sphere’s space must make a Teste de resistência de Força. Em um teste de resistência bem-sucedido, a criatura is ejected from that space to the nearest unoccupied space outside it. A Huge or larger criatura succeeds on the teste de resistência automatically. Em um teste de resistência falho, a criatura is imobilizado by the sphere and is engulfed by the water. At the end of each of its turns, a imobilizado alvo can repeat the teste de resistência.\n\nThe sphere can restrain a maximum of four Medium or smaller criaturas or one Large criatura. If the sphere restrains a criatura in excess of these numbers, a random criatura that was already imobilizado by the sphere falls out of it and lands caído in a space a até 1,5 metro of it.\n\nAs an ação, you can move the sphere up to 9 metros in a straight line. If it moves over a pit, cliff, or other drop, it safely descends until it is hovering 3 metros over grodada. Any criatura imobilizado by the sphere moves with it. You can ram the sphere into criaturas, forcing them to make the teste de resistência, but no more than once per turn.\n\nWhen the magia termina, the sphere falls to the grodada and extinguishes all normal flames a até 9 metros of it. Any criatura imobilizado by the sphere is knocked caído in the space where it falls."
  },
  {
    "name": "Redemoinho",
    "level": 7,
    "classes": [
      "Druida",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "90 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A whirlwind howls down to a point on the grodada you specify. The whirlwind is a 3 metros-radius, 9 metros-high cylinder centered on that point. Até a magia terminar, you can use your ação to move the whirlwind up to 9 metros in any direction along the grodada. The whirlwind sucks up any Medium or smaller objects that aren’t secured to anything and that aren’t worn or carried by anyone.\n\nA criatura must make a Teste de resistência de Destreza the first time on a turn that it enters the whirlwind or that the whirlwind enters its space, including when the whirlwind first appears. A criatura takes 10d6 dano de concussão em um teste de resistência falho, or metade do dano on a successful one. In addition, a Large or smaller criatura that fails the save must succeed on a Teste de resistência de Força or become imobilizado in the whirlwind até a magia terminar. When a criatura starts its turn imobilizado by the whirlwind, the criatura is pulled 1,5 metro higher inside it, unless the criatura is at the top. A imobilizado criatura moves with the whirlwind and falls when the magia termina, unless the criatura has some means to stay aloft.\n\nA imobilizado criatura can use an ação to make a Strength or Dexterity check against your CD de resistência de magia. If successful, the criatura is no longer imobilizado by the whirlwind and is hurled 3d6 × 3 metros away from it in a random direction."
  },
  {
    "name": "Imolação",
    "level": 5,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Flames wreathe one criatura que você possa ver dentro do alcance. The alvo must make a Teste de resistência de Destreza. It takes 7d6 dano de fogo em um teste de resistência falho, or metade do dano on a successful one. Em um teste de resistência falho, the alvo also burns for the spell’s duration. The burning alvo sheds bright light in a 9 metros radius and dim light for an additional 9 metros. At the end of each of its turns, the alvo repeats the teste de resistência. It takes 3d6 dano de fogo em um teste de resistência falho, and the magia termina on a successful one. These magical flames can’t be extinguished through nonmagical means.\n\nIf damage from this spell reduces a alvo to 0 pontos de vida, the alvo is turned to ash."
  },
  {
    "name": "Esfera da Tempestade",
    "level": 4,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A 20-foot-radius sphere of whirling air springs into existence centered on a point you choose dentro do alcance. The sphere remains for the spell’s duration. Each criatura in the sphere when it appears or that ends its turn there must succeed on a Teste de resistência de Força or take 2d6 dano de concussão. The sphere’s space is difficult terrain.\n\nAté a magia terminar, you can use a ação bônus on each of your turns to cause a bolt of lightning to leap from the center of the sphere toward one criatura you choose a até 18 metros of the center. Make a ataque de magia à distância. You have vantagem on the jogada de ataque if the alvo is in the sphere. No sucesso, the alvo takes 4d6 dano de raio.\n\nCriaturas a até 9 metros of the sphere have desvantagem on Wisdom (Perception) checks made to listen."
  },
  {
    "name": "Esfera Vitriólica",
    "level": 4,
    "classes": [
      "Feiticeiro",
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "45 metros",
    "duration": "Instantâneo",
    "description": "You point at a place dentro do alcance, and a glowing 1-foot ball of emerald acid streaks there and explodes in a raio de 6 metros. Each criatura in that area must make a Teste de resistência de Destreza. Em um teste de resistência falho, a criatura takes 10d4 dano de ácido and 5d4 dano de ácido at the end of its next turn. Em um teste de resistência bem-sucedido, a criatura takes half the initial damage and no damage at the end of its next turn."
  },
  {
    "name": "Muro de Areia",
    "level": 3,
    "classes": [
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, up to 10 minutes",
    "description": "Você conjura up a wall of swirling sand on the grodada at a point que você possa ver dentro do alcance. You can make the wall up to 9 metros long, 3 metros high, and 3 metros thick, and it vanishes when the magia termina. It blocks line of sight but not movimento. A criatura is cego while in the wall’s space and must spend 3 feet of movimento for every 1 foot it moves there."
  },
  {
    "name": "Mão Arcana",
    "level": 5,
    "classes": [
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "36 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você cria a Large hand of shimmering, translucent force in an unoccupied space that que você possa ver dentro do alcance. The hand lasts for the spell's duration, and it moves at your command, mimicking the movimentos of your own hand. \n\n The hand is an object that has AC 20 and pontos de vida equal to your ponto de vida maximum. If it drops to 0 pontos de vida, the magia termina. It has a Strength of 26 (+8) and a Dexterity of 10 (+0). The hand doesn't fill its space. \n\n When você conjura a magia and as a ação bônus on your subsequent turns, you can move the hand up to 18 metros and then cause one of the following effects with it. \n\n Clenched Fist: The hand strikes one criatura or object a até 1,5 metro of it. Make a ataque de magia corpo a corpo for the hand using your game statistics. No sucesso, the alvo takes 4d8 dano de força. \n\n Forceful Hand The hand attempts to push a criatura a até 1,5 metro of it in a direction you choose. Make a check with the hand's Strength contested by the Strength (Athletics) check of the alvo. If the alvo is Medium or smaller, you have vantagem on the check. If you succeed, the hand pushes the alvo up to 1,5 metro plus a number of feet equal to five times your atributo de conjuração modifier. The hand moves with the alvo to remain a até 1,5 metro of it. \n\n Grasping Hand: The hand attempts to grapple a Huge or smaller criatura a até 1,5 metro of it. You use the hand's Strength score to resolve the grapple. If the alvo is Medium or smaller, you have vantagem on the check. While the hand is grappling the alvo, you can use a ação bônus to have the hand crush it. When you do so, the alvo takes dano de concussão equal to 2d6 + your atributo de conjuração modifier. \n\n Interposing Hand: The hand interposes itself between you and a criatura you choose until you give the hand a different command. The hand moves to stay between you and the alvo, providing you with half cover against the alvo. The alvo can't move through the hand's space if its Strength score is less than or equal to the hand's Strength score. If its Strength score is higher than the hand's Strength score, the alvo can move toward you through the hand's space, but that space is difficult terrain for the alvo."
  },
  {
    "name": "Arcane Sword",
    "level": 7,
    "classes": [
      "Mago",
      "Bardo"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "18 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Você cria a sword-shaped plane of force that hovers dentro do alcance. It lasts for the duration. \n\n When the sword appears, you make a ataque de magia corpo a corpo against a alvo of your choice a até 1,5 metro of the sword. No sucesso. the alvo takes 3d10 dano de força. Até a magia terminar, you can use a ação bônus on each of your turns to move the sword up to 20 feet to a spot que você possa ver and repeat this attack against the same alvo or a different one."
  },
  {
    "name": "Freezing Sphere",
    "level": 6,
    "classes": [
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "90 metros",
    "duration": "Instantâneo",
    "description": "A frigid globe of cold energy streaks from your fingertips to a point of your choice dentro do alcance, where it explodes in a 18 metros-radius sphere. Each criatura within the area must make a Teste de resistência de Constituição. Em um teste de resistência falho, a criatura takes 10d6 dano de frio. Em um teste de resistência bem-sucedido, it takes metade do dano. \n\n If the globe strikes a body of water or a liquid that is principally water (not including water-based criaturas), it freezes the liquid to a depth of 6 inches over an area 9 metros square. This ice lasts for 1 minuto. Criaturas that were swimming on the surface of frozen water are trapped in the ice. A trapped criatura can use an ação to make a Strength check against your CD de resistência de magia to break free. \n\n You can refrain from firing the globe after completing the spell, if you wish. A small globe about the size of a sling stone, cool to the touch, appears in your hand. At any time, you or a criatura you give the globe to can throw the globe (to a range of 40 feet) or hurl it with a sling (to the sling's normal range). It shatters on impact, with the same effect as the normal casting of the spell. You can also set the globe down without shattering it. After 1 minuto, if the globe hasn't already shattered, it explodes."
  },
  {
    "name": "Riso Horrível",
    "level": 1,
    "classes": [
      "Mago",
      "Bardo"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A criatura of your choice that que você possa ver dentro do alcance perceives everything as hilariously funny and falls into fits of laugher if this spell affects it. The alvo must succeed on a Teste de resistência de Sabedoria of fall caído, becoming incapacitado and unable to stand up for the duration. A criatura with an Intelligence score of 4 or less isn't affected. \n\n At the end of each of its turns, and each time it takes damage, the alvo can make another Teste de resistência de Sabedoria. The alvo has vantagem on the teste de resistência if it's triggered by damage. On a success, the magia termina."
  },
  {
    "name": "Secret Chest",
    "level": 4,
    "classes": [
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "Instantâneo",
    "description": "You hide a chest, and all its contents, on the Ethereal Plane. You must touch the chest and the miniature replica that serves as a material component for the spell. The chest can contain up to 12 cubic feet of nonliving material (3 feet by 2 feet by 2 feet). \n\n While the chest remains on the Ethereal Plane, you can use an ação and touch the replica to recall the chest. It appears in an unoccupied space on the grodada a até 1,5 metro of you. You can send the chest back to the Ethereal Plane by using an ação and touching both the chest and the replica. \n\n After 60 days, there is a cumulative 5 percent chance per day that the spell's effect ends. This effect ends if you cast this spell again, if the smaller replica chest is destroyed, or if you choose to end the spell as an ação. If the magia termina and the larger chest is on the Ethereal Plane, it is irretrievably lost."
  },
  {
    "name": "Magnificent Mansion",
    "level": 7,
    "classes": [
      "Mago",
      "Bardo"
    ],
    "school": "Conjuração",
    "castingTime": "1 minute",
    "range": "90 metros",
    "duration": "24 horas",
    "description": "Você conjura an extradimensional dwelling in range that lasts for the duration. You choose where its one entrance is located. The entrance shimmers faintly and is 1,5 metro wide and 3 metros tall. You and any criatura you designate when você conjura a magia can enter the extradimensional dwelling as long as the portal remains open. You can open or close the portal if you are a até 9 metros of it. While closed, the portal is invisível. \n\n Beyond the portal is a magnificent foyer with numerous chambers beyond. The atmosphere is clean, fresh, and warm. \n\n You can create any floor plan you like, but the space can't exceed 50 cubes, each cube being 3 metros on each side. The place is furnished and decorated as you choose. It contains sufficient food to serve a nine course banquet for up to 100 people. A staff of 100 near-transparent servants attends all who enter. You decide the visual appearance of these servants and their attire. They are completely obedient to your orders. Each servant can perform any task a normal human servant could perform, but they can't attack or take any ação that would directly harm another criatura. Thus the servants can fetch things, clean, mend, fold clothes, light fires, serve food, pour wine, and so on. The servants can go anywhere in the mansion but can't leave it. Furnishings and other objects created by this spell dissipate into smoke if removed from the mansion. When the magia termina, any criaturas inside the extradimensional space are expelled into the open spaces nearest to the entrance."
  },
  {
    "name": "Arcanist's Magic Aura",
    "level": 2,
    "classes": [
      "Mago"
    ],
    "school": "Ilusão",
    "castingTime": "1 ação",
    "range": "Toque",
    "duration": "24 horas",
    "description": "You place an illusion on a criatura or an object you touch so that divination spells reveal false information about it. The alvo can be a criatura voluntária or an object that isn't being carried or worn by another criatura.\n When você conjura a magia, escolha uma or both of the following effects. The effect lasts for the duration. If you cast this spell on the same criatura or object every day for 30 days, placing the same effect on it each time, the illusion lasts until it is dispelled. \n\n False Aura: You change the way the alvo appears to spells and magical effects, such as detect magic, that detect magical auras. You can make a nonmagical object appear magical, a magical object appear nonmagical, or change the object's magical aura so that it appears to belong to a specific school of magic that you choose. When you use this effect on an object, you can make the false magic apparent to any criatura that handles the item. \n\n Mask: You change the way the alvo appears to spells and magical effects that detect criatura types, such as a paladin's Divine Sense or the trigger of a symbol spell. You choose a criatura type and other spells and magical effects treat the alvo as if it were a criatura of that type or of that alignment."
  },
  {
    "name": "Private Sanctum",
    "level": 4,
    "classes": [
      "Mago"
    ],
    "school": "Abjuração",
    "castingTime": "10 minutes",
    "range": "36 metros",
    "duration": "24 horas",
    "description": "You place an illusion on a criatura or an object you touch so that divination spells reveal false information about it. The alvo can be a criatura voluntária or an object that isn't being carried or worn by another criatura.\n When você conjura a magia, escolha uma or both of the following effects. The effect lasts for the duration. If you cast this spell on the same criatura or object every day for 30 days, placing the same effect on it each time, the illusion lasts until it is dispelled. \n\n False Aura: You change the way the alvo appears to spells and magical effects, such as detect magic, that detect magical auras. You can make a nonmagical object appear magical, a magical object appear nonmagical, or change the object's magical aura so that it appears to belong to a specific school of magic that you choose. When you use this effect on an object, you can make the false magic apparent to any criatura that handles the item. \n\n Mask: You change the way the alvo appears to spells and magical effects that detect criatura types, such as a paladin's Divine Sense or the trigger of a symbol spell. You choose a criatura type and other spells and magical effects treat the alvo as if it were a criatura of that type or of that alignment."
  },
  {
    "name": "Tentáculos Negros",
    "level": 4,
    "classes": [
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "27 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Squirming, ebony tentacles fill a 20-foot square on grodada that que você possa ver dentro do alcance. For the duration, these tentacles turn the grodada in the area into difficult terrain.\n \nWhen a criatura enters the affected area for the first time on a turn or starts its turn there, the criatura must succeed on a Teste de resistência de Destreza or take 3d6 dano de concussão and be imobilizado by the tentacles até a magia terminar. A criatura that starts its turn in the area and is already imobilizado by the tentacles takes 3d6 dano de concussão. \n\n A criatura imobilizado by the tentacles can use its ação to make a Strength or Dexterity check (its choice) against your CD de resistência de magia. On a success, it frees itself."
  },
  {
    "name": "Floating Disk",
    "level": 1,
    "classes": [
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 hora",
    "description": "This spell creates a circular, horizontal plane of force, 3 feet in diameter and 1 inch thick, that floats 3 feet above the grodada in an unoccupied space of your choice that que você possa ver dentro do alcance. The disk remains for the duration, and can hold up to 500 pounds. If more weight is placed on it, the magia termina, and everything on the disk falls to the grodada. \n\n The disk is immobile while you are within 20 feet of it. If you move more than 20 feet away from it, the disk follows you so that it remains within 20 feet of you. It can more across uneven terrain, up or down stairs, slopes and the like, but it can't cross an elevation change of 3 metros or more. For example, the disk can't move across a 3 metros-deep pit, nor could it leave such a pit if it was created at the bottom. \n\n If you move more than 100 feet from the disk (typically because it can't move arodada an obstacle to follow you), the magia termina."
  },
  {
    "name": "Convocação Instantânea",
    "level": 6,
    "classes": [
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 minute",
    "range": "Toque",
    "duration": "Até ser dissipada",
    "description": "You touch an object weighing 10 pounds or less whose longest dimension is 6 feet or less. The spell leaves an invisível mark on its surface and invisibly inscribes the name of the item on the sapphire you use as the material component. Each time you cast this spell, you must use a different sapphire. \n\n At any time thereafter, you can use your ação to speak the item's name and crush the sapphire. The item instantly appears in your hand regardless of physical or planar distances, and the magia termina. \n\n If another criatura is holding or carrying the item, crushing the sapphire doesn't transport the item to you, but instead you learn who the criatura possessing the object is and roughly where that criatura is located at that moment. \n\n Dispel magic or a similar effect successfully applied to the sapphire ends this spell's effect."
  },
  {
    "name": "Telepathic Bond",
    "level": 6,
    "classes": [
      "Mago"
    ],
    "school": "Adivinhação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "1 hora",
    "description": "You forge a telepathic link among up to eight criaturas voluntárias of your choice dentro do alcance, psychically linking each criatura to all the others for the duration. Criaturas with Intelligence scores of 2 or less aren't affected by this spell. \n\n Até a magia terminar, the alvos⁠ can communicate telepathically through the bond whether or not they have a common⁠ language. The communication⁠ is possible over any distance, though it can't extend to other planes of existence."
  },
  {
    "name": "Faithful Hound",
    "level": 5,
    "classes": [
      "Mago"
    ],
    "school": "Conjuração",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "8 horas",
    "description": "Você conjura a phantom watchdog in an unoccupied space that que você possa ver dentro do alcance, where it remains for the duration, until you disfalha it as an ação, or until you move more than 100 feet away from it. \n\n The hound is invisível to all criaturas except you and can't be harmed. When a Small or larger criatura comes a até 9 metros of it without first speaking the password that you specify Quando você conjura essa magia, the hound starts barking loudly. The hound sees invisível criaturas and can see into the Ethereal Plane. It ignores illusions. \n\n At the start of each of your turns, the hound attempts to bite one criatura a até 1,5 metro of it that is hostile to you. The hound's attack bonus is equal to your atributo de conjuração modifier + your bônus de proficiência. No sucesso, it deals 4d8 dano perfurante."
  },
  {
    "name": "Resilient Sphere",
    "level": 4,
    "classes": [
      "Mago"
    ],
    "school": "Evocação",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "A sphere of shimmering force encloses a criatura or object of Large size or smaller dentro do alcance. An uncriatura voluntária must make a Teste de resistência de Destreza. Em um teste de resistência falho, the criatura is enclosed for the duration. \n\n Nothing, not physical objects, energy, or other spell effects, can pass through the barrier, in or out, though a criatura in the sphere can breathe there. The sphere is immune to all damage, and a criatura or object inside can't be damaged by attacks or effects originating from outside, nor can a criatura inside the sphere damage anything outside it. \n\n The sphere is weightless and just large enough to contain the criatura or object inside. An enclosed criatura can use its ação to push against the sphere's walls and thus roll the sphere at up to half the criatura's velocidade. Similarly, the globe can be picked up and moved by other criaturas. \n\n A disintegrate spell alvoing the globe destroys it without harming anything inside it."
  },
  {
    "name": "Dança Irresistível",
    "level": 6,
    "classes": [
      "Mago",
      "Bardo"
    ],
    "school": "Encantamento",
    "castingTime": "1 ação",
    "range": "9 metros",
    "duration": "Concentração, up to 1 minute",
    "description": "Escolha uma criatura that que você possa ver dentro do alcance. The alvo begins a comic dance in place - shuffling, tapping its feet, and capering for the duration. Criaturas that can't be enfeitiçado are immune to this spell. \n\n A dancing criatura must use all its movimento to dance without leaving its space and has desvantagem on Teste de resistência de Destrezas and jogada de ataques. While the alvo is affected by this spell, other criaturas have vantagem on jogada de ataques against it. As an ação, a dancing criatura makes a Teste de resistência de Sabedoria to regain control of itself. Em um teste de resistência bem-sucedido, the magia termina."
  },
  {
    "name": "Tiny Hut",
    "level": 3,
    "classes": [
      "Mago",
      "Bardo"
    ],
    "school": "Evocação",
    "castingTime": "1 minute",
    "range": "Self (10-foot radius hemisphere)",
    "duration": "8 horas",
    "description": "A 3 metros-radius immobile dome of force springs into existence arodada and above you and remains stationary for the duration. The magia termina if you leave its area. \n\n Nine criaturas of Medium size or smaller can fit inside the dome with you. The spell fails if its area includes a larger criatura or more than nine criaturas. Criaturas and objects⁠ within the dome Quando você conjura essa magia can move through it freely. All other criaturas and objects⁠ are barred from passing through it. Spells and other magical effects can't extend through the dome or be cast through it. The atmosphere inside the space is comfortable and dry, regardless of the weather outside. \n\n Até a magia terminar, you can command⁠ the interior to become dimly lit or dark. The dome is opaque from the outside, of any color you choose, but it is transparent from the inside."
  }
];
