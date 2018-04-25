const net = require('net');
const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');
const openjtalk = require('openjtalk');

var parser = new xml2js.Parser();
var mei = new openjtalk();

const PORT =　8080;

var client = net.createConnection(PORT,'localhost',function(){
  fs.writeFile('log/log.xml','<a>',(error)=> {});
  fs.writeFile('log/log.txt','',(error)=> {});
});

client.on('data',function(data){
  //ここにフラグ入れたらええんとちゃう？
  fs.appendFile('log/log.xml',data,'utf8',(error)=>{});
});

client.on('end',function(){
  fs.appendFile('log/log.xml','</a>','utf8',(error)=>{});
  Fileload().then(Read).then(Load).then(Speak);
});

function Fileload() {
  return new Promise(function(resolve){
    fs.readFile("log/log.xml",function(err,data){
      if(err){
        return;
      }
      resolve(data);
    });
  });
}

function Read(data) {
  return new Promise(function(resolve){
    parser.parseString(data,function(err,result){
      for(var key_0 in result.a.RECOGOUT){
        for(var key_1 in result.a.RECOGOUT[key_0].SHYPO[0].WHYPO){
          console.log(result.a.RECOGOUT[key_0].SHYPO[0].WHYPO[key_1].$.WORD);
          fs.appendFile('log/log.txt',result.a.RECOGOUT[key_0].SHYPO[0].WHYPO[key_1].$.WORD,(error)=>{});
        }
      }
    });
    resolve();
  });
}

function Load() {
  return new Promise(function(resolve){
    fs.readFile("log/log.txt",function(err,data_2){
      if(err){
        return;
      }
      resolve(data_2);
    });
  });
}

function Speak(data_2) {
  mei.talk(data_2);
}
