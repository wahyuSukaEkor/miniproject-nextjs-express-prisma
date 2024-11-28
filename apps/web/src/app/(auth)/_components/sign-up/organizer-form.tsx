"use client";

import InputForm from "../input-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrganizerSchema, organizerSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { registerUser } from "@/data/auth";
import axios from "axios";

const OrganizerForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrganizerSchema>({
    resolver: zodResolver(organizerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: OrganizerSchema) => {
    const { email, password, username } = values;

    try {
      const promise = registerUser({
        email,
        password,
        username,
        isAdmin: true,
      });

      toast.promise(promise, {
        loading: "Loading...",
        success: (data) => {
          return data.message;
        },
      });

      await promise;
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Organizers</CardTitle>
          <CardDescription>
            As an event organizer, you have robust capabilities to manage
            events, transactions, and gather feedback from participants.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 ">
          <InputForm
            id="username"
            label="Username"
            placeholder="John Doe"
            type="text"
            register={register}
            error={errors.username}
          />
          <InputForm
            id="email"
            label="Email"
            placeholder="johndoe@mail.com"
            type="text"
            register={register}
            error={errors.email}
          />
          <InputForm
            id="password"
            label="Password"
            placeholder="********"
            type="password"
            register={register}
            error={errors.password}
          />
          <InputForm
            id="confirmPassword"
            label="Confirm Password"
            placeholder="********"
            type="password"
            register={register}
            error={errors.confirmPassword}
          />
        </CardContent>
        <CardFooter className="flex-col gap-4 ">
          <Button
            type="submit"
            size="sm"
            disabled={isSubmitting}
            className="w-full gap-2 md:h-10 md:px-4 md:py-2"
          >
            Sign Up
          </Button>
          <span className="text-xs md:text-sm">
            Have an account?{" "}
            <Link href="/sign-in" className="font-bold underline">
              Sign In
            </Link>
          </span>
        </CardFooter>
      </form>
    </Card>
  );
};

export default OrganizerForm;
