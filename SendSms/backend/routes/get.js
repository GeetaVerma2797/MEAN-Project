const Sms = require('../models/sms')

module.exports = {
	fetchSms: async function (req, res, next) {
        try {
            const smsQuery = Sms.find().sort({createdAt: -1}); 
            if(smsQuery)
                smsQuery
                .then(async sms=>{
                    res.json({
                        status:{
                            message: "Data Successfully fetched",
                
                            code: 200
                        },
                        data:sms,
                    });
                }).catch(e=>{
                    res.status(500).json({
                        status: {
                            message: e.message,
                            code: 500
                        }
                    });
                });
        } catch (error) {
            
        }
    }
}