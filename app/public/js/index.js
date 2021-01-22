const indexModule = (() => {
    const path = window.location.pathname

    switch(path) {
        case '/':
            // 検索ボタンをクリックした時のイベントリスナー設定
            document.getElementById('search-btn').addEventListener('click', () => {
              return searchModule.searchUsers()
            })
          
            // UsersモジュールのfetchAllUsersメソッドを呼び出す
            return usersModule.fetchAllUsers()

        case '/create.html':
            // 保存するをクリックした時のイベントリスナー設定
            document.getElementById('save-btn').addEventListener('click', () => {
            return usersModule.createUsers()
            })
            // キャンセルをクリックした時のイベントリスナー設定
            document.getElementById('cancel-btn').addEventListener('click', () => {
            return window.location.href = "/"
            })
            break;
            default:
            break;
    }
  })()
