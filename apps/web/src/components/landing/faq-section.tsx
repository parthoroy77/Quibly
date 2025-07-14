import FAQCard from "@/components/ui/faq-card";
import { Container } from "@quibly/ui/components/container";

const FAQSection = () => {
  return (
    <div className="py-20">
      <Container className="mx-auto space-y-10">
        <div className="text-center">
          <span className="text-3xl font-instrumental-serif font-bold">Frequently Asked Questions</span>
        </div>
        <div className="space-y-5 max-w-3xl mx-auto">
          {Array.from({ length: 5 }).map((_x, i) => (
            <FAQCard key={i} title="What is Quibly?">
              <p>
                We provide a secure, cloud-based customer management platform with powerful analytics and integrations.
                Our intuitive interface makes it easy to customize and automate customer workflows and manage customers.
              </p>
            </FAQCard>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FAQSection;
