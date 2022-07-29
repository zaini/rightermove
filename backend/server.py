import os
import urllib.parse
import googlemaps
import json
from dotenv import load_dotenv
from datetime import datetime
from rightmove_webscraper import RightmoveData
from flask import Flask, request
from flask_cors import CORS
from utils.lfu_cache import lfu_cache
from utils.scraper import get_properties as get_properties_custom_scraper

app = Flask(__name__)
CORS(app)

load_dotenv()
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")

gmaps = googlemaps.Client(key=GOOGLE_API_KEY)


@lfu_cache(maxsize=512)
def get_transit_time(start, end, arrival_time=None):
    if not arrival_time:
        now = datetime.now().strftime("%Y-%m-%d") + " 09:00:00"
        arrival_time = datetime.fromisoformat(now).timestamp()

    print("get_transit_time", start, end, arrival_time)

    directions_result = gmaps.directions(start,
                                         end,
                                         mode="transit",
                                         arrival_time=arrival_time)
    try:
        return directions_result[0]['legs'][0]['duration']['value']
    except:
        return -1


@lfu_cache(maxsize=512)
def get_rightmove_properties(url, end_address):
    print("get_rightmove_properties")

    rm = RightmoveData(url)
    results = rm.get_results

    results['travel_time'] = [get_transit_time(
        address, end_address) // 60 for address in results['address']]

    results = results.rename(columns={'number_bedrooms': 'bedrooms'})

    return {'properties': results.to_json(orient='records')}


@lfu_cache(maxsize=512)
def get_rightmove_properties_custom_scraper(url, end_address):
    print("get_rightmove_properties_custom_scraper")

    results = get_properties_custom_scraper(url)

    for res in results:
        travel_time = get_transit_time(res.displayAddress, end_address) // 60
        res.travel_time = travel_time

    return {'properties': json.dumps([x.__dict__ for x in results])}


@app.route('/properties', methods=['GET'])
def get_properties():
    print("get_properties")

    args = request.args
    url = args['url']
    end_address = args['address']
    custom_scraper = args['custom_scraper']

    url = urllib.parse.unquote(url)

    if custom_scraper == "true":
        print("Using custom scraper")
        return get_rightmove_properties_custom_scraper(url, end_address)

    return get_rightmove_properties(url, end_address)


@app.route('/properties/summary', methods=['GET'])
def get_summary():
    args = request.args
    url = args['url']

    url = urllib.parse.unquote(url)
    rm = RightmoveData(url)
    results = rm.summary()

    return {'summary': results.to_json(orient='records')}


@app.route('/distance', methods=['GET'])
def get_distance():
    print("get_distance")

    args = request.args
    start_address = args['start_address']
    end_address = args['end_address']

    return {'time': get_transit_time(start_address, end_address)}


if __name__ == '__main__':
    app.run(debug=True)
