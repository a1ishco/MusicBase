//NavBar scroll effect
window.onscroll = function() {stickyScroll()};
var navbar = document.querySelector(".navbar");
var sticky = navbar.offsetTop;
if (sticky == null){
console.log("XXX");
}
function stickyScroll() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    navbar.classList.add("sticky")
    document.querySelector('.logoNavbar').innerHTML=" "
  } else {
    navbar.classList.remove("sticky");
    document.querySelector('.logoNavbar').innerHTML="MusicBase"
  }
}

window.addEventListener("blur",()=>{
  document.title = "Let`s Listen!";
})
window.addEventListener("focus", () =>{
  document.title = "MusicBase";
})
//AOS initalize
AOS.init();