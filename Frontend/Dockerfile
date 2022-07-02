FROM node:16.9.0

WORKDIR /frontend


COPY yarn.lock /frontend/
COPY vite.config.ts /frontend/

RUN yarn install 
RUN yarn add vite

COPY . /frontend 

CMD ["npm", "run", "dev"]
