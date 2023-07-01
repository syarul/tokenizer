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

import assert from 'assert'

import JsTokenizer from './tokenizer.js'
import PyTokenizer from './keras_preprocessing_text.js'

const vocab_size = 5
const oov_tok = '<OOV>'

const sentences = [
  'I love my dog',
  'I love my cat',
  'You love my dog!',
  'Do you think my dog is amazing?'
]

// test args
const args = [
  [],
  [vocab_size],
  [null, oov_tok],
  [vocab_size, oov_tok]
]

for (const arg of args){
  const pyTokenizer = new PyTokenizer(...arg)
  await pyTokenizer.fit_on_texts(sentences)

  const jsTokenizer = new JsTokenizer(...arg)
  jsTokenizer.fit_on_texts(sentences)

  const js_word_index = jsTokenizer.word_index()
  const py_word_index = await pyTokenizer.word_index()

  assert.deepEqual(js_word_index, py_word_index, 'should have the same word_index')

  pyTokenizer.close()
}
