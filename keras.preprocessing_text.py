import sys
import json
from keras.preprocessing.text import Tokenizer

# Get the values from sys.argv
arguments = sys.argv[1:]  # Exclude the script name from the list
num_words = None
oov_token = None

for arg in arguments:
    if arg.startswith('num_words='):
        num_words = int(arg.split('=')[1])
    elif arg.startswith('oov_token='):
        oov_token = arg.split('=')[1]

# Create the Tokenizer instance
tokenizer = Tokenizer(num_words=num_words, oov_token=oov_token)

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