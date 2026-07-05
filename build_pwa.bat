@echo off
chcp 65001 >nul
title PWA构建

cd /d "%~dp0"
echo [信息] 开始构建 PWA 生产版本...
echo.

call node node_modules/@vue/cli-service/bin/vue-cli-service.js build

if %errorlevel% equ 0 (
    echo.
    echo [成功] 构建完成！请查看 dist\ 目录
    echo.
    echo ==========================================
    echo   生成的关键 PWA 文件:
    echo   - dist\manifest.json
    echo   - dist\service-worker.js
    echo   - dist\precache-manifest.*.js
    echo ==========================================
) else (
    echo.
    echo [错误] 构建失败，错误代码: %errorlevel%
)

echo.
pause