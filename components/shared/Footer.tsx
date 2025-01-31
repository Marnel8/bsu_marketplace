import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
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
            <div className="flex justify-left md: justify-start items-left gap-4">
              <a
                className="rounded-full border p-2 hover:bg-gray-200 text-muted-foreground"
                href="https://www.tiktok.com/@batstateutheneu?is_from_webapp=1&sender_device=pc"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 448 512"
                  className="h-4 w-4 text-muted-foreground"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path>
                </svg>
                <span className="sr-only">TikTok</span>
              </a>
              <a
                className="rounded-full border p-2 hover:bg-gray-200 text-muted-foreground"
                href="https://youtube.com/@devopsbatstateu?"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-youtube h-4 w-4 text-muted-foreground"
                >
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                  <path d="m10 15 5-3-5-3z"></path>
                </svg>
                <span className="sr-only">Youtube</span>
              </a>
              <a
                className="rounded-full border p-2 hover:bg-gray-200 text-muted-foreground"
                href="https://www.facebook.com/people/TRIOE/61560879090036/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-facebook h-4 w-4 text-muted-foreground"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </a>
              <a
                className="rounded-full border p-2 hover:bg-gray-200 text-muted-foreground"
                href="https://www.linkedin.com/school/batstateutheneu/"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
