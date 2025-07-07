import { Badge } from "@quibly/ui/components/badge";
import { Button } from "@quibly/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@quibly/ui/components/dropdown-menu";
import {
  ChartNoAxesGantt,
  CircleFadingPlus,
  Ellipsis,
  FileQuestion,
  Layers2,
  ScrollText,
  Settings,
  Settings2,
} from "lucide-react";

const QuizCard = () => {
  return (
    <div className="rounded-xl bg-sidebar relative border shadow-sm p-2 space-y-2">
      <div className="h-24 bg-red-200 rounded-lg" />
      <h2 className="font-semibold font-instrumental-sans tracking-wide">Software Development & AI Enhancement</h2>
      <p className="line-clamp-2 text-xs font-medium text-muted-foreground">
        This quiz explores the intersection of software development and artificial intelligence (AI), focusing on how AI
        technologies are enhancing the software development lifecycle. It covers AI-driven tools, automation, code
        generation, testing, and ethical considerations. Whether you're a developer, manager, or tech enthusiast, this
        quiz will help you assess your knowledge of how AI is transforming modern software engineering.
      </p>
      <div className="font-medium flex justify-between gap-2">
        <div className="text-xs inline-flex gap-1 items-center">
          <FileQuestion size={14} />
          <span>30 Questions</span>
        </div>
        <div className="text-xs inline-flex gap-1 items-center">
          <CircleFadingPlus size={14} />
          <span className="font-semibold">Estimate time: </span>
          <span>1h</span>
        </div>
      </div>
      <Badge className="text-xs inline-flex gap-1 absolute top-2 right-2 p-1 rounded-lg border px-2 items-center">
        <Layers2 size={14} />
        <span>{"Scheduled"}</span>
      </Badge>
      <div className="flex justify-between items-center ">
        <h6 className="inline-flex gap-2">
          <Settings2 size={14} />
          Edited 3d ago
        </h6>
        <div className="flex items-center  gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size={"icon"}
                variant={"outline"}
                className="text-xs cursor-pointer rounded-full p-1 size-fit  inline-flex gap-1 items-center"
              >
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col items-start gap-1 *:w-full">
              <DropdownMenuItem>
                <ChartNoAxesGantt />
                <span>View </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ScrollText />
                <span>Leaderboard</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
