import {Component, OnInit} from '@angular/core';
import {Contract} from "../../../../model/payment/contract";
import {ContractService} from "../../../../services/contract/contract.service";
import {Observable} from "rxjs/Observable";
import {FormControl} from "@angular/forms";
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'ideal-contract-negotiation-dialog',
  templateUrl: './contract-negotiation-dialog.component.html',
  styleUrls: ['./contract-negotiation-dialog.component.css']
})
export class ContractNegotiationDialogComponent implements OnInit {

  filteredContracts: Observable<Contract[]>;
  contract: Contract;
  lastContract: Contract;
  toggleText = "Show last contract";
  showLastContract = false;
  contractControl: FormControl;
  private contracts: Contract[];

  constructor(private dialogRef: MatDialogRef<ContractNegotiationDialogComponent>,
              private contractService: ContractService) {
  }

  ngOnInit() {
    this.contract = new Contract();
    this.contractControl = new FormControl;

    this.contractService.getContracts().subscribe((contracts: Contract[]) => {
      this.contracts = contracts;

      this.filteredContracts = this.contractControl.valueChanges
        .startWith(null)
        .map(contract => contract ? this.filterContracts(contract) : this.contracts.slice());
    });
  }

  closeDialog() {
    this.dialogRef.close(this.contract);
  }

  acceptContract() {
    this.contract = this.lastContract;
    this.dialogRef.close(this.contract);
  }

  createContract(contract: Contract) {
    this.contract.title = contract.title;
    this.contract.text = contract.text;
  }

  toggleValueChanged() {
    this.showLastContract = !this.showLastContract;
  }

  private filterContracts(title: string): Contract[] {
    return this.contracts.filter(contract =>
      contract.title.toLowerCase().indexOf(title.toLowerCase()) === 0);
  }

}
