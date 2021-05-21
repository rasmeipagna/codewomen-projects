const advicesArray = [
  "advice 1",
  "advice 2",
  "advice 3",
  "advice 4",
  "advice 5",
]

const adviceDisplayElement = document.querySelector(".advice-display");

// STEP 1 - get random advice from advicesArray

const generateNewAdvice = () => {
  const randomNumber = Math.floor(Math.random() * advicesArray.length);
  const randomAdvice = advicesArray[randomNumber];
  console.log("randomNumber", randomNumber);
  return randomAdvice;
}

const displayNewAdvice = (randomAdvice) => {
  const adviceParagraph = document.createElement("p");

  if(randomAdvice) {
    adviceParagraph.innerHTML = randomAdvice;
  } else {
    adviceParagraph.innerHTML = getNewAdvice();
  }

  adviceDisplayElement.innerHTML = "";
  adviceDisplayElement.appendChild(adviceParagraph);
}


// STEP 2 - get advice from API "Random advice" endpoint
 
const API_URL = "https://api.adviceslip.com";

const getRandomAdvice = () => {
  fetch(`${API_URL}/advice/`)
  .then((response) => {
    // console.log("1. ", response);
    return response.json();
  })
  .then((dataFromAPI) => {
    // console.log("2. ", dataFromAPI);
    const randomAdvice = dataFromAPI.slip.advice;
    // console.log("3. ", randomAdvice, " => ", typeof randomAdvice)
    return randomAdvice;
  })
  .then((randomAdvice) => {
    displayNewAdvice(randomAdvice);
  })
  .catch((error) => {
    console.log("Error => ", error);
    const errorToDisplay = "Something has gone wrong";
    displayNewAdvice(errorToDisplay);
  })
}


// STEP 2.bis - get advice from API "Advice by ID" endpoint

getNewAdviceEveryTime = () => {
  const randomId = Math.floor(Math.random() * 99);
  // console.log("randomId", randomId);

  fetch(`${API_URL}/advice/${randomId}`)
  .then((response) => {
    // console.log("1. ", response);
    return response.text()
  })
  .then((dataStringFromAPI) => {
    // console.log("2. ", dataStringFromAPI, " => ", typeof dataStringFromAPI);

    const dataObjectFromAPI = JSON.parse(dataStringFromAPI + "}");
    // console.log("3. ", dataObjectFromAPI, " => ", typeof dataObjectFromAPI);

    const randomAdvice = dataObjectFromAPI.slip.advice;
    return randomAdvice;
  })
  .then((randomAdvice) => {
    displayNewAdvice(randomAdvice);
  })
  .catch((error) => {
    console.log("Error => ", error);
    const errorToDisplay = "Something has gone wrong";
    displayNewAdvice(errorToDisplay);
  })
}
