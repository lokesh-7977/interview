import express from "express";
import os from "os";
import type { Request, Response } from "express";
import { config } from "./config";
import { db } from "./db/connection";

const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Welcome to the interview!");
});

app.get("/health", async (_req: Request, res: Response) => {
  try {
    await db.selectFrom("users").select("id").limit(1).executeTakeFirst();

    res.status(200).json({
      status: "ok",
      service: "Interview Server",
      environment: config.NODE_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: "1.0.0",
      hostname: os.hostname(),
      checks: {
        database: "connected",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      service: "Interview Server",
      environment: config.NODE_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      checks: {
        database: "disconnected",
      },
      error: (error as Error).message,
    });
  }
});

export default app;
