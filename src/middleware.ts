import { defineMiddleware } from "astro:middleware";

// Enforce no trailing slashes to prevent duplicate content.
// Without this, both /services and /services/ serve the same content,
// causing Google to report "Duplicate, Google chose different canonical than user".
export const onRequest = defineMiddleware(({ url, request }, next) => {
  const pathname = url.pathname;

  // If the path ends with / and is not just "/", redirect to no-slash version
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const cleanPath = pathname.replace(/\/+$/, "");
    const newURL = `${url.origin}${cleanPath}${url.search}`;
    return new Response(null, {
      status: 301,
      headers: { Location: newURL },
    });
  }

  return next();
});
