import { app, BrowserWindow } from 'electron'
import path from 'path'

const isDev = process.env.NODE_ENV === 'development';

app.on("ready", () => {
    const mainWindow = new BrowserWindow({});
    if(isDev){
        mainWindow.loadURL('http://localhost:5123')
    }else{
        mainWindow.loadFile(path.join(__dirname, '../dist-react/index.html'));
    }
});