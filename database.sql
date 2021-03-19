CREATE TABLE "koala_holla" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(13),
    "gender" varchar(10),
    "age" varchar(4),
    "ready_to_transfer" BOOLEAN DEFAULT FALSE,
    "notes" varchar(250)
);

INSERT INTO "koala_holla" ( id, name, gender, age, ready_to_transfer, notes )
SELECT * from "koala_holla";