


const express = require("express");
const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: '1mb' }))

app.post("/nodemailer", (req, res) => {

    const data = req.body
    const nodemailer = require("nodemailer")

    function send_mail(reply) {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "adiknathan09@gmail.com",
                pass: "yworkilyyfkhtdly"
            }
        })
        const mail_options = {
            from: "adiknathan09@gmail.com",
            to: reply,
            subject: "Message From: " + data.name + " | User: " + data.user,
            text: data.message
        }

        transport.sendMail(mail_options, function (error, result) {
            if (error) {
                console.log(error)
            } else {
                console.log(result)
            }
            transport.close()
        })
    }

    send_mail("adiknathan09@gmail.com");

    res.end()

})

app.listen(4000, () => { console.log("Listening on 4000") })


