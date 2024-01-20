import fs from "fs/promises"
import path from "path";

/* const dbPath = `${__dirname}/../../database/`

export const load = async (filename: string): Promise<unknown> => {
  const data = await fs.readFile(`${dbPath}/${filename}.json`, "utf-8")
  return JSON.parse(data) as unknown
} */

const dbPath = path.resolve(__dirname, '../../database/');

export const load = async (filename: string): Promise<unknown> => {
  const filePath = path.join(dbPath, `${filename}.json`);
  
  console.log('Resolved File Path:', filePath);

  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data) as unknown;
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};

export const save = (filename: string, data: JSONStringifyable): Promise<void> =>
  fs.writeFile(`${dbPath}/${filename}.json`, JSON.stringify(data, null, 2) , "utf-8")

/* export const pics =  */

type Primitive = string | number | boolean | null
type JSONStringifyable = Primitive | JSONStringifyable[] | { [key: string]: JSONStringifyable }