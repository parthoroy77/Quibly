import { Button } from "@quibly/ui/components/button";
import Image from "next/image";
import dashImg from "../../../public/quiz.png";
import { AuroraText } from "../shared/aurora-text";
import { BlurFade } from "../shared/blur-fade";

const HeroSection = () => {
  return (
    <div className="w-full relative px-4 min-h-dvh overflow-hidden sm:p-0 flex flex-col justify-center items-center gap-16">
      {/* Gradient For Dark and Light theme */}
      <div
        className="absolute inset-0 z-0 hidden dark:flex"
        style={{
          background: "radial-gradient(125% 125% at 40% 10%, #000000 20%, #0d1a36 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background: "radial-gradient(125% 125% at 40% 10%, #fff 40%, #d9d0ee 100%)",
        }}
      />
      <div className="space-y-5 text-center flex justify-center items-center flex-col pt-36">
        <h1 className="relative space-y-0 leading-16 sm:leading-20 space-x-3 text-4xl font-extrabold font-instrumental-serif tracking-tight sm:space-x-5  md:text-6xl lg:text-6xl">
          <BlurFade className="inline-block" delay={0.3}>
            <span>
              Create <AuroraText>Quizzes</AuroraText> Instantly with <AuroraText>AI</AuroraText>,
            </span>
          </BlurFade>
          <br />
          <BlurFade className="inline-block" delay={0.4}>
            <span>
              Host <AuroraText>Sessions</AuroraText>, Track <AuroraText>Insights</AuroraText>
            </span>
          </BlurFade>
        </h1>
        <BlurFade delay={0.6} offset={-15}>
          <p className="text-muted-foreground mx-auto max-w-[700px] text-sm text-pretty font-instrumental-sans font-medium">
            Build quizzes in seconds from a simple prompt. Host live or schedule sessions, progressive leaderboard, and
            keep students excited to learn — all in one place.
          </p>
        </BlurFade>
        <BlurFade delay={0.6} offset={-20}>
          <div className="flex justify-center gap-4 ">
            <Button size="lg" variant="outline" className="rounded-xl">
              Learn more
            </Button>
            <Button size="lg" className="rounded-xl">
              Get Started
            </Button>
          </div>
        </BlurFade>
      </div>
      <div className="w-[90%] lg:w-4/5 md:h-[700px] bg-white dark:bg-sidebar md:rounded-b-none border rounded-[2rem] overflow-hidden pb-0 z-10 p-2">
        <Image
          src={dashImg}
          alt="Dash image"
          className="rounded-3xl h-full object-cover object-top bg-secondary rounded-b-none border"
        />
      </div>
      <div className="pointer-events-none dark:hidden absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background via-background to-transparent lg:h-1/4 z-10"></div>
    </div>
  );
};

export default HeroSection;
