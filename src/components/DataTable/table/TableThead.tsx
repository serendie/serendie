export function TableThead({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<"thead">) {
  return <thead {...props}>{children}</thead>;
}
