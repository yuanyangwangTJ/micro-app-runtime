// 小程序双线程模型的逻辑层
// 逻辑层进行逻辑处理、数据请求、接口调用等行为，然后将加工完成的数据传递给渲染层

onmessage = (e) => {
    // console.log(e.data);
    edata = JSON.parse(e.data);
    postMessage(JSON.stringify(edata));
}