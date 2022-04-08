export interface Course {
  id: number;
  title: string;
  price: number;
  image?: string;
  description?: string;
  prerequisite: string;
  duration: string;
  type: string;
}
