webpackJsonp([4],{

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(session, Vue, net, $) {/**
 * Created by sunxin on 2016/12/19.
 */
var mainNav=__webpack_require__(7)
var projectList=__webpack_require__(23)
//var createProject=require("../util/component/createproject.vue")
if(!session.get("id"))
{
    location.href="../login/login.html"
}
var vue=new Vue({
    el: "#app",
    data: {
        photo:session.get("photo"),
        name:session.get("name"),
        projectList:[],
        showAdd:false,
        name:"",
        dis:"",
        addPending:false
    },
    components:{
        "mainnav":mainNav,
        "projectlist":projectList,
    },
    methods:{
        add:function () {
            if(!this.name)
            {
                this.$message.error("请输入名称");
                return;
            }
            var _this=this;
            this.addPending=true;
            net.post("/project/create",{
                name:_this.name,
                dis:_this.dis
            },{
                "content-type":"application/x-www-form-urlencoded"
            }).then(function (data) {
                _this.addPending=false;
                if(data.code==200)
                {
                    _this.projectList.unshift(data.data);
                    _this.$notify({
                        title: '创建成功',
                        type: 'success'
                    });
                    _this.showAdd=false;
                    _this.name="";
                    _this.dis=""
                }
            })
        },
        importProject:function () {
            $.showBox(this,"importProject");
        }
    },
    created:function () {
        var _this=this;
        net.get("/project/list",{}).then(function (data) {
            $.stopLoading();
            if(data.code==200)
            {
                for(var i=0;i<data.data.length;i++)
                {
                    _this.projectList.push(data.data[i]);
                }
            }
        })
    },
})
$.ready(function () {
    $.startLoading();
})
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(1), __webpack_require__(5), __webpack_require__(0)))

/***/ })

},[159]);
//# sourceMappingURL=project.js.map