@echo off
chcp 65001 >nul
title 五十音助手 - 启动中...

echo ========================================
echo      五十音助手 - 一键启动脚本
echo ========================================
echo.

REM 检查Node.js是否安装
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

REM 检查npm是否安装
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 npm，请先安装 Node.js
    pause
    exit /b 1
)

echo [信息] Node.js 版本:
node -v
echo.

REM 进入项目目录
cd /d "%~dp0"

REM 检查node_modules是否存在
if not exist "node_modules" (
    echo [信息] 首次运行，正在安装依赖...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [错误] 依赖安装失败
        pause
        exit /b 1
    )
    echo.
    echo [信息] 依赖安装完成
    echo.
)

REM 在新窗口启动Vue开发服务器
echo [信息] 正在启动开发服务器，请稍候...
start "五十音助手 - 开发服务器" cmd /k "npm run serve"

REM 等待服务启动
echo [信息] 等待服务启动...
timeout /t 5 /nobreak >nul

REM 获取可用端口
for /f "tokens=3" %%a in ('netstat -ano ^| findstr "TCP" ^| findstr "LISTENING" ^| findstr "0.0.0.0:80"') do (
    set PORT=%%a
)

REM 如果8080被占用，尝试其他端口
if not defined PORT (
    for /f "tokens=3" %%a in ('netstat -ano ^| findstr "TCP" ^| findstr "LISTENING" ^| findstr "0.0.0.0:808"') do (
        set PORT=%%a
    )
)

REM 默认使用8080
if not defined PORT set PORT=8080

echo [信息] 服务已启动，正在打开浏览器...
echo.

REM 打开默认浏览器
start http://localhost:%PORT%

echo ========================================
echo   服务已启动: http://localhost:%PORT%
echo   浏览器已打开
echo   关闭此窗口可停止服务
echo ========================================
echo.
pause