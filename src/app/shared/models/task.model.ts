export interface Task {
  categoryId: string;
  name: string;
  id: number;
  teamMemberIds?: string[];
  imageUrl?: string;
}