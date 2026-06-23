"use client"

import SignOutButton from "./SignOutButton";
import { Show } from "@clerk/nextjs";

export default function PageHeader({ title, action }) {

    return (
        <header className="flex justify-end items-center gap-4">
            <Show when="signed-in">
                <div className="flex w-full justify-between items-center">
                    <h1 className="text-2xl font-bold">
                        {title}
                    </h1>
                    <div className="flex items-center gap-6">
                        {
                            action && (action)
                        }
                        <SignOutButton />
                    </div>
                </div>
            </Show>
        </header>
    );
}