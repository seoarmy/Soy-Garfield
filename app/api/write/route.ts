import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const TO = 'marketing@manyadigital.com.ar';

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, linkedinUrl, topicProposal, sampleContent } = await req.json();
    if (!fullName || !email || !topicProposal) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"${fullName}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: TO,
      subject: `[SoyGarfield Colaboración] ${topicProposal}`,
      html: `<p><strong>Nombre:</strong> ${fullName}</p><p><strong>Email:</strong> ${email}</p><p><strong>LinkedIn:</strong> ${linkedinUrl || '—'}</p><p><strong>Propuesta:</strong> ${topicProposal}</p><hr/><p>${(sampleContent || '').replace(/\n/g, '<br>')}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('sendWrite error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
