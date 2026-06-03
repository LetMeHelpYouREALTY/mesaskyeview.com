import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function withDomainHeaders(request: NextRequest, response: NextResponse): NextResponse {
  const hostname = request.headers.get("host") || "";
  response.headers.set("x-domain", hostname);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

/** Refreshes Supabase auth session when env is configured; always applies domain headers. */
export async function updateSession(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let response = withDomainHeaders(
    request,
    NextResponse.next({
      request,
    })
  );

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
        response = withDomainHeaders(
          request,
          NextResponse.next({
            request,
          })
        );
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.getUser();
  return response;
}
