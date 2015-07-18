FROM alpine:3.2
RUN apk add --update bash lighttpd python docker git jq
RUN apk add py-pip
RUN pip install -U pip
RUN pip install docker-compose 
COPY conf/* /etc/lighttpd/
RUN adduser lighttpd users
ENV AGENT_SOURCE /var/agent/source
ENV ALIEN_LOGS ${AGENT_SOURCE}/logs
ENV ALIEN_BASE ${AGENT_SOURCE}/base
ENV ALIEN_HEADS ${AGENT_SOURCE}/heads
ENV AGENT_EXCHANGE /var/agent/exchange
ENV ALIEN_DATA_IN ${AGENT_EXCHANGE}/in
ENV ALIEN_DATA_OUT ${AGENT_EXCHANGE}/out
ENV AGENT_CGI_BIN /var/agent/cgi-bin
CMD ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf","2>&1"]

