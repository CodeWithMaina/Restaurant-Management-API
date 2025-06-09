import { Request, Response } from "express";
import {
  createCommentService,
  deletecommentService,
  getCommentByIdService,
  commentService,
  updateCommentService,
} from "./comment.servise";

export const getComments = async (req: Request, res: Response) => {
  try {
    const comments = await commentService();
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

export const getCommentById = async (req: Request, res: Response) => {
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

export const createComment = async (req: Request, res: Response) => {
  const comment = req.body;
  if (!comment.userId || !comment.commentText || !comment.orderId) {
    res.status(400).json({ error: "Required fields: userId, commentText, orderId" });
    return;
  }
  
  // Set default values for optional fields
  const commentData = {
    ...comment,
    isComplaint: comment.isComplaint || false,
    isPraise: comment.isPraise || false
  };

  try {
    const newComment = await createCommentService(commentData);
    res.status(201).json({ message: newComment });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create comment" });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  const commentId = parseInt(req.params.id);

  const commentCheck = await getCommentByIdService(commentId);
  if (!commentCheck) {
    res.status(404).json({ message: "Comment Not Found" });
    return;
  }

  const comment = req.body;
  if (!comment || Object.keys(comment).length === 0) {
    res.status(400).json({ error: "No fields provided for update" });
    return;
  }

  try {
    const updatedComment = await updateCommentService(comment, commentId);
    res.status(200).json({ message: updatedComment });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to update comment" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  const commentId = parseInt(req.params.id);
  const commentCheck = await getCommentByIdService(commentId);
  if (commentCheck == null) {
    res.status(200).json({ message: "Comment Not Found" });
    return;
  }
  if (isNaN(commentId)) {
    res.status(400).json({ error: "Invalid comment ID" });
    return; // Prevent further execution
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
