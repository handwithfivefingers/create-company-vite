const nodeMailer = require("nodemailer");
const fs = require("fs");
const { removeFile, errHandler } = require("../response");
const { TemplateMail, Order } = require("../model");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const { removeListFiles } = require("../common/helper");

// *Useful for getting environment vairables
dotenv.config();

const {
  GG_REFRESH_TOKEN: REFRESH_TOKEN,
  GG_REFRESH_URI: REFRESH_URI,
  GG_EMAIL_CLIENT_ID: CLIENT_ID,
  GG_EMAIL_CLIENT_SECRET: CLIENT_SECRET,
  MAIL_NAME,
  MAIL_PASSWORD,
  MAIL_PORT,
  MAIL_HOST,
} = process.env;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REFRESH_URI);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

exports.sendmailWithAttachments = async (req, res, { type = "attachments", ...rest }) => {
  /**
   * filesPath
   * email
   * removeFiles
   * send
   * _id
   * type
   * subject
   * content
   */

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: MAIL_NAME,
        pass: MAIL_PASSWORD,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });

    // console.log("comming transporter", type);

    if (type == "attachments") {
      let params = {
        adminEmail: MAIL_NAME,
        email: req.body.email,
        subject: req.body.subject,
        content: req.body.content,
        redirect: rest?.redirect,
      };

      return withAttachments(req, res, params, transporter);
    } else if (type == "path") {

      // console.log("comming transporter with path");

      let params = {
        adminEmail: MAIL_NAME,
        email: rest.email,
        subject: rest.subject,
        content: rest.content,
        filesPath: rest.filesPath,
        redirect: rest?.redirect,
        ...rest,
      };
      return withFilesPath(params, transporter);
    } else if (type == "any") {
      let params = {
        adminEmail: MAIL_NAME,
        email: rest.email,
        subject: rest.subject,
        content: rest.content,
        redirect: rest?.redirect,
        ...rest,
      };
      return sendMail(req, res, params, transporter);
    }
  } catch (err) {
    console.log("error 1", err);
    throw err;
  }

  // validate file
};
const withAttachments = async (req, res, { adminEmail, email, subject, content, redirect }, transporter) => {
  let attachments;
  try {
    let validFiles = req.files.some((item) => item.mimetype !== "application/pdf");

    if (validFiles) {
      await req.files.map((file) => removeFile(file.path));
    }

    if (!validFiles) {
      attachments = req.files.map((file) => {
        return { filename: file.originalname, path: file.path };
      });
    }

    //sending

    await transporter.sendMail({
      from: adminEmail, // sender address
      attachments,
      to: email,
      subject: subject, // Subject line
      html: content, // html body,
    });
  } catch (err) {
    // return sendFailed(err, res);
    throw err;
  } finally {
    // attachments?.map((item) => removeFile(item.path));
    await removeListFiles(attachments, true);
  }
};

const sendMail = async (req, res, { adminEmail, email, subject, content, redirect, ...rest }, transporter) => {
  try {
    // console.log("send");
    return await transporter.sendMail({
      from: adminEmail, // sender address
      to: email,
      subject: subject, // Subject line
      html: content, // html body,
    });
  } catch (err) {
    console.log("sendMail failed");

    // return sendFailed(err, res);
    throw err;
  }
};

const withFilesPath = async (params, transporter) => {
  let { adminEmail, email, subject, content, filesPath, redirect, removeFiles, ...rest } = params;

  let attachments = filesPath.map((file) => {
    let ext = file.pdfFile.split(".")[file.pdfFile.split(".").length - 1];
    return { path: file.pdfFile, filename: `${file.name}.${ext}` };
  });

  try {
    // kích hoạt gửi mail ->
    // gửi client : trong quá trình , vui check mail
    // Thành công, -> gửi mail
    // Thất bại -> báo lỗi
    // console.log("preparefor sendmail");

      return await transporter.sendMail({
        from: adminEmail, // sender address
        to: email,
        attachments,
        subject: subject, // Subject line
        html: content, // html body,
      })
  
  } catch (err) {

    console.log("send mail failed ", err);
    for (let attach of attachments) {
      if (fs.existsSync(attach.pdfFile)) {
        fs.unlinkSync(attach.path);
      }
    }
    throw err;
  }
  finally {
    await Order.updateOne({ _id: rest._id }, { send: 1 });
    console.log("sendmail success");
    
  }
};

exports.cronMail = async ({ ...rest }) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAUTH2",
        user: MAIL_NAME,
        pass: MAIL_PASSWORD,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });
    let params = {
      adminEmail: MAIL_NAME,
      email: rest.email,
      subject: rest.subject,
      content: rest.content,
      filesPath: rest.filesPath,
      redirect: rest?.redirect,
      type: "path",
      ...rest,
    };
    // console.log("preparefor sendmail");

    await withFilesPath(params, transporter);

  } catch (err) {
    console.log("cron failed", err);
  }
};
