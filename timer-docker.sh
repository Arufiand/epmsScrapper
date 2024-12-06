#!/bin/bash

# Function to check current time
check_time_and_run() {
    while true; do
        # Get the current time in HH:MM:SS format
        current_time=$(date +"%H:%M:%S")
        echo "Current time: $current_time"
        # If the time is 16:00:00, run the docker-compose up command
        if [ "$current_time" == "16:00:00" ]; then
            echo "It's 16:00:00, running docker-compose up..."
            docker compose up
            break
        else
            # Wait for 1 second before checking again
            sleep 1
        fi
    done
}

# Call the function
check_time_and_run