"use client";
import { Container } from "@quibly/ui/components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@quibly/ui/components/tabs";
import { motion } from "motion/react";

const Features = () => {
  return (
    <section className="mt-20">
      <Container>
        <Tabs defaultValue="educator" className="w-full md:w-4/5 mx-auto space-y-10">
          <div className="flex flex-col gap-2 items-center justify-between">
            <span className="text-3xl font-instrumental-serif font-bold">Features</span>
            <p className="text-sm">✨ One platform. Two experiences. One goal: Better learning.</p>
            <TabsList className="bg-secondary">
              <TabsTrigger value="educator">Educator</TabsTrigger>
              <TabsTrigger value="student">Student</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="educator">
            <EducatorFeature />
          </TabsContent>
          <TabsContent value="student">
            <StudentFeature />
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
};

export const educatorFeatures = [
  {
    title: "AI-Powered Quiz Generation",
    description:
      "Effortlessly create quizzes with AI-generated questions to save time and enhance educational quality.",
  },
  {
    title: "Full Control & Management",
    description:
      "Manage quizzes with ease using intuitive tools to edit, organize, and structure your content effectively.",
  },
  {
    title: "Live & Scheduled Hosting",
    description:
      "Host live quiz sessions or schedule them with shareable links, all while maintaining full session control.",
  },
  {
    title: "Leaderboard & Insights",
    description: "Monitor student performance instantly with live leaderboards and insightful analytics on every quiz.",
  },
];

export const studentFeatures = [
  {
    title: "Instant Join with Code or Link",
    description: "No account? No problem. Join quizzes instantly with a code or shared link — no setup required.",
  },
  {
    title: "Smooth Quiz Experience",
    description: "Answer questions through an intuitive interface with timers, progress indicators, and clean layouts.",
  },
  {
    title: "Real-Time Leaderboards",
    description: "See if your answers are correct (if enabled), and track your position with live leaderboards.",
  },
  {
    title: "Quiz History & Secure Access",
    description: "Review past quizzes and performance history. Join securely, anonymously or with a student account.",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const EducatorFeature = () => {
  return (
    <motion.div
      className="relative bg-secondary h-fit md:h-40 p-4 rounded-4xl mt-5 border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        variants={containerVariant}
        className="grid md:grid-cols-4 gap-4 md:absolute h-fit bottom-5 inset-x-4"
      >
        {educatorFeatures.map((el, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeInUp}
            className="bg-background p-5 rounded-3xl border shadow space-y-3"
          >
            <h3 className="block font-instrumental-serif font-semibold">{el.title}</h3>
            <p className="text-pretty text-sm">{el.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const StudentFeature = () => {
  return (
    <motion.div
      className="relative bg-secondary h-fit md:h-40 p-4 rounded-4xl mt-5 border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        variants={containerVariant}
        className="grid md:grid-cols-4 gap-4 md:absolute h-fit bottom-5 inset-x-4"
      >
        {studentFeatures.map((el, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={fadeInUp}
            className="bg-background p-5 rounded-3xl border shadow space-y-3"
          >
            <h3 className="block font-instrumental-serif font-semibold">{el.title}</h3>
            <p className="text-pretty text-sm">{el.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Features;
