type Props = {
  children: string | JSX.Element | JSX.Element[];
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({ children, onClick, disabled = false }: Props) {
  return (
    <button
      disabled={disabled}
      className="bg-black rounded-full text-s py-3 px-8 tracking-wide text-4xl text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
