import os
import urllib.parse
import googlemaps
from rightmove_webscraper import RightmoveData
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]

gmaps = googlemaps.Client(key=GOOGLE_API_KEY)


def get_transit_time(start, end, arrival_time=1644915600):
    directions_result = gmaps.directions(start,
                                         end,
                                         mode="transit",
                                         arrival_time=arrival_time)
    try:
        return directions_result[0]['legs'][0]['duration']['value']
    except:
        return -1


@app.route('/properties', methods=['GET'])
def get_properties():
    args = request.args
    url = args['url']
    end_address = args['address']

    url = urllib.parse.unquote(url)
    rm = RightmoveData(url)
    results = rm.get_results

    results['travel_time'] = [get_transit_time(
        address, end_address) // 60 for address in results['address']]

    return {'properties': results.to_json(orient='records')}


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
    args = request.args
    start_address = args['start_address']
    end_address = args['end_address']
    return {'time': get_transit_time(start_address, end_address)}


if __name__ == '__main__':
    app.run(debug=True)
