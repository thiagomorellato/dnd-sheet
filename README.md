# D&D 5e Character Manager (UX Tática & Arquitetura de Dados)

Este é um aplicativo mobile desenvolvido com **React Native (Expo)** e **TypeScript** para gerenciamento de fichas de personagens de Dungeons & Dragons 5ª Edição (D&D 5e). O projeto foi desenhado sob duas perspectivas principais:
1. **UX Tática para Combate**: Uma interface em Dark Mode otimizada para o calor do combate, facilitando a alteração rápida de pontos de vida, gerenciamento de espaços de magia, ativação de buffs e controle de dados de vida.
2. **Portfólio de Engenharia & Arquitetura de Dados**: Implementa conceitos rígidos de modelagem de dados, validação de esquemas (JSON Schema com Zod) e captura de eventos de combate (*Event Sourcing*) persistidos localmente.

---

## 🚀 Como Executar o Projeto

Depois de renomear a pasta do projeto (por exemplo, de `D&D` para `DnD_Character_Manager` ou similar para evitar conflitos de caracteres especiais no terminal), execute os seguintes comandos no diretório raiz:

1. **Instalar Dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o Servidor Expo (Metro)**:
   ```bash
   npm run dev
   # ou
   npx expo start
   ```

3. **Rodar na Web**:
   Pressione `w` no console do terminal Expo ou execute diretamente:
   ```bash
   npm run web
   ```

4. **Rodar no Emulador/Dispositivo Físico**:
   - Para Android: Pressione `a` ou rode `npm run android`
   - Para iOS: Pressione `i` ou rode `npm run ios`

---

## 🛠️ O que é o Projeto & Arquitetura de Dados

O aplicativo adota um modelo NoSQL leve baseado em documentos estruturados armazenados no dispositivo via `AsyncStorage`. Suas principais diretrizes arquiteturais são:

