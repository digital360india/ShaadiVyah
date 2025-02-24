import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "boardingadmissioninfo@gmail.com",
    pass: "eifu vdan tjiu hspi",
  },
});

export async function POST(req) {
  try {
    const { email } = await req.json();

    const otp = Math.floor(100000 + Math.random() * 900000);

    // console.log(`Sending OTP to: ${email}`);

    const mailOptions = {
      from: "boardingadmissioninfo@gmail.com",
      to: email,
      subject: "Your OTP Verification Code",
      text: `✨ Your One-Time Password (OTP) is: ${otp} ✨\n\nPlease use this code to complete your verification.`, // Beautified email body
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      otp:otp,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to send OTP",
      error,
    });
  }
}
