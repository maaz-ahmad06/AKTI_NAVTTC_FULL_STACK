const button = document.createElement("button");
button.textContent = "Reload Page";
document.body.appendChild(button);

button.addEventListener("click", function () {
  location.reload();
});
