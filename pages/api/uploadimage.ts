// Example of a restricted endpoint that only authenticated users can access from https://next-auth.js.org/getting-started/example

import { NextApiRequest, NextApiResponse } from "next"
import type { Readable } from "node:stream"
const cloudinary = require("cloudinary").v2
cloudinary.config({
  cloud_url: process.env.CLOUDINARY_URL,
})

const cloudinaryUpload = (file: any) =>
  cloudinary.uploader.unsigned_upload(file, "b5gbtrub")

import DataURIParser from "datauri/parser"
const parser = new DataURIParser()

async function buffer(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "5mb",
  },
}
const uploadimage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req)
    const file64 = parser.format(".png", buf).content
    const uploadResult = await cloudinaryUpload(file64)
    if (uploadResult.error) {
      res.send(uploadResult.error)
    } else {
      res.send({ secure_url: uploadResult.secure_url })
    }
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}

export default uploadimage
