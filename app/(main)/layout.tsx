import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgressBar />
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
