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

import natural from 'natural'

const { WordTokenizer } = natural

function padArrays (arrays, padVal) {
  // Find the maximum length among all arrays
  const maxLen = arrays.reduce((max, arr) => Math.max(max, arr.length), 0)
  // Pad each array to the maximum length
  return arrays.map((arr) => {
    const padLen = maxLen - arr.length
    return arr.concat(Array(padLen).fill(padVal))
  })
}

function fit (tokens) {
  // Create a frequency counter for the tokens
  tokens.forEach(token => {
    token = (token === this.missingToken && this.missingToken) || token.toLowerCase()
    if (this.frequencyCounter[token]) {
      this.frequencyCounter[token]++
    } else {
      this.frequencyCounter[token] = 1
    }
  })
}

function sort () {
  const sortedTokens = Object.keys(this.frequencyCounter).sort((a, b) => this.frequencyCounter[b] - this.frequencyCounter[a])
  sortedTokens.forEach((token, index) => {
    this.tokenIndex[token] = index + 1 // Start indexing from 1, 0 is reserved for padding
  })
}

function tokensMapper (sentence) {
  const tokens = this.tokenizer.tokenize(sentence)
  return tokens.map(token => {
    const t = this.tokenIndex[token]
    return t !== undefined && t < this.numWords ? t : 1
  })
}

class Tokenizer {
  constructor (numWords, missingToken) {
    this.numWords = numWords
    this.missingToken = missingToken
    this.frequencyCounter = {}
    this.tokenIndex = {}
    this.tokenizer = new WordTokenizer()
  }

  fit_on_texts (sentences) {
    const tokens = sentences.map(sentence => this.tokenizer.tokenize(sentence))
    if (this.missingToken) {
      const paddedTokens = padArrays(tokens, this.missingToken)
      paddedTokens.map(fit.bind(this))
    } else {
      tokens.map(fit.bind(this))
    }
    sort.call(this)
  }

  word_index () {
    const sortedEntries = Object.entries(this.tokenIndex).sort((a, b) => a[1] - b[1])
    return Object.fromEntries(sortedEntries)
  }

  texts_to_sequences (sentences) {
    if (Array.isArray(sentences)) {
      return sentences.map(tokensMapper.bind(this))
    } else {
      return tokensMapper.call(this, sentences)
    }
  }

  close () {}
}

export default Tokenizer
