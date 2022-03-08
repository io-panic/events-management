import NeDB from "@seald-io/nedb";
import { join } from "path";

export default function (app) {
  const dbPath = app.get("nedb");
  const Model = new NeDB({
    filename: join(dbPath, "events.db"),
    autoload: true,
  });

  return Model;
}
