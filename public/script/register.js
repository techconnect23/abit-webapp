
const urlRegex = new RegExp("^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)");

const url = document.getElementById("linkedin");

const submitBtn = document.getElementById("submitButton");



const validateUrl = function() {
  if(urlRegex.test(url.value)) {
    console.log("matched");
  } else {
    console.log("mismatched");
  }
}


submitBtn.addEventListener("click", validateUrl);