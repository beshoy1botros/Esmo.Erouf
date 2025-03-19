const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "sql5.freesqldatabase.com", // أو "localhost" إذا كنت تستخدم قاعدة محلية
  user: "sql5768207", // عدّل حسب بياناتك
  password: "4sPq7zJTte", // عدّل حسب بياناتك
  database: "sql5768207", // استخدم اسم القاعدة الجديدة
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("خطأ في الاتصال بقاعدة البيانات:", err);
    process.exit(1);
  }
  console.log("تم الاتصال بقاعدة البيانات بنجاح.");
});

module.exports = connection;
