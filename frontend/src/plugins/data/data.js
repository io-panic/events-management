import { DataFunctions } from "@/plugins/data/data.impl";
import { DataFunctionsStub } from "@/plugins/data/data.stub";

export const dataFunctions =
  import.meta.env.VITE_USE_BACKEND_STUB === true ? new DataFunctionsStub() : new DataFunctions();
