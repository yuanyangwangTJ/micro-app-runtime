// 逻辑线程

let logicWorker;
if (typeof Worker !== "undefined") {
    if (typeof logicWorker == "undefined") {
        const url = 'http://localhost:3000/dist/logic.js';
        logicWorker = new Worker(url);
    }
    logicWorker.onmessage = (e) => {
        console.log(e.data);
        const edata = JSON.parse(e.data);
        if ("listdel" in edata) {
            listDel.publish(edata);
        }
        if ("listadd" in edata) {
            listAdd.publish(edata);
        }
    };
} else {
    alert("不支持webworker");
}

const listAdd = {
    list: [],
    subscribe(cb) {
        this.list.push(cb);
    },
    publish(arg) {
        this.list.forEach((cb) => {
            cb && cb(arg);
        });
    },
};
const listDel = {
    list: [],
    subscribe(cb) {
        this.list.push(cb);
    },
    publish(arg) {
        this.list.forEach((cb) => {
            cb && cb(arg);
        });
    },
};

function Item(props) {
    return <li className="item" style={props.style}> {props.children} < a href="#" onClick={props.onRemoveItem} > X </a ></li >;
}

class view extends Component {
    constructor(props) {
        super(props);
        viewShow.subscribe(this.handleShowSwitch.bind(this));
        this.state = { show: true };
        if ("show" in this.props) {
            this.state.show = this.props.show;
        }
    }
    handleShowSwitch(id) {
        if (typeof (this.props.id) !== "undefined" && this.props.id == id) {
            console.log(this.state);
            let tmpstate = JSON.parse(JSON.stringify(this.state));
            tmpstate.show = !tmpstate.show;
            console.log(tmpstate);
            this.setState(tmpstate);
        }
    }
    render() {
        return <div className="view" style={this.state.show ? this.props.style : "display: none"}>{this.props.children}</div>;
    }
}

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    text: 'aaa',
                    color: 'pink'
                },
                {
                    text: 'bbb',
                    color: 'orange'
                },
                {
                    text: 'ccc',
                    color: 'yellow'
                }
            ]
        }
        listAdd.subscribe(this.handleAdd.bind(this));
        listDel.subscribe(this.handleItemRemove.bind(this));
    }

    handleItemRemove(edata) {
        if (typeof (this.props.id) == "undefined" || this.props.id == edata["listdel"]) {
            this.setState({
                list: this.state.list.filter((item, i) => i !== edata["index"])
            });
        }
    }

    handleAdd(edata) {
        console.log(edata);
        if (typeof (this.props.id) == "undefined" || this.props.id == edata["listadd"]) {
            this.setState({
                list: [
                    ...this.state.list,
                    {
                        text: edata["value"]
                    }
                ]
            });
        }
    }

    render() {
        return <view>
            <ul className="list">
                {this.state.list.map((item, index) => {
                    return <Item style={{ background: item.color, color: this.props.textColor }} onRemoveItem={() => {
                        let tmp = { listdel: this.props.id, index: index };
                        logicWorker.postMessage(JSON.stringify(tmp));
                    }}>{item.text}</Item>
                })}
            </ul>
            <view>
                <input ref={(ele) => { this.ref = ele }} />
                <button onclick={() => {
                    let tmp = { listadd: this.props.id, value: this.ref.value };
                    logicWorker.postMessage(JSON.stringify(tmp));
                }}>Add</button>
            </view>
        </view>;
    }

}

