import json
import requests
from bs4 import BeautifulSoup

# https://stackoverflow.com/questions/49084842/creating-a-python-object-from-a-json-string
# class Property:
#     def __init__(self, d):
#         if type(d) is str:
#             d = json.loads(d)
#         self.convert_json(d)

#     def convert_json(self, d):
#         self.__dict__ = {}
#         for key, value in d.items():
#             if type(value) is dict:
#                 value = Property(value)
#             self.__dict__[key] = value

#     def __setitem__(self, key, value):
#         self.__dict__[key] = value

#     def __getitem__(self, key):
#         return self.__dict__[key]


class Property:
    def __init__(self, p):
        self.isCustom = True
        self.id = p['id']
        self.bedrooms = p['bedrooms']
        self.bathrooms = p['bathrooms']
        self.numberOfImages = p['numberOfImages']
        self.numberOfFloorplans = p['numberOfFloorplans']
        self.numberOfVirtualTours = p['numberOfVirtualTours']
        self.summary = p['summary']
        self.displayAddress = p['displayAddress']
        self.countryCode = p['countryCode']
        self.location = {
            'latitude': p['location']['latitude'],
            'longitude': p['location']['longitude']
        }
        self.propertySubType = p['propertySubType']
        self.listingUpdate = {
            'listingUpdateReason': p['listingUpdate']['listingUpdateReason'],
            'listingUpdateDate': p['listingUpdate']['listingUpdateDate']
        }
        self.premiumListing = p['premiumListing']
        self.featuredProperty = p['featuredProperty']
        # self.price = {
        #     'amount': p['price']['amount'],
        #     'frequency': p['price']['frequency'],
        #     'currencyCode': p['price']['currencyCode'],
        #     'displayPrices': {
        #         'displayPrice': p['price']['displayPrices'][0]['displayPrice'],
        #         'displayPriceQualifier': p['price']['displayPrices'][0]['displayPriceQualifier']
        #     }
        # }
        self.price = p['price']['amount']
        self.customer = {
            'branchId': p['customer']['branchId'],
            'brandPlusLogoURI': p['customer']['brandPlusLogoURI'],
            'contactTelephone': p['customer']['contactTelephone'],
            'branchDisplayName': p['customer']['branchDisplayName'],
            'branchName': p['customer']['branchName'],
            'brandTradingName': p['customer']['brandTradingName'],
            'branchLandingPageUrl': p['customer']['branchLandingPageUrl'],
            'development': p['customer']['development'],
            'showReducedProperties': p['customer']['showReducedProperties'],
            'commercial': p['customer']['commercial'],
            'showOnMap': p['customer']['showOnMap'],
            'enhancedListing': p['customer']['enhancedListing'],
            'developmentContent': p['customer']['developmentContent'],
            'buildToRent': p['customer']['buildToRent'],
            'buildToRentBenefits': p['customer']['buildToRentBenefits'],
            'brandPlusLogoUrl': p['customer']['brandPlusLogoUrl'],
        }
        self.distance = p['distance']
        self.transactionType = p['transactionType']
        self.productLabel = p['productLabel']
        self.commercial = p['commercial']
        self.development = p['development']
        self.residential = p['residential']
        self.students = p['students']
        self.auction = p['auction']
        self.feesApply = p['feesApply']
        self.feesApplyText = p['feesApplyText']
        self.displaySize = p['displaySize']
        self.showOnMap = p['showOnMap']
        self.propertyUrl = p['propertyUrl']
        self.contactUrl = p['contactUrl']
        self.staticMapUrl = p['staticMapUrl']
        self.channel = p['channel']
        self.firstVisibleDate = p['firstVisibleDate']
        self.onlineViewingsAvailable = p['onlineViewingsAvailable']
        self.enhancedListing = p['enhancedListing']
        self.isRecent = p['isRecent']
        self.formattedDistance = p['formattedDistance']
        self.formattedBranchName = p['formattedBranchName']
        self.hasBrandPlus = p['hasBrandPlus']
        self.propertyImages = {
            'images': [{
                'srcUrl': image['srcUrl'],
                'url': image['url'],
                'caption': image['caption'],
            } for image in p['propertyImages']['images']],
            'mainImageSrc': p['propertyImages']['mainImageSrc'],
            'mainMapImageSrc': p['propertyImages']['mainMapImageSrc'],
        }
        self.propertyTypeFullDescription = p['propertyTypeFullDescription']
        self.displayStatus = p['displayStatus']
        self.addedOrReduced = p['addedOrReduced']
        self.heading = p['heading']


def property_json_to_object(property_json):
    return Property(property_json)


def get_property_objects(properties_json):
    properties = []
    property_ids = set()
    for property_json in properties_json:
        property = property_json_to_object(property_json)
        if property.id not in property_ids:
            properties.append(property)
            property_ids.add(property.id)
    return properties


def get_properties_json(url):
    property_jsons = []
    while True:
        url_with_index = url + '&index=' + str(len(property_jsons))

        html = requests.get(url_with_index)
        soup = BeautifulSoup(html.text, 'html.parser')
        script_tags = soup.findAll('script')

        for script in script_tags:
            script_body = script.string
            if script_body and 'properties' in script_body:
                script_body = script_body[len('window.jsonModel = '):]
                j = json.loads(script_body)
                results_count = j['resultCount']
                if len(property_jsons) >= int(results_count):
                    return property_jsons
                properties = j['properties']
                property_jsons.extend(properties)
                break


def get_properties(url):
    properties_json = get_properties_json(url)
    properties = get_property_objects(properties_json)
    return properties


if __name__ == '__main__':
    # url = "https://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=REGION%5E599&minBedrooms=1&propertyTypes=&includeSSTC=false&mustHave=&dontShow=&furnishTypes=&keywords="
    # properties = get_properties(url)
    # property = properties[0]
    # print(property.propertyImages)
    # print(len(properties))
    pass
