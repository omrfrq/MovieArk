from asyncio import set_event_loop
from dataclasses import replace
from unittest import result
from xmlrpc.server import SimpleXMLRPCDispatcher
from imdb import IMDb
from datetime import timedelta
from os import system, name
import json
import redis
from functools import reduce
import requests
import copy
from flask import Flask, request, render_template
from flask_cors import CORS
# import tmdbsimple as tmdb
# from tmdbv3api import TMDb
# from tmdbv3api import Movie


# app = Flask(__name__, static_url_path='', static_folder='templates/static')

app = Flask(__name__, static_folder='../build', static_url_path='/')

#Flask
#app = Flask(__name__)
CORS(app)

#IMDBpy
ia = IMDb()

# #tmdbsimple
# tmdb.API_KEY = 'a662712626815555702f1c6320550397'
# movie = Movie()

#Redis
redis_client=redis.Redis(host='localhost', port=6379, db=0)

# #tmdbv3api
# tmdb1 = TMDb()
# tmdb1.api_key = 'a662712626815555702f1c6320550397'

#//////////////////////////SEARCH/////////////////////////
def search(name,Job):

  def get_values(d):
    for key, value in d.items():
      if key=='results':
        yield value
        if isinstance(value, dict):
            yield from get_values(value)

  def get_cast(d):
    for key, value in d.items():
      if key=='cast':
        yield value
        if isinstance(value, dict):
            yield from get_values(value)
      
  def get_crew(d):
    for key, value in d.items():
      if key=='crew':
        yield value
        if isinstance(value, dict):
            yield from get_values(value)

  search = ia.search_person(name) 
  link='https://api.themoviedb.org/3/search/movie?api_key=a662712626815555702f1c6320550397&language=en-US&query=${QUERY}&page=1&include_adult=false'
  link_credits='https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=a662712626815555702f1c6320550397&language=en-US'
  result=[]
  temp={}
  res={}
  k=[]
  v=[]

  id=search[0].personID  
  nam = ia.get_person(id)
  for job in nam['filmography']:
    if job==Job:
      for movie in nam['filmography'][job]:
        if '()' in movie['title']:
          print('skipped')
        else:
          api_link=link.replace('QUERY',movie['title'])
          response=requests.get(api_link)
          for x in get_values(response.json()):
            if len(x)==0:
              print('skipped2')
            else:  
              for key, val in x[0].items():
                k.append(key)
                v.append(val)
              temp = dict(zip(k,v))
              res=copy.deepcopy(temp)
              for key, val in temp.items():
                if key=='id':
                  credits_link=link_credits.replace('{movie_id}',str(val))
                  response_credits=requests.get(credits_link)
                  for y in get_cast(response_credits.json()):
                    res['cast']=y
                  for z in get_crew(response_credits.json()):
                    res['crew']=z
              result.append(res)
          
  return result

