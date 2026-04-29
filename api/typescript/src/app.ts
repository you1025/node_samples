import express from "express";
//import helmet from "helmet";
//import cors from "cors";
//import morgan from "morgan";
//import rateLimit from "express-rate-limit";
//import passport from "passport";
import ItemRoutes from "./routes/itemRoutes.js";

const app = express();

// for cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// ミドルウェア
app.use(express.json());

app.use("/api/items", ItemRoutes);

export default app;