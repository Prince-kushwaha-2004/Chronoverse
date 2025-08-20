const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});


module.exports = (options) => {
    if (!options.from || !options.to || !options.subject) {
        return Promise.reject({
            success: false,
            message: 'Missing required email fields: from, to, or subject'
        });
    }

    let mailOptions = {
        from: options.from,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject({ success: false, message: 'Error sending email', error });
            } else {
                resolve({ success: true, message: 'Email sent successfully', info });
            }
        });
    });
}
