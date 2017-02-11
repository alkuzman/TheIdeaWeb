import {trigger, state, style, transition, animate} from "@angular/core";
/**
 * Created by AKuzmanoski on 06/12/2016.
 */

export function routerAnimations(name: string) {
  return trigger(name, [
    state('*',
      style({
        transform: 'translateX(0)',
        opacity: 1
      })
    ),
    transition(':enter', [
      style({
        transform: 'translateX(-125%)',
        opacity: 0
      }),
      animate('150ms 75ms ease-out', style({
        transform: 'translateX(0)',
        opacity: 1
      }))
    ]),
    transition(':leave', [
      animate('75ms ease-in', style({
        transform: 'translateX(125%)',
        opacity: 0
      }))
    ])
  ])
}
