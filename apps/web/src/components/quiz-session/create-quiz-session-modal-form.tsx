"use client";

import { getUserQuizzes } from "@/actions/quiz";
import { Button } from "@quibly/ui/components/button";
import { DateTimePicker } from "@quibly/ui/components/date-time-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@quibly/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@quibly/ui/components/form";
import { RadioGroup, RadioGroupItem } from "@quibly/ui/components/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@quibly/ui/components/select";
import { useForm, zodResolver } from "@quibly/utils/hook-form";
import type { Quiz } from "@quibly/utils/types";
import { type CreateQuizSessionFormData, CreateQuizSessionSchema } from "@quibly/utils/validations";
import { IconStack2 } from "@tabler/icons-react";
import { useEffect, useState, useTransition } from "react";

const CreateQuizSessionModalForm = ({ quizId }: { quizId?: string }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, startTransition] = useTransition();

  const form = useForm<CreateQuizSessionFormData>({
    resolver: zodResolver(CreateQuizSessionSchema),
    defaultValues: {
      quizId: quizId || "",
    },
  });

  const sessionType = form.watch("type");

  const onSubmit = async (data: CreateQuizSessionFormData) => {
    startTransition(async () => {});
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await getUserQuizzes();
      setQuizzes(result);
    };

    if (isOpen) {
      fetchQuestions();
    }
  }, [isOpen]);
  console.log(form.watch());

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <IconStack2 size={16} />
          <span>Create Session</span>
        </Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="!max-w-xl">
        <DialogHeader className="flex justify-center items-center flex-col">
          <DialogTitle className="font-instrumental-serif text-2xl font-semibold">Create Quiz Session</DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs md:text-sm">
            Create a quiz session in just a few clicks!
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Quiz Selection */}
            <FormField
              control={form.control}
              name="quizId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Quiz</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a quiz" />
                      </SelectTrigger>
                      <SelectContent>
                        {quizzes.map((quiz) => (
                          <SelectItem key={quiz.id} value={quiz.id}>
                            {quiz.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Session Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col *:space-y-0.5"
                    >
                      <div>
                        <div className="flex border px-4 py-2 bg-sidebar rounded-xl items-center space-x-3 space-y-0">
                          <RadioGroupItem value="live" />
                          <FormLabel className="font-normal">Live Session</FormLabel>
                        </div>
                        <span className="block text-xs text-muted-foreground">
                          Students join with a code. You control the quiz live.
                        </span>
                      </div>
                      <div>
                        <div className="flex border px-4 py-2 bg-sidebar rounded-xl items-center space-x-3 space-y-0">
                          <RadioGroupItem value="scheduled" />
                          <FormLabel className="font-normal">Scheduled Session</FormLabel>
                        </div>
                        <span className="block text-xs text-muted-foreground">
                          Set a time window. Students take the quiz at their own pace during that period.
                        </span>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex *:w-full gap-3">
              {/* Start Time - Always shown */}
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel> Start Time </FormLabel>
                    <FormControl>
                      <DateTimePicker
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={"Select start time of session"}
                        disableDateBeforeToday
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* End Time - Only shown for scheduled sessions */}
              {sessionType === "scheduled" && (
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Time </FormLabel>
                      <FormControl>
                        <DateTimePicker
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={"Select end time of session"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Session"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuizSessionModalForm;
