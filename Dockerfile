FROM node:6.9.5-slim

MAINTAINER Thomas.Lin thomas.lin@maxwin.com.tw

ADD . /var/app
WORKDIR /var/app

RUN ln -sf /usr/share/zoneinfo/Asia/Taipei  /etc/localtime \

# install    
    && npm install --production --unsafe-perm \    
    && echo "Run End"

EXPOSE 3000

CMD ["npm","start"]
