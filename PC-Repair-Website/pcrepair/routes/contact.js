var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req,res,next){
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'ka',
        pass: ''
      }
    });

    var mailOptions = {
      from: '"Kvin ? " <kaustubh87@gmaol.com>',
      to: 'kaustubh87@gmail.com',
      subject: 'Hello From PCRepair',
      text: 'You have a submission from ... Name: ' +req.body.name+ ' Email: ' +req.body.email+ ' Nessage: ' +req.body.message,
      html: '<p>You have a submission from ...</p> <ul><li>Name: ' +req.body.name+ '</li><li>Email: ' +req.body.email+ '</li><li> Message: ' +req.body.message+ '</li></ul>'

    }

    transporter.sendMail(mailOptions, function(err, info){
      if(err){
        return console.log(err);
      }
      console.log('Message Sent: ' +info.res);
      res.redirect('/');
    });
});

module.exports = router;
