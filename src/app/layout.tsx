import "./globals.css";
import Header from "@/components/globals/Header";
import Footer from "@/components/globals/Footer";

export default function RootLayout({children,}:
                        Readonly<{children: React.ReactNode;}>)
{
  return (
    <html lang="es" className="h-full">

      <body className="flex flex-col h-full bg-gray-900 text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4 pb-4 bg-gray-900">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
