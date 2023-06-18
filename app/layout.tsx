import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import ProviderWrapper from "./ProvidersWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LNMDocs Admin",
  description: "Admin Portal fro LNMDocs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <ProviderWrapper>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </ProviderWrapper>
    </html>
  );
}
