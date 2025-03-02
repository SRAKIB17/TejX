## Matching Priority

Routes are matched with following priority order:

1. Static paths (`/users/list`)
2. Named parameters (`/users/:id`)
3. Wildcard parameters (`/users/*`)
4. Optional parameters (`/users/:id?`)

```ts
// ❓ Will be overwritten by the last handler.
// Output: {name: "Jhon"}
server.get("/users/:id", handleUser);
server.get("/users/:name", handleByName);  // Will execute be reached
```

```ts
const authRouter = new Router()
  .post('/login', handleLogin)
  .get('/logout', handleLogout);

// ❌ not use optional params
// Mount under /auth prefix
server.addRouter('/auth/:version?', authRouter);
// or
// ❌ not use optional params
server.use('/auth/auth/:version?',authRouter);
// Routes: /auth/login, /auth/logout
```

**Note** : If you `server.use` or `server.addRouter` with path pass a new Router path must be static or dynamic params.(not use wildcard and optional params)
