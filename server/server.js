const express = require("express");
const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/nodemailer", (req, res) => {
    console.log("efsefe")
})

app.listen(4000, () => {console.log("Listening on 4000")})

/*
const CLIENT_ID = '141339435799-2kkui2j09erqf02h5v45d9t1u4pui93n.apps.googleusercontent.com', 
CLIENT_SECRET = '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', 
REDIRECT_URI = 'https://developers.google.com/oauthplayground', 
REFRESH_TOKEN = '1//04X15D33dU-o_CgYIARAAGAQSNwF-L9Ir7C7QLX9m4VwLlPDF3AKlwIkLN15phhlQn4DI1ozdnIPrvcMs-N7GDWBNKy85-nTrVMI'
const OAuths2 = google.auth.OAuth2;
const config = require('./mailer-config.js')

const OAuth2_client = new OAuths2(config.CLIENT_ID, config.CLIENT_SECRET)
OAuth2_client.setCredentials({refresh_token : config.REFRESH_TOKEN})

function send_mail (reply) {
    const accessTokens = OAuth2_client.getAccessToken();
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth : {
            type: 'OAuth2',
            user: 'adiknathan09@gmail.com',
            clientId: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            refreshToken: config.REFRESH_TOKEN,
            accessToken: accessTokens
        }
    })
    const mail_options = {
        from: `Cool Try <${'adiknathan09@gmail.com'}`,
        to: reply,
        subject: "Niceeeeee",
        text: 'BOOOOM'
    }

    transport.sendMail(mail_options, function(error, result) { 
        if (error){
            console.log(error)
        } else {
            console.log(result)
        }
        transport.close()
    })
}
*/

