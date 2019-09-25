$(function () {
  
  function appendUsers(user) {
  var html = `<div class="chat-group-form__field--left">
             <label class="chat-group-form__label" for="chat_group_チャットメンバ-">チャットメンバー</label>
             </div>
             <div class='chat-group-form__field--right'></div>
             <div class='cchat-group-user clearfix'></div>
             <p class='chat-group-user__name'> ${ user.name } 追加
             </p>`;
         return html;
  }

  $(".chat-group-form__input").on("keyup", function () {
      var input = $("#user-search-result")
      isChange = true;
      $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
      })
      
      .done(function (users) {
          $("#user_search_result").empty();
          if (users.length !== 0) {
              users.forEach(function (user) {
                  appendUsers(user);
              })
          }
      })

      .fail(function(){
        alert('ユーザー検索に失敗しました');
      });

  });
});