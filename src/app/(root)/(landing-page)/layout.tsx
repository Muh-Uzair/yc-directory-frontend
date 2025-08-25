import LayoutHeader from "@/components/LayoutHeader";
import "@/styles/globals.css";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <LayoutHeader />
      <div className="pt-[50px]">{children}</div>
    </div>
  );
}
