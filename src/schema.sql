CREATE TABLE Portfolio (
                           portfolio_id INT PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           url VARCHAR(255),
                           version_type ENUM('draft', 'published', 'snapshot') NOT NULL,
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Page (
                      page_id INT PRIMARY KEY,
                      name VARCHAR(255) NOT NULL,
                      url VARCHAR(255),
                      description TEXT,
                      portfolio_id INT,
                      FOREIGN KEY (portfolio_id) REFERENCES Portfolio(portfolio_id)
);

CREATE TABLE PortfolioVersion (
                                  version_id INT PRIMARY KEY,
                                  portfolio_id INT,
                                  version_type ENUM('draft', 'published', 'snapshot') NOT NULL,
                                  version_number INT,
                                  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                  FOREIGN KEY (portfolio_id) REFERENCES Portfolio(portfolio_id)
);

CREATE TABLE PageVersion (
                             version_id INT,
                             page_id INT,
                             version_number INT,
                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             FOREIGN KEY (version_id) REFERENCES PortfolioVersion(version_id),
                             FOREIGN KEY (page_id) REFERENCES Page(page_id)
);
