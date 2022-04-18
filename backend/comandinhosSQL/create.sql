
CREATE TABLE users (
	id serial NOT NULL,
	fname varchar(100) NOT NULL,
	lname varchar(100) NOT NULL,
	email varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	deleted boolean,
	CONSTRAINT users_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE bag (
	id serial NOT NULL,
	id_product int,
	id_users int NOT NULL,
	status varchar(255),
	CONSTRAINT bag_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE products (
	id serial NOT NULL,
	name varchar(100) NOT NULL,
	price DECIMAL(5,2) NOT NULL,
	img varchar(255) NOT NULL,
	CONSTRAINT products_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);




ALTER TABLE bag ADD CONSTRAINT bag_fk0 FOREIGN KEY (id_product) REFERENCES products(id);
ALTER TABLE bag ADD CONSTRAINT bag_fk1 FOREIGN KEY (id_users) REFERENCES users(id);




