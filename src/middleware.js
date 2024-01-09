let locales = ['en', 'ru']

export function middleware(request) {
    const {pathname} = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    const locale = request?.cookies?.get('dubai_lang')?.value || "en"
    request.nextUrl.pathname = `/${locale}${pathname}`
    return Response.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        '/',
        '/catalog',
        '/catalog/:path*',
        '/faq',
        '/about',
        '/news',
        '/news/:path*',
        '/contact',
    ],
}


