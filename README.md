# CEO — Uma História de Negócios

Um jogo empresarial narrativo em que cada decisão influencia empresas, funcionários, produtos, concorrentes, família e o legado do fundador.

## Jogar sem instalar nada

A versão mais recente pode ser jogada diretamente no navegador:

**[Abrir CEO — Uma História de Negócios](https://ceo-uma-historia-de-negocios.ferreirabruncruz.chatgpt.site)**

O progresso fica salvo no armazenamento local do navegador. Jogar em outro navegador, computador ou perfil cria um progresso separado.

## O que é necessário para rodar no computador

- Windows 10 ou 11, macOS ou Linux.
- [Node.js](https://nodejs.org/) versão **22.13 ou mais recente**. A versão LTS atual é recomendada.
- Aproximadamente 1 GB de espaço livre para o projeto e suas dependências.
- Internet na primeira execução para baixar as dependências.

Depois de instalar o Node.js, feche e abra novamente o terminal. Confirme a instalação com:

```powershell
node --version
npm --version
```

## Opção 1 — Baixar pelo GitHub sem usar Git

É o método mais simples.

1. Abra a [página do projeto no GitHub](https://github.com/BrunoCruzF/CEO-Uma-Historia-de-Negocios).
2. Clique no botão verde **Code**.
3. Clique em **Download ZIP**.
4. Extraia o arquivo ZIP para uma pasta normal, como `Documentos\CEO-Game`.
5. Abra a pasta extraída.
6. No Windows, dê dois cliques em **JOGAR.bat**.
7. Na primeira execução, aguarde a instalação das dependências.
8. O jogo abrirá em [http://localhost:3000](http://localhost:3000).

Mantenha a janela preta do jogo aberta enquanto estiver jogando. Para encerrar, feche essa janela ou pressione `Ctrl + C` nela.

### Rodar manualmente caso o JOGAR.bat não funcione

Abra o PowerShell dentro da pasta do jogo e execute:

```powershell
npm install
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'
npx vinext dev
```

Depois, abra [http://localhost:3000](http://localhost:3000) no navegador.

## Opção 2 — Baixar com Git

Esse método é recomendado para receber atualizações com facilidade.

1. Instale o [Git](https://git-scm.com/downloads) e o [Node.js](https://nodejs.org/).
2. Abra o PowerShell na pasta onde deseja guardar o jogo.
3. Execute:

```powershell
git clone https://github.com/BrunoCruzF/CEO-Uma-Historia-de-Negocios.git
cd CEO-Uma-Historia-de-Negocios
npm install
$env:WRANGLER_LOG_PATH='.wrangler/wrangler.log'
npx vinext dev
```

4. Abra [http://localhost:3000](http://localhost:3000).

No Windows, depois da primeira instalação, também é possível iniciar dando dois cliques em `JOGAR.bat`.

## Como receber atualizações usando Git

Feche o jogo, abra o PowerShell dentro da pasta do projeto e execute:

```powershell
git pull origin main
npm install
```

Depois, execute `JOGAR.bat` novamente ou rode `npx vinext dev`.

O `git pull` atualiza os arquivos do jogo. O progresso salvo no navegador normalmente permanece intacto, pois não fica dentro da pasta do projeto.

Quem baixou por ZIP deve baixar um novo ZIP e substituir a pasta antiga quando quiser atualizar.

## macOS e Linux

Dentro da pasta extraída ou clonada, execute:

```bash
npm install
WRANGLER_LOG_PATH=.wrangler/wrangler.log npx vinext dev
```

Abra [http://localhost:3000](http://localhost:3000). O arquivo `JOGAR.bat` funciona somente no Windows.

## Problemas comuns

### “node” ou “npm” não é reconhecido

O Node.js não está instalado ou o terminal estava aberto durante a instalação. Instale o Node.js e abra uma nova janela do PowerShell.

### A página não abre

Aguarde o terminal indicar que o servidor iniciou e tente abrir manualmente [http://localhost:3000](http://localhost:3000). A janela do terminal precisa permanecer aberta.

### A porta 3000 já está em uso

Feche outro servidor que esteja usando a porta ou execute:

```powershell
npx vinext dev --port 3010
```

Depois, abra `http://localhost:3010`.

### A instalação apresentou erro

Confirme que a internet está funcionando e que o Node.js atende à versão mínima. Depois, dentro da pasta do jogo, tente novamente:

```powershell
npm install
```

Evite executar o jogo diretamente de dentro do arquivo ZIP. Extraia todo o conteúdo antes.

Avisos de `npm audit`, pacotes procurando financiamento ou `allow-scripts` não significam necessariamente que o jogo falhou. Não execute `npm audit fix --force`, pois isso pode trocar dependências por versões incompatíveis. O erro importante é o texto em vermelho exibido depois que o servidor tenta iniciar.

### Como reiniciar o progresso

O save fica no navegador. Dentro do jogo, use a opção de reiniciar quando disponível. Também é possível limpar os dados do site `localhost` nas configurações do navegador, mas isso apaga definitivamente o progresso local.

## Principais sistemas do jogo

- Gestão de empresas, salários, funcionários, contratos e produtos.
- Criação, aquisição, venda, recuperação e falência de empresas.
- Holding com CEOs, conselho, investidores, facções e disputas políticas.
- Concorrentes com identidade, produtos, memória e decisões próprias.
- Economia dinâmica, crises, auditorias e acontecimentos narrativos.
- Linha de causa e consequência para acompanhar os efeitos das decisões.
- Jornada do fundador, sucessão familiar e Modo Dinastia.
- Arcos narrativos por geração, conquistas e diferentes finais.

## Desenvolvimento e validação

Para iniciar o ambiente de desenvolvimento no Windows:

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

O progresso do jogo é salvo no `localStorage` do navegador e não é enviado para um servidor externo.
