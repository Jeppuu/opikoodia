import db from "@/lib/db";
import Post from "@/models/Post";
import { verifyJwtToken, verifyToken } from "@/lib/jwt";

export async function GET(req) {
  await db.connect()

  try {
    const posts = await Post.find({}).populate('authorId')
    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ message: `Internal server error. Failed to GET` }), { status: 500 })
  }
}

export async function POST(req) {
  await db.connect()

  const accessToken = req.headers.get('Authorization')
  const token = accessToken.split(' ')[1]

  const decodedToken = verifyJwtToken(token)

  if (!accessToken || !decodedToken) {
    return new Response(JSON.stringify({ error: 'unauthorized (wrong or expired token)' }), { status: 403 })
  }

  try {
    const body = await req.json()
    const newPost = await Post.create(body)

    console.log('newPost: ' + newPost)

    return new Response(JSON.stringify(newPost), { status: 201 })

  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ message: `Internal server error. Failed to POST` }), { status: 500 })
  }
}
