import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'

const exercisesDir = new URL('../exercises', import.meta.url)
const requiredAdapterExport = 'export async function search'

if (!existsSync(exercisesDir)) {
  console.log('✓ No exercises yet')
  process.exit(0)
}

const exerciseNames = readdirSync(exercisesDir)
  .filter((name) => statSync(new URL(`../exercises/${name}`, import.meta.url)).isDirectory())

for (const name of exerciseNames) {
  const directory = new URL(`../exercises/${name}/`, import.meta.url)
  const configPath = new URL('platform.json', directory)
  const adapterPath = new URL('adapter.mjs', directory)
  const docsPath = new URL('README.md', directory)

  if (!existsSync(configPath)) {
    throw new Error(`${name}: platform.json is required`)
  }

  const config = JSON.parse(readFileSync(configPath, 'utf8'))
  if (config.name !== name) {
    throw new Error(`${name}: platform.json name must match the exercise directory`)
  }
  if (!Number.isInteger(config.maxResults) || config.maxResults < 1 || config.maxResults > 100) {
    throw new Error(`${name}: maxResults must be an integer from 1 to 100`)
  }

  if (existsSync(docsPath) && !existsSync(adapterPath)) {
    throw new Error(`${name}: documentation requires adapter.mjs from the lower layer`)
  }

  if (existsSync(adapterPath)) {
    const adapter = readFileSync(adapterPath, 'utf8')
    if (!adapter.includes(requiredAdapterExport)) {
      throw new Error(`${name}: adapter.mjs must export an async search function`)
    }
  }

  console.log(`✓ ${name}`)
}

console.log(`✓ Checked ${exerciseNames.length} exercise${exerciseNames.length === 1 ? '' : 's'}`)
