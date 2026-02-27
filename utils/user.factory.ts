export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

function uniqueEmail(prefix = "test"): string {
    const ts = Date.now();
    const rnd = Math.random().toString(16).slice(2, 8);
    return `${prefix}.${ts}.${rnd}@example.com`;
}

export function createUser(overrides: Partial<User> = {}): User {
    const password = process.env.E2E_PASSWORD ?? 'P@ssw0rd123!';

    return {
        firstName: 'Test',
        lastName: 'User',
        email: uniqueEmail('nop'),
        password,
        ...overrides,
    };
}