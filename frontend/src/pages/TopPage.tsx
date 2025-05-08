export default function TopPage() {
  return (
    <div className="container mx-auto p-8">
      <div className="flex gap-4">
        <div className="w-1/2 border p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Posts</h2>
          <div className="border-b pb-4 mb-4">
            <textarea 
              className="w-full p-2 border rounded mb-2" 
              placeholder="Create a new post" 
              rows={3}
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Post</button>
          </div>
          <div className="space-y-4">
            <div className="border p-3 rounded">
              <p>投稿内容のサンプル1</p>
              <p className="text-sm text-gray-500">2025/01/01 12:34</p>
            </div>
            <div className="border p-3 rounded">
              <p>投稿内容のサンプル2</p>
              <p className="text-sm text-gray-500">2025/01/02 15:45</p>
            </div>
          </div>
        </div>
        <div className="w-1/2 border p-4 rounded">
          <h2 className="text-xl font-bold mb-4">Board</h2>
          <div>
            <textarea 
              className="w-full p-2 border rounded mb-2" 
              placeholder="Enter text on board" 
              rows={10}
              defaultValue="これはボードのテキスト内容です。
自由に編集してボタンを押すと内容が更新されます。

- 項目1
- 項目2
- 項目3

メモやタスクを管理するのに最適です。"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
          </div>
        </div>
      </div>
    </div>
  )
}