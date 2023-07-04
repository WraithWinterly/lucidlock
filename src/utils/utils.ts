import { useRouter } from "next/router";
import { env } from "~/env.mjs";

export function getEndpoint() {
  return `${
    (typeof window != undefined && window.location.protocol) || ""
  }/api`;
}
