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
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Signup() {
    const form = useForm({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    function onSubmit() {
        console.log("Submitted")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>signin to create or read the blog</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-5">
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
                        <Button className="cursor-pointer">Login</Button>
                    </FieldGroup>
                </form>
                <p className="text-center mt-2.5">Don't have an account? Create one<span className="text-red-600 ml-2 underline hover:text-blue-500"> <Link href="/auth/sign-up">Signup</Link> </span></p>
            </CardContent>
        </Card>
    )
}