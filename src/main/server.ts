import 'module-alias/register'
import { app, env } from '@/main/config'
import { MongoHelper } from '@/infra/db'

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    app.listen(env.port, () => {
      console.log(
        `⚡️ [server]: Server is running at https://localhost:${env.port}`
      )
    })
  })
  .catch(console.error)
