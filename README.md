# 415-1-MAIN
This is a simple Express application providing REST APIs for a list of cars.
Each Car object has only one property, a string "name".

There are six methods in total: 
GET /           - Welcome message
GET /cars       - Returns a list of cars
GET /cars/:id   - Get a car by its index
POST /cars      - Add a new car (name required in request body)
PUT /cars/:id   - Update a car by its index (name required in request body)
DELETE /cars/:id- Delete a car by its index

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.
1. Use this docker command to build Docker images with a tag '415-1-main' from the Dockerfile: 
```
docker build -t 415-1-main . 
```
2. Use this docker command to start a new Docker container from the image named '415-1-main'. It also maps port 3000 of the container to port 3000 on the host machine:
```
docker run -p 3000:3000 -d 415-1-main
```
3. Enter http://localhost:3000 into your browser to access the application.
4. Enter http://localhost:3000/api-docs/ into your browser to access the Swagger documentation for this application.

### Prerequisites
Docker Desktop

## Changelog
1. Mar 24: Added configmap/deploy/service.yaml for k8s.
2. Mar 24: Added API fib: return a Fibonacci sequence based on an input.
3. Mar 24: Added API config: get the environment variables.
