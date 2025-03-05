Here’s a refined version of `GlobalConfig` to handle both **chaining middleware** and **skipping group middleware**:  

```typescript
export let GlobalConfig = class {
    static middlewareExecuteType: "chaining" | "skip-group" = "chaining"; 
    static env: Record<string, string | number> = {}; 

    static setMiddlewareExecution(type: "chaining" | "skip-group") {
        this.middlewareExecuteType = type;
    }

    static getMiddlewareExecution(): "chaining" | "skip-group" {
        return this.middlewareExecuteType;
    }

    static shouldExecuteGroupMiddleware(): boolean {
        return this.middlewareExecuteType === "chaining"; // Executes group middleware only if in chaining mode
    }
};
```

---

### **How This Works**

- **`chaining` Mode**:  
  - Parent middleware + group middleware + route middleware all execute.  
- **`skip-group` Mode**:  
  - Skips **group middleware** and directly executes route middleware.  
- **`shouldExecuteGroupMiddleware()`**  
  - Returns `true` if middleware execution is in **chaining** mode.  
  - Returns `false` if **group middleware should be skipped**.  

---

#### **Example Execution Based on Mode**

✅ **For `/api/admin/settings` with `chaining`:**

1. Parent middleware (`/api`)  
2. Group middleware (`/api/admin`)  
3. Route middleware (`/api/admin/settings`)  

❌ **For `/api/admin/settings` with `skip-group`:**

1. Parent middleware (`/api`)  
2. 🚫 Skips **group middleware** (`/api/admin`)  
3. Route middleware (`/api/admin/settings`)  

Would you like a function that dynamically decides which middlewares to apply? 🚀
static middlewareStrategy: "inherit" | "isolated" = "inherit";
