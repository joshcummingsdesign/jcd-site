FROM ruby:2.4.3-jessie

WORKDIR /var/www
COPY www ./

# Environment Variables
ARG DEBCONF_NOWARNINGS=yes
ENV LANG C.UTF-8
ENV NODE_VERSION v8.9.4

# Copy docker files into container
COPY bin/docker/docker-entrypoint.sh /usr/local/bin/

# Install server dependencies
RUN apt-get update && apt-get install -qqy git nano openssh-server \
  && chmod +x /usr/local/bin/docker-entrypoint.sh \
  && curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash \
  && export NVM_DIR="$HOME/.nvm" \
  && [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" \
  && nvm install $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && mkdir -p /root/.ssh \
  && chmod 700 /root/.ssh \
  && bundle install --path vendor/bundle \
  && npm install -s \
  && npx gulp \
  && rm -rf /var/lib/apt/lists/*

# Copy keys into container
COPY keys/id_rsa /root/.ssh/
COPY keys/id_rsa.pub /root/.ssh/authorized_keys
RUN chmod 600 /root/.ssh/id_rsa \
  && chmod 600 /root/.ssh/authorized_keys

# ENTRYPOINT and CMD
ENTRYPOINT ["docker-entrypoint.sh"]
CMD bundle exec jekyll serve
