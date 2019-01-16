import pandas as pd
import numpy as np
from scipy.stats import trim_mean, kurtosis
from scipy.stats.mstats import mode, gmean, hmean

print("test")
df_via = pd.read_csv('./via.csv')
df_nella = pd.read_csv('./nella.csv')
print(df_nella.describe())
print(df_via.describe())
print('danceability_min', df_via['danceability'].min(), df_nella['danceability'].min())
print('valence_min', df_via['valence'].min(), df_nella['valence'].min())

print(df_via.corr())