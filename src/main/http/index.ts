import '../../presentation/helpers/module-alias'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { router } from './routes'
import { messagePollerFactory } from '../factories/message-service/message-poller.factory'
// import swaggerDocument from '@/infra/docs/swagger.json'

const start = async(): Promise<void> => {
    const app = express()

    app.use(cors())
    app.use(express.json())
    app.use('/api/v1', router)

    const port = process.env.PORT ?? 3000
    app.listen(port, () => { console.log(`Server running at port ${port}`) })

    await messagePollerFactory()
}

void start()

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

