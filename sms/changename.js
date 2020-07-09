const fs = require('fs');
//SMS受信フォルダ
const path = '/var/spool/sms/incoming/';
let path2 = '/var/spool/sms/incoming/.';
const path3 = '/home/user1/script/sms/recvsms/GSM1.txt';
let path4 = '/home/user1/script/sms/recvsms/.';

try{
  fs.statSync(path2);
  const filenames = fs.readdirSync(path);
  console.log(filenames[0]);
  if(filenames[0] == undefined){
    //ﾌｧｲﾙ無し
    console.log('undefined');
  }else{
    //recvsms内にGSM1.txtがなければ作成
    if(fs.readdirSync(path4)==''){
      console.log(fs.readdirSync(path4));
      fs.rename(path+filenames[0],path3,(err) => {
      console.log('ﾌｧｲﾙを移動しました。');
      });
    }
  }
} catch (error) {

}
