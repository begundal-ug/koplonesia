import re

from collections import Counter
from common_util import flatten

def clean_text(text):
    result = text + ''
    result = str(result)
    result = result.lower()
    result = re.sub(r'\n', ' ', result)
    result = re.sub(r'[^a-zA-Z0-9\-\s]', '', result)
    result = re.sub(r'\s+', ' ', result)
    return result

def text_to_worldcloud(text):
    words = [clean_text(text)]
    words = [e.split('\n') for e in words]
    words = flatten(words)
    words = [e.split(' ') for e in words]
    words = flatten(words)

    word_counter = Counter(words)
    result = [list(e) for e in word_counter.most_common()]
    return result