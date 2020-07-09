import { Request, Response, NextFunction } from 'express'

export const contentType = (req: Request, res: Response, nextFunction: NextFunction): void => {
  res.type('json')
  nextFunction()
}
