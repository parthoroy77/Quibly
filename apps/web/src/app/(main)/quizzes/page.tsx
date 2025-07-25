import { getUserQuizzes } from "@/actions/quiz";
import CreateQuizModalForm from "@/components/quiz/create-quiz-modal-form";
import QuizCard from "@/components/ui/quiz-card";
import ViewToggle from "@/components/ui/view-toggle";
import { Button } from "@quibly/ui/components/button";
import { FileSliders } from "lucide-react";

const QuizzesPage = async () => {
  const quizzes = await getUserQuizzes();

  return (
    <section className="*:px-4 *:py-3 divide-y">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Quizzes</h3>
        <div>
          <CreateQuizModalForm />
        </div>
      </div>
      <div className=" space-y-4">
        <div className="flex items-center justify-between  ">
          <Button variant={"secondary"}>
            <FileSliders />
            <span>Filter</span>
          </Button>
          <ViewToggle />
        </div>
        <div className="grid grid-cols-4 gap-5">
          {quizzes.map((q, i) => (
            <QuizCard key={i} quiz={q} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuizzesPage;
