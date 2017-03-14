import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ErrorHandlingService} from "../../../core/error-handling/error-handling.service";
import {Notice} from "../../../domain/model/sharing/notice";
import {ProtocolTransactionStepNotice} from "../../../domain/model/security/notices/protocol-transaction-step-notice";
import {NoticeService} from "../../../domain/services/notice/notice.service";
/**
 * Created by Viki on 3/3/2017.
 */



@Injectable()
export class TransactionDetailsProtocolTransactionStepNoticeResolverService implements Resolve<ProtocolTransactionStepNotice<any>> {

  constructor(private noticeService: NoticeService,
              private errorHandlingService: ErrorHandlingService) {}


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProtocolTransactionStepNotice<any>>|Promise<ProtocolTransactionStepNotice<any>>|ProtocolTransactionStepNotice<any> {
        let noticeId: number = +route.params["id"];
        return this.noticeService.getNotice(noticeId).toPromise()
            .catch((error: any) => this.errorHandlingService.handleError(error));
    }
}
