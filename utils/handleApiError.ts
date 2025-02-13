export const handleApiError = (error: any) => {
	if (error.response) {
		throw new Error(error.response.data.message || "An error occurred");
	} else if (error.request) {
		throw new Error("No response from server");
	} else {
		throw new Error("Error in request: " + error.message);
	}
};
