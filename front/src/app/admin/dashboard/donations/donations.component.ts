import { Component, OnInit } from '@angular/core';

import {DonationService} from "../../../service/DonationService";
import {Donation} from "../../../model/Donation";

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit {

  projectsDonations: Donation[] = [];
  casesDonations: Donation[] = [];

  data : Donation[] = [];
  constructor(private donationService: DonationService) {
  }

  ngOnInit() {
    debugger
    this.donationService.getDonationList().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
  }

  handleSuccessfulResponse(response: Donation[]) {
    this.data = response;
    this.data.forEach(d=>{
      if(d.projectId){
        this.projectsDonations.push(d);
      }
      else if(d.caseId){
        this.casesDonations.push(d);
      }
    });
  }


}
