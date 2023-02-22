export interface Task {
  name: string;
  categoryId: number;
  id: number;
  teamMemberIds: string[];
  avatars?: string[];
  imageUrl?: string;
}
