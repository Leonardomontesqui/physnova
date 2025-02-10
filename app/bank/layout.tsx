import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/nav-bar";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <NavBar notSticky={true}>
        <Button asChild>
          <Link href="/home">Exit</Link>
        </Button>
      </NavBar>
      <section className="flex-grow overflow-hidden">{children}</section>
    </div>
  );
}
