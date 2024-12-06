# ---- Base Stage ----
FROM node:18.13.0 AS base

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# Set the environment variable for headless mode
ENV PUPPETEER_HEADLESS=true
# Common environment variable, set default to development
#ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

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
WORKDIR /epmsScrapper
COPY /package.json /package-lock.json ./
RUN chown -R puppeteeruser:puppeteeruser /epmsScrapper

# Switch to the non-root user
USER puppeteeruser

# Set Puppeteer’s cache path to the user directory
ENV PUPPETEER_CACHE_DIR=/home/puppeteeruser/.puppeteer-cache



# ---- Development Stage ----
FROM base AS development
# Install all dependencies including devDependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the app port (optional)
EXPOSE 3000

# Command to run your app in development
CMD ["npm", "run", "dev"]

# ---- Production Stage ----
FROM base AS production
# Only install production dependencies
RUN npm ci --only=production

# Copy the application code
COPY . .

# Expose the app port (optional)
EXPOSE 3000

# Command to run your app in production
CMD ["npm", "start"]
