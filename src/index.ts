import { Injex } from '@injex/node'
import { LogLevel } from '@injex/core'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

dirname(fileURLToPath(import.meta.url))

Injex.create({
  rootDirs: [dirname(fileURLToPath(import.meta.url))],
  globPattern: '/**/*.ts',
  logLevel: LogLevel.Debug
}).bootstrap().catch(console.error)
