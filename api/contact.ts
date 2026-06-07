import nodemailer from "nodemailer";



export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Admin mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "teampixelcraft7@gmail.com",
      subject: `📩 New Inquiry - ${subject || "General Inquiry"}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not Provided"}</p>
        <p><strong>Service:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    // Auto reply
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting PixelCraft",
      html: `
        <h2>Thank You, ${name}!</h2>
        <p>We have received your inquiry successfully.</p>
        <p>Our team will contact you shortly.</p>
        <br />
        <p>Regards,</p>
        <p><strong>PixelCraft | Creative Studio</strong></p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: "Failed to send email",
    });
  }
}
