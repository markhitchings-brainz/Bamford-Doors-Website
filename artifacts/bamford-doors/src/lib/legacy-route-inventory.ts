import migrationInventory from '../../content/migration-inventory.csv?raw';

export const legacyEntries = new Map<string, string>(
  migrationInventory
    .split(/\r?\n/)
    .slice(1)
    .filter(Boolean)
    .map((row): [string, string] => {
      const [url, type] = row.split(',', 2);
      try {
        return [new URL(url).pathname.replace(/\/+$/, '') || '/', type];
      } catch {
        return ['', ''];
      }
    })
    .filter(([path]) => Boolean(path)),
);
