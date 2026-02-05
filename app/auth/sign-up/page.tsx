"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signUpSchema } from "../schemas/auth";
import { Input } from "@/components/ui/input";
import z from "zod";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Signup() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
        }
    });

    async function onSubmit(data: z.infer<typeof signUpSchema>) {
        await authClient.signUp.email({
            email: data.email,
            name: data.name,
            password: data.password,
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Signup</CardTitle>
                <CardDescription>Create an account to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-5">
                        <Controller name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Full Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="RK Razz" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                                    )}
                                </Field>
                            )} />
                        <Controller name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="abc@gmail.com" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                                    )}
                                </Field>
                            )} />
                        <Controller name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Password</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="******" type="password" {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={fieldState.error ? [fieldState.error] : []} />
                                    )}
                                </Field>
                            )} />
                        <Button className="cursor-pointer">Sign up</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}