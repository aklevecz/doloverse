export default function LayoutSpinner() {
  return (
    <div className="flex justify-center mt-24">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-16 h-16 border-8 border-black border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
}
