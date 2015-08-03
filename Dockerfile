FROM alpine:3.2

RUN apk add --update bash lighttpd python docker git jq nodejs
RUN apk add py-pip
RUN pip install -U pip
RUN pip install docker-compose 

COPY conf/* /etc/lighttpd/
RUN adduser lighttpd users

RUN mkdir /db
COPY db /db/
WORKDIR /db
RUN npm install


CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf","2>&1"]
