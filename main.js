function getTime() {
  const time = document.querySelector(".time");

  const newDate = new Date();

  // const hours = newDate.getHours();
  // const minutes = newDate.getMinutes();
  // const seconds = newDate.getSeconds();
  const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");

  // time.innerText = hours + ":" + minutes + ":" + seconds;
  time.innerText = `${hours}:${minutes}:${seconds}`;
}

getTime();
setInterval(getTime, 1000);
