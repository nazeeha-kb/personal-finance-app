import AppShell from "@/components/layout/AppShell";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getOrCreateUser } from "@/lib/users";

export default async function Layout({ children }) {

  const { userId } = await auth()
  const clerkUser = await currentUser()

  const email = clerkUser.emailAddresses[0].emailAddress;
  const name = clerkUser.firstName

  const user = await getOrCreateUser(userId, email, name)

  return (
    <AppShell>
      <div className="sm:px-10 px-4 sm:py-8 py-6">
        {/* <Header /> */}
        {children}
      </div>
    </AppShell>
  );
}
