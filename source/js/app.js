import * as flsFunction from "./modules/finder_webp.js";
import * as functions from "./modules/functions.js";

flsFunction.isWebp();
functions.menuSwitch();

let swiper = new Swiper(".swiper", {
  watchOverflow: true,
  loop: true,
  loopFillGroupWithBlank: true,
  // effect: 'coverflow',
  // coverflowEffect:{
  //   rotate: 20,
  //   stretch: 50,
  //   slideShadows: true,
  // },
  breakpoints:{
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
      slidesPerGroup: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
    767.98: {
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
  },
});
