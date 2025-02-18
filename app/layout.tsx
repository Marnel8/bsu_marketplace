import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "@/hoc/Providers";
import { Toaster } from "@/components/ui/toaster";

const roboto = localFont({
	src: "./fonts/Roboto-Regular.ttf",
	variable: "--font-roboto",
	weight: "100 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
	title: "BatStateU | Spartans Marketplace",
	description: "BatStateU Spartans Marketplace",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="!scroll-smooth">
			<body
				className={` ${roboto.variable} antialiased bg-gray-50 font-roboto`}
			>
				<Providers>
					{children}
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
