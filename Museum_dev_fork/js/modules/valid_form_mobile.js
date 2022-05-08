document.addEventListener('DOMContentLoaded', function() {
  const questionForm = document.getElementById('form-mobile-question');

  questionForm.addEventListener('submit', function(e){

    e.preventDefault();
    let error = formValidate(questionForm);

    if(error === 0){
      alert("Форма отправлена");
      e.target.reset ();
    }else{
      alert('Не заполнены обязательные поля');
    }

    function formValidate(questionForm) {
      let error = 0;
      let formReq = questionForm.querySelectorAll('.req');

      for(let index = 0; index < formReq.length; index++){
        const input = formReq[index];
        formRemoveError(input);

        if(input.classList.contains('email')){
          if(emailTest(input)){
            formAddError(input);
            error++;
          }
        else{
          if(input.value === ''){
            formAddError(input);
            error++;
          }
          }
        }
      }

      return error;
    }

    function formAddError(input) {
      input.parentElement.classList.add('error');
      input.classList.add('error');
    }

    function formRemoveError(input){
      input.parentElement.classList.remove('error');
      input.classList.remove('error');
    }

    function emailTest(input){
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
  })
});
