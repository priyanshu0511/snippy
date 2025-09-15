import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="w-2/12">
          <Sidebar />
        </div>
        <main className="w-10/12">{children}</main>
      </div>
    </>
  );
}
