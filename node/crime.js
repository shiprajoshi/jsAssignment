var fs=require('fs');

var r=require('readline');

var index=0;
var obj_true={};// object when the arrest has been there for assault cases
var obj_false={};// object when the arrest has not been there for assault cases
var arr=[]; //array to push final onject 
var rd=r.createInterface(
  {
  input: fs.createReadStream('../csv/Crimes_-_2001_to_present.csv'),// to fetch csv file
});
rd.on('line', function(line)// to read csv file line by line
{
	
  var newline=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);// split the line  using comma and ignoring comma if itis inside a string
  
//ignoring the headers
  if (index == 0)
  {
    index++;
    
  }
   
   else
   {
    
       if(newline[5]=="ASSAULT" && newline[8]=="TRUE" && !obj_true[newline[17]])
       {
         obj_true[newline[17]]=1;//if the object is not there for a particular year it will be created
       }
       else if(newline[5]=="ASSAULT" && newline[8]=="TRUE")
       {
         obj_true[newline[17]]=obj_true[newline[17]]+1;//if the object is already there for a particular year it will be increased by 1

       }
      else if(newline[5]=="ASSAULT" && newline[8]=="FALSE" && !obj_false[newline[17]])
      {
          obj_false[newline[17]]=1; //if the object is not there for a prticular year it will be created

      }
       else if(newline[5]=="ASSAULT" && newline[8]=="FALSE")
       {
          obj_false[newline[17]]=obj_false[newline[17]]+1;//if the object is already there for a particular year it will be increased by 1
        }
  }
});

// after the lines have been read
rd.on('close', function()
{
  for (var k in obj_true)
  
  {
    //creating the final object having three keys
    var obj_fin=
    {
      "Arrests": obj_true[k],
      "NonArrests": obj_false[k],
      "Year": k
    };
      
      //pushing the final object into array
      arr.push(obj_fin);
    
  }
     fs.writeFileSync('../json/assault.json',JSON.stringify(arr),'utf8',function(err){console.log(err);});
    console.log("completed");

});