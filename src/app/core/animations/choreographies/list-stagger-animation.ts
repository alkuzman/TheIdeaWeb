import {query, stagger, style, transition, trigger, useAnimation} from "@angular/animations";
import {fadeSlideFromBottom} from "../fade-slide-animations";
import {fadeOut} from "../fade-animations";
/**
 * Created by AKuzmanoski on 16/06/2017.
 */
export function listStaggerAnimation(name: string = "listStaggerAnimation") {
  return trigger(name, [
    transition(":enter", [
      query(".listItem", style({opacity: 0}), {optional: true}),
      query(".listItem", stagger('80ms', [
        useAnimation(fadeSlideFromBottom, {
          params: {
            duration: '{{duration}}',
            delay: '{{delay}}',
            easing: '{{easing}}',
            translate: '{{translate}}'
          }
        })
      ]), {optional: true})
    ], {
      params: {
        staggerDelay: "80ms", duration: "200ms", delay: "0ms", easing: "ease-out", translate: "20px"
      }
    }),
    transition("* => *", [
      query(":enter", style({opacity: 0}), {optional: true}),
      query(":enter", stagger('80ms', [
        useAnimation(fadeSlideFromBottom, {
          params: {
            duration: '{{duration}}',
            delay: '{{delay}}',
            easing: '{{easing}}',
            translate: '{{translate}}'
          }
        })
      ]))
    ], {
      params: {
        staggerDelay: "80ms", duration: "200ms", delay: "0ms", easing: "ease-out", translate: "20px"
      }
    }),
    transition(":leave", [
      useAnimation(fadeOut, {params: {duration: "{{leaveDuration}}", delay: "{{leaveDelay}}", easing: 'leaveEasing'}})
    ], {params: {leaveDuration: "150ms", leaveDelay: "0ms", leaveEasing: "ease-in"}})
  ])
}
