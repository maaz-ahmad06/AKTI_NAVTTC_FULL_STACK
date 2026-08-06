const googleBtn = document.createElement("button");
googleBtn.textContent = "Open Google";
document.body.appendChild(googleBtn);

googleBtn.addEventListener("click", function () {
  window.open("https://www.google.com", "_blank");
});

const backBtn = document.createElement("button");
backBtn.textContent = "Go Back";
document.body.appendChild(backBtn);

backBtn.addEventListener("click", function () {
  window.history.back();
});
