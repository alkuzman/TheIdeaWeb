import {animate, animation, style} from "@angular/animations";
/**
 * Created by AKuzmanoski on 01/06/2017.
 */

// Slide animation FROM LEFT
export const slideFromLeft = animation([
  style({
    transform: 'translateX(-{{translate}})',
    position: 'absolute'
  }),
  animate('{{duration}} {{delay}} {{easing}}', style({
    transform: 'translateX(0)',
  }))
], {params: {duration: "158ms", delay: "150ms", easing: "ease-out", translate: "140%"}});


// Slide animation FROM RIGHT
export const slideFromRight = animation([
  style({
    transform: 'translateX({{translate}})',
    position: 'absolute'
  }),
  animate('{{duration}} {{delay}} {{easing}}', style({
    transform: 'translateX(0)',
  }))
], {params: {duration: "158ms", delay: "150ms", easing: "ease-out", translate: "140%"}});


// Slide animation FROM TOP
export const slideFromTop = animation([
  style({
    transform: 'translateY(-{{translate}})',
    position: 'absolute'
  }),
  animate('{{duration}} {{delay}} {{easing}}', style({
    transform: 'translateY(0)',
  }))
], {params: {duration: "158ms", delay: "150ms", easing: "ease-out", translate: "140%"}});


// Slide animation FROM BOTTOM
export const slideFromBottom = animation([
  style({
    transform: 'translateY(-{{translate}})',
    position: 'absolute'
  }),
  animate('{{duration}} {{delay}} {{easing}}', style({
    transform: 'translateY(0)',
  }))
], {params: {duration: "158ms", delay: "150ms", easing: "ease-out", translate: "140%"}});


// Slide animation TO LEFT
export const slideToLeft = animation([
  style({
    position: 'absolute'
  }),
  animate('{{duration}} {{delay}} {{easing}}', style({
    transform: 'translateX(-{{translate}})',
  }))
], {params: {duration: "150ms", delay: "0ms", easing: "ease-in", translate: "140%"}});


// Slide animation TO RIGHT
export const slideToRight = animation([
  style({
    position: 'absolute'
  }),
  animate('{{duration}} {{delay}} {{easing}}', style({
    transform: 'translateX({{translate}})',
  }))
], {params: {duration: "150ms", delay: "0ms", easing: "ease-in", translate: "140%"}});


// Slide animation TO TOP
export const slideToTop = animation([
  style({
    position: 'absolute'
  }),
  animate('{{duration}} {{delay}} {{easing}}', style({
    transform: 'translateY(-{{translate}})',
  }))
], {params: {duration: "150ms", delay: "0ms", easing: "ease-in", translate: "140%"}});

// Slide animation TO BOTTOM
export const slideToBottom = animation([
  style({
    position: 'absolute'
  }),
  animate('{{duration}} {{delay}} {{easing}}', style({
    transform: 'translateX({{translate}})',
  }))
], {params: {duration: "150ms", delay: "0ms", easing: "ease-in", translate: "140%"}});
