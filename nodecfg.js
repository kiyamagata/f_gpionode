// FM okayama S2
exports.cmdstr=[
  ["N01[ST2]",""],
  ["N02[/S/STANDBY/S2 1]","N03[/S/STANDBY/S2 0]"],
  ["N01[EM2]","N01[EM0]"],
  ["N01[EM2]","N01[EM0]"],
  ["N01[B04]",""],
  ["N01[B05]",""],
  ["N01[B06]",""],
  ["N01[B07]",""]
];

exports.MYPORT=15867;
exports.SENDDIST={
     "N01":[ {'act':'Udp',"addr":'239.0.1.10',"port":15869,"mid":"CUE"}],
     "N02":[ {'act':'Udp',"addr":'239.0.1.10',"port":15522,"mid":""},
             {'act':'Bit',"addr":'',"port":0,"mid":"B05O00"}],
     "N03":[ {'act':'Udp',"addr":'239.0.1.10',"port":15522,"mid":""},
             {'act':'Bit',"addr":'',"port":0,"mid":"B05X00"}]
};
exports.APSPORT=exports.SENDDIST["N01"].port;
exports.APSADDR=exports.SENDDIST["N01"].addr;
