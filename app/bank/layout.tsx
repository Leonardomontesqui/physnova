import NavBar from "../components/(ui)/(NavBars)/NavBar3";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <section className="flex-grow overflow-hidden">{children}</section>
    </div>
  );
}
