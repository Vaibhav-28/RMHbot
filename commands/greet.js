module.exports = {
  name: "greet",
  description: "greet command",
  async execute(message, args) {
    await message.reply("hi");
  },
};
