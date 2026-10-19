/* Lucian Icons utensils v2.0.8 | MIT (c) 2026 Lucian | https://lucianlabs.dev/icons/ */
import { defineIcon } from './runtime.js';
export const definition = {"id":"utensils","version":"2.0.8","order":203,"name":{"ko":"식사","en":"Dining"},"keywords":["식사","식당","맛집","음식","포크","나이프","dining","restaurant","food","fork","knife"],"category":"lifestyle","description":{"ko":"포크와 나이프가 서로를 향해 기울어 건배하듯 부딪혔다가 돌아옵니다.","en":"The fork and knife lean in and clink together, then straighten."},"color":"#F0764F","svg":"<path data-part=\"fork\" d=\"M4.5 3v4.75a3 3 0 0 0 6 0V3M7.5 3v18\"/><g data-part=\"knife\"><path class=\"s\" d=\"M19 14.5V3c-2.5.75-4 3.5-4 7.25v4.25z\"/><path d=\"M19 14.5V21\"/></g>","origins":{"fork":[7.5,21],"knife":[19,21]},"effect":{"fork":{"k":[{"rotate":0},{"rotate":9},{"rotate":-2},{"rotate":0}],"d":640,"e":"inOut","delay":0},"knife":{"k":[{"rotate":0},{"rotate":-9},{"rotate":2},{"rotate":0}],"d":640,"e":"inOut","delay":0}}};
defineIcon(definition);
export default definition;
