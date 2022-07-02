from threading import local
import redis
from django.utils.deprecation import MiddlewareMixin
from django.http import HttpResponseForbidden


class RequestThrottle(MiddlewareMixin):
    def process_request(self, view):
        request = view.request
        redis_client = redis.from_url("redis://redis:6379")
        session = request.session
        session_key = session._SessionBase__session_key

        print(request.session.__dict__)
        if session_key is None:
            return self.get_response(view, request)

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

        return self.get_response(view, request)
