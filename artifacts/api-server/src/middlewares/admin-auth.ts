import type { Request, Response, NextFunction } from "express";

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const expected = process.env["ADMIN_PASSWORD"] ?? "spudblocks2024";
  const got = req.header("x-admin-token");
  if (!got || got !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
