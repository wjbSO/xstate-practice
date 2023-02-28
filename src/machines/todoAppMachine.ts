import { assign, createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0AFgDMATgrOAjFvcBWAGwAmbwAaEABPO3sADgB2Cnt7b0d3QIBfFJChHAISTgl6UkYhNjAAJxLUEoojABsVADMKgFsKTJEc8Vp8wpk5BSVzTV19SxNYMzVSSxsEW19nWK0tFy0A4LC7f2j-CndfaOdfGO80jJks0U4izDzIVgBhErAVMExyAHdhpBBR8Ysv6ds-i0kR2-k8zkc0TW4Rmjnsrkie3cRxOIFa2TEFAeT1UBVeYDemGUMgoAGVCKg3lIGiVGpgyEYAK7KVgAMSa9NITOUmCIuAKkE+xlMAymEXcjgo0WicMh0Lsu28Ow89hWqVRpHQcEs6IuYBGIomYpm0QSFEWy1WIRhtm80rchyhqN17WonSkRQNY1F-zsvjmFF87miyKh1oizi0cUdx3SaLObUxVxuEC9v0mvpmYKV0Ui3h8VvWM3s-odKLjLsxeQ9PUwAFEyhVIGmfaAAYco5FFrnkvLi-ZA-sY86ExjONiVFJ3kSZC2jZmHEGpTKnGGi4D84GVWrY6cMOdXRPcYxp8SMGSKVS8TS6QzmXO-m2FZFJQkkoFwzNFcr3KrVmk0iAA */
  createMachine(
    {
      id: "Todo Machine",
      schema: {
        services: {} as {
          loadTodos: {
            data: string[];
          };
        },
        events: {} as
          | {
              type: "Create new";
            }
          | {
              type: "Form input changed";
              value: string;
            },
      },
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: "",
      },
      states: {
        "Loading Todos": {
          invoke: {
            src: "loadTodos",
            onDone: { target: "Todos Loaded", actions: "assignTodosToContext" },
            onError: { target: "Loading Todos Errored", actions: "assignErrorMessageToContext" },
          },
        },

        "Todos Loaded": {
          on: {
            "Create new": "Creating new todo",
          },
        },
        "Loading Todos Errored": {},
        "Creating new todo": {
          states: {
            "Showing form input": {
              on: {
                "Form input changed": {
                  actions: "assignFormInputToContext",
                },
              },
            },
          },

          initial: "Showing form input",
        },
      },

      initial: "Loading Todos",
    },
    {
      actions: {
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
          };
        }),
        assignErrorMessageToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          };
        }),
        assignFormInputToContext: assign((context, event) => {
          return {
            createNewTodoFormInput: event.value,
          };
        }),
      },
    }
  );
