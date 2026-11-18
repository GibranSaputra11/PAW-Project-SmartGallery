require("dotenv").config();
const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const PROVIDER = process.env.AI_PROVIDER || 'openrouter'; // 'gemini' | 'openrouter' | 'openai'

let client;
let MODEL_NAME;

if (PROVIDER === 'gemini') {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("⚠️ GEMINI_API_KEY belum diset di .env");
  }
  client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  MODEL_NAME = process.env.GEMINI_MODEL || "gemini-3.8-flash";
} else if (PROVIDER === 'openai') {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("⚠️ OPENAI_API_KEY belum diset di .env");
  }
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  });
  MODEL_NAME = process.env.OPENAI_MODEL || "gpt-4o-mini";
} else {
  // Default: OpenRouter (support NVIDIA, Gemini, Llama, Mistral, dll secara gratis/berbayar)
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn("⚠️ OPENROUTER_API_KEY belum diset di .env");
  }
  client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });
  MODEL_NAME = process.env.OPENROUTER_MODEL || "nvidia/nemotron-3.5-super-vl:free";
}

console.log(`🤖 AI Provider: ${PROVIDER} | Model: ${MODEL_NAME}`);

module.exports = { client, PROVIDER, MODEL_NAME };
