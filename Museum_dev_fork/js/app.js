import * as flsFunction from "./modules/finder_webp.js";
import * as functions from "./modules/switch_menu.js";
import * as swiper from "./modules/swiper.js";
import * as yandexMap from "./modules/yandex_map_api.js";
import * as switchPopup from "./modules/toggle_popup_questions.js";
import * as validFormMobile from "./modules/valid_form_mobile.js";
import * as event from "./modules/events.js";

flsFunction.isWebp();
ymaps.ready(yandexMap.init);
event.tgText();
