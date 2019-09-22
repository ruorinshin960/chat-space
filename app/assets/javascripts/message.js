$(function() {

  function buildHTML(message){

    var html = `<div class="messages__members ">
                  ${ message.user_name }
                </div>
                <div class="messages__timestamp">
                  ${ message.time }
                </div>
                <div class="messages__chat ">
                  <p class="message__content">
                    ${ message.content }
                  </p>
                </div>`;
        return html;
    }

  $('#new_message').on('submit', function(e) {
     e.preventDefault();
     var formData = new FormData(this);
     var url = $(this).attr('action');

     $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__mask').val('');
      $('.form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error')
      $('.form__submit').prop('disabled', false);
   })
  })
})