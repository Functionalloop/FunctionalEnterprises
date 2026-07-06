import NavBar from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import BookingDrawer from "@/components/ui/BookingDrawer";
import { BookingProvider } from "@/lib/context/BookingContext";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BookingProvider>
      <ScrollProgressBar />
      <NavBar />
      {children}
      <Footer />
      {/* Global booking drawer — rendered at root so it overlays everything */}
      <BookingDrawer />
    </BookingProvider>
  );
}

