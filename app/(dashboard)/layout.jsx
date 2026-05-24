import Sidebar from "@/components/ui/dashboard/Sidebar";

export default function layout({ children }) {
  return (
    <div className="relative">
      <Sidebar/>
      {children}
    </div>
  );
}
