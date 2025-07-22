import { Container } from "@quibly/ui/components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@quibly/ui/components/tabs";

const HowItWorks = () => {
  return (
    <section className="mt-20 mb-10">
      <Container className="flex justify-center items-center">
        <Tabs defaultValue="educator" className="mx-auto md:w-4/5">
          <div className="flex flex-col gap-2 items-center justify-between">
            <span className="text-3xl font-instrumental-serif font-bold">How It Works</span>
            <TabsList className="bg-secondary">
              <TabsTrigger value="educator">For Educator</TabsTrigger>
              <TabsTrigger value="student">For Student</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="educator">
            <EducatorFlow />
          </TabsContent>
          <TabsContent value="student">
            <StudentFlow />
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
};

const EducatorFlow = () => {
  return (
    <div className="mt-10 grid grid-cols-12 gap-4">
      {/* AI Quiz Generator */}
      <div className="col-span-12 md:col-span-6 bg-white dark:bg-muted/40 border rounded-2xl flex flex-col justify-between overflow-hidden">
        <div className="p-6">
          <h3 className="font-instrumental-serif font-semibold mb-2">Generate Quiz using AI ✨</h3>
          <p className="text-sm text-muted-foreground">
            Generate quizzes instantly using AI. Just enter a topic or paste text — we’ll handle the rest with accurate,
            diverse question types.
          </p>
        </div>
        <div className="flex justify-center h-52 px-8">
          <div className="h-full w-full bg-secondary rounded-xl border rounded-b-none" />
        </div>
      </div>

      {/* Custom Quiz */}
      <div className="col-span-12 md:col-span-6 bg-white dark:bg-muted/40 border rounded-2xl flex flex-col justify-between overflow-hidden">
        <div className="p-6">
          <h3 className="font-instrumental-serif font-semibold mb-2">️Custom you Quiz Question 🛠</h3>
          <p className="text-sm text-muted-foreground">
            Customize every question — edit text, change answers, set timers, shuffle options, and define scoring for
            total control.
          </p>
        </div>
        <div className="flex justify-center h-52 pl-8">
          <div className="h-full w-full bg-secondary rounded-xl border rounded-tr-none rounded-b-none" />
        </div>
      </div>

      {/* Host & Track */}
      <div className="col-span-12 grid grid-cols-6 gap-4">
        {/* Host Quiz Sessions */}
        <div className="col-span-6 md:col-span-4 gap-4">
          <div className="bg-white dark:bg-muted/40 rounded-2xl border">
            <div className="p-6">
              <h3 className="font-instrumental-serif font-semibold mb-2">Host Quiz Sessions 📡</h3>
              <p className="text-sm text-muted-foreground">
                Launch real-time sessions where you control the pace. Great for classrooms and workshops with live
                engagement and leaderboards or set start/end times and share quiz links with students. Great for
                homework, practice tests, and flipped classrooms.
              </p>
            </div>
            <div className="h-56 grid grid-cols-2 gap-4 px-6 *:rounded-xl *:rounded-b-none">
              <div className="bg-secondary" />
              <div className="bg-secondary" />
            </div>
          </div>
        </div>

        {/* Track Student Insights */}
        <div className="col-span-6 md:col-span-2 bg-white dark:bg-muted/40 border rounded-2xl flex flex-col justify-between overflow-hidden">
          <div className="p-6">
            <h3 className="font-instrumental-serif font-semibold mb-2">Track Student Insights📊</h3>
            <p className="text-sm text-muted-foreground">
              Track participation, question-level performance, and see leaderboard data to assess understanding in
              real-time or after.
            </p>
          </div>
          <div className="h-full bg-secondary" />
        </div>
      </div>

      {/* Dashboard */}
      <div className="col-span-12 bg-white dark:bg-muted/40 rounded-2xl border">
        <div className="p-6">
          <h3 className="font-instrumental-serif font-semibold mb-2">Rich Analytical Dashboard📋 </h3>
          <p className="text-sm text-muted-foreground">
            Access all your quizzes, sessions, results, and student analytics in one place. Designed to keep organized.
          </p>
        </div>
        <div className="flex justify-center h-52 px-8">
          <div className="h-full w-full bg-secondary rounded-xl border rounded-b-none" />
        </div>
      </div>
    </div>
  );
};

const StudentFlow = () => {
  return (
    <div className="grid grid-cols-6 gap-4 mt-8">
      {/* Join Quiz Session */}
      <div className="col-span-6 md:col-span-4 bg-white dark:bg-muted/40 rounded-2xl shadow">
        <div className="p-6">
          <h3 className="font-instrumental-serif font-semibold mb-2">Join Quiz Session using Code or Link 🚀</h3>
          <p className="text-sm text-muted-foreground">
            No account? No problem. Join any quiz instantly using a code or shared link — no apps or downloads needed.
          </p>
        </div>
      </div>

      {/* Smooth Participation */}
      <div className="col-span-6 md:col-span-2 bg-white dark:bg-muted/40 p-6 rounded-2xl shadow">
        <h3 className="font-instrumental-serif font-semibold mb-2">Participate on smooth Quiz Experience 🧠</h3>
        <p className="text-sm text-muted-foreground">
          A clear and responsive interface with timers, answer formats, and question progress — works on every device
        </p>
      </div>

      {/* Real-Time Feedback */}
      <div className="col-span-6 md:col-span-3 bg-white dark:bg-muted/40 p-6 rounded-2xl shadow">
        <h3 className="font-instrumental-serif font-semibold mb-2">Real-Time Feedback 🔄</h3>
        <p className="text-sm text-muted-foreground">
          See whether your answer was correct immediately (if enabled by your teacher) or after quiz submission. Learn
          and improve as you go.
        </p>
      </div>

      {/* Live Leaderboards */}
      <div className="col-span-6 md:col-span-3 bg-white dark:bg-muted/40 p-6 rounded-2xl shadow">
        <h3 className="font-instrumental-serif font-semibold mb-2">Live Leaderboards 🏆</h3>
        <p className="text-sm text-muted-foreground">
          Compete with classmates during live sessions and track your rank in real-time — boost motivation through
          friendly challenge.
        </p>
      </div>

      {/* Quiz History & Review */}
      <div className="col-span-6 md:col-span-3 bg-white dark:bg-muted/40 p-6 rounded-2xl shadow">
        <h3 className="font-instrumental-serif font-semibold mb-2">Quiz History & Review 📚</h3>
        <p className="text-sm text-muted-foreground">
          Revisit previous quizzes, scores, and answers. Reflect on past performance and focus on improvement.
        </p>
      </div>

      {/* Simple & Secure */}
      <div className="col-span-6 md:col-span-3 bg-white dark:bg-muted/40 p-6 rounded-2xl shadow">
        <h3 className="font-instrumental-serif font-semibold mb-2">Simple & Secure 🔒</h3>
        <p className="text-sm text-muted-foreground">
          Join anonymously or with a student account. No spam, no tracking — just a safe, focused learning environment.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks;
