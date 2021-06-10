from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import urllib
import requests
import json
from xml.etree.ElementTree import parse
import xmltodict

# 데이터를 받고자하는 사이트의 포멧에 맞게 url을 수정하고 보내는 코드
url = 'http://openapi.airport.co.kr/service/rest/AirportParking/airportparkingRT?serviceKey=OYRMsSBisJ8pWvk1mMT3o8YCIxG%2BJ4FTt5Cl0VOO8ilKluACcpZ97HjnePyUy1CWANZpzePsjfsctywjdDN2xg%3D%3D&schAirportCode=CJU'

request = urllib.request.Request(url)

response_body = urlopen(request, timeout=60).read() # get bytes data

decode_data = response_body.decode('utf-8')
print(decode_data)
f = open("airportparkingRT.xml", 'w')
f.write(decode_data)
f.close()


url = 'http://openapi.jejuits.go.kr/OPEN_API/pisInfo/getPisInfo?serviceKey=OYRMsSBisJ8pWvk1mMT3o8YCIxG%2BJ4FTt5Cl0VOO8ilKluACcpZ97HjnePyUy1CWANZpzePsjfsctywjdDN2xg%3D%3D&pageNo=1&numOfRows=20'

request = urllib.request.Request(url)

response_body = urlopen(request, timeout=60).read() # get bytes data

decode_data = response_body.decode('utf-8')
print(decode_data)
f = open("getPisInfo.xml", 'w')
f.write(decode_data)
f.close()
