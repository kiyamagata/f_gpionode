const fs = require('fs');
//SMS��M�t�H���_
const path = '/var/spool/sms/incoming/';
let path2 = '/var/spool/sms/incoming/.';
const path3 = '/home/user1/script/sms/recvsms/GSM1.txt';
let path4 = '/home/user1/script/sms/recvsms/.';

try{
  fs.statSync(path2);
  const filenames = fs.readdirSync(path);
  console.log(filenames[0]);
  if(filenames[0] == undefined){
    //̧�ٖ���
    console.log('undefined');
  }else{
    //recvsms����GSM1.txt���Ȃ���΍쐬
    if(fs.readdirSync(path4)==''){
      console.log(fs.readdirSync(path4));
      fs.rename(path+filenames[0],path3,(err) => {
      console.log('̧�ق��ړ����܂����B');
      });
    }
  }
} catch (error) {

}
