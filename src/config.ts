import * as fs from 'fs';
import * as path from 'path';

export function getEnv(key: string): string | boolean | number {
  const data = JSON.parse(
    fs.readFileSync(path.join(path.resolve(''), './.env.json'), 'utf8'),
  );
  return data[key];
}
