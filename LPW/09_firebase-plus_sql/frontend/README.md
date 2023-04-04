# REACT POSTS

## SQL commands config
pour les `posts`:
```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

```

pour les `comments`:
```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  author_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```
## ajout des premiers posts

```sql
INSERT INTO posts (title, content, author_id, created_at, updated_at)
VALUES 
('First Post', 'This is my first post!', 'tonuseruid', NOW(), NOW()),
('Second Post', 'This is my second post!', 'tonuseruid', NOW(), NOW());
```

