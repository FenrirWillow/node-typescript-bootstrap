import { notFound } from 'boom';
import { Request, Response } from 'express';

function notFoundMiddleware(req: Request, res: Response) {
  const { output } = notFound('API Route not found.');
  return res.status(output.statusCode).json(output.payload);
}

export default notFoundMiddleware;
