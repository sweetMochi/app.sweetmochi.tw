// 比對正式主機與本地 build 的檔案 hash，確認部署是否成功
// 用法：npm run check-deploy [-- 網址]，需先執行 npm run build
import { createHash } from 'node:crypto'
import { existsSync } from 'node:fs'
import { readdir, readFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

const BUILD_DIR = 'dist/app.sweetmochi.tw/browser'
const SITE_URL = process.argv[2] ?? 'https://app.sweetmochi.tw/'

const sha256 = (data) => createHash('sha256').update(data).digest('hex')

// PHP 於主機端執行、點檔案（.htaccess）禁止存取，無法以內容比對
const isComparable = (path) =>
	!path.endsWith('.php') && !path.split('/').some((part) => part.startsWith('.'))

async function listFiles(dir) {
	const entries = await readdir(dir, { recursive: true, withFileTypes: true })
	return entries
		.filter((entry) => entry.isFile())
		.map((entry) =>
			relative(BUILD_DIR, join(entry.parentPath, entry.name)).split(sep).join('/'),
		)
		.filter(isComparable)
		.sort()
}

// 主機找不到檔案時 .htaccess 會改回傳 index.html，因此只看狀態碼不準確，需比對內容
async function compare(path) {
	const local = sha256(await readFile(join(BUILD_DIR, path)))
	try {
		const res = await fetch(new URL(path, SITE_URL), {
			headers: { 'Cache-Control': 'no-cache' },
		})
		if (!res.ok) {
			return { path, ok: false, reason: `HTTP ${res.status}` }
		}
		const remote = sha256(Buffer.from(await res.arrayBuffer()))
		if (local === remote) {
			return { path, ok: true, reason: '' }
		}
		const isFallback =
			!path.endsWith('.html') && res.headers.get('content-type')?.startsWith('text/html')
		return { path, ok: false, reason: isFallback ? '主機無此檔案' : 'hash 不同' }
	} catch (error) {
		return { path, ok: false, reason: error.cause?.code ?? error.message }
	}
}

if (!existsSync(join(BUILD_DIR, 'index.html'))) {
	console.error(`找不到 ${BUILD_DIR}/index.html，請先執行 npm run build`)
	process.exit(1)
}

const results = await Promise.all((await listFiles(BUILD_DIR)).map(compare))
const failed = results.filter((result) => !result.ok)

console.log(`比對 ${SITE_URL}，共 ${results.length} 個檔案\n`)
for (const { path, ok, reason } of results) {
	console.log(`${ok ? '✔' : '✘'} ${path}${reason ? `（${reason}）` : ''}`)
}

if (failed.length) {
	console.error(`\n${failed.length} 個檔案與本地 build 不一致，部署尚未完成或失敗`)
	process.exit(1)
}
console.log('\n所有檔案與本地 build 一致，部署成功')
