/**
 * Created by AKuzmanoski on 19/10/2016.
 */
import {Component, Input} from "@angular/core";
import {MakeProvider, AbstractValueAccessor} from "../../../abstract-value-accessor";
import {AnalyzerService} from "../../../../core/analyzers/analyzer.service";

@Component({
  moduleId: module.id,
  selector: 'ideal-text-editor',
  templateUrl: 'text-editor.component.html',
  styleUrls: ['text-editor.component.css'],
  providers: [MakeProvider(TextEditorComponent)]
})
export class TextEditorComponent extends AbstractValueAccessor<string> {
  @Input("title") title: string = "Body";
  private textPopularityCoefficient: number = 0.0;


  constructor(private analyzerService: AnalyzerService) {
    super("");
  }

  getTextPopularityCoefficient() {
    this.analyzerService.calculatePopularity(this.value).subscribe((result: number) => {
      this.textPopularityCoefficient = result * 100;
    });
  }

  getNumberOfCharacters(): number {
    return this.value.length
  }
}
