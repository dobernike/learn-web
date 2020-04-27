FROM node:erbium

RUN mkdir -p /usr/src/smart-brain-api
WORKDIR /usr/src/smart-brain-api

COPY package*.json ./
RUN npm install

COPY . .

CMD ["/bin/bash"]