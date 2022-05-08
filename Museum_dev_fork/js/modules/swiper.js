export let swiper = new Swiper(".swiper", {
  watchOverflow: true,
  loop: true,
  loopFillGroupWithBlank: true,
  effect: 'coverflow',
  coverflowEffect:{
    rotate: 30,
    stretch: 0,
    slideShadows: true,
  },
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
      spaceBetween: 0,
      slidesPerGroup: 1,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    },
  },
});
