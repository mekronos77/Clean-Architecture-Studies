import type { NextFunction, Request, Response } from "express";
import z, { ZodError, ZodType } from "zod";

export function zodValidation(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Validation error",
          issues: z.prettifyError(error)
        });
      }
      return res.status(500).json({
        message: "Unexpected error while validating data."
      });
    }
  };
}
