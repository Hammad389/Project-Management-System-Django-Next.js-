import "./globals.css";

export const metadata = {
  title: "Nova PM",
  description: "Project Management UI (PM/Dev/QA)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
