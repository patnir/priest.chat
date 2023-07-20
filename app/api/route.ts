import { Chat } from "@/components/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: Chat[] = (await req.json()).history;

  return NextResponse.json([...body, { message: "Hi there", type: "AI" }], {
    status: 200,
  });
}
