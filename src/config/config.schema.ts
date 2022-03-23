import { Schema } from 'convict'
import fs from 'fs'

export interface ConfigSchema {
  port: number
  environment: 'development' | 'staging' | 'production' | 'testing'
  version: string
  logGroupName: string
  logStreamName: string
  awsAccessKeyId: string
  awsSecretKey: string
  awsRegion: string
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
  logGroupName: {
    doc: 'Cloudwatch group name',
    env: 'CLOUDWATCH_GROUP_NAME',
    format: 'String',
    default: '',
  },
  logStreamName: {
    doc: 'Cloudwatch stream name',
    env: 'CLOUDWATCH_STREAM_NAME',
    format: 'String',
    default: '',
  },
  awsAccessKeyId: {
    doc: 'AWS Access Key Id',
    env: 'AWS_ACCESS_KEY_ID',
    format: 'String',
    default: '',
  },
  awsSecretKey: {
    doc: 'AWS Secret Key',
    env: 'AWS_SECRET_KEY',
    format: 'String',
    default: '',
  },
  awsRegion: {
    doc: 'AWS REGION',
    env: 'AWS_REGION',
    format: 'String',
    default: 'ap-southeast-1',
  },
}
