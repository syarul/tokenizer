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

const jsTokenizer = new JsTokenizer(vocab_size, oov_tok)
const pyTokenizer = new PyTokenizer(vocab_size, oov_tok)

jsTokenizer.fit_on_texts(sentences)
await pyTokenizer.fit_on_texts(sentences)

const js_word_index = jsTokenizer.word_index()
const py_word_index = await pyTokenizer.word_index()

assert.deepEqual(js_word_index, py_word_index, 'should have the same word_index')

const js_sequences = jsTokenizer.texts_to_sequences(sentences)
const py_sequences = await pyTokenizer.texts_to_sequences(sentences)

assert.deepEqual(js_sequences, py_sequences, 'should have the same sequences')

// close interactive python instance
pyTokenizer.close()
