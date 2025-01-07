```js
// While loop with i as index for stopping loop
function sumLoop(n) {
  let i = 1;
  let sum = 0;
  while (i <= n) {
    sum += i;
    i++;
  }
  return sum;
}

// Use Array.from to generate an incremental array then use reduce to sum the array
function sumArrayReduce(n) {
  return Array.from({ length: n })
    .map((_, idx) => idx + 1)
    .reduce((prev, current) => prev + current, 0);
}

// Use recursive to sum by decrement
function sumRecursive(n) {
  if (n <= 1) {
    return n;
  }
  return n + sumRecursive(n - 1);
}
```
