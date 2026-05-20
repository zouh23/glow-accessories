@echo off
setlocal
cd /d "%~dp0"

set PORT=8000
echo [Glow Accessories] Lancement du serveur local sur http://127.0.0.1:%PORT%/

start "" "http://127.0.0.1:%PORT%/index.html"
py -m http.server %PORT% --bind 0.0.0.0
