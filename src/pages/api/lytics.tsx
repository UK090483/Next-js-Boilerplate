import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json({
    bam: 'bam',
    headers: req.headers,
    'req.socket.remoteAddress': req.socket.remoteAddress,
    'req.socket.localAddress': req.socket.localAddress,
  });
}