### 1. Validação Rígida de Esquema (Zod)
Antes de qualquer persistência ou importação de ficha (JSON), os dados passam por uma validação estrutural descrita em [src/schemas/character.ts](file:///C:/Users/thimo/Desktop/anhanguera/D&D/src/schemas/character.ts). Isso impede o salvamento de dados malformados ou incompatíveis, garantindo a integridade operacional da aplicação.

### 2. Captura de Eventos (Event Sourcing)
Toda e qualquer alteração de estado crítico em combate (como receber dano, recuperar vida, usar cura rápida, conjurar magias ou ativar *Divine Smite*) gera um registro de log estruturado no módulo [src/services/logger.ts](file:///C:/Users/thimo/Desktop/anhanguera/D&D/src/services/logger.ts).
Cada entrada no log contém:
- **Timestamp**: Instante exato do evento.
- **Tipo de Ação**: Ex: `DAMAGE`, `HEAL`, `SPENT_HIT_DIE`, `CAST_SPELL`, `DIVINE_SMITE`.
- **Modificação de Valor**: O valor numérico alterado (ex: `-10`, `+8`).
- **Estado Atual**: Uma cópia do estado de HP e recursos pós-evento.

### 3. Integração e Mini-ETL (JSON & CSV)
- **Importação/Exportação de Fichas**: Permite salvar e carregar personagens em arquivos JSON formatados.
- **Exportação de Logs**: O histórico de eventos de combate pode ser exportado a qualquer momento em formato **CSV**. Esse arquivo está pronto para ser integrado a ferramentas de análise e pipelines de dados (ex: scripts Python, Pandas, PowerBI ou PySpark).

---

## 📂 Estrutura de Diretórios do Projeto

A estrutura de código isola rigidamente a camada de apresentação (UI) das regras de negócio e persistência (Data Layer):

```text
📁 D&D (ou pasta renomeada)
├── 📁 .expo                  # Arquivos de cache e configuração do Expo
├── 📁 assets                 # Imagens, backgrounds e ícones estáticos
├── 📁 src                    # Código-fonte principal da aplicação
│   ├── 📁 types              # Definições de Tipos TypeScript (ex: character.ts)
│   ├── 📁 schemas            # Esquemas de validação de dados com Zod (ex: character.ts)
│   ├── 📁 services           # Camada de Dados e Persistência (storage.ts, logger.ts)
│   ├── 📁 utils              # Regras de D&D 5e, tabelas de classes e armaduras (dndRules.ts)
│   ├── 📁 components         # Componentes de UI modulares e reutilizáveis
│   │   ├── AttributesGrid.tsx   # Exibição do accordion de atributos e perícias
│   │   ├── EquipmentTracker.tsx  # Gerenciamento de inventário e equipamentos do personagem
│   │   ├── ResourceTracker.tsx   # Monitor de espaços de magia, habilidades e Divine Smite
│   │   └── VitalsWidget.tsx      # Dashboard tático (HP, C.A., Proficiência, Dados de Vida)
│   └── 📁 screens            # Telas principais do aplicativo
│       ├── HomeScreen.tsx        # Gerenciamento de fichas, importações e exportações
│       ├── CharacterCreationScreen.tsx # Assistente de criação de fichas por passos
│       └── DashboardScreen.tsx   # Painel tático principal do personagem em jogo
├── App.tsx                   # Ponto de entrada do React Native
├── index.ts                  # Registro da aplicação Expo
├── package.json              # Script e dependências do Node.js
└── tsconfig.json             # Configurações do compilador TypeScript
```

---

## 🔄 Modificações Recentes Realizadas

Reestruturamos e expandimos diversas mecânicas de jogo e de layout no Dashboard Tático para se alinhar fielmente ao **Livro do Jogador (Player's Handbook - PHB)**:

### 1. Novo Layout de Duas Colunas no Dashboard Tático (`VitalsWidget`)
O widget de sinais vitais foi redesenhado para aproveitar melhor o espaço horizontal em dispositivos móveis e tablets:
*   **Coluna da Esquerda (Atributos & Perícias)**: Atributos base (FOR, DES, CON, INT, SAB, CAR) empilhados verticalmente. Tocar em um atributo expande um menu estilo *accordion* listando suas perícias associadas com os modificadores finais pré-calculados.
*   **Coluna da Direita (Painel de Combate)**:
    *   **Badges de Status no Topo**: A **Classe de Armadura (CA)** e o **Bônus de Proficiência** (+X) agora estão alinhados lado a lado de forma compacta e altamente legível.
    *   **Controles de HP Reduzidos**: A exibição dos pontos de vida e os seletores de dano, cura e multiplicadores (`1x`, `5x`, `10x`, `20x`) foram reduzidos em tamanho e posicionados lado a lado, otimizando o espaço da tela.
    *   **Transparência e Fundo Premium**: Ajustamos as opacidades dos cartões e overlays para que o plano de fundo do herói (`paladin_bg.jpg`) apareça claramente sob a interface.

### 2. Nova Mecânica de Pontos de Vida Adicionais (Temp HP)
Curas que ultrapassam a vida máxima agora acumulam o excedente como pontos de vida adicionais temporários.
*   Representação na UI: `Atual+Adicionais / Máximo (+Adicionais)` (Ex: `47/44 (+3)`).
*   Ao receber dano, o escudo de pontos adicionais é consumido antes do HP real do personagem.

### 3. Dados de Vida (Hit Dice) Interativos
Implementamos um controle dinâmico para os Dados de Vida logo abaixo da barra de vida:
*   O tipo de dado é atribuído de acordo com a classe do personagem (*d12 para Bárbaros; d10 para Guerreiros/Paladinos/Patrulheiros; d8 para Clérigos/Ladinos/Bardos/Artífices; d6 para Magos/Feiticeiros*).
*   **Gastar**: Rola o dado correspondente + modificador de Constituição do herói e o cura instantaneamente, gravando o evento no log de combate.
*   **Recuperar**: Permite reabastecer a quantidade de dados disponíveis (após descansos).

### 4. Suporte a Arquétipos (Subclasses)
No fluxo de criação de fichas, após selecionar a classe, é liberada uma listagem dinâmica com as subclasses clássicas do D&D 5e (como *Juramento de Devoção* para Paladino, *Caminho do Totem* para Bárbaro, etc.). A informação é persistida no banco no formato consolidado `Classe (Subclasse)`.

### 5. Inclusão da 13ª Classe: Artífice (Artificer)
Adicionamos o **Artífice** na tabela de regras, contendo:
*   Subclasses próprias (*Alquimista, Armeiro, Artilheiro, Serralheiro de Combate*).
*   Progressão de conjurador (meio-conjurador arredondado para cima) e dado de vida `d8`.

### 6. Correção de Bugs e Itens Adicionais
*   **Renomeação e Adição de Armaduras**: A cota de anéis foi ajustada para o nome clássico **Loriga de Anéis (Ring Mail)** e adicionamos a **Loriga Segmentada (Splint Mail)** como opção de armadura pesada.
*   **Compatibilidade de Subclasse com Magias**: Ajustamos o parser no [ResourceTracker.tsx](file:///C:/Users/thimo/Desktop/anhanguera/D&D/src/components/ResourceTracker.tsx) para extrair o nome limpo da classe base ao buscar se o herói possui magias ou painéis especiais (como o *Divine Smite* do Paladino), resolvendo um erro em que subclasses ocultavam a aba de magias.
