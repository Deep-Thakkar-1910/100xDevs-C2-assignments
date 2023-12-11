// Making the counter without setInterval using recursion
const counterFunction  = (counter)=>{
    
    console.log(counter);
    counter++;

    setTimeout(()=>{
        
        counterFunction(counter);
    },1000);
    
}

counterFunction(0);
