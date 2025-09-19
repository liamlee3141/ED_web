export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budgetRange?: string;
  message: string;
}

export interface ProjectData {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  location?: string;
  year?: string;
}

export interface ServiceData {
  id: number;
  title: string;
  description: string;
  icon: string;
  features: string[];
}