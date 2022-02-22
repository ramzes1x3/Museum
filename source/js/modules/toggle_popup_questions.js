export function togglePopup(){
  const askQuestionBtn = document.querySelector('.museum-contacts__btn-form');
  const popupQuestionForm = document.querySelector('.wrapper-modal');
  const popupClose = document.querySelector('.museum-contacts-form__close');


  var isStorageSupport = true;
  var storageName = "";
  var storageEmail = "";

  askQuestionBtn.addEventListener('click', function(e){
    e.preventDefault();

    popupQuestionForm.classList.toggle('visually-hidden');
  })

  popupClose.addEventListener('click', function(e){
    e.preventDefault()

    popupQuestionForm.classList.toggle('visually-hidden');
    popupQuestionForm.classList.remove("wrapper-feedback-error");
  })

  window.addEventListener("keydown", function(e) {
    if(e.keyCode === 27){
        if(!popupQuestionForm.classList.contains("visually-hidden")){
          e.preventDefault();
          popupQuestionForm.classList.add("visually-hidden");
          popupQuestionForm.classList.remove("wrapper-feedback-error");
        }
    }
  });
}
