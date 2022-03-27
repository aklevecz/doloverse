import Input from "../Input";

type Props = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  email: string;
};

export default function Email({ onChange, email }: Props) {
  return (
    <div className="flex flex-col max-w-xl m-auto">
      <div className="text-5xl text-center m-4 mb-0">Sign up</div>
      <div className="text-4xl m-4">
        You will Login using passwordless email magic stuff
      </div>

      <div className="flex flex-wrap">
        <Input
          onChange={onChange}
          value={email}
          name={"email"}
          type={"email"}
          placeholder={"Email"}
        />
      </div>
      <div className="text-4xl m-4">
        After signing up, check your email for a login link
      </div>
      <div className="text-4xl m-4">
        This will also create a wallet for your NFT ticket
      </div>
    </div>
  );
}
