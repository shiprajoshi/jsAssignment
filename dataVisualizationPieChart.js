var fs=require('fs');
var rd = require('readline').createInterface({
input: fs.createReadStream('file/Crimes_-_2001_to_present.csv')});
var data=[];
var obj={};
var head =[];
var c=0;
var arr=[];
rd.on('line', function (line) 
{
  var newline=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
t 
  if(c == 0){
    // head =newline.split(',');
     c++;
  }
  else
  {
      if(newline[17]=="2016")
      {
          obj={
            "FBI": newline[14],
          };
           arr.push(obj);
      }


   }
    });

rd.on('close', function()
{
           fs.writeFileSync('file/try.json',JSON.stringify(arr),'utf8',function(err){console.log(err);});
	  
});
  
