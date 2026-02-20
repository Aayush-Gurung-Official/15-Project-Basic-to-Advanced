const clock = document.querySelector("#clock");
const stopwatch = document.querySelector("#stopwatch");
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");
function updatedigitalclock(){
    const now =new Date();
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');
    const seconds = String(now.getSeconds()).padStart(2,'0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updatedigitalclock,0.1000);
let stopwatchInterval;
let elapsedTime = 0;    
function updateStopwatch(){
    const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2,'0');
    const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2,'0');
    const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2,'0');
    const milliseconds = String(elapsedTime % 1000).padStart(3,'0');
    stopwatch.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
startBtn.addEventListener("click",()=>{
    if(!stopwatchInterval){
        const startTime = Date.now() - elapsedTime; 
        stopwatchInterval = setInterval(()=>{

            elapsedTime = Date.now() - startTime;
            updateStopwatch();
        }
        ,10);
    }
});
stopBtn.addEventListener("click",()=>{
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
});
resetBtn.addEventListener("click",()=>{
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
    elapsedTime = 0;
    updateStopwatch();
}
);
