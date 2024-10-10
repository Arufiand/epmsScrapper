FROM node:18.13.0

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# Set the environment variable for headless mode
ENV PUPPETEER_HEADLESS=true

# Install Chromium instead of Google Chrome
RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Create and set correct permissions for Puppeteer config directory
RUN mkdir -p /root/.config/puppeteer && chmod -R 777 /root/.config/puppeteer

# Create a non-root user and set ownership
RUN useradd -m puppeteeruser && \
    mkdir -p /home/puppeteeruser/.config/puppeteer && \
    chown -R puppeteeruser:puppeteeruser /home/puppeteeruser/.config/puppeteer

# Add permissions to the target folder
RUN mkdir -p /epmsScrapper/data && chown -R puppeteeruser:puppeteeruser /epmsScrapper/data

# Ensure that the non-root user has write access
RUN chmod -R 777 /epmsScrapper/data

# Set ownership of the entire /epmsScrapper folder, including node_modules
RUN chown -R puppeteeruser:puppeteeruser /epmsScrapper

# Switch to the non-root user
USER puppeteeruser

# Set Puppeteer’s cache path to the user directory
ENV PUPPETEER_CACHE_DIR=/home/puppeteeruser/.puppeteer-cache

WORKDIR /epmsScrapper
COPY /package.json .
# Install npm dependencies as the non-root user
RUN npm install

COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
