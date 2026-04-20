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
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 });
    }

    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"${name || 'Newsletter'}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: TO,
      subject: `[SoyGarfield Contacto] ${subject || 'Nuevo mensaje'}`,
      html: name
        ? `<p><strong>Nombre:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Asunto:</strong> ${subject || '—'}</p><hr/><p>${(message || '').replace(/\n/g, '<br>')}</p>`
        : `<p><strong>Newsletter:</strong> ${email}</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('sendContact error:', err);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
