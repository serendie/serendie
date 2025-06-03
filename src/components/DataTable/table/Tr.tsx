export function Tr({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<"tr">) {
  return (
    <tr role="row" {...props}>
      {children}
    </tr>
  );
}
