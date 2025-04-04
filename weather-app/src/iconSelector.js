import clear from "./img/clear.gif";
import cloudy from "./img/part-cloudy.gif";
import fog from "./img/fog.gif";
import drizzle from "./img/drizzle.gif";
import rain from "./img/rain.gif";
import snow from "./img/snow.gif";
import storm from "./img/storm.gif";

/* 
  0 - clear
1,2,3 - cloudy
45,48 - fog
51,53,55,56,57 - drizzle
61,63,65,66,67,80,81,82 - rain
71,73,75,77,85,86 - snow
95,96,99 - storm
Anything else - clear
*/

function iconSelector(code) {
  switch (code) {
    case 0:
      return clear;
    case 1:
    case 2:
    case 3:
      return cloudy;
    case 45:
    case 48:
      return fog;
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return drizzle;
    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return rain;
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return snow;
    case 95:
    case 96:
    case 99:
      return storm;
    default:
      return clear;
  }
}
export default iconSelector;
