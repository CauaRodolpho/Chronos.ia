# ⏳ Chronos.ai — Educador Financeiro com React & IA Generativa

<p align="center">
  <img src="src/assets/images/piggy-bank.png" alt="Chronos.ai Piggy Bank" width="120" />
</p>

<p align="center">
  O <strong>Chronos.ai</strong> é uma aplicação web interativa de planejamento financeiro pessoal que utiliza inteligência artificial para gerar diagnósticos financeiros personalizados, ideias de renda extra e planos de ação práticos diretamente no navegador.
</p>

<p align="center">
  🚀 <strong><a href="https://chronosai-one.vercel.app/" target="_blank">Acesse a Live Demo do Chronos.ai</a></strong>
</p>

---

## 🚀 Sobre o Projeto

O objetivo principal do **Chronos.ai** é capacitar o usuário a entender melhor sua saúde financeira. A partir do preenchimento de um formulário interativo *multi-step* (com informações de renda, gastos fixos/variáveis e metas), o sistema processa as informações localmente e integra com a **API do Google Gemini** para fornecer análises em tempo real.

### 💼 Destaques Técnicos da Arquitetura

- **Zero Backend:** Todo o gerenciamento de estado e persistência é feito no *client-side* utilizando `localStorage`.
- **Performance & DX:** Construído com **Vite**, **TypeScript** e **Tailwind CSS v4** para estilização utilitária e suporte nativo a temas (Light/Dark).
- **Consumo de IA:** Prompt engineering estruturado retornando dados estritamente em **JSON** para consumo dinâmico na interface.

---

## 🧠 O Que Eu Aprendi

Durante o desenvolvimento do Chronos.ai, aprofundei meus conhecimentos em diversas frentes do ecossistema React e desenvolvimento Web moderno:

- **Desenvolvimento de Formulários Complexos (*Multi-Step*):** Criação de fluxos de formulários guiados mantendo o estado entre etapas e aplicando máscaras financeiras dinâmicas.
- **Integração com LLMs (IA Generativa):** Construção de prompts avançados e estruturação de respostas em JSON para consumir o modelo `gemini-2.5-flash` via API HTTP.
- **Controle de Efeitos no React:** Prevenção de chamadas duplicadas à API externa usando `useRef` e tratamento avançado de estados de *loading* (skeletons) e *error handling*.
- **Persistência de Dados e Roteamento:** Armazenamento resiliente no `localStorage` com controle de IDs únicos (`crypto.randomUUID()`) e roteamento dinâmico com **React Router**.
- **Design System com CSS Variables & Tailwind v4:** Implementação do sistema de alternância de temas (Claro/Escuro) integrado às preferências do sistema operacional.

---

## 🧩 Solução dos Desafios

Além da estrutura base desenvolvida durante o curso, implementei as seguintes funcionalidades para enriquecer o Chronos.ai:

### 📜 Desafio 1 — Página de Histórico de Simulações

* **Implementação:** Criei a rota `/historico` permitindo visualizar todas as análises salvas previamente no `localStorage`.
- **Funcionalidades:** Lista com resumo de datas, metas e valores, além de permitir reabrir diagnósticos anteriores ou excluir registros individualmente do armazenamento local.

### 💬 Desafio 2 — Conversando com o Educador Financeiro (Chat com IA)

* **Implementação:** Adicionei uma interface de bate-papo interativa na tela de resultados da simulação.
- **Funcionalidades:** O assistente retém o contexto financeiro gerado no diagnóstico inicial, permitindo ao usuário tirar dúvidas em tempo real (ex: *"Como posso cortar gastos fixos no meu cenário?"* ou *"Qual a melhor estratégia para criar minha reserva de emergência?"*).

---

## 🛠️ Tech Stack

- **Core:** React 19, TypeScript, Vite
- **Estilização:** Tailwind CSS v4, Lucide React (Ícones), Fontsource Inter
- **Roteamento:** React Router DOM v7
- **Inteligência Artificial:** Google Gemini API (`gemini-2.5-flash`)
- **UI Feedback:** React Loading Skeleton
- **Deploy:** Vercel

---

## 👩‍🏫 Agradecimento Especial & Créditos

Um agradecimento especial à professora **[Michele Queiroz Ambrosio](https://www.linkedin.com/in/michelequeirozambrosio/)**, cuja didática, estruturação de conteúdo e condução nos desafios foram fundamentais para a construção do **Chronos.ai**. Sua orientação me ajudou a elevar a qualidade do código e a entender a aplicação prática de IA no desenvolvimento web moderno.

---

## 📦 Como Rodar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
   cd chronosai
