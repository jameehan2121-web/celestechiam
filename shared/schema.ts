import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  type: z.enum(["lesson", "playshop", "creativity_coaching", "teacher_training", "general"]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const inquiryTypeLabels: Record<ContactFormData["type"], string> = {
  lesson: "Piano Lessons",
  playshop: "Playshop / Workshop",
  creativity_coaching: "Creativity Consultation & Coaching",
  teacher_training: "Training for Music Teachers",
  general: "General Inquiry",
};
