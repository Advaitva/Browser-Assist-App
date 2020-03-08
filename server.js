var express=require('express'),
    app=express(),
    request=require('request');
    // time=require('time');
app.use(express.static(__dirname+"/public"));
app.set('view engine','ejs');
var city="Vellore,in",
    getData='http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=a18c244097e452a81459b603c03ce393',
    weather,
    temp,
    quotesUrl='https://type.fit/api/quotes',
    quote,
    qNum,
    quoteText,
    quoteAuthor,
    date,
    hours,
    greeting,
    mood,
    lat,
    long;

function apiCall(){

    request(getData,(error,response,body)=>{
        if(error)
        {
            console.log(error)
            console.log('Something went wrong')
    }
    else
        if(response.statusCode==200)
        {
            weather=JSON.parse(body);
            temp=Math.round(weather.main.temp-273.15);
        } 
    })
    request(quotesUrl,(error,response,data)=>{
        if(error)
        console.log('Error Has Occured\n'+error);
        else
            if(response.statusCode==200)
            {
                quote=JSON.parse(data);
                qNum=Math.floor(Math.random()*quote.length);
                quoteText=quote[qNum].text;
                quoteAuthor=quote[qNum].author;
            }
        }); 
    }
    app.get('/',(req,res)=>{
    apiCall();
    sendData={
        temp:temp,
        quoteText:quoteText,
        quoteAuthor:quoteAuthor,
        greeting:greeting,
        mood:mood,
   };
   res.render('index',sendData);
})

app.listen(process.env.PORT||8080,function(){
    console.log('App Running Successfully')
});

