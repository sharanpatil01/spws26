This Repository "SPWS26" holds all projects I worked on and committed in 2026:

helloTSapp:
  REST API:
    stocks:
      curl -X GET http://localhost:3000/stocks
      curl -X GET http://localhost:3000/stocks/2

      etc.
      
fastifyapp2:
    Rest API:
    students:
      GET : curl --location 'http://localhost:3000/students'

      POST: curl --location 'http://localhost:3000/students' \
                 --header 'Content-Type: application/json' \
                 --data '{
                       "sno": 10,
                       "name": "arundhati",
                       "grade": "3",
                       "contactno": "555-330",
                       "major": "Arts"
                  }'

    

    /public:   curl --location 'http://localhost:3000/public'
    secured:
       /dashboard:
       curl: curl --location 'http://localhost:3000/dashboard' --header 'Authorization: Bearer my-secure-api-token-123'




