from django.db import models


class DataPoint(models.Model):
    date = models.DateField()

    datasource = models.CharField(max_length=128)
    campaign = models.CharField(max_length=128)

    clicks = models.PositiveIntegerField()
    impressions = models.PositiveIntegerField()

    @classmethod
    def get_summed_metrics(cls, datasources=None, campaigns=None):
        qs = cls.objects.all()

        if datasources:
            qs = qs.filter(datasource__in=datasources)

        if campaigns:
            qs = qs.filter(campaign__in=campaigns)

        qs = qs.values('date').annotate(
            clicks=models.Sum('clicks'),
            impressions=models.Sum('impressions')
        )

        return list(qs.order_by('date'))

    @classmethod
    def get_filter_options(cls):
        return {
            'campaign': cls._get_distinct_values('campaign'),
            'datasource': cls._get_distinct_values('datasource'),
        }

    @classmethod
    def _get_distinct_values(cls, field):
        return [
            item[field]
            for item in cls.objects.order_by(field).values(field).distinct()
        ]

    class Meta:
      unique_together = ('date', 'datasource', 'campaign')
