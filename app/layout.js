import "./globals.css";

export const metadata = {
  title: "To Do List",
  description: "A localStorage powered task manager built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
