import { CorrectAnswer, CorrectMultiSelectOption, Question, QuestionOption, Quiz } from "@quibly/utils/types";

type QuestionWithOptions = Question & {
  options: Array<
    QuestionOption & {
      correctAnswer: CorrectAnswer[];
      correctMultiSelectOptions: CorrectMultiSelectOption[];
    }
  >;
  correctAnswer: CorrectAnswer;
};

export type QuizWithQsn = Quiz & {
  questions: QuestionWithOptions[];
};
