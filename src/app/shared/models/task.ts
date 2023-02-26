export interface Task {
  name: string;
  id?: number;
  categoryId: number;
  teamMemberIds?: string[];
  imageUrl?: string;
}
