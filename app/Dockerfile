FROM ruby:3.1.2-bullseye
RUN gem update bundler
WORKDIR app
COPY . .
RUN apt-get update

RUN apt remove cmdtest
RUN apt remove yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update
RUN apt-get install yarn -y

RUN apt-get install nodejs -y 

RUN bundle install
