@echo off
echo ===================================================
echo   Ozel Ders Borsasi Sunucusu Baslatiliyor...
echo ===================================================
echo.
start cmd /k "node server.js"
start cmd /k "npm run dev"
echo.
echo Sunucular baslatildi! Tarayicinizda http://localhost:3000 adresini acabilirsiniz.
pause
