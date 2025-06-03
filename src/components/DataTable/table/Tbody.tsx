export function Tbody({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<"tbody">) {
  return <tbody {...props}>{children}</tbody>;
}
