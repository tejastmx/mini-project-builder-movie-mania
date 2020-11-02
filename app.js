// de12304ce1f2873e263b6f7cedaa8814

var apikey = "de12304ce1f2873e263b6f7cedaa8814";
var category = "";
var language = "";

function showHindi(category) {
  category = "popular";
  language = "hi";
  showData(category, language);
}
function showEnglish() {
  category = "popular";
  language = "en";
  showData(category, language);
}
function showMarathi() {
  category = "popular";
  language = "mr";
  showData(category, language);
}
function showTelugu() {
  category = "popular";
  language = "te";
  showData(category, language);
}
function showTamil() {
  category = "popular";
  language = "ta";
  showData(category, language);
}
function showUpcoming() {
  category = "upcoming";
  language = "en";
  showData(category, language);
}
function showData(category, language) {
  axios
    .get(
      `https://api.themoviedb.org/3/movie/${category}?api_key=${apikey}&with_original_language=${language}&page=1`
    )
    .then((response) => {
      // console.log(response.data.result.title)
      console.log(response);

      let section = document.querySelector("section");
      section.innerHTML = "";
      response.data.results.forEach((movie) => {
        // console.log(movie)
        let div = document.createElement("div");
        div.classList.add("movie-container");

        let heading = document.createElement("h2");
        heading.innerHTML = movie.original_title;
        div.appendChild(heading);

        let releaseDate = document.createElement("p");
        releaseDate.classList.add("date");
        releaseDate.innerHTML = "Release Date: " + movie.release_date;
        div.appendChild(releaseDate);

        let img = document.createElement("img");

        img.classList.add("poster");
        path = movie.poster_path;
        if (path == null) {
          link = "https://i.stack.imgur.com/WeyM8.jpg";
        } else {
          link = `https://image.tmdb.org/t/p/w500/${path}`;
        }
        img.setAttribute("src", link);
        img.onclick = function getTrailer() {
          let id = movie.id;
          axios
            .get(
              `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}&language=${language}`
            )
            .then((response) => {
              console.log(response.data.results[0].key);
              if (response.data.results.length) {
                let url = `https://www.youtube.com/embed/${response.data.results[0].key}`;
                localStorage.setItem("url", url);
                window.open("/trailer.html");
              } else {
                var popup = document.getElementById("popup");
                popup.style.display = "block";
                popup.style.animation = "popupanimation 3s 1";
              }
            })

            .catch((reject) => {
              var popup = document.getElementById("popup");
              popup.style.display = "block";
              popup.style.animation = "popupanimation 3s 1";
            });
        };
        div.appendChild(img);
        let icondiv = document.createElement("div");
        icondiv.className = "icondiv";
        let heart = document.createElement("p");
        let heartIcon = document.createElement("i");
        heartIcon.className = "fa fa-heart";
        heartIcon.innerHTML = " " + movie.vote_count;
        heart.appendChild(heartIcon);
        heartIcon.setAttribute("area-hidden", "true");
        icondiv.appendChild(heart);

        let eye = document.createElement("p");
        // eye.className = 'views'
        let eyeIcon = document.createElement("i");
        eyeIcon.className = "fa fa-eye";
        eyeIcon.innerHTML = " " + movie.popularity;
        eye.appendChild(eyeIcon);
        eyeIcon.setAttribute("area-hidden", "true");
        icondiv.appendChild(eye);
        div.appendChild(icondiv);
        section.appendChild(div);
      });
    })
    .catch((reject) => {
      alert("Something Went Wrong");
    });
}
function hidePopUp() {
  document.getElementById("popup").style.display = "none";
}
