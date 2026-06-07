#!/usr/bin/env node
/**
 * Set package.json + theme.json version for CI npm publish (does not commit).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const version = process.argv[2]?.trim()

if (!version || !/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)) {
  console.error('Usage: node scripts/set-publish-version.mjs <semver>')
  process.exit(1)
}

const VERSION_RE = /("version"\s*:\s*")[^"]+(")/

function setFileVersion(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  if (!VERSION_RE.test(content)) {
    console.error(`Could not find version field in ${filePath}`)
    process.exit(1)
  }
  fs.writeFileSync(filePath, content.replace(VERSION_RE, `$1${version}$2`))
}

setFileVersion(path.join(root, 'package.json'))
setFileVersion(path.join(root, 'theme.json'))

console.log(`[set-publish-version] ${version}`)
