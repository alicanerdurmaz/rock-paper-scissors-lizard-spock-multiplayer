import { FC } from "react";
import Link from "next/link";
import { routes } from "../../utils/routes";
import Description from "./Description";

const Layout: FC = ({ children }) => {
  return (
    <>
      <header className="py-12 px-4 text-center">
        <div>
          <h1 className="text-2xl md:text-5xl font-semibold">
            <Link href={routes.home}>
              <a target="_blank" rel="noreferrer">
                <span>Rock Paper Scissors</span>
                <span className="block">Lizard Spock</span>
              </a>
            </Link>
          </h1>
        </div>
      </header>

      <main>
        <section style={{ minHeight: "60vh" }}>{children}</section>
        <Description />
      </main>
    </>
  );
};

export default Layout;
