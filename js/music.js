const img = document.getElementById("album");
const row = document.querySelector(".row");
const userInput = document.querySelector("input");
const searchBtn = document.querySelector(".btn-search");
const spinner = document.getElementById("spinner");
const paginationElement = document.getElementById("pagination");

let params = "";
let currentPage = 1;
const resultsPerPage = 10;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b6bf6be7f9msh5b84204908a3458p1865ffjsnee399cb9ee46",
    "X-RapidAPI-Host": "spotify23.p.rapidapi.com",
  },
};

const updatePagination = (totalResults) => {
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  let paginationHTML = "";

  if (totalPages <= 5) {
    for (let page = 1; page <= totalPages; page++) {
      paginationHTML += `<li class="page-item ${page === currentPage ? 'active' : ''}"><a class="page-link" data-page="${page}" href="#">${page}</a></li>`;
    }
  } else {
    if (currentPage <= 2) {
      for (let page = 1; page <= 4; page++) {
        paginationHTML += `<li class="page-item ${page === currentPage ? 'active' : ''}"><a class="page-link" data-page="${page}" href="#">${page}</a></li>`;
      }
      paginationHTML += '<li class="page-item"><a class="page-link" href="#">...</a></li>';
      paginationHTML += `<li class="page-item"><a class="page-link" data-page="${totalPages}" href="#">${totalPages}</a></li>`;
    } else if (currentPage >= totalPages - 1) {
      paginationHTML += `<li class="page-item"><a class="page-link" data-page="1" href="#">1</a></li>`;
      paginationHTML += '<li class="page-item"><a class="page-link" href="#">...</a></li>';
      for (let page = totalPages - 3; page <= totalPages; page++) {
        paginationHTML += `<li class="page-item ${page === currentPage ? 'active' : ''}"><a class="page-link" data-page="${page}" href="#">${page}</a></li>`;
      }
    } else {
      paginationHTML += `<li class="page-item"><a class="page-link" data-page="1" href="#">1</a></li>`;
      paginationHTML += '<li class="page-item"><a class="page-link" href="#">...</a></li>';
      for (let page = currentPage - 1; page <= currentPage + 1; page++) {
        paginationHTML += `<li class="page-item ${page === currentPage ? 'active' : ''}"><a class="page-link" data-page="${page}" href="#">${page}</a></li>`;
      }
      paginationHTML += '<li class="page-item"><a class="page-link" href="#">...</a></li>';
      paginationHTML += `<li class="page-item"><a class="page-link" data-page="${totalPages}" href="#">${totalPages}</a></li>`;
    }
  }

  paginationElement.innerHTML = paginationHTML;
  const pageLinks = paginationElement.querySelectorAll(".page-link");
  pageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = parseInt(e.target.getAttribute("data-page"));
      callDatas();
    });
  });
};


const callDatas = () => {
  params = userInput.value;
  spinner.style.display = "block";
  const offset = (currentPage - 1) * resultsPerPage; 

  fetch(
    `https://spotify23.p.rapidapi.com/search/?q=${params}&type=tracks&offset=${offset}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      spinner.style.display = "none";
      console.log(data.tracks.items);
      updatePagination(data.tracks.totalCount);
      let output = "";
      data.tracks.items.map((item) => {
        output += `
                 <div class="col-sm-6">
                 <div class="container-fluid">
                   <div class="card shadow" data-aos="zoom-in-up">
                    <img class="card-img-top" src="${
                      item.data.albumOfTrack.coverArt.sources[0].url
                    }" alt="Card image cap">

                      <div class="card-body">
                     <h5 class="card-title">${item.data.name}</h5>
                     <p class="card-text">Artist: ${
                       item.data.artists.items[0].profile.name
                     }.</p>
                     <p class="card-text">Duration: ${millisToMinutesAndSeconds(
                       item.data.duration.totalMilliseconds
                     )}</p>

                     <a href="${
                       item.data.albumOfTrack.sharingInfo.shareUrl
                     }" target="_blank" class="btn spotifyBtn">Play on spotify</a>
                   </div>
                   </div>
                 </div>
               </div>`;

        function millisToMinutesAndSeconds(millis) {
          var minutes = Math.floor(millis / 60000);
          var seconds = ((millis % 60000) / 1000).toFixed(0);
          return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        }
      });
      row.innerHTML = output;
    })
    .catch((err) => {
      spinner.style.display = "none";
      console.error(err)})
};
//item.data.artists.items[0].profile

searchBtn.addEventListener("click", function() {
  callDatas();
  currentPage = 1;
});
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    console.log("ENTER");
    currentPage = 1;
    event.preventDefault();
    searchBtn.click();
    callDatas();
  }
});

callDatas();
