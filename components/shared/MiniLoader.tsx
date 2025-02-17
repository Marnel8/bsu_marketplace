import React from "react";

const MiniLoader = () => {
	return (
		<div className="w-full h-full flex justify-center items-center">
			<div className="flex flex-row gap-2">
				<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce" />
				<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]" />
				<div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]" />
			</div>
		</div>
	);
};

export default MiniLoader;
