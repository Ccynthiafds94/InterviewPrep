Interview questions 

JavaScript & React Fundamentals

1. How does the event loop handle synchronous code, microtasks, and macrotasks?

    JS is single-threaded. The event loop runs in this order:

    a. Run all synchronous code on the call stack until it’s empty.
    b. Drain the microtask queue completely (Promise .then/catch/finally, queueMicrotask, MutationObserver).
    c. Run one macrotask (setTimeout, setInterval, I/O, UI events), then drain microtasks again.
    d. Render if needed, and repeat.

    Example js code
    console.log('1');
    setTimeout(() => console.log('2'), 0);
    Promise.resolve().then(() => console.log('3'));
    console.log('4');
    // Output: 1, 4, 3, 2

    Microtasks always run before the next macrotask, so a long chain of microtasks can starve rendering.

2. Explain how closures work and give a real-world example.

    A closure is a function that “remembers” the variables from its enclosing scope even after that outer function has finished executing. JS achieves this because functions keep a reference to their lexical environment, not just a snapshot of values.

    How it happens
    1. Nesting
    You define a function inside another function.
    2. Referencing
    The inner function uses a variable from the outer scope.
    3. Returning
    The outer function returns the inner one, keeping the connection alive.

    function createCounter() {
        let count = 0;
        
        return {
            increment: function() {
                count++;
                console.log(count);
            },
            decrement: function() {
                count--;
                console.log(count);
            }
        };
    }

    const myCounter = createCounter();
    myCounter.increment(); // 1
    myCounter.increment(); // 2

    Why does a closure 'remember' a variable after the outer function has finished?
    Because it keeps the reference

