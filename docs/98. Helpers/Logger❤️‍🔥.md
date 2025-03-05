
The JetCore logger provides a flexible logging system that integrates with request/response cycles and supports custom log levels. It follows the **LoggerFnType** interface for structured logging.

---

## **Quick Start**

### **Basic Setup**

```typescript
import { JetCore } from "jet-core";
import { loadEnv } from "./config";

const logger = () => ({
  info: (msg) => console.log(`[INFO] ${msg}`),
  error: (msg) => console.error(`[ERROR] ${msg}`)
});

const server = new JetCore({
  logger: logger,
  env: loadEnv()
});
```

---

## **Logger Configuration**

### **LoggerFnType Interface**

```typescript
type LoggerFnType = () => {
  request?: (method: HTTPMethod, pathname: string) => void;
  response?: (method: HTTPMethod, pathname: string, status?: number) => void;
  info?: (msg: string, ...args: unknown[]) => void;
  warn?: (msg: string, ...args: unknown[]) => void;
  error?: (msg: string, ...args: unknown[]) => void;
  debug?: (msg: string, ...args: unknown[]) => void;
  success?: (msg: string, ...args: unknown[]) => void;
};
```

---

## **Core Methods**

### **1. Request/Response Tracking**

| Method | Parameters | Description |
|--------|------------|-------------|
| `request` | `method`, `pathname` | Logs incoming requests |
| `response` | `method`, `pathname`, `status` | Logs completed responses |

**Example:**

```typescript
const logger = () => ({
  request: (method, path) => {
    console.log(`➔ ${method} ${path}`);
  },
  response: (method, path, status) => {
    console.log(`← ${status} ${method} ${path}`);
  }
});
```

### **2. Log Levels**

| Method | Use Case | Example Output |
|--------|----------|----------------|
| `info` | General information | `[INFO] Server started on port 3000` |
| `warn` | Non-critical issues | `[WARN] High memory usage detected` |
| `error` | Critical errors | `[ERROR] Database connection failed` |
| `debug` | Debugging details | `[DEBUG] Route matched: /api/users` |
| `success` | Positive outcomes | `[SUCCESS] User created: ID-123` |

---

## **Advanced Configuration**

### **Environment-Based Logging**

```typescript
const logger = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    debug: isProduction ? undefined : (msg) => console.debug(msg),
    info: (msg) => console.info(msg),
    error: (msg) => console.error(msg)
  };
};
```

### **Custom Log Format**

```typescript
const logger = () => ({
  info: (msg, ...args) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${msg}`, ...args);
  },
  error: (msg, ...args) => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ERROR: ${msg}`, ...args);
  }
});
```

---

## **Integration Examples**

### **Third-Party Integration (Winston)**

```typescript
import winston from 'winston';

const logger = () => {
  const winstonLogger = winston.createLogger({/* config */});
  
  return {
    info: (msg) => winstonLogger.info(msg),
    error: (msg) => winstonLogger.error(msg),
    debug: (msg) => winstonLogger.debug(msg)
  };
};
```

---

## **Best Practices**

### **1. Production Configuration**

```typescript
const prodLogger = () => ({
  info: (msg) => console.log(msg),
  error: (msg) => console.error(msg),
  warn: (msg) => console.warn(msg)
});
```

### **2. Performance Considerations**

```typescript
// Only enable debug logs when needed
const logger = () => ({
  debug: process.env.DEBUG_MODE 
    ? (msg) => console.debug(msg)
    : undefined
});
```

---

## **Troubleshooting**

### **Common Issues**

| Symptom | Solution |
|---------|----------|
| Logs not appearing | Ensure method is implemented in logger config |
| Missing request/response logs | Verify `request`/`response` methods are defined |
| Performance impact | Disable debug logs in production |

---
