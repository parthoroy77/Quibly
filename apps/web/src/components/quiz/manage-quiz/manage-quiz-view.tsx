"use client";
import { Button } from "@quibly/ui/components/button";
import { Input } from "@quibly/ui/components/input";
import { Label } from "@quibly/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@quibly/ui/components/select";
import { Separator } from "@quibly/ui/components/separator";
import SingleFileUpload from "@quibly/ui/components/single-file-uploader";
import { Switch } from "@quibly/ui/components/switch";
import { Textarea } from "@quibly/ui/components/textarea";
import { toNormalCase } from "@quibly/utils/functions";
import { QuestionType, QuizWithQsn } from "@quibly/utils/types";
import { Clock, FileQuestion, GripVertical, Plus, Sheet, Trash2 } from "lucide-react";
import Header from "./header";

const ManageQuizView = ({ quiz }: { quiz: QuizWithQsn }) => {
  return (
    <div className="divide-y h-full">
      <Header title={quiz.title} />
      <div className="flex justify-between items-center h-full w-full">
        {/* Main quiz question */}
        <section className="flex-1 h-full space-y-5 p-4">
          {Array.from({ length: 1 }).map((_x, i) => (
            <div
              key={i}
              className="border *:p-3 divide-y rounded-xl w-full h-fit [&_input]:bg-sidebar [&_textarea]:bg-sidebar"
            >
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <FileQuestion size={16} />
                  <span>Question 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="space-y-2">
                    <Select defaultValue={QuestionType.multiple_choice_single}>
                      <SelectTrigger className="w-56 capitalize bg-sidebar">
                        <SelectValue placeholder="Question Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(QuestionType).map((type, i) => (
                          <SelectItem key={i} value={type} className="capitalize">
                            {toNormalCase(type)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator orientation="vertical" className=" data-[orientation=vertical]:h-4" />
                  <div className="flex items-center gap-2">
                    <Label>Required</Label>
                    <Switch checked />
                  </div>
                  <Separator orientation="vertical" className=" data-[orientation=vertical]:h-4" />
                  <div className="flex items-center gap-2">
                    <Label>Media </Label>
                    <Switch checked />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Question</Label>
                  <Textarea maxLength={100} placeholder="What is 2 + 2?" className="resize-none" />
                </div>
                <div className="space-y-2">
                  <Label>Media (Optional)</Label>
                  <SingleFileUpload />
                </div>
                <div className="space-y-2">
                  <Label>Explanation (optional)</Label>
                  <Textarea maxLength={100} placeholder="What is 2 + 2?" className="resize-none" />
                </div>
                <div className="space-y-2">
                  <Label>Choices</Label>
                  <div className="space-y-2">
                    {Array.from({ length: 4 }).map((_x, i) => (
                      <div key={i} className="h-9 flex gap-2 items-center">
                        <input type="radio" className="size-5 " />
                        <Input className="h-full" placeholder={"Option " + (i + 1)} />
                        <Button size={"icon"} variant={"ghost"} className="size-fit border bg-sidebar h-full px-1">
                          <GripVertical />
                        </Button>
                        <Button size={"icon"} variant={"ghost"}>
                          <Trash2 color="red" />
                        </Button>
                      </div>
                    ))}
                    <Button className="ml-8">
                      <Plus />
                      Add Answer
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="space-y-2">
                  <Label>Order</Label>
                  <Select defaultValue={"false"}>
                    <SelectTrigger className="w-56 bg-sidebar">
                      <SelectValue placeholder="Choices order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="false">Keep in current order</SelectItem>
                      <SelectItem value="true">Randomize choices order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Time Limit (in min)</Label>
                  <Input className="w-32" defaultValue={2} type="number" placeholder="Timer in Min" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Point</Label>
                  <Input defaultValue={5} className="w-24" type="number" placeholder="Points" />
                </div>
              </div>
            </div>
          ))}
        </section>
        {/* Sidebar */}
        <aside className="w-3/12 h-full space-y-4 bg-sidebar p-4 border-l">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium">Questions </span>
            <Button variant={"outline"} size={"icon"} className="p-0.5 size-fit  rounded-full">
              <Plus />
            </Button>
          </div>
          {Array.from({ length: 1 }).map((_x, i) => (
            <div className="p-4 rounded-xl border bg-background space-y-3 cursor-pointer" key={i}>
              <div className="flex items-center gap-2 ">
                <span className="font-instrumental-sans bg-secondary font-bold size-6 text-sm flex items-center justify-center rounded-full border shrink-0">
                  {i + 1}
                </span>
                <h4 className="truncate font-medium">What is software development?</h4>
              </div>
              <div className="flex items-center text-xs font-medium justify-between flex-wrap">
                <div>
                  <span className="p-2 py-0.5 bg-secondary rounded-md border">Multiple Choice</span>
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
