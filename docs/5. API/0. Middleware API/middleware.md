
### `use(...args)`

**Flexible middleware registration**

### **2. Middleware Guidelines**

```ts
// Good practice - fail fast
app.use((ctx, next) => {
  if (!ctx.headers.get('x-api-key')) {
    return ctx.status(401);
  }
  return next();
});

// Error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status(500).json({ error: error.message });
  }
});
```

### **3. Performance Tips**

- **Lazy-load** heavy middleware after path matching
- **Limit** deep nesting (max 3 levels recommended)
- **Cache** frequent route parameters
- **Prefer** sync middleware for simple operations

---

## **Error Handling**

### **Centralized Error Management**

```ts
// Global error handler
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status(500).json({
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'prod' 
        ? 'Something went wrong' 
        : error.message
    });
  }
});

// Route-specific error handling
app.get('/danger', async (ctx) => {
  try {
    await riskyOperation();
  } catch (error) {
    ctx.status(400).json({ error: 'Safe error message' });
  }
});
```

**Signatures:**

```typescript
// Global middleware
use(middleware: MiddlewareType)

// Path-scoped middleware
use(path: string, middleware: MiddlewareType)

// Multiple middlewares
use(path: string, middlewares: MiddlewareType[])

// With sub-router
use(path: string, middleware: MiddlewareType, router: Router)
```

**Middleware Types:**

```typescript
type MiddlewareType = (
  ctx: Context,
  next: () => Promise<void>
) => Promise<void> | void;
```

---

## Middleware System

### Lifecycle

1. Incoming Request
2. Global Middlewares
3. Path-matched Middlewares
4. Route Handler
5. Response Middlewares
6. Error Middlewares (if needed)

### Error Handling

```typescript
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status(500).json({ error: err.message });
  }
});
```

---

## Examples

### Basic Routing

```typescript
app.get('/', (ctx) => ctx.text('Home'));
app.post('/users', createUser);
```

### Middleware Chain

```typescript
app.use(logger);

app.use('/admin', (ctx, next) => {
  if (!ctx.user.isAdmin) ctx.throw(403);
  return next();
});

app.get('/admin/dashboard', adminDashboard);
```

### Route Grouping

```typescript
app.group('/api', (api) => {
  api.group('/v1', (v1) => {
    v1.get('/users', getUsersV1);
  });
  
  api.group('/v2', (v2) => {
    v2.get('/users', getUsersV2);
  });
});
```

### Sub-router Mounting

```typescript
const authRouter = new Router();
authRouter.post('/login', loginHandler);
authRouter.post('/register', registerHandler);

app.use('/auth', [rateLimiter], authRouter);
```

---

## Best Practices

1. **Organize Routes**

```text
/src
  /routes
    auth.ts
    users.ts
    admin/
      index.ts
      audit.ts
```

2. **Middleware Order**

```typescript
// Global first
app.use(cors());
app.use(bodyParser());

// Then specific routes
app.post('/upload', fileUpload, uploadHandler);

// Error handlers last
app.use(errorFormatter);
```

3. **Performance Tips**

- Avoid blocking sync operations in middleware
- Cache expensive operations
- Use route-specific middleware when possible

---

## Error Handling

### Custom Error Middleware

```typescript
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status(err.statusCode || 500);
    ctx.json({
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});
```

---

## Troubleshooting

### Common Issues

**Middleware Not Executing**

- Check registration order
- Verify path matches
- Ensure `next()` is called

**Route Conflicts**

- More specific routes first
- Use `app.all()` carefully
- Check sub-router mounting points

**Type Errors**

- Use generics for context typing:

```typescript
interface AppContext {
  user: User;
  cache: Cache;
}

const app = new Router<AppContext>();
```

---

## TypeScript Support

### Key Interfaces

```typescript
interface RouterOptions {
  basePath?: string;
  env?: Record<string, unknown>;
  onError?: ErrorHandler;
}

type MiddlewareType<T = any> = (
  ctx: Context<T>,
  next: () => Promise<void>
) => Promise<void> | void;

type HTTPMethod = 
  | 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  | 'OPTIONS' | 'HEAD' | 'ALL';
```

---

## Conclusion

This router system provides:

- ✅ Nested route organization
- ✅ Flexible middleware system
- ✅ Type-safe development
- ✅ Enterprise-scale capabilities

Always follow these patterns for best results:

1. Organize routes hierarchically
2. Keep middleware focused
3. Use TypeScript interfaces
4. Handle errors centrally
