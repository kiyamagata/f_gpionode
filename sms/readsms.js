var fs =require("fs");
var path = require("path");
var filePath = '/home/user1/script/sms/recvsms/GSM1.txt';
let filepath ={};
let filefullpath = {};
const dirpath = "/home/user1/script/sms/recvsms/";

function check(filePath) {
  var isExist = false;
  try {
    fs.statSync(filePath);
    isExist = true;
    console.log(isExist);
  } catch(err) {
    isExist = false;
    console.log(isExist);
  }
  return isExist;
}
//̧�ٖ��̎擾
if(check(filePath)===true){
filepath = fs.readdirSync(dirpath);

//�t���p�X�쐬
filefullpath = dirpath+filepath;

var text = fs.readFileSync(filefullpath,'utf8');
var lines = text.toString().split('\n');

console.log(lines[0]);  //recv tel_no
console.log(lines[13]); //recv msg
if(lines[13]=='test'){
    //tel_no(8190xxxxxxxx)
    var no = '81'+lines[0].slice(7,17);
    var msg = 'tset';
//msg.txt�쐬
    fs.writeFileSync('msg.txt','To: '+no+'\n'+'\n'+msg);
    console.log('msg.txt���쐬����܂����B');

//���t�@�C���폜
    fs.unlink(filefullpath,(err) => {
        if(err) throw err;
        console.log(filepath+'was deleted');
    });
}
}