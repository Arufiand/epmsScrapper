FROM node:18.13.0

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# Set Puppeteer’s cache path to a location that the 'app' user has access to
#RUN apt-get update -y && apt-get upgrade -y && apt-get install -y python make gcc g++

## Install google-chrome-stable
#RUN apt-get install gnupg wget -y && \
#  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
#  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
#  apt-get update && \
#  apt-get install google-chrome-stable -y --no-install-recommends && \
#  rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install curl gnupg -y \
  && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install google-chrome-stable -y --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

# Create a user with name 'app' and group that will be used to run the app
RUN #groupadd -r app && useradd -rm -g app -G audio,video app
WORKDIR /epmsScrapper
COPY /package.json .
RUN npm install
COPY . .
EXPOSE 3000
#RUN npm run dev
CMD ["npm","run", "dev"]
