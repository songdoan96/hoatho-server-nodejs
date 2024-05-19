document.addEventListener("DOMContentLoaded", function () {
  pusher = new Pusher("7003229a99691c0e84cf", { cluster: "ap1" });
  var channel = pusher.subscribe("my-channel");
  channel.bind("my-event", function (data) {
    alert(JSON.stringify(data));
  });
});
