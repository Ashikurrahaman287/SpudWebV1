import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
// CORS: in production, restrict to a comma-separated list of allowed origins
// via CORS_ORIGINS (e.g. "https://spudblocks.com,https://www.spudblocks.com").
// Otherwise allow any origin (dev convenience).
const corsOriginsEnv = process.env.CORS_ORIGINS?.trim();
if (corsOriginsEnv) {
  const allowed = corsOriginsEnv.split(",").map((s) => s.trim()).filter(Boolean);
  app.use(
    cors({
      origin(origin, cb) {
        if (!origin) return cb(null, true);
        cb(null, allowed.includes(origin));
      },
      allowedHeaders: ["Content-Type", "x-admin-token"],
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    }),
  );
} else {
  app.use(
    cors({
      allowedHeaders: ["Content-Type", "x-admin-token"],
      methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    }),
  );
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
