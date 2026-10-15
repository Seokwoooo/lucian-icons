/* Lucian Icons aperture v2.0.0 | MIT (c) 2026 Lucian | https://lucianlabs.dev/icons/ */
import { defineIcon } from './runtime.js';
export const definition = {"id":"aperture","version":"2.0.0","order":110,"name":{"ko":"조리개","en":"Aperture"},"keywords":["조리개","렌즈","사진","셔터","aperture","lens","photo","shutter"],"category":"media","description":{"ko":"조리개 날이 회전하며 조였다가 다시 열립니다.","en":"The blades rotate closed and open again."},"color":"#F4AF2D","svg":"<circle class=\"s\" cx=\"12\" cy=\"12\" r=\"8.75\"/><path data-part=\"blades\" class=\"a\" d=\"M12 7.8 20.71 12.83M15.64 9.9v10.06M15.64 14.1 6.93 19.13M12 16.2 3.29 11.17M8.36 14.1V4.04M8.36 9.9l8.71-5.03\"/>","origins":{"blades":[12,12]},"effect":{"blades":{"k":[{"rotate":0,"scale":1},{"rotate":30,"scale":0.9,"offset":0.45},{"rotate":60,"scale":1}],"d":720,"e":"inOut","delay":0}}};
defineIcon(definition);
export default definition;
