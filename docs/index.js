import { openapi, info, servers } from "./info.js";
import { components } from "./components.js";
import { paths } from "./paths.js";
import { tags } from "./tags.js";
import { security } from "./security.js";

const docs = {
  openapi,
  info,
  servers,
  paths,
  components,
  security,
  tags,
};

export default docs;
