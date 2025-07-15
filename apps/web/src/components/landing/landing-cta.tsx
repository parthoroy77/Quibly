import { Button } from "@quibly/ui/components/button";
import { Container } from "@quibly/ui/components/container";

const LandingCTA = () => {
  return (
    <section className="mt-10 mb-20 p-4">
      <Container className=" bg-gradient-to-br px-6 from-accent to-accent-foreground via-accent py-16 rounded-3xl h-full mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-instrumental-serif">
          Ready to transform your teaching or learning experience?
        </h2>
        <p className="text-sm md:text-xl text-footer-text mb-8 max-w-2xl mx-auto">
          Join thousands of educators who are creating engaging quizzes and tracking student progress with AI-powered
          tools.
        </p>
        <Button size="lg" className="text-lg px-8 py-3">
          Start for free
        </Button>
      </Container>
    </section>
  );
};

export default LandingCTA;
