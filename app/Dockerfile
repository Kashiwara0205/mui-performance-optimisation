FROM ruby:3.1.2-bullseye
RUN gem update bundler
WORKDIR app
COPY . .
RUN bundle install
