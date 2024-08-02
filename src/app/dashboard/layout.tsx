import { getServerSession } from '@/server/auth'
import { redirect } from 'next/navigation'
import UserInfo from '@/components/feature/UserInfo';
import Link from 'next/link'

export default async function DashboardLayout({ children }: {children: React.ReactNode; }) {
  const session = await getServerSession()

  if (!session) {
    redirect('/api/auth/signin')
  }
  
  return (<div className='w-full min-w-[1200px]'>
    <nav className="h-[80px] flex justify-between items-center border-b border-gray-100 shadow-sm sticky top-0 bg-white z-50 px-8 text-gray-600 dark:bg-gray-950 dark:border-gray-800">
      <Link href="/">
        <div className="logo flex items-center text-xl font-bold text-slate-600 dark:text-slate-200">
          <img className="w-8 h-8 mr-2" src='https://media.mxchensir.com/morgana-form/logo.svg' alt='' />
          MORGana 问卷星
        </div>
      </Link>
      <div className='user-avatar flex items-center gap-4'>
        <UserInfo name={session.user.name as string} image={session.user.image as string} />
      </div>
    </nav>
    <main className="w-full h-[calc(100%-80px)] p-8">
      { children }
    </main>
  </div>)
}
