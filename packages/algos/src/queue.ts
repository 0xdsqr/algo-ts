type Node<T> = {
    value: T;
    next?: Node<T>;
};

interface Queue<T> {
    enqueue(item: T): void;
    deque(): T | undefined;
    peek(): T | undefined;
}

function createQueue<T>(): Queue<T> {
    let length: number;

    return {
        enqueue(item: T): void {},

        deque(): T | undefined {
            return undefined;
        },

        peek(): T | undefined {
            return undefined;
        },
    };
}

export { createQueue, type Node, type Queue };
