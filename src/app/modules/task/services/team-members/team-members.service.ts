import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TeamMember } from "../../models/team-member";

@Injectable({
  providedIn: "root",
})
export class TeamMembersService {
  constructor(public http: HttpClient) {}

  getAllTeamMembers(): Promise<TeamMember[]> {
    const URL: string = "team-members";

    return new Promise((resolve, reject) => {
      const response = this.http.get<TeamMember[]>(URL);
      response.subscribe((data) => {
        resolve(data);
      });
    });
  }
}
