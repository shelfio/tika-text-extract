# Tika Text Extract

> Extract text from any document by [Apache Tika](https://tika.apache.org/)

## What?

> The Apache Tika™ toolkit detects and extracts metadata and text from over a thousand
> different file types (such as PPT, XLS, and PDF). All of these file types can be parsed
> through a single interface, making Tika useful for search engine indexing,
> content analysis, translation, and much more.

## Why?

If you want to use Tika from node.js you are left with these options:
* Spawn a CLI - no, extremely inefficient to pay for Java startup time
* Start HTTP Server
* Use Java ?

Spawning a Tika as CLI is extremely inefficient.
Using Java API from node.js is tedious.
This module starts a [Tika HTTP Server](https://wiki.apache.org/tika/TikaJAXRS) to stream files to
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
