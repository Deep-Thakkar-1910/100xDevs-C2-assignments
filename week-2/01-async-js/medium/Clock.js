
setInterval(()=>{
const date = new Date();
const hours24 = date.getHours();
const minutes24 = date.getMinutes();
const seconds24 = date.getSeconds();



    console.log(`\n${hours24}:${minutes24}:${seconds24}`);
},1000)



setInterval(()=>{
const date = new Date();
const hours = date.getHours();
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const timeString = hours>=12 ? "PM" : "AM"


    console.log(`\n${Math.abs(hours-12)}:${minutes}:${seconds} ${timeString}`);
},1000)


