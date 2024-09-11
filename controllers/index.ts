import fs from 'fs';
import path from 'path';

const controllersPath = path.join(__dirname);
const controllers: { [key: string]: any } = {};

fs.readdirSync(controllersPath).forEach((folder) => {
    const folderPath = path.join(controllersPath, folder);

    if (fs.statSync(folderPath).isDirectory()) {
        controllers[folder] = {};

        fs.readdirSync(folderPath).forEach((file) => {
            const filePath = path.join(folderPath, file);
            const fileName = path.parse(file).name;
            controllers[folder][fileName] = require(filePath).default;
        });        
    }
});

export default controllers;
