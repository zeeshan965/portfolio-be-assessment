-- Create portfolios Table
CREATE TABLE portfolios (
                            id INT PRIMARY KEY AUTO_INCREMENT,
                            name VARCHAR(255) NOT NULL,
                            url VARCHAR(255),
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create pages Table
CREATE TABLE pages (
                       id INT PRIMARY KEY AUTO_INCREMENT,
                       name VARCHAR(255) NOT NULL,
                       url VARCHAR(255),
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create versions Table
CREATE TABLE versions (
                          id INT PRIMARY KEY AUTO_INCREMENT,
                          portfolio_id INT,
                          version_type ENUM('draft', 'published', 'snapshot') NOT NULL,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                          FOREIGN KEY (portfolio_id) REFERENCES portfolios(id)
);

-- Create portfolio_pages Table
CREATE TABLE portfolio_pages (
                                 id INT PRIMARY KEY AUTO_INCREMENT,
                                 version_id INT,
                                 page_id INT,
                                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                 updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                                 FOREIGN KEY (version_id) REFERENCES versions(id),
                                 FOREIGN KEY (page_id) REFERENCES pages(id)
);

-- Insert into portfolios Table
INSERT INTO portfolios (name, url) VALUES ('Portfolio 1', 'http://portfolio1.com');
INSERT INTO portfolios (name, url) VALUES ('Portfolio 2', 'http://portfolio2.com');

-- Insert into pages Table
INSERT INTO pages (name, url) VALUES ('Page 1', 'https://portfolio1.com/page1');
INSERT INTO pages (name, url) VALUES ('Page 2', 'https://portfolio1.com/page2');
INSERT INTO pages (name, url) VALUES ('Page 3', 'https://portfolio1.com/page3');
INSERT INTO pages (name, url) VALUES ('Page 4', 'https://portfolio1.com/page4');
INSERT INTO pages (name, url) VALUES ('Page 5', 'https://portfolio1.com/page5');
INSERT INTO pages (name, url) VALUES ('Page 6', 'https://portfolio1.com/page6');
INSERT INTO pages (name, url) VALUES ('Page 7', 'https://portfolio1.com/page7');
INSERT INTO pages (name, url) VALUES ('Page 8', 'https://portfolio1.com/page8');
INSERT INTO pages (name, url) VALUES ('Page 9', 'https://portfolio1.com/page9');
INSERT INTO pages (name, url) VALUES ('Page 1', 'https://portfolio2.com/page1');
INSERT INTO pages (name, url) VALUES ('Page 2', 'https://portfolio2.com/page2');

-- Insert into versions Table
-- For Portfolio 1
INSERT INTO versions (portfolio_id, version_type) VALUES (1, 'draft');
INSERT INTO versions (portfolio_id, version_type) VALUES (1, 'published');
INSERT INTO versions (portfolio_id, version_type) VALUES (1, 'snapshot');
INSERT INTO versions (portfolio_id, version_type) VALUES (1, 'snapshot');
INSERT INTO versions (portfolio_id, version_type) VALUES (1, 'snapshot');
INSERT INTO versions (portfolio_id, version_type) VALUES (1, 'snapshot');

-- Insert into portfolio_pages Table
-- For Portfolio 1, Draft Version
INSERT INTO portfolio_pages (version_id, page_id) VALUES (1, 7);
INSERT INTO portfolio_pages (version_id, page_id) VALUES (1, 8);
INSERT INTO portfolio_pages (version_id, page_id) VALUES (1, 9);

-- For Portfolio 1, Published Version
INSERT INTO portfolio_pages (version_id, page_id) VALUES (2, 1);
INSERT INTO portfolio_pages (version_id, page_id) VALUES (2, 2);
INSERT INTO portfolio_pages (version_id, page_id) VALUES (2, 3);

-- For Portfolio 1, Snapshot Version 1
INSERT INTO portfolio_pages (version_id, page_id) VALUES (3, 1);
INSERT INTO portfolio_pages (version_id, page_id) VALUES (3, 2);

-- For Portfolio 1, Snapshot Version 2
INSERT INTO portfolio_pages (version_id, page_id) VALUES (4, 1);
INSERT INTO portfolio_pages (version_id, page_id) VALUES (4, 2);
INSERT INTO portfolio_pages (version_id, page_id) VALUES (4, 3);

-- For Portfolio 1, Snapshot Version 3
INSERT INTO portfolio_pages (version_id, page_id) VALUES (5, 4);
INSERT INTO portfolio_pages (version_id, page_id) VALUES (5, 5);
INSERT INTO portfolio_pages (version_id, page_id) VALUES (5, 6);

-- For Portfolio 1, Snapshot Version 4
INSERT INTO portfolio_pages (version_id, page_id) VALUES (6, 7);
INSERT INTO portfolio_pages (version_id, page_id) VALUES (6, 8);
INSERT INTO portfolio_pages (version_id, page_id) VALUES (6, 9);

-- Retrieve the first portfolio with all its versions and pages
SELECT
    p.id AS portfolio_id,
    p.name AS portfolio_name,
    p.url AS portfolio_url,
    v.id AS version_id,
    v.version_type,
    pg.id AS page_id,
    pg.name AS page_name,
    pg.url AS page_url,
    pp.created_at AS page_created_at,
    pp.updated_at AS page_updated_at
FROM portfolios p
JOIN versions v ON p.id = v.portfolio_id
JOIN portfolio_pages pp ON v.id = pp.version_id
JOIN pages pg ON pp.page_id = pg.id
WHERE p.id = 1
ORDER BY v.id, pp.created_at;
