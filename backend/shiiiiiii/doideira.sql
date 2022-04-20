CREATE TABLE users (
	id serial NOT NULL,
	fname varchar(60) NOT NULL,
	lname varchar(60) NOT NULL,
	password varchar(60) NOT NULL,
	email varchar(100) NOT NULL,
	type_of_bold varchar(255) NOT NULL,
	type_user integer NOT NULL,
	id_bag integer,
	signature_name varchar(60),
	signature_type varchar(60),
	CONSTRAINT users_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE bag (
	id serial NOT NULL,
	id_pack integer NOT NULL,
	signature_type varchar(60),
	CONSTRAINT bag_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



CREATE TABLE packs (
	id serial NOT NULL,
	name varchar(60) NOT NULL,
	description varchar(255) NOT NULL,
	img_url varchar(255) NOT NULL,
	monthly_price DECIMAL(7,2) NOT NULL,
	CONSTRAINT packs_pk PRIMARY KEY (id)
) WITH (
  OIDS=FALSE
);



ALTER TABLE users ADD CONSTRAINT users_fk0 FOREIGN KEY (id_bag) REFERENCES bag(id);

ALTER TABLE bag ADD CONSTRAINT bag_fk0 FOREIGN KEY (id_pack) REFERENCES packs(id);


insert into users (id, fname, lname, password, email, type_of_bold, type_user) values (1, 'Shurlock', 'Huggons', 'African bush squirrel', 'shuggons0@nationalgeographic.com', 'Paraxerus cepapi', 1);
insert into users (id, fname, lname, password, email, type_of_bold, type_user) values (2, 'Piggy', 'Flattman', 'Giant anteater', 'pflattman1@kickstarter.com', 'Myrmecophaga tridactyla', 1);
insert into users (id, fname, lname, password, email, type_of_bold, type_user) values (3, 'Tracie', 'Henricsson', 'Salmon, sockeye', 'thenricsson2@is.gd', 'Oncorhynchus nerka', 1);
insert into users (id, fname, lname, password, email, type_of_bold, type_user) values (4, 'Sebastian', 'Wingeat', 'Water moccasin', 'swingeat3@facebook.com', 'Agkistrodon piscivorus', 1);
insert into users (id, fname, lname, password, email, type_of_bold, type_user) values (5, 'Ferne', 'O''Leahy', 'Steller sea lion', 'foleahy4@omniture.com', 'Eumetopias jubatus', 1);
insert into users (id, fname, lname, password, email, type_of_bold, type_user) values (6, 'Gilligan', 'Mattusov', 'Tarantula', 'gmattusov5@slate.com', 'Lasiodora parahybana', 1);
insert into users (id, fname, lname, password, email, type_of_bold, type_user) values (7, 'Neda', 'Leguey', 'Macaw, scarlet', 'nleguey6@creativecommons.org', 'Ara macao', 1);
insert into users (id, fname, lname, password, email, type_of_bold, type_user) values (8, 'Herminia', 'Earingey', 'White-headed vulture', 'hearingey7@zdnet.com', 'Aegypius occipitalis', 1);

insert into packs (name, description, img_url, monthly_price) values ('C-Beginner', 'Esponja para polir, pomada para polir, pente curvo, mecha de cabelo falsa e navalha.', 'https://user-images.githubusercontent.com/84547544/164121317-70be944b-1349-4562-a975-9a597b876665.png', '69.93');

insert into packs (name, description, img_url, monthly_price) values ('C-Intermediate', 'Esponja para polir, pomada para polir, pente curvo, mecha de cabelo falsa, peruca de calvo, enceradeira automotiva, 3 potes de cera automotiva e barbeador.', 'https://user-images.githubusercontent.com/84547544/164121316-f3d5bb52-23d0-4b80-986f-7915c289d00e.png', '99.99');