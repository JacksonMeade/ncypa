


const menu = document.querySelector('#toggle');  
const menuItems = document.querySelector('#overlay');  
const menuContainer = document.querySelector('.menu-container');  
const menuIcon = document.querySelector('i');  

function toggleMenu(e) {
    menuItems.classList.toggle('open');
    menuContainer.classList.toggle('full-menu');
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.add('fa-times');
    document.body.classList.toggle('no-scroll');
    e.preventDefault();
}

menu.addEventListener('click', toggleMenu, false);


const header = document.querySelector("header");
const mobile_nav = document.querySelector(".mobile-nav");

window.onscroll = function() {
  if (window.pageYOffset > 0) {
    header.classList.add("scrolled");
    mobile_nav.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
    mobile_nav.classList.remove("scrolled");
  }
};
