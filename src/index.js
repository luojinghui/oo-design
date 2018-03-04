/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Date: 2018/3/4
 * Time: 下午3:20
 */

;(function () {
  const Utils = {
    originData: [ //源数据
      {
        status: "building",
        url: "www.thoughtworks.com",
        ip: "192.168.332.22",
        path: "/var/path/project",
        img: "assets/images/ubuntu.png",
        compatible: ["Firfox", "Chrome"]
      },
      {
        status: "idle",
        url: "www.thoughtworks.com",
        ip: "192.168.332.22",
        path: "/var/path/project",
        img: "assets/images/cent_os.png",
        compatible: ["Firfox", "Chrome"]
      }
    ],

    /**
     @method get
     *
     @desc 获取所有的可用数据
     *
     @return {Object} 源数据
     */
    get: () => {
      return Utils.originData;
    },

    /**
     @method delete
     *
     @desc 删除指定索引的数据
     *
     @param {Number} index 删除数据外围索引值
     @param {Number} key 删除数据索引值
     *
     @return {void} 无
     */
    delete: (index, key) => {
      return Utils.originData[index].compatible.splice(key, 1);
    },

    /**
     @method add
     *
     @desc 添加指定索引的数据
     *
     @param {Number} index 添加数据索引值
     @param {String} value 添加的字符串
     *
     @return {void} 无
     */
    add: (index, value) => { //增加新系统名称
      let data = value.split(",");
      let oldData = Utils.originData[index].compatible;

      data.map((val) => val.replace(/</g, '&lt;').replace(/>/g, '&gt;'));   //过滤字符串特殊字符,防止恶意攻击

      return Utils.originData[index].compatible = oldData.concat(data);
    },
    /**
     @method getStatusNum
     *
     @desc 统计不同状态(idle, building)的次数
     *
     @return {Object} 返回统计数
     */
    getStatusNum: () => {
      let count = {};

      Utils.originData.forEach((val) => {
        if (count[val.status]) {
          count[val.status] += 1;
        } else {
          count[val.status] = 1;
        }
      });

      return count;
    }
  };

  let App = {
    /**
     * 初始化函数,进行绑定事件,渲染页面
     */
    init() {
      let clientHeight = document.documentElement.clientWidth;
      let phone = clientHeight <= 1024 ? true : false;

      this.state = {
        index: "",                    //添加的index值
        firstIn: true,                //页面是否是初次渲染
        data: Utils.get(),            //获取源数据
        isPhone: phone                //是否是手机模式
      };

      this.findDom();                 //获取所有Dom
      this.bindEvent();               //绑定监听事件
      this.render();                  //初始化渲染
    },

    findDom() {
      this.content = document.getElementById("task-ul");
      this.building = document.getElementById("building");
      this.idle = document.getElementById("idle");
      this.addBox = document.getElementById("add-model");
      this.tBox = document.getElementById("transparent-model");
      this.bBox = document.getElementById("b-model");
      this.closeBox = document.getElementById("close-model");
      this.cancelBox = document.getElementById("cancel-model");
      this.inputSys = document.getElementById("input-sys");
      this.sureBtn = document.getElementById("sure-btn");
      this.idle = document.getElementById("idle");
      this.building = document.getElementById("building");
      this.total = document.getElementById("total");
      this.menuAction = document.getElementById("open-menu");
      this.menu = document.getElementById("menu");
    },

    bindEvent() {
      this.eventAdd(this.content, "click", this.onClick.bind(this));
      this.eventAdd(this.tBox, "click", this.onCancelModel.bind(this));
      this.eventAdd(this.closeBox, "click", this.onCancelModel.bind(this));
      this.eventAdd(this.cancelBox, "click", this.onCancelModel.bind(this));
      this.eventAdd(this.sureBtn, "click", this.saveSys.bind(this));
      this.eventAdd(this.menuAction, "click", this.onOpenMenu.bind(this));
      this.eventAdd(this.bBox, "click", this.onCancelModel.bind(this));
    },

    eventAdd(dom, type, func) {
      dom && dom.addEventListener(type, func);
    },

    eventRemove(dom, type, func) {
      dom.removeEventListener(type, func, true);
    },

    //打开蒙版
    onOpenMenu() {
      this.bBox.setAttribute("class", "model b-model");
      this.menu.setAttribute("class", "menu flex j-c-sb f-d-c menu-open");
    },

    //关闭蒙版及弹窗
    onCancelModel() {
      this.inputSys.value = "";
      this.bBox.setAttribute("class", "model b-model none");
      this.tBox.setAttribute("class", "model transparent-model none");
      this.addBox.setAttribute("class", "add-sys-model none");
      this.menu.setAttribute("class", "menu flex j-c-sb f-d-c");
    },

    //保存添加,并更新视图
    saveSys() {
      let value = this.inputSys.value;

      if (value.trim().length > 0) {
        Utils.add(this.index, value);
        this.onCancelModel();
        this.render();
      }
    },

    //设置添加弹窗的弹出位置
    openAddModel(index, evt) {
      let offetX = evt.target.getBoundingClientRect().x;
      let offetY = evt.target.getBoundingClientRect().y;

      this.index = index;

      if (this.state.isPhone) {
        this.bBox.setAttribute("class", "model b-model");
        this.addBox.setAttribute("class", "add-sys-model add-sys-center");
      } else {
        this.tBox.setAttribute("class", "model transparent-model");
        this.addBox.style.left = offetX - 20 + "px";
        this.addBox.style.top = offetY + 40 + "px";
        this.addBox.setAttribute("class", "add-sys-model");
      }
    },

    //事件代理按类型处理对应的方法
    onClick(evt) {
      let content = document.getElementById("task-ul");
      let target = evt.target || evt.srcElement;
      let type = "";
      let index = "";
      let key = "";

      while (target !== content) {
        type = target.getAttribute("data-type");
        index = target.getAttribute("data-index") || "";
        key = target.getAttribute("data-key") || "";

        if (type === "delete") {
          Utils.delete(index, key);
          this.render();
          break;
        }

        if (type === "add") {
          this.openAddModel(index, evt);
          break;
        }

        target = target.parentNode;
      }
    },

    //加载视图
    view() {
      let fragment = document.createDocumentFragment();  //减少回流
      fragment = "";

      this.state.data.map((val, index) => {
        let sys = "";
        val.compatible.map((value, key) => {
          sys += `<li class="task-sys-li mr10 flex a-c">
                <span>${value}</span>
                <i class="curise icon-trash" data-type="delete" data-index=${index} data-key=${key}></i>
           </li>`
        });

        fragment += `
                    <li class="task-li flex">
                        <div class="task-img">
                            <img src=${val.img} alt="ubuntu">
                        </div>
                        <div>
                            <div class="flex-l flex flex-wrap">
                                <div class="task-info flex a-c">
                                    <i class="curise icon-desktop"></i>
                                    <a href=${val.url} title="url">${val.url}</a>
                                </div>
                                <div class="bages ${val.status === "idle" ? "idle" : "building"} flex a-c">${val.status}</div>
                                <div class="task-info flex a-c">
                                    <i class="curise icon-info"></i>
                                    <span>${val.ip}</span>
                                </div>
                                <div class="task-info flex a-c">
                                    <i class="curise icon-folder"></i>
                                    <span>${val.path}</span>
                                </div>
                            </div>

                            <div class="task-add flex a-c">
                                <div class="btn-1 flex a-c mr10" data-type="add" data-index=${index}>
                                    <i class="curise icon-plus"></i>
                                </div>
                                <ul class="task-sys-list flex flex-wrap">
                                    ${sys}
                                </ul>
                            </div>
                        </div>
                        ${val.status === "idle" ? "" : '<div class="task-operate-btn btn-1 flex a-c transition3"><i class="curise icon-deny"></i><span>Deny</span></div>'}
                    </li>
`;
      });

      if (this.content) {
        this.content.innerHTML = fragment;
      }
    },

    //渲染页面
    render() {
      let {firstIn} = this.state;
      this.view();

      if (firstIn && this.building && this.idle && this.total) {
        let count = Utils.getStatusNum();

        this.building.innerHTML = count.building;
        this.idle.innerHTML = count.idle;
        this.total.innerHTML = count.building + count.idle;
      }
    }
  };

  App.init();

  //暴露处理数据函数,便于单元测试
  window.debug = {
    utils: Utils
  }
})();