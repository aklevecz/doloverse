export default function Layout({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <div className="container mx-auto flex flex-col pb-24">{children}</div>
  );
}
