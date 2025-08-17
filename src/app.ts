import express from "express";
import os from "os";
import type { Request, Response } from "express";
import { PrismaClient } from "./prisma/client";
import { config } from "./config";

const prisma = new PrismaClient();
const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Welcome to the interview!");
});

app.get("/health", async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

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
