# Módulo de Recebimento na Doca - WMS Core

Sistema de conferência cega e recebimento de mercadorias via integração com SEFAZ, desenvolvido com React e Tailwind CSS.

## Funcionalidades Principais

- **Captura na Doca (Scanner):** Leitura do código de barras do DANFE ou inserção manual da chave de acesso (44 dígitos).
- **Processamento Fiscal:** Integração simulada para autenticação do Certificado A1, download e extração de dados do XML oficial da SEFAZ.
- **Conferência Cega:** Interface otimizada (touch-friendly) para o operador de doca informar a contagem física dos produtos (sem visualização prévia da quantidade esperada).
- **Resultado e Auditoria:** Comparação do estoque físico vs. faturado (XML). Divergências alertam o supervisor antes da efetivação do recebimento.
- **Diagramas de Processo:** Telas incluem botões para abrir modais com a explicação visual (diagramas) da regra de negócio por trás de cada etapa.
- **Dark Mode Embutido:** Tema escuro incluído para reduzir a fadiga visual, útil para operadores em longas jornadas ou em locais de baixa luminosidade.

## Stack Tecnológico

- **Frontend:** React 18, TypeScript, Vite
- **Estilização:** Tailwind CSS (com suporte nativo ao `@custom-variant dark`)
- **Ícones:** Lucide React

## Scripts Disponíveis

No diretório do projeto, você pode rodar:

### `npm install`
Instala todas as dependências do pacote.

### `npm run dev`
Inicia a aplicação em modo de desenvolvimento na porta local.

### `npm run build`
Gera a versão otimizada de produção na pasta `dist/`.

---
*Este applet foi construído focado em simular um processo real de WMS (Warehouse Management System), priorizando facilidade de uso em chão de fábrica (alvos de toque grandes) e robustez de regras de negócio.*
