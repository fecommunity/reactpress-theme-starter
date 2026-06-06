#!/usr/bin/env node
/**
 * Generate mockoon-data.json from shared mock payloads (data.mjs).
 * Used by CI (mockoon/cli-action) and optional local Mockoon CLI runs.
 */
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  mockArchives,
  mockArticle,
  mockArticles,
  mockCategories,
  mockCategory,
  mockKnowledgeBooks,
  mockPage,
  mockPages,
  mockSetting,
  mockTag,
  mockTags,
} from './data.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outputPath = join(__dirname, '../../mockoon-data.json')

const PORT = 3010
const HOST = '127.0.0.1'

function envelope(data) {
  return JSON.stringify({ success: true, data })
}

function createResponse(uuid, body) {
  return {
    uuid,
    body,
    latency: 0,
    statusCode: 200,
    label: '',
    headers: [{ key: 'Content-Type', value: 'application/json; charset=utf-8' }],
    bodyType: 'INLINE',
    filePath: '',
    databucketID: '',
    sendFileAsBody: false,
    rules: [],
    rulesOperator: 'OR',
    disableTemplating: true,
    fallbackTo404: false,
    default: true,
    crudKey: 'id',
    callbacks: [],
  }
}

function createRoute(uuid, responseUuid, method, endpoint, body) {
  return {
    uuid,
    type: 'http',
    documentation: '',
    method,
    endpoint,
    responses: [createResponse(responseUuid, body)],
    responseMode: null,
    streamingMode: null,
    streamingInterval: 0,
  }
}

const routes = [
  createRoute(
    'a1000001-0000-4000-8000-000000000001',
    'b1000001-0000-4000-8000-000000000001',
    'post',
    'setting/get',
    envelope(mockSetting)
  ),
  createRoute(
    'a1000001-0000-4000-8000-000000000002',
    'b1000001-0000-4000-8000-000000000002',
    'get',
    'article/all/recommend',
    envelope(mockArticles)
  ),
  createRoute(
    'a1000001-0000-4000-8000-000000000003',
    'b1000001-0000-4000-8000-000000000003',
    'get',
    'article/archives',
    envelope(mockArchives)
  ),
  createRoute(
    'a1000001-0000-4000-8000-000000000004',
    'b1000001-0000-4000-8000-000000000004',
    'get',
    'article/category/:category',
    envelope([mockArticles, mockArticles.length])
  ),
  createRoute(
    'a1000001-0000-4000-8000-000000000005',
    'b1000001-0000-4000-8000-000000000005',
    'get',
    'article/tag/:tag',
    envelope([mockArticles, mockArticles.length])
  ),
  createRoute(
    'a1000001-0000-4000-8000-000000000006',
    'b1000001-0000-4000-8000-000000000006',
    'get',
    'article/:id',
    envelope(mockArticle)
  ),
  createRoute(
    'a1000001-0000-4000-8000-000000000007',
    'b1000001-0000-4000-8000-000000000007',
    'get',
    'article',
    envelope([mockArticles, mockArticles.length])
  ),
  createRoute(
    'a1000001-0000-4000-8000-000000000008',
    'b1000001-0000-4000-8000-000000000008',
    'get',
    'category',
    envelope(mockCategories)
  ),
  createRoute(
    'a1000001-0000-4000-8000-000000000009',
    'b1000001-0000-4000-8000-000000000009',
    'get',
    'category/:id',
    envelope(mockCategory)
  ),
  createRoute(
    'a1000001-0000-4000-8000-00000000000a',
    'b1000001-0000-4000-8000-00000000000a',
    'get',
    'tag',
    envelope(mockTags)
  ),
  createRoute(
    'a1000001-0000-4000-8000-00000000000b',
    'b1000001-0000-4000-8000-00000000000b',
    'get',
    'tag/:id',
    envelope(mockTag)
  ),
  createRoute(
    'a1000001-0000-4000-8000-00000000000c',
    'b1000001-0000-4000-8000-00000000000c',
    'get',
    'page/:id',
    envelope(mockPage)
  ),
  createRoute(
    'a1000001-0000-4000-8000-00000000000d',
    'b1000001-0000-4000-8000-00000000000d',
    'get',
    'page',
    envelope([mockPages, mockPages.length])
  ),
  createRoute(
    'a1000001-0000-4000-8000-00000000000e',
    'b1000001-0000-4000-8000-00000000000e',
    'get',
    'knowledge/:id',
    envelope(null)
  ),
  createRoute(
    'a1000001-0000-4000-8000-00000000000f',
    'b1000001-0000-4000-8000-00000000000f',
    'get',
    'knowledge',
    envelope([mockKnowledgeBooks, mockKnowledgeBooks.length])
  ),
  createRoute(
    'a1000001-0000-4000-8000-000000000010',
    'b1000001-0000-4000-8000-000000000010',
    'get',
    'search/article',
    envelope(mockArticles)
  ),
]

const environment = {
  uuid: 'c1000001-0000-4000-8000-000000000001',
  lastMigration: 33,
  name: 'ReactPress CI Mock API',
  endpointPrefix: 'api',
  latency: 0,
  port: PORT,
  hostname: HOST,
  folders: [],
  routes,
  rootChildren: routes.map((route) => ({ type: 'route', uuid: route.uuid })),
  proxyMode: false,
  proxyHost: '',
  proxyRemovePrefix: false,
  tlsOptions: {
    enabled: false,
    type: 'CERT',
    pfxPath: '',
    certPath: '',
    keyPath: '',
    caPath: '',
    passphrase: '',
  },
  cors: true,
  headers: [],
  proxyReqHeaders: [{ key: '', value: '' }],
  proxyResHeaders: [{ key: '', value: '' }],
  data: [],
  callbacks: [],
}

writeFileSync(outputPath, `${JSON.stringify(environment, null, 2)}\n`)
console.log(`[mockoon] wrote ${outputPath}`)
