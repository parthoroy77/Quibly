"use client";
import { useForm, zodResolver } from "@quibly/utils/hook-form";
import { QuizWithQsn } from "@quibly/utils/types";
import { CreateQuestionFormData, CreateQuestionSchema } from "@quibly/utils/validations";
import Header from "./header";
import QuestionBuilderForm from "./question-builder-form";
import QuestionListSidebar from "./question-list-sidebar";

const ManageQuizView = ({ quiz }: { quiz: QuizWithQsn }) => {
  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(CreateQuestionSchema),
    defaultValues: {
      quizId: quiz.id,
      questions: [],
    },
  });

  console.log(form.watch());
  return (
    <div className="divide-y h-full">
      <Header title={quiz.title} />
      <div className="flex justify-between items-center h-full w-full">
        {/* Main quiz question */}
        <QuestionBuilderForm form={form} />
        {/* Sidebar */}
        <QuestionListSidebar form={form} />
      </div>
    </div>
  );
};

export default ManageQuizView;
