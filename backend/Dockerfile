FROM python:3.8.1

WORKDIR /app
RUN pip install --upgrade pip
RUN pip install pip-tools

COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

CMD python manage.py runserver 0.0.0.0:8000
