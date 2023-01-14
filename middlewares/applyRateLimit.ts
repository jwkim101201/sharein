// https://kittygiraudel.com/2022/05/16/rate-limit-nextjs-api-routes/
import rateLimit from 'express-rate-limit'
import slowDown from 'express-slow-down'

const applyMiddleware = (middleware: any) => (request: any, response: any) =>
  new Promise((resolve, reject) => {
    middleware(request, response, (result: any) =>
      result instanceof Error ? reject(result) : resolve(result)
    )
  })

const getIP = (request: any) =>
  request.ip ||
  request.headers['x-forwarded-for'] ||
  request.headers['x-real-ip'] ||
  request.connection.remoteAddress

export const getRateLimitMiddlewares = ({
  limit = 10,
  windowMs = 60 * 1000
} = {}) => [
  rateLimit({ keyGenerator: getIP, windowMs, max: limit, message: { ok: false, error: 'too many requests' } })
]

const middlewares = getRateLimitMiddlewares()

async function applyRateLimit(request: any, response: any) {
  await Promise.all(
    middlewares
      .map(applyMiddleware)
      .map(middleware => middleware(request, response))
  )
}

export default applyRateLimit