import type { ApplicationOptions } from './ApplicationOptions'

// individual environments configs:
import configFile from './config-files/config.json'
import configLocal from './config-files/config.local.json'
import configStaging from './config-files/config.staging.json'
import configProduction from './config-files/config.production.json'

// return appropriate config based on env VITE_ENVIRONMENT
let env = 'local' /* by default we return the mock configuration */

// if our env VITE_ENVIRONMENT variable is set, get its value
if (import.meta.env && import.meta.env.VITE_ENVIRONMENT) {
  env = String(import.meta.env.VITE_ENVIRONMENT)
    .trim()
    .toLowerCase()
}

console.log('Configuration environment [', env, ']')

// update the environment specific configuration over the root config file.
// this is not deep-merge, it swallow overwrite the settings
export const configsMap: Map<string, ApplicationOptions> = new Map<string, ApplicationOptions>([
  ['local', {...configFile, ...configLocal}],
  ['staging', {...configFile, ...configStaging}],
  ['production', {...configFile, ...configProduction}]
])

if (!configsMap.has(env)) {
  throw Error(`Could not find config for VITE_ENVIRONMENT key "${env}"`)
}

export const config: ApplicationOptions = configsMap.get(env) as ApplicationOptions
