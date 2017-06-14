import {trigger, state, style, transition, animate, useAnimation} from "@angular/animations";
import {slideFromLeft, slideFromRight, slideToLeft, slideToRight} from "./slide-animations";
/**
 * Created by AKuzmanoski on 06/12/2016.
 */


export function pageAnimation(name: string, durationEnter: number | string = 158, durationLeave: number | string = 150) {
  return trigger(name, [
    transition(':enter', [
      style({
        position: 'absolute'
      }),
      animate(durationEnter, style({ }))
    ]),
    transition(':leave', [
      style({
        position: 'absolute'
      }),
      animate(durationLeave, style({ }))
    ])
  ])
}

export function enterLeftLeaveLeft(name: string) {
  return trigger(name, [
    transition(':enter', [
      useAnimation(slideFromLeft)
    ]),
    transition(':leave', [
      useAnimation(slideToLeft)
    ])
  ])
}

export function enterRightLeaveRight(name: string) {
  return trigger(name, [
    transition(':enter', [
      useAnimation(slideFromRight)
    ]),
    transition(':leave', [
      useAnimation(slideToRight)
    ])
  ])
}
