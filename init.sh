#!/bin/bash

set -e

if [ -z "$( ls -A /var/agent/cgi-bin/alien/nodejs/node_modules )" ]; then
	cd /var/agent/cgi-bin/alien/nodejs
	exec npm i
fi

exec lighttpd -D -f /etc/lighttpd/lighttpd.conf 2>&1

