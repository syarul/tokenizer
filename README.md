# tokenizer
A class Tokenizer to convert text documents into sequences of tokens.

[![NPM Version](https://img.shields.io/npm/v/text-tokenizer-utils.svg)](https://www.npmjs.com/package/text-tokenizer-utils)
[![sequence_utils CI](https://github.com/syarul/tokenizer/actions/workflows/main-ci.yml/badge.svg)](https://github.com/syarul/tokenizer/actions/workflows/main-ci.yml)

limited conversion of `tenserflow.keras.preprocessing.text`

> Currently only has 'fit_on_texts' 'word_index' and 'texts_to_sequences'

> The test unit compare output directly from `tenserflow.keras.preprocessing.text`

## Usage

```js
import Tokenizer from 'text-tokenizer-utils'

const vocab_size = 5
const oov_tok = '<OOV>'

const sentences = [
  'I love my dog',
  'I love my cat',
  'You love my dog!',
  'Do you think my dog is amazing?'
]

const tokenizer = new Tokenizer(vocab_size, oov_tok)

tokenizer.fit_on_texts(sentences)

console.log(tokenizer.word_index())
// {"<OOV>":1,"my":2,"love":3,"dog":4,"i":5,"you":6,"cat":7,"do":8,"think":9,"is":10,"amazing":11}

const sequences = tokenizer.texts_to_sequences(sentences)
// [[1,3,2,4],[1,3,2,1],[1,3,2,4],[1,1,1,2,4,1,1]]
```

You can also use directly the keras `preprocessing.text` python wrapper

```js
import Tokenizer from 'text-tokenizer-utils/keras_preprocessing_text.js'

const tokenizer = new Tokenizer(vocab_size, oov_tok)

await tokenizer.fit_on_texts(sentences)

const word_index = await tokenizer.word_index()
// {"<OOV>":1,"my":2,"love":3,"dog":4,"i":5,"you":6,"cat":7,"do":8,"think":9,"is":10,"amazing":11}

const sequences = await tokenizer.texts_to_sequences(sentences)
// [[1,3,2,4],[1,3,2,1],[1,3,2,4],[1,1,1,2,4,1,1]]

// close python instance
tokenizer.close()
```