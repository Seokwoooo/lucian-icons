/* Lucian Icons clock v2.0.10 | MIT (c) 2026 Lucian | https://lucianlabs.dev/icons/ */
import { defineIcon } from './runtime.js';
export const definition = {"id":"clock","version":"2.0.10","order":199,"name":{"ko":"시계","en":"Clock"},"keywords":["시계","시간","기한","대기","clock","time","deadline","hour"],"category":"lifestyle","description":{"ko":"분침이 한 바퀴 돌고 시침이 따라 움찔합니다.","en":"The minute hand sweeps a full turn and the hour hand twitches along."},"color":"#3093EC","svg":"<circle class=\"s\" cx=\"12\" cy=\"12\" r=\"8.75\"/><path data-part=\"h\" d=\"M12 12V8\"/><path data-part=\"m\" class=\"a\" d=\"m12 12 3.5 2\"/>","origins":{"h":[12,12],"m":[12,12]},"effect":{"m":{"k":[{"rotate":0},{"rotate":360}],"d":900,"delay":0,"e":"inOut"},"h":{"k":[{"rotate":0},{"rotate":0,"offset":0.7},{"rotate":10,"offset":0.85},{"rotate":0}],"d":900,"e":"inOut","delay":0}}};
defineIcon(definition);
export default definition;
