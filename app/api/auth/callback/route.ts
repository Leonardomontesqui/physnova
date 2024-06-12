import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { type CookieOptions, createServerClient } from '@supabase/ssr'

export async function GET(request: NextRequest) {
  const next = request.nextUrl.searchParams.get('next')
  const code = request.nextUrl.searchParams.get('code')
  const origin = request.nextUrl.origin

  console.log('code', code)
  console.log('next', next)
  console.log('origin', origin)

  if (code?.length) {
    try {
    const cookieStore = cookies()
    console.log("here")
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    console.log("here2")
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }} catch(e: any) {
      throw new Error('Error exchanging code for session', e.message)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}`)
}