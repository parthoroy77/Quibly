import { getQuizWithQuestion } from "@/actions/quiz";
import ManageQuizView from "@/components/quiz/manage-quiz/manage-quiz-view";
import { notFound } from "next/navigation";

type Params = {
  id: string;
};

const ManageQuizPage = async ({ params }: { params: Promise<Params> }) => {
  const id = (await params).id;

  if (!id) {
    notFound();
  }

  const quiz = await getQuizWithQuestion(id);

  // TODO: Handle error properly
  if (!quiz) {
    notFound();
  }

  return <ManageQuizView quiz={quiz} />;
};

export default ManageQuizPage;
