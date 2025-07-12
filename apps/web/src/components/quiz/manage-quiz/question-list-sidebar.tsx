import { handleAddNewQuestion } from "@/utilities/quiz";
import { Button } from "@quibly/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@quibly/ui/components/dropdown-menu";
import { cn } from "@quibly/ui/lib/utils";
import { toNormalCase } from "@quibly/utils/functions";
import { UseFormReturn } from "@quibly/utils/hook-form";
import { QuestionType } from "@quibly/utils/types";
import { CreateQuestionFormData } from "@quibly/utils/validations";
import { Clock, Plus, Sheet } from "lucide-react";
import { FC } from "react";

interface Props {
  form: UseFormReturn<CreateQuestionFormData>;
  onQsnSelect: (idx: number) => void;
  selected: number;
}

const QuestionListSidebar: FC<Props> = ({ form, onQsnSelect, selected }) => {
  const questions = form.watch("questions") || [];
  return (
    <aside className="w-3/12 h-full overflow-y-scroll scrollbar-hidden space-y-4 bg-sidebar p-4 border-l">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium">Questions </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"outline"} size={"icon"} className="p-0.5 size-fit  rounded-full">
              <Plus />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Question Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {Object.values(QuestionType).map((x, i) => (
              <DropdownMenuItem className="capitalize" onClick={() => handleAddNewQuestion(x, form)} key={i}>
                {toNormalCase(x)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {questions.map((q, i) => (
        <div
          className={cn(
            "p-4 rounded-xl border bg-background space-y-3 cursor-pointer",
            selected === i && "border-primary"
          )}
          key={i}
          onClick={() => onQsnSelect(i)}
        >
          <div className="flex items-center gap-2 ">
            <span className="font-instrumental-sans bg-secondary font-bold size-6 text-sm flex items-center justify-center rounded-full border shrink-0">
              {i + 1}
            </span>
            <h4 className={cn("truncate font-medium", !q.text && "text-muted-foreground")}>{q.text || "Untitled"}</h4>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium flex-wrap">
            <span className="p-2 text-xs max-w-32 font-medium py-0.5 bg-secondary capitalize truncate rounded-md border">
              {toNormalCase(q.type)}
            </span>
            <div className="text-xs inline-flex gap-1 items-center">
              <Sheet size={14} />
              <span>{q.points} pts</span>
            </div>
            <div className="text-xs inline-flex gap-1 items-center">
              <Clock size={14} />
              <span>{q.timeLimit} min</span>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default QuestionListSidebar;
