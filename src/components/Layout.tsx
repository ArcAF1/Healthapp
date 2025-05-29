import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { auth } from '@/lib/auth'

export function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
    const { data: authListener } = auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user)
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        router.push('/auth/login')
      }
    })
    return () => {
      authListener?.subscription?.unsubscribe()
    }
  }, [])

  const checkUser = async () => {
    try {
      const currentUser = await auth.getUser()
      if (!currentUser && !router.pathname.startsWith('/auth')) {
        router.push('/auth/login')
      } else {
        setUser(currentUser)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
      </div>
    )
  }

  return <>{children}</>
}
