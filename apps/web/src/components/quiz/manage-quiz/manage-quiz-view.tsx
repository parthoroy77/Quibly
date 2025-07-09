import { Button } from "@quibly/ui/components/button";
import { QuizWithQsn } from "@quibly/utils/types";
import { Clock, Plus, Sheet } from "lucide-react";
import Header from "./header";

const ManageQuizView = ({ quiz }: { quiz: QuizWithQsn }) => {
  return (
    <div className="divide-y h-full">
      <Header title={quiz.title} />
      <div className="flex justify-between items-center h-full w-full">
        <section className="flex-1"></section>
        <aside className="w-3/12 h-full space-y-4 bg-sidebar p-4 border-l">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">Questions </span>
            <Button variant={"outline"} size={"icon"} className="p-0.5 size-fit  rounded-full">
              <Plus />
            </Button>
          </div>
          {Array.from({ length: 15 }).map((_x, i) => (
            <div className="p-4 rounded-xl border bg-background space-y-3 cursor-pointer" key={i}>
              <div className="flex items-center gap-2 ">
                <span className="font-instrumental-sans bg-secondary font-bold size-7 text-sm flex items-center justify-center rounded-full border shrink-0">
                  {i + 1}
                </span>
                <h4 className="truncate font-medium">What is software development?</h4>
              </div>
              <div className="flex items-center text-xs font-medium justify-between flex-wrap">
                <div>
                  <span className="p-2 py-0.5 bg-secondary rounded-md">Multiple Choice</span>
                </div>
                <div className="text-xs inline-flex gap-1 items-center">
                  <Sheet size={14} />
                  <span>2 pts</span>
                </div>
                <div className="text-xs inline-flex gap-1 items-center">
                  <Clock size={14} />
                  <span>2 min</span>
                </div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
};

export default ManageQuizView;
