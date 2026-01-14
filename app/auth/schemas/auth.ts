import z from "zod"

export const signUpSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.email(),
    password: z.string().min(4)
});
