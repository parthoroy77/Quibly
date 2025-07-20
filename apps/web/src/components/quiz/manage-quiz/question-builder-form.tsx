import { batchQuestions } from "@/actions/quiz";
import {
  createMultipleChoiceOptions,
  createShortAnswerOption,
  handleAddNewQuestion,
  TRUE_FALSE_OPTIONS,
} from "@/utilities/quiz";
import { Button } from "@quibly/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@quibly/ui/components/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@quibly/ui/components/form";
import { Input } from "@quibly/ui/components/input";
import { Label } from "@quibly/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@quibly/ui/components/select";
import { Separator } from "@quibly/ui/components/separator";
import SingleFileUpload from "@quibly/ui/components/single-file-uploader";
import { toast } from "@quibly/ui/components/sonner";
import { Switch } from "@quibly/ui/components/switch";
import { Textarea } from "@quibly/ui/components/textarea";
import { cn } from "@quibly/ui/lib/utils";
import { toNormalCase } from "@quibly/utils/functions";
import { useFieldArray, UseFormReturn } from "@quibly/utils/hook-form";
import { QuestionType } from "@quibly/utils/types";
import { CreateQuestionFormData } from "@quibly/utils/validations";
import { FileQuestion, GripVertical, Plus, SaveAll, Trash2 } from "lucide-react";
import { FC, RefObject, useState, useTransition } from "react";

interface Props {
  form: UseFormReturn<CreateQuestionFormData>;
  containerRef: RefObject<HTMLFormElement | null>;
  questionRefs: RefObject<{
    [id: number]: HTMLDivElement | null;
  }>;
  selected: number;
}

