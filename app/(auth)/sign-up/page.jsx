"use client"
// import { SignUp } from "@clerk/nextjs"
import SignUpForm from "@/components/forms/auth/SignUpForm"
import ClerkSignUpForm from "@/components/forms/auth/ClerkSignUpForm"

export default function SignUpPage() {
    return (
        <ClerkSignUpForm />
        // <SignUpForm />
        // <SignUp />
    )
}