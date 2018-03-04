var expect = chai.expect;
var Utils = window.debug.utils;
let data = [
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
];

describe('Utils', function() {
  describe('#get()', function() {
    it('should return source data', function() {
      expect(Utils.get()).to.be.deep.equal(data);
    });
  });

  describe('#delete(index, key)', function() {
    it('should return ["Firfox"] when receive 0 & 0', function() {
      expect(Utils.delete(0, 0)).to.be.deep.equal(["Firfox"]);
    });

    it('should return ["Firfox","Chrome"] when receive 1 & 2', function() {
      expect(Utils.delete(1, 1)).to.be.deep.equal(["Chrome"]);
    });
  });

  describe('#add(index, value)', function() {
    it('should return ["Chrome", "qqq"] when receive 0 & qqq', function() {
      let expectData = ["Chrome", "qqq"];

      expect(Utils.add(0, "qqq")).to.be.deep.equal(expectData);
    });

    it('should return ["Firfox", "qqq", "www"] when receive 1 & qqq,www', function() {
      let expectData = ["Firfox", "qqq", "www"];

      expect(Utils.add(1, "qqq,www")).to.be.deep.equal(expectData);
    });
  });

  describe('#getStatusNum()', function() {
    it('should return {idle: 1, building: 1}', function() {
      let expectData = {idle: 1, building: 1};

      expect(Utils.getStatusNum()).to.be.deep.equal(expectData);
    });

    it('should return {idle: 3, building: 2}', function() {
      let expectData = {idle: 3, building: 2};
      Utils.originData = [
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
        },
        {
          status: "idle",
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
          img: "assets/images/cent_os.png",
          compatible: ["Firfox", "Chrome"]
        },
        {
          status: "building",
          url: "www.thoughtworks.com",
          ip: "192.168.332.22",
          path: "/var/path/project",
          img: "assets/images/ubuntu.png",
          compatible: ["Firfox", "Chrome"]
        },
      ];

      expect(Utils.getStatusNum()).to.be.deep.equal(expectData);
    });
  })
});