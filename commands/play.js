const ytdl = require("ytdl-core");
const ytsearch = require("yt-search");
module.exports = {
  name: "play",
  description: "play or pause a song",
  async execute(dispatcher, message, args) {
    const voice_channel = message.member.voice.channel;
    if (!voice_channel) {
      return message.channel.send("Join a voice channel first");
    }
    const connection = await voice_channel.join();
    const search_video = async (query) => {
      const results = await ytsearch(query);
      return results.videos.length > 0 ? results.videos[0] : null;
    };

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
    var video;
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

    if (validURL(args[0])) {
      async function addVideo(url) {
        let info = await ytdl.getInfo(url);
        let song = {
          title: info.videoDetails.title,
          url: info.videoDetails.video_url,
        };
        if (info) dispatcher.q.push(song);
        if (!dispatcher.dispatcher) playSong();
        else message.reply(`${song.title} is added to queue`);
      }
      addVideo(args[0]);
    } else {
      video = await search_video(args.join(" "));
      if (video) dispatcher.q.push(video);
      if (!dispatcher.dispatcher) playSong();
      else message.reply(`${video.title} is added to queue`);
    }
  },
};
