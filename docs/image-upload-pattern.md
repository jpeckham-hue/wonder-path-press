# Next.js Server Action Image Upload Pattern

## The Problem
When uploading images via Next.js Server Actions on Vercel, the default payload body size limit is strictly `1MB`. A standard phone photo easily exceeds this limit, leading to Vercel aborting the request and returning `Error: An unexpected response was received from the server`.

## The Solution
We implemented a pattern that compresses images client-side before submission and carefully controls the `FormData` object.

### Step 1: Client-Side Canvas Compression
Instead of passing the raw file to the Server Action via a standard `<input type="file">`, we intercept the file and draw it to a hidden HTML `<canvas>`. We resize the image so that the maximum width or height is `800px`, and then extract it as a JPEG base64 string at `70%` quality. This predictably reduces the image to `100-150KB`.

### Step 2: Delete Raw File from FormData
Next.js will serialize ALL active inputs inside a `<form>` tag when `new FormData(e.currentTarget)` is called. **CRITICAL:** If you leave the `<input type="file" name="imageUpload">` inside the form, Next.js will attach the raw 4MB file to the payload alongside your compressed base64 string, instantly bursting the 1MB payload limit!
You MUST explicitly call `formData.delete("imageUpload")` before sending the payload!

### Step 3: Catching Server Action Errors properly
When using `useTransition` -> `startTransition` to wrap server actions, you MUST handle errors carefully if you use a `try/catch` block. 
When Next.js navigation functions like `redirect()` are invoked from a server action, Next.js implements this by throwing a specific `NEXT_REDIRECT` error under the hood. 
If your `catch` block traps this error, the browser will FAIL to navigate. 

**Always ignore NEXT_REDIRECT errors in your catch blocks:**
```ts
} catch (error) {
  if ((error as any)?.message?.includes("NEXT_REDIRECT")) {
    throw error; // Rethrow to let Next.js change pages
  }
  alert("Error: " + error.message);
}
```
