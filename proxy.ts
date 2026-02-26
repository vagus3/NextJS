import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth-server";

export async function proxy(request: NextRequest) {
    // This middleware uses `isAuthenticated` to securely check
    // if a user has a valid session before allowing access
    // to protected routes.
	if (!(await isAuthenticated())) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/blog","/create"], // Specify the routes the middleware proxy applies to
};
