import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

/**
 * Supabase OAuth / PKCE code-exchange handler.
 *
 * Supabase redirects here after:
 *  - OAuth sign-in (Google, GitHub, …)
 *  - Email confirmation
 *  - Password-reset emails  (next=/update-password)
 *
 * The `code` query param is exchanged for a session and the user is
 * redirected to `next` (defaults to /dashboard).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const nextRaw = searchParams.get('next') ?? '/dashboard'

  // Prevent open-redirect: only allow relative paths within the same origin
  const next =
    nextRaw.startsWith('/') && !nextRaw.startsWith('//') ? nextRaw : '/dashboard'

  if (code) {
    const response = NextResponse.redirect(`${origin}${next}`)

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return response
    }
  }

  // Something went wrong – send user back to login with an error hint
  const url = new URL('/login', origin)
  url.searchParams.set('error', 'auth_callback_error')
  return NextResponse.redirect(url)
}
