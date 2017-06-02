# Tika Text Extract

> Extract text from any document by [Apache Tika](https://tika.apache.org/)

[![npm](https://img.shields.io/npm/v/tika-text-extract.svg)](https://www.npmjs.com/package/tika-text-extract)
[![Build Status](https://travis-ci.org/vladgolubev/tika-text-extract.svg?branch=master)](https://travis-ci.org/vladgolubev/tika-text-extract)
[![David](https://img.shields.io/david/vladgolubev/tika-text-extract.svg)](https://github.com/vladgolubev/tika-text-extract)

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
$ npm i -S tika-text-extract
```

## Usage

```javascript
import {readFileSync} from 'fs';

await tte.startServer('/tmp/tika-server-1.14.jar');
const testFile = readFileSync('./README.md');

const extractedText = await tte.extract(testFile);
const extractedText = await tte.extract(testFile);
```

## API

### tte.startServer(artifactPath)

Params: `artifactPath` - path to your `tika-server.jar` file.

Returns: Promise resolved when server is started. Rejects in case of error.

### tte.extract(fileInput)

Params: `fileInput` - `Buffer`, `String`, `Stream` or `Promise` of file to extract text from.

Returns: Promise resolved with extracted text.
