const NOT_IMPLIMENTED = Symbol("NOT_IMPLIMENTED");
type NOT_IMPLIMENTED = typeof NOT_IMPLIMENTED;

export namespace Type {
    export type Creator<Type, Args extends unknown[]> = ((...args: Args) => Type) &
        (abstract new (NOT_IMPLIMENTED: NOT_IMPLIMENTED) => Type);
    export namespace Creator {
        export type Builder<Type> = <Args extends unknown[]>(create: (...args: Args) => Type) => Creator<Type, Args>;
    }
}

export function type<Type extends object>(): Type.Creator.Builder<Type> {
    return <Args extends unknown[]>(create: (...args: Args) => Type) => {
        const instances = new WeakSet<Type>();
        return Object.assign(
            (...args: Args) => {
                const instance = create(...args);
                instances.add(instance);
                return instance;
            },
            {
                [Symbol.hasInstance](value: Type) {
                    return instances.has(value);
                },
            },
        ) as never;
    };
}

type Foo = {
    foo: string;
};
const Foo = type<Foo>()(() => ({
    foo: "foo",
}));
const foo = Foo() as unknown;
