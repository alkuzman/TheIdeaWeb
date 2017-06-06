import {animate, animation, style} from "@angular/animations";
/**
 * Created by AKuzmanoski on 02/06/2017.
 */

export const fadeIn = animation([
  style({
    opacity: 0
  }),
  animate('{{duration}} {{delay}} {{easing}}', style({
    opacity: 1
  }))
], {params: {duration: "158ms", delay: "0ms", easing: "ease-out"}});

export const fadeOut = animation([
  animate('{{duration}} {{delay}} {{easing}}', style({
    opacity: 0
  }))
], {params: {duration: "150ms", delay: "0ms", easing: "ease-in"}});
