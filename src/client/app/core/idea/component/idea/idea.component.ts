/**
 * Created by PC on 10/10/2016.
 */
import {Idea} from "../../../model/ideas/idea";
import {IdeaService} from "../../idea.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import { Component, OnInit, HostBinding,
  trigger, transition, animate,
  style, state } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ideal-idea',
  templateUrl: 'idea.component.html',
  styleUrls: ['idea.component.css'],
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
export class IdeaComponent implements OnInit {
  @HostBinding('@routeAnimation') get routeAnimation() {
    return true;
  }

  @HostBinding('style.display') get display() {
    return 'block';
  }

  @HostBinding('style.position') get position() {
    return 'absolute';
  }

  idea: Idea;
  errorMessage: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ideaService: IdeaService) {

  }

  ngOnInit(): void {
    this.idea = new Idea();
    this.route.params.subscribe((params: Params) => {
      let id = + params['id']; // (+) converts string 'id' to a number
      this.ideaService.getIdea(id).subscribe(
        idea => this.idea = idea,
        error => this.errorMessage = <any>error);
    });
  }
}
