class str<const T extends string = string> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    append<const U extends str>(other: U): str<`${T}${U extends str<infer S> ? S : never}`>;
    append(other: str) {
        return new str(`${this.value}${other.value}`);
    }

    startsWith<const U extends str, S extends string = U extends str<infer S> ? S : never>(
        prefix: T & `${S}${string}` extends never ? S : T & `${S}${T}` extends never ? S : never,
    ): T extends `${S}${string}` ? true : false;
    startsWith<const U extends str, S extends string = U extends str<infer S> ? S : never>(
        prefix: S,
    ): this is string extends S ? str<T> : str<`${S}${T}`>;
    startsWith(other: str) {
        return this.value.startsWith(other.value);
    }
}

const x = "";
x satisfies `${string}`;
x satisfies `${string}${string}`;
const y: `${string}${string}` = x;

const a = str("hello").append(str(" ")).append(str("world"));
if (a.startsWith("helloo")) {
    a;
}
if (a.startsWith("hello")) {
    a;
}

const b = new str(Math.random().toString()).append(" ").append("world");
if (b.startsWith("helloo")) {
    b;
}

if (b.startsWith(Math.random().toString())) {
    b;
}
