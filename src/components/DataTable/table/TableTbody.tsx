export function TableTbody({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<"tbody">) {
  return <tbody {...props}>{children}</tbody>;
}
