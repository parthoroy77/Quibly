import { UseFormReturn } from "@quibly/utils/hook-form";
import { QuestionType, QuizWithQsn } from "@quibly/utils/types";
import { CreateQuestionFormData } from "@quibly/utils/validations";

type QuestionOption = CreateQuestionFormData["questions"][0]["options"][0];

// Default Points, Time, etc.
const DEFAULT_POINTS = 5;
const DEFAULT_TIME_LIMIT = 1;

// Factory: True/False options
export const TRUE_FALSE_OPTIONS: QuestionOption[] = [
  {
    index: 0,
    text: "True",
    isCorrect: true,
    mode: "create",
  },
  {
    index: 1,
    text: "False",
    isCorrect: false,
    mode: "create",
  },
];

// Factory: Short Answer option
export const createShortAnswerOption = (): QuestionOption => ({
  index: 0,
  text: "Demo Text",
  isCorrect: true,
  correctAnswer: "",
  mode: "create",
});

// Factory: Multiple Choice (Single or Multi)
export const createMultipleChoiceOptions = (count = 4): QuestionOption[] =>
  Array.from({ length: count }).map((_, i) => ({
    index: i,
    text: "",
    isCorrect: i === 0,
    correctAnswer: "",
    mode: "create",
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
    mode: "create",
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

export const processQuizDataToFormValues = (quiz: QuizWithQsn): CreateQuestionFormData["questions"] => {
  return quiz.questions.map((q) => ({
    text: q.text,
    required: q.required,
    randomizeOrder: q.randomizeOrder,
    type: q.type as any as QuestionType,
    points: q.points,
    index: q.index,
    timeLimit: q.timeLimit,
    explanation: q.explanation ?? "",
    mode: "update",
    questionId: q.id,
    options: q.options.map((o) => ({
      optionId: o.id,
      index: o.index,
      text: o.text ?? "",
      isCorrect:
        q.type === "multiple_choice_single"
          ? o.correctAnswer.some((el) => el.optionId === o.id)
          : q.type === "multiple_choice_multi"
            ? o.correctMultiSelectOptions.some((el) => el.optionId === o.id)
            : q.type === "true_false"
              ? o.correctAnswer.some((el) => el.optionId === o.id)
              : false,
      correctAnswer: q.type === "short_answer" ? (o.correctAnswer[0]!.textAnswer as string | undefined) : undefined,
      mode: "update",
    })),
  }));
};
