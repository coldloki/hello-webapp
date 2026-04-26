const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || '/app/data';
const COUNT_FILE = path.join(DATA_DIR, 'visits.json');

function readCount() {
  try {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (fs.existsSync(COUNT_FILE)) {
      return JSON.parse(fs.readFileSync(COUNT_FILE, 'utf8'));
    }
  } catch (e) {}
  return { count: 0, firstSeen: null };
}

function writeCount(data) {
  fs.writeFileSync(COUNT_FILE, JSON.stringify(data, null, 2));
}

app.get('/', (req, res) => {
  const data = readCount();
  data.count++;
  if (!data.firstSeen) data.firstSeen = new Date().toISOString();
  writeCount(data);

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello World 2</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #fafafa; }
        .card { background: white; padding: 48px; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); text-align: center; }
        h1 { color: #1a1a1a; margin: 0 0 8px; font-size: 32px; }
        p { color: #666; margin: 0; font-size: 16px; }
        .counter { margin-top: 24px; padding-top: 24px; border-top: 1px solid #eee; }
        .counter strong { font-size: 48px; color: #1a1a1a; }
        .counter span { display: block; margin-top: 8px; color: #999; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Hello World</h1>
        <p>You are now running inside a Docker container.</p>
        <div class="counter">
          <strong>${data.count}</strong>
          <span>total visits — first seen: ${data.firstSeen}</span>
        </div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('Hello World app running on port ' + PORT);
});
