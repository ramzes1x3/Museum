export function menuSwitch() {
  const arrowBtn = document.querySelector('.link--exposition');

  if(arrowBtn){
    const expositionMenu = document.querySelector('.list-exposition');
    arrowBtn.addEventListener("click", function(e) {
      arrowBtn.classList.toggle('_active');
      expositionMenu.classList.toggle('_active');
    });
  }
}
