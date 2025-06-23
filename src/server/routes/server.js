const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

// ✅ Initialize app BEFORE using it
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.json());

// ✅ Routes
const estimateRoutes = require('../routes/estimateRoutes');
const estimate = require('../routes/estimate');
const bookingRoutes = require('../routes/bookingRoutes');

app.use('/api/estimate', estimate);
app.use('/api/estimateRoutes', estimateRoutes);
app.use('/api/bookings', bookingRoutes);

// ✅ Email sending endpoint
app.post('/send-email', async (req, res) => {
  const { name, company, phone, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Request - Contact us',
    text: `
      Name: ${name}
      Company: ${company}
      Phone: ${phone}
      Email: ${email}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email send error', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
