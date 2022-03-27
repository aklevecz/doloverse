import Link from "next/link";
import Layout from "../components/Layout";

const FAQBlock = ({
  question,
  answer,
}: {
  question: string;
  answer: JSX.Element | JSX.Element[] | string;
}) => (
  <div className="m-4">
    <div className="text-3xl">{question}</div>
    <div className="text-xl ml-4">{answer}</div>
  </div>
);

export default function About() {
  return (
    <Layout>
      <div className="text-5xl text-center m-4">FAQ</div>
      <FAQBlock
        question="When is it?"
        answer="On 4/20 all day! You will see the set times here after you take your first bong rip"
      />
      <FAQBlock
        question="What does it cost?"
        answer={
          <div>
            This event is free. You just need to{" "}
            <Link href="/tickets">
              <a className="text-red-500">Sign Up</a>
            </Link>{" "}
            with your email and agree to give away your soul.
          </div>
        }
      />
      <FAQBlock
        question="How do I validate my ticket?"
        answer={
          <div>
            Go to Dolores park and then go to the{" "}
            <Link href="/wallet">
              <a className="text-red-500">Ticket page</a>
            </Link>{" "}
            and click Check in. If you are at Dolores Park, your NFT ticket will
            transform into a secret track.
          </div>
        }
      />
      <FAQBlock
        question="What the shit is a NFT Ticket?"
        answer="Good question. It is connected to your email address using Magic link and printed on the Polygon network. There will be a limited supply of 500. You can see the contract here LINK"
      />
      <FAQBlock
        question="Can I bring my dog?"
        answer="You are required to bring your dog. If you do not bring your dog, it will be sent on a vacation to South America for an indefinite amount of time"
      />
      <FAQBlock question="Where do I put my feet" answer="I don't know" />
      <FAQBlock
        question="Should I bring a jacket?"
        answer="You are not allowed to bring a jacket"
      />
      <FAQBlock
        question="Are backpacks allowed"
        answer="Backpacks are only allowed if they are purple and weigh exactly 8 pounds"
      />
      <FAQBlock
        question="What can I bring to the festival"
        answer="Your dog, drugs, one sword, sparlking water, drink tickets from 1015, cowboy hats, and whatever you want really"
      />
      <div className="text-center">Created and developed by Yaytso LLC</div>
    </Layout>
  );
}
