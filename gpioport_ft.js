
// gpioport_ft.js  gpioport for futureNet(century)




var fs = require("fs"),
path = require("path"),
exec = require("child_process").exec;
//var gpioAdmin = "gpio-admin",
//sysFsPath = "/sys/devices/virtual/gpio";

var GPOprefix="/sys/class/leds/DO_";
var GPOpostfix="/brightness";
var GPIprefix="/sys/class/gpio/DI_0";
var GPIpostfix="/value";

exports.GpoPort =function(pt,logic){
  this.port=pt;
  this.lg=logic;
  this.value=0;
}
var bs = {'HIGH':1 ,'LOW':0,
    'INPUT':0,
    'digitalWrite': function(pt,v){
        tgt=GPOprefix + pt + GPOpostfix;
//        console.log('degWt:'+tgt);
        fs.writeFileSync(tgt,""+v);
     },
    'digitalRead': function(pt){
        tgt=GPIprefix + pt + GPIpostfix;
//        console.log('degRd:'+tgt);
        ii= fs.readFileSync(tgt);
        return ii-0; 
     },
    'pinMode':function(){}
};

exports.bs=bs;
exports.GpoPort.prototype.write= function(v){
  if(v){
    bs.digitalWrite(this.port,(this.lg==bs.HIGH)?bs.HIGH:bs.LOW);
  }
  else{
    bs.digitalWrite(this.port,(this.lg==bs.HIGH)?bs.LOW:bs.HIGH);
  }
  this.value=v;
}
exports.GpoPort.prototype.pulse= function(v){
  this.write(1);
  setTimeout(function(pt){
      pt.write(0);
  },v*100,this);
  this.value=0;
}
exports.GpoPort.prototype.setup= function(){
    bs.pinMode(this.port,bs.OUTPUT);
    this.write(this.value);
}
exports.GpiPort =function(pt,logic,pull){
  this.port=pt;
  this.lg=logic;
  this.pu=pull;
  this.value=0;
  return this.value;
}

exports.GpiPort.prototype.read= function(){
  v=  bs.digitalRead(this.port);

  this.value=(v==this.lg)?bs.HIGH:bs.LOW;
  return this.value;
}
exports.GpiPort.prototype.setup= function(){
//    bs.pinMode(this.port,(this.pu)?bs.INPUT_PULLUP:bs.INPUT);
    bs.pinMode(this.port,bs.INPUT,7,this.pu?'pullup':'disabled');
    this.value=this.read();
}
exports.GpiPort.prototype.chkChg= function(callback){
var  sv=this.value;
var  v=this.read();
 // console.log("BTN:"+this.port+v);

  if(sv != v) callback(this);
}
