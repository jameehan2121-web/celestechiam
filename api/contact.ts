import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

const inquiryTypeLabels: Record<string, string> = {
  lesson: "Piano Lessons",
  playshop: "Playshop / Workshop",
  creativity_coaching: "Creativity Consultation & Coaching",
  teacher_training: "Training for Music Teachers",
  general: "General Inquiry"
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Allow the frontend to talk to this API (CORS)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle browser security checks
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, type, message } = req.body;

    // 2. Send the email
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', 
      to: [process.env.RECIPIENT_EMAIL || 'celeste.pianist@gmail.com'],
      replyTo: email, // Changed from reply_to to replyTo
      subject: `New Inquiry: ${inquiryTypeLabels[type] || 'General'}`,
      html: `
        <h2>New Message from ${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${inquiryTypeLabels[type] || type}</p>
        <hr />
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true, id: data?.id });

  } catch (err) {
    console.error('Server Error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
