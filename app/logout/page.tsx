"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function LogoutPage() {
  const router = useRouter()
  useEffect(() => {
    supabase.auth.signOut().then(() => {
      router.push('/login')
    })
  }, [router])
  return null
}
