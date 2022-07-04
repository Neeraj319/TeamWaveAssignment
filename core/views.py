from typing import Iterator
from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from TeamWaveAssignment.settings import API_URL, API_KEY, CREATE_PAGINATION
import requests


class SearchAPIView(ListAPIView):
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

    def generate_ulr(self, query_dict) -> str:
        """
        generates url for the stack exchange api based on the query parameters
        just to make sure that other parameters are not passed to the api
        some checks are added to make sure that the parameters are valid
        """
        request_url = API_URL + "?"
        query_items: Iterator = query_dict.items()

        for param, value in query_items:
            if param in self.SEARCH_PARAMS:
                request_url += (param) + "=" + str(value) + "&"

        if "order" not in query_dict:
            request_url += "order=desc&"
        if "sort" not in query_dict:
            request_url += "sort=activity&"

        request_url += f"key={API_KEY}&"
        request_url += "site=stackoverflow"

        return request_url

    def create_pagination(self, data: dict, query_dict: dict, page_no: int) -> dict:
        """
        since the stack exchange api doesn't support pagination, we have to create it ourselves
        since we need to check if the next page exists or not we have to send a request to the
        stack exchange api and check if the page is there this makes our own api really slow
        and the response is not cached too so this is a bad idea and considered as an optional
        feature
        """

        if page_no >= 1:
            fake_query_dict = dict()
            for param, value in query_dict.items():
                fake_query_dict[param] = value
            fake_query_dict["page"] = page_no + 1
            next_url = self.generate_ulr(query_dict=fake_query_dict).replace(
                "https://api.stackexchange.com/2.3/search?",
                "http://localhost:8000/search?",
            )
            if requests.get(next_url).status_code == 200:
                data["next"] = next_url
            fake_query_dict["page"] = page_no - 1
            if not page_no == 1:
                data["prev"] = self.generate_ulr(query_dict=fake_query_dict).replace(
                    "https://api.stackexchange.com/2.3/search?",
                    "http://localhost:8000/search?",
                )
        return data

    @method_decorator(cache_page(60 * 60 * 2))
    def list(self, request: Request) -> Response:

        """
        returns all the data from the stack exchange api based on the query params
        """

        request_url = self.generate_ulr(query_dict=request.GET)
        response = requests.get(request_url)
        data = response.json()
        if response.status_code == 200:
            if CREATE_PAGINATION:
                if page_no := request.GET.get("page"):
                    data = self.create_pagination(data, request.GET, int(page_no))
        return Response(
            data=data,
            status=response.status_code,
            headers={
                "Set-Cookie": f"sessionid={request.session._SessionBase__session_key}",
            },
        )


def search(request: Request) -> Response:
    """
    plain home page of the site
    """
    return render(request, "index.html")
