const QUOTES = "quotes";

function getTime() {
  const time = document.querySelector(".time");

  const newDate = new Date();

  const hours = newDate.getHours();
  // const minutes = newDate.getMinutes();
  // const seconds = newDate.getSeconds();

  // const hours = String(newDate.getHours()).padStart(2, "0");
  const minutes = String(newDate.getMinutes()).padStart(2, "0");
  const seconds = String(newDate.getSeconds()).padStart(2, "0");

  // time.innerText = hours + ":" + minutes + ":" + seconds;
  if (hours <= 12) {
    time.innerText =
      "AM " + `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
  } else {
    time.innerText =
      "PM " + `${String(hours - 12).padStart(2, "0")}:${minutes}:${seconds}`;
  }
  // time.innerText = `${hours}:${minutes}:${seconds}`;
}

getTime();
setInterval(getTime, 1000);

function getQuotes() {
  const quotesMsg = document.querySelector(".quotesMsg");
  let savedQuotes = localStorage.getItem(QUOTES);

  if (!savedQuotes) {
    localStorage.setItem(
      QUOTES,
      JSON.stringify([
        "내 비장의 무기는 아직 손안에 있다. 그것은 희망이다",
        "내 사전에는 불가능이 없다",
        "믿음이 부족하기에 도전하기를 두려워하는바 나는 나 자신을 믿는다",
        "살고자 하면 죽을것이고, 죽고자 하면 살 것이다",
      ])
    );

    savedQuotes = localStorage.getItem(QUOTES);
  }

  let quotesArray = JSON.parse(savedQuotes);

  quotesMsg.innerText =
    quotesArray[Math.floor(Math.random() * quotesArray.length)];
}

getQuotes();
// setInterval(getQuotes, 1000);

function onClickAdd(value) {
  const newQuotes = document.querySelector(".newQuotes");
  const newQuotesView = document.querySelector(".newQuotesView");

  if (value) {
    newQuotes.style.display = "inline-block";
  } else {
    newQuotes.style.display = "none";
  }
}

function onClickRegist() {
  const quotesMsg = document.querySelector(".quotesMsg");
  const newQuotes = document.querySelector(".newQuotes");
  const newQuotesInput = document.querySelector(".newQuotesInput");

  if (!newQuotesInput.value) {
    return;
  }

  let savedQuotes = localStorage.getItem(QUOTES);

  let quotesArray = JSON.parse(savedQuotes);
  quotesArray.push(newQuotesInput.value);

  localStorage.setItem(QUOTES, JSON.stringify(quotesArray));

  quotesMsg.innerHTML = `<span style="color:red;">${newQuotesInput.value}<span/>`;
  newQuotes.style.display = "none";
  newQuotesInput.value = "";
}

let isLoading = false;

async function onClickSearch() {
  const searchInput = document.querySelector(".searchInput");
  const searchResult = document.querySelector(".searchResult");

  if (!searchInput.value) return;
  if (isLoading) return;

  // 여기까지옴 === isLoading false

  isLoading = true;
  const question = searchInput.value;
  searchInput.value = "검색 중 입니다... 잠시만 기다려주세요...";

  // console.log("챗 지피티 동작중");

  // 프론트엔드에서 백엔드
  const response = await axios.post(
    "https://holy-fire-2749.fly.dev/chat",
    {
      question,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer BLOCKCHAINSCHOOL3",
      },
    }
  );

  if (response.status === 200) {
    searchResult.style.display = "inline";
    searchResult.innerText = response.data.choices[0].message.content;
  }

  searchInput.value = "";
  isLoading = false;
}

function onClickToggle(value) {
  const nft = document.querySelector(".nft");
  const nftView = document.querySelector(".nftView");

  if (value) {
    nft.style.display = "inline-block";
    nftView.style.display = "none";
  } else {
    nft.style.display = "none";
    nftView.style.display = "inline-block";
  }
}
