import AppShell from "@/components/layout/AppShell";
import { Show } from "@clerk/nextjs";
// import Header fro@/components/ui/PageHeaderder";

export default function Layout({ children }) {
  return (
    <AppShell>
      <div className="sm:px-10 px-4 sm:py-8 py-6">
        {/* <Header /> */}
        {children}
      </div>
    </AppShell>
  );
}
