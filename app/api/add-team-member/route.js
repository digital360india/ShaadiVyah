import { NextResponse } from "next/server";
import { db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, phone, role, uid } = body;

    if (!name || !email || !phone || !role || !uid) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    await setDoc(doc(db, "teammembers", uid), {
      name,
      email,
      phone,
      role,
      uid,
      timestamp: new Date(),
    });

    return NextResponse.json(
      { message: "Team Member created successfully!", id: uid },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API Route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
