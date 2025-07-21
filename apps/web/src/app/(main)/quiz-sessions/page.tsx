import CreateQuizSessionModalForm from "@/components/quiz-session/create-quiz-session-modal-form";

const QuizSessionPage = () => {
  return (
    <section className="*:px-4 *:py-3 divide-y">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Quiz Session List</h3>
        <div>
          <CreateQuizSessionModalForm />
        </div>
      </div>
      <div></div>
    </section>
  );
};

export default QuizSessionPage;
