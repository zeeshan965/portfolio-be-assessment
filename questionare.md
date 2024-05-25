# Questionare

When preparing the ERD schema for portfolio applications, different approaches can be taken. I aimed to design the most effective ERD to address all scenarios.

## Approach
When preparing the ERD schema for portfolio applications, different approaches can be taken. I aimed to design the most effective ERD to address all scenarios.

**Tables:**

- Portfolio (a.k.a portfolios)
- Page (a.k.a pages)
- PortfolioVersion (a.k.a portfolio_versions)
- PortfolioPage (a.k.a portfolio_pages)

**Note:** For a detailed view, please review the schema.sql file.

```shell
/src/schema.sql
```

We could consider using only the PortfolioVersion as a third entity. However, due to the many-to-many relationships—where a portfolio can have multiple pages and multiple versions, I decided to create the PortfolioPage and PortfolioVersion entities.

If we omit the PortfolioPage table and directly store the page_id in the Version table, it implies that each version can only have a single page associated with it. This approach would not meet the requirement that a single portfolio can have multiple pages. Therefore, the PortfolioPage table is essential for the following reasons:

**Multiple Pages Association:**
Without the PortfolioPage table, you cannot associate multiple pages with a single version of a portfolio. Each version would only be able to reference one page, violating the requirement that a portfolio can have multiple pages.

**Order of Pages:**
The PortfolioPage table allows you to define the order of pages within a version using the position field. This wouldn't be possible if we directly stored page_id in the Version table.

**Flexibility:**
With the PortfolioPage table, you can easily add or remove pages from specific versions without affecting other versions. This flexibility is crucial for managing versions independently.

**Challenges:**
Since the project was built using older technologies, I initially struggled to run it on my machine due to dependency issues. I tried to run it using npm but later realized it was set up by developers on a Mac machine using yarn instead of npm. I refrained from updating anything because the assignment specified to stick with the existing versions. Additionally, I had to roll back to an older version of MySQL due to the older driver version installed in the application.
I've also taken some screenshots during my development.

## Upgrades
I've made some upgrades to the codebase and followed the structures I usually adhere to when developing applications using NestJS, TypeORM, and GraphQL.

I would also appreciate it if you could review some of my other work using the same tech stack:

Blog API
https://github.com/zeeshan965/blog-api
Blog Web React
https://github.com/zeeshan965/blog-web-react
