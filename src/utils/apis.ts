import { createTRPCClient } from '@trpc/client'
import { createTRPCReact, httpBatchLink } from '@trpc/react-query'
import { type AppRouter } from '@/server/router'

const originHost = process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000'
export const trpcClientReact = createTRPCReact<AppRouter>({})
export const trpcClient = trpcClientReact.createClient({
  links: [
    httpBatchLink({
      url: `${originHost}/api/trpc`
    }),
  ],
})
export const trpcPureClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${originHost}/api/trpc`
    })
  ]
})