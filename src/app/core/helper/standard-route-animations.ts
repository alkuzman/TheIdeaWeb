import {trigger, state, style, transition, animate} from "@angular/animations";
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
        transform: 'translateX(140%)',
        //opacity: 0
      }),
      animate('225ms ease-out', style({
        transform: 'translateX(0)',
        //opacity: 1
      }))
    ]),
    transition(':leave', [
      animate('195ms ease', style({
        transform: 'translateX(-140%)',
        //opacity: 0
      }))
    ])
  ])
}

export function enterLeftLeaveLeft(name: string) {
  return trigger(name, [
    state('*',
      style({
        transform: 'translateX(0)',
        opacity: 1
      })
    ),
    transition(':enter', [
      style({
        transform: 'translateX(-140%)',
        position: 'absolute'
        //opacity: 0
      }),
      animate('158ms ease-out', style({
        transform: 'translateX(0)',
        //opacity: 1
      }))
    ]),
    transition(':leave', [
      style({
        position: 'absolute'
      }),
      animate('150ms ease', style({
        transform: 'translateX(-140%)',
        //opacity: 0
      }))
    ])
  ])
}

export function enterRightLeaveRight(name: string) {
  return trigger(name, [
    state('*',
      style({
        transform: 'translateX(0)',
        opacity: 1
      })
    ),
    transition(':enter', [
      style({
        transform: 'translateX(140%)',
        position: 'absolute'
        //opacity: 0
      }),
      animate('158ms ease-out', style({
        transform: 'translateX(0)',
        //opacity: 1
      }))
    ]),
    transition(':leave', [
      style({
        position: 'absolute'
      }),
      animate('150ms ease', style({
        transform: 'translateX(140%)',
        //opacity: 0
      }))
    ])
  ])
}
