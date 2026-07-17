# CEO — Uma História de Negócios

Um jogo empresarial narrativo em que cada decisão influencia empresas, funcionários, produtos, concorrentes, família e o legado do fundador.

## Principais sistemas

- Gestão de empresas, salários, funcionários e produtos
- Criação, aquisição, venda e falência de empresas
- Holding com CEOs, conselho, investidores e facções
- Concorrentes com identidade, memória e decisões próprias
- Economia dinâmica, crises, auditorias e acontecimentos narrativos
- Jornada do fundador em seis atos, sucessão e Modo Dinastia
- Diferentes finais definidos pelas decisões do jogador

## Como jogar no Windows

Instale o [Node.js](https://nodejs.org/) e execute `JOGAR.bat`.

Na primeira execução, as dependências serão instaladas automaticamente. Depois, o jogo será aberto em `http://localhost:3000`.

## Desenvolvimento

```powershell
npm install
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'
npx vinext dev
```

Para validar uma versão de produção:

```powershell
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'
npx vinext build
```
