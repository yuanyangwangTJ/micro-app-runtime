// index.js 界面
// 小程序的主界面，使用类小程序语言
// 将小程序的 Page 函数简化为 data 数据
// 小程序的html语言（比如ttml、wxml）可以使用jsx（添加view）简化

const data = {
    item1: 'item-1',
    ifShow: true,
    elements: ['el-1', 'el-2', 'el-3']
}

let jsx =
    <view id="main">
        <h2>Head 1</h2>
        <ul className="list">
            <li className="item" style={{ background: 'blue', color: 'pink' }} onClick={() => alert(1)}>{data.item1}</li>
            <li className="item">{data.ifShow ? "item-2" : ""}</li>
            {data.elements.map(item => <li className="item">{item}</li>)}
        </ul >
        <view id="data" show={data.ifShow}>
            <h2>Head 2</h2>
        </view>
        <List id="list" textColor={'#FF00FF'} />
    </view>;

render(jsx, document.getElementById('root'));