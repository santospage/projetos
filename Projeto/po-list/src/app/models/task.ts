export interface Task {
  id: string;
  description: string;
  generationdate: Date;
  category: string;
  responsable: string;
  deadline: Date;
  closedate: Date;
  status: string;
}
