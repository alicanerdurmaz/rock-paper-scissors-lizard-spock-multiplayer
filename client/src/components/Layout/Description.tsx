import Link from "next/link";
import { routes } from "../../utils/routes";

const Description = () => {
  return (
    <div className="flex flex-col justify-center max-w-xl  mx-auto px-8 ">
      <div className="w-max mx-auto">
        <h2 className="text-4xl font-bold text-center">WHAT IS THIS ?</h2>
        <p className="max-w-xs mt-2">
          Rock, Paper, Scissors, Lizard, Spock is a game of chance that expands.
          It is first used to settle a dispute about what to watch on TV between
          Sheldon and Raj in &quot;The Lizard-Spock Expansion&quot;.
        </p>

        <a
          href="https://the-big-bang-theory.com/rock-paper-scissors-lizard-spock/"
          target="_blank"
          rel="noreferrer"
          className="text-cyan-700 underline mt-2"
        >
          click here for more information
        </a>

        <h2 className="text-2xl font-bold mt-8">How to play</h2>
        <ol className="mt-2 list-decimal max-w-xs">
          <li>Send the link above to your friend.</li>
          <li>Wait here for them to show up.</li>
          <li>The game begins automatically when your friend online.</li>
        </ol>

        <h2 className="text-2xl font-bold mt-8">Start a new game</h2>
        <Link href={routes.home}>
          <a target="_blank" rel="noreferrer" className="mt-2">
            Visit the homepage to generate a new link.
          </a>
        </Link>

        <h2 className="text-2xl font-bold mt-8">The rules</h2>
        <ul className="mt-2">
          <li>
            <span className="font-bold">Scissors</span> cuts
            <span className="font-bold"> Paper</span>
          </li>
          <li>
            <span className="font-bold">Paper</span> covers
            <span className="font-bold"> Rock</span>
          </li>
          <li>
            <span className="font-bold">Rock</span> crushes
            <span className="font-bold"> Lizard</span>
          </li>
          <li>
            <span className="font-bold">Lizard</span> poisons
            <span className="font-bold"> Spock</span>
          </li>
          <li>
            <span className="font-bold">Spock</span> smashes
            <span className="font-bold"> Scissors</span>
          </li>
          <li>
            <span className="font-bold">Scissors</span> decapitates
            <span className="font-bold"> Lizard</span>
          </li>
          <li>
            <span className="font-bold">Lizard</span> eats
            <span className="font-bold"> Paper</span>
          </li>
          <li>
            <span className="font-bold">Paper</span> disproves
            <span className="font-bold"> Spock</span>
          </li>
          <li>
            <span className="font-bold">Spock</span> vaporizes
            <span className="font-bold"> Rock</span>
          </li>
          <li>
            <span className="italic mr-2">(and as it always has)</span>
            <span className="font-bold">Rock</span> crushes
            <span className="font-bold"> Scissors</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Description;
