const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let backendProcess;

function createWindow() {
  // Запуск C++ бэкенда
  const backendPath = path.join(__dirname, 'backend', 'build', 'backend.exe');
  backendProcess = spawn(backendPath);
  
  backendProcess.stdout.on('data', (data) => {
    console.log(Backend: ${data});
  });
  
  backendProcess.stderr.on('data', (data) => {
    console.error(Backend error: ${data});
  });

  // Создание окна браузера
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // Загрузка React-приложения
  mainWindow.loadURL(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : file://${path.join(__dirname, 'build/index.html')}
  );
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Завершение работы бэкенда при закрытии приложения
    if (backendProcess) backendProcess.kill();
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
