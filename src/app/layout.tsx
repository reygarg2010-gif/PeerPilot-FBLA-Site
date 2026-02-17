import "./globals.css";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "PeerPilot | Math Learning Platform",
  description:
    "PeerPilot helps students master math with resources, practice, and support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen bg-white text-slate-900">
          <div className="flex min-h-screen flex-col">
            <SiteNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