const QuestionBuilderForm: FC<Props> = ({ form, containerRef, questionRefs, selected }) => {
  const [isPending, startTransition] = useTransition();
  const { fields: questions, remove: removeQuestion } = useFieldArray({
    control: form.control,
    name: `questions`,
  });

  const removeQsn = (idx: number) => {
    const question = questions[idx];
    if (!question) return;

    if (question.questionId) {
      form.setValue(
        "questions",
        questions.map((q) => (q.questionId === question.questionId ? { ...q, mode: "delete" } : q))
      );
    } else {
      removeQuestion(idx);
    }
  };

  const onSubmit = async (values: CreateQuestionFormData) => {
    const toastId = toast.loading("Processing your request", { duration: 2000 });
    const create = values.questions.filter((q) => q.mode === "create");
    const update = values.questions.filter((q) => q.mode === "update");
    const remove = values.questions.filter((q) => q.mode === "delete").map((q) => q.questionId);
    startTransition(async () => {
      const result = await batchQuestions({ create, update, remove }, values.quizId);
      if (result.success) {
        toast.success(result.message, { id: toastId });
      } else {
        toast.error(result.message, { id: toastId });
      }
    });
  };

  // Filter out deleted questions and create a mapping for proper indexing
  const visibleQuestions = questions.filter((q) => q.mode !== "delete");
  const questionIndexMap = new Map();
  let visibleIndex = 0;
  questions.forEach((q, originalIndex) => {
    if (q.mode !== "delete") {
      questionIndexMap.set(originalIndex, visibleIndex);
      visibleIndex++;
    }
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full overflow-y-scroll flex-1 space-y-5 p-4 w-full scrollbar-hidden"
        ref={containerRef}
      >
        <div className="flex items-center justify-end gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>
                <Plus />
                Add new
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
          {!!visibleQuestions.length && (
            <Button disabled={isPending} type="submit" variant={"default"}>
              <SaveAll />
              {isPending ? "...Saving" : "Save"}
            </Button>
          )}
        </div>
        {visibleQuestions.map((q, visibleIdx) => {
          // Find the original index in the questions array
          const originalIndex = questions.findIndex((question) => question.id === q.id);

          return (
            <QuestionCard
              key={`${q.id}-${visibleIdx}`} // Use a combination of id and visible index
              form={form}
              questionIndex={originalIndex} // Use original index for form field names
              displayIndex={visibleIdx} // Use visible index for display
              removeQuestion={() => removeQsn(originalIndex)}
              questionRefs={questionRefs}
              selected={selected}
            />
          );
        })}
      </form>
    </Form>
  );
};

interface CardProps {
  questionIndex: number; // Original index in the form array
  displayIndex: number; // Index for display purposes
  form: Props["form"];
  removeQuestion: () => void;
  questionRefs: RefObject<{
    [id: number]: HTMLDivElement | null;
  }>;
  selected: number;
}

const QuestionCard: FC<CardProps> = ({ questionIndex, displayIndex, questionRefs, form, removeQuestion, selected }) => {
  const [media, setMedia] = useState(false);
  const {
    append: appendOption,
    fields: options,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: `questions.${questionIndex}.options`,
  });
  const questionType = form.watch(`questions.${questionIndex}.type`);

  const addNewOption = () => {
    appendOption({
      index: options.length,
      isCorrect: false,
      text: "",
    });
  };

  const handleCorrectAnswerChange = (optionIndex: number) => {
    if (questionType === QuestionType.multiple_choice_single) {
      // For single choice, uncheck all others
      options.forEach((_, index) => {
        form.setValue(`questions.${questionIndex}.options.${index}.isCorrect`, index === optionIndex);
      });
    }
  };

  const handleTypeChange = (type: QuestionType) => {
    removeOption();
    switch (type) {
      case "multiple_choice_multi":
        appendOption(createMultipleChoiceOptions());
        break;
      case "multiple_choice_single":
        appendOption(createMultipleChoiceOptions());
        break;
      case "short_answer":
        appendOption(createShortAnswerOption());
        break;
      case "true_false":
        appendOption(TRUE_FALSE_OPTIONS);
    }
  };

  const handleRemoveOption = (idx: number) => {
    const option = options[idx];
    if (!option) return;

    if (option.optionId) {
      form.setValue(
        `questions.${questionIndex}.options`,
        options.map((o) => (o.optionId === option.optionId ? { ...o, mode: "delete" } : o))
      );
    } else {
      removeOption(idx);
    }
  };

  return (
    <div
      ref={(el) => {
        questionRefs.current[displayIndex] = el; // Use display index for refs
      }}
      className={cn(
        "border *:p-3 divide-y rounded-xl w-full h-fit [&_input]:bg-sidebar [&_textarea]:bg-sidebar",
        selected === displayIndex && "border-accent shadow-sm" // Use display index for selection
      )}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-1 text-sm font-medium">
          <FileQuestion size={16} />
          <span>Question {displayIndex + 1}</span> {/* Use display index for numbering */}
        </div>
        <div className="flex items-center gap-2">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name={`questions.${questionIndex}.type`}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleTypeChange(value as QuestionType);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-56 capitalize bg-sidebar">
                        <SelectValue placeholder="Question Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(QuestionType).map((type, i) => (
                        <SelectItem key={i} value={type} className="capitalize">
                          {toNormalCase(type)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Separator orientation="vertical" className=" data-[orientation=vertical]:h-4" />
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name={`questions.${questionIndex}.required`}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel>Required</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Separator orientation="vertical" className=" data-[orientation=vertical]:h-4" />
          <div className="flex items-center gap-2">
            <Label>Media </Label>
            <Switch checked={media} onCheckedChange={setMedia} />
          </div>
          <Separator orientation="vertical" className=" data-[orientation=vertical]:h-4" />
          <Button type="button" onClick={removeQuestion} variant={"outline"}>
            <Trash2 />
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {media && (
          <div className="space-y-2">
            <Label>Media (Optional)</Label>
            <SingleFileUpload />
          </div>
        )}
        <FormField
          control={form.control}
          name={`questions.${questionIndex}.text`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <Textarea {...field} maxLength={100} placeholder="Write your question here!" className="resize-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`questions.${questionIndex}.explanation`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Explanation (optional)</FormLabel>
              <FormControl>
                <Textarea {...field} maxLength={400} placeholder="Write question explanation here!" />
              </FormControl>
            </FormItem>
          )}
        />
        {questionType !== "short_answer" && (
          <div className="space-y-2">
            <Label>Choices</Label>
            <div className="space-y-2">
              {options.map((option, optionIndex) => (
                <div key={option.id} className="h-9 flex gap-2 items-center">
                  {/* Correct Answer Selection */}
                  <FormField
                    control={form.control}
                    name={`questions.${questionIndex}.options.${optionIndex}.isCorrect`}
                    render={({ field, fieldState }) => {
                      const isError = !!fieldState.error;
                      return (
                        <FormItem>
                          <FormControl>
                            <input
                              type={questionType === QuestionType.multiple_choice_single ? "radio" : "checkbox"}
                              name={
                                questionType === QuestionType.multiple_choice_single
                                  ? `question-${questionIndex}-correct`
                                  : undefined
                              }
                              className={cn(
                                "size-4 mr-1 ml-1 rounded-full",
                                isError && "border-destructive ring-1 ring-destructive"
                              )}
                              checked={field.value}
                              onChange={(e) => {
                                if (questionType === QuestionType.multiple_choice_single) {
                                  handleCorrectAnswerChange(optionIndex);
                                } else {
                                  field.onChange(e.target.checked);
                                }
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />

                  {/* Option Text */}
                  <FormField
                    control={form.control}
                    name={`questions.${questionIndex}.options.${optionIndex}.text`}
                    render={({ field }) => (
                      <FormItem className="flex-1 h-full">
                        <FormControl>
                          <Input {...field} className="h-full" placeholder={`Option ${optionIndex + 1}`} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="button" size="icon" variant="ghost" className="size-fit border bg-sidebar h-full px-1">
                    <GripVertical />
                  </Button>

                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveOption(optionIndex)}
                    disabled={options.length <= 2}
                  >
                    <Trash2 color="red" />
                  </Button>
                </div>
              ))}

              <Button type="button" onClick={addNewOption} className="ml-8">
                <Plus />
                Add Answer
              </Button>
            </div>
          </div>
        )}
        {questionType === "short_answer" && (
          <FormField
            control={form.control}
            name={`questions.${questionIndex}.options.0.correctAnswer`}
            render={({ field }) => (
              <FormItem className="flex-1 h-full">
                <FormLabel>Correct Answer</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={"Write correct answer"} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
      </div>
      <div className="flex items-center gap-3">
        <FormField
          control={form.control}
          name={`questions.${questionIndex}.randomizeOrder`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order</FormLabel>
              <Select onValueChange={(value) => field.onChange(value === "true")} value={field.value.toString()}>
                <FormControl>
                  <SelectTrigger className="w-56 bg-sidebar">
                    <SelectValue placeholder="Choices order" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="false">Keep in current order</SelectItem>
                  <SelectItem value="true">Randomize choices order</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={`questions.${questionIndex}.timeLimit`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Limit (in min)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-32"
                  type="number"
                  placeholder="Timer in Min"
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`questions.${questionIndex}.points`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Points</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="w-24"
                  type="number"
                  placeholder="Points"
                  onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default QuestionBuilderForm;
