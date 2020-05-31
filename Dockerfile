FROM ruby:2.4.3-jessie

WORKDIR /var/www

ARG DEBCONF_NOWARNINGS=yes
ENV LANG C.UTF-8
ENV NODE_VERSION v8.9.4
ENV NVM_DIR /root/.nvm

# Install server dependencies
RUN apt-get update && apt-get install -qqy vim \
  && curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash \
  && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && rm -rf /var/lib/apt/lists/*

ENV PATH $NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH

COPY www/package.json ./
COPY www/package-lock.json ./
COPY www/Gemfile ./
COPY www/Gemfile.lock ./

# Install node and ruby packages
RUN bundle install --path vendor/bundle \
  && npm install -s

COPY www ./

# Build
RUN npx gulp

ENTRYPOINT ["bundle", "exec", "jekyll", "serve"]
