import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { userDetailsForm, UserDetailsForm } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function Version2Form() {
  const form = useForm<UserDetailsForm>({
    resolver: zodResolver(userDetailsForm),
    defaultValues: {
      name: "",
      age: undefined,
      message: "",
    },
  });

  const onSubmit = async (data: UserDetailsForm) => {
    toast.success(JSON.stringify(data, null, 2));
    form.reset();
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={form.handleSubmit(onSubmit)}
      id="user-details-form"
    >
      {/* name */}
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="name">Name</FieldLabel>

            <InputGroup>
              <Input
                {...field}
                id="name"
                placeholder="Enter your name"
                autoComplete="off"
              />
            </InputGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* age */}
      <Controller
        name="age"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="age">Age</FieldLabel>

            <InputGroup>
              <Input
                {...field}
                type="number"
                id="age"
                placeholder="Enter your age"
                autoComplete="off"
                value={field.value ?? ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? undefined : Number(e.target.value)
                  )
                }
              />
            </InputGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {/* message */}
      <Controller
        name="message"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="message">Message</FieldLabel>

            <InputGroup>
              <Textarea
                {...field}
                id="message"
                placeholder="Enter message"
                autoComplete="off"
              />
            </InputGroup>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Field>
        <Button type="submit" form="user-details-form">
          Submit
        </Button>
      </Field>
    </form>
  );
}
