"use client"

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useSignUp, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function VerificationForm({ error }) {
    const [code, setCode] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    const router = useRouter()
    const { setActive } = useClerk()
    const { signUp } = useSignUp()

    // Verification
    async function onPressVerify(e) {
        e.preventDefault()

        setIsLoading(true)
        if (isLoading) return

        try {
            signUp.verifications.verifyEmailCode({
                code
            })

            if (signUp.status === "complete") {
                await setActive({
                    session: signUp.createdSessionId
                })

                router.push("/overview")
                console.log("Pushed to /overview")
            }

        } catch (err) {
            console.log("VERIFY ERROR")
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <article className="gap-8 flex flex-col">
            <h1 className="text-2xl font-bold">Verify Your Email</h1>

            <form onSubmit={onPressVerify} className="space-y-4">
                <Input label="Code" id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter verification code" required />
                {error && (
                    <div>{error}</div>
                )}
                <Button variant="primary" text="Verify Email" className="w-full" type="submit" />
            </form>

            <p className="self-center text-grey-500">Already have an account?
                <Link href="/signin" className="pl-1 text-grey-900 font-semibold underline">Sign In</Link>
            </p>

        </article>

    )
}