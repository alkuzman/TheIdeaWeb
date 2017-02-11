/**
 * Created by PC on 10/10/2016.
 */
import {Idea} from "../../../model/ideas/idea";
import {Component, OnInit, HostBinding, trigger, transition, animate, style, state, Input} from "@angular/core";
import {Alignment} from "../../../../shared/widget/components/avatars/named-avatar/enum-alignment";
import {AnalyzerService} from "../../../../core/analyzers/analyzer.service";

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

  @HostBinding('style.display') get display() {
    return 'block';
  }

  private ownerAvatarAlignment: Alignment = Alignment.left;

  @Input() idea: Idea;
  errorMessage: any;
  private docs: any;

  constructor(private analyzerService: AnalyzerService) {

  }

  ngOnInit(): void {
    this.getWikipediaDocuments();
  }

  getWikipediaDocuments() {
    this.analyzerService.getSymilarDocuments(this.idea.title, {limit: "5"}).subscribe((docs: any) => {
      this.docs = docs;
    });
  }

  getWikiName(value: string) {
    return value.replace(" ", "_");
  }
}
