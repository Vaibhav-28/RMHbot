const ytdl = require("ytdl-core");
bestsongs = [
  "https://www.youtube.com/watch?v=GGGO9nPO0Po",
  "https://www.youtube.com/watch?v=u6LahTuw02c",
  "https://www.youtube.com/watch?v=HtUH9z_Oey8",
  "https://www.youtube.com/watch?v=tzVJPgCn-Z8",
];
module.exports = {
  name: "bestsong",
  description: "play a bestsong",
  async execute(message, args) {
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) {
      return message.channel.send("Join a voice channel first");
    }
    const connection = await voice_channel.join();

    return connection.play(
      ytdl(bestsongs[Math.floor(Math.random() * bestsongs.length)], {
        filter: "audioonly",
      })
    );
  },
};
