/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Date: 2018/3/4
 * Time: 下午3:20
 */

;(function () {
  const Utils = {
    originData: [
      {
        status: "building",
        url: "www.thoughtworks.com",
        ip: "192.168.332.22",
        path: "/var/path/project",
        img: "assets/images/ubuntu.png",
        compatible: ["Firfox", "Chrome"]
      },
      {
        status: "building",
        url: "www.thoughtworks.com",
        ip: "192.168.332.22",
        path: "/var/path/project",
        img: "assets/images/cent_os.png",
        compatible: ["Firfox", "Chrome"]
      },
      {
        status: "idle",
        url: "www.thoughtworks.com",
        ip: "192.168.332.22",
        path: "/var/path/project",
        img: "assets/images/debin.png",
        compatible: ["Firfox", "Chrome", "Webpack"]
      },{
        status: "idle",
        url: "www.thoughtworks.com",
        ip: "192.168.332.22",
        path: "/var/path/project",
        img: "assets/images/windows.png",
        compatible: ["Firfox", "Chrome", "Webpack"]
      }
    ],
    get: () => {
      return Utils.originData;
    },
    delete: (index, key) => {
      Utils.originData[index].compatible.splice(key, 1);
    },
    add: (index, value) => {
      let data = value.split(",");
      let oldData = Utils.originData[index].compatible;

      Utils.originData[index].compatible = oldData.concat(data);
    }
  };

  let App = {
    init() {
      this.data = Utils.get();  //获取原始数据
      this.index = "";
      this.findDom();   //获取所有Dom
      this.bindEvent();
      this.render();    //初始化渲染
    },

    findDom() {
      this.content = document.getElementById("task-ul");
      this.building = document.getElementById("building");
      this.idle = document.getElementById("idle");
      this.trashBox = document.querySelector(".task-sys-li");
      this.sysList = document.querySelectorAll(".task-li");
      this.addBox = document.getElementById("add-model");
      this.tBox = document.getElementById("transparent-model");
      this.bBox = document.getElementById("b-model");
      this.closeBox = document.getElementById("close-model");
      this.cancelBox = document.getElementById("cancel-model");
      this.inputSys = document.getElementById("input-sys");
      this.sureBtn = document.getElementById("sure-btn");
    },

    bindEvent() {
      this.eventAdd(this.content, "click", this.remove.bind(this));
      this.eventAdd(this.tBox, "click", this.hiddenTModal.bind(this));
      this.eventAdd(this.closeBox, "click", this.hiddenTModal.bind(this));
      this.eventAdd(this.cancelBox, "click", this.hiddenTModal.bind(this));
      this.eventAdd(this.sureBtn, "click", this.saveSys.bind(this));
    },

    eventAdd(dom, type, func) {
      dom.addEventListener(type, func);
    },

    eventRemove(dom, type, func) {
      dom.removeEventListener(type, func, true);
    },

    hiddenTModal() {
      this.inputSys.value = "";
      this.tBox.setAttribute("class", "model none transparent-model");
      this.addBox.setAttribute("class", "add-sys-model none");
    },

    view() {
      let fragment = document.createDocumentFragment();  //减少回流
      fragment = "";

      this.data.map((val, index) => {
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

      this.content.innerHTML = fragment;
    },

    render() {
      this.view();
    },

    saveSys() {
      let value = this.inputSys.value;

      if(value.trim().length > 0) {
        Utils.add(this.index, value);
        this.hiddenTModal();
        this.render();
      }
    },

    add(index, evt) {
      let offetX = evt.target.getBoundingClientRect().x;
      let offetY = evt.target.getBoundingClientRect().y;

      this.index = index;
      this.tBox.setAttribute("class", "model transparent-model");
      this.addBox.style.left = offetX - 20 + "px";
      this.addBox.style.top = offetY + 40 + "px";
      this.addBox.setAttribute("class", "add-sys-model");
    },

    remove(evt) {
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
          this.add(index, evt);
          break;
        }

        target = target.parentNode;
      }
    }
  };

  App.init();
})();