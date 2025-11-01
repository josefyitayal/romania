"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CongraPage() {
    const searchParams = useSearchParams()
    const otpCodeQuery = searchParams.get("otp")

    return (
        <main className="py-48 min-h-screen bg-gray-50 text-gray-900">
            <section className="max-w-2xl mx-auto px-6 py-20">
                <header className="mb-8 border-b pb-4">
                    <h1 className="text-3xl font-semibold tracking-tight text-blue-900">
                        Submission Received
                    </h1>
                </header>

                <p className="text-lg leading-relaxed mb-6">
                    Thank you for submitting your information. Store you verification code safely
                    , you may confirm your submission using our official Code Checker tool after 24 hours.
                </p>

                <p className="text-xl">
                    Your code: <code className="rounded-md text-muted-foreground bg-accent">{otpCodeQuery}</code>
                </p>

                <div className="mt-8">
                    <Link href="/code-checker">
                        <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                            Go to Code Checker
                        </Button>
                    </Link>
                </div>
            </section>
        </main>
    )
}
