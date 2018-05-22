var scoket = io();
scoket.on('connect', function () {
    console.log('connected to server')
})



scoket.on('disconnect', function () {
    console.log('disconnected from server');
});


scoket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
  
    jQuery('#messages').append(li);
  });



jQuery('#message-form').on('submit',function(e){
    e.preventDefault();
    scoket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
      }, function () {
    
      })
})
// scoket.emit('createMessage',{message:'new message created from client'},function(result){
//  console.log(result);
// });

// scoket.emit('createMail',{name:'from@gmail.com',text:'wassup'})