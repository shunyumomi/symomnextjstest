@echo off
echo ================================================
echo           MOMI FASHION WEBSITE SETUP           
echo ================================================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js is installed: 
node -v
echo.

REM Check if npm is installed
npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed.
    pause
    exit /b 1
)

echo npm is installed: 
npm -v
echo.

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    echo This may take a few minutes...
    call npm install
    echo Dependencies installed
) else (
    echo Dependencies already installed
)

echo.

REM Check if images are organized
if not exist "public\assets\images\featured" (
    echo Organizing images...
    echo Note: If this fails, manually copy images from \web\eg\ to \public\assets\images\
    node scripts\organize-images.js 2>nul || echo Image organization failed - please organize manually
) else (
    echo Images already organized
)

echo.

REM Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo Creating .env.local file...
    (
        echo # MOMI Fashion Website Environment Variables
        echo NEXT_PUBLIC_SITE_URL=http://localhost:3000
        echo NEXT_PUBLIC_API_URL=http://localhost:3001/api
    ) > .env.local
    echo .env.local created
) else (
    echo .env.local already exists
)

echo.
echo ================================================
echo               STARTING DEVELOPMENT SERVER        
echo ================================================
echo.
echo Starting the development server...
echo Open http://localhost:3000 in your browser
echo.
echo Press Ctrl+C to stop the server
echo ================================================
echo.

REM Start the development server
call npm run dev




