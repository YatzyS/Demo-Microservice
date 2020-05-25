# Demo Microservice

- This script is made with following tech-stack:
    - NodeJS
    - ExpressJS
    - JWT
    - Docker
- This microservice has 4 endpoints:
    - login - To generate access token for accessing the protected endpoints
    - jsonPatch - To apply passed patch to the passed json, requires access token
    - thumbnail - To create 50x50 thumbnail from the passed image url, requires access token 
    - api-doc - To check the swagger documentation for the project
- This is a simple microservice that has 4 endpoints. Two of them are protected while one is open.
- Login endpoint is used for authenticating the user and giving an access token to the user.
- Thumbnail can be used to get base64 encoded 50x50 thumbnail for the passed url image.
- JSONPatch can be used to get json with patch appled on it.
- Api-doc to check the swagger documentation for the project
- Following is the procedure to run the code:
    - Clone the project
    - Goto the project directory and run 'npm install' to install the required dependecies
    - Run 'npm test' to test all the endpoints
    - You can also check the test coverage by running 'npm run coverage'
    - Then you can start the server by runnning 'npm start'
- Instead of manually running the project you can also use docker for it. For using docker follwing is the procedure:
    - Clone the project
    - Goto the project directory and run 'docker build -t your_docker_image_name*.'
    - Then run 'docker run -p 3000:3000 -d your_docker_image_name'. This will start docker daemon which you can access at port 3000.

