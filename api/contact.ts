import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Contact Form
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const adminEmail = "teampixelcraft7@gmail.com";

    if (!emailUser || !emailPass) {
      console.error("Email configuration missing (EMAIL_USER or EMAIL_PASS)");
      return res.status(500).json({ error: "Email service is not configured on the server." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    try {
      const submissionDate = new Date().toLocaleString();

      // Email to Admin
      const adminMailOptions = {
        from: `"PixelCraft Website" <${emailUser}>`,
        to: adminEmail,
        subject: "📩 New Website Inquiry - PixelCraft",
        html: `
          <div style="font-family: sans-serif; background-color: #070708; color: #ffffff; padding: 40px; max-width: 600px; margin: auto; border-radius: 20px; border: 1px solid #1a1a1b;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #10b981; margin: 0; letter-spacing: 2px; font-weight: 900;">PIXELCRAFT</h1>
              <p style="color: #888; text-transform: uppercase; font-size: 10px; letter-spacing: 4px; margin-top: 5px;">Creative Studio Inquiry</p>
            </div>
            
            <div style="background-color: #0c0c0d; padding: 25px; border-radius: 15px; border-left: 4px solid #10b981;">
              <h2 style="font-size: 18px; margin-top: 0; color: #10b981;">New Submission Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; width: 120px;">Full Name</td>
                  <td style="padding: 10px 0; font-weight: bold;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase;">Email Address</td>
                  <td style="padding: 10px 0; font-weight: bold;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase;">Phone Number</td>
                  <td style="padding: 10px 0; font-weight: bold;">${phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase;">Service</td>
                  <td style="padding: 10px 0; font-weight: bold;">${subject}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase;">Date & Time</td>
                  <td style="padding: 10px 0; font-weight: bold;">${submissionDate}</td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 30px;">
              <h3 style="font-size: 14px; color: #888; text-transform: uppercase; margin-bottom: 10px;">Message:</h3>
              <p style="background-color: #0c0c0d; padding: 20px; border-radius: 10px; line-height: 1.6; border: 1px solid #1a1a1b;">${message}</p>
            </div>

            <div style="text-align: center; margin-top: 40px; color: #555; font-size: 11px;">
              &copy; ${new Date().getFullYear()} PixelCraft | Creative Studio. All rights reserved.
            </div>
          </div>
        `,
      };

      // Auto-reply to User
      const userMailOptions = {
        from: `"PixelCraft | Creative Studio" <${emailUser}>`,
        to: email,
        subject: "Thank You for Contacting PixelCraft | Creative Studio",
        html: `
          <div style="font-family: sans-serif; background-color: #070708; color: #ffffff; padding: 40px; max-width: 600px; margin: auto; border-radius: 20px; border: 1px solid #1a1a1b;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #10b981; margin: 0; letter-spacing: 2px; font-weight: 900;">PIXELCRAFT</h1>
            </div>

            <div style="line-height: 1.6;">
              <p>Hello <strong>${name}</strong>,</p>
              <p>Thank you for contacting <strong>PixelCraft | Creative Studio</strong>.</p>
              <p>We have successfully received your inquiry and our team will get back to you shortly.</p>
              
              <div style="background-color: #0c0c0d; padding: 20px; border-radius: 15px; margin: 25px 0; border: 1px solid #1a1a1b;">
                <p style="color: #10b981; font-weight: bold; margin-top: 0;">Here are the details you submitted:</p>
                <ul style="list-style: none; padding: 0; margin: 0;">
                  <li style="margin-bottom: 10px;"><span style="color: #888;">• Full Name:</span> ${name}</li>
                  <li style="margin-bottom: 10px;"><span style="color: #888;">• Email:</span> ${email}</li>
                  <li style="margin-bottom: 10px;"><span style="color: #888;">• Phone:</span> ${phone || 'Not provided'}</li>
                  <li style="margin-bottom: 10px;"><span style="color: #888;">• Service:</span> ${subject}</li>
                </ul>
                <p style="color: #888; font-size: 0.9em; margin-bottom: 0;"><strong>Message:</strong> ${message}</p>
              </div>

              <p>We appreciate your interest in PixelCraft and look forward to working with you.</p>
              
              <p style="margin-top: 30px;">Regards,<br><strong style="color: #10b981;">PixelCraft | Creative Studio</strong></p>
            </div>

            <div style="text-align: center; margin-top: 40px; color: #555; font-size: 11px; border-top: 1px solid #1a1a1b; padding-top: 20px;">
              &copy; ${new Date().getFullYear()} PixelCraft | Creative Studio.
            </div>
          </div>
        `,
      };

      await transporter.sendMail(adminMailOptions);
      await transporter.sendMail(userMailOptions);

      res.status(200).json({ message: "Emails sent successfully" });
    } catch (error: any) {
      console.error("Error sending emails:", error);
      
      let errorMessage = "Failed to send emails.";
      if (error.message && error.message.includes("Application-specific password required")) {
        errorMessage = "Gmail authentication failed: An 'App Password' is required because 2-Step Verification is enabled. Please generate one in your Google Account settings.";
        console.error("HINT: Go to https://myaccount.google.com/apppasswords to generate a 16-character code for EMAIL_PASS");
      }

      res.status(500).json({ error: errorMessage });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
