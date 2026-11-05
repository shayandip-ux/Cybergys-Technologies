import http from 'node:http'

const port = Number(process.env.PORT) || 5000
const host = process.env.API_HOST || 'localhost'

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  response.end(JSON.stringify(body))
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    let body = ''
    request.on('data', (chunk) => {
      body += chunk
      if (body.length > 1_000_000) {
        reject(new Error('Request body is too large.'))
        request.destroy()
      }
    })
    request.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(new Error('Request body must be valid JSON.'))
      }
    })
    request.on('error', reject)
  })
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`)

  if (request.method === 'OPTIONS') {
    return sendJson(response, 204, {})
  }

  if (request.method === 'GET' && url.pathname === '/api/health') {
    return sendJson(response, 200, { status: 'ok' })
  }

  if (request.method === 'POST' && url.pathname === '/api/contact') {
    try {
      const { name, email, message } = await readJson(request)
      if (!name || !email || !message) {
        return sendJson(response, 400, { error: 'name, email, and message are required.' })
      }

      // Replace this with your database, mail, or CRM integration.
      return sendJson(response, 201, { message: 'Thanks — your message has been received.' })
    } catch (error) {
      return sendJson(response, 400, { error: error.message })
    }
  }

  return sendJson(response, 404, { error: 'Route not found.' })
})

server.listen(port, host, () => {
  console.log(`API listening at http://${host}:${port}`)
})
