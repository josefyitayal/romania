"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkCode } from "@/actions/check-code";
import { redirect } from "next/navigation";
import { toast } from "sonner";

//241211

const codeCheckerSchema = z.object({
    code: z.string().min(6, "code must be 5 number").max(6, "code must be 5 number")
})

export default function CodeCheckerPage() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: zodResolver(codeCheckerSchema),
        defaultValues: {
            code: ""
        }
    })

    async function onSubmit(data) {
        console.log(data.code)
        const result = await checkCode(data.code)
        if (!result.errors) {
            redirect(`/congra?userId=${result.data.id}`)
        } else {
            if (!result.data.success) {
                setError("code", {
                    type: "manual",
                    message: result.errors.message
                })
                return;
            }
            toast.error(result.errors.message)
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 text-gray-900">
            <section className="max-w-2xl mx-auto px-6 py-20">
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-3xl font-semibold tracking-tight text-blue-900">
                        Verify Your Submission
                    </h1>
                </header>

                <p className="text-lg leading-relaxed mb-6">
                    If you've received a verification code, please enter it below to confirm your submission.
                    This helps us ensure the integrity and security of your request.
                </p>

                <form className="space-y-4 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="text"
                        {...register("code")}
                        placeholder="Enter your verification code"
                        className="bg-white border border-gray-300 focus-visible:ring-blue-500"
                    />
                    {errors.code && <span className="text-sm text-red-500">{errors.code.message}</span>}
                    <Button disabled={isSubmitting} className="bg-blue-700 hover:bg-blue-800 text-white">
                        {isSubmitting ? "Verifing" : "Verify code"}
                    </Button>
                </form>
            </section>
        </main>
    );
}
