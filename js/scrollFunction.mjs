/**
 * When the user scrolls down 20px from the top of the document, show the button
 **/
function scrollFunction(mybutton) {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

/**
 * When the user clicks on the button, scroll to the top of the document
 * */
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

export const addScroll2TopFunction = () => {
  let mybutton = document.getElementById("scrollToTopButton");
  window.onscroll = function () {
    scrollFunction(mybutton);
  };
  mybutton.onclick = topFunction;
};
