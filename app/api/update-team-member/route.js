import { db } from "@/firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { leadId, ...updateData } = await req.json();

    await updateDoc(doc(db, "teammembers", leadId), updateData);
    return NextResponse.json(
      { message: "Team Member updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API Route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
