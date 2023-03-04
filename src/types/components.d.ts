type TypographyProps<T> = {
  children?: ReactNode;
  className?: string;
  id?: string;
  small?: boolean;
  large?: boolean;
  style?: Partial<CSSProperties>;
  ref?: ForwardedRef<T>;
  withBalancer?: boolean;
};

type ComponentProps<T> = {
  children?: ReactNode;
  className?: string;
  style?: Partial<CSSProperties>;
  ref?: ForwardedRef<T>;
  forceMobileStyle?: boolean;
  dataTags?: { [k: string]: any };
};
