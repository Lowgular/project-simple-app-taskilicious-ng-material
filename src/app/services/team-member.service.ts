import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from 'src/app/services/base-api/base-api.service';
import { Constants } from 'src/app/shared/constants';
import { TaskMemberModel } from 'src/app/shared/models/team-member.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class TeamMemberService extends BaseApiService<TaskMemberModel> {

    constructor(protected override httpClient: HttpClient) {
        super(httpClient);
    }

    getTaskMembers(): Observable<TaskMemberModel[]> {
        return this.getAll(environment.apiEndpoint + Constants.CATEGORY_TEAM_MEMBER_ENDPOINT)
    }

}