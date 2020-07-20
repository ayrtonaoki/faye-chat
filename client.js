var $name = $("#name");
var $chat = $('#chat');
var client = new Faye.Client('/faye');
// $('#fire').on('click', null, function () { Send message with click
$(document).keypress(function (e) {
  if (e.which == 13) {
    var publication = client.publish('/channel', { text: $name.val() + ": " + $chat.val() });

    publication.then(function () {
      console.log('Message received by server!');
      console.log('Message received by server!');
    }, function (error) {
      alert('There was a problem: ' + error.message);
    });

    $chat.val('');

    return false;
  }
});
client.subscribe('/channel', function (message) {
  $('#messages').append('<p>' + message.text + '</p>');
});