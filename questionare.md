Approach 1: Versioned Page Entity
Description: Introduce a version field to the PageEntity. Each page will have multiple versions stored as separate records.

Pros: Simple to implement, easy to query specific versions.

Cons: Might result in data redundancy, as many versions of the same page will lead to multiple rows with mostly similar data.

Approach 2: Versioned Portfolio Entity
Description: Introduce a PortfolioVersion entity that references a set of pages.

Pros: Clear separation of versions, more flexible, easier to manage versions at the portfolio level.

Cons: Slightly more complex to implement and manage.
We'll proceed with Approach 2, as it provides clearer separation of versions and better flexibility.
