from rightmove_webscraper import RightmoveData
from flask import Flask, request
from flask_cors import CORS
import urllib.parse

app = Flask(__name__)
CORS(app)


@app.route('/properties', methods=['GET'])
def get_properties():
    args = request.args
    url = args['url']
    url = urllib.parse.unquote(url)
    rm = RightmoveData(url)
    results = rm.get_results
    json_res = results.to_json(orient='records')
    return {'properties': json_res}


if __name__ == '__main__':
    app.run(debug=True)
