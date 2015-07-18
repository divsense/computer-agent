FROM alpine:3.2
RUN apk add --update bash lighttpd python docker git jq
RUN apk add py-pip
RUN pip install -U pip
RUN pip install docker-compose 
COPY conf/* /etc/lighttpd/
EVN AGENT_SOURCE /var/agent/source
ENV ALIEN_LOGS ${AGENT_SOURCE}/logs
ENV ALIEN_BASE ${AGENT_SOURCE}/base
ENV ALIEN_HEADS ${AGENT_SOURCE}/heads
EVN AGENT_EXCHANGE /var/agent/exchange
EVN ALIEN_DATA_IN ${AGENT_EXCHANGE}/in
EVN ALIEN_DATA_OUT ${AGENT_EXCHANGE}/out
ENV AGENT_CGI_BIN /var/agent/cgi-bin
RUN adduser lighttpd users
CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf","2>&1"]

