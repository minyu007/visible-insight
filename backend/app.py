from flask import Flask, abort, request, send_file, flash, redirect, url_for
from werkzeug.utils import secure_filename

import os
import pandas as pd
import psycopg2
import json
from datetime import datetime
# from dateutil.relativedelta import relativedelta
# from openpyxl import load_workbook
# from openpyxl.styles import PatternFill, Border, Side, Font
# from copy import copy

# import re
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.common.exceptions import NoSuchElementException
# from selenium.common.exceptions import TimeoutException
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.support.ui import WebDriverWait
import pandas as pd
import time
import requests
import secrets
import string
import re

UPLOAD_FOLDER = './data'
ALLOWED_EXTENSIONS = {'xlsx'}
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/amc-pro-api/list/getReplayData",  methods=['POST'])
def get_replay_data():
    params = request.json
    # imuser = request.cookies.get('imuser')
    # imuser = json.loads(imuser)
    # user_name = imuser['name']
    # a_number = params.get('a_number')
    created_on = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
    print(created_on)
    print(created_on, ': ', '/list/getReplayData',
          'a_number', 'user_name')
    
    df = pd.read_excel('./data/tickers.xlsx')
    # print(df)
    df = df.set_index('Timer')
    # print(df)
    df = df.astype(float)
    df = (df+1).cumprod()
    df = (df-1)

    last_row = df.iloc[-1]
    sorted_df = df[last_row.sort_values(ascending=False).index]
    print(sorted_df.iloc[-1])
    # sorted_df = df.sort_values(by=df.iloc[-1], axis=1, ascending=False)
    print(sorted_df)
    arr = []

    last_row1 = sorted_df.iloc[-1]
    twenty_percentile = last_row1.quantile(0.8)
    # index, value in enumerate(my_list):
    for idx, v in enumerate(sorted_df.columns.tolist()[1:]):
        data = sorted_df[v].tolist()
        category = 'bad'
        if data[-1] >= twenty_percentile: 
            category = 'good'

        name = v.split("_")[0]
        arr.append({
            'name': name,
            'sector':  v.split("_")[1],
            'data': data,
            'index': idx,
            'category': category,
            'value': data[-1]
        })
    # print(arr)
    tickers = {"sector": list(set([v.split("_")[-1] for v in sorted_df.columns.tolist()[1:]])), "timer": sorted_df.index.tolist(), "arr": arr}

    result = {'code': 200, 'data': {'tickers': tickers}}
    return json.dumps(result)