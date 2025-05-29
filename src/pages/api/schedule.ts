import type { NextApiRequest, NextApiResponse } from 'next'


import { calculateSchedule } from '../../lib/circadian'



export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const wakeParam = req.query.wake as string | undefined
  const wake = new Date()
  if (wakeParam) {
    const [h, m] = wakeParam.split(':').map(Number)
    wake.setHours(h, m, 0, 0)
  }

  const schedule = calculateSchedule(wake, 59.3)


  res.status(200).json(schedule)
}
