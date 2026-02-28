import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUOTES_FILE = path.join(__dirname, "quotes.json");

// Ensure quotes file exists
if (!fs.existsSync(QUOTES_FILE)) {
  fs.writeFileSync(QUOTES_FILE, JSON.stringify([], null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

  // API Routes
  app.post("/api/login", (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      // In a real app, we'd use a JWT or session. For this demo, we'll return a simple success.
      res.json({ success: true, token: "admin-token-123" });
    } else {
      res.status(401).json({ error: "Invalid password" });
    }
  });

  const authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers["authorization"];
    if (token === "admin-token-123") {
      next();
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  };

  app.post("/api/quotes", (req, res) => {
    try {
      const { name, phone, email, message, service } = req.body;
      
      if (!name || !phone || !email) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const quotes = JSON.parse(fs.readFileSync(QUOTES_FILE, "utf-8"));
      const newQuote = {
        id: Date.now(),
        name,
        phone,
        email,
        message,
        service,
        timestamp: new Date().toISOString(),
      };

      quotes.push(newQuote);
      fs.writeFileSync(QUOTES_FILE, JSON.stringify(quotes, null, 2));

      res.status(201).json({ message: "Quote saved successfully", quote: newQuote });
    } catch (error) {
      console.error("Error saving quote:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/quotes", authMiddleware, (req, res) => {
    try {
      const quotes = JSON.parse(fs.readFileSync(QUOTES_FILE, "utf-8"));
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
