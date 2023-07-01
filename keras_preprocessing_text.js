/**
 * @license
 * Copyright 2019 Shahrul Nizam Selamat All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import { spawn, exec } from 'child_process'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const pyPath = path.resolve(__dirname, 'keras.preprocessing_text.py')

function onData (data) {
  return function (resolve) {
    let output
    try {
      output = JSON.parse(data)
    } catch (e) {
      output = data.toString()
    }
    resolve(output)
    this.pyp.stdout.removeListener('data', onData)
  }.bind(this)
}

export default class Tokenizer {
  constructor (num_words, oov_token) {
    this.num_words = num_words
    this.oov_token = oov_token
    const args = []
    if(num_words){
      args.push(`num_words=${num_words}`)
    }
    if(oov_token){
      args.push(`oov_token=${oov_token}`)
    }
    this.pyp = spawn('python', ['-u', pyPath, ...args])

    this.pyp.stderr.on('data', (data) => {
      console.log(`Error: ${data}`)
    })

    this.pyp.on('close', () => {})
  }

  async fit_on_texts (vectors) {
    this.pyp.stdin.write(`fit_on_texts:::${JSON.stringify(vectors)}\n`)
  }

  async word_index () {
    return new Promise(resolve => {
      this.pyp.stdout.on('data', data => onData.call(this, data)(resolve))
      this.pyp.stdin.write('word_index:::\n')
    })
  }

  async texts_to_sequences (vectors) {
    return new Promise(resolve => {
      this.pyp.stdout.on('data', data => onData.call(this, data)(resolve))
      this.pyp.stdin.write(`texts_to_sequences:::${JSON.stringify(vectors)}\n`)
    })
  }

  close () {
    const pid = this.pyp.pid
    const killCommand = `kill ${pid}`
    exec(killCommand, (killError, killStdout, killStderr) => {
      if (killError) {
        this.pyp.kill()
      }
    })
  }
}
