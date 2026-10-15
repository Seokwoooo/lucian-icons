/* Lucian Icons laptop v2.0.0 | MIT (c) 2026 Lucian | https://lucianlabs.dev/icons/ */
import { defineIcon } from './runtime.js';
export const definition = {"id":"laptop","version":"2.0.0","order":115,"name":{"ko":"노트북","en":"Laptop"},"keywords":["노트북","랩톱","컴퓨터","화면","laptop","computer","notebook","screen"],"category":"devices","description":{"ko":"화면이 경첩 쪽으로 접혔다가 다시 펼쳐집니다.","en":"The lid folds toward the hinge and opens again."},"color":"#3093EC","svg":"<g data-part=\"lid\"><rect class=\"s\" x=\"4.5\" y=\"4.5\" width=\"15\" height=\"10.5\" rx=\"1.5\"/><path class=\"a\" d=\"M8.5 9.75h7\"/></g><path d=\"M2 18h20l-1 1.6a1 1 0 0 1-.85.4H3.85a1 1 0 0 1-.85-.4z\"/>","origins":{"lid":[12,15.5]},"effect":{"lid":{"k":[{"scale":1},{"scale":[1,0.12],"offset":0.42},{"scale":[1,1.05],"offset":0.78},{"scale":1}],"d":760,"e":"inOut","delay":0}}};
defineIcon(definition);
export default definition;
