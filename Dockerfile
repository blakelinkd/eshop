# Use the official PostgreSQL image as the base image
FROM postgres:13

# Set the default environment variables for the PostgreSQL image
ENV POSTGRES_USER eshop
ENV POSTGRES_PASSWORD BonerFart99
ENV POSTGRES_DB eshop

# Copy the SQL script to create the database schema into the container
#COPY init.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432

