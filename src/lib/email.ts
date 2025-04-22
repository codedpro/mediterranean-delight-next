import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendReservationStatusEmail(
  to: string,
  name: string,
  date: string,
  time: string,
  status: string
) {
  const subject = `Reservation ${status.charAt(0).toUpperCase() + status.slice(1)} - Mediterranean Delight`;
  
  let statusText = "";
  switch (status) {
    case "confirmed":
      statusText = "has been confirmed";
      break;
    case "cancelled":
      statusText = "has been cancelled";
      break;
    default:
      statusText = "is pending confirmation";
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #d97706;">Mediterranean Delight</h2>
      <p>Dear ${name},</p>
      <p>Your reservation for ${date} at ${time} ${statusText}.</p>
      <p>If you have any questions or need to make changes, please don't hesitate to contact us.</p>
      <p>Best regards,<br>The Mediterranean Delight Team</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
} 