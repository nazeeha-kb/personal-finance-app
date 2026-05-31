import Input from "@/components/ui/Input"
import { EyeIcon } from "@phosphor-icons/react"
import Button from "@/components/ui/Button"
import Link from "next/link"

export default function SignUpForm() {
    return (
        <article className="w-full max-w-xl p-8 rounded-xl bg-white mx-5">
            <form action="" className="flex flex-col gap-8">
                <h1 className="text-2xl font-bold">Sign In</h1>
                <div className="flex flex-col gap-4">
                    <Input type="text" id={"name"} label={"Name"} />
                    <Input type="email" id="email" label="Email" />
                    <Input type="password" id="password" label="Create Password" rightIcon={EyeIcon} iconWeight={"fill"} helperText={"Passwords must be at least 8 characters"} />
                </div>
                <Button type="submit" text="Sign in" variant="primary" className="w-full" />
                <p className="self-center text-grey-500">Already have an account? <Link href="/signin" className="text-grey-900 font-semibold underline">Sign In</Link></p>
            </form>
        </article>
    )
}