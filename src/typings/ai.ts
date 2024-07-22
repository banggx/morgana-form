interface AIQuestionItem {
  title: string;
  desc?: string;
  type: string;
  options: string[];
}
export interface AIQuestion {
  title: string;
  description: string;
  questions: AIQuestionItem[];
}