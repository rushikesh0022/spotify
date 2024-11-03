export interface Option {
  id: string;
  text: string;
  description: string;
  iconName: string;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface UserResponse {
  questionId: string;
  selectedOptionId: string;
}