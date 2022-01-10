# Tika Text Extract

> Extract text from any document by [Apache Tika](https://tika.apache.org/)

[![CircleCI](https://img.shields.io/circleci/project/github/vladgolubev/tika-text-extract.svg)](https://circleci.com/gh/vladgolubev/tika-text-extract)
[![npm](https://img.shields.io/npm/v/tika-text-extract.svg)](https://www.npmjs.com/package/tika-text-extract)
[![David](https://img.shields.io/david/vladgolubev/tika-text-extract.svg)](https://david-dm.org/vladgolubev/tika-text-extract)
[![npm](https://img.shields.io/npm/dm/tika-text-extract.svg)](https://github.com/vladgolubev/tika-text-extract)

## What?

> The Apache Tika™ toolkit detects and extracts metadata and text from over a thousand
> different file types (such as PPT, XLS, and PDF). All of these file types can be parsed
> through a single interface, making Tika useful for search engine indexing,
> content analysis, translation, and much more.

## Why?

This was mainly built for convenience usage in AWS Lambda environment.

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
$ yarn add @shelf/tika-text-extract
```

## Usage

```javascript
import {readFileSync} from 'fs';
import tte from '@shelf/tika-text-extract';

await tte.startServer('/tmp/tika-server-1.14.jar');
const testFile = readFileSync('./README.md');

const extractedText = await tte.extract(testFile);
```

## Execute Tika with a custom path to Java binary

```javascript
const options = {executableJavaPath: '/bin/jre/java'};

await tte.startServer('/tmp/tika-server-2.2.1.jar', options);
// The next command will be executed:
// /bin/jre/java --add-modules=java.xml.bind,java.activation -Duser.home=/tmp -jar /tmp/tika-server-1.14.jar
```

## Execute Tika with Java version less than 9

By default the library does not support Java version less than 9.
In order to use it with Java 8, pass an option to `startServer` function

```javascript
const options = {alignWithJava8: true};

await tte.startServer('/tmp/tika-server-2.2.1.jar', options);
// The next command will be executed:
// java  -Duser.home=/tmp -jar /tmp/tika-server-1.14.jar
```

## API

You can see debug messages by setting env var `DEBUG=tika-text-extract`

### tte.startServer(artifactPath)

Params: `artifactPath` - path to your `tika-server.jar` file.

Returns: Promise resolved when server is started. Rejects in case of error.

### tte.extract(fileInput)

Params: `fileInput` - `Buffer`, `String`, `Stream` or `Promise` of file to extract text from.

Returns: Promise resolved with extracted text.

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)
