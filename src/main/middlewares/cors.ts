import { Request, Response, NextFunction } from 'express'

export const cors = (req: Request, res: Response, nextFunction: NextFunction): void => {
  res.set('access-allow-control-origin', '*')
  res.set('access-allow-control-methods', '*')
  res.set('access-allow-control-headers', '*')
  nextFunction()
}
