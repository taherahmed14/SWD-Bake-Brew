const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(data) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.FROM_EMAIL, // generated ethereal user
      pass: process.env.FROM_PASS, // generated ethereal password
    },
  });

  const htmlContent = 
  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
          .mailBody {
            border: 1px solid rgb(227, 230, 227);
            padding: 15px 50px;
            width: 50%;
            margin: auto;
          }
          .logo {
            text-align: center;
            padding-bottom: 10px;
          }
          .logo img {
            margin: auto;
            height: 50px;
          }
          .content {
            background-color: rgb(227, 230, 227);
            padding: 15px 50px;
            padding-bottom: 30px;
            font-size: 16px;
          }
          .disclosure {
            font-size: 12px;
            font-weight:600;
            margin-top: 50px;
            text-align: center;
          }
        </style>
    </head>
    <body>
        <div class="mailBody">
            <div class="logo">
                <img src="cid:unique@nodemailer.com" alt="Nextron">
            </div>
            <div>
                <div class="content">
                    <p>Hi ${data.name},</p>
                    <p>${data.message}</p>
                    <div>Thanks for shopping with us.</div>
                    <div>Team Nextron</div>
                    <p class="disclosure">For return, replacement or any service related issue contact +91-8668049044</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;

  // send mail with defined transport object
  let info = {
    from: process.env.FROM_EMAIL, // sender address
    to: data.email, // list of receivers
    subject: data.subject, // Subject line
    html: htmlContent, // html body
    attachments: [{
      filename: 'logo.png',
      path: './src/mail/logo.jpg',
      cid: 'unique@nodemailer.com' //same cid value as in the html img src
    }]
  };

  transporter.sendMail(info, (err) => {
    if(err) {
        console.log("mail error: ", err);
        console.log("Mail not sent!!");
        //update in db if the mail is not sent
    }
    else {
        //update in db if the mail is sent
        console.log("Email sent!");
    }
  })
}

// main(email).catch(console.error);