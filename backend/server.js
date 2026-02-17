const express = require("express");
const cors = require("cors");
const db = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ error: "토큰 없음"});
    }

    const token = header.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        return res.status(401).json({ error: "토큰 인증 실패"});
    }
}

app.post("/todos", auth, (req, res) => {
    const { text } = req.body;
    const userId = req.userId;

    const sql = "INSERT INTO todos (text, user_id) VALUES (?, ?)";

    db.query(sql, [text, userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "DB 저장 실패"});
        }

        res.json({
            success: true,
            id: result.insertId
        });
    });
});

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO users(email, password) VALUES (?, ?)";

        db.query(sql, [email, hashed], (err, result) => {
            if(err) {
                console.error(err);
                return res.status(500).json({ error: "회원가입 실패" });
            }

            res.json({ success: true });
        });
    } catch (err) {
        res.status(500).json({ error: "암호화 실패" });
    }
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], async (err, result) => {
        if(err || result.length === 0) {
            return res.status(401).json({ error: "유지 없음" });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: "비밀번호를 틀렸습니다"});
        }

        const token = jwt.sign(
            { userId: user.id },
            SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    });
});

app.get("/todos", auth, (req, res) => {
    const sql = "SELECT * FROM todos WHERE user_id=? ORDER BY id DESC";

    db.query(sql, [req.userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "조회 실패"});
        }

        res.json(result);
    });
});

app.patch("/todos/:id", (req, res) => {
    const {id } = req.params;
    const { completed } = req.body;

    const sql = "UPDATE todos SET completed=? WHERE id=?";

    db.query(sql, [completed, id], (err, result) => {
        if(err) {
            console.error(err);
            return res.status(500).json({ error: "업데이트 실패"});
        }

        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});