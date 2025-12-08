import axios from 'axios';

const deepseekApi = axios.create({
  baseURL: process.env.DEEPSEEK_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const sendMessageToDeepSeek = async (message) => {
  try {
    const response = await deepseekApi.post('', {
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });
    // console.log('DeepSeek response:', response.data.choices[0].message);
    return response.data.choices[0];
  } catch (error) {
    console.error('Erro ao chamar DeepSeek:', error);
    throw error;
  }
};