import { useState } from 'react';
import { askClaude } from '../utils/aiClient';

export function useAI() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const getStyleAdvice = async (vibe) => {
    setLoading(true);
    setResponse('');
    const systemPrompt = "You are DripNest's AI Style Advisor — a fashion-forward, friendly assistant for an Indian fashion e-commerce brand. You specialize in outfit combinations, occasion dressing, and color coordination. Keep responses concise (3 bullet points max), warm, and stylish. When recommending, reference specific clothing categories available: men's tops, bottoms, outerwear; women's tops, dresses, skirts; accessories. Use italics for emphasis.";
    const userMessage = vibe;

    await askClaude(systemPrompt, userMessage, (chunk) => {
      setResponse(chunk);
    });
    setLoading(false);
  };

  const getStylingCombinations = async (productName) => {
    setLoading(true);
    setResponse('');
    const systemPrompt = "You are DripNest's AI Stylist. Given a product name, suggest 3 outfit combinations and occasions for it. Return as a bulleted list with stylish descriptions. Avoid generic talk.";
    const userMessage = `I'm looking at our ${productName}. Suggest 3 outfit combinations and occasions for it.`;

    await askClaude(systemPrompt, userMessage, (chunk) => {
      setResponse(chunk);
    });
    setLoading(false);
  };

  const getSearchIntent = async (query) => {
    setLoading(true);
    setResponse('');
    const systemPrompt = "You are DripNest's search assistant. Given a user's search query for fashion products, identify the top 3 most relevant product categories or specific item types from: [men's tops, men's bottoms, women's dresses, women's tops, accessories, outerwear]. Return ONLY a JSON array like: [\"category1\", \"category2\"]. No extra text.";
    const userMessage = query;

    let result = [];
    await askClaude(systemPrompt, userMessage, (chunk) => {
      setResponse(chunk);
    });
    setLoading(false);

    try {
      // Basic JSON cleaning if necessary
      const cleanJson = response.replace(/`json/g, '').replace(/`/g, '').trim();
      result = JSON.parse(cleanJson);
    } catch (e) {
      console.warn("Could not parse AI search intent JSON", e);
    }
    return result;
  };

  return { loading, response, getStyleAdvice, getStylingCombinations, getSearchIntent };
}
