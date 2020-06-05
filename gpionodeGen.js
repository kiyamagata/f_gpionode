//
// take control (GENELIC)
// 2014/10/16 (hamamatu-fru yokkaichi)
// 2015/1/22
// 2015/2/12
// 2015/9/18
//var bs = require('bonescript');
var gpt = require('./gpioport_ft');
var cfg = require('./nodecfg');
//var bs=gpt.bs;

//------------------------------------------------
var opar=new Array(
  new gpt.GpoPort(0,1),
  new gpt.GpoPort(1,1),
  new gpt.GpoPort(2,1),
  new gpt.GpoPort(3,1),
  new gpt.GpoPort(4,1),
  new gpt.GpoPort(5,1),
  new gpt.GpoPort(6,1),
  new gpt.GpoPort(7,1));
var ipar=new Array(
  new gpt.GpiPort(0,1,true),
  new gpt.GpiPort(1,1,true),
  new gpt.GpiPort(2,1,true),
  new gpt.GpiPort(3,1,true),
  new gpt.GpiPort(4,1,true),
  new gpt.GpiPort(5,1,true),
  new gpt.GpiPort(6,1,true),
  new gpt.GpiPort(7,1,true));

var memar={};

iparMX=8;

function tstamplog(str){
    console.log(new Date().toJSON()+str);
}

//setup1
{
   opar.forEach(function(e){
       e.setup();
   });
   ipar.forEach(function(e){
       e.setup();
   });
}

function BitCmd(msgstr){
    if(msgstr.substr(0,1)=="B"){   
      n=msgstr.substr(1,2) -0;  //.toInt();
      tstamplog('cmd:'+ msgstr.substr(0,1) +'N:'+ n);
      if(n<opar.length){
        if(msgstr.substr(3,1)=="O"){
           opar[n].write(1);
        }
        if(msgstr.substr(3,1)=="X"){
           opar[n].write(0);
        }
        if(msgstr.substr(3,1)=="P"){
           opar[n].pulse(msgstr.substr(3+4+1,2)-0);
        }
      }
      return;
    }
    if((msgstr.substr(0,1)=="S")&&   
       (msgstr.substr(3,1)=="=")){  
        n=msgstr.substr(1,1) -0;  //pos .toInt();
        m=msgstr.substr(2,1) -0;  //bit .toInt();
        v=msgstr.substr(4,2) -0;  //val .toInt();
        tstamplog('cmd:'+ msgstr.substr(0,6) );
        for(var ii=0;ii<m;ii++){
           var b=(v&(1<<ii))?1:0;
           opar[n+ii].write(b);
        }
        return;
    }
    if(msgstr.substr(0,1)=="$"){  // mem macro
         mss=msgstr.split("=");
         memar[mss[0].substr(1)]=mss[1];
    }
}

var dgram = require('dgram');

sock = dgram.createSocket("udp4", function (msg, rinfo) {
  console.log('got message from '+ rinfo.address +':'+ rinfo.port);
  console.log('data len: '+ rinfo.size + " data: "+
  //            conv.convert(msg).toString());
              msg.toString('ascii', 0, rinfo.size));
  msgstr=msg.toString('ascii', 0, rinfo.size);
  // todo pulse / multi
  if((msgstr.substr(0,4)=="CMD[")|| 
     (msgstr.substr(0,4)=="BIT[")){ 
      BitCmd(msgstr.substr(4,6));  
  }
  if(msgstr.substr(0,4)=="PING"){
      bf =new Buffer("+OK");
      sock.send(bf,0,3,rinfo.port,rinfo.address);
  } 
});
sock.bind(cfg.MYPORT, '0.0.0.0');

//var buf="          ";
function loop(){
   for( i=0;i<iparMX;i++){
      //if(cfg.cmdstr[i][0]=="") break;
      ipar[i].chkChg(function(e){
         msg=cfg.cmdstr[i][(e.value)?0:1];
         tstamplog("BTN:"+msg);
         if(msg.length>0){
             //dgram.setBroadcast(1);
             mitm=msg.split("[");
             if((mitm.length>1)&&(mitm[0] in cfg.SENDDIST)){
                dist=cfg.SENDDIST[mitm[0]];
                for(jj=0;jj<dist.length;jj++){
                  if(dist[jj].act=='Udp'){
                    msg=mitm[1].substr(0,mitm[1].length-1);
                    if(dist[jj].mid.length>0){
                        if(msg.substr(0,1)=='$'){
                           msg=memar[msg.substr(1)];
                        }
                        msg=dist[jj].mid+"["+msg+"]";
                    }
                    bf =new Buffer(msg);
                    sock.send(bf,0,msg.length,dist[jj].port,dist[jj].addr);
                  }
                  else{
                    if(dist[jj].act=='Bit'){
                        BitCmd(dist[jj].mid);
                    }
                  }
                }
             }
             else{
                 bf =new Buffer(msg);
                 sock.send(bf,0,msg.length,cfg.APSPORT,cfg.APSADDR);
             }
         }

      });
   }
}
setInterval(loop, 50);
