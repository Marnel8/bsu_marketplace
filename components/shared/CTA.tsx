import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTA = () => {
	return (
		<section className="py-20 bg-red-50">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-3xl font-bold mb-4 text-red-600">
					Ready to Get Started?
				</h2>
				<p className="mb-8 text-lg max-w-2xl mx-auto text-gray-700">
					Join the BatStateU Spartans Marketplace today and start buying,
					selling, and connecting with your university community!
				</p>
				<Link href="/auth">
					<Button
						size="lg"
						className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
					>
						Join Us Now <ArrowRight className="ml-2 h-5 w-5" />
					</Button>
				</Link>
			</div>
		</section>
	);
};

export default CTA;
