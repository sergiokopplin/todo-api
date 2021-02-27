import 'module-alias/register'
import { app, env } from '@/main/config'

app.listen(env.port, () => {
  console.log(
    `⚡️ [server]: Server is running at https://localhost:${env.port}`
  )
})
