import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { referredBy, userId } = body;

    if (!userId || !referredBy) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Simulate writing referral to database
    

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
