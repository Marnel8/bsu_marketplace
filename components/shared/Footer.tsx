import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className="bg-gray-100 text-gray-600 p-14">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div>
						<h3 className="text-lg font-semibold mb-4 text-red-600">
							About Us
						</h3>
						<p className="text-sm">
							BatStateU Marketplace is the official platform for Batangas State
							University students to buy, sell, and exchange goods and services.
						</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4 text-red-600">
							Quick Links
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/about"
									className="text-sm hover:text-red-600 transition-colors"
								>
									About
								</Link>
							</li>
							<li>
								<Link
									href="/faq"
									className="text-sm hover:text-red-600 transition-colors"
								>
									FAQ
								</Link>
							</li>
							<li>
								<Link
									href="/terms"
									className="text-sm hover:text-red-600 transition-colors"
								>
									Terms of Service
								</Link>
							</li>
							<li>
								<Link
									href="/privacy"
									className="text-sm hover:text-red-600 transition-colors"
								>
									Privacy Policy
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4 text-red-600">
							Contact Us
						</h3>
						<p className="text-sm">Email: support@batstateumarket.edu</p>
						<p className="text-sm">Phone: (123) 456-7890</p>
					</div>
					<div>
						<h3 className="text-lg font-semibold mb-4 text-red-600">
							Follow Us
						</h3>
						<div className="flex space-x-4"></div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
