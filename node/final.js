var fs=require('fs');
var r=require('readline');

var rd=r.createInterface(
  {
  input: fs.createReadStream('../csv/Crimes_-_2001_to_present.csv'),
});

var heading=[];
var count=0;
var obj={},obj2={};
var final_array=[]
//var json={"OVER $500":[],"$500 AND UNDER":[]}
rd.on('line', function(line)
{
  var value=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  if (count == 0)
  {
    heading =value;
    count=count+1;
  }
  else
  {
          if(value[5] =="THEFT" && value [6]=="OVER $500" && !obj[value[17]])
          {
            obj[value[17]]=1;
            //2001 =1  obj{ '2004': 2,'2001':1 }
          }
          else if(value[5] =="THEFT" && value [6]=="OVER $500")
          {
            obj[value[17]]=obj[value[17]]+1;	
                      //  console.log(obj);

          }
          else if(value[5] =="THEFT"  && value [6]=="$500 AND UNDER" &&!obj2[value[17]])
          {
              obj2[value[17]]=1;
                        //  console.log(obj);

          }
          else if(value[5] =="THEFT"  && value [6]=="$500 AND UNDER")
          {
            obj2[value[17]] =obj2[value[17]]+1;
                     //   console.log(obj);


          }

  }
});

rd.on('close',function()
{
  for (var k in obj)
  {

    var json={"OVER $500":[],"$500 AND UNDER":[],"year":[],}
    json["OVER $500"]=obj[k];//{'over 500':4,'under500':7,'year':2001}
    json["$500 AND UNDER"]=obj2[k];
    json["year"]=k;
    final_array.push(json);
}
//console.log(final_array);
fs.writeFileSync('../json/theft.json',JSON.stringify(final_array),'utf8',function(err){console.log(err);});
  //fs.writeFileSync('csv/Under500.json',JSON.stringify(obj2),'utf8',function(err){console.log(err);});
  //console.log(obj);
  console.log("done");
});