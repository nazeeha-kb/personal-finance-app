import Input from "@/components/ui/Input"
import { EyeIcon } from "@phosphor-icons/react"
import Button from "@/components/ui/Button"
import Link from "next/link"

export default function SignUpForm() {
    return (
        <article className="bg-white md:w-xl sm:w-[80vw] w-[90vw] p-8 rounded-xl">
            <form action="" className="flex flex-col gap-8">
                <h1 className="text-2xl font-bold">Sign In</h1>
                <div className="flex flex-col gap-4">
                    <Input type="email" id="email" label="Email" />
                    <Input type="password" id="password" label="Password" rightIcon={EyeIcon} iconWeight={"fill"} />
                </div>
                <Button type="submit" text="Sign in" variant="primary" className="w-full" />
                <p className="self-center text-grey-500">Need to Create an Account? <Link href="/signup" className="text-grey-900 font-semibold underline">Sign Up</Link></p>
            </form>
        </article>
    )
}