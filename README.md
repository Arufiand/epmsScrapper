# ePMS Scrapper 

## Description
this project based on node js using Docker utilization mainly in order to learn docker environment and all bout docker. And only work on specific site that has been maintained by @arufiand

## Requirements
- WSL2 with Ubuntu installed
- Docker installed on your WSL2 Ubuntu

## Installing Docker on WSL2 Ubuntu

Follow the steps outlined in this [gist](https://gist.github.com/dehsilvadeveloper/c3bdf0f4cdcc5c177e2fe9be671820c7) to install Docker.
credit to dehsilvadeveloper

## Setup Instructions

Once Docker is installed, follow these steps to set up the application:

1. **Start Docker**
   Open your terminal and run:
   ```sh
   sudo service docker start
    ```
2. **Build the npm service** 
    ```shell
    docker compose build npm
    ```
   
3. **Install Dependencies**
   Run the following command to install the necessary dependencies:
    ```shell
    docker compose run --rm npm install
    ```

4. **Build the Scrapper Image**
    ```shell 
    docker compose build
    ```
   
5. **Run the Image**
    ```shell
    docker compose up
    ```