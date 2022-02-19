# 🏠 rightermove

## ⚙ Installation & Usage

### Backend

1. In the backend, run `pip install -r requirements.txt`

2. Set your envrionment variable for the Google API (used for getting travel times). e.g. `GOOGLE_API_KEY=LONGKEYGOESHERE`.

   - [Google Maps Platform Docs for getting API key](https://developers.google.com/maps/documentation/javascript/get-api-key)

3. Run `python server.py`

### Frontend

1. In the frontend, run `npm install`

2. Run `npm run start`

You can open the frontend e.g. `http://localhost:3000/`

Go to RightMove and configure your search for the properties you're loooking for, such as location, price, bedrooms etc. [Example.](https://www.rightmove.co.uk/property-for-sale/find.html?searchType=SALE&locationIdentifier=REGION%5E93980&insId=1&radius=0.0&minPrice=300000&maxPrice=500000&minBedrooms=2&maxBedrooms=&displayPropertyType=&maxDaysSinceAdded=&_includeSSTC=on&sortByPriceDescending=&primaryDisplayPropertyType=&secondaryDisplayPropertyType=&oldDisplayPropertyType=&oldPrimaryDisplayPropertyType=&newHome=&auction=false) Put that link into the URL section of rightermove.

You can enter an address for which you want to see how long it travel to from each property.

By default the "custom scraper" is used which is the one I wrote. It's preferred over the [other scraper](https://github.com/toby-p/rightmove_webscraper.py) I found because it scrapes the images as well and some other additional data.

Searching is slow because of calling the Google Maps API for each property, so I suggest you limit your query RightMove URL to have <100 properties, or just be patient.

## Other

Rather than search each property on Google Maps to see how long it would take to get somewhere like school or work, I decided to make this for personal use.

Web scraping is against RightMove's Terms of Use, so do NOT use this software.

Also I added an LFU cache to the API endpoints but realise they're basically doing nothing, but it was interesting thinking about better ways to cache locations and I might work on something for that in the future.

## Screenshot

![screenshot](https://i.imgur.com/JqeAjuo.png)
