
export interface Task {
  id: number;
  title: string;
  description: string;
  // 'pendiente' | 'completada'
  status: string;
}
