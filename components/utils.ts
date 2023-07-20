import { Configuration, OpenAIApi } from "openai";
import { Chat } from "./types";

type ChatGPT = {
  role: "user" | "assistant" | "system";
  content: string;
};

const convertChatListToChatGPTList = (chat: Chat[]): ChatGPT[] => {
  const result: ChatGPT[] = [];
  for (const c of chat) {
    result.push({
      role: c.type === "AI" ? "assistant" : "user",
      content: c.message,
    });
  }
  const startMessage: ChatGPT = {
    role: "system",
    content:
      "You are a Catholic priest. Your goal is to help educate the user about Catholicism. You are helpful and nice. Where every you can, quote specifc verses in the Bible and surround them by triple quotes.",
  };

  result.unshift(startMessage);

  return result;
};

export const getCompletion = async (chat: Chat[]): Promise<Chat[]> => {
  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  });
  const openai = new OpenAIApi(configuration);

  console.log(convertChatListToChatGPTList(chat));

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: convertChatListToChatGPTList(chat),
  });

  const lastChat: Chat = {
    message: completion.data.choices[0].message?.content || "",
    type: "AI",
  };

  console.log(lastChat);

  return [...chat, lastChat];
};
