const nodemailer = require('nodemailer');

class EmailSend {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async send(emailCliente, subject, html) {
        let mailOptions = {
            from: process.env.EMAIL,
            to: emailCliente,
            subject: subject,
            text: html
        };

        this.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}

module.exports = EmailSend;