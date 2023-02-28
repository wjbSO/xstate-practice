import Head from "next/head";
import Image from "next/image";
import type { NextPage } from "next";
import { todosMachine } from "@/machines/todoAppMachine";
import { useMachine } from "@xstate/react";

const Home: NextPage = () => {
  const [state, send] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return ["Do laundry", "Do dishes", "Do homework"];
      },
    },
  });
  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
    </div>
  );
};

export default Home;
