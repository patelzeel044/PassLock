import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcrypt from "bcryptjs";

export const sendEmail = async ({email, emailType, userId}:any) => {

    try {

        const hashedToken = await bcrypt.hash(userId.toString(),10)

        if (emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId, {
                    verifyToken:hashedToken,
                    verifyTokenExpiry:Date.now() + 3600000,
            })
        } 
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId, {
                    forgotPasswordToken:hashedToken,
                    forgotPasswordTokenExpiry:Date.now() + 3600000,
            })
        }

        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: parseInt(process.env.MAILTRAP_PORT!, 10),
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD,
            },
          });

          const mailOptions={
            from: process.env.MAIL_FROM,
            to: email, 
            subject: emailType === "VERIFY" ? "Verify your email" 
                                            : "Reset Your Password",
            html: `<p>
                    Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">
                    here
                    </a> 
                    to ${emailType === "VERIFY" ? "verify your email"
                                                : "reset your password"} 
                     or copy paste the link in your browser
                    <br /> 
                    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
                    </p>`,
            }

          const mailResponse =  await transporter.sendMail(mailOptions);

          return mailResponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}