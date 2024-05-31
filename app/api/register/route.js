import { NextResponse } from "next/server";
import { db } from '@/mongodb';
import bcrypt from 'bcryptjs';
import User from '@/models/Users.js';

export async function POST(req) {
  try {
    const { email,name, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await db();

    await User.create({  email, name, password: hashedPassword });
    return NextResponse.json(
      {
        message: "User registered",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      { status: 500 }
    );
  }
}
