import * as fs from 'fs';
import * as path from 'path';

export abstract class Utils {
  static isFunction(obj: any) {
    return obj && (Object.prototype.toString.call(obj) === '[object Function]' || Object.prototype.toString.call(obj) === '[object AsyncFunction]');
  }

  static readdir(path: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, (err, files) => {
        if (err) reject(err);
        resolve(files);
      });
    });
  }

  static getStat(path: string): Promise<fs.Stats> {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stat) => {
        if (err) reject(err);
        resolve(stat);
      });
    });
  }

  static async getFile(filePath: string) {
    const allFiles: string[] = [];
    const filenames = await Utils.readdir(filePath);
    for (const filename of filenames) {
      const file = path.join(filePath, filename);
      const stat = await Utils.getStat(file);
      if (stat && stat.isFile()) {
        allFiles.push(file);
      } else if (stat && stat.isDirectory()) {
        const f = await Utils.getFile(file);
        allFiles.push(...f);
      }
    }
    return allFiles;
  }

  static extractArgs(fn: Function) {
    const args = fn.toString().match(/^[^\(]*\(\s*([^\)]*)\)/m);
    if (args && args[1]) {
      return args[1].split(',').map(a => a.trim());
    } else {
      return [];
    }
  }
}
