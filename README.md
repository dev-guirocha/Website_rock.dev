# Rock .dev

Site da Rock .dev (https://squadrockdev.com.br): Dados e IA para quem decide. Painéis, indicadores e IA
aplicada, com demos navegáveis de dados fictícios, calculadora e cursos de IA em breve. Português na raiz e
inglês em `/en/`.

## Stack

Astro 7.3.8 estático, JavaScript puro nas ilhas interativas, testes com `node:test`, deploy por GitHub
Actions no GitHub Pages.

## Comandos

```bash
npm install
npm run dev          # servidor de desenvolvimento
npm test             # build + testes
npm run crivo        # build + crivo de vazamento (precisa da lista local)
npm run gerar-demos  # regera os dados fictícios das demos
npm run imagens      # regera public/images a partir de fontes/imagens
```

O `npm run crivo` lê a lista de termos pela variável `CRIVO_LISTA` ou, se ela não existir, pela primeira linha do arquivo `.crivo-lista` na raiz do repo (não versionado), que guarda o caminho da lista. Sem nenhum dos dois, o crivo falha fora do CI.

## Onde fica cada coisa

- `src/textos/*.json`: todos os textos, com `pt` e `en` lado a lado.
- `src/config/contato.json`: WhatsApp, e-mail e redes.
- `src/data/demos/`: dados 100% fictícios, gerados por `scripts/gerar-demos.mjs` com semente fixa.
- `src/lib/`: lógica pura (agregação, gráficos SVG, formato, calculadora, respostas do assistente), testada
  em `tests/`.
- `src/views/` monta cada página; `src/pages/` só escolhe o idioma.

## Dados das demos

Empresas, pessoas e números das demos são inventados. Nenhum dado vem de cliente real.

## Publicação

Push em `main` roda testes, crivo e publica no Pages. Pull requests rodam só testes e crivo. O crivo do CI roda só os padrões genéricos; o crivo local completo é obrigatório antes do push.
