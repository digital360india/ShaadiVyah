import { NextResponse } from "next/server";
import { db } from "@/firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

export async function POST(req) {
  try {
    const body = await req.json();

    const { date, destination, budget, name, number, selectedFields } = body;

    if (!date || !destination || !budget || !name || !number) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    const docRef = await addDoc(collection(db, "leads"), {
      date,
      destination,
      budget,
      name,
      number,
      selectedFields,
      timestamp: new Date(),
    });

    return NextResponse.json(
      { message: "Form submitted successfully!", id: docRef.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in API Route:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
