export function togglePopup(){
  const askQuestionBtn = document.querySelector('.museum-contacts__btn-form');
  const popupQuestionForm = document.querySelector('.wrapper-modal');
  const popupClose = document.querySelector('.museum-contacts-form__close');
  const uName = document.querySelector('[name=user-name]');
  const uEmail = document.querySelector('[name=user-email]');
  const uQuestion = document.querySelector('[user-question]');
  const subForm = document.querySelector('.museum-contacts-form__submit');
  const pageBody = document.querySelector('.page__body');
  const questionForm = document.querySelector('.museum-contacts-form__question-form');

  var isStorageSupport = true;
  var storageName = "";
  var storageEmail = "";

  askQuestionBtn.addEventListener('click', function(e){

    e.preventDefault();

    popupQuestionForm.classList.toggle('visually-hidden');

    try{
      storageName = localStorage.getItem("user-name");
      storageEmail = localStorage.getItem("user-email");
    } catch(err){
        isStorageSupport = false;
    }

    if(storageName && storageEmail){
        uName.value = storageName;
        uEmail.value = storageEmail;
    }
    else{
        uName.focus();
    }
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

  subForm.addEventListener("click", function(e){
    if(!uName.checkValidity() || !uEmail.checkValidity()){
      e.preventDefault();
    }
    else{
      if(isStorageSupport){
        localStorage.setItem("user-name", uName.value);
        localStorage.setItem("user-email", uEmail.value);
        popupQuestionForm.classList.toggle('visually-hidden');
        popupQuestionForm.classList.remove("wrapper-feedback-error");
      }
    }
  });
}
