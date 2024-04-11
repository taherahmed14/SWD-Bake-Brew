import { Injectable } from "@nestjs/common";
const nodemailer = require("nodemailer");

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_PASS,
    },
  });
  
  transporterSendEmail = (info) => {
    this.transporter.sendMail(info, (err) => {
      if(err) {
          console.log("mail error: ", err);
          console.log("Mail not sent!!");
      }
      else {
          console.log("Email sent!");
      }
    })
  }

  htmlTemplate = (data, customHtml) => {
    return `
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
            .verify_button {
              display: inline-block; 
              color: #ffffff; 
              background-color: #3498db; 
              border: solid 1px #3498db; 
              border-radius: 5px; 
              box-sizing: border-box; 
              cursor: pointer; 
              text-decoration: none; 
              font-size: 14px; 
              font-weight: bold; 
              margin: 0; 
              padding: 12px 25px; 
              text-transform: capitalize;
            }
          </style>
      </head>
      <body>
          <div class="mailBody">
              <div>
                  <div class="content">
                      <p>Hi ${data.name},</p>
                      <p>${data.message}</p>
                      ${customHtml}
                      <div>Team Bake & Brew</div>
                  </div>
              </div>
          </div>
      </body>
      </html>
    `;
  }
  
  sendEmail = async (data) => {
    const customHtml = `
      <p>
        <a href=${data.link} target="_blank" class="verify_button">Verify</a>
      </p>`
    const registerUserLinkHtml = this.htmlTemplate(data, customHtml);

    let info = {
      from: process.env.FROM_EMAIL,
      to: data.email,
      subject: data.subject,
      html: registerUserLinkHtml,
    };
    
    return this.transporterSendEmail(info);
  }

  sendOtp = async (data) => {
    const customHtml = ``;
    const registerUserLinkHtml = this.htmlTemplate(data, customHtml);

    let info = {
      from: process.env.FROM_EMAIL,
      to: data.email,
      subject: data.subject,
      html: registerUserLinkHtml,
    };
    
    return this.transporterSendEmail(info);
  }
  
}
