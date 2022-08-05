const Sms = require('../models/sms');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const twilio = require('twilio');
const client = new twilio(accountSid, authToken);

module.exports = {
	sendSms: async function (req, res, next) {
		try {
            console.log("sendsms", req.body.phone, req.body.smsBody, (req.body.otp).length)
            if(JSON.stringify(req.body.otp).length == 6){
                
                await client.messages
                .create({
                    body: JSON.stringify(req.body.smsBody),
                    to: JSON.stringify(req.body.phone), // Text this number
                    from: '+19788611093', // From a valid Twilio number
                })
                .then(async(message) => {
                    console.log(message);
                    const sms = new Sms({
                        phone: req.body.phone,
                        name: req.body.name,
                        otp: req.body.otp,
                        smsBody: req.body.smsBody
                    });
                    await sms.save().catch(e=>{
                        console.log(e);
    
                    });
                    console.log(sms);
    
                    return res.json({
                    status:{
                        message: "Sms send successfully to "+req.body.phone,
                        code: 200
                    },
                    data: req.body.phone
                });
            })
            .catch((err) => {
                return res.json({
                    status:{
                        message: "Phone number: "+req.body.phone+" is not valid.",
                        code: 501
                    },
                    data: req.body.phone
                });
    
            })
            } else {
                return res.json({
                    status:{
                        message: "Sms not send: Otp not generated",
                        code: 501
                    },
                    data: req.body.phone
                });
            }


                
                
        } catch (error) {
            console.log("error", error.message, error.stack );
            return res.status(404).json({ status: { message: "Error occured: " + error.message, code: 404 }, data: error.stack });
        }
    }
}