import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { User } from "../types/user.js";
import { RefreshToken } from "../types/refresh_token.js";

const ACCESS_TOKEN_SECRET  = "ACCESS_TOKEN_SECRET";
const REFRESH_TOKEN_SECRET = "REFRESH_TOKEN_SECRET";

const users: User[] = [];
const refreshTokens: RefreshToken[] = [];

// AccessToken の生成
const generateAccessToken = async (user: User)=> {
  const payload = {
    sub: String(user.id),
    email: user.email
  };
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

// RefreshToken の生成
const generateRefreshToken = async (user: User) => {
  const payload = {
    sub: String(user.id)
  };
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

// ユーザ作成
const signUp = async (req: Request, res: Response) => {
  try {
    if(!req.body) {
      return res.status(400).json({ error: "メールアドレスとパスワードが必要です" });
    }
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(400).json({ error: "メールアドレスとパスワードが必要です" });
    }

    // パスワードのハッシュ化
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 新規ユーザの登録
    const newUser: User = {
      id: users.length + 1,
      email: email,
      password: hashedPassword
    };
    users.push(newUser);

    return res.status(201).json({ message: "ユーザ登録が成功しました", UserID: newUser.id });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ error: "サーバーエラーです"});
  }
};

// ログイン
const signIn = async (req: Request, res: Response) => {
  try {
    if(!req.body) {
      return res.status(400).json({ error: "メールアドレスとパスワードが必要です" });
    }
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(400).json({ error: "メールアドレスとパスワードが必要です" });
    }

    const user = users.find(u => u.email === email);
    if(!user){
      return res.status(401).json({ error: "メールアドレスとパスワードの組み合わせが間違っています" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(401).json({ error: "メールアドレスとパスワードの組み合わせが間違っています" });
    }

    const accessToken  = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    refreshTokens.push({
      userId: user.id,
      token: refreshToken
    })

    return res.status(200).json({
      message: "ログインに成功しました",
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
};

// AccessToken による認証
const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if(!token){
    return res.status(401).json({ error: "アクセストークンが必要です" });
  }

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
    if(err || !decoded || typeof decoded === "string") {
      return res.status(403).json({error: "アクセストークンが無効です"});
    }

    req.user = {
      id: decoded.sub,
      email: decoded.email
    }
    next();
  });
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if(!refreshToken){
      return res.status(400).json({ error: "リフレッシュトークンが必要です" });
    }

    const tokenExists = refreshTokens.some(t => t.token === refreshToken);
    if(!tokenExists){
      return res.status(403).json({ error: "無効なトークンです" });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if(err) {
        return res.status(403).json({ error: "リフレッシュトークンの有効期限が切れています" });
      }
      if(!decoded || typeof decoded === "string") {
        return res.status(403).json({ error: "無効なトークンです" });
      }

      const user = users.find(u => String(u.id) === decoded.sub);
      if(!user){
        return res.status(403).json({ error: "ユーザが見つかりません"});
      }

      const newAccessToken = await generateAccessToken(user);

      return res.status(200).json({
        accessToken: newAccessToken
      })
    })
  } catch(error) {
    console.error(error);
    return res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
}


export { signUp, signIn, authenticateToken, refreshToken };