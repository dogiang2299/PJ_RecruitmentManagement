import express from "express";
import mysql from "mysql2/promise";
import bcrypt from "bcrypt";

const app = express();
app.use(express.json());

// Kết nối MySQL
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "123456a@",     // đổi cho phù hợp
  database: "RecruimentManagement",
  port: 3307,
});

const BCRYPT_SALT_ROUNDS = 10;

// Kiểm tra chuỗi có phải bcrypt hash hay không
function isBcryptHash(val) {
  if (typeof val !== "string") return false;
  // regex matching $2a/$2b/$2y format with 53 chars after cost -> total length 60
  return /^\$2[aby]\$\d{2}\$[A-Za-z0-9./]{53}$/.test(val);
}

// Convert datetime ISO -> MySQL DATETIME và hash password nếu cần
async function prepareDataForDb(obj) {
  // clone shallow
  const newObj = { ...obj };

  for (const key of Object.keys(newObj)) {
    const v = newObj[key];

    // 1) Convert Date objects or ISO strings to MySQL DATETIME
    if (v instanceof Date) {
      newObj[key] = v.toISOString().slice(0, 19).replace("T", " ");
    } else if (typeof v === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(v)) {
      // convert ISO like 2025-09-04T18:41:25.000Z
      newObj[key] = new Date(v).toISOString().slice(0, 19).replace("T", " ");
    }

    // 2) Auto-hash password-like fields
    // Nếu key chứa 'matkhau' hoặc 'password' (không phân biệt hoa thường) => coi là mật khẩu
    const lowerKey = key.toLowerCase();
    if ((lowerKey.includes("matkhau") || lowerKey.includes("password") || lowerKey.includes("pass")) && typeof newObj[key] === "string") {
      // nếu đã là bcrypt hash thì không làm gì
      if (!isBcryptHash(newObj[key])) {
        // hash và đặt lại
        try {
          const hashed = await bcrypt.hash(newObj[key], BCRYPT_SALT_ROUNDS);
          newObj[key] = hashed;
        } catch (err) {
          // nếu hash lỗi, throw để handler trả lỗi
          throw new Error("Error hashing password: " + err.message);
        }
      }
    }
  }

  return newObj;
}

// Lấy danh sách bảng + primary key
async function getTablesAndPrimaryKeys() {
  const [tables] = await pool.query(
    "SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = DATABASE()"
  );

  const tableInfo = {};
  for (let t of tables) {
    const [keys] = await pool.query(
      `SELECT COLUMN_NAME 
       FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_KEY = 'PRI'`,
      [t.TABLE_NAME]
    );
    if (keys.length > 0) {
      tableInfo[t.TABLE_NAME] = keys[0].COLUMN_NAME;
    }
  }
  return tableInfo;
}

// Tạo route CRUD tự động
async function generateCrudRoutes() {
  const tableInfo = await getTablesAndPrimaryKeys();

  for (let table in tableInfo) {
    const pk = tableInfo[table];

    // GET all
    app.get(`/api/${table}`, async (req, res) => {
      try {
        const [rows] = await pool.query(`SELECT * FROM \`${table}\``);
        res.json(rows);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // GET by id
    app.get(`/api/${table}/:id`, async (req, res) => {
      try {
        const [rows] = await pool.query(`SELECT * FROM \`${table}\` WHERE \`${pk}\` = ?`, [req.params.id]);
        res.json(rows[0] || null);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // POST create
    app.post(`/api/${table}`, async (req, res) => {
      try {
        const data = await prepareDataForDb(req.body);
        const keys = Object.keys(data);
        const values = Object.values(data);

        if (keys.length === 0) {
          return res.status(400).json({ error: "No data provided" });
        }

        const placeholders = keys.map(() => "?").join(",");
        const sql = `INSERT INTO \`${table}\` (${keys.map(k => `\`${k}\``).join(",")}) VALUES (${placeholders})`;
        const [result] = await pool.query(sql, values);
        res.json({ insertedId: result.insertId });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // PUT update
    app.put(`/api/${table}/:id`, async (req, res) => {
      try {
        const data = await prepareDataForDb(req.body);
        const keys = Object.keys(data);
        const values = Object.values(data);

        if (keys.length === 0) {
          return res.status(400).json({ error: "No data provided" });
        }

        const setClause = keys.map(k => `\`${k}\` = ?`).join(", ");
        const sql = `UPDATE \`${table}\` SET ${setClause} WHERE \`${pk}\` = ?`;
        const [result] = await pool.query(sql, [...values, req.params.id]);
        res.json({ affectedRows: result.affectedRows });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    // DELETE
    app.delete(`/api/${table}/:id`, async (req, res) => {
      try {
        const [result] = await pool.query(`DELETE FROM \`${table}\` WHERE \`${pk}\` = ?`, [req.params.id]);
        res.json({ affectedRows: result.affectedRows });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });

    console.log(`✅ CRUD routes generated for table: ${table} (pk: ${pk})`);
  }
}

// Khởi động server
generateCrudRoutes().then(() => {
  app.listen(3007, () => console.log("Server running at http://localhost:3007"));
}).catch(err => {
  console.error("Failed to generate routes:", err);
  process.exit(1);
});
