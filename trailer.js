window.onload = () => {
  document
    .querySelector("iframe")
    .setAttribute("src", localStorage.getItem("url"));
};
