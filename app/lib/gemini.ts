import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
});

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function askAIWithText(text: string): Promise<string | undefined> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ text }],
  });
  return response.text;
}

export async function askAIWithImageAndText(
  image: File | Blob,
  text: string
): Promise<string | undefined> {
  const base64 = await blobToBase64(image);
  const base64Data = base64.split(",")[1];

  const contents = [
    {
      inlineData: {
        mimeType: image.type,
        data: base64Data,
      },
    },
    { text },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents,
  });

  return response.text;
}
