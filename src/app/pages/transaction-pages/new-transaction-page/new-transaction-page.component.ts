import {Component, OnInit} from "@angular/core";
import {Idea} from "../../../domain/model/ideas/idea";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../domain/services/user/user.service";
import {ProtocolSession} from "../../../domain/model/security/protocol-session";
import {ProtocolTransactionStepNotice} from "../../../domain/model/security/notices/protocol-transaction-step-notice";
/**
 * Created by Viki on 2/19/2017.
 */


@Component({
  moduleId: module.id,
  selector: "ideal-new-transaction-page",
  templateUrl: "new-transaction-page.component.html"
})
export class NewTransactionPageComponent implements OnInit {
  protocolSession: ProtocolSession;


  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: {idea: Idea}) => {
      this.protocolSession = new ProtocolSession();
      this.protocolSession.digitalGoods = data.idea;
    });
  }
}
