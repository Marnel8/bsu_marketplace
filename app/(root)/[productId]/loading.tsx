import MiniLoader from "@/components/shared/MiniLoader";
import React from "react";

const loading = () => {
	return (
		<div className="flex items-center justify-center w-full">
			<MiniLoader />
		</div>
	);
};

export default loading;
