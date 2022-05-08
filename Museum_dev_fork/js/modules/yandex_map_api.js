var myMap;
var placemark;

export function init(){

  myMap = new ymaps.Map("yandex-map", {
      center: [47.20587137631812,38.93814957284925],
      zoom: 18,
      controls: ["trafficControl"],
      behaviors: ["drag"],
  });

  placemark = new ymaps.Placemark([47.20599349972225,38.93911441581672], {
      hintContent: "Политехнический музей",
      balloonContent: "Россия, Ростовская обл., г.<br> Таганрог, ул. Чехова 22,<br> корп. «Б», 2-й подъезд."
  },
  {
      iconLayout: "default#image",
      iconImageHref: "img/icon_map_address_museum.svg",
      iconImageSize: [66, 80]
  });

  myMap.geoObjects.add(placemark);
  if(window.screen.width < 768){
    myMap.setCenter([47.205872355234,38.93921813258074]);
  }
  else if(window.screen.width > 768){
    myMap.setCenter([47.20587137631812,38.93814957284925]);
  }
}

document.addEventListener("DOMContentLoaded", function(event)
{
    window.onresize = function() {
        resizeInfo();
    };
});

export function resizeInfo()
{
  if(window.screen.width < 768){
    myMap.setCenter([47.205872355234,38.93921813258074]);
  }
  else if(window.screen.width > 768){
    myMap.setCenter([47.20587137631812,38.93814957284925]);
  }
}
