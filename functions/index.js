const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

// Configure via Firebase environment variables:
//   firebase functions:secrets:set SMTP_HOST SMTP_PORT SMTP_USER SMTP_PASS
// Or for local dev, create functions/.env with those keys.
const getTransporter = () => nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const TO = 'marketing@manyadigital.com.ar';

const SECRETS = { secrets: ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'] };

exports.sendContact = functions.runWith(SECRETS).https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const transporter = getTransporter();
      await transporter.sendMail({
        from: `"${name}" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: TO,
        subject: `[SoyGarfield Contacto] ${subject || 'Nuevo mensaje'}`,
        html: `
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Asunto:</strong> ${subject || '—'}</p>
          <hr/>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('sendContact error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  });
});

exports.sendWrite = functions.runWith(SECRETS).https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { fullName, email, linkedinUrl, topicProposal, sampleContent } = req.body;
    if (!fullName || !email || !topicProposal) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const transporter = getTransporter();
      await transporter.sendMail({
        from: `"${fullName}" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: TO,
        subject: `[SoyGarfield Colaboración] ${topicProposal}`,
        html: `
          <p><strong>Nombre:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>LinkedIn:</strong> ${linkedinUrl || '—'}</p>
          <p><strong>Propuesta:</strong> ${topicProposal}</p>
          <hr/>
          <p><strong>Muestra:</strong></p>
          <p>${(sampleContent || '').replace(/\n/g, '<br>')}</p>
        `,
      });
      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('sendWrite error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }
  });
});
