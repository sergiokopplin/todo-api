import { NextFunction, Request, Response, Router } from 'express'

export const exampleRoute = (router: Router): void => {
  router.post(
    '/signup',
    (request: Request, response: Response, next: NextFunction) => {
      console.log('exemplo')
      next()
    }
  )
}
