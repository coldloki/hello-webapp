const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Hello World</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          background: #fafafa;
        }
        .card {
          background: white;
          padding: 48px;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.08);
          text-align: center;
        }
        h1 { color: #1a1a1a; margin: 0 0 8px; font-size: 32px; }
        p  { color: #666; margin: 0; font-size: 16px; }
        .version {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #eee;
          color: #999;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Hello from Docker!</h1>
        <p>You are now running inside a Docker container.</p>
        <div class="version">Version 1.0.1</div>
      </div>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log('Hello World app running on port ' + PORT);
});
