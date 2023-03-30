curl http://localhost:3000/api/post


curl --location --request POST 'http://localhost:3000/api/post' \
--header 'Content-Type: application/json' \
--data-raw ' {
"title": "Example Post",
"content": "This is an example post created using curl.",
"authorId": 1",
"email": "test_user@example.com",
}'
