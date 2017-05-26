/**
 * Created by Viki on 1/25/2017.
 */
import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {NewPackageNotice} from "../../../../model/sharing/new-package-notice";
import {FormGroup, FormBuilder} from "@angular/forms";
import {MdSnackBar, MdSnackBarConfig} from "@angular/material";
import {Package} from "../../../../model/sharing/package";
import {Notice} from "../../../../model/sharing/notice";
@Component({
  moduleId: module.id,
  selector: "ideal-notice-form",
  templateUrl: "notice-form.component.html"
})
export class NoticeFormComponent implements OnInit {
  @Input("notice") notice: NewPackageNotice;
  @Input("canClear") canClear: boolean = false;
  @Input("submitLabel") submitLabel: string;
  @Output("noticeReady") noticeReady: EventEmitter<Notice> = new EventEmitter<Notice>();
  form: FormGroup;
  fields: FormGroup;
  submitted: boolean = false;
  active: boolean = true;

  constructor(private fb: FormBuilder, private snackBar: MdSnackBar) {

  }

  ngOnInit(): void {
    this.fields = this.fb.group({});
    this.form = this.fb.group({
      fields: this.fields
    });
  }

  save() {
    this.submitted = true;
    if (this.form.valid) {
      this.noticeReady.emit(this.notice);
    } else {
      this.snackBar.open("Cannot create idea. Validation errors", undefined, <MdSnackBarConfig>{duration: 3000});
    }
  }

  clearForm() {
    this.notice = new NewPackageNotice();
    this.notice.pckg = new Package();
    this.active = false;
    setTimeout(() => this.active = true, 0);
  }
}
