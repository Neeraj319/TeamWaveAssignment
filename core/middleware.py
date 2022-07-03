import redis
from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponseForbidden
from rest_framework.request import Request


class RequestThrottle(MiddlewareMixin):
    def process_request(self, request: Request):
        redis_client = redis.from_url("redis://redis:6379")
        session = request.session
        session_key = session._SessionBase__session_key
        if not (request.environ["PATH_INFO"]) == "/search":
            return None
        if session_key is None:
            request.session.create()
            return self.get_response(request)
        key_name = "_request_in_day"

        if request_in_day := redis_client.get(session_key + key_name):
            request_in_day = int(request_in_day)

            if request_in_day > 100:
                return HttpResponseForbidden("Not more than 100 requests per day")
            else:
                redis_client.incr(session_key + key_name)

        else:
            redis_client.set(session_key + key_name, 1)

        key_name = "_request_in_minute"
        if requests_in_minute := redis_client.get(session_key + key_name):
            requests_in_minute = int(requests_in_minute.decode())
            if requests_in_minute > 4:
                return HttpResponseForbidden(
                    content="Not more than 5 requests allowed in a minute"
                )
            redis_client.incr(session_key + key_name)

        else:
            redis_client.set(session_key + key_name, 1, ex=30 + 30)

        return self.get_response(request)
