const { map } = require("lodash");
var natural = require("natural");
var tokenizer = new natural.WordTokenizer();

var qs = req.query;// sum of two numbers
qs = qs.split(" ");
qs = qs.tolocaleLowerCase();

var tot = 997;

var arr = new Array(1100); // create an empty array of length 2000
for (var i = 0; i < 2000; i++) {
  arr[i] = new Array(10000); // make each element an array
}

var qarr = [10000];
var mq = 1;

var iidd = fs.readFileSync("./keywords.txt", "utf8");
iidd = iidd.toString();
iidd = iidd.split("\n");

var idf = fs.readFileSync("./idf.txt", "utf8");
idf = idf.toString();
idf = idf.split("\n");


var tdif = fs.readFileSync("./td-idf.txt", "utf8");
tdif = tdif.toString();
tdif = tdif.split("\n");

var mod = fs.readFileSync("./mod.txt", "utf8");

for(var i=0;i<tdif.length;i++)
{
    var curr=tdif[i].split(" ");
    var i=parseInt(curr[0]);
    var j=parseInt(curr[1]);
    var val=parseFloat(curr[2]);
    arr[i][j]=val;
}

var mp=new Map();
var w_count=0;
var w_ind=new Map();
for(var i=0;i<qs.length;i++)
{
    var curr=qs[i];
    var idx=iidd.indexOf(curr);
    if(idx!=-1)
    {
        if(mp.has(curr)==false)
        {
            mp.set(curr,1);
            qarr[idx]=1;
            w_ind.set(curr,idx);
        }
        else{
            mp.set(curr,mp.get(curr)+1);
            qarr[idx]=qarr[idx]+1;
        }
        w_count = w_count + 1;
    }
}

for (var i = 0; i < qs.length; i++) {
  var curr = qs[i];
  var idx = iidd.indexOf(curr);
  if (idx != -1 && w_ind.get(curr)!=-1) {
    var idf_val = parseFloat(idf[idx]);
    qarr[idx]=qarr[idx]/w_count;
    w_ind.set(curr,-1);
  }
}


var fin=[];
for(var i=0;i<tot;i++)
{
    var dp=0;
    var mod_val=parseFloat(mod[i]);
    var qm=0;
    for(var j=0;j<qs.length;j++)
    {
        var curr=qs[j];
        var idx=iidd.indexOf(curr);
        if((idx!=-1) && (arr[i][idx]!=undefined))
        {
            dp=dp+(arr[i][idx]*qarr[idx]);
            qm=qm+(qarr[idx]*qarr[idx]);
        }
    }
    qm=Math.sqrt(qm);
    var ans;
    if(qm!=0 && mod_val!=0)
    {
        ans=dp/(mod_val*qm);
    }
    if(ans!=undefined)
    {
        var temp={val1:ans,val2:i};
        fin.push(temp);
    }
}

function custom_compare (a,b) {
  // I'm assuming all values are numbers
  return a.value>b.value;
}

fin.sort(custom_compare).reverse();

if(fin.length==0)
{
    console.log("No results found");
}
else
{
    for(var i=0;i<fin.size;i++)
    {
        if(i==10)
        {
            break;
        }
        var temp=fin[i];
        var fin_ans=temp.val2;
    }
}


