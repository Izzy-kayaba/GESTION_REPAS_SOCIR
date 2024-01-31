FROM node:lts 

COPY . app

WORKDIR /app

RUN npm i 

ENV PORT 3010

CMD [ "node" , "index.js" ]