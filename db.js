const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "sql5.freesqldatabase.com", // استبدلها بـ Host الخاص بك
  user: "sql5768207", // اسم المستخدم
  password: "4sPq7zJTte", // كلمة المرور
  database: "sql5768207", // اسم قاعدة البيانات
  port: 3306, // المنفذ، إن كان مختلفاً عدّله هنا
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// لا نستدعي pool.connect() أو pool.end()
// الـ Pool يدير الاتصالات تلقائيًا

module.exports = pool;
