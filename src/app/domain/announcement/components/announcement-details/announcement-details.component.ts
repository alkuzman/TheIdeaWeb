/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Component, Input} from '@angular/core';
import {Announcement} from '../../../model/sharing/announcement';

@Component({
  moduleId: module.id,
  selector: 'ideal-announcement-details',
  templateUrl: 'announcement-details.component.html'
})
export class AnnouncementDetailsComponent {
  @Input('announcement') announcement: Announcement;
}
