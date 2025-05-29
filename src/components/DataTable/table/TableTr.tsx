export function TableTr({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<"tr">) {
  return <tr {...props}>{children}</tr>;
}
