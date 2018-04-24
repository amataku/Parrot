const fs = require('fs');
const xml2js = require('xml2js');
const util = require('util');

var parser = new xml2js.Parser();
fs.readFile('../log/log.xml',function(err,data){
  parser.parseString(data,function(err,result){
    /*for(var key_1 in result.a.RECOGOUT){
      for(var key in result.a.RECOGOUT[0].SHYPO[0].WHYPO){
        console.log(result.a.RECOGOUT[0].SHYPO[0].WHYPO[key].$.WORD);
        fs.writeFile('./log.txt',util.inspect(result,false,null),(error)=>{});
      }*/
    console.log(result);
  });
});
