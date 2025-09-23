import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// You can optionally export runtime = 'edge' if the SDK fully supports edge.
// export const runtime = 'nodejs';

interface GeminiRequestBody {
  question?: string;
  language: 'hindi' | 'english';
  image?: { data: string; mimeType: string } | null;
}

const buildPrompt = (language: 'hindi' | 'english', question?: string, isImage?: boolean) => {
  const structureHindi = `उत्तर का ढांचा:\n- संक्षिप्त सारांश (1 पंक्ति)\n- फसल / स्थिति पहचान\n- संभावित समस्याएं / कारण\n- तत्काल कदम (बुलेट)\n- पोषक तत्व / खाद सुझाव\n- पानी प्रबंधन\n- रोकथाम / अगले कदम\n\nजहाँ संभव हो मात्रा / समयावधि बताएं।`;
  const structureEnglish = `Answer structure:\n- One-line summary\n- Crop / condition identification\n- Possible issues / causes\n- Immediate actionable steps (bullets)\n- Nutrient / fertilizer recommendation\n- Water management\n- Prevention / next steps\nProvide quantities / timing where possible.`;

  if (isImage) {
    return language === 'hindi'
      ? `आप एक अनुभवी कृषि सलाहकार हैं। नीचे दी गई फसल की फोटो का विश्लेषण करें। ${structureHindi}`
      : `You are an experienced agronomy advisor. Analyze the crop photo. ${structureEnglish}`;
  }

  return language === 'hindi'
    ? `आप एक अनुभवी कृषि सलाहकार हैं। किसान ने पूछा है: "${question}"\n${structureHindi}`
    : `You are an experienced agronomy advisor. Farmer asked: "${question}"\n${structureEnglish}`;
};

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY; // fallback if already set
  if (!apiKey) {
    return NextResponse.json({
      error: 'Gemini API key missing. Set GEMINI_API_KEY in .env.local (server-side only).'
    }, { status: 500 });
  }

  let body: GeminiRequestBody;
  try {
    body = await req.json();
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { question, language, image } = body;
  if (!language) {
    return NextResponse.json({ error: 'language is required' }, { status: 400 });
  }
  if (!image && !question) {
    return NextResponse.json({ error: 'question is required when image is not provided' }, { status: 400 });
  }

  // Handle simple greetings with a handcrafted rich response (avoids wasting model quota)
  if (!image && question && /^(hi|hello|hey|namaste|नमस्ते)$/i.test(question.trim())) {
    if (language === 'hindi') {
      return NextResponse.json({
        text: `🌾 नमस्ते! मैं आपका Krishi सहायक हूँ। आप इन विषयों पर पूछ सकते हैं:\n\n• फसल की बीमारी पहचान\n• उर्वरक / NPK / सूक्ष्म पोषक तत्व की जरूरत\n• मिट्टी की उर्वरता बढ़ाने के तरीके\n• सिंचाई का सही समय और मात्रा\n• कीट नियंत्रण (जैविक व रासायनिक)\n• मौसम आधारित सलाह\n\nउदाहरण लिखें: "गेंहू में पत्तियाँ पीली हो रही हैं क्या करें" या "धान में पानी कब बदलें"`,
        model: 'manual-response'
      });
    }
    return NextResponse.json({
      text: `🌾 Hello! I'm your farm advisor. You can ask about:\n\n• Disease or pest identification\n• Fertilizer / NPK / micronutrient schedules\n• Improving soil health\n• Accurate irrigation timing & amount\n• Organic vs chemical pest control\n• Weather-based planning\n\nTry asking: "Leaves turning yellow in wheat" or "Best irrigation schedule for rice seedling stage"`,
      model: 'manual-response'
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    // Prefer faster model first; can extend list if needed
    const modelCandidates = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-pro'];
    let lastErr: any = null;
    for (const name of modelCandidates) {
      try {
        const model = genAI.getGenerativeModel({
          model: name,
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            topK: 40,
            maxOutputTokens: 768
          }
        });
        const prompt = buildPrompt(language, question, Boolean(image));
        const parts: any[] = [{ text: prompt }];
        if (image) {
          parts.push({ inlineData: { mimeType: image.mimeType, data: image.data } });
        }
        const result = await model.generateContent(parts);
        const text = result.response.text();
        // If model responded too tersely, append a gentle elaboration request once.
        let finalText = text;
        if (text && text.trim().split(/\s+/).length < 6 && !image && question) {
          finalText = `${text.trim()}\n\n(Add specifics on: nutrient needs, irrigation, and monitoring signs.)`;
        }
        return NextResponse.json({ text: finalText, model: name });
      } catch (err) {
        lastErr = err;
        // try next model
      }
    }
    if (lastErr) {
      const msg = (lastErr as any)?.message || 'Unknown Gemini API error';
      const apiInvalid = /API key not valid|API_KEY_INVALID/i.test(msg);
      return NextResponse.json({
        error: apiInvalid ? 'Invalid Gemini API key. Regenerate at Google AI Studio.' : msg,
        code: apiInvalid ? 'API_KEY_INVALID' : 'GENERIC_ERROR'
      }, { status: 400 });
    }
    return NextResponse.json({ error: 'Unable to generate content' }, { status: 500 });
  } catch (err: any) {
    const msg = err?.message || 'Unexpected server error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
