/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function wait1(t) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(t*1000),t*1000); // resolve the time given to them
    });
}

function wait2(t) {
    
    return new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(t*1000),t*1000); // resolve the time given to them
    });
}

function wait3(t) {
    
    return new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(t*1000),t*1000); // resolve the time given to them 
    });
}

function calculateTime(t1, t2, t3) {
    return wait1(t1)
    .then((time1)=>wait2(t2).then((time2)=>time1+time2))
    .then((time12)=>wait3(t3).then((time3)=>time12+time3)); // this step is very untidy and scales our code horizontally and should be avoided however i did it because it was mentioned in the instructions.    
}

/* 
// The better way to do it is using async await : 

async function calculateTime(t1, t2, t3) {
    let totalTime = 0;
    const time1 =  await wait1(t1)
    const time2 =  await wait2(t2)
    const time3 =  await wait3(t3)
    return time1+time2+time3;
} */




module.exports = calculateTime;
