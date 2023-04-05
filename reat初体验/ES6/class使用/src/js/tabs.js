let _self;
class Tabs {
  constructor(id) {
    _self = this;
    this.tab = document.querySelector(id);
    this.tabadd = document.querySelector(".tabadd");
    this.ul = this.tab.querySelector("ul");
    this.section = this.tab.querySelector(".tabscon");
    this.init();
  }
  updateDom() {
    this.lis = this.tab.querySelectorAll("li");
    this.tabcontents = document.querySelectorAll("section");
    this.closeList = this.tab.querySelectorAll(".icon-guanbi");
  }
  init() {
    this.updateDom();
    this.closeList.forEach(item => {
      item.onclick = this.handleClose;
    })
    this.tabadd.onclick = this.handleAdd;
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i;
      this.lis[i].onclick = this.handleToggle;
    }
    // this.lis.forEach((item, index) => {
    //   this.lis[index].index = index;
    //   item.onclick = this.handleToggle;
    // })
  }
  handleToggle() {
    _self.handleClear();
    // _self.lis.forEach(item => {
    //   item.className = "";
    // });
    // _self.tabcontents.forEach(item => {
    //   item.className = "";
    // });
    // this.lis[index].className = "liactive";
    this.className = "liactive";
    _self.tabcontents[this.index].className = "conactive";
  }
  handleClear() {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = "";
      this.tabcontents[i].className = "";
    }
  }
  handleAdd() {
    _self.handleClear();
    const li = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>';
    _self.ul.insertAdjacentHTML('beforeend', li);
    const section = '<section class="conactive">测试1</section>';
    _self.section.insertAdjacentHTML('beforeend', section);
    _self.init();
  }
  handleClose(e) {
    e.stopPropagation();
    let index = this.parentNode.index;
    _self.lis[index].remove();
    _self.tabcontents[index].remove();
    _self.init();
    if(document.querySelector(".liactive")) return;
    index--;
    _self.lis[index] && _self.lis[index].onclick();
  }
}

new Tabs("#tab")