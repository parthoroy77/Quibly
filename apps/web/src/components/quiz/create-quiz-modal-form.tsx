"use client";
import { Button } from "@quibly/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@quibly/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@quibly/ui/components/form";
import { Input } from "@quibly/ui/components/input";
import { Textarea } from "@quibly/ui/components/textarea";
import { useForm, zodResolver } from "@quibly/utils/hook-form";
import { CreateQuizFormData, CreateQuizSchema } from "@quibly/utils/validations";
import { Sparkle } from "lucide-react";
import { useState } from "react";

const CreateQuizModalForm = () => {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateQuizFormData>({
    resolver: zodResolver(CreateQuizSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const watchDescription = form.watch("description");
  const maxDescriptionLength = 500;

  const onSubmit = (data: CreateQuizFormData) => {
    // Handle form submission here
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Sparkle className="w-4 h-4" />
          <span>Create Quiz</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="!max-w-2xl space-y-3">
        <DialogHeader>
          <DialogTitle className="font-instrumental-serif text-3xl font-semibold text-center">
            Create New Quiz
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Create a quiz in just a few clicks! Generate questions instantly with AI or add your own manually.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your quiz title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <div className="space-y-1">
                      <Textarea
                        placeholder="Write your quiz description here..."
                        className="min-h-[100px]"
                        style={{ height: "auto" }}
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = "auto";
                          target.style.height = target.scrollHeight + "px";
                        }}
                        {...field}
                      />
                      <div className="flex justify-between text-xs">
                        <span
                          className={`${
                            watchDescription?.length > maxDescriptionLength * 0.9
                              ? "text-red-500"
                              : watchDescription?.length > maxDescriptionLength * 0.7
                                ? "text-yellow-500"
                                : "text-muted-foreground"
                          }`}
                        >
                          {watchDescription?.length || 0} / {maxDescriptionLength}
                        </span>
                        <span
                          className={`${
                            watchDescription?.length > maxDescriptionLength * 0.9
                              ? "text-red-500"
                              : "text-muted-foreground"
                          }`}
                        >
                          {maxDescriptionLength - (watchDescription?.length || 0)} characters remaining
                        </span>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 ">
              <Button variant="destructive" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Creating..." : "Create Quiz"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateQuizModalForm;
