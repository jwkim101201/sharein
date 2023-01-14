import { Fields, File, Files, IncomingForm } from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'
import applyRateLimit from '../../middlewares/applyRateLimit'
import conf from '../../config.json'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { nanoid } from 'nanoid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await applyRateLimit(req, res)
  } catch {
    return res.status(429).send({ ok: false, error: 'Too many requests' })
  }

  if (req.method === 'POST') {
    const form = new IncomingForm()

    form.parse(req, async (err: any, _fields: Fields, files: Files) => {
      if (err) {
        res.json({ ok: false, error: 'internal server error'})
        return
      }

      const file = files.file as File

      if (!file) return res.json({ ok: false, error: 'invalid body' })
      if (file.size > 6.4e+7) return res.json({ ok: false, error: 'file is too big' })

      const id = nanoid(6)

      writeFileSync(join(conf.fileLocation + id), readFileSync(file.filepath))

      res.json({ ok: true, id })
    })
  } else {
    res.status(405).json({ ok: false, error: 'Method not allowed' })
  }
}

export const config = {
  api: {
    bodyParser: false
  }
}
