import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/create-account": true,
  "/log-in": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const isPublicUrlExist = publicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    if (!isPublicUrlExist) {
      return NextResponse.redirect(new URL("/log-in", request.url));
    }
  } else {
    if (isPublicUrlExist) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
