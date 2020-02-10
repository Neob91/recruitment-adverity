import datetime
import json

from django.http import HttpResponse
from django.views.decorators.http import require_GET

from .models import DataPoint


@require_GET
def get_graph(request):
    filters = request.GET.get('filters') or '{}'

    try:
        filters = json.loads(filters)
    except json.JSONDecodeError:
        return HttpResponse(status=400)

    datasources = filters.get('datasources', [])
    campaigns = filters.get('campaigns', [])

    metrics = json.dumps(
        _serialize(DataPoint.get_summed_metrics(datasources, campaigns))
    )

    return HttpResponse(metrics)


@require_GET
def get_filter_options(request):
    return HttpResponse(json.dumps(DataPoint.get_filter_options()))


def _serialize(data):
    if isinstance(data, datetime.date):
        return data.isoformat()

    if isinstance(data, (list, tuple)):
        return [_serialize(item) for item in data]

    if isinstance(data, dict):
        return {
            key: _serialize(value) for key, value in data.items()
        }

    return data
