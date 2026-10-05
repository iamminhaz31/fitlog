import { Geist, Geist_Mono } from "next/font/google";
import WorkoutProvider from "@/components/WorkoutProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitLog | Workout Library",
  description:
    "Train with intent. Browse workouts, build your daily plan, and log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <WorkoutProvider>
          {children}
        </WorkoutProvider>
      </body>
    </html>
  );
}