module.exports = {
  name: "stop",
  description: "stop the bot and leave",
  async execute(message, args) {
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) {
      return message.channel.send("Join a voice channel first");
    }
    await voice_channel.leave();
    await message.channel.send("RMH left");
  },
};
