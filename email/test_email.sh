#!/bin/bash

# Replace these values with your own
FROM="testuser@example.com"
TO="blakelinkd@gmail.com"
SUBJECT="Test Email"
BODY="This is a test email sent from the Docker container."

# Send the test email
swaks --from "$FROM" --to "$TO" --server 192.168.1.183 --port 25 \
      --header "Subject: $SUBJECT" --body "$BODY"
