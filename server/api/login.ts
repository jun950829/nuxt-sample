export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const mockUser = {
    email: 'test@example.com',
    password: 'password123',
  }

  if (body.email === mockUser.email && body.password === mockUser.password) {
    return { success: true }
  }

  return { success: false }
})
