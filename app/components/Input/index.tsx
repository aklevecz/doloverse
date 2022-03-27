type Props = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  type: string;
  placeholder: string;
};

export default function Input({
  onChange,
  value,
  name,
  type,
  placeholder = name,
}: Props) {
  return (
    <div className="w-full px-3">
      {/* <label
        className="block text-black-700 font-bold mb-2 text-2xl tracking-wider capitalize"
        htmlFor="email"
      >
        {name}
      </label> */}
      <input
        onChange={onChange}
        value={value}
        className="appearance-none block w-full text-3xl text-center bg-white text-gray-700 border-black pt-3 pb-0 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 border-b-4"
        id={name}
        type={type}
        placeholder={placeholder}
        style={{ wordWrap: "break-word", wordBreak: "break-all" }}
      />
    </div>
  );
}
