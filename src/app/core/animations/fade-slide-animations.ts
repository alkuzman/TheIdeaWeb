import {animate, animateChild, animation, group, query, style} from "@angular/animations";
/**
 * Created by AKuzmanoski on 01/06/2017.
 */
// Slide animation FROM BOTTOM
export const fadeSlideFromBottom = animation([
  style({
    transform: 'translateY({{translate}})',
    opacity: 0
  }),
  group([
    animate('{{duration}} {{delay}} {{easing}}', style({
      transform: 'translateY(0)',
    })),
    animate('{{opacityDuration}} {{delay}} {{easing}}', style({
      opacity: 1
    })),
  ])
], {params: {duration: "200ms", opacityDuration: "40ms", delay: "0ms", easing: "ease-out", translate: "10px"}});
