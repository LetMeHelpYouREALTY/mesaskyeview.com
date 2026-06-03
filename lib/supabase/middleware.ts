import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/** Forward host to Server Components via request headers (response-only headers are not readable in RSC). */
function createRequestWithDomainHeaders(request: NextRequest): Headers {
  const requestHeaders = new Headers(request.headers);
  const hostname = request.headers.get("host") || "";
  requestHeaders.set("x-domain", hostname);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return requestHeaders;
}

function nextWithDomain(request: NextRequest): NextResponse {
  const hostname = request.headers.get("host") || "";
  const response = NextResponse.next({
    request: { headers: createRequestWithDomainHeaders(request) },
  });
  response.headers.set("x-domain", hostname);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

/** Refreshes Supabase auth session when env is configured; always applies domain headers. */
export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let response = nextWithDomain(request);

  if (!url || !key) {
    return response;
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = nextWithDomain(request);
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.getUser();
  return response;
}
