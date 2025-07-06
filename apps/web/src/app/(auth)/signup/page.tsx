"use client";

import { ArrowUpRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@quibly/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@quibly/ui/components/form";
import { Input } from "@quibly/ui/components/input";
import { useForm, zodResolver } from "@quibly/utils/hook-form";
import { RegistrationFormData, registrationSchema } from "@quibly/utils/validations";
import AuthFormWrapper from "../components/auth-form-wrapper";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading] = useState(false);
  const [error] = useState("");

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    console.log(data);
  };

  return (
    <AuthFormWrapper>
      <div>
        <h1 className="text-3xl font-medium">Create an Account</h1>
        <p className="text-muted-foreground text-sm">Enter your details to get started</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter your full name" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Enter your email" className="pl-10" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-xs text-muted-foreground">
            Password must contain at least 8 characters, including letters, numbers, and special characters.
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>

      <div className="text-sm  text-center text-muted-foreground flex gap-1 justify-center">
        Already have an account?{" "}
        <Link href="/login" className="text-primary flex items-center gap-1 hover:underline font-medium">
          <span>Sign in</span>
          <ArrowUpRight size={16} className="" />
        </Link>
      </div>
    </AuthFormWrapper>
  );
};

export default SignupPage;
