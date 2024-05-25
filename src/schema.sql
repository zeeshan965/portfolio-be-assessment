-- Portfolio Table
CREATE TABLE Portfolio (
                           portfolio_id INT PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           url VARCHAR(255),
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Page Table
CREATE TABLE Page (
                      page_id INT PRIMARY KEY,
                      name VARCHAR(255) NOT NULL,
                      url VARCHAR(255),
                      description TEXT,
                      portfolio_id INT,
                      FOREIGN KEY (portfolio_id) REFERENCES Portfolio(portfolio_id)
);

-- PortfolioVersion Table
CREATE TABLE PortfolioVersion (
                                  version_id INT PRIMARY KEY,
                                  portfolio_id INT,
                                  page_id INT,
                                  version_type ENUM('draft', 'published', 'snapshot') NOT NULL,
                                  version_number INT,
                                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                  FOREIGN KEY (portfolio_id) REFERENCES Portfolio(portfolio_id),
                                  FOREIGN KEY (page_id) REFERENCES Page(page_id)
);


INSERT INTO Portfolio (portfolio_id, name, url)
VALUES
    (1, 'Tech Portfolio', 'http://techportfolio.com'),
    (2, 'Art Portfolio', 'http://artportfolio.com');


INSERT INTO Page (page_id, name, url, description, portfolio_id)
VALUES
    (1, 'Home Page', 'http://techportfolio.com/home', 'Welcome to the Tech Portfolio', 1),
    (2, 'Projects Page', 'http://techportfolio.com/projects', 'List of projects', 1),
    (3, 'Contact Page', 'http://techportfolio.com/contact', 'Contact information', 1),
    (4, 'Gallery Page', 'http://artportfolio.com/gallery', 'Art Gallery', 2);

-- Initial draft version for the Tech Portfolio
INSERT INTO PortfolioVersion (version_id, portfolio_id, page_id, version_type, version_number, created_at)
VALUES
    (1, 1, 1, 'draft', 1, '2024-05-23 10:00:00'),
    (2, 1, 2, 'draft', 1, '2024-05-23 10:00:00'),
    (3, 1, 3, 'draft', 1, '2024-05-23 10:00:00');

-- Published version for the Tech Portfolio
INSERT INTO PortfolioVersion (version_id, portfolio_id, page_id, version_type, version_number, created_at)
VALUES
    (4, 1, 1, 'published', 1, '2024-05-24 10:00:00'),
    (5, 1, 2, 'published', 1, '2024-05-24 10:00:00'),
    (6, 1, 3, 'published', 1, '2024-05-24 10:00:00');

-- Snapshot version for the Tech Portfolio
INSERT INTO PortfolioVersion (version_id, portfolio_id, page_id, version_type, version_number, created_at)
VALUES
    (7, 1, 1, 'snapshot', 1, '2024-05-25 10:00:00'),
    (8, 1, 2, 'snapshot', 1, '2024-05-25 10:00:00'),
    (9, 1, 3, 'snapshot', 1, '2024-05-25 10:00:00');

-- Draft version for the Art Portfolio
INSERT INTO PortfolioVersion (version_id, portfolio_id, page_id, version_type, version_number, created_at)
VALUES
    (10, 2, 4, 'draft', 1, '2024-05-23 10:00:00');

-- Published version for the Art Portfolio
INSERT INTO PortfolioVersion (version_id, portfolio_id, page_id, version_type, version_number, created_at)
VALUES
    (11, 2, 4, 'published', 1, '2024-05-24 10:00:00');
