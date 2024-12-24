import { slugify } from "./slugify.ts";

if (import.meta.main) {
  console.log(slugify(Deno.args));
}