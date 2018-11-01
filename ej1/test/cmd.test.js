const commands = require('../cmd');

test('parse pwd and quit and recognize 2 commands', () => {
    const input0 = "pwd\nquit";

    expect(commands.parseInput(input0).length).toBe(2);
});
