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

const pkgPath = path.join(root, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
pkg.version = version
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)

const themePath = path.join(root, 'theme.json')
const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'))
theme.version = version
fs.writeFileSync(themePath, `${JSON.stringify(theme, null, 2)}\n`)

console.log(`[set-publish-version] ${version}`)
