const ytdl = require("ytdl-core");
const ytsearch = require("yt-search");

module.exports = {
  name: "play",
  description: "play or pause a song",
  async execute(message, args) {
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) {
      return message.channel.send("Join a voice channel first");
    }
    const connection = await voice_channel.join();
    const search_video = async (query) => {
      const results = await ytsearch(query);
      return results.videos.length > 0 ? results.videos[0] : null;
    };

    var dispatcher;

    function validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    }
    if (validURL(args[0])) {
      try {
        dispatcher = connection.play(
          ytdl(args[0], {
            filter: "audioonly",
          })
        );
        dispatcher.on("finish", () => {
          voice_channel.leave();
        });
        await message.reply("Playing from url");
      } catch (error) {
        await message.channel.send(`unable to play: ${error}`);
      }
    } else {
      const video = await search_video(args.join(" "));

      if (video) {
        dispatcher = connection.play(ytdl(video.url, { filter: "audioonly" }));
        dispatcher.on("finish", () => {
          voice_channel.leave();
        });
      }
      await message.reply(`Playing : ${video.title} `);
    }
    return dispatcher;
  },
};
