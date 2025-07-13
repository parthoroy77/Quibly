import { Container } from "@quibly/ui/components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@quibly/ui/components/tabs";
const Features = () => {
  return (
    <Container className=" py-10">
      <Tabs defaultValue="educator" className="w-4/5 mx-auto">
        <div className="flex flex-col gap-2 items-center justify-between">
          <span className="text-3xl font-instrumental-serif font-bold">Features</span>
          <p className="text-sm">✨ One platform. Two experiences. One goal: Better learning.</p>
          <TabsList>
            <TabsTrigger value="educator">Educator</TabsTrigger>
            <TabsTrigger value="student">Student</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="educator">
          <EducatorFeature />
        </TabsContent>
        <TabsContent value="student">
          <div></div>
        </TabsContent>
      </Tabs>
    </Container>
  );
};

const EducatorFeature = () => {
  return (
    <div className="mt-10 grid grid-cols-12 gap-4">
      <div className="col-span-6  bg-white dark:bg-muted/40 border rounded-2xl flex flex-col justify-between overflow-hidden">
        <div className="p-6">
          <h3 className="font-instrumental-serif font-semibold mb-2">✨AI-Powered Quiz Generation</h3>
          <p className="text-sm text-muted-foreground">
            Generate quizzes instantly using AI. Just enter a topic or paste text — we’ll handle the rest with accurate,
            diverse question types.
          </p>
        </div>
        <div className="flex justify-center h-52 px-8">
          <div className="h-full w-full bg-secondary rounded-xl border rounded-b-none"></div>
        </div>
      </div>

      <div className="col-span-6  bg-white dark:bg-muted/40 border rounded-2xl flex flex-col justify-between overflow-hidden">
        <div className="p-6">
          <h3 className="font-instrumental-serif font-semibold mb-2">🛠️ Custom Question Control</h3>
          <p className="text-sm text-muted-foreground">
            Customize every question — edit text, change answers, set timers, shuffle options, and define scoring for
            total control.
          </p>
        </div>
        <div className="flex justify-center h-52 pl-8 ">
          <div className="h-full w-full bg-secondary rounded-xl rounded-tr-none border rounded-b-none"></div>
        </div>
      </div>

      <div className="col-span-12 grid grid-cols-6 gap-4">
        <div className="col-span-4 grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-white dark:bg-muted/40 rounded-2xl border">
            <div className="p-6">
              <h3 className="font-instrumental-serif font-semibold mb-2">📡 Host Quiz Sessions</h3>
              <p className="text-sm text-muted-foreground">
                Launch real-time sessions where you control the pace. Great for classrooms and workshops with live
                engagement and leaderboards or set start/end times and share quiz links with students. Great for
                homework, practice tests, and flipped classrooms.
              </p>
            </div>
            <div className="h-56 grid grid-cols-2 gap-4 px-6 *:rounded-xl *:rounded-b-none">
              <div className="bg-secondary"></div>
              <div className="bg-secondary"></div>
            </div>
          </div>
        </div>

        <div className="col-span-2  bg-white dark:bg-muted/40 border rounded-2xl flex flex-col justify-between overflow-hidden">
          <div className="p-6">
            <h3 className="font-instrumental-serif font-semibold mb-2">📊 Student Insights</h3>
            <p className="text-sm text-muted-foreground">
              Track participation, question-level performance, and see leaderboard data to assess understanding in
              real-time or after.
            </p>
          </div>
          <div className="h-full bg-secondary"></div>
        </div>
      </div>
      <div className=" col-span-12 bg-white dark:bg-muted/40 rounded-2xl border">
        <div className="p-6">
          <h3 className="font-instrumental-serif font-semibold mb-2">📋 Rich Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Access all your quizzes, sessions, results, and student analytics in one place. Designed to keep organized.
          </p>
        </div>
        <div className="flex justify-center h-52 px-8 ">
          <div className="h-full w-full bg-secondary rounded-xl border rounded-b-none"></div>
        </div>
      </div>
    </div>
  );
};

export default Features;
