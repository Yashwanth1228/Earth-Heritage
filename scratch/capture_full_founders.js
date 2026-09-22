const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function run() {
  const p = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless=new',
    '--remote-debugging-port=9689',
    '--user-data-dir=C:\\Users\\Admin\\AppData\\Local\\Temp\\chrome_full_sec_' + Date.now(),
    '--window-size=1440,1600',
    'http://localhost:3001/about'
  ]);
  await new Promise(r => setTimeout(r, 2500));
  http.get('http://127.0.0.1:9689/json/list', res => {
    let d = ''; res.on('data', c => d += c);
    res.on('end', async () => {
      const targets = JSON.parse(d);
      const ws = new WebSocket(targets[0].webSocketDebuggerUrl);
      let id = 1;
      const send = (m, params = {}) => new Promise(res2 => {
        const myId = id++;
        const h = e => {
          const msg = JSON.parse(e.data);
          if (msg.id === myId) { ws.removeEventListener('message', h); res2(msg.result); }
        };
        ws.addEventListener('message', h);
        ws.send(JSON.stringify({ id: myId, method: m, params }));
      });
      await new Promise(r => ws.onopen = r);
      await send('Page.enable');
      await send('Page.navigate', { url: 'http://localhost:3001/about' });
      await new Promise(r => setTimeout(r, 3000));
      await send('Runtime.evaluate', {
        expression: 'document.getElementById("founders").scrollIntoView({ behavior: "instant", block: "start" })'
      });
      await new Promise(r => setTimeout(r, 1000));
      const clip = await send('Runtime.evaluate', {
        expression: '(() => { const r = document.getElementById("founders").getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })()',
        returnByValue: true
      });
      const rect = clip.value;
      console.log('Founders rect:', rect);
      const shot = await send('Page.captureScreenshot', {
        format: 'png',
        clip: {
          x: Math.max(0, rect.x),
          y: Math.max(0, rect.y),
          width: rect.width,
          height: Math.min(rect.height, 1500),
          scale: 1
        }
      });
      fs.writeFileSync('C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4f0fd464-7ce7-4038-a5be-4411227ab03c\\about_founders_section_full.png', Buffer.from(shot.data, 'base64'));
      console.log('Saved about_founders_section_full.png');
      ws.close();
      p.kill();
      process.exit(0);
    });
  });
}
run();
