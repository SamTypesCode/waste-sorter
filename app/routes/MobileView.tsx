import { useState } from "react";
import { getGeminiPrompt } from "~/lib/constants";
import { askAIWithImageAndText, askAIWithText } from "~/lib/gemini";

export default function MobileView({ className }: { className?: string }) {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File input changed", e.target.files);
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <h1>Waste Sorter (Test)</h1>

      <div>
        <label htmlFor="description">
          Description (optional):
          <textarea
            id="description"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., 'paper cup with plastic lid'"
          />
        </label>
      </div>

      <div>
        <label htmlFor="fileInput">Image (optional):</label>
        <input
          id="fileInput"
          type="file"
          accept="image/*,android/allowCamera"
          capture="environment"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit"}
      </button>

      {image && <img src={URL.createObjectURL(image)} alt="preview" />}

      {error && <div>Error: {error}</div>}

      {response && <div>AI Response: {response}</div>}
    </form>
  );
}
