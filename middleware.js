let locales = ['en', 'ru']

function getLocale(request) {
    return request?.cookies?.get('dubai_lang')?.value || "en"
}

export function middleware(request) {
    const {pathname} = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return Response.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        '/((?!_next).*)',
    ],
}


