import { CorrectAnswer, CorrectMultiSelectOption, Question, QuestionOption, Quiz } from "@quibly/utils/types";

export type QuizWithQsn = Quiz & {
  questions: Question & {
    options: QuestionOption & {
      correctAnswer: CorrectAnswer;
      correctMultiSelectOptions: CorrectMultiSelectOption[];
    };
  };
};
