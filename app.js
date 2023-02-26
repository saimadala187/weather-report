const express= require("express");
const https=require("https");
const BodyParser=require("body-parser");




const app=express();

app.use(BodyParser.urlencoded({extened:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+ "/index.html");
});
app.post("/", function(req, res){
  const query=req.body.cityName;
  const apikey="047a785ba200448fb98615db60e60609";
  const unit="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apikey +"&units="+unit;
  https.get(url, function(response){
  console.log(response.statusCode);
  response.on("data", function(data){
    const weathero=JSON.parse(data)
    console.log(weathero);
    var temparature=weathero.main.temp;
    var des=weathero.weather[0].description;
    var ic=weathero.weather[0].icon;
    var imgurl="http://openweathermap.org/img/wn/"+ic+"@2x.png"
    //var d="Current temparature is :"+ temparature +" degree celcius  and it is "+des;
    //res.send("<h1>"+d+"</h1>");
    //another method
    res.write("<p>The description of weather is "+ des+"</p>");
    res.write("<h1> Current tempareture in "+ query+" is :"+ temparature +" degree celcius</h1>");
    res.write("<img src="+imgurl+">");
    res.send();

});
});
})



app.listen(3000,function(){
  console.log("server is running  on 3000 port ");
});
