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

        case '/edit.html':
          const uid = window.location.search.split("?uid=")[1]
            // 保存するをクリックした時のイベントリスナー設定
            document.getElementById('save-btn').addEventListener('click', () => {
            return usersModule.saveUsers(uid)
            })
            // キャンセルをクリックした時のイベントリスナー設定
            document.getElementById('cancel-btn').addEventListener('click', () => {
            return window.location.href = "/"
            })
            //削除するボタンを押したとき
            document.getElementById('delete-btn').addEventListener('click', () => {
              return usersModule.deleteUser(uid)
              })

              return usersModule.setExisitingValue(uid)
        
            default:
            break;
    }
  })()
