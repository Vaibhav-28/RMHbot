module.exports = {
  name: "pause",
  description: "pause the song",
  async execute(message, dispatcher) {
    var dis;
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) {
      return message.channel.send("Join a voice channel first");
    }
    if (dispatcher) dispatcher.pause();
    else await message.reply("nothing is playing");
  },
};
