import {Component, OnInit} from '@angular/core';
import {Project} from "../../model/Project";
import {Donation} from "../../model/Donation";
import {ProjectService} from "../../service/ProjectService";
import {HttpClientService} from "../../service/http-client.service";
import {DonationService} from "../../service/DonationService";
import {User} from "../../model/User";
import {Case} from "../../model/Case";
import {CaseService} from "../../service/CaseService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  projects: Project[] = [];
  projsnum:number = 0;

  cases: Case[] = [];
  casesnum:number = 0;

  donations: Donation[] = [];
  donationsnum:number = 0;

  users: User[] = [];
  usersnum:number = 0;

  doneProjects: any = 0;
  doneCases: any = 0;



  constructor(private projectService: ProjectService,
              private httpClientService: HttpClientService,
              private caseService: CaseService,
              private donationService: DonationService) {
  }

  ngOnInit() {
    this.donationService.getDonationList().subscribe(
      response => {
        this.donations = response;
        if (this.donations) {
          this.donationsnum = this.donations.length;
        }
        else {
          this.donationsnum = 0;
        }
      }
    );
    this.caseService.getCasesList().subscribe(
      response => {
        this.cases = response;
        if (this.cases) {
          this.casesnum = this.cases.length;
        }
        else {
          this.casesnum = 0;
        }
      }
    );
    this.projectService.getProjectsList().subscribe(
      response => {
        this.projects = response;
        if (this.projects) {
          this.projsnum = this.projects.length;
        }
        else {
          this.projsnum = 0;
        }
      }
    );

    this.httpClientService.getUsers().subscribe(
      response => {
        this.users = response;
        if (this.users) {
          this.users.forEach(user=>(user.type != 'admin')? this.usersnum++ : this.usersnum);
        }
        else {
          this.usersnum = 0;
        }
      }
    );

    this.finished();
  }

  finished(){
    this.projects.forEach(project => project.isDone? this.doneProjects++ : this.doneProjects);
    this.cases.forEach(c => c.isDone? this.doneCases++ : this.doneCases);
  }
}
