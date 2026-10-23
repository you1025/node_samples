import express from "express";
//import helmet from "helmet";
//import cors from "cors";
//import morgan from "morgan";
//import rateLimit from "express-rate-limit";
//import passport from "passport";
import ItemRoutes from "./routes/itemRoutes.js";
import AuthRoutes from "./routes/authRoutes.js";

const app = express();

// for cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// ミドルウェア
app.use(express.json());

// auth
app.use("/api/auth", AuthRoutes);

// 商品関連 api
app.use("/api/items", ItemRoutes);

export default app;