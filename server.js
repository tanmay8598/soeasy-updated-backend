const dotenv = require("dotenv");
const express = require("express");
const retailerRoutes = require("./routes/retailerRoutes");
const salesmaRoutes = require("./routes/salesmanRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const productRoutes = require("./routes/productRoutes");
const pushToken = require("./routes/rnPushTokens");
const SendNotification = require("./routes/send");
const adminRoutes = require("./routes/adminRoutes");
const uploadImage = require("./routes/uploadImages");
const cors = require("cors");
const nodemailer = require("nodemailer");
const pdf = require("html-pdf");
const path = require("path");


dotenv.config();

const profile = require("./invoice-routes/profile");
const pdfTemplate = require("./documents/index");

const emailTemplate = require("./documents/email");

const invoiceRoutes = require("./invoice-routes/invoices");
const clientRoutes = require("./invoice-routes/clients");
const userRoutes = require("./invoice-routes/userRoutes");



const connectDB = require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/invoices", invoiceRoutes);
app.use("/clients", clientRoutes);
app.use("/users", userRoutes);
app.use("/profiles", profile);

app.use("/api/retailer", retailerRoutes);
app.use("/api/salesman", salesmaRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/product", productRoutes);
app.use("/api/rnPushTokens", pushToken);
app.use("/api/sendNoti", SendNotification);
app.use("/api/admin", adminRoutes);
app.use("/api/uploadimage", uploadImage);

// NODEMAILER TRANSPORT FOR SENDING INVOICE VIA EMAIL
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

var options = { format: "A4" };
//SEND PDF INVOICE VIA EMAIL
app.post("/send-pdf", (req, res) => {
  
  const { email, company } = req.body;

  // pdf.create(pdfTemplate(req.body), {}).toFile('invoice.pdf', (err) => {
  pdf.create(pdfTemplate(req.body), options).toFile("invoice.pdf", (err) => {
    // send mail with defined transport object
    transporter.sendMail({
      from: ` IXT Invoice <ixtminds@gmail.com>`, // sender address
      to: `${email}`, // list of receivers
      replyTo: `${company?.email}`,
      subject: `Invoice from ${
        company?.businessName ? company?.businessName : company?.name
      }`, // Subject line
      text: `Invoice from ${
        company?.businessName ? company?.businessName : company?.name
      }`, // plain text body
      html: emailTemplate(req.body), // html body
      attachments: [
        {
          filename: "invoice.pdf",
          path: `${__dirname}/invoice.pdf`,
        },
      ],
    });

    if (err) {
      res.send(Promise.reject());
      
    }
    res.send(Promise.resolve());
  });
});

//Problems downloading and sending invoice
// npm install html-pdf -g
// npm link html-pdf
// npm link phantomjs-prebuilt

//CREATE AND SEND PDF INVOICE
app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile("invoice.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }
    res.send(Promise.resolve());
  });
});

//SEND PDF INVOICE
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/invoice.pdf`);
});

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Successfully served on port: ${PORT}.`);
});
