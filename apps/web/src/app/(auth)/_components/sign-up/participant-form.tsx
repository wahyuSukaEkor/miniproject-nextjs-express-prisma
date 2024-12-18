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
import { ParticipantSchema, participantSchema } from "@/schemas/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import axios from "axios";
import { registerUser } from "@/data/auth";

const ParticipantForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ParticipantSchema>({
    resolver: zodResolver(participantSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      referal_code: "",
    },
  });

  const onSubmit = async (values: ParticipantSchema) => {
    const { email, password, username, referal_code } = values;

    try {
      const promise = registerUser({
        email,
        password,
        username,
        referral_code: !referal_code.length ? undefined : referal_code,
        isAdmin: false,
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
          <CardTitle>Participants</CardTitle>
          <CardDescription>
            When you register as a participant, you can browse available events,
            purchase tickets for events, and provide feedback on the events you
            have attended.
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
          <InputForm
            id="referal_code"
            label="Referral Code"
            type="text"
            register={register}
            error={errors.referal_code}
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

export default ParticipantForm;
