from typing import Iterator
from rest_framework.views import APIView
from rest_framework.request import HttpRequest
from rest_framework.response import Response
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from TeamWaveAssignment.settings import API_URL, API_KEY
import requests


class SearchAPIView(APIView):
    SEARCH_PARAMS = [
        "page",
        "todate",
        "max",
        "nottagged",
        "pagesize",
        "intitle",
        "fromdate",
        "min",
        "tagged",
        "order",
        "sort",
    ]
    def generate_ulr(self, query_dict): 
        request_url = API_URL + "?"
        query_items: Iterator = query_dict.items()

        for param, value in query_items:
            if param in self.SEARCH_PARAMS:
                request_url += param + "=" + value + "&"

        if "order" not in query_dict:
            request_url += "order=desc&"
        if "sort" not in query_dict:
            request_url += "sort=activity&"

        request_url += f"key={API_KEY}&"
        request_url += "site=stackoverflow"

        return request_url

    @method_decorator(cache_page(60 * 60 * 2))
    def get(self, request: HttpRequest):
        
        request_url = self.generate_ulr(query_dict=request.GET)
        response = requests.get(request_url)
        return Response(data=response.json(), status=response.status_code)
