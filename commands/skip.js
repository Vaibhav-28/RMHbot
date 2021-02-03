const ytdl = require("ytdl-core");
module.exports = {
  name: "skip",
  description: "skip current song",
  async execute(dispatcher, message) {
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) {
      return message.channel.send("Join a voice channel first");
    }
    const connection = await voice_channel.join();
    async function playSong() {
      dispatcher.dispatcher = connection.play(
        ytdl(dispatcher.q[0].url, { filter: "audioonly" })
      );
      await message.channel.send(`Playing : ${dispatcher.q[0].title}`);
      dispatcher.q.shift();
      dispatcher.dispatcher.on("finish", async () => {
        if (dispatcher.q.length) {
          playSong();
        } else {
          await voice_channel.leave();
          await message.channel.send("RMH left");
          dispatcher.dispatcher = null;
        }
      });
    }
    async function skipSong() {
      dispatcher.dispatcher = null;
      playSong();
    }
    if (dispatcher.q.length) skipSong();
    else message.reply("nothing to skip");
  },
};
