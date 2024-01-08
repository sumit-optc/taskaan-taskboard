"use client";

import { useEffect, useState } from "react";
import CardModel from "../models/card-model/Index";

export default function ModelProvider() {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<CardModel />
		</>
	);
}
