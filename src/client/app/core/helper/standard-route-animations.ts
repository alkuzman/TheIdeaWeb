import {trigger, state, style, transition, animate} from "@angular/core";
import {addQueryToTokenMap} from "@angular/compiler/src/view_compiler/compile_query";
/**
 * Created by AKuzmanoski on 06/12/2016.
 */



export function routerAnimations(name: string) {
  return trigger(name, [
    state('*',
      style({
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        transform: 'translateX(-150%)'
      }),
      animate('150ms 75ms ease-out')
    ]),
    transition(':leave', [
      animate('130ms ease-in', style({
        transform: 'translateX(150%)',
      }))
    ])
  ])
}
