import {animate, animation, style} from "@angular/animations";
/**
 * Created by AKuzmanoski on 01/06/2017.
 */

export const scaleIn = animation([
  style({
    transform: "scale(0)"
  }),
  animate('{{duration}} {{delay}} {{easing}}', style({
    transform: "scale(1)"
  }))
], {params: {duration: "158ms", delay: "150ms", easing: "ease-out"}});

export const scaleOut = animation([
  style({
    transform: "scale(1)"
  }),
  animate('{{duration}} {{delay}} {{easing}}', style({
    transform: "scale(0)"
  }))
], {params: {duration: "150ms", delay: "0ms", easing: "ease-in"}});
