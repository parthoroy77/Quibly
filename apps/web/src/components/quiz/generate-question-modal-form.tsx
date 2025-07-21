"use client";
import { generateQuestions } from "@/actions/quiz";
import { AuroraText } from "@/components/shared/aurora-text";
import { Button } from "@quibly/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@quibly/ui/components/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@quibly/ui/components/form";
import { Label } from "@quibly/ui/components/label";
import { RadioGroup, RadioGroupItem } from "@quibly/ui/components/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@quibly/ui/components/select";
import { Slider } from "@quibly/ui/components/slider";
import { toast } from "@quibly/ui/components/sonner";
import { Textarea } from "@quibly/ui/components/textarea";
import { cn } from "@quibly/ui/lib/utils";
import { useForm, UseFormReturn, zodResolver } from "@quibly/utils/hook-form";
import { QuestionType } from "@quibly/utils/types";
import {
  CreateQuestionFormData,
  GenerateQuestionFormData,
  GenerateQuestionValidationSchema,
} from "@quibly/utils/validations";
import { Clock, Loader, Minus, Plus, Sparkles } from "lucide-react";
import { useState } from "react";

const questionTypeOptions = [
  { value: "mixed", label: "Mixed Types", icon: "🎲" },
  { value: QuestionType.multiple_choice_single, label: "Multiple Choice (Single)", icon: "⚪" },
  { value: QuestionType.multiple_choice_multi, label: "Multiple Choice (Multi)", icon: "🔘" },
  { value: QuestionType.true_false, label: "True/False", icon: "✅" },
  { value: QuestionType.short_answer, label: "Short Answer", icon: "✍️" },
];

const difficultyOptions = [
  { value: "easy", label: "Easy", color: "text-green-600", bg: "bg-green-50" },
  { value: "medium", label: "Medium", color: "text-yellow-600", bg: "bg-yellow-50" },
  { value: "hard", label: "Hard", color: "text-red-600", bg: "bg-red-50" },
];

const GenerateQuestionModalForm = ({ builderForm }: { builderForm: UseFormReturn<CreateQuestionFormData> }) => {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<GenerateQuestionFormData>({
    resolver: zodResolver(GenerateQuestionValidationSchema),
    defaultValues: {
      numberOfQsn: 1,
      timeLimitPerQuestion: 1,
    },
  });

  const onSubmit = async (data: GenerateQuestionFormData) => {
    setIsGenerating(true);
    try {
      const response = await generateQuestions(data);
      if (response.success) {
        const generatedQsn = response.data || [];
        const currentValues = builderForm.getValues("questions");
        // Merge values in correct order
        const mergedValues = [
          ...currentValues,
          ...generatedQsn?.map((el, i) => ({
            ...el,
            index: currentValues.length + i,
          })),
        ];
        builderForm.setValue("questions", mergedValues);
        toast.success(response.message);
        setOpen(false);
        form.reset();
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to generate question try again later");
      setOpen(false);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogOverlay className="backdrop-blur-xs" />
        <DialogTrigger asChild>
          <Button type="button" variant={"secondary"} className="gap-2">
            Generate from AI
            <Sparkles className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="!max-w-2xl">
          <DialogHeader className={cn(isGenerating && "hidden")}>
            <DialogTitle className="font-instrumental-serif text-3xl font-semibold">
              Generate Quiz Questions from AI
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Create a quiz in just a few clicks! Generate questions instantly with AI.
            </DialogDescription>
          </DialogHeader>
          {isGenerating ? (
            <LoadingScreen />
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                {/* Topic Field */}
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your question topic here!"
                          className="min-h-[80px] resize-none bg-sidebar"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-end">
                        {field.value?.length || 0}/300 characters (minimum 20)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Difficulty Level */}
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-3">
                          {difficultyOptions.map((option) => (
                            <div
                              key={option.value}
                              className={cn(
                                "flex-1 flex items-center space-x-3 cursor-pointer px-4 py-2 border-2 rounded-xl"
                              )}
                            >
                              <RadioGroupItem value={option.value} id={option.value} className="peer" />
                              <Label htmlFor={option.value} className="transition-all font-medium">
                                {option.label}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-3 gap-3">
                  {/* Type  */}
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="col-span-2 relative">
                        <FormLabel>Question Type</FormLabel>
                        <FormControl className="h-10">
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select quiz type" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              {questionTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center gap-2">
                                    <span>{option.icon}</span>
                                    <span>{option.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Number of Questions */}
                  <FormField
                    control={form.control}
                    name="numberOfQsn"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Question</FormLabel>
                        <FormControl className="h-9">
                          <div className="flex *:shadow-xs items-center justify-between gap-1 *:border *:rounded-lg">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="size-9 p-0"
                              onClick={() => field.onChange(Math.max(1, field.value - 1))}
                              disabled={field.value <= 1}
                            >
                              <Minus size={16} />
                            </Button>
                            <div className="flex-1 text-center bg-sidebar flex items-center justify-center h-full font-medium">
                              {field.value}
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="size-9 p-0"
                              onClick={() => field.onChange(Math.min(5, field.value + 1))}
                              disabled={field.value >= 5}
                            >
                              <Plus size={16} />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Time Limit */}
                <FormField
                  control={form.control}
                  name="timeLimitPerQuestion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time per Question</FormLabel>
                      <FormControl>
                        <div className="space-y-1">
                          <div className="px-4 py-3 bg-sidebar rounded-xl border">
                            <Slider
                              min={1}
                              max={5}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                              className="w-full"
                            />
                            <div className="flex justify-between text-xs text-primary mt-2 font-instrumental-sans font-medium">
                              <span>1 min</span>
                              <span>2 min</span>
                              <span>3 min</span>
                              <span>4 min</span>
                              <span>5 min</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-sidebar border font-instrumental-sans rounded-full text-sm font-medium">
                              <Clock className="h-3 w-3" />
                              {field.value} minute{field.value > 1 ? "s" : ""} per question
                            </span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isGenerating}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 gap-2 min-w-[140px]"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate Quiz
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <div className="h-96 flex flex-col justify-center items-center space-y-5 p-8">
      <Loader size={30} className="animate-spin text-primary" />
      <div className="text-center space-y-2">
        <AuroraText className="text-2xl inline-block font-semibold font-instrumental-serif tracking-wide">
          Generating Your Quiz
        </AuroraText>
        <p className="text-muted-foreground max-w-md text-sm">
          Our AI is crafting personalized questions based on your topic. This may take a few moments...
        </p>
      </div>
    </div>
  );
};

export default GenerateQuestionModalForm;
