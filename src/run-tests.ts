import { glob } from 'glob';
import { pathToFileURL } from 'node:url';

const patterns = process.argv.slice(2);

if (patterns.length === 0) {
  throw new Error('No test pattern provided');
}

(async function () {
    for (const pattern of patterns) {
        const files = await glob(pattern);
      
       await Promise.all(files.map(file => import(pathToFileURL(file).href)));
      }
})();
