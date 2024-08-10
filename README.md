WebSocket Handler for Sensor Data - Documentation
=================================================

Project Structure
-----------------

The project is organized into the following main directories:

*   `server/`: Contains the NestJS WebSocket server. This is where the core logic for handling WebSocket connections and processing sensor data resides.
*   `telemetry-service/`: Contains the service responsible for sending simulated sensor data. This service can be used to test the WebSocket server by sending sample temperature and humidity readings.

Getting Started
---------------

### Running the Application with Docker Compose

If you simply want to run the application without modifying the code, Docker Compose is the easiest way to set everything up. This method will start all necessary services, including MongoDB, the WebSocket server, and the telemetry service for generating sample data.

    docker-compose up

This command will start the MongoDB and NestJS application containers. If you need to include the client simulation container that sends sensor data, run:

    docker-compose --profile testing up

### Running separated containers

*   **MongoDB:** `docker run --name mongodb -d -p 27017:27017 -v mongo_data:/data/db mongo:latest`

*   **Telemetry Handle Server:** `docker run --name telemetry-handle-server -p 4000:4000 softjey/telemetry-handle-server:1.0.0`

*   **Telemetry Service:** `docker run --name telemetry-service softjey/telemetry-service:1.0.0`

### Working with the Code

If you want to work on the code, you can set up the environment by running MongoDB in a Docker container and starting the server and telemetry service locally.

#### Step 1: Start MongoDB

Run the following command to start a MongoDB container:

    docker run --name mongodb -d -p 27017:27017 -v mongo_data:/data/db mongo:latest

This command will start MongoDB and bind it to port `27017`.

#### Step 2: Install Dependencies

Navigate to the `server/` and `telemetry-service/` directories and install the necessary dependencies:

    cd server
    npm install
    
    cd ../telemetry-service
    npm install

#### Step 3: Setup environment variables

Create `.env` files for server based on the provided `.env.example` file.

#### Step 4: Run the Application Locally

After installing the dependencies, you can start the server and telemetry service locally by running:

    cd server
    npm start
    
    cd telemetry-service
    npm start

Usage
-----

### WebSocket Server

The WebSocket server listens for incoming messages on the `telemetry-data` channel. Sensor data should be sent in the following format:

    {
        "temperature": ,
        "humidity": ,
        "timestamp": ""
    }

### REST API Documentation

The REST API documentation is available at the `/docs` route once the server is running.

Testing
-------

To run the tests, use the following command:

    npm test
