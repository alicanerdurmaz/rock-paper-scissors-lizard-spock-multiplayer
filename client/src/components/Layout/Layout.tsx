import { FC } from "react";

const Layout: FC = ({ children }) => {
  return (
    <>
      <header className="py-12 px-4 text-center">
        <div>
          <h1 className="text-2xl md:text-5xl font-semibold">
            <span>Rock Paper Scissors</span>
            <span className="block">Lizard Spock</span>
          </h1>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
