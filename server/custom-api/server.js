import express from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import knex from "knex";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
dotenv.config(); // đọc biến môi trường từ .env

const app = express();
app.use(cors()); // 👈 Thêm dòng này
app.use(bodyParser.json());

// 🔹 Kết nối DB (chỉnh thông tin trong .env)
const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "123456a@",
    database: process.env.DB_NAME || "RecruimentManagement",
    port: process.env.DB_PORT || "3307", 
  },
});

// Endpoint test
app.get("/", (req, res) => {
  res.send("✅ Custom API server is running...");
});

// Endpoint login
app.post("/api/custom-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm user theo EmailKichHoat
    const user = await db("NguoiDung")
      .where({ EmailKichHoat: email })
      .first();

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.MatKhauHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong password" });
    }

    // Tạo token JWT
    const token = jwt.sign(
      {
        id: user.MaNguoiDung_ID,
        email: user.EmailKichHoat,
        username: user.TenNguoiDung,
      },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login thành công ✅",
      token,
      user: {
        id: user.MaNguoiDung_ID,
        email: user.EmailKichHoat,
        username: user.TenNguoiDung,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(4000, () => {
  console.log("✅ Custom API running at: http://localhost:4000");
});
