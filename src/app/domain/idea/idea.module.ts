/**
 * Created by PC on 10/10/2016.
 */
import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {NewIdeaComponent} from './components/idea-forms/idea-form-new/idea-form-new.component';
import {IdeaDetailsComponent} from './components/idea-details/idea-details.component';
import {IdeasComponent} from './components/idea-list/idea-list.component';
import {IdeaFormComponent} from './components/idea-forms/idea-form/idea-form.component';
import {IdeaFieldsComponent} from './components/idea-forms/idea-fields/idea-fields.component';
import {ProblemModule} from '../problem/problem.module';
import {IdeaCardComponent} from './components/idea-card/idea-card.component';
import {IdeaDetailsLoaderComponent} from './components/idea-details/idea-details-loader/idea-details-loader.component';
import {UserModule} from '../user/user.module';
import {IdeaListLoaderComponenet} from './components/idea-list/idea-list-loader/idea-list-loader.component';
import {KeywordModule} from '../keyword/keyword.module';
import {AwardModule} from '../award/award.module';

@NgModule({
  imports: [SharedModule, ProblemModule, UserModule, KeywordModule, AwardModule],
  declarations: [NewIdeaComponent, IdeaDetailsComponent, IdeasComponent,
    IdeaFormComponent, IdeaFieldsComponent, IdeaCardComponent, IdeaDetailsLoaderComponent, IdeaListLoaderComponenet],
  exports: [NewIdeaComponent, IdeaDetailsComponent, IdeasComponent,
    IdeaFormComponent, IdeaFieldsComponent, IdeaCardComponent, IdeaDetailsLoaderComponent, IdeaListLoaderComponenet],
})
export class IdeaModule {

}
