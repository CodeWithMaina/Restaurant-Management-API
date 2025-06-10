// comment.validator.ts
import { z } from "zod";
import { TCommentInsert } from "../drizzle/schema";

// Base comment schema
const baseCommentSchema = z.object({
  orderId: z.number().int().positive("Order ID must be a positive integer"),
  userId: z.number().int().positive("User ID must be a positive integer"),
  commentText: z.string().min(1, "Comment text is required"),
  isComplaint: z.boolean().default(false),
  isPraise: z.boolean().default(false)
});

// Schema for creating a comment (all fields required except optional ones)
export const createCommentSchema = baseCommentSchema;

// Schema for updating a comment (all fields optional)
export const updateCommentSchema = baseCommentSchema.partial();

// Schema for comment ID parameter
export const commentIdSchema = z.object({
  id: z.coerce.number().int().positive("Comment ID must be a positive integer")
});

// Type exports
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type CommentIdParams = z.infer<typeof commentIdSchema>;