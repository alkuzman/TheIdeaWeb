/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component, Input, OnInit} from "@angular/core";
import {MakeProvider, AbstractValueAccessor} from "../../../abstract-value-accessor";
import {AnalyzerService} from "../../../../core/analyzers/analyzer.service";

@Component({
  moduleId: module.id,
  selector: 'ideal-text-editor',
  templateUrl: 'text-editor.component.html',
  styleUrls: ['text-editor.component.scss'],
  providers: [MakeProvider(TextEditorComponent)]
})
export class TextEditorComponent extends AbstractValueAccessor<string> implements OnInit {
  @Input("title") title: string = "Body";
  private textPopularityCoefficient: number = 0.0;
  private docs: any;


  constructor(private analyzerService: AnalyzerService) {
    super("");
  }

  processText(): void {
    this.getTextPopularityCoefficient();
    this.getWikipediaDocuments();
  }

  getTextPopularityCoefficient() {
    this.analyzerService.calculatePopularity(this.value).subscribe((result: number) => {
      this.textPopularityCoefficient = result * 100;
    });
  }

  ngOnInit(): void {

  }

  getNumberOfCharacters(): number {
    return this.value.length
  }

  getWikipediaDocuments() {
    this.analyzerService.getSymilarDocuments(this.value, {limit: "5"}).subscribe((docs: any) => {
      this.docs = docs;
    });
  }

  getWikiName(value: string) {
    return value.replace(" ", "_");
  }

}
