import csv
import json
import os
import glob

def flatten(array):
    return [e for subarray in array for e in subarray]

def get_env(field, default):
    return os.environ[field] if (field in os.environ) else default

def read_file(filepath = ''):
    file_obj = open(filepath, 'r')
    result = file_obj.read()
    file_obj.close()
    return result

def read_json(filepath = ''):
    result = read_file(filepath)
    result = json.loads(result)
    return result

def get_filenames_in_dir(pattern = ''):
    return glob.glob(pattern)

def list2d_to_csv(filepath = '', data = [], header = None):
    csvfile = open(filepath, 'w')
    writer = csv.writer(csvfile,
                        delimiter=',',
                        quotechar='"',
                        quoting=csv.QUOTE_ALL)
    for row in data:
        writer.writerow(row)
    return True