import { Schema } from 'convict'
import fs from 'fs'

export interface ConfigSchema {
  port: number
  environment: 'development' | 'staging' | 'production' | 'testing'
  version: string
}

export const schema: Schema<ConfigSchema> = {
  port: {
    doc: 'The port that the service listens on',
    env: 'PORT',
    format: 'int',
    default: 8080,
  },
  environment: {
    doc: 'The environment that Node.js is running in',
    env: 'NODE_ENV',
    format: ['development', 'staging', 'production', 'testing'],
    default: 'development',
  },
  version: {
    doc: 'The version from package.json',
    env: 'VERSION',
    format: 'String',
    default: JSON.parse(fs.readFileSync('package.json', 'utf8')).version,
  },
}
