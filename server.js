var express=require('express'),
    app=express(),
    request=require('request'),
    body=require('body-parser');
    // time=require('time');
app.use(express.static(__dirname+"/public"));
app.use(body.urlencoded({extended:true}));
app.set('view engine','ejs');
var weather,
    getData,
    temp,
    quotesUrl='https://type.fit/api/quotes',
    quote,
    qNum,
    quoteText,
    quoteAuthor,
    name,
    city;
function apiCall(getData,name,city){
    return new Promise((resolve,reject)=>{
        request(getData,(error,response,body)=>{       // Very Important
            if(error)
            {
                console.log(error)
                console.log('Something went wrong')
            }
            else if(response.statusCode==200)
            {
                weather=JSON.parse(body);
                temp=Math.round(weather.main.temp-273.15);
            } 
        })
        request(quotesUrl,(error,response,data)=>{
            if(error){
            console.log('Error Has Occured\n'+error);
            return reject(error);
            }
            else if(response.statusCode==200)
            {
                quote=JSON.parse(data);
                qNum=Math.floor(Math.random()*quote.length);
                quoteText=quote[qNum].text;
                quoteAuthor=quote[qNum].author;
                const sendData={
                    temp:temp,
                    name:name,
                    quoteText:quoteText,
                    quoteAuthor:quoteAuthor,
                    city:city
               };
               resolve(sendData);
            }
    })
}); 
    
       
    }
app.get('/',(req,res)=>{
    res.render('loader');
})
app.post('/details',(req,res)=>{
   name=req.body.name;
   city=req.body.city;
   
   getData='http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=a18c244097e452a81459b603c03ce393';
   
  

   
   res.redirect('/home');
})




app.get('/home',async (req,res)=>{
    try{
        const sendData=await apiCall(getData, name, city);
        res.render('index',sendData);
    }
   catch(error){
       console.log(error);
   }
   
})


app.listen(process.env.PORT||8000,function(){
    console.log('App Running Successfully')
});