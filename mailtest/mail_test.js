// module read

var nodemailer = require("nodemailer");

//SMTP server
var smtp = nodemailer.createTransport({
//exports.smtp = nodemailer.createTransport({
      host: '172.21.40.163',
      port: 25,
});

var message = {
//exports.message = {
    from: 'kimitoshiyama@gmail.com',
    to: 'yamagata.kimitoshi@kkfits.jp',
    subject: 'Hello from Node.JS',
    text: 'test mail'
};
//smtp.sendMail(message,function(error,info){
//    if(error){
//        return console.log(error);
//    } else {
//        console.log('Message sent:'+info.response);
//    }
//});