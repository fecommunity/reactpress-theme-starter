import AuthPageClient from '@/components/auth/AuthPageClient'
import { buildNoIndexMetadata } from '@/lib/reactpress/siteMetadata'
import { tServer } from '@/lib/reactpress/serverLocale'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return buildNoIndexMetadata(await tServer('commentNamespace.userRegister'), '/register')
}

interface PageProps {
  searchParams: Promise<{ from?: string }>
}

export default async function RegisterPage({ searchParams }: PageProps) {
  const { from = '/' } = await searchParams
  return <AuthPageClient mode="register" from={from} />
}
