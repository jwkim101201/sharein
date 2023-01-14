import { fileTypeFromBuffer } from 'file-type'
import { existsSync, readFileSync } from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { join } from 'path'
import conf from '../../../config.json'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string
  const path = join(conf.fileLocation, id)

  if (existsSync(path)) {
    const file = readFileSync(path)
    const mimeType = (await fileTypeFromBuffer(file))?.mime

    res.setHeader('Content-Type', mimeType as string)
    res.send(file)
  }
}

export const config = {
  api: {
    responseLimit: false
  }
}
