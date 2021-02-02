module.exports = {
  name: "stop",
  description: "stop the bot and leave",
  async execute(dispatcher, message) {
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) {
      return message.channel.send("Join a voice channel first");
    }

    dispatcher.q.length = 0;
    dispatcher.dispatcher = null;
    await voice_channel.leave();
    await message.channel.send("RMH left");
  },
};
