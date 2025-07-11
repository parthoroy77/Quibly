import { Button } from "@quibly/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@quibly/ui/components/form";
import { Input } from "@quibly/ui/components/input";
import { Label } from "@quibly/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@quibly/ui/components/select";
import { Separator } from "@quibly/ui/components/separator";
import SingleFileUpload from "@quibly/ui/components/single-file-uploader";
import { Switch } from "@quibly/ui/components/switch";
import { Textarea } from "@quibly/ui/components/textarea";
import { toNormalCase } from "@quibly/utils/functions";
import { useFieldArray, UseFormReturn } from "@quibly/utils/hook-form";
import { QuestionType } from "@quibly/utils/types";
import { CreateQuestionFormData } from "@quibly/utils/validations";
import { FileQuestion, GripVertical, Plus, Trash2 } from "lucide-react";
import { FC, useState } from "react";

interface Props {
  form: UseFormReturn<CreateQuestionFormData>;
}

const QuestionBuilderForm: FC<Props> = ({ form }) => {
  const { fields: questions, remove: removeQuestion } = useFieldArray({
    control: form.control,
    name: `questions`,
  });
  return (
    <Form {...form}>
      <form className="h-full flex-1 space-y-5 p-4 w-full">
        {questions.map((_, i) => (
          <QuestionCard key={i} form={form} questionIndex={i} removeQuestion={() => removeQuestion(i)} />
        ))}
      </form>
    </Form>
  );
};

interface CardProps {
  questionIndex: number;
  form: Props["form"];
  removeQuestion: () => void;
}
const QuestionCard: FC<CardProps> = ({ questionIndex, form, removeQuestion }) => {
  const [media, setMedia] = useState(false);
  const {} = useFieldArray({
    control: form.control,
    name: `questions.${questionIndex}.options`,
  });
  return (
    <div className="border *:p-3 divide-y rounded-xl w-full h-fit [&_input]:bg-sidebar [&_textarea]:bg-sidebar">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-1 text-sm font-medium">
          <FileQuestion size={16} />
          <span>Question {questionIndex + 1}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name={`questions.${questionIndex}.type`}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange} value={field.value}>
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
                <Textarea {...field} maxLength={100} placeholder="What is 2 + 2?" className="resize-none" />
              </FormControl>
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
