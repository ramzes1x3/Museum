let hamburger = document.querySelector('.link--exposition');
let expositionDesktop = document.querySelector('.list-exposition');
let expositionMobile = document.querySelector('.list-exposition-mobile');
let itemMobile = document.querySelector('.item--expostion-mobile');
let pageBody = document.querySelector('.page__body');

export const menuSwitch = () => {
  expositionDesktop.classList.toggle('_active');
}

export const menuSwitchMobile = () =>{
  expositionMobile.classList.toggle('_active');
  itemMobile.classList.toggle('_active');
  pageBody.classList.toggle('_lock');
}

hamburger.addEventListener('click', e => {
  e.preventDefault();
  e.stopPropagation();
  menuSwitch();
  menuSwitchMobile();
  hamburger.classList.toggle('_active');
});

document.addEventListener('click', e => {
  let target = e.target;
  let its_menu = target == expositionDesktop || expositionDesktop.contains(target);
  let its_menu_mobile = target == expositionMobile || expositionMobile.contains(target);
  let its_hamburger = target == hamburger;
  let menu_is_active = expositionDesktop.classList.contains('_active');
  let mobile_menu_is_active = expositionMobile.classList.contains('_active');

  if (!its_menu && !its_hamburger && menu_is_active) {
    hamburger.classList.toggle('_active');
    menuSwitch();
  }
  if(!its_menu_mobile && !its_hamburger && mobile_menu_is_active){
    menuSwitchMobile();
  }
})
