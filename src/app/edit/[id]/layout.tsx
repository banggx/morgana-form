import { getServerSession } from '@/server/auth'
import { redirect } from 'next/navigation'

export default async function EditLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  if (!session) {
    redirect('/api/auth/signin')
  }
  
  return (<div className='w-full min-w-[1200px] h-screen overflow-hidden bg-slate-100'>
    { children }
  </div>)
}
