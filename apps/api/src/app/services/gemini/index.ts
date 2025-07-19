import { GoogleGenAI } from "@google/genai";
import config from "../../config";

export const genAI = new GoogleGenAI({
  apiKey: config.gemini_api_key,
});
