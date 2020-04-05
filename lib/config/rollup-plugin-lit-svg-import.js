export default function svg() {
  return {
    name: "lit-svg",
    transform(code, id) {
      if (id.endsWith(".svg")) {
        return {
          map: { mappings: "" },
          code: "export default " + JSON.stringify(code)
        };
      }
    }
  };
}
