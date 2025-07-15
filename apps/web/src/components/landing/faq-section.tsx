import FAQCard from "@/components/ui/faq-card";
import { Container } from "@quibly/ui/components/container";

const faqs = [
  {
    question: "What is Quibly and who is it for?",
    answer:
      "Quibly is an interactive quiz platform designed for educators and students to create, host, and participate in quizzes that promote engaging learning experiences.",
  },
  {
    question: "Do I need an account to use Quibly?",
    answer:
      "Educators need an account to create and manage quizzes. Students can join quizzes instantly using a link or code — no account required!",
  },
  {
    question: "Can I generate quizzes using AI?",
    answer: "Yes! Quibly offers AI-powered quiz generation to help you create high-quality questions effortlessly.",
  },
  {
    question: "How do I host a live quiz session?",
    answer:
      "You can start a quiz live or schedule it for later. A unique link or code will be generated to share with students.",
  },
  {
    question: "Can I track student performance and scores?",
    answer: "Absolutely. You'll get real-time leaderboards and detailed performance analytics after each quiz.",
  },
  {
    question: "How do I join a quiz?",
    answer: "Just use the unique code or link shared by your educator. No sign-up or installation needed!",
  },
  {
    question: "Can I review my answers after the quiz?",
    answer:
      "Yes, once the quiz ends, you can view your answers, correct responses, and overall score if your educator enables it.",
  },
];

const FAQSection = () => {
  return (
    <div className="my-10">
      <Container className="mx-auto space-y-10">
        <div className="text-center">
          <span className="text-3xl font-instrumental-serif font-bold">Frequently Asked Questions</span>
        </div>
        <div className="space-y-5 max-w-3xl mx-auto">
          {faqs.map((el, i) => (
            <FAQCard key={i} title={el.question}>
              <p>{el.answer}</p>
            </FAQCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FAQSection;