#//////////////////////////EXTRACT DATA/////////////////////////
def extract_data(super_set, filters):

  super_set_update=[]
  movie_info_list=[]

  for code, filter in filters.items():
    
    if code=='3':
      #cast   
      for x in super_set:
        for keys,vals in x.items():
          if keys=='cast':
            for y in vals:
              for key, val in y.items():
                if key=='name' and y[key]==filter:
                  super_set_update.append(x)

      super_set=super_set_update
          
    elif code=='1' or code=='2' or code=='4' or code=='5':
      #crew
      if code=='1':

        for x in super_set:
          for keys,vals in x.items():
            if keys=='crew':
              for y in vals:
                for key, val in y.items():
                  if key=='name' and y[key]==filter:
                    for k1,v1 in x.items():
                      if k1=='crew':
                        for y2 in v1:
                          for k2,v2 in y2.items():
                            if k2=='job' and y2[k2]=='Director':
                              super_set_update.append(x)
        
        super_set=super_set_update

    elif code=='2':

        for x in super_set:
          for keys,vals in x.items():
            if keys=='crew':
              for y in vals:
                for key, val in y.items():
                  if key=='name' and y[key]==filter:
                    for k1,v1 in x.items():
                      if k1=='crew':
                        for y2 in v1:
                          for k2,v2 in y2.items():
                            if k2=='job' and y2[k2]=='Writer':
                              super_set_update.append(x)
        
        super_set=super_set_update

    elif code=='4':

        for x in super_set:
          for keys,vals in x.items():
            if keys=='crew':
              for y in vals:
                for key, val in y.items():
                  if key=='name' and y[key]==filter:
                    for k1,v1 in x.items():
                      if k1=='crew':
                        for y2 in v1:
                          for k2,v2 in y2.items():
                            if k2=='job' and y2[k2]=='Director of Photography':
                              super_set_update.append(x)
        
        super_set=super_set_update

    elif code=='5':

        for x in super_set:
          for keys,vals in x.items():
            if keys=='crew':
              for y in vals:
                for key, val in y.items():
                  if key=='name' and y[key]==filter:
                    for k1,v1 in x.items():
                      if k1=='crew':
                        for y2 in v1:
                          for k2,v2 in y2.items():
                            if k2=='job' and y2[k2]=='Original Music Composer':
                              super_set_update.append(x)
        
        super_set=super_set_update

  for i in super_set:
    info={}
    for key, val in i.items():
      if key=='title' or key=='release_date' or key=='poster_path' or key=='overview' or key=='vote_average' or key=='genre_ids' or key=='id':
        info[key]=val
    movie_info_list.append(info)

  return movie_info_list

#//////////////////////////SECONDAY FUNCTIONS/////////////////////////
def secondary_functions(movies,filters):

  movie_info_list=copy.deepcopy(movies)

  for key, val in filters.items():

    if key=='6':

      for i in movies:
        for k,v in i.items():
          if k=='genre_ids':
            for j in v:
              temp=int(val)
              if j==temp:
                movie_info_list.remove(i)

      movies=movie_info_list

    elif key=='7':

      link_budget='https://api.themoviedb.org/3/movie/{movie_id}?api_key=a662712626815555702f1c6320550397&append_to_response=budget'

      for i in movies:
        for k,v in i.items():
          if k=='id':
            budget_link=link_budget.replace('{movie_id}',str(v))
            response=requests.get(budget_link)
            response_budget=response.json()
            for keys,values in response_budget.items():
              if keys=='budget':
                temp=int(val)
                if values>=temp:
                  movie_info_list.remove(i)

      movies=movie_info_list

    elif key=='8':

      link_profit='https://api.themoviedb.org/3/movie/{movie_id}?api_key=a662712626815555702f1c6320550397&append_to_response=budget'

      for i in movies:
        for k,v in i.items():
          if k=='id':
            profit_link=link_profit.replace('{movie_id}',str(v))
            response=requests.get(profit_link)
            response_profit=response.json()
            for keys,values in response_profit.items():
              if keys=='revenue':
                temp=int(val)
                if values>=temp:
                  movie_info_list.remove(i)

      movies=movie_info_list

    elif key=='9':

      link_profit='https://api.themoviedb.org/3/movie/{movie_id}?api_key=a662712626815555702f1c6320550397&append_to_response=budget'

      for i in movies:
        for k,v in i.items():
          if k=='id':
            profit_link=link_profit.replace('{movie_id}',str(v))
            response=requests.get(profit_link)
            response_profit=response.json()
            for keys,values in response_profit.items():
              if keys=='production_company':
                if values!=val:
                  movie_info_list.remove(i)

      movies=movie_info_list
      

    elif key=='10':

      year_lower_limit=int(val)

    elif key=='11':

      for i in movies:
        for k,v in i.items():
          if k=='release_date':
            temp=int(v[0:4])
            year_upper_limit=int(val)
            if  temp >= year_lower_limit and temp <= year_upper_limit:
              print('true')
            else:
              movie_info_list.remove(i)

      movies=movie_info_list

  return movie_info_list

