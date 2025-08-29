import React, { useState } from "react";
import { askAIWithText, askAIWithImageAndText } from "../lib/gemini";
import { getGeminiPrompt } from "~/lib/constants";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [response, setResponse] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!text && !image) {
      setError("Please input either a text description or select an image");
      return;
    }

    setLoading(true);
    setError(undefined);
    setResponse(undefined);

    try {
      const prompt = getGeminiPrompt(text);
      if (image) {
        const res = await askAIWithImageAndText(image, prompt);
        setResponse(res);
      } else {
        const res = await askAIWithText(prompt);
        setResponse(res);
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setImage(file);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Waste Sorter (Test)</h1>

      <div>
        <label>
          Description (optional):
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., 'paper cup with plastic lid'"
          />
        </label>
      </div>

      <div>
        <label>
          Image (optional):
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {error && <div>Error: {error}</div>}

      {response && <div>AI Response: {response}</div>}
    </form>
  );
}
