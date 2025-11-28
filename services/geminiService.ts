import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Transcribes audio blob using Gemini 2.5 Flash.
 * @param audioBlob The recorded audio blob.
 * @returns The transcribed text.
 */
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    const base64Data = await blobToBase64(audioBlob);
    
    // Using gemini-2.5-flash for speed and efficiency
    const modelId = "gemini-2.5-flash"; 
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: audioBlob.type, 
              data: base64Data,
            },
          },
          {
            text: "Transcribe this audio exactly as spoken. Return only the text.",
          },
        ],
      },
    });

    const text = response.text;
    return text || "";
  } catch (error) {
    console.error("Transcription error:", error);
    throw new Error("Failed to transcribe audio.");
  }
};

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g., "data:audio/webm;base64,")
      const base64Data = base64String.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
