type MockUser = {
  id: string
  name: string
  password: string
  email: string
  avatar: string
  role: string
  status: string
  type: string
  createAt: string
  updateAt: string
}

const now = () => new Date().toISOString()

const mockUsers: MockUser[] = [
  {
    id: 'mock-user-demo',
    name: 'demo',
    password: 'demo123',
    email: 'demo@example.com',
    avatar: '',
    role: 'visitor',
    status: 'active',
    type: 'local',
    createAt: now(),
    updateAt: now(),
  },
]

function findUserByName(name: string) {
  return mockUsers.find((user) => user.name === name.trim())
}

function toPublicUser(user: MockUser, token: string) {
  const { password: _password, ...rest } = user
  return { ...rest, token: `mock-token-${token}` }
}

function jsonError(message: string, status = 400): Response {
  return Response.json({ success: false, msg: message, statusCode: status }, { status })
}

export function mockAuthLogin(body: unknown): Response {
  const payload = body && typeof body === 'object' ? (body as Record<string, unknown>) : {}
  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  const password = typeof payload.password === 'string' ? payload.password : ''

  if (!name || !password) {
    return jsonError('请输入用户名和密码')
  }

  const user = findUserByName(name)
  if (!user || user.password !== password) {
    return jsonError('用户名或密码错误')
  }
  if (user.status === 'locked') {
    return jsonError('用户已锁定，无法登录')
  }

  return Response.json({ success: true, data: toPublicUser(user, user.name) })
}

export function mockAuthRegister(body: unknown): Response {
  const payload = body && typeof body === 'object' ? (body as Record<string, unknown>) : {}
  const name = typeof payload.name === 'string' ? payload.name.trim() : ''
  const password = typeof payload.password === 'string' ? payload.password : ''
  const email = typeof payload.email === 'string' ? payload.email.trim() : ''

  if (!name || !password) {
    return jsonError('请输入用户名和密码')
  }
  if (findUserByName(name)) {
    return jsonError('用户已存在')
  }

  const user: MockUser = {
    id: `mock-user-${Date.now()}`,
    name,
    password,
    email,
    avatar: '',
    role: 'visitor',
    status: 'active',
    type: 'local',
    createAt: now(),
    updateAt: now(),
  }
  mockUsers.push(user)

  const { password: _password, ...rest } = user
  return Response.json({ success: true, data: rest }, { status: 201 })
}

export function mockAuthGithub(body: unknown): Response {
  const code =
    body && typeof body === 'object'
      ? typeof (body as Record<string, unknown>).code === 'string'
        ? (body as Record<string, string>).code
        : ''
      : typeof body === 'string'
        ? body
        : ''

  if (!code.trim()) {
    return jsonError('请输入Gitub授权码')
  }

  const user: MockUser = {
    id: 'mock-user-github',
    name: 'Github User',
    password: '',
    email: 'github@example.com',
    avatar: 'https://avatars.githubusercontent.com/u/9919?s=96&v=4',
    role: 'visitor',
    status: 'active',
    type: 'github',
    createAt: now(),
    updateAt: now(),
  }

  const existing = findUserByName(user.name)
  const resolved = existing ?? user
  if (!existing) {
    mockUsers.push(user)
  }

  return Response.json({ success: true, data: toPublicUser(resolved, resolved.name) })
}
