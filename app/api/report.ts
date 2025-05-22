import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, message, metadata } = body;

    if (!type || !message) {
      return NextResponse.json({ error: "Missing report details" }, { status: 400 });
    }

    // Simulate storing report
    

    return NextResponse.json({ status: "ok" });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
