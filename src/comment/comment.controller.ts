import { Request, Response, RequestHandler } from "express";
import {
  createCommentService,
  deletecommentService,
  getCommentByIdService,
  getCommentService,
  getCommentServiceByRestaurantId,
  updateCommentService,
} from "./comment.servise";
import { commentIdSchema, CreateCommentInput, createCommentSchema, UpdateCommentInput, updateCommentSchema } from "../validations/comment.validator";
import { z } from "zod";

export const getComments: RequestHandler = async (req: Request, res: Response) => {
  try {
    const comments = await getCommentService();
    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: "No comments found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch comments" });
  }
};

export const getCommentById: RequestHandler = async (req: Request, res: Response) => {
  const commentId = parseInt(req.params.id);
  if (isNaN(commentId)) {
    res.status(400).json({ error: "Invalid comment ID" });
    return; // Prevent further execution
  }
  try {
    const comment = await getCommentByIdService(commentId);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch comment" });
  }
};

export const createComment: RequestHandler = async (req: Request, res: Response) => {
  try {
     const validatedData: CreateCommentInput = createCommentSchema.parse({
      ...req.body,
      isComplaint: req.body.isComplaint || false,
      isPraise: req.body.isPraise || false
    });
    
    const newComment = await createCommentService(validatedData);
    res.status(201).json({ message: newComment });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: error.message || "Failed to create comment" });
  }
};

export const updateComment: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { id } = commentIdSchema.parse(req.params);
    // const validatedData: UpdateCommentInput = updateCommentSchema.parse(req.body);
    const validatedData = req.body;
    
    const commentCheck = await getCommentByIdService(id);
    if (!commentCheck) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }
    
    const updatedComment = await updateCommentService(validatedData, id);
    res.status(200).json({ message: updatedComment });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: error.message || "Failed to update comment" });
  }
};

export const deleteComment: RequestHandler = async (req: Request, res: Response) => {
  const commentId = parseInt(req.params.id);
  if (isNaN(commentId)) {
    res.status(400).json({ error: "Invalid comment ID" });
    return; // Prevent further execution
  }
  
  const commentCheck = await getCommentByIdService(commentId);
  if (commentCheck == null) {
    res.status(404).json({ message: "Comment Not Found" });
    return;
  }
  
  try {
    const deletedComment = await deletecommentService(commentId);
    res.status(200).json({ message: deletedComment });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to delete comment" });
  }
};


export const getCommentsByRestaurantIdController: RequestHandler = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurantIdNum = Number(restaurantId);
    if (isNaN(restaurantIdNum)) {
      res.status(400).json({ error: 'Invalid restaurant ID' });
      return;
    }

    const comments = await getCommentServiceByRestaurantId(restaurantIdNum);
    if (comments?.length) {
      res.status(200).json(comments);
    } else {
      res.status(404).json({ message: 'No comments found' });
    }
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    res.status(500).json({ error: err.message });
  }
};