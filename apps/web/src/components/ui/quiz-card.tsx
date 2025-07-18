import { Button } from "@quibly/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@quibly/ui/components/dropdown-menu";
import { Quiz } from "@quibly/utils/types";
import { formatDistanceToNow } from "date-fns";
import {
  CircleFadingPlus,
  Copy,
  Ellipsis,
  FileQuestion,
  ScrollText,
  Settings,
  Settings2,
  Waypoints,
} from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface Props {
  quiz: Quiz & { questionCount: number; estimateTime: number; totalPoints: number };
}
const QuizCard: FC<Props> = ({ quiz }) => {
  const { title, description, updatedAt, questionCount, totalPoints, estimateTime } = quiz;
  const redirectLink = "/manage-quiz/" + quiz.id;
  return (
    <div className="rounded-xl bg-sidebar relative border shadow-sm p-2 space-y-2 flex flex-col justify-between">
      <Link href={redirectLink} className="space-y-2 ">
        <div className="h-24 bg-red-200 rounded-lg" />
        <h2 className="font-semibold line-clamp-1 font-instrumental-sans tracking-wide">{title}</h2>
        <p className="line-clamp-2 text-xs font-medium text-muted-foreground">{description}</p>
      </Link>
      <div className="font-medium flex justify-between gap-2">
        <div className="text-xs inline-flex gap-1 items-center">
          <FileQuestion size={14} />
          <span>{questionCount} Qsn</span>
        </div>
        <div className="text-xs inline-flex gap-1 items-center">
          <CircleFadingPlus size={14} />
          <span>{estimateTime} min</span>
        </div>
        <div className="text-xs inline-flex gap-1 items-center">
          <Waypoints size={14} />
          <span>{totalPoints}pts</span>
        </div>
      </div>
      <div className="flex justify-between items-center ">
        <h6 className="inline-flex gap-2">
          <Settings2 size={14} />
          Edited {formatDistanceToNow(new Date(updatedAt), { addSuffix: true, includeSeconds: false })}
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
              <Link href={redirectLink}>
                <DropdownMenuItem>
                  <Settings />
                  <span>Manage</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Copy />
                <span>Duplicate</span>
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
