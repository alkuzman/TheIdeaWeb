/**
 * Created by PC on 10/10/2016.
 */
import {Idea} from '../../../model/ideas';
import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Actions} from '../../../../core/helper/actions/actions';
import {IdeaActionsService} from '../../../services/idea/idea-actions.service';

@Component({
  moduleId: module.id,
  selector: 'ideal-idea-details',
  templateUrl: 'idea-details.component.html',
  styleUrls: ['idea-details.component.scss'],
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
export class IdeaDetailsComponent implements OnInit {
  @Input() idea: Idea;
  actions: Actions;

  constructor(private ideaActionsService: IdeaActionsService) {

  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  ngOnInit(): void {
    this.actions = this.ideaActionsService.getActions(this.idea);
  }
}
