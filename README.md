# Tika Text Extract

> Extract text from any document by Apache Tika

## Why?

Spawning a Tika as CLI is extremely inefficient.
Using Java API from node.js is tedious.
This module starts a Tika HTTP Server to stream files to
and return a string of extracted text.

Requires `java` to be present on the system.

## Install

```bash
npm i tika-text-extract -S
```

## Usage

```javascript
const tte = require('tika-text-extract');
const testFile = require('fs').readFileSync('./README.md');

tte.startServer('/tmp/tika-server-1.14.jar')
  .then(() => tte.extract(testFile))
  .then(console.log) // text here
  .catch(console.log);
```

If you are going to extract a lot of files, reuse `tte.startServer` Promise.
So server will be already started.

```javascript
const waitForServer = tte.startServer('/tmp/tika-server-1.14.jar');

waitForServer.then(tte.extract(testFile));
waitForServer.then(tte.extract(testFile));
// ...
```

If you are using node 7.6+, `async/await` makes it even better:

```javascript
await tte.startServer('/tmp/tika-server-1.14.jar');

const extractedText = await tte.extract(testFile);
const extractedText = await tte.extract(testFile);
// ...
```

## API

### tte.startServer(artifactPath)

Params: `artifactPath` - path to your `tika-server.jar` file.

Returns: Promise resolved when server is started. Rejects in case of error.

### tte.extract(fileInput)

Params: `fileInput` - `Buffer`, `String`, `Stream` or `Promise` of file to extract text from.

Returns: Promise resolved with extracted text.
