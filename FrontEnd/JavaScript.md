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

3. What are Promises?
    Imagine that you’re a top singer, and fans ask day and night for your upcoming song.

    To get some relief, you promise to send it to them when it’s published. You give your fans a list. They can fill in their email addresses, so that when the song becomes available, all subscribed parties instantly receive it. And even if something goes very wrong, say, a fire in the studio, so that you can’t publish the song, they will still be notified.

    Everyone is happy: you, because the people don’t crowd you anymore, and fans, because they won’t miss the song.

    This is a real-life analogy for things we often have in programming:

    A “producing code” that does something and takes time. For instance, some code that loads the data over a network. That’s a “singer”.
    A “consuming code” that wants the result of the “producing code” once it’s ready. Many functions may need that result. These are the “fans”.
    A promise is a special JavaScript object that links the “producing code” and the “consuming code” together. In terms of our analogy: this is the “subscription list”. The “producing code” takes whatever time it needs to produce the promised result, and the “promise” makes that result available to all of the subscribed code when it’s ready.
    The analogy isn’t terribly accurate, because JavaScript promises are more complex than a simple subscription list: they have additional features and limitations. But it’s fine to begin with.

    The constructor syntax for a promise object is:

    let promise = new Promise(function(resolve, reject) {
    // executor (the producing code, "singer")
    });

    The function passed to new Promise is called the executor. When new Promise is created, the executor runs automatically. It contains the producing code which should eventually produce the result. In terms of the analogy above: the executor is the “singer”.

    Its arguments resolve and reject are callbacks provided by JavaScript itself. Our code is only inside the executor.

    When the executor obtains the result, be it soon or late, doesn’t matter, it should call one of these callbacks:

    resolve(value) — if the job is finished successfully, with result value.
    reject(error) — if an error has occurred, error is the error object.
    So to summarize: the executor runs automatically and attempts to perform a job. When it is finished with the attempt, it calls resolve if it was successful or reject if there was an error.

    The promise object returned by the new Promise constructor has these internal properties:

    state — initially "pending", then changes to either "fulfilled" when resolve is called or "rejected" when reject is called.
    result — initially undefined, then changes to value when resolve(value) is called or error when reject(error) is called.

    let promise = new Promise(function(resolve, reject) {
    resolve("done");

    reject(new Error("…")); // ignored
    setTimeout(() => resolve("…")); // ignored
    });

