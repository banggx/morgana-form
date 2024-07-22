import { z } from 'zod'
import { protectedProcedure, router } from '../trpc'
import axios from 'axios'
import { db } from '../db'
import { count, eq } from 'drizzle-orm'
import { llms } from '../db/model'
import { v4 as uuid } from 'uuid'

export const llmRouter = router({
  questionGenerate: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const llmRes = await axios.post(
        process.env.LLM_URL as string,
        {
          input: {
            prompt: input
          }
        },
        {
          timeout: 500000,
          headers: {
            Authorization: `Bearer ${process.env.LLM_API_KEY}`,
            'Content-Type': 'application/json'
          },
        }
      )
      
      const llmResult = llmRes.data?.output?.text;
      await db.insert(llms).values({
        id: uuid(),
        userId: ctx.session.user.id,
        prompt: input,
        result: llmResult
      })

      return llmRes.data?.output?.text
    })
})