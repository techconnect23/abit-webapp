
const urlRegex = new RegExp("^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)");

const url = document.getElementById("linkedin");

const validateUrl = function() {
  if(urlRegex.test(url.value)) {
    console.log("matched");
  } else {
    console.log("mismatched");
  }
}