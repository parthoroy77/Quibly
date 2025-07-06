"use client";

import { ArrowUpRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@quibly/ui/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@quibly/ui/components/form";
import { Input } from "@quibly/ui/components/input";
import { useForm, zodResolver } from "@quibly/utils/hook-form";
import { LoginFormData, loginSchema } from "@quibly/utils/validations";
import AuthFormWrapper from "../components/auth-form-wrapper";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading] = useState(false);
  const [error] = useState("");

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
  };

  const handleGoogleSignIn = async () => {
    // handle google signIn
  };

  return (
    <AuthFormWrapper>
      <div>
        <h1 className="text-3xl font-medium">Login</h1>
        <p className="text-muted-foreground text-sm">Hi, Welcome Back</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <div className="flex items-center gap-2 justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link href="/forgot-password" className="text-sm text-center text-primary hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 "
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>

      <div className="text-sm  text-center text-muted-foreground flex gap-1 justify-center">
        Not registered yet?
        <Link href="/signup" className="text-primary flex items-center gap-1 hover:underline font-medium">
          <span>Create an account</span>
          <ArrowUpRight size={16} className="" />
        </Link>
      </div>
    </AuthFormWrapper>
  );
};

export default LoginPage;
