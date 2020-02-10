import csv
import datetime
import sys

from .models import DataPoint


def load_csv(path):
    items = []

    with open(path) as f:
        reader = csv.reader(f)
        next(reader)
        for row in reader:
            items.append(
                DataPoint(
                    #date=datetime.date(*map(int, reversed(row[0].split('.')))),
                    date=datetime.datetime.strptime(row[0], '%d.%m.%Y'),
                    datasource=row[1],
                    campaign=row[2],
                    clicks=_to_int(row[3]),
                    impressions=_to_int(row[4]),
                )
            )
            if len(items) > 100:
                DataPoint.objects.bulk_create(items)
                items = []

        if items:
            DataPoint.objects.bulk_create(items)
            items = []


def _to_int(x):
    return int(x) if x else 0
