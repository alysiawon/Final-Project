CREATE TABLE IF NOT EXISTS medals (
     year INT,
     country_name VARCHAR,
     country_code VARCHAR,
     latitude DECIMAL(8,6),
     longitude DECIMAL(9,6),
     gdp BIGINT,
	 population BIGINT,
	 gold_medals INT,
    PRIMARY KEY (year, country_code)
);

SELECT * FROM medals

CREATE TABLE IF NOT EXISTS tokyo (
     rank INT,
     team VARCHAR,
     gold INT,
    PRIMARY KEY (team)
);

SELECT * FROM tokyo

