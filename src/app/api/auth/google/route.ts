import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

// Helper function to decode JWT payload safely without extra dependencies
function decodeJwtPayload(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8");
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("JWT decoding failed:", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { credential } = await req.json();

    if (!credential) {
      return NextResponse.json(
        { success: false, error: "Missing Google credential token" },
        { status: 400 }
      );
    }

    const payload = decodeJwtPayload(credential);

    if (!payload || !payload.sub || !payload.email) {
      return NextResponse.json(
        { success: false, error: "Invalid Google credential payload" },
        { status: 400 }
      );
    }

    const { sub: googleId, name, email, picture } = payload;

    // Connect to MongoDB and upsert user
    await connectToDatabase();

    const user = await User.findOneAndUpdate(
      { googleId },
      {
        googleId,
        name: name || email.split("@")[0],
        email: email.toLowerCase(),
        picture: picture || "",
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        googleId: user.googleId,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error: any) {
    console.error("Google auth route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to authenticate with Google" },
      { status: 500 }
    );
  }
}
