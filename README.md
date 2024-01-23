# Workspace Generator Tool

This application allows you to create multiple spaces on ClickUp using Node.js and Docker.

## Prerequisites

Make sure you have Docker installed on your machine.

## Build the App

1. Clone this repository to your local machine.

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Build the app using Docker.

    ```bash
    docker build -t wgt .
    ```

## Run the App

1. Run the app using Docker Compose.

    ```bash
    docker-compose up
    ```

2. Open a second terminal and run the `table.js` script.

    ```bash
    node table.js
    ```

## Usage

Use the provided `.rest` files to call the backend API and create ClickUp spaces.
