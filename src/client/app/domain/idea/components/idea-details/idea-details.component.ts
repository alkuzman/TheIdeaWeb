/**
 * Created by PC on 10/10/2016.
 */
import {Idea} from "../../../model/ideas/idea";
import {IdeaService} from "../../idea.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {
  Component, OnInit, HostBinding,
  trigger, transition, animate,
  style, state, Input
} from '@angular/core';
import {Alignment} from "../../../../shared/widget/components/avatars/named-avatar/enum-alignment";

@Component({
  moduleId: module.id,
  selector: 'ideal-idea-details',
  templateUrl: 'idea-details.component.html',
  styleUrls: ['idea-details.component.css'],
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class IdeaDetailsComponent {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  private ownerAvatarAlignment: Alignment = Alignment.left;

  @Input() idea: Idea;
  errorMessage: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ideaService: IdeaService) {

  }
}
