interface WasteEntry {
  id: string; // unique ID (e.g. UUID)
  image?: Blob; // store as base64 or blob URL
  text?: string; // user description
  aiResponse: string; // AI classification + tips
  createdAt: number; // timestamp
}
