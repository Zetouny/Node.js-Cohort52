# Differences Between Express.js Response Methods

In Express.js (a popular Node.js web framework), there are several methods available on the response object (`res`) for sending data back to clients. Let me explain the key differences between them:

## res.send()

`res.send()` is an Express-specific method that:

- Sends a response of various types (string, object, Buffer, etc.)
- Automatically sets appropriate Content-Type headers based on the data type
- Ends the response process automatically (no need to call res.end() afterward)
- Can only be called once per response
- Includes ETag headers for caching
- Example: `res.send('Hello World')` or `res.send({ data: 'something' })`

## res.json()

`res.json()` is a specialized Express method that:

- Sends a JSON response specifically
- Automatically converts the passed object to JSON
- Sets the Content-Type header to 'application/json'
- Calls `res.send()` under the hood
- Provides JSON formatting options (replacer and space parameters)
- Example: `res.json({ user: 'john', id: 123 })`

## res.write()

`res.write()` is a lower-level Node.js HTTP method that:

- Writes data to the response buffer without ending the response
- Can be called multiple times to stream data in chunks
- Does not automatically set Content-Type headers
- Requires `res.end()` to be called afterward to complete the response
- Example:

  ```javascript
  res.write("First chunk of data");
  res.write("Second chunk of data");
  res.end();
  ```

## res.end()

`res.end()` is a Node.js HTTP method that:

- Signals that the server has finished sending the response
- Can optionally include data as its argument
- Does not set Content-Type headers automatically
- Does not include ETag headers (unlike res.send())
- Primarily used to end responses after using res.write() or for empty responses
- Example: `res.end()` or `res.end('Simple response')`

## Key Differences and When to Use Each

| Method      | Auto sets Content-Type        | Ends response | Can be called multiple times | Includes ETag | Best for                        |
| ----------- | ----------------------------- | ------------- | ---------------------------- | ------------- | ------------------------------- |
| res.send()  | Yes                           | Yes           | No (only once)               | Yes           | General-purpose responses       |
| res.json()  | Yes (always application/json) | Yes           | No (only once)               | Yes           | JSON data specifically          |
| res.write() | No                            | No            | Yes                          | No            | Streaming data in chunks        |
| res.end()   | No                            | Yes           | No                           | No            | Ending responses or simple data |

## Performance Considerations

- For large data sets, `res.write()` followed by `res.end()` may be more efficient as it allows streaming
- `res.send()` can cause memory spikes with very large objects
- For JSON responses, `res.json()` is more semantic and slightly better for code readability

In most Express applications, `res.send()` and `res.json()` will be your go-to methods for the majority of responses, with `res.write()` and `res.end()` being used for more specialized streaming scenarios.
