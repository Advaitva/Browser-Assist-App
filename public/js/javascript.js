var background=document.getElementById('background');
var n=Math.ceil(Math.random()*8);
background.src='/images/b'+n+'.jpg';
// function sendCoord(){

//     if(navigator.geolocation)
//     {
//         navigator.geolocation.getCurrentPosition(function(pos){
//             var lat=pos.coords.latitude;
//             var long=pos.coords.longitude;
//             var dataSend={
//                 lat:lat,
//                 long:long
//             }
//         });
//         $.post('/',dataSend,function(data,status){
//             console.log(data);
//             console.log(status);
//         });
//     }
// }
getGreet();
getMood();
function getMood(){
  data=calculate();
  document.getElementById('moodMsg').textContent=data.mood;
}
function getGreet(){
    var data=calculate();
    document.getElementById('greetMsg').textContent=data.greet;
}
function calculate(){
    var date=new Date;
    hours=date.getHours();
    if(0<=hours && hours<=11)
    {
        greeting="Morning";
        mood="Day";
    }
    else if(12<=hours && hours<=16)
    {
        greeting="Afternoon";
        mood="Day";
    }
    else if(17<=hours && hours<=20)
    {
        greeting="Evening";
        mood="Time";
    }
    else
    {
        greeting="Night";
        mood="Sleep";
    }
    data= {greet:greeting,mood:mood};
    return data;
}