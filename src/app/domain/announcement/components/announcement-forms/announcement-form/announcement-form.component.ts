/**
 * Created by AKuzmanoski on 04/01/2017.
 */
import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Announcement} from "../../../../model/sharing/announcement";
import {FormGroup, FormBuilder} from "@angular/forms";
import {MdSnackBar} from "@angular/material";
@Component({
  moduleId: module.id,
  selector: "ideal-announcement-form",
  templateUrl: "announcement-form.component.html"
})
export class AnnouncementFormComponent implements OnInit {
  @Input("announcement") announcement: Announcement;
  @Output("announcementReady") announcementReady: EventEmitter<Announcement> = new EventEmitter<Announcement>();
  form: FormGroup;
  fields: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private snackBar: MdSnackBar) {

  }

  ngOnInit(): void {
    this.fields = this.fb.group({});
    this.form = this.fb.group({
      fields: this.fields
    });
  }

  save(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.announcementReady.emit(this.announcement);
    } else {
      this.snackBar.open("Cannot create announcement. Validation errors", undefined, {duration: 3000});
    }
  }
}
