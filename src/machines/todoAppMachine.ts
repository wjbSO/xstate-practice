import { assign, createMachine } from "xstate";

export const todosMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAICyBDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogC0ARnsBWCgHYALACZ7ADldOAGhAATzt7Vx8KJ0dXX38AX3igoRwCEk4JelJGITYwACd81HyKIwAbFQAzYoBbChSRdPFaLJyZOQUlc01dfUsTWDM1UksbBFsAZldPCh8JpwBOKcCQxAmANjd1p3XPJ0TkmVTRTlzMTMhWAGF8sBUwTHIAdz6kEAGhizexx02td3WfhWoXG7i0FCW8yWCQOIFI6DglgaaTE-VM3VGdi84Lmi2WQRBtk86wWFC082cu32SRAyJOzUk2WkLDRgwx3zsE3cLnc7gW3iBBLCPnsUQpOz2sLpTXq7XOLUgrM+Iw5CHsWkiEx8nhFeyF42ckXJ0Ql1MOGGOMsyUjOAFFCsVFW8PuzQGNJjsKOsJjr7HrVghie4KHsJgstFSpUdGmIKDc7qomc9MMoZErXdZEPy3PZ3D53PiA05XCGvHFqYkgA */
  createMachine(
    {
      id: "Todo Machine",
      schema: {
        services: {} as {
          loadTodos: {
            data: string[];
          };
        },
      },
      tsTypes: {} as import("./todoAppMachine.typegen").Typegen0,
      context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
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
        "Creating new todo": {},
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
      },
    }
  );
