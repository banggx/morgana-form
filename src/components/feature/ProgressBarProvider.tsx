import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  return (<>
    {children}
    <ProgressBar
      height='3px'
      color="rgb(8, 145, 178)"
      options={{ showSpinner: false }}
      shallowRouting
    />
  </>)
}