const nodemailer = require("nodemailer");
const config = require("../config");
const hbs = require("nodemailer-express-handlebars");
const path = require('path');
const fs = require('fs');

const sendEmailWithTemplate = async (templateContent) => {
  const [name, templatetobeused, url] = templateContent;
  let templatePath = "";
  let template = "";

  try {
    if (templatetobeused === "confirmEmail") {
      templatePath = path.join(__dirname, "../views/manifold_2023-07-19T204428.156967/manifold.hbs");
    } else if (templatetobeused === "resetPassword") {
      templatePath = path.join(__dirname, "../views/manifold_2023-07-19T204428.156967/manifolds.hbs");
    } else {
      console.log("Unsupported templateContent: " + templateContent);
      return;
    }

    template = fs.readFileSync(templatePath, 'utf-8');

    const replace = {
      username: name,
      url: url,
    };

    const sendhtmlpath = template.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (match, p1) => replace[p1] || "");
    return sendhtmlpath;
  } catch (error) {
    console.log(error);
  }
};

async function sendEmail(to, subject, body, details) {
  try {
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      host: config.STMP_HOST,
      port: config.STMP_PORT,
      secure: false, // upgrade later with STARTTLS
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: config.SMTP_USE,
        pass: config.SMTP_PAS,
      },
    });

    // Setup Handlebars as the template engine
    transporter.use('compile', hbs({
      viewEngine: {
        extName: '.hbs',
        partialsDir: path.join(__dirname, '../views/manifold_2023-07-19T204428.156967'),
        layoutsDir: path.join(__dirname, '../views/manifold_2023-07-19T204428.156967'),
      },
      viewPath: path.join(__dirname, '../views/manifold_2023-07-19T204428.156967'),
      extName: '.hbs',
    }));

    const templateContent = await sendEmailWithTemplate(details.templateContent);

    const message = {
      from: config.EMAIL_FRO,
      to: to,
      subject: subject,
      text: body,
      html: templateContent,
      context: details,
    };

    const result = await transporter.sendMail(message);
    return result;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = {
  sendEmail: sendEmail,
  sendEmailWithTemplate
};
