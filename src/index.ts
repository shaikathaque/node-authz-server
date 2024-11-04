import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

// Basic middleware for parsing JSON payloads
app.use(express.json());

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

const test = "hi";
const a = 1;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
