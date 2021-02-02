module.exports = {
  name: "resume",
  description: "resume the song",
  async execute(dispatcher, message) {
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) {
      return message.channel.send("Join a voice channel first");
    }

    // seems like bug in resume(applied dirty fix)
    if (dispatcher.dispatcher.paused) {
      dispatcher.dispatcher.resume();
      dispatcher.dispatcher.pause();
      dispatcher.dispatcher.resume();
    } else await message.reply("nothing is paused");
  },
};
