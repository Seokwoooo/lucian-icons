/* Lucian Icons thermometer v2.0.11 | MIT (c) 2026 Lucian | https://lucianlabs.dev/icons/ */
import { defineIcon } from './runtime.js';
export const definition = {"id":"thermometer","version":"2.0.11","order":190,"name":{"ko":"온도계","en":"Thermometer"},"keywords":["온도","온도계","기온","열","temperature","thermometer","heat","weather"],"category":"nature","description":{"ko":"수은주가 내려갔다가 힘차게 올라갑니다.","en":"The mercury dips, then climbs."},"color":"#F05465","svg":"<path class=\"s\" d=\"M14 14.76V4.5a2 2 0 0 0-4 0v10.26a4 4 0 1 0 4 0z\"/><path data-part=\"merc\" class=\"a\" d=\"M12 17.5V9\"/><circle class=\"f\" cx=\"12\" cy=\"17.5\" r=\"2\"/><path d=\"M17 6h1.5M17 9h1.5M17 12h1.5\"/>","origins":{"merc":[12,17.5]},"effect":{"merc":{"k":[{"scale":1},{"scale":[1,0.3],"offset":0.3},{"scale":[1,1.15],"offset":0.7},{"scale":1}],"d":820,"e":"inOut","delay":0}}};
defineIcon(definition);
export default definition;
