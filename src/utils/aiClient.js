const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export async function askClaude(systemPrompt, userMessage, onStream) {
  if (!ANTHROPIC_API_KEY) {
    console.warn("VITE_ANTHROPIC_API_KEY is not set. Using mock AI response.");
    const mockResponse = getMockAIResponse(userMessage);
    const words = mockResponse.split(" ");
    let currentText = "";
    for (let word of words) {
      currentText += word + " ";
      onStream(currentText);
      await new Promise(r => setTimeout(r, 50));
    }
    return;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
        'dangerously-allow-browser': 'true' // For client-side demo use
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 500,
        stream: true,
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!response.ok) throw new Error(`AI API error: ${response.statusText}`);

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullContent = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      const lines = chunk.split("\n");
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          try {
            const data = JSON.parse(line.slice(6));
            if (data.type === 'content_block_delta') {
              fullContent += data.delta.text;
              onStream(fullContent);
            }
          } catch (e) {
            // Ignore parse errors from non-json data chunks
          }
        }
      }
    }
  } catch (error) {
    console.error("AI client error:", error);
    onStream("Oops! I'm having trouble connecting to my fashion brain. Try again in a bit.");
  }
}

function getMockAIResponse(query) {
  const lowercase = query.toLowerCase();
  if (lowercase.includes("wedding")) {
    return "For a wedding, I suggest pairing our Lavender Linen Blazer with high-waist trousers. Add some gold accessories to elevate the look!";
  }
  if (lowercase.includes("office") || lowercase.includes("work")) {
    return "The Classic Beige Trench over a white silk blouse and slim chinos is the perfect office power move. Professional yet chic.";
  }
  return "That's a great vibe! To achieve that look, try mixing our signature violet tones with neutral essentials like our oversized cotton tee.";
}
