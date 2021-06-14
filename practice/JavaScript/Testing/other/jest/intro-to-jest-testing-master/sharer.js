const creds = require("./creds.js");

const { google } = require("googleapis");
const LiqPay = require("./liqpay.js");

// загружаем список репортов (формат?)
// получаем список эмейлов из google drive (предварительно: авторизация?) (формат?)
// { data: { permissions: [ { emailAddress: 'mail@gmail.com' }]}}
// находим еще незаэнроленных
// добавляем им пермишны

module.exports = {
  async shareDocumentWithStudents(fileId) {
    const liqpay = new LiqPay(
      "sandbox_i59485578196",
      "sandbox_lhSSBDxHWyQV3CDgW4dLi2iAyBKv54jGWb62ZGZl"
    );

    const payments = await new Promise((resolve, reject) => {
      liqpay.api(
        "request",
        {
          action: "reports",
          version: 3,
          public_key: "sandbox_i59485578196",
          date_from: Date.now() - 30 * 24 * 60 * 60 * 1000,
          date_to: Date.now(),
        },
        resolve,
        reject
      );
    });

    // configure a JWT auth client
    let jwtClient = new google.auth.JWT(
      creds.client_email,
      null,
      creds.private_key,
      ["https://www.googleapis.com/auth/drive"]
    );
    //authenticate request
    await jwtClient.authorize();
    const drive = google.drive({ version: "v3" });

    const list = await drive.permissions.list({
      fileId,
      oauth_token: jwtClient.credentials.access_token,
      fields: ["permissions(emailAddress)"],
    });
    const enrolledEmails = list.data.permissions.map((x) => x.emailAddress);

    for (const p of payments.data) {
      if (
        p.description === "Мастер-класс по Unit-тестированию JS" &&
        p.order_id.includes(" /// ")
      ) {К
        const mail = p.order_id.split(" /// ")[0].trim();

        if (p.status === "success" && !enrolledEmails.includes(mail)) {
          await drive.permissions.create({
            fileId,
            oauth_token: jwtClient.credentials.access_token,
            emailAddress: mail,
            resource: {
              emailAddress: mail,
              type: "user",
              role: "commenter",
              emailMessage:
                "Привет! Отправляю тебе материалы мастер-класса по Unit-тестированию JavaScript",
            },
            emailMessage:
              "Привет! Отправляю тебе материалы мастер-класса по Unit-тестированию JavaScript",
          });

          console.log(`[+] ${mail}`);
        }
      }
    }
  },
};
