import { CorrectAnswer, CorrectMultiSelectOption, Question, QuestionOption, Quiz } from "@quibly/utils/types";

type QuestionWithOptions = Question & {
  options: Array<
    QuestionOption & {
      correctAnswer: CorrectAnswer[];
      correctMultiSelectOptions: CorrectMultiSelectOption[];
    }
  >;
};

export type QuizWithQsn = Quiz & {
  questions: QuestionWithOptions[];
};
