# Resumo de Desenvolvimento - D&D 5e Character Manager

Este documento consolida o estado atual do desenvolvimento do aplicativo mobile de gerenciamento de fichas de personagens de D&D 5e, detalhando os conceitos de arquitetura de dados aplicados e as recentes modificações de interface e regras de combate.

---

## 1. O que é o Projeto

O aplicativo é um gerenciador de fichas de D&D 5e focado em otimizar a experiência de jogo durante o combate (UX Tática). Desenvolvido em **React Native (Expo)** com **TypeScript**, ele funciona como portfólio prático de **Arquitetura e Engenharia de Dados**, priorizando:
*   **Modelagem de Dados Precisa**: Representação aninhada de atributos, perícias, magias e recursos dinâmicos.
*   **Validação Rígida**: Importação e exportação de dados via esquemas JSON validados pelo **Zod**.
*   **Captura de Eventos (Event Sourcing)**: Módulo de "Combat Log" que registra todas as alterações de vida e uso de recursos, gerando um histórico exportável em formato CSV estruturado para análise externa de dados.

---

## 2. Arquitetura da Informação & Estrutura de Dados

O aplicativo adota um modelo leve baseado em documentos persistidos localmente no dispositivo.

### Esquema do Personagem (`Character`)
Cada ficha é validada e estruturada com as seguintes camadas lógicas:
*   `baseStats`: Atributos brutos (FOR, DES, CON, INT, SAB, CAR).
*   `hp`: Valores de pontos de vida atuais, máximos e temporários/adicionais.
*   `combat`: Classe de Armadura base e efeitos ativos (como *Escudo da Fé*).
*   `resources`: Espaços de magia e rastreadores customizados (ex: *Inspiração Bárdica*, *Pontos de Chi*, *Lay on Hands*).
*   `hitDice`: Dados de vida disponíveis e o tipo de dado da classe.
*   `coins`: Moedas de platina (PL), ouro (PO), electro (PE), prata (PP) e cobre (PC).

---

## 3. Modificações Recentes Realizadas

Abaixo estão listadas as alterações implementadas na tela principal e no motor de regras de jogo:

### 3.1 Interface do Dashboard Tático (VitalsWidget)
*   **Verticalização de Atributos e Perícias**: O painel de atributos base foi realocado para o **lado esquerdo (38% da tela)** em formato de coluna. Ao tocar no cabeçalho ou nos atributos individuais, a lista expande verticalmente (accordion), revelando as perícias associadas e seus modificadores finais já calculados com o bônus de proficiência.
*   **Nova Seção de Combate e HP à Direita**: O lado direito (58% da tela) concentra as estatísticas de combate com um design limpo e compacto:
    *   **Badges de Defesa Compacta**: Os indicadores de C.A. (Classe de Armadura) e o **Bônus de Proficiência** (+X) foram alinhados lado a lado no topo da coluna de combate.
    *   **Controles de HP Reduzidos**: A exibição numérica do HP e os botões rápidos de dano (`-`), cura (`+`) e o multiplicador (`1x`, `5x`, `10x`, `20x`) foram reduzidos em tamanho e colocados lado a lado, posicionados logo abaixo da barra de vida.
    *   **Fundo Premium**: Ajustamos a opacidade do overlay escuro e dos cartões de combate, restaurando a visibilidade da imagem do Paladino no fundo do widget (`paladin_bg.jpg`).

