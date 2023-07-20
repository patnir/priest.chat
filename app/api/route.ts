import { Chat } from "@/components/types";
import { getCompletion } from "@/components/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body: Chat[] = (await req.json()).history;

  const completion = await getCompletion(body);

  return NextResponse.json(completion, {
    status: 200,
  });
}
