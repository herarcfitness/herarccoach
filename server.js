/* eslint-env node */
import { createServer } from 'http';

const PORT = process.env.PORT || 3000;

let message = 'Hello from the backend';
let clients = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'jane@example.com',
    membershipType: 'Community Arc',
    status: 'active',
    lastSignIn: 'Just now',
    program: 'New Program',
    avatar: 'JD'
  }
];
const payments = [
  {
    id: 'pay_1',
    customer: 'cust_1',
    status: 'succeeded',
    amount: 1000,
    currency: 'USD',
    created: new Date().toISOString()
  }
];

function sendJson(res, data) {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function handleRequest(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api') {
    return sendJson(res, { message: 'API is running' });
  }

  if (req.url === '/api/message') {
    if (req.method === 'GET') {
      return sendJson(res, { message });
    }
    if (req.method === 'POST') {
      const { newMessage } = req.body || {};
      if (typeof newMessage === 'string') message = newMessage;
      return sendJson(res, { success: true, message });
    }
  }

  if (req.url === '/api/clients') {
    if (req.method === 'GET') {
      return sendJson(res, clients);
    }
    if (req.method === 'POST') {
      const newClient = { id: Date.now(), ...(req.body || {}) };
      clients.push(newClient);
      return sendJson(res, newClient);
    }
  }

  if (req.url && req.url.startsWith('/api/clients/') && req.method === 'PUT') {
    const id = parseInt(req.url.split('/').pop(), 10);
    const idx = clients.findIndex(c => c.id === id);
    if (idx === -1) {
      res.writeHead(404);
      return sendJson(res, { error: 'Client not found' });
    }
    clients[idx] = { ...clients[idx], ...(req.body || {}) };
    return sendJson(res, clients[idx]);
  }

  if (req.method === 'GET' && req.url === '/api/payments') {
    return sendJson(res, payments);
  }

  res.writeHead(404);
  res.end('Not found');
}

createServer((req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      req.body = body ? JSON.parse(body) : {};
    } catch {
      req.body = {};
    }
    handleRequest(req, res);
  });
}).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
