#!/usr/bin/env node
/**
 * Minimal ReactPress API mock for CI / offline production builds.
 * Serves the envelope shape expected by @fecommunity/reactpress-toolkit.
 */
import http from 'node:http'
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

const PORT = Number(process.env.MOCK_API_PORT || 3010)
const HOST = process.env.MOCK_API_HOST || '127.0.0.1'

function sendJson(res, data, statusCode = 200) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify({ success: true, data }))
}

function sendList(res, items) {
  sendJson(res, items)
}

function sendPaginated(res, items) {
  sendJson(res, [items, items.length])
}

function sendOne(res, item) {
  sendJson(res, item)
}

function normalizePath(pathname) {
  return pathname.replace(/^\/api(?=\/|$)/, '') || '/'
}

function matchRoute(method, pathname) {
  const path = normalizePath(pathname)

  if (method === 'POST' && path === '/setting/get') {
    return (res) => sendOne(res, mockSetting)
  }

  if (method === 'GET' && path === '/article') {
    return (res) => sendPaginated(res, mockArticles)
  }
  if (method === 'GET' && path === '/article/all/recommend') {
    return (res) => sendList(res, mockArticles)
  }
  if (method === 'GET' && path === '/article/archives') {
    return (res) => sendOne(res, mockArchives)
  }
  if (method === 'GET' && path.startsWith('/article/category/')) {
    return (res) => sendPaginated(res, mockArticles)
  }
  if (method === 'GET' && path.startsWith('/article/tag/')) {
    return (res) => sendPaginated(res, mockArticles)
  }
  if (method === 'GET' && path.startsWith('/article/')) {
    return (res) => sendOne(res, mockArticle)
  }

  if (method === 'GET' && path === '/category') {
    return (res) => sendList(res, mockCategories)
  }
  if (method === 'GET' && path.startsWith('/category/')) {
    return (res) => sendOne(res, mockCategory)
  }

  if (method === 'GET' && path === '/tag') {
    return (res) => sendList(res, mockTags)
  }
  if (method === 'GET' && path.startsWith('/tag/')) {
    return (res) => sendOne(res, mockTag)
  }

  if (method === 'GET' && path === '/page') {
    return (res) => sendPaginated(res, mockPages)
  }
  if (method === 'GET' && path.startsWith('/page/')) {
    const id = decodeURIComponent(path.slice('/page/'.length))
    const page = mockPages.find((item) => item.id === id) ?? mockPage
    return (res) => sendOne(res, page)
  }

  if (method === 'GET' && path === '/knowledge') {
    return (res) => sendPaginated(res, mockKnowledgeBooks)
  }
  if (method === 'GET' && path.startsWith('/knowledge/')) {
    return (res) => sendOne(res, null)
  }

  if (method === 'GET' && path === '/search/article') {
    return (res) => sendList(res, mockArticles)
  }

  return null
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${HOST}:${PORT}`)
  const handler = matchRoute(req.method || 'GET', url.pathname)

  if (handler) {
    handler(res)
    return
  }

  sendJson(res, null)
})

server.listen(PORT, HOST, () => {
  console.log(`[mock-api] listening on http://${HOST}:${PORT}/api`)
})
