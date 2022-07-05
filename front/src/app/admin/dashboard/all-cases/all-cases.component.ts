import { Component, OnInit } from '@angular/core';
import {Donation} from "../../../model/Donation";
import {HttpClientService} from "../../../service/http-client.service";
import {DonationService} from "../../../service/DonationService";
import {Case} from "../../../model/Case";
import {CaseService} from "../../../service/CaseService";

@Component({
  selector: 'app-all-cases',
  templateUrl: './all-cases.component.html',
  styleUrls: ['./all-cases.component.css']
})
export class AllCasesComponent implements OnInit {

  cases: Case[] = [];

  constructor(private caseService: CaseService) {
  }

  ngOnInit() {
    debugger
    this.caseService.getCasesList().subscribe(
      response =>  this.cases = response
    );
  }
}
