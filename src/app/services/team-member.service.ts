import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Constants } from '../shared/constants';
import { TeamMember } from '../shared/models/team-member';

@Injectable({
  providedIn: 'root',
})
export class TeamMemberService extends ApiService<TeamMember> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient);
  }

  getTeamMembers(): Observable<TeamMember[]> {
    return this.get(
      `${environment.apiEndpoint}${Constants.TEAM_MEMBER_ENDPOINT}`
    );
  }
}
