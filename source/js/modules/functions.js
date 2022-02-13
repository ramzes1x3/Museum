export function menuSwitch() {
  const arrowBtn = document.querySelector('.link--exposition');

  if(arrowBtn){
    const expositionMenu = document.querySelector('.list-exposition');
    const expositionParent = document.querySelector('.item--expostion-mobile');
    const expositionMobile = document.querySelector('.list-exposition-mobile');

    arrowBtn.addEventListener("click", function(e) {
      arrowBtn.classList.toggle('_active');
      expositionParent.classList.toggle('_active');
      expositionMenu.classList.toggle('_active');
      expositionMobile.classList.toggle('_active');
    });
  }
}
