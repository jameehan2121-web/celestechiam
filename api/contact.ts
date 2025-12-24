import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  name: string;
  email: string;
  type: "lesson" | "playshop" | "creativity_coaching" | "teacher_training" | "general";
  message: string;
}

const inquiryTypeLabels: Record<ContactFormData["type"], string> = {
  lesson: "Piano Lessons",
  playshop: "Playshop / Workshop",
  creativity_coaching: "Creativity Consultation & Coaching",
  teacher_training: "Training for Music Teachers",
  general: "General Inquiry",
};

function validateContactForm(data: unknown): ContactFormData {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid request body");
  }

  const { name, email, type, message } = data as Record<string, unknown>;

  if (typeof name !== "string" || name.length < 2) {
    throw new Error("Name must be at least 2 characters");
  }

  if (typeof email !== "string" || !email.includes("@")) {
    throw new Error("Invalid email address");
  }

  const validTypes = ["lesson", "playshop", "creativity_coaching", "teacher_training", "general"];
  if (typeof type !== "string" || !validTypes.includes(type)) {
    throw new Error("Invalid inquiry type");
  }

  if (typeof message !== "string" || message.length < 10) {
    throw new Error("Message must be at least 10 characters");
  }

  return {
    name,
    email,
    type: type as ContactFormData["type"],
    message,
  };
}

async function sendEmailViaResend(
  apiKey: string,
  recipientEmail: string,
  data: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  const emailPayload = {
    from: "Contact Form <onboarding@resend.dev>",
    to: [recipientEmail],
    subject: `New ${inquiryTypeLabels[data.type]} Inquiry from ${data.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Inquiry Type:</strong> ${inquiryTypeLabels[data.type]}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, "<br>")}</p>
    `,
    replyTo: data.email,
  };

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailPayload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error("Resend API error:", errorData);
    return { success: false, error: "Failed to send email" };
  }

  return { success: true };
}

function setCorsHeaders(res: VercelResponse, origin?: string) {
  const allowedOrigins = process.env.FRONTEND_URL 
    ? [process.env.FRONTEND_URL, 'http://localhost:5000', 'http://localhost:3000']
    : ['http://localhost:5000', 'http://localhost:3000'];
  
  const requestOrigin = origin || '';
  if (allowedOrigins.some(allowed => requestOrigin.startsWith(allowed)) || requestOrigin.includes('vercel.app')) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0] || '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res, req.headers.origin as string);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.RECIPIENT_EMAIL || 'celeste.pianist@gmail.com';

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const validatedData = validateContactForm(req.body);
    const result = await sendEmailViaResend(apiKey, recipientEmail, validatedData);

    if (!result.success) {
      return res.status(500).json({ error: result.error || 'Failed to send email' });
    }

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid request';
    return res.status(400).json({ error: errorMessage });
  }
}
