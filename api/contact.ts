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
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
</head>
<body style="margin:0;padding:0;background:#050505;font-family:Arial,sans-serif;">
  <div style="max-width:700px;margin:30px auto;background:#000;border-radius:24px;padding:40px;">

    <div style="text-align:center;margin-bottom:35px;">
      <h1 style="color:#00ffb3;margin:0;font-size:42px;letter-spacing:4px;">
        PIXELCRAFT
      </h1>

      <p style="color:#888;margin-top:10px;letter-spacing:3px;font-size:12px;">
        CREATIVE STUDIO INQUIRY
      </p>
    </div>

    <div style="
      background:#070707;
      border-left:4px solid #00ffb3;
      padding:30px;
      border-radius:18px;
      margin-bottom:25px;
    ">
      <h2 style="color:#00ffb3;margin-top:0;">
        New Submission Details
      </h2>

      <table width="100%" cellpadding="10">
        <tr>
          <td style="color:#999;">FULL NAME</td>
          <td style="color:#fff;font-weight:bold;">${name}</td>
        </tr>

        <tr>
          <td style="color:#999;">EMAIL</td>
          <td style="color:#fff;">${email}</td>
        </tr>

        <tr>
          <td style="color:#999;">PHONE</td>
          <td style="color:#fff;">${phone || "Not Provided"}</td>
        </tr>

        <tr>
          <td style="color:#999;">SERVICE</td>
          <td style="color:#fff;">${subject}</td>
        </tr>

        <tr>
          <td style="color:#999;">DATE</td>
          <td style="color:#fff;">
            ${new Date().toLocaleString()}
          </td>
        </tr>
      </table>
    </div>

    <div style="
      background:#070707;
      border-radius:18px;
      padding:25px;
    ">
      <h3 style="color:#00ffb3;">
        MESSAGE
      </h3>

      <p style="
        color:white;
        line-height:1.8;
        margin:0;
      ">
        ${message}
      </p>
    </div>

    <div style="
      text-align:center;
      margin-top:35px;
      color:#666;
      font-size:12px;
    ">
      © 2026 PixelCraft | Creative Studio
    </div>

  </div>
</body>
</html>
`,
    });

    // Auto reply
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank You for Contacting PixelCraft",
      html: `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#050505;font-family:Arial,sans-serif;">

<div style="
max-width:700px;
margin:30px auto;
background:#000;
border-radius:24px;
padding:40px;
">

<div style="text-align:center;">
  <h1 style="
  color:#00ffb3;
  margin:0;
  letter-spacing:4px;
  ">
    PIXELCRAFT
  </h1>

  <p style="
  color:#888;
  letter-spacing:3px;
  font-size:12px;
  ">
    CREATIVE STUDIO
  </p>
</div>

<h2 style="
color:white;
text-align:center;
margin-top:35px;
">
Thank You For Reaching Out
</h2>

<p style="
color:#ccc;
text-align:center;
line-height:1.8;
">
Hello ${name},
<br><br>
Thank you for contacting PixelCraft | Creative Studio.
<br><br>
We have successfully received your inquiry and our team will contact you shortly.
</p>

<div style="
background:#070707;
padding:25px;
border-radius:18px;
margin-top:30px;
">

<h3 style="color:#00ffb3;">
Your Submitted Details
</h3>

<p style="color:white;">
<b>Name:</b> ${name}<br><br>
<b>Email:</b> ${email}<br><br>
<b>Phone:</b> ${phone || "Not Provided"}<br><br>
<b>Service:</b> ${subject}<br><br>
<b>Message:</b> ${message}
</p>

</div>

<div style="
background:rgba(0,255,179,0.08);
border:1px solid rgba(0,255,179,0.2);
padding:20px;
border-radius:18px;
margin-top:25px;
text-align:center;
">

<p style="
color:#00ffb3;
font-weight:bold;
margin:0;
">
⏱ Response Time
</p>

<p style="
color:white;
margin-top:10px;
">
Usually within 24 Hours
</p>

</div>

<div style="
text-align:center;
margin-top:30px;
">

<a href="https://pixelcraftcreativestudio.vercel.app"
style="
background:#00ffb3;
color:black;
padding:14px 28px;
border-radius:12px;
text-decoration:none;
font-weight:bold;
">
Visit Website
</a>

</div>

<p style="
text-align:center;
color:#777;
margin-top:40px;
font-size:12px;
">
Best Regards<br>
PixelCraft | Creative Studio
</p>

</div>

</body>
</html>
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
