import bodyParser from "body-parser";
import compression from "compression";
import path from "path";
import express, { Request, Response, NextFunction } from "express";
import { ApplicationError } from "./errors/application-error";
import cors from "cors";
import { router } from "./routes";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger-doc.json';

export const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 4000);

app.use(
  express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

app.use("/api", router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(
  (err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }

    return res.status(err.status || 500).json({
      error: process.env.NODE_ENV === "development" ? err : undefined,
      message: err.message,
    });
  }
);
