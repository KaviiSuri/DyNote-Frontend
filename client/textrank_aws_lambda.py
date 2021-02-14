import json

import numpy as np
import pandas as pd
import nltk
import re
from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords
from gensim.models import Word2Vec
from gensim.summarization.summarizer import summarize
# from scipy import spatial
import networkx as nx
nltk.download('punkt')
nltk.download('stopwords')

import math
def cosine_similarity(v1,v2):
    "compute cosine similarity of v1 to v2: (v1 dot v2)/{||v1||*||v2||)"
    sumxx, sumxy, sumyy = 0, 0, 0
    for i in range(len(v1)):
        x = v1[i]; y = v2[i]
        sumxx += x*x
        sumyy += y*y
        sumxy += x*y
    return sumxy/math.sqrt(sumxx*sumyy)

def lambda_handler(event, context):
    # TODO implement
    #retrieve input
    text = event['body']
    
    #extracting important words from sentences
    sentences=sent_tokenize(text)
    
#     for sentence in sentences:
#         s=sentence.lower()
        
    clean_sentences = [re.sub(r'[^a-zA-Z0-9]','',sentence.lower()) for sentence in sentences]
    stop_words = stopwords.words('english')
    sentence_tokens=[[words for words in sentence.split(' ') if words not in stop_words] for sentence in clean_sentences]
    
    #retrieveing word embeddings
    w2v=Word2Vec(sentence_tokens,size=1,min_count=1,iter=1000)
    sentence_embeddings=[[w2v[word][0] for word in words] for words in sentence_tokens]
    max_len=max([len(tokens) for tokens in sentence_tokens])
    
    for embedding in sentence_embeddings:
        k = len(embedding)
        for j in range(max_len - k):
            embedding.append(0.)
    
    #creating similarity matrix and graph
    similarity_matrix = [[0.]*len(sentence_tokens)]*len(sentence_tokens)
    for i,row_embedding in enumerate(sentence_embeddings):
        for j,column_embedding in enumerate(sentence_embeddings):
            similarity_matrix[i][j]=1-cosine_similarity(row_embedding,column_embedding)
    

    d = {}
    for i in range(len(sentence_tokens)):
        d[i] = {}
        
    for i in range(len(sentence_tokens)):
        for j in range(len(sentence_tokens)):
            if i!=j:
                d[i][j] = similarity_matrix[j][i]
    
    nx_graph = nx.Graph(d)
    scores = nx.pagerank(nx_graph)
    
    # finding top sentences
    top_sentence={sentence:scores[index] for index,sentence in enumerate(sentences)}
    top=dict(sorted(top_sentence.items(), key=lambda x: x[1], reverse=True)[:int(0.5*len(sentences))])
    
    summary=''
    
    for sentence in sentences:
        if sentence in top.keys():
            if summary != '':
                summary = summary + ' '
            summary = summary + sentence
#     print(summary)
    return {
        'statusCode': 200,
        'body': summary
    }

def lambda_handler2(event,context):
    text = event['body']
    
    summary = summarize(text,ratio=0.5)
    
    return {
        'statusCode': 200,
        'body': summary
    }
