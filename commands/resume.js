module.exports = {
  name: "resume",
  description: "resume the song",
  async execute(message, dispatcher) {
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) {
      return message.channel.send("Join a voice channel first");
    }

    // seems like bug in resume(applied dirty fix)
    if (dispatcher.paused) {
      dispatcher.resume();
      dispatcher.pause();
      dispatcher.resume();
    } else await message.reply("nothing is paused");
  },
};
