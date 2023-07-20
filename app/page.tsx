"use client";

import { SubmitButton } from "@/components/SubmitButton";
import { useState } from "react";

type Chat = {
  message: string;
  type: "AI" | "USER";
};

export default function Home() {
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [chatMessage, setChatMessage] = useState<string>("");

  const fetchChatResponse = async (history: Chat[]) => {
    // will have an API call here
    var chat: Chat = { message: "Hello", type: "AI" };
    var ch: Chat[] = [...history, chat];
    // set chat history after 400 ms delay
    setTimeout(() => {
      setChatHistory(ch);
    }, 400);
  };

  const onChatMessageSubmit = (message: string) => {
    var chat: Chat = { message, type: "USER" };
    var ch: Chat[] = [...chatHistory, chat];
    setChatHistory(ch);
    setChatMessage("");

    fetchChatResponse(ch);
    console.log("chatHistory", chatHistory);
  };

  const chatBar = (): JSX.Element => {
    return (
      <div className="flex flex-row items-center w-full gap-4 ">
        <div className="col-span-7 w-full">
          <input
            className="rounded-lg w-full border-gray-200 p-3 text-sm"
            placeholder="Send a message"
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            id="name"
          />
        </div>
        <div className="flex flex-row justify-end">
          {SubmitButton(
            "Send",
            () => onChatMessageSubmit(chatMessage),
            chatMessage.length === 0,
            chatMessage.length === 0
              ? "opacity-50 rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
              : "opacity-100 rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
          )}
        </div>
      </div>
    );
  };

  const chatHistoryComponent = (): JSX.Element => {
    const chatHistoryComponent = chatHistory.map(
      (chat, index: number): JSX.Element => {
        return (
          <div
            key={index.toString() + "chat"}
            className={index % 2 === 1 ? "pb-4" : ""}
          >
            {chat.type}: {chat.message}
          </div>
        );
      }
    );

    return <div className="py-10">{chatHistoryComponent}</div>;
  };

  return (
    <main className="flex min-h-screen flex-col sm:p-24 p-4">
      <div>Priest.chat</div>
      <div className="w-full flex-grow">
        <div className="mt-4 w-full">
          <div className="flex flex-row w-full "></div>
        </div>
        <div className="">{chatHistoryComponent()}</div>
      </div>
      <div className="flex flex-row sticky bottom-20 w-full mb-10">
        {chatBar()}
      </div>
    </main>
  );
}

{
  /* <button
            disabled={chatMessage.length === 0}
            onClick={() => onChatMessageSubmit(chatMessage)}
            className={
              chatMessage.length === 0
                ? "opacity-50 rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                : "opacity-100 rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
            }
          >
            Send
          </button> */
}
