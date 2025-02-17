import Image from "next/image";
import React from "react";

const Loader = () => {
	return (
		<div className="flex items-center justify-center min-wscreen min-h-screen bg-white">
			<Image
				src="/loader/spartan-loader.gif"
				width={500}
				height={500}
				alt="loader"
			/>
		</div>
	);
};

export default Loader;
