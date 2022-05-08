export function tgText(){
  let calendar_text = document.querySelector('.events__link-calendar > a');
  let form_text = document.querySelector('.events__link-registration > a');

  document.addEventListener("DOMContentLoaded", function(event)
  {
    if(window.screen.width < 768){
      calendar_text.textContent = "МЕРОПРИЯТИЯ";
      form_text.textContent = "ЗАПИСЬ";
    }
    else if(window.screen.width > 768){
      calendar_text.textContent = "КАЛЕНДАРЬ МЕРОПРИЯТИЙ";
      form_text.textContent = "ЗАПИСАТЬСЯ НА ЭКСКУРСИЮ ИЛИ МЕРОПРИЯТИЕ";
    }

    window.addEventListener(`resize`, event => {
      if(window.screen.width < 768){
        calendar_text.textContent = "МЕРОПРИЯТИЯ";
        form_text.textContent = "ЗАПИСЬ";
      }
      else if(window.screen.width > 768){
        calendar_text.textContent = "КАЛЕНДАРЬ МЕРОПРИЯТИЙ";
        form_text.textContent = "ЗАПИСАТЬСЯ НА ЭКСКУРСИЮ ИЛИ МЕРОПРИЯТИЕ";
      }
    }, false);
  });
}
