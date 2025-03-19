const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db"); // الاتصال بقاعدة البيانات
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

// نقطة نهاية لتسجيل المستخدمين
app.post("/api/register", (req, res) => {
  console.log("بيانات التسجيل:", req.body);
  const { name, password, phase, level } = req.body;
  if (!name || !password || !phase || !level) {
    return res.status(400).json({ error: "يجب ملء جميع الحقول" });
  }
  // التحقق إن كان الاسم موجود مسبقًا
  const checkQuery = "SELECT * FROM esmo_erouf WHERE name = ?";
  db.query(checkQuery, [name], (err, results) => {
    if (err) {
      console.error("خطأ في التحقق من المستخدم:", err);
      return res.status(500).json({ error: "حدث خطأ أثناء التحقق" });
    }
    if (results.length > 0) {
      return res.status(400).json({ error: "المستخدم موجود مسبقاً" });
    }
    // إدخال بيانات المستخدم
    const insertQuery =
      "INSERT INTO esmo_erouf (name, password, phase, level) VALUES (?, ?, ?, ?)";
    db.query(insertQuery, [name, password, phase, level], (err, results) => {
      if (err) {
        console.error("خطأ أثناء التسجيل:", err);
        return res.status(500).json({ error: "حدث خطأ أثناء التسجيل" });
      }
      res.json({ message: "تم التسجيل بنجاح" });
    });
  });
});

// نقطة نهاية لتسجيل الدخول
app.post("/api/login", (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "يجب ملء جميع الحقول" });
  }
  const query = "SELECT * FROM esmo_erouf WHERE name = ? AND password = ?";
  db.query(query, [name, password], (err, results) => {
    if (err) {
      console.error("خطأ أثناء تسجيل الدخول:", err);
      return res.status(500).json({ error: "حدث خطأ أثناء تسجيل الدخول" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "بيانات الدخول غير صحيحة" });
    }
    res.json({ message: "تم تسجيل الدخول بنجاح", user: results[0] });
  });
});

// نقطة نهاية لاسترجاع جميع المستخدمين (لوحة تحكم)
app.get("/api/users", (req, res) => {
  const query = "SELECT * FROM Esmo Erouf";
  db.query(query, (err, results) => {
    if (err) {
      console.error("خطأ في جلب المستخدمين:", err);
      return res.status(500).json({ error: "حدث خطأ أثناء جلب البيانات" });
    }
    res.json(results);
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`الخادم يعمل على المنفذ ${port}`);
});
const bcrypt = require("bcrypt");
const saltRounds = 10;

// مثال: الحصول على كلمة السر من الطلب (في حال استخدام Express)
app.post("/register", (req, res) => {
  // تأكد أن لديك body-parser أو express.json() لتفكيك JSON
  const { password } = req.body; // هنا يتم تعريف المتغير password
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error hashing password");
    } else {
      // استخدم قيمة hash في تخزين كلمة المرور المشفرة في قاعدة البيانات
      // ...
      res.send("تم التسجيل بنجاح!");
    }
  });
});
