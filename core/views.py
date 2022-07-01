from typing import Iterator
from rest_framework.views import APIView
from rest_framework.request import HttpRequest
from rest_framework.response import Response
from TeamWaveAssignment.settings import API_URL


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

    def get(self, request: HttpRequest):
        request_url = API_URL + "?"
        query_items: Iterator = request.GET.items()
        for param, value in query_items:
            if param in self.SEARCH_PARAMS:
                request_url += param + "=" + value + "&"
        if "order" not in request.GET:
            request_url += "order=desc&"
        if "sort" not in request.GET:
            request_url += "sort=activity&"
        request_url += "site=stackoverflow"
        return Response({"message": request_url})
