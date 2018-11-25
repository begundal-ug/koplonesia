

from modules.common_util import read_json, list2d_to_csv
from modules.ds import text_to_worldcloud


if __name__ == '__main__':
    
    artist = 'via-vallen'

    raw = read_json('../../common/tracks/%s.json' % (artist))
    for md in raw:
        title = md['title']
        lyric = md['lyric']
        wc = text_to_worldcloud(lyric)
        filepath = '%s.csv' % (title.lower().replace(' ', '-'))
        csvpath = '../../common/science/word_count/%s' % (filepath)
        list2d_to_csv(filepath=csvpath, data=wc)