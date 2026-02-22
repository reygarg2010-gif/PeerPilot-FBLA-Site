import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const tutorEmail = process.env.TUTOR_EMAIL;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }
    if (!tutorEmail) {
      return NextResponse.json(
        { success: false, error: "Missing TUTOR_EMAIL" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const body = await req.json();

    const {
      studentName,
      studentEmail,
      tutorName,
      topic,
      goal,
      duration,
      day,
      time,
      note,
    } = body;

    await resend.emails.send({
      from: "PeerPilot <onboarding@resend.dev>",
      to: tutorEmail,
      subject: `New Session Request: ${topic}`,
      html: `
        <h2>New PeerPilot Session Request</h2>
        <p><strong>Student:</strong> ${studentName}</p>
        <p><strong>Email:</strong> ${studentEmail}</p>
        <hr />
        <p><strong>Tutor:</strong> ${tutorName}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Goal:</strong> ${goal}</p>
        <p><strong>Duration:</strong> ${duration}</p>
        <p><strong>Requested Time:</strong> ${day} @ ${time}</p>
        ${note ? `<p><strong>Student Note:</strong><br/>${note}</p>` : ""}
        <hr />
        <p>Reply to this email to send the Zoom link.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Email error:", err);
    return NextResponse.json(
      { success: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}