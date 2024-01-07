interface ListWrapperProps {
	children: React.ReactNode;
}

import React from "react";

export default function ListWrapper({ children }: ListWrapperProps) {
	return <li className='shring-0 h-full w-[272px] select-none'>{children}</li>;
}
