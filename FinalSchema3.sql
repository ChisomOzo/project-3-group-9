-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Rf25Hu
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

DROP TABLE IF EXISTS property;
DROP TABLE IF EXISTS restaurants;
DROP TABLE IF EXISTS grocery;
DROP TABLE IF EXISTS publicTransport;
DROP TABLE IF EXISTS schools;
DROP TABLE IF EXISTS gyms;
DROP TABLE IF EXISTS parks;
DROP TABLE IF EXISTS property_restaurant;
DROP TABLE IF EXISTS property_grocery;
DROP TABLE IF EXISTS property_publicTransport;
DROP TABLE IF EXISTS property_school;
DROP TABLE IF EXISTS property_gym;
DROP TABLE IF EXISTS property_park;

-- Property Table
CREATE TABLE "property" (
    "property_id"  SERIAL  NOT NULL,
    "city" varchar(25)   NOT NULL,
    "state" varchar(25)   NOT NULL,
    "zipcode" int   NOT NULL,
    "address" varchar(100)   NOT NULL,
    "price" float   NOT NULL,
    "bedrooms" int   NOT NULL,
    "bathrooms" float   NOT NULL,
    "square_foot" float   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    "sale_amount" float NOT NULL,
    "sale_transaction_date" DATE,
    CONSTRAINT "pk_property" PRIMARY KEY (
        "property_id"
     )
);

-- Business Tables
CREATE TABLE "restaurants" (
    "rest_id"  SERIAL  NOT NULL,
    "rest_name" varchar(50)   NOT NULL,
    "rest_address" varchar(100)   NOT NULL,
    "rest_ratings" decimal(4)   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    "zipcode" int   NOT NULL,
    CONSTRAINT "pk_restaurants" PRIMARY KEY (
        "rest_id"
     )
);

CREATE TABLE "grocery" (
    "gro_id"  SERIAL  NOT NULL,
    "gro_name" varchar(50)   NOT NULL,
    "gro_address" varchar(100)   NOT NULL,
    "gro_ratings" decimal(4)   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    "zipcode" int   NOT NULL,
    CONSTRAINT "pk_grocery" PRIMARY KEY (
        "gro_id"
     )
);

CREATE TABLE "publicTransport" (
    "pub_id"  SERIAL  NOT NULL,
    "pub_name" varchar(50)   NOT NULL,
    "pub_address" varchar(100)   NOT NULL,
    "pub_ratings" decimal(4)   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    "zipcode" int   NOT NULL,
    CONSTRAINT "pk_publicTransport" PRIMARY KEY (
        "pub_id"
     )
);

CREATE TABLE "schools" (
    "school_id"  SERIAL  NOT NULL,
    "school_name" varchar(100)   NOT NULL,
    "school_address" varchar(100)   NOT NULL,
    "school_ratings" decimal(4)   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    "zipcode" int   NOT NULL,
    CONSTRAINT "pk_schools" PRIMARY KEY (
        "school_id"
     )
);

CREATE TABLE "gyms" (
    "gym_id"  SERIAL  NOT NULL,
    "gym_name" varchar(50)   NOT NULL,
    "gym_address" varchar(100)   NOT NULL,
    "gym_ratings" decimal(4)   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    "zipcode" int   NOT NULL,
    CONSTRAINT "pk_gyms" PRIMARY KEY (
        "gym_id"
     )
);

CREATE TABLE "parks" (
    "park_id"  SERIAL  NOT NULL,
    "park_name" varchar(50)   NOT NULL,
    "park_address" varchar(100)   NOT NULL,
    "park_ratings" decimal(4)   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
    "zipcode" int   NOT NULL,
    CONSTRAINT "pk_parks" PRIMARY KEY (
        "park_id"
     )
);

-- Junction Tables
CREATE TABLE "property_restaurant" (
    "property_id" int   NOT NULL,
    "rest_id" int   NOT NULL,
    CONSTRAINT "pk_property_restaurant" PRIMARY KEY (
        "property_id","rest_id"
     )
);

CREATE TABLE "property_grocery" (
    "property_id" int   NOT NULL,
    "gro_id" int   NOT NULL,
    CONSTRAINT "pk_property_grocery" PRIMARY KEY (
        "property_id","gro_id"
     )
);

CREATE TABLE "property_publicTransport" (
    "property_id" int   NOT NULL,
    "pub_id" int   NOT NULL,
    CONSTRAINT "pk_property_publicTransport" PRIMARY KEY (
        "property_id","pub_id"
     )
);

CREATE TABLE "property_school" (
    "property_id" int   NOT NULL,
    "school_id" int   NOT NULL,
    CONSTRAINT "pk_property_school" PRIMARY KEY (
        "property_id","school_id"
     )
);

CREATE TABLE "property_gym" (
    "property_id" int   NOT NULL,
    "gym_id" int   NOT NULL,
    CONSTRAINT "pk_property_gym" PRIMARY KEY (
        "property_id","gym_id"
     )
);

CREATE TABLE "property_park" (
    "property_id" int   NOT NULL,
    "park_id" int   NOT NULL,
    CONSTRAINT "pk_property_park" PRIMARY KEY (
        "property_id","park_id"
     )
);


ALTER TABLE "property_restaurant" ADD CONSTRAINT "fk_property_restaurant_property_id" FOREIGN KEY("property_id")
REFERENCES "property" ("property_id");
ALTER TABLE "property_restaurant" ADD CONSTRAINT "fk_property_restaurant_rest_id" FOREIGN KEY("rest_id")
REFERENCES "restaurants" ("rest_id");

ALTER TABLE "property_grocery" ADD CONSTRAINT "fk_property_grocery_property_id" FOREIGN KEY("property_id")
REFERENCES "property" ("property_id");
ALTER TABLE "property_grocery" ADD CONSTRAINT "fk_property_grocery_gro_id" FOREIGN KEY("gro_id")
REFERENCES "grocery" ("gro_id");

ALTER TABLE "property_publicTransport" ADD CONSTRAINT "fk_property_publicTransport_property_id" FOREIGN KEY("property_id")
REFERENCES "property" ("property_id");
ALTER TABLE "property_publicTransport" ADD CONSTRAINT "fk_property_publicTransport_pub_id" FOREIGN KEY("pub_id")
REFERENCES "publicTransport" ("pub_id");

ALTER TABLE "property_school" ADD CONSTRAINT "fk_property_school_property_id" FOREIGN KEY("property_id")
REFERENCES "property" ("property_id");
ALTER TABLE "property_school" ADD CONSTRAINT "fk_property_school_school_id" FOREIGN KEY("school_id")
REFERENCES "schools" ("school_id");

ALTER TABLE "property_gym" ADD CONSTRAINT "fk_property_gym_property_id" FOREIGN KEY("property_id")
REFERENCES "property" ("property_id");
ALTER TABLE "property_gym" ADD CONSTRAINT "fk_property_gym_gym_id" FOREIGN KEY("gym_id")
REFERENCES "gyms" ("gym_id");

ALTER TABLE "property_park" ADD CONSTRAINT "fk_property_park_property_id" FOREIGN KEY("property_id")
REFERENCES "property" ("property_id");
ALTER TABLE "property_park" ADD CONSTRAINT "fk_property_park_park_id" FOREIGN KEY("park_id")
REFERENCES "parks" ("park_id");


-- COPY property FROM 'Resources/property.csv' DELIMITER ',' CSV HEADER;
-- COPY restaurants FROM 'Resources/restaurants.csv' DELIMITER ',' CSV HEADER;
-- COPY grocery FROM 'Resources/groceries.csv' DELIMITER ',' CSV HEADER;
-- COPY "publicTransport" FROM 'Resources/publictransports.csv' DELIMITER ',' CSV HEADER;
-- COPY schools FROM 'Resources/schools.csv' DELIMITER ',' CSV HEADER;
-- COPY gyms FROM 'Resources/gyms.csv' DELIMITER ',' CSV HEADER;
-- COPY parks FROM 'Resources/parks.csv' DELIMITER ',' CSV HEADER;
-- COPY property_restaurant FROM 'Resources/property_restaurant.csv' DELIMITER ',' CSV HEADER;
-- COPY property_grocery FROM 'Resources/property_grocery.csv' DELIMITER ',' CSV HEADER;
-- COPY "property_publicTransport" FROM 'Resources/property_publictransport.csv' DELIMITER ',' CSV HEADER;
-- COPY property_school FROM 'Resources/property_school.csv' DELIMITER ',' CSV HEADER;
-- COPY property_gym FROM 'Resources/property_gym.csv' DELIMITER ',' CSV HEADER;
-- COPY property_park FROM 'Resources/property_park.csv' DELIMITER ',' CSV HEADER;


-- SELECT * FROM restaurants;
