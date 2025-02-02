type TypographyProps<T> = {
	children?: ReactNode;
	className?: string;
	id?: string;
	small?: boolean;
	large?: boolean;
	style?: Partial<CSSProperties>;
	ref?: ForwardedRef<T>;
	withBalancer?: boolean;
	bold?: boolean;
	light?: boolean;
	italic?: boolean;
};

type ComponentProps<T> = {
	children?: ReactNode;
	className?: string;
	style?: Partial<CSSProperties>;
	ref?: ForwardedRef<T>;
	dataTags?: { [k: string]: any };
};
