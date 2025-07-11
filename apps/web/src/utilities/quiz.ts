import { UseFormReturn } from "@quibly/utils/hook-form";
import { QuestionType } from "@quibly/utils/types";
import { CreateQuestionFormData } from "@quibly/utils/validations";

type QuestionOption = CreateQuestionFormData["questions"][0]["options"][0];

// Default Points, Time, etc.
const DEFAULT_POINTS = 5;
const DEFAULT_TIME_LIMIT = 1;

// Factory: True/False options
export const TRUE_FALSE_OPTIONS: QuestionOption[] = [
  { index: 0, text: "True", isCorrect: true },
  { index: 1, text: "False", isCorrect: false },
];

// Factory: Short Answer option
export const createShortAnswerOption = (): QuestionOption => ({
  index: 0,
  text: "",
  isCorrect: true,
  correctAnswer: "",
});

// Factory: Multiple Choice (Single or Multi)
export const createMultipleChoiceOptions = (count = 4): QuestionOption[] =>
  Array.from({ length: count }).map((_, i) => ({
    index: i,
    text: "",
    isCorrect: false,
    correctAnswer: "",
  }));

export const handleAddNewQuestion = (type: QuestionType, form: UseFormReturn<CreateQuestionFormData>) => {
  const currentQuestions = form.watch("questions");

  const baseQuestion: CreateQuestionFormData["questions"][0] = {
    type,
    text: "",
    index: currentQuestions.length,
    points: DEFAULT_POINTS,
    timeLimit: DEFAULT_TIME_LIMIT,
    required: true,
    randomizeOrder: false,
    explanation: "",
    options: [],
  };

  switch (type) {
    case "true_false":
      baseQuestion.options = TRUE_FALSE_OPTIONS;
      break;

    case "short_answer":
      baseQuestion.options = [createShortAnswerOption()];
      break;

    case "multiple_choice_single":
    case "multiple_choice_multi":
      baseQuestion.options = createMultipleChoiceOptions();
      break;
  }

  form.setValue("questions", [...currentQuestions, baseQuestion]);
};
