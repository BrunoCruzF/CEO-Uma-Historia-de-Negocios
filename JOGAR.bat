@echo off
title CEO - Modo Sobrevivencia
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Para jogar, instale o Node.js em https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo Preparando o jogo pela primeira vez...
  call npm install
)

set WRANGLER_LOG_PATH=.wrangler/wrangler.log
start "" http://localhost:3000
echo.
echo CEO: Modo Sobrevivencia esta iniciando.
echo Mantenha esta janela aberta enquanto estiver jogando.
echo.
call npx vinext dev
