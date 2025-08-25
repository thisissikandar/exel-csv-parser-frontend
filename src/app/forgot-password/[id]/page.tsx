"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

const formSchema = z.object({
  newPassword: z.string().min(6, "Password must be at least 6 characters long"),
});

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("token", id);
    try {
      // Assuming an async reset password function
      console.log(values);
      api
        .post(`/users/reset-password/${id}`, values)
        .then((response) => {
          console.log(response);
          toast.success(
            "Password reset successful. You can now log in with your new password."
          );
        })
        .catch((error) => {
          console.error("Error in API call", error);
          toast.error("Failed to reset the password. Please try again.");
        });
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error("Failed to reset the password. Please try again.");
    }
  }

  return (
    <div className="flex min-h-[50vh] h-full w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* New Password Field */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="password">New Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id="password"
                          placeholder="******"
                          autoComplete="new-password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Reset Password
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
