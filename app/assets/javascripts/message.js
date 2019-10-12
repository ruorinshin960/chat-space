$(function() {

  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="message" data-message-id="${message.id}">
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

  //インクリメンタルサーチ

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
      contentType: false,
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $("form")[0].reset();
      $('.form__submit').prop('disabled', false);
      scroll()
    })
    .fail(function(){
      alert('error')
      $('.form__submit').prop('disabled', false);
    })
  })

  // 自動更新機能

  var reloadMessages = function() {

    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");

    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url:'api/messages',
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      messages.forEach(function (message){
      //メッセージが入ったHTMLを取得
      insertHTML = buildHTML(message); 
      //メッセージを追加
      $('.messages').append(insertHTML);
    })
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
      })
    
    .fail(function() {
      alert('error')
    });
   }
  };
  setInterval(reloadMessages, 5000);
});