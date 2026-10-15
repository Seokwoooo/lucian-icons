/* Lucian Icons pause v2.0.0 | MIT (c) 2026 Lucian | https://lucianlabs.dev/icons/ */
import { defineIcon } from './runtime.js';
export const definition = {"id":"pause","version":"2.0.0","order":95,"name":{"ko":"일시정지","en":"Pause"},"keywords":["일시정지","멈춤","대기","pause","hold","break"],"category":"media","description":{"ko":"두 막대가 번갈아 눌렸다 올라옵니다.","en":"The two bars press down in turn."},"color":"#F4AF2D","svg":"<rect data-part=\"b1\" class=\"s\" x=\"6\" y=\"4.5\" width=\"4\" height=\"15\" rx=\"1.5\"/><rect data-part=\"b2\" class=\"s\" x=\"14\" y=\"4.5\" width=\"4\" height=\"15\" rx=\"1.5\"/>","origins":{"b1":[8,19.5],"b2":[16,19.5]},"effect":{"b1":{"k":[{"scale":1},{"scale":[1.1,0.78],"offset":0.35},{"scale":1}],"d":440,"e":"inOut","delay":0},"b2":{"k":[{"scale":1},{"scale":[1.1,0.78],"offset":0.35},{"scale":1}],"d":440,"e":"inOut","delay":140}}};
defineIcon(definition);
export default definition;
