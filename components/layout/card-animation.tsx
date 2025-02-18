"use client";
import { motion } from "framer-motion";

const CardAnimation = ({
	children,
	delay = 0.5,
}: {
	children: React.ReactNode;
	delay: number;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			// viewport={{ once: true }}

			transition={{ duration: delay }}
		>
			{children}
		</motion.div>
	);
};

export default CardAnimation;
