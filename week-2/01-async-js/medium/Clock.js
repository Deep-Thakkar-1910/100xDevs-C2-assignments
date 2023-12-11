
setInterval(()=>{
const date = new Date();
const hours24 = date.getHours();
const minutes24 = date.getMinutes();
const seconds24 = date.getSeconds();



    console.log(`\n${hours24}:${minutes24}:${seconds24}`);
},1000)



setInterval(()=>{
const date = new Date();
const hours = date.getHours()>=12 ? date.getHours()-12 : date.getHours(); 
const minutes = date.getMinutes();
const seconds = date.getSeconds();
const timeString = date.getHours()>=12 ? "PM" : "AM"


    console.log(`\n${hours}:${minutes}:${seconds} ${timeString}`);
},1000)


