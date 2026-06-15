import AppShell from "@/components/layout/AppShell";
import { Show } from "@clerk/nextjs";

export default function Layout({ children }) {
  return (
    <AppShell>
      <Show when="signed-in">
        {children}
      </Show>
    </AppShell>
  );
}
