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
      <div>
        {state.matches("Todos Loaded") && (
          <button onClick={() => send({ type: "Create new" })}>Create New</button>
        )}
        {state.matches("Creating new todo.Showing form input") && (
          <input
            onChange={(e) => {
              send({
                type: "Form input changed",
                value: e.target.value,
              });
            }}
          ></input>
        )}
      </div>
    </div>
  );
};

export default Home;
