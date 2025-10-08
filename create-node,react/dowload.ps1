# Укажите цедевую дерикторию
$targetDir = 'C:\my-project'

# Создать дерикторию если не существует
New-Item -itemType Directory -Force -Path $targetDir
Set-Location $targetDir

# Установка Node.js (если не установлена)
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Установка Node.js..."
    winget install OpenJS.NodeJS -s msstore --accept-package-agreements
}

# Проверка npm
if (!(Get-Command npm  -ErrorAction SilentlyContinue)) {
    Write-Host"Ошибка nmp не доступен" -ForcegroundColor Red
    exit 1
}

# Инициалзация проекта и установка Eclectron
Write-Host "Установка Electron..."
npm init -y
npm install electron --save-dev

# Установка React.js через CRA
npx create-react-app react-app --template typescript

# Не забудьте указть название своего приложения (: