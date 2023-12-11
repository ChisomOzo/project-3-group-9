-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/Rf25Hu
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


-- Property Table
CREATE TABLE "property" (
    "property_id"  SERIAL  NOT NULL,
    "city" varchar(25)   NOT NULL,
    "state" varchar(25)   NOT NULL,
    "zipcode" int   NOT NULL,
    "address" varchar(100)   NOT NULL,
    "price" int   NOT NULL,
    "bedrooms" int   NOT NULL,
    "bathrooms" int   NOT NULL,
    "square_foot" int   NOT NULL,
    "latitude" float   NOT NULL,
    "longitude" float   NOT NULL,
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

-- Free plan table limit reached. SUBSCRIBE for more.



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

-- Free plan table limit reached. SUBSCRIBE for more.



-- Free plan table limit reached. SUBSCRIBE for more.



