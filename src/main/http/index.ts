import '../../presentation/module-alias'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import helmet from 'helmet'
import { router } from './routes'
import { messagePollerFactory } from '../factories/message-service/message-poller.factory'
import swaggerDocument from '@/main/docs/swagger.json'

const start = async (): Promise<void> => {
  const app = express()

  app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }))

  app.use(helmet())

  app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'trusted-script-source.com'],
        styleSrc: ["'self'", 'trusted-style-source.com'],
        imgSrc: ["'self'", 'trusted-image-source.com'],
        connectSrc: ["'self'", 'trusted-api.com'],
        fontSrc: ["'self'", 'trusted-font-source.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
        baseUri: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        scriptSrcAttr: ["'none'"],
        mediaSrc: ["'self'"],
        childSrc: ["'self'"],
        workerSrc: ["'self'"],
        manifestSrc: ["'self'"],
        reportTo: ['csp-endpoint']
      }
    })
  )

  app.use(helmet.noSniff())

  app.use(express.json())
  app.use('/api/v1', router)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.get('/robots.txt', (req: Request, res: Response) => {
    res.type('text/plain')
    res.send('User-agent: *\nDisallow: /')
  })

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    res.type('application/xml')
    res.send('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>')
  })

  app.post('/csp-report-endpoint', (req: Request, res: Response) => {
    console.log('CSP violation report received:', req.body)
    res.sendStatus(204)
  })

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.set({
      'Content-Security-Policy': "default-src 'self'; script-src 'self' trusted-script-source.com; style-src 'self' trusted-style-source.com; img-src 'self' trusted-image-source.com; connect-src 'self' trusted-api.com; font-src 'self' trusted-font-source.com; object-src 'none'; upgrade-insecure-requests; report-to csp-endpoint; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; script-src-attr 'none'"
    })
    next()
  })

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send('Page not found')
  })

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

  const port = process.env.PORT ?? 3000
  app.listen(port, () => { console.log(`Server running at port ${port}`) })

  await messagePollerFactory().processMessagesOnQueue()
}

void start()
