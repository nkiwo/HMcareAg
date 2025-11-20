import "./../styles/globals.css";

export const metadata = {
  title: "HUMAN:care · Agent Project Cockpit",
  description: "Agentic Prototype v0.1 für HUMAN:care"
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
