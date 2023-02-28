import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { myMachine } from "@/machines/myFirstMachine";
import { useMachine } from "@xstate/react";

const Home: NextPage = () => {
  const [state, send] = useMachine(myMachine);
  return (
    <div>
      {JSON.stringify(state.value)}
      <button onClick={() => send("MOUSEOVER")}>MOUSEOVER</button>
      <button onClick={() => send("MOUSEOUT")}>MOUSEOUT</button>
    </div>
  );
};

export default Home;
