import * as fs from 'fs/promises';
import * as path from 'path';


interface Data {
    title: string,
    description: string,
    color: string,
    image: string
}

const filePath = "../../settings.json"


// Function to write JSON data to a file
export async function writeJsonFileAsync(data: Data): Promise<void> {
    const absolutePath = path.resolve(__dirname, filePath);
    const jsonData = JSON.stringify(data, null, 4);
    await fs.writeFile(absolutePath, jsonData, 'utf-8');
}


export async function readJsonFileAsync(): Promise<Data> {
    const absolutePath = path.resolve(__dirname, filePath);
    const jsonData = await fs.readFile(absolutePath, 'utf-8');
    const data: Data = JSON.parse(jsonData);
    return data;
}