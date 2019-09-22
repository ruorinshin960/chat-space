$(function() {

  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message">
                <div class="message__upper">
                <div class="messages__members">
                  ${message.user_name}
                </div>
                <div class="messages__timestamp">
                  <a>
                  ${message.date}
                  </a>
                </div>
                </div>
                <div class="messages__chat ">
                  <p class="message__content">
                    <div>
                      ${content}
                    </div>
                    ${img}
                  </p>
                </div>`;
        return html;
    }

    function scroll() {
      var target = $('.message').last();
      var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({
      scrollTop: position
    }, 300, 'swing');
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
      $('.form__message').val('');
      $('.form__submit').prop('disabled', false);
      scroll()
    })
    .fail(function(){
      alert('error')
      $('.form__submit').prop('disabled', false);
    })
  })
})