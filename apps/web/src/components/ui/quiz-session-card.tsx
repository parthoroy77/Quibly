import { Button } from "@quibly/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@quibly/ui/components/dropdown-menu";
import { cn } from "@quibly/ui/lib/utils";
import { QuizSessionWithQuiz } from "@quibly/utils/types";
import { IconCalendarTime, IconCancel, IconLivePhoto, IconShare } from "@tabler/icons-react";
import { format, formatDistanceToNow, isFuture } from "date-fns";
import { Calendar, Ellipsis, Pen, Settings, Settings2 } from "lucide-react";
import Link from "next/link";

const QuizSessionCard = ({ session }: { session: QuizSessionWithQuiz }) => {
  const { title, type, startTime, quizId, endTime, status, updatedAt, quiz, sessionCode, sessionSlug } = session;

  const getTimeDisplay = () => {
    const now = new Date();

    if (status === "completed") {
      return (
        <>
          <span>Ended {formatDistanceToNow(endTime!, { addSuffix: true })}</span>
        </>
      );
    }

    if (status === "active") {
      return <span>Started {formatDistanceToNow(startTime, { addSuffix: true })}</span>;
    }

    // pending or scheduled
    if (isFuture(startTime)) {
      const msDiff = new Date(startTime).getTime() - now.getTime();
      const hours = Math.floor(msDiff / (1000 * 60 * 60));
      const minutes = Math.floor((msDiff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours < 6) {
        return (
          <>
            <span>
              Starts in {hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""} ` : ""}
              {minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""}` : ""}
            </span>
          </>
        );
      } else {
        return (
          <>
            <span>Starts {format(startTime, "MMM dd, yyyy 'at' h:mm a")}</span>
          </>
        );
      }
    }

    return (
      <>
        <span>{format(startTime, "MMM dd, yyyy 'at' h:mm a")}</span>
      </>
    );
  };

  return (
    <div className="rounded-xl relative border shadow-sm p-2 space-y-2 flex flex-col justify-between">
      <div className="h-24 bg-red-200 rounded-lg" />
      <h2 className="font-semibold line-clamp-1 font-instrumental-sans tracking-wide">{title}</h2>
      <Link href={"/manage-quiz/" + quizId} title="View Quiz Details">
        <div className=" space-y-0.5 bg-sidebar rounded-lg px-2 py-1 border">
          <h5 className="font-semibold line-clamp-1 font-instrumental-sans tracking-wide">{quiz.title}</h5>
          <p className="line-clamp-2 text-xs text-muted-foreground">{quiz.description}</p>
        </div>
      </Link>
      <div className="bg-secondary text-xs flex items-center gap-2 w-fit px-2 py-0.5 border rounded-lg">
        <Calendar size={14} />
        {getTimeDisplay()}
      </div>
      <div
        className={cn(
          "bg-secondary absolute top-2 left-2 text-xs flex items-center gap-2 w-fit px-2 py-0.5 border rounded-lg",
          status === "active" && "animate-pulse bg-green-200"
        )}
      >
        {type === "live" ? <IconLivePhoto size={16} /> : <IconCalendarTime size={16} />}
        <span className="capitalize">{type.toLowerCase()}</span>
      </div>
      {status === "cancelled" && (
        <div
          className={cn(
            "bg-destructive text-background absolute top-2 right-2 text-xs flex items-center gap-2 w-fit px-2 py-0.5 border rounded-lg"
          )}
        >
          <IconCancel size={14} />
          <span className="capitalize">{type.toLowerCase()}</span>
        </div>
      )}
      <div className="flex justify-between items-center gap-2">
        <h6 className="inline-flex gap-2 text-muted-foreground">
          <Settings2 size={14} />
          Edited {formatDistanceToNow(new Date(updatedAt), { addSuffix: true, includeSeconds: false })}
        </h6>
        <div className="flex items-center  gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                title="Actions"
                size={"icon"}
                variant={"outline"}
                className="text-xs cursor-pointer rounded-full p-1 size-fit  inline-flex gap-1 items-center"
              >
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col items-start gap-1 *:w-full">
              <DropdownMenuItem>
                <Settings />
                <span>View Activities</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Pen />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconShare />
                <span>Share</span>
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <IconCancel />
                <span>Cancel</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default QuizSessionCard;
