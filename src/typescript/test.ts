export function makePerson(name: string, age: number) {
    return {
        name,
        age,
    };
};
export function testMakePerson() {
    console.log(makePerson('YSM', 22), makePerson('유성민', 33));
};