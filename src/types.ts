export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  link: string;
  description?: string;
  year?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Step {
  id: string;
  number: string;
  title: string;
  description: string;
}
