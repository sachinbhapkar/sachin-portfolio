import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sachin Bhapkar | Java Backend Engineer",
  description:
    "Java Backend Engineer with 4.5+ years of experience building and scaling Spring Boot and Spring Cloud microservices. Expert in AWS, Docker, and distributed systems.",
  keywords: [
    "Sachin Bhapkar",
    "Java Backend Engineer",
    "Spring Boot",
    "Spring Cloud",
    "Microservices",
    "AWS",
    "Software Engineer",
    "Pune",
  ],
  authors: [{ name: "Sachin Bhapkar" }],
  openGraph: {
    title: "Sachin Bhapkar | Java Backend Engineer",
    description:
      "Java Backend Engineer with 4.5+ years of experience building and scaling Spring Boot and Spring Cloud microservices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0f172a] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
