const http = require(`http`);
const fs = require(`fs/promises`);

const HOSTNAME = `127.0.0.1`;
const PORT = 3000;
const ADDRESS = `http://${HOSTNAME}:${PORT}`;

const printDirectory = (path, relativePath, files) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Directory content</title>
</head>
<body>
<ul>
    ${files.map((it) => `<li><a href="${relativePath}/${it}">${it}</a></li>`).join(``)}
</ul>
</body>
</html>`;
};

const readFile = async (path, res) => {
  const data = await fs.readFile(path);
  res.setHeader(`content-type`, `text/plain`);
  res.end(data);
};


const readDir = async (path, relativePath, res) => {
  const files = await fs.readdir(path);
  res.setHeader(`content-type`, `text/html`);
  res.end(printDirectory(path, relativePath, files));
};

const server = http.createServer((req, res) => {
  let localPath = new URL(req.url, ADDRESS);
  localPath = localPath.pathname.length <= 1 ? `` : localPath.pathname;
  const absolutePath = `${__dirname}/static/${localPath}`;

  (async () => {
    try {
      const pathStat = await fs.stat(absolutePath);
      console.log(pathStat);

      res.statusCode = 200;
      res.statusMessage = `OK`;

      if (pathStat.isDirectory()) {
        await readDir(absolutePath, localPath, res);
      } else {
        await readFile(absolutePath, res);
      }
    } catch (e) {
      res.writeHead(404, `Not Found`);
      res.end();
    }
  })().catch((e) => {
    res.writeHead(500, e.message, {
      'content-type': `text/plain`,
    });
    res.end(e.message);
  });
});

module.exports = {
  run() {
    server.listen(PORT, HOSTNAME, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log(`Server running at ${ADDRESS}`);
    });
  }
};