#### 3.2 Motor de Regras e Mecânicas de Jogo (Alinhamento Oficial D&D 5e)
*   **Correção da Regra de PV Temporários (Temp HP)**: Corrigimos um desvio de regra em que curas acima do máximo geravam pontos adicionais temporários. Pelas regras oficiais de D&D 5e, curas não acumulam como pontos temporários e o excesso é perdido. Ajustamos os controles rápidos para respeitar essa regra.
*   **Novo Gerenciador de Pontos de Vida (Modo Manual)**: Como pontos temporários agora não podem ser obtidos por cura (já que exigem efeitos específicos como magias e habilidades), adicionamos um modal interativo ao clicar na exibição de HP do *VitalsWidget*. Ele permite aos jogadores gerenciar e editar manualmente seu **HP Atual**, **HP Máximo** (útil ao subir de nível) e **PV Temporários** a qualquer momento.
*   **Correção do Dado de Vida do Bárbaro**: Corrigimos o cálculo de vida na criação do personagem onde a classe Bárbaro (que possui dado de vida `d12`) estava recebendo cálculo baseado em `d10`. Agora Bárbaros têm sua vida máxima inicial e por nível calculada corretamente.
*   **Correção da Categoria de Armaduras Pesadas (Splint Mail)**: Corrigimos a lógica de cálculo de C.A. em que a **Loriga Segmentada (Splint Mail)** era incorretamente identificada como armadura leve por falta de correspondência exata em filtros de strings. Desenvolvemos o utilitário centralizado `getArmorCategory` para classificar corretamente todas as armaduras leves, médias e pesadas, garantindo que o modificador de Destreza não seja adicionado a armaduras pesadas.
*   **Consolidação de Limite de Magias (getSpellLimit)**: Implementamos uma função centralizada para calcular os limites de preparação/conhecimento de magias para todas as 9 classes conjuradoras de nível 1 a 6 (incluindo Druidas, Bardos, Feiticeiros, Bruxos, Patrulheiros e Artífices), corrigindo o bug onde classes diferentes de Mago, Clérigo e Paladino tinham limite igual a zero e não podiam interagir com o Grimório.
*   **Dados de Vida (Hit Dice) Interativos**: Implementamos o sistema de dados de vida logo abaixo dos controles de HP. O aplicativo calcula automaticamente o tipo de dado apropriado da classe (*d12 para Bárbaros, d10 para Guerreiros/Paladinos/Patrulheiros, d8 para Clérigos/Ladinos/Bardos/Artífices, d6 para Magos/Feiticeiros*). O jogador pode clicar em **Gastar** para consumir um dado: o sistema realiza a rolagem, adiciona o modificador de Constituição do herói e o cura em tempo real, gerando logs e alertas com o resumo da rolagem. O botão **Recuperar** restaura os dados após descansos.
*   **Arquétipos (Subclasses)**: Adicionamos suporte completo para arquétipos. No momento da criação, após escolher a classe, o usuário pode selecionar sua subclasse específica (como *Juramento de Devoção* para Paladinos ou *Mestre de Batalha* para Guerreiros). Ao salvar, a classe é consolidada no formato `Classe (Subclasse)`.
*   **13ª Classe Oficial - Artífice**: Adicionamos a classe **Artífice** (Artificer) com dado de vida `d8`, subclasses personalizadas e sua tabela de progressão de magias específica.
*   **Correção de Bug de Magias**: Ajustamos o [ResourceTracker.tsx](src/components/ResourceTracker.tsx) para identificar corretamente a classe mesmo quando combinada com a subclasse nos parênteses, restaurando a exibição das magias e do botão de *Divine Smite*.
*   **Novas Armaduras (Loriga)**: Renomeamos a cota de anéis para **Loriga de Anéis (Ring Mail)** e adicionamos a **Loriga Segmentada (Splint Mail)** como opções de armaduras pesadas na criação do personagem.

---

## 4. Estrutura do Código e Arquivos Modificados

As alterações envolveram a atualização dos seguintes arquivos:
*   [src/types/character.ts](file:///C:/Users/thimo/Desktop/anhanguera/ded/src/types/character.ts): Inclusão da interface `HitDice`, nova propriedade no tipo `Character` e novos atributos opcionais de `EquipmentItem` (`customResourceName`, `customResourceMax` e `linkedSpellName`) para permitir injeção de poderes a partir de itens personalizados.
*   [src/schemas/character.ts](file:///C:/Users/thimo/Desktop/anhanguera/ded/src/schemas/character.ts): Adição do esquema de validação do Zod para suportar os novos campos opcionais de equipamentos com segurança durante a importação.
*   [src/utils/dndRules.ts](file:///C:/Users/thimo/Desktop/anhanguera/ded/src/utils/dndRules.ts): Atualização de `CLASSES_LIST` com subclasses e a classe Artífice, ajuste em `ARMOR_TEMPLATES` (Loriga de Anéis e Segmentada), implementação da função `getHitDieType`, e novos métodos centrais de regras: `getSpellLimit` (limite de grimório por classe) e `getArmorCategory` (categorização de armaduras para C.A.).
*   [src/components/VitalsWidget.tsx](file:///C:/Users/thimo/Desktop/anhanguera/ded/src/components/VitalsWidget.tsx): Redesenho do componente visual (duas colunas), inclusão do modal de gerenciamento manual de PV (Vida Atual, Máxima e Temporária), correção da cura e inclusão dos botões de Dados de Vida.
*   [src/components/ResourceTracker.tsx](file:///C:/Users/thimo/Desktop/anhanguera/ded/src/components/ResourceTracker.tsx): Normalização da nomenclatura de classes (ex: "Paladin" -> "Paladino"), removendo o banner incorreto de "Classe sem Magias" (raio cortado) ao usar nomes em inglês e mapeando de forma robusta magias e Smite para o Paladino da Demo.
*   [src/components/EquipmentTracker.tsx](file:///C:/Users/thimo/Desktop/anhanguera/ded/src/components/EquipmentTracker.tsx): Criação do formulário avançado de itens customizados, permitindo preencher a descrição, vincular magias extras e associar habilidades com cargas recarregáveis (como a espada "Montante da Vigília").
*   [src/screens/CharacterCreationScreen.tsx](file:///C:/Users/thimo/Desktop/anhanguera/ded/src/screens/CharacterCreationScreen.tsx): Adição do seletor e persistência de Subclasse/Arquétipo, correção do dado de vida do Bárbaro (`d12`) para cálculo de PV e uso do classificador de armaduras centralizado `getArmorCategory` para C.A. inicial e ajuste de modificador de ataque em armas à distância.
*   [src/screens/DashboardScreen.tsx](file:///C:/Users/thimo/Desktop/anhanguera/ded/src/screens/DashboardScreen.tsx): Integração de C.A. dinâmica e injeção automática/remoção de habilidades de classe e magias ao equipar ou descartar itens mágicos customizados.
*   [src/screens/HomeScreen.tsx](file:///C:/Users/thimo/Desktop/anhanguera/ded/src/screens/HomeScreen.tsx): Atualização do personagem demo (Sir Lancelot) para incluir os dados de vida.
