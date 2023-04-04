# Use the latest Ubuntu base image
FROM ubuntu:latest

# Set environment variables to avoid prompts during package installation
ENV DEBIAN_FRONTEND=noninteractive

# Update and install required packages
RUN apt-get update && \
    apt-get install -y postfix

# Copy Postfix configuration files
COPY main.cf /etc/postfix/main.cf
COPY master.cf /etc/postfix/master.cf

# Expose SMTP port
EXPOSE 25

# Create a test user
RUN useradd -m -s /bin/bash testuser && \
    echo "testuser:testpassword" | chpasswd



# Start Postfix
CMD ["postfix", "start-fg"]
