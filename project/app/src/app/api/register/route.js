import User from "@/models/User";
import bcrypt from 'bcrypt';
import db from "@/lib/db";

export async function POST(req) {
  try {
    //wait for db connection
    await db.connect()

    //get username and password from the request
    const { username, password: pass } = await req.json()

    //check if the username already exists
    const isExisting = await User.findOne({ username })
    if (isExisting) {
      throw new Error('Username already in use')
    }

    //salt the password
    const hashedPassword = await bcrypt.hash(pass, 10)

    //create a new user with salted password
    const newUser = await User.create({ username, password: hashedPassword })

    const { password, ...user } = newUser._doc

    //POST success
    return new Response(JSON.stringify(user), { status: 201 })

  } catch (error) {
    return new Response(JSON.stringify(error.message), { status: 500 })
  }
}
