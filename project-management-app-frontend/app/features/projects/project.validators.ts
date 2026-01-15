import z from "zod";

export const CreateProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  project_description: z.string().min(1, "Project description is required"),
  developers: z.array(z.number()).optional(),
  qas: z.array(z.number()).optional(),
});
