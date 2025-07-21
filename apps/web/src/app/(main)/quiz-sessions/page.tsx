import { getUserQuizSessions } from "@/actions/quiz-session";
import CreateQuizSessionModalForm from "@/components/quiz-session/create-quiz-session-modal-form";
import QuizSessionsCard from "@/components/ui/quiz-session-card";

const QuizSessionPage = async () => {
  const sessions = await getUserQuizSessions();
  return (
    <section className="*:px-4 *:py-3 divide-y">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Quiz Session List</h3>
        <div>
          <CreateQuizSessionModalForm />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {sessions.map((s) => (
          <QuizSessionsCard key={s.id} session={s} />
        ))}
      </div>
    </section>
  );
};

export default QuizSessionPage;
