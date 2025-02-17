import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const querySnapshot = await getDocs(collection(db, "leads"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return NextResponse.json(
      {
        message: data.length ? "Data fetched successfully!" : "No leads found",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API Route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}