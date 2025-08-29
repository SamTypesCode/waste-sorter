export const responseFormat = `{
  "category": "recyclable", // One of: "recyclable", "compostable", "trash", or "none".
                            // Use "none" only if it’s not a physical item (e.g. abstract, irrelevant).

  "name": "object name",    // Keep it very short, e.g. "Glass", "Plastic Bottle", "Banana Peel".

  "note": "handling instructions" // Short, direct action on what to do with it.
                                  // Example: "Wrap in paper, seal in container, label 'Broken Glass', throw in trash."
}`;

export function getGeminiPrompt(textInput: string) {
  return `Classify this item into either Recyclable, Compostable or Trash. The user may have given a only a text description or an image of the item, or perhaps both. User input: ${textInput}. Your response should ALWAYS follow this format: ${responseFormat}, DO NOT put any content outside that format or include anything additional.`;
}
