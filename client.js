var $name = $("#name");
var $chat = $('#chat').prop("disabled", true);
var client = new Faye.Client('/faye');

$(document).keyup(function (e) {
  if ($name.val() == "") $chat.prop("disabled", true)
  else if ($name.val() != "") $chat.prop("disabled", false);
  if (e.which == 13) {
    var publication = client.publish('/channel', { text: $chat.val() });

    publication.then(function () {
      console.log('Message received by server!');
    }, function (error) {
      alert('There was a problem: ' + error.message);
    });
    $chat.val('');
    return false;
  }
});

client.subscribe('/channel', function (message) {
  $('#messages').append('<p>' + '<b>' + $name.val() + ": " + '</b>' + message.text + '</p>');
});