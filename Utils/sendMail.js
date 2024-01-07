require('dotenv').config()
const nodemailer = require('nodemailer')
const Mailgen = require('mailgen')

const SignupMail = async (username, email, message) => {
    const config = {
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    }

    const transporter = nodemailer.createTransport(config);


    var mailGenerator = new Mailgen({
        theme: 'salted',
        product: {
            // Appears in header & footer of e-mails
            name: 'Fast NUCES',
            link: 'https://www.nu.edu.pk/',
            logo: 'https://khi.nu.edu.pk/wp-content/uploads/2023/01/FAST-NU-logo.png'
        }
    });

    var emailDetails = {
        body: {
            name: username,
            intro: 'Thanks for Joining us, you will get all the updates on your email',
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.',
            action: {
                instructions: message,
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Login to Your Account',
                    link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                }
            },
        },

    };

    var emailBody = mailGenerator.generate(emailDetails);

    if (!email) {
        res.status(404).json({ message: "Email Required" })
    }

    else {
        try {

            const emailText = {
                from: process.env.NODEMAILER_EMAIL, // sender address
                to: email, // list of receivers
                subject: "Thanks for Subscribing to Us", // Subject line
                html: emailBody, // html body
            }
            await transporter.sendMail(emailText);
            console.log("Successfully Send Mail")
        }
        catch (error) {
            console.log(error)
        }

    }
}



module.exports = SignupMail