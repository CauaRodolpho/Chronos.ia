interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[]
    }
  }[]
}

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible'
    content: string
  }
  diagnosis: {
    content: string
  }
  suggestions: {
    items: string[]
  }
  extraIncome: {
    items: string[]
  }
  investment: {
    items: string[]
  }
  motivation: {
    content: string
  }
}

export interface ChatMessage {
  role: 'user' | 'model'
  text: string
}

const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)
const MODEL_NAME = 'gemini-flash-latest'
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

const callGeminiAPI = async (
  contents: { role: 'user' | 'model'; parts: { text: string }[] }[],
  systemInstruction?: string,
) => {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      ...(systemInstruction && {
        systemInstruction: { parts: [{ text: systemInstruction }] },
      }),
    }),
  })

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`)
  }

  return (await response.json()) as GeminiResponse
}

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI([
    { role: 'user', parts: [{ text: prompt }] },
  ])
  const json = response.candidates[0].content.parts[0].text
  return JSON.parse(json) as InsightData
}

export const sendChatMessage = async (
  history: ChatMessage[],
  systemInstruction: string,
) => {
  const contents = history.map((message) => ({
    role: message.role,
    parts: [{ text: message.text }],
  }))

  const response = await callGeminiAPI(contents, systemInstruction)
  return response.candidates[0].content.parts[0].text
}
