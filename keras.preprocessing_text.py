import sys
import json
import tensorflow
from tensorflow.keras.preprocessing.text import Tokenizer

args = sys.argv

# Tokenize the text
tokenizer = Tokenizer(num_words = int(args[1]), oov_token = args[2])

sys.stdin
parsed_json = None

for line in sys.stdin:
    split_string = line.split(':::') # use triple separator
    if split_string[0] == 'fit_on_texts':
        parsed_json = json.loads(split_string[1])
        tokenizer.fit_on_texts(parsed_json)
    if split_string[0] == 'word_index':
        json_word_index = json.dumps(tokenizer.word_index)
        sys.stdout.write(json_word_index)
    if split_string[0] == 'texts_to_sequences':
        parsed_json = json.loads(split_string[1])
        text_sequences = tokenizer.texts_to_sequences(parsed_json)
        json_text_sequences = json.dumps(text_sequences)
        sys.stdout.write(json_text_sequences)