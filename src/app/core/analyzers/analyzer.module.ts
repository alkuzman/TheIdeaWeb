import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AnalyzerSdkModule} from '@klupps/analyzer-sdk';
import {Analyzer} from './analyzer';
import {KluppsAnalyzerService} from './klupps/klupps-analyzer.service';
import {KluppsAnalysisRequestFactory} from './klupps/factories/klupps-analysis-request-factory';
import {KluppsAnalysisRequestFactoryImplService} from './klupps/factories/klupps-analysis-request-factory-impl.service';
import {KluppsAnalysisResponseFactory} from './klupps/factories/klupps-analysis-response-factory';
import {KluppsAnalysisResponseFactoryImplService} from './klupps/factories/klupps-analysis-response-factory-impl.service';

@NgModule({
  imports: [
    CommonModule,
    AnalyzerSdkModule.forRoot({analyzerApiConfig: {url_prefix: 'ideal-analyzer'}})
  ],
  declarations: [],
  providers: [
    {
      provide: KluppsAnalysisRequestFactory,
      useClass: KluppsAnalysisRequestFactoryImplService
    },
    {
      provide: KluppsAnalysisResponseFactory,
      useClass: KluppsAnalysisResponseFactoryImplService
    },
    {
      provide: Analyzer,
      useClass: KluppsAnalyzerService
    }
  ]
})
export class AnalyzerModule { }
