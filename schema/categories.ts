import { z } from "zod";

export const CreateCategorySchema = z.object({
	name: z.string().min(3).max(20),
	icon: z.string().max(20),
	type: z.enum(["expense", "income"]),
});

// for server-side use
export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

export const DeleteCategorySchema = z.object({
	name: z.string().min(3).max(20),
	type: z.enum(["expense", "income"]),
});

// for server-side use
export type DeleteCategorySchemaType = z.infer<typeof DeleteCategorySchema>;
