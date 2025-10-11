#/bin/bash

# укажите целевую деректорию
TARGET_DIR='$HOME/my-project'

# Создать деректорию если не существует
mkdir -p "$TAGET-DIR"
cd "$TAGET_DIR"

# Установка Node.js (для Ubuntu/Debain)
if ! command -v node &> /dev/null; then
    echo "Установка Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_its.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Проверка npm 
if ! command -v npm &> /dev/null; then
    echo "Ошибка: npm не доступен "
    exit 1 
fi 

echo "Установка Electron..."
npm init -y 
npm install electron --save-dev

# Установка React.js
npx create-react-app react-app --temalate typescript