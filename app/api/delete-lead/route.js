import { db } from "@/firebase/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
      const { leadId } = await req.json();
  
      await deleteDoc(doc(db, "leads", leadId));
  
      return NextResponse.json(
        { message: "Lead deleted successfully!" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in API Route:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }