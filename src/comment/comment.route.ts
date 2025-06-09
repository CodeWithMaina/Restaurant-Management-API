import { Router } from "express";
import { createComment, getCommentById, getComments, updateComment, deleteComment } from "./comment.controller";

export const commentRouter = Router();

commentRouter.get("/comment", getComments);
commentRouter.get("/comment/:id", getCommentById);
commentRouter.post("/comment", createComment);
commentRouter.put("/comment/:id", updateComment);
commentRouter.delete("/comment/:id", deleteComment);
