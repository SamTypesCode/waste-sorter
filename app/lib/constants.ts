export function getGeminiPrompt(textInput: string) {
  return `Classify this item into either Recyclable, Compostable or Trash. The user may have given a only a text description or an image of the item, or perhaps both. User input: ${textInput}`;
}
