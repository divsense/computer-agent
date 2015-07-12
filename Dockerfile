FROM alpine:3.2
RUN apk add --update lighttpd python docker git jq
RUN apk add py-pip
RUN pip install -U pip
RUN pip install docker-compose 
COPY conf/* /etc/lighttpd/
RUN adduser lighttpd users
CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf","2>&1"]

