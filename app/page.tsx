"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userLoginSchema, UserLoginSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Homepage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<UserLoginSchema>({
    resolver: zodResolver(userLoginSchema),
  });

  const onSubmit = async (formData: UserLoginSchema) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.message || "Error logging in");
      const errors = data.errors;

      Object.keys(errors).forEach((key) => {
        setError(key as keyof UserLoginSchema, {
          message: errors[key as keyof UserLoginSchema],
        });
      });
    }
  };

  return (
    <main className="max-w-screen-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold tracking-tight text-primary">
        React Hook Form with Zod
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && (
            <p className="text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} />
          {errors.email && (
            <p className="text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-destructive">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-destructive">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button type="submit">Submit</Button>
          {/* form default reset don't reset the react hook form state so we need to use the reset function from react hook form */}
          <Button type="reset" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
        </div>
      </form>
    </main>
  );
};
export default Homepage;
