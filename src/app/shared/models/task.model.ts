import { TaskMemberModel } from "src/app/shared/models/team-member.model";

export interface TaskModel {
    name: string;
    id: string;
    categoryId: string
    teamMemberIds?: string[]
    imageUrl?: string
    teamMember?: TaskMemberModel[]
}