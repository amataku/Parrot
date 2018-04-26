const net = require('net');
const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');
const openjtalk = require('openjtalk');
const keypress = require('keypress');

keypress(process.stdin);
process.stdin.setRawMode(true);

var parser = new xml2js.Parser();
var mei = new openjtalk();

var inputflag = 0;

const PORT =　10500;

var client = net.createConnection(PORT,'localhost',function(){
  fs.writeFile('log/log.xml','<a>',(error)=> {});
  fs.writeFile('log/log.txt','',(error)=> {});
  console.log("Spaceキーで録音停止");
});

process.stdin.on('keypress',function(c,key){
  if (key && key.ctrl && key.name == 'c') {
    process.exit();
  }
  if(inputflag == 1){
    if(key.name == 'space'){
      Fileload().then(Read).then(Load).then(Speak);
    }
  }
  if(inputflag == 0){
    if(key.name == 'space'){
      inputflag = 1;
      fs.appendFile('log/log.xml','</a>','utf8',(error)=>{});
      console.log("Spaceキーで音声出力");
    }
  }
});

client.on('data',function(data){
  if(inputflag == 0){
    fs.writeFile('log/log.txt','',(error)=> {});
    fs.appendFile('log/log.xml',data,'utf8',(error)=>{});
  }
});

client.on('end',function(){
  console.log("disconnect");
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
}process.stdin.resume()

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
  inputflag = 0;
  fs.writeFile('log/log.xml','<a>',(error)=> {});
  console.log("Spaceキーで録音停止");
}
