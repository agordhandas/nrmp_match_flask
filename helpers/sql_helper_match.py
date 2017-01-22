__author__ = 'AnkitAthos'

import pymysql
import credentials
creds = credentials.creds


def get_conn():
    '''
    return pymysql connection to desired DB
    '''


    conf = creds.copy()
    conf['db'] = conf.pop('schema')
    conf['passwd'] = conf.pop('password')
    conn = pymysql.connect(**conf)
    return conn


def run_query(query):
    conn = get_conn()
    cur = conn.cursor()
    cur.execute(query)
    try:
        conn.commit()
    except:
        pass
    return cur.fetchall()