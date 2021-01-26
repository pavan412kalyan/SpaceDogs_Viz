# -*- coding: utf-8 -*-
import pandas as pd

dogs = pd.read_csv("Dogs-Database.csv")

flights = pd.read_csv("Flights-Database.csv")








dogs['Flights_count']=[0]*len(dogs)
dogs['fate']=[0]*len(dogs)


i=0
for index, row in dogs.iterrows():
    txt=row['Flights']
    ded=row['Fate']
    print(ded)
    
    if 'Survived' in ded :
        dogs.fate.iloc[i]=1

        
    
    
    print(txt.split(","))
    x=len(txt.split(","))
    dogs.Flights_count.iloc[i]=x
    print(x)
    i=i+1

dogs_space = dogs[['Name (English)','Gender','Flights_count','fate']]
flights_space=flights[['Date','Dogs','Rocket','Altitude (km)']]


flights_space=flights_space.loc[(flights_space['Rocket']=='R-1V') 
| (flights_space['Rocket']=='R-1B')  
| (flights_space['Rocket']=='R-1D') 
 | (flights_space['Rocket']=='R-5A')]


dogs_space = dogs[['Name (English)','Gender','Flights_count','fate','Name (Latin)']]


dog_list=set()
for d in flights_space['Dogs'] :
    for x in d.split(",") :
        dog_list.add(x)
        print(x)



dogs_space=dogs_space[dogs_space['Name (Latin)'].isin(list(dog_list))]


dogs['Flights_count']=[0]*len(dogs)

flights_space['dog1']=['']*len(flights_space)
flights_space['dog2']=['']*len(flights_space)

i=0
for index, row in flights_space.iterrows():
    d1=row['Dogs'].split(',')[0]
    d2=row['Dogs'].split(',')[1]
    flights_space.dog1.iloc[i]=d1
    flights_space.dog2.iloc[i]=d2
    i=i+1

    





flights_space.to_csv('flights_space.csv', index=False)
dogs_space.to_csv('dogs_space.csv', index=False)






# print(dogs['Flights_count'][index])
#    print(txt.split(", "))
#    dogs['Flights_count'][index]=len(txt.split(", "))
#    print(dogs['Flights_count'][index])
#   