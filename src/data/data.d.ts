/* eslint-disable @typescript-eslint/consistent-type-imports */

declare module "~/data/filtro.json" {
  type FilterQuestion = import("./types").FilterQuestion;
  const value: Array<FilterQuestion>;
  export default value;
}

declare module "~/data/orale.json" {
  type OralQuestion = import("./types").OralQuestion;
  const value: Array<OralQuestion>;
  export default value;
}
