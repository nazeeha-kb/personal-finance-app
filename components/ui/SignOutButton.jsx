import { SignOutIcon } from "@phosphor-icons/react";
import { useClerk } from "@clerk/nextjs";
import { Show } from "@clerk/nextjs";

export default function SignOutButton() {

    const { signOut } = useClerk();
    return (
        <Show when="signed-in">
            <button className="text-grey-500 hover:text-white focus:text-white flex items-center gap-3 sm:p-4 p-5 border-grey-500 border rounded-[8px] hover:bg-grey-500 focus:bg-grey-500 font-semibold"

                onClick={() => {
                    signOut({
                        redirectUrl: "/sign-in"
                    })
                }}>
                <SignOutIcon weight="bold" />
                <span className="sm:block hidden"> Sign Out </span>
            </button>
        </Show >
    )

}