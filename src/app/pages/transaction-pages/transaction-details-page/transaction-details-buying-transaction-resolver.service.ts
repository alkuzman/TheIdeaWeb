import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {BuyingTransaction} from "../../../domain/model/security/buying-transaction";
import {Observable} from "rxjs";
import {BuyingTransactionService} from "../../../domain/services/transaction/buying-transaction.service";
import {ErrorHandlingService} from "../../../core/error-handling/error-handling.service";
/**
 * Created by Viki on 3/3/2017.
 */



@Injectable()
export class TransactionDetailsBuyingTransactionResolverService implements Resolve<BuyingTransaction> {

  constructor(private buyingTransactionService: BuyingTransactionService,
              private errorHandlingService: ErrorHandlingService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BuyingTransaction>|
    Promise<BuyingTransaction>|BuyingTransaction {
    let transactionId: number = +route.params["id"];
    return this.buyingTransactionService.getBuyingTransaction(transactionId).toPromise()
        .catch((error: any) => this.errorHandlingService.handleError(error));
  }

}
