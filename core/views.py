from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response


class SearchAPIView(APIView):
    def get(request: Request):
        return Response({"message": "Hello World"})
