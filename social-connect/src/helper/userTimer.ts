export default function timeCounter(targetTime: number, callback: any) {
  let timerCount = "";
  let timerDuration = targetTime - Date.now();
  let timer = setInterval(() => {
    // Calculate the minutes and seconds remaining
    let minutes = Math.floor(timerDuration / 60000);
    let seconds = ((timerDuration % 60000) / 1000).toFixed(0);

    // Display the remaining time in MM:SS format
    timerCount = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    // Update the timer duration
    timerDuration -= 1000;

    // Clear the timer if the duration has elapsed
    if (timerDuration < 0) {
      clearInterval(timer);
      timerCount = "";
    }
    // console.log(timerCount);
    callback(timerCount);
  }, 1000);
  return timer;
}
