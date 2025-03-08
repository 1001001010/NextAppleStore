"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { loginUser } from "@/redux/slices/authSlice/asyncActions";
import { AtSign, User, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginUser(formData));

      if (resultAction.meta.requestStatus === "fulfilled") {
        router.push("/profile");
      } else if (resultAction.meta.requestStatus === "rejected") {
        const errorData = resultAction.payload;
        if (errorData) {
          setErrors((prev) => ({
            ...prev,
            username: errorData.usernameError,
            password: errorData.passwordError,
            email: errorData.emailError,
          }));
        } else {
          toast("Authorization Error", {
            description: "An error occurred during the authorization process.",
          });
        }
      }
    } catch (error) {
      toast("Server Error", {
        description: "Failed to connect to the server.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-auto shadow-lg border border-border">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className={`pl-10 ${
                    errors.email
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className={`pl-10 ${
                    errors.password
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {errors.password && (
                <p className="text-sm text-destructive mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <Button className="w-full mt-6" type="submit">
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Don't have an account?
          <a
            href="/register"
            className="text-primary font-medium ml-1 hover:underline"
          >
            Sign Up
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
