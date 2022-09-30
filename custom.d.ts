/**
 * to be able to import svg files as component
 * see https://webpack.js.org/guides/typescript/#importing-other-assets
 * and https://stackoverflow.com/a/45887328/4560636
 */
declare module "*.svg" {
  const content: any;
  export default content;
}
