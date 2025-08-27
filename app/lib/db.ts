import { set, get, keys, del } from "idb-keyval";

export async function saveEntry(entry: WasteEntry) {
  await set(entry.id, entry);
}

export async function getEntry(id: string): Promise<WasteEntry | undefined> {
  return await get(id);
}

export async function getAllEntries(): Promise<WasteEntry[]> {
  const allKeys = await keys();
  const entries: WasteEntry[] = [];
  for (const key of allKeys) {
    const item = await get(key);
    if (item) entries.push(item as WasteEntry);
  }
  return entries.sort((a, b) => b.createdAt - a.createdAt);
}

export async function deleteEntry(id: string) {
  await del(id);
}

export function generateUUID(): string {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] & 0xf) >> 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
