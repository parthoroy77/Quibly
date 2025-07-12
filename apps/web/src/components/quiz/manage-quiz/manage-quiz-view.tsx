"use client";
import { useForm, zodResolver } from "@quibly/utils/hook-form";
import { QuizWithQsn } from "@quibly/utils/types";
import { CreateQuestionFormData, CreateQuestionSchema } from "@quibly/utils/validations";
import { useRef, useState } from "react";
import Header from "./header";
import QuestionBuilderForm from "./question-builder-form";
import QuestionListSidebar from "./question-list-sidebar";

const ManageQuizView = ({ quiz }: { quiz: QuizWithQsn }) => {
  const [selectedQsn, setSelectedQuestion] = useState(0);
  const form = useForm<CreateQuestionFormData>({
    resolver: zodResolver(CreateQuestionSchema),
    defaultValues: {
      quizId: quiz.id,
      questions: [],
    },
  });

  const scrollContainerRef = useRef<HTMLFormElement>(null);
  const questionRefs = useRef<{ [id: number]: HTMLDivElement | null }>({});

  const handleScrollToQsn = (idx: number) => {
    const questionElement = questionRefs.current[idx];
    if (questionElement && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const elementTop = questionElement.offsetTop - container.offsetTop;
      container.scrollTo({
        top: elementTop - 30,
        behavior: "smooth",
      });
      setSelectedQuestion(idx);
    }
  };

  return (
    <div className="divide-y h-full flex flex-col">
      <Header title={quiz.title} />
      <div className="flex justify-between items-center h-full w-full">
        {/* Main quiz question */}
        <QuestionBuilderForm
          selected={selectedQsn}
          questionRefs={questionRefs}
          containerRef={scrollContainerRef}
          form={form}
        />
        {/* Sidebar */}
        <QuestionListSidebar selected={selectedQsn} onQsnSelect={handleScrollToQsn} form={form} />
      </div>
    </div>
  );
};

export default ManageQuizView;