#//////////////////////////NARROW DOWN/////////////////////////
def Narrow_down(list):

    primary_filters={}
    secondary_filters={}

    for k,v in list.items():
      if k=='1' or k=='2' or k=='3' or k=='4' or k=='5':
        primary_filters[k]=v
      else:
        secondary_filters[k]=v

    cash_hit=False
    filter_list={}
    temp={}
    temp=copy.deepcopy(primary_filters)
    super_set={}
    count=0

    for code,filter in primary_filters.items():

        if code=='1':
            director_name=f"{filter}_director2"
            cash=redis_client.get(director_name)
            
            if cash != None:
                count+=1
                cash_hit=True
                c=json.loads(cash.decode('utf-8'))
                filter_list[code] = c
                temp.pop(code)
        
        elif code=='2':
            writer_name=f"{filter}_writer2"
            cash=redis_client.get(writer_name)

            if cash != None:
                count+=1
                cash_hit=True
                c=json.loads(cash.decode('utf-8'))
                filter_list[code] = c
                temp.pop(code)

        elif code=='3':
            actor_name=f"{filter}_actor2"
            cash=redis_client.get(actor_name)

            if cash != None:
                count+=1
                cash_hit=True
                c=json.loads(cash.decode('utf-8'))
                filter_list[code] = c
                temp.pop(code)

        elif code=='4':
            composer_name=f"{filter}_composer2"
            cash=redis_client.get(composer_name)

            if cash != None:
                count+=1
                cash_hit=True
                c=json.loads(cash.decode('utf-8'))
                filter_list[code] = c
                temp.pop(code)

        elif code=='5':
            cinematographer_name=f"{filter}_cinematographer2"
            cash=redis_client.get(cinematographer_name)

            if cash != None:
                count+=1
                c=json.loads(cash.decode('utf-8'))
                filter_list[code] = c
                temp.pop(code)

    if cash_hit==True and count==len(primary_filters):
      
      print('1111111111111111111111111111')
      super_set=reduce(lambda d1, d2: {k: v for k, v in d1.items() if k in d2 and d2[k] == d1[k]}, filter_list.values())

      output=[]
      for i in super_set:
        info={}
        for key, val in i.items():
          if key=='title' or key=='release_date' or key=='poster_path' or key=='overview' or key=='vote_average' or key=='genre_ids' or key=='id':
            info[key]=val
        output.append(info)
      
      if len(secondary_filters)!=0:
          print('//////////////TRUE///////////////')
          Output=secondary_functions(output,secondary_filters)
          return Output 
      else:
        print('//////////////FALSE///////////////')
        return output

    if cash_hit==True and len(primary_filters)==1:
      
      print('2222222222222222222222222222')
      super_set=reduce(lambda d1, d2: {k: v for k, v in d1.items() if k in d2 and d2[k] == d1[k]}, filter_list.values())

      output=[]
      for i in super_set:
        info={}
        for key, val in i.items():
          if key=='title' or key=='release_date' or key=='poster_path' or key=='overview' or key=='vote_average' or key=='genre_ids' or key=='id':
            info[key]=val
        output.append(info)
      
      if len(secondary_filters)!=0:
          print('//////////////TRUE///////////////')
          Output=secondary_functions(output,secondary_filters)
          return Output 
      else:
        print('//////////////FALSE///////////////')
        return output

    elif cash_hit==True:

        print('333333333333333333333333')
        super_set=reduce(lambda d1, d2: {k: v for k, v in d1.items() if k in d2 and d2[k] == d1[k]}, filter_list.values())
        output=extract_data(super_set, temp)
        
        if len(secondary_filters)!=0:
          print('//////////////TRUE///////////////')
          Output=secondary_functions(output,secondary_filters)
          return Output 
        else:
          print('//////////////FALSE///////////////')
          return output

    elif cash_hit==False:

        filter_list_2={}
        temp2={}
        temp2=copy.deepcopy(temp)

        for key, val in temp.items():
            if key=='1':

                director_name=f"{val}_director2"
                j='director'
                dir=search(val,j)
                redis_client.set(director_name, json.dumps(dir))
                redis_client.expire(director_name, timedelta(days=240))
                cash=redis_client.get(director_name)
                c=json.loads(cash.decode('utf-8'))
                filter_list_2[key] = c
                super_set=reduce(lambda d1, d2: {k: v for k, v in d1.items() if k in d2 and d2[k] == d1[k]}, filter_list_2.values())
                temp2.pop(key)
                break

            elif key=='2':
                
                writer_name=f"{val}_writer2"
                j='writer'
                wrt=search(val,j)
                redis_client.set(writer_name, json.dumps(wrt))
                redis_client.expire(writer_name, timedelta(seconds=240))
                cash=redis_client.get(writer_name)
                c=json.loads(cash.decode('utf-8'))
                filter_list_2[key] = c
                super_set=reduce(lambda d1, d2: {k: v for k, v in d1.items() if k in d2 and d2[k] == d1[k]}, filter_list_2.values())
                temp2.pop(key)
                break

            elif key=='3':

                actor_name=f"{val}_actor2"
                j='actor'
                act=search(val,j)
                redis_client.set(actor_name, json.dumps(act))
                redis_client.expire(actor_name, timedelta(days=240))
                cash=redis_client.get(actor_name)
                c=json.loads(cash.decode('utf-8'))
                filter_list_2[key] = c
                super_set=reduce(lambda d1, d2: {k: v for k, v in d1.items() if k in d2 and d2[k] == d1[k]}, filter_list_2.values())
                temp2.pop(key)
                break
           
            elif key=='4':

                composer_name=f"{val}_composer2"
                j='composer'
                com=search(val,j)
                redis_client.set(composer_name, json.dumps(com))
                redis_client.expire(composer_name, timedelta(seconds=240))
                cash=redis_client.get(composer_name)
                c=json.loads(cash.decode('utf-8'))
                filter_list_2[key] = c
                super_set=reduce(lambda d1, d2: {k: v for k, v in d1.items() if k in d2 and d2[k] == d1[k]}, filter_list_2.values())
                temp2.pop(key)
                break

            elif key=='5':
                
                cinematographer_name=f"{val}_cinematographer2"
                j='cinematographer'
                cin=search(val,j)
                redis_client.set(cinematographer_name, json.dumps(cin))
                redis_client.expire(cinematographer_name, timedelta(seconds=240))
                cash=redis_client.get(cinematographer_name)
                c=json.loads(cash.decode('utf-8'))
                filter_list_2[key] = c
                super_set=reduce(lambda d1, d2: {k: v for k, v in d1.items() if k in d2 and d2[k] == d1[k]}, filter_list_2.values())
                temp2.pop(key)
                break

        output=extract_data(super_set, temp2)

        if len(secondary_filters)!=0:
          print('//////////////TRUE///////////////')
          Output=secondary_functions(output,secondary_filters)
          return Output 
        else:
          print('//////////////FALSE///////////////')
          return output

# @app.route("/")
# def home():
#     return render_template('index.html')

@app.route('/')
def index():
  return app.send_static_file('index.html')
    

@app.route('/api/fetch', methods=["POST"])
def hello_world():

    filterlist={}
    list = request.get_json()
    for key,value in list.items():
      if list[key]!='':
        filterlist[key]=value
    print('//////////////FILTERS////////////',filterlist)
    info=Narrow_down(filterlist)
    info_copy=[i for n, i in enumerate(info) if i not in info[n + 1:]]
    return json.dumps(info_copy)


if __name__ == '__main__':
  app.run()
    # app.config['WTF_CSRF_ENABLED'] = False
    # #app = app.test_client()
    # app.run(host="0.0.0.0")
