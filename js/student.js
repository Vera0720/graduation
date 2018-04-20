/**
 * Created by wangyuqing6 on 2018/3/27.
 */
$(function () {
    init();
    // 初始化页面
    function init() {
        initTable("allCompetition");
        bindEvent();
    }
    //初始化编辑器
    function initEditor() {
        var E = window.wangEditor;
        var editor = new E('#editor');
        // 或者 var editor = new E( document.getElementById('editor') )
        editor.create();
    }
    //事件绑定
    function bindEvent() {
        //导航栏一级菜单切换
        $('.menu-list-item').on('click',function () {
            if($(this).children('.menu-list-second').length == 0){
                $('.menu-list-second-item').removeClass('curr');
                $(this).children('.menu-list-first').addClass('curr').parents('.menu-list-item').siblings('.menu-list-item').children('.menu-list-first').removeClass('curr');
            }else{
                // $(this).siblings('.menu-list-item').children('.menu-list-first').removeClass('curr');
                $(this).children('.menu-list-second').is(':hidden') ? $(this).find('.arrow-down').addClass('arrow-up') : $(this).find('.arrow-down').removeClass('arrow-up');
                $(this).children('.menu-list-second').is(':hidden') ? $(this).children('.menu-list-second').show() : $(this).children('.menu-list-second').hide();
            }
        });
        //导航栏二级菜单切换
        $('.menu-list-second-item').on('click',function (e) {
            $('.menu-list-second-item').removeClass('curr');
            $('.menu-list-item .menu-list-first').removeClass('curr');
            $(this).addClass('curr');
            e.stopPropagation();
        });
        //点击所有竞赛
        $('.menu-list-first.all-competition').on('click',function () {
            initTable("allCompetition");
        });
        //点击我的竞赛--正在进行
        $('.menu-list-first.my-competition').siblings('.menu-list-second').children('.my-competition-doing').on('click',function () {
            initTable("myCompetitionDoing");
        });
        //点击我的竞赛--正在进行
        $('.menu-list-first.my-competition').siblings('.menu-list-second').children('.my-competition-done').on('click',function () {
            initTable("myCompetitionDone");
        });
        //点击我的报告--已提交
        $('.menu-list-first.my-report').siblings('.menu-list-second').children('.my-report-done').on('click',function () {
            initTable("myReportDone");
        });
        //点击我的报告--待提交
        $('.menu-list-first.my-report').siblings('.menu-list-second').children('.my-report-will').on('click',function () {
            initTable("myReportWill");
        });
        //点击我的获奖
        $('.menu-list-first.my-award').on('click',function () {
            initTable("myAward");
        });
        //点击个人中心--个人信息
        $('.menu-list-first.my-personal').siblings('.menu-list-second').children('.my-personal-situation').on('click',function () {
            initTable("myPersonalSituation");
        });
        //点击个人中心--密码修改
        $('.menu-list-first.my-personal').siblings('.menu-list-second').children('.my-personal-password').on('click',function () {
            initTable("myPersonalPassword");
        });
        // 点击查看详情弹窗
        $('body').on('click','.look-details',function () {
            detailShow();
        });
        // 点击关闭按钮
        $('body').on('click','.close-icon',function () {
            $(this).parents('.fade').remove();
        });
        // 点击关闭按钮
        $('body').on('click','.pop-window-footer-btn.cancel-btn',function () {
            $(this).parents('.fade').remove();
        });
        //点击【我要报名】弹出二次确认窗
        $('body').on('click','.apply-competition',function () {
            toastAdd(2);
        });
        //二次确认弹窗点击确认
        $('body').on('click','.sure-window .submit-btn',function () {
            $.ajax({
                data:{},
                url:'',
                success:function () {
                    toastAdd(1,'成功报名')
                },
                fail:function () {
                    toastAdd(1,'报名失败请重试')
                }
            })
        });
        //点击上传图片触发input=file事件
        $('body').on('click','.pop-window .upload-name',function (e) {
            e.preventDefault();
            $(this).siblings('.img-file-input').click();
        });
        //点击上传后的图片触发input=file事件
        $('body').on('click','.pop-window .picture',function (e) {
            e.preventDefault();
            $(this).siblings('.img-file-input').click();
        });
        //图片按钮点击上传【原生】
        $('body').on('change','.img-file-input',function () {
            //判断浏览器是否支持FileReader接口
            if (typeof FileReader == 'undefined') {
                alert('当前浏览器不支持FileReader接口,请更换浏览器');
                return;
            }
            uploadFile(this,'img');
            $('.img-file-input').attr("type","txt");
        });
        //点击上传文件触发file-input时事件
        $('body').on('click','.pop-window .file-upload',function (e) {
            e.preventDefault();
            $(this).siblings('.file-input').click();
        });
        //文件按钮点击上传【原生】
        $('body').on('change','.file-input',function () {
            //判断浏览器是否支持FileReader接口
            if (typeof FileReader == 'undefined') {
                alert('当前浏览器不支持FileReader接口,请更换浏览器');
                return;
            }
            uploadFile(this,'file');
        });
        //点击提交报告弹出弹窗
        $('body').on('click','.submit-report',function () {
            reportShow(1);
            initEditor();
        });
        //点击查看报告弹出弹窗
        $('body').on('click','.look-report',function () {
            reportShow(2);
            initEditor();
        });
        //确认修改密码
        $('body').on('click','.amend-password-button',function () {
            //判断两次密码输入是否一致
            if($('.amend-password').val() == $('.amend-password-second').val()){
                //请求
                $.ajax({
                    data:{},
                    url:'',
                    success:function () {
                        toastAdd(1,'修改成功');
                    },
                    error:function () {
                        toastAdd(1,'网络失败请重试');
                    }
                })
            }else{
                toastAdd(1,'两次密码输入不一致，请重新输入');
            }
        })
    }
    // 初始化所有菜单项数据
    function initTable(type) {
        $('.right-content').empty();
        if(type == "allCompetition"){
            var data = {
                "rows": [
                    {
                        "itemid": "1",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年校园比赛',
                    },
                    {
                        "itemid": "2",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年校园比赛',
                    },
                    {
                        "itemid": "3",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年校园比赛',
                    },
                    {
                        "itemid": "4",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年校园比赛',
                    },
                    {
                        "itemid": "5",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年校园比赛',
                    },
                    {
                        "itemid": "6",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年校园比赛',
                    },
                    {
                        "itemid": "7",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年校园比赛',
                    },
                    {
                        "itemid": "8",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年校园比赛',
                    },
                ]
            };
            var headData =  {
                "itemid": "赛事编码",
                "startTime":'开始时间',
                "endTime":'结束时间',
                "name":'比赛名称',
                "operation":'操作'
            };
            var tableHead =
                '<tr class="table-body">'+
                '<td>'+headData.itemid+'</td>'+
                '<td>'+headData.startTime+'</td>'+
                '<td>'+headData.endTime+'</td>'+
                '<td>'+headData.name+'</td>'+
                '<td>'+headData.operation+'</td>'+
                '</tr>';
            var tableBody = '';
            for(var i = 0;i<data.rows.length;i++){
                tableBody +=
                    '<tr class="table-body">'+
                    '<td>'+data.rows[i].itemid+'</td>'+
                    '<td>'+data.rows[i].startTime+'</td>'+
                    '<td>'+data.rows[i].endTime+'</td>'+
                    '<td>'+data.rows[i].name+'</td>'+
                    '<td><span class="look-details">查看竞赛详情</span><span class="apply-competition">点我报名</span></td>'+
                    '</tr>';
            }
            var table = '<table class="table" id="table">'+tableHead+tableBody+'</table>';
            $('.right-content').append(table);
            //初始化分页
            pageAdd();
            new pageInit({
                totalCount : 200,//总页数
                currIndex : 0,//当前页，0为第一页
                pageSize : $('.pageSelect option:selected').val(),//每页数据量
                initCurrIndex : 0,//页面一进来的时候展示的页码，默认展示第一页,0为第一页
                nextCallback : function () {
                    //点击下一页的回调函数
                },
                lastCallback : function () {
                    //点击上一页的回调函数
                },
                selectCallback : function () {
                    //选择下拉框中页数的回调函数
                },
                pageCallback : function () {
                    //点击页码的回调函数和跳至几页的回调函数
                },
            })
        }
        else if(type == "myCompetitionDoing"){
            var data = {
                "rows": [
                    {
                        "itemid": "1",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'正在进行',
                    },
                    {
                        "itemid": "1",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'正在进行',
                    },
                    {
                        "itemid": "1",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'正在进行',
                    },
                    {
                        "itemid": "1",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'正在进行',
                    },
                    {
                        "itemid": "1",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'正在进行',
                    },
                    {
                        "itemid": "1",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'正在进行',
                    },
                ]
            };
            var headData =  {
                "itemid": "赛事编码",
                "startTime":'开始时间',
                "endTime":'结束时间',
                "name":'比赛名称',
                "operation":'操作'
            };
            var tableHead =
                '<tr class="table-body">'+
                '<td>'+headData.itemid+'</td>'+
                '<td>'+headData.startTime+'</td>'+
                '<td>'+headData.endTime+'</td>'+
                '<td>'+headData.name+'</td>'+
                '<td>'+headData.operation+'</td>'+
                '</tr>';
            var tableBody = '';
            for(var i = 0;i<data.rows.length;i++){
                tableBody +=
                    '<tr class="table-body">'+
                    '<td>'+data.rows[i].itemid+'</td>'+
                    '<td>'+data.rows[i].startTime+'</td>'+
                    '<td>'+data.rows[i].endTime+'</td>'+
                    '<td>'+data.rows[i].name+'</td>'+
                    '<td><span class="look-details">查看详情</span></td>'+
                    '</tr>';
            }
            var table = '<table class="table" id="table">'+tableHead+tableBody+'</table>';
            $('.right-content').append(table);
            //初始化分页
            pageAdd();
            new pageInit({
                totalCount : 200,//总页数
                currIndex : 0,//当前页，0为第一页
                pageSize : $('.pageSelect option:selected').val(),//每页数据量
                initCurrIndex : 0,//页面一进来的时候展示的页码，默认展示第一页,0为第一页
                nextCallback : function () {
                    //点击下一页的回调函数
                },
                lastCallback : function () {
                    //点击上一页的回调函数
                },
                selectCallback : function () {
                    //选择下拉框中页数的回调函数
                },
                pageCallback : function () {
                    //点击页码的回调函数和跳至几页的回调函数
                },
            })
        }
        else if(type == "myCompetitionDone"){
            var data = {
                "rows": [
                    {
                        "itemid": "1",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'已完成',
                    },
                    {
                        "itemid": "2",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'已完成',
                    },
                    {
                        "itemid": "3",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'已完成',
                    },
                    {
                        "itemid": "4",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'已完成',
                    },
                    {
                        "itemid": "5",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'已完成',
                    },
                ]
            };
            var headData =  {
                "itemid": "赛事编码",
                "startTime":'开始时间',
                "endTime":'结束时间',
                "name":'比赛名称',
                "operation":'操作'
            };
            var tableHead =
                '<tr class="table-body">'+
                '<td>'+headData.itemid+'</td>'+
                '<td>'+headData.startTime+'</td>'+
                '<td>'+headData.endTime+'</td>'+
                '<td>'+headData.name+'</td>'+
                '<td>'+headData.operation+'</td>'+
                '</tr>';
            var tableBody = '';
            for(var i = 0;i<data.rows.length;i++){
                tableBody +=
                    '<tr class="table-body">'+
                    '<td>'+data.rows[i].itemid+'</td>'+
                    '<td>'+data.rows[i].startTime+'</td>'+
                    '<td>'+data.rows[i].endTime+'</td>'+
                    '<td>'+data.rows[i].name+'</td>'+
                    '<td><span class="look-details">查看详情</span></td>'+
                    '</tr>';
            }
            var table = '<table class="table" id="table">'+tableHead+tableBody+'</table>';
            $('.right-content').append(table);
            //初始化分页
            pageAdd();
            new pageInit({
                totalCount : 200,//总页数
                currIndex : 0,//当前页，0为第一页
                pageSize : $('.pageSelect option:selected').val(),//每页数据量
                initCurrIndex : 0,//页面一进来的时候展示的页码，默认展示第一页,0为第一页
                nextCallback : function () {
                    //点击下一页的回调函数
                },
                lastCallback : function () {
                    //点击上一页的回调函数
                },
                selectCallback : function () {
                    //选择下拉框中页数的回调函数
                },
                pageCallback : function () {
                    //点击页码的回调函数和跳至几页的回调函数
                },
            })
        }
        else if(type == "myReportDone"){
            var data = {
                "rows": [
                    {
                        "itemid": "1",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年比赛',
                        "status":'已提交',
                    },
                    {
                        "itemid": "2",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年比赛',
                        "status":'已提交',
                    },
                    {
                        "itemid": "3",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年比赛',
                        "status":'已提交',
                    },
                    {
                        "itemid": "4",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年比赛',
                        "status":'已提交',
                    },
                    {
                        "itemid": "5",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017年比赛',
                        "status":'已提交',
                    },
                ]
            };
            var headData =  {
                "itemid": "赛事编码",
                "startTime":'开始时间',
                "endTime":'结束时间',
                "name":'比赛名称',
                "status":'状态',
                "operation":'操作',
            };
            var tableHead =
                '<tr class="table-body">'+
                '<td>'+headData.itemid+'</td>'+
                '<td>'+headData.startTime+'</td>'+
                '<td>'+headData.endTime+'</td>'+
                '<td>'+headData.name+'</td>'+
                '<td>'+headData.status+'</td>'+
                '<td>'+headData.operation+'</td>'+
                '</tr>';
            var tableBody = '';
            for(var i = 0;i<data.rows.length;i++){
                tableBody +=
                    '<tr class="table-body">'+
                    '<td>'+data.rows[i].itemid+'</td>'+
                    '<td>'+data.rows[i].startTime+'</td>'+
                    '<td>'+data.rows[i].endTime+'</td>'+
                    '<td>'+data.rows[i].name+'</td>'+
                    '<td>'+data.rows[i].status+'</td>'+
                    '<td><span class="look-details">查看竞赛详情</span><span class="look-report">查看我的报告</span></td>'+
                    '</tr>';
            }
            var table = '<table class="table" id="table">'+tableHead+tableBody+'</table>';
            $('.right-content').append(table);
            //初始化分页
            pageAdd();
            new pageInit({
                totalCount : 200,//总页数
                currIndex : 0,//当前页，0为第一页
                pageSize : $('.pageSelect option:selected').val(),//每页数据量
                initCurrIndex : 0,//页面一进来的时候展示的页码，默认展示第一页,0为第一页
                nextCallback : function () {
                    //点击下一页的回调函数
                },
                lastCallback : function () {
                    //点击上一页的回调函数
                },
                selectCallback : function () {
                    //选择下拉框中页数的回调函数
                },
                pageCallback : function () {
                    //点击页码的回调函数和跳至几页的回调函数
                },
            })
        }
        else if(type == "myReportWill"){
            var data = {
                "rows": [
                    {
                        "itemid": "1",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017比赛',
                        "status":'待提交',
                    },
                    {
                        "itemid": "2",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017比赛',
                        "status":'待提交',
                    },
                    {
                        "itemid": "3",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017比赛',
                        "status":'待提交',
                    },
                    {
                        "itemid": "4",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017比赛',
                        "status":'待提交',
                    },
                    {
                        "itemid": "5",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'2017比赛',
                        "status":'待提交',
                    },
                ]
            };
            var headData =  {
                "itemid": "赛事编码",
                "startTime":'开始时间',
                "endTime":'结束时间',
                "name":'比赛名称',
                "status":'状态',
                "operation":'操作',
            };
            var tableHead =
                '<tr class="table-body">'+
                '<td>'+headData.itemid+'</td>'+
                '<td>'+headData.startTime+'</td>'+
                '<td>'+headData.endTime+'</td>'+
                '<td>'+headData.name+'</td>'+
                '<td>'+headData.status+'</td>'+
                '<td>'+headData.operation+'</td>'+
                '</tr>';
            var tableBody = '';
            for(var i = 0;i<data.rows.length;i++){
                tableBody +=
                    '<tr class="table-body">'+
                    '<td>'+data.rows[i].itemid+'</td>'+
                    '<td>'+data.rows[i].startTime+'</td>'+
                    '<td>'+data.rows[i].endTime+'</td>'+
                    '<td>'+data.rows[i].name+'</td>'+
                    '<td>'+data.rows[i].status+'</td>'+
                    '<td><span class="look-details">查看竞赛详情</span><span class="submit-report">提交报告</span></td>'+
                    '</tr>';
            }
            var table = '<table class="table" id="table">'+tableHead+tableBody+'</table>';
            $('.right-content').append(table);
            //初始化分页
            pageAdd();
            new pageInit({
                totalCount : 200,//总页数
                currIndex : 0,//当前页，0为第一页
                pageSize : $('.pageSelect option:selected').val(),//每页数据量
                initCurrIndex : 0,//页面一进来的时候展示的页码，默认展示第一页,0为第一页
                nextCallback : function () {
                    //点击下一页的回调函数
                },
                lastCallback : function () {
                    //点击上一页的回调函数
                },
                selectCallback : function () {
                    //选择下拉框中页数的回调函数
                },
                pageCallback : function () {
                    //点击页码的回调函数和跳至几页的回调函数
                },
            })
        }
        else if(type == "myAward"){
            var data = {
                "rows": [
                    {
                        "itemid": "1",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'我的获奖',
                    },
                    {
                        "itemid": "2",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'我的获奖',
                    },
                    {
                        "itemid": "3",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'我的获奖',
                    },
                    {
                        "itemid": "4",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'我的获奖',
                    },
                    {
                        "itemid": "5",
                        "startTime":'2017-05-01',
                        "endTime":'2017-05-10',
                        "name":'我的获奖',
                    },
                ]
            };
            var headData =  {
                "itemid": "赛事编码",
                "startTime":'开始时间',
                "endTime":'结束时间',
                "name":'比赛名称',
                "operation":'操作'
            };
            var tableHead =
                '<tr class="table-body">'+
                '<td>'+headData.itemid+'</td>'+
                '<td>'+headData.startTime+'</td>'+
                '<td>'+headData.endTime+'</td>'+
                '<td>'+headData.name+'</td>'+
                '<td>'+headData.operation+'</td>'+
                '</tr>';
            var tableBody = '';
            for(var i = 0;i<data.rows.length;i++){
                tableBody +=
                    '<tr class="table-body">'+
                    '<td>'+data.rows[i].itemid+'</td>'+
                    '<td>'+data.rows[i].startTime+'</td>'+
                    '<td>'+data.rows[i].endTime+'</td>'+
                    '<td>'+data.rows[i].name+'</td>'+
                    '<td><span class="look-details">查看竞赛详情</span></td>'+
                    '</tr>';
            }
            var table = '<table class="table" id="table">'+tableHead+tableBody+'</table>';
            $('.right-content').append(table);
            //初始化分页
            pageAdd();
            new pageInit({
                totalCount : 200,//总页数
                currIndex : 0,//当前页，0为第一页
                pageSize : $('.pageSelect option:selected').val(),//每页数据量
                initCurrIndex : 0,//页面一进来的时候展示的页码，默认展示第一页,0为第一页
                nextCallback : function () {
                    //点击下一页的回调函数
                },
                lastCallback : function () {
                    //点击上一页的回调函数
                },
                selectCallback : function () {
                    //选择下拉框中页数的回调函数
                },
                pageCallback : function () {
                    //点击页码的回调函数和跳至几页的回调函数
                },
            })
        }
        else if(type == "myPersonalSituation"){
            var myPersonalSituation =
                '<ul class="personal-con">'+
                '<li class="personal-item">'+
                '<div class="personal-item-title">学校</div>'+
                '<div class="personal-item-content">哈尔滨理工大学</div>'+
                '</li>'+
                '<li class="personal-item">'+
                '<div class="personal-item-title">院系</div>'+
                '<div class="personal-item-content">软件学院-软件工程</div>'+
                '</li>'+
                '<li class="personal-item">'+
                '<div class="personal-item-title">班级</div>'+
                '<div class="personal-item-content">14-6班</div>'+
                '</li>'+
                '<li class="personal-item">'+
                '<div class="personal-item-title">学号</div>'+
                '<div class="personal-item-content">1414010620</div>'+
                '</li>'+
                '<li class="personal-item">'+
                '<div class="personal-item-title">姓名</div>'+
                '<div class="personal-item-content">王雨晴</div>'+
                '</li>'+
                '</ul>';
            $('.right-content').append(myPersonalSituation);
        }
        else if(type == "myPersonalPassword"){
            var myPersonalPassword =
                '<input type="password" class="amend-password" placeholder="请输入新密码">'+
                '<input type="password" class="amend-password-second" placeholder="请再次输入新密码">'+
                '<div class="amend-password-button">确认修改</div>';
            $('.right-content').append(myPersonalPassword);
        }
    }
    // 拼接分页
    function pageAdd(){
        var pageFooter =
            '<div class="pageFooter">'+
            '<div class="pageFooterCon">'+
            '<span class="totalCount">共<span id="pageCount"></span>条</span>'+
            '<span class="lastPage">&lt;</span>'+
            '<ul class="pageItemCon"></ul>'+
            '<span class="nextPage">&gt;</span>'+
            '<select name="" class="pageSelect">'+
            '<option value="10">10条/页</option>'+
            '<option value="20">20条/页</option>'+
            '<option value="30">30条/页</option>'+
            '</select>'+
            '<span class="skipPage">跳至<input type="text" class="pageInput">页</span>'+
            '</div>'+
            '</div>';
        $('.right-content').append(pageFooter);
    }
    // 详情弹窗
    function detailShow() {
        $('.fade').remove();
        var data = {
            title:'2017竞赛',
            content:'2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容2017年竞赛内容',
            competitionStarTime:'2017-05-01',
            competitionEndTime:'2017-05-03',
            applyStartTime:'2017-03-01',
            applyEndTime:'2017-03-02',
            gradeStartTime:'2017-06-01',
            gradeEndTime:'2017-06-03',
            worksEndTime:'2017-05-03',
        };
        var detailWindow =
            '<div class="fade competition-detail-window">'+
            '<div class="pop-window">'+
            '<div class="pop-window-head">'+
            '<div class="pop-window-wrapper">'+
            '<span class="pop-window-head-title">竞赛详情</span>'+
            '<span class="close-icon"></span>'+
            '</div>'+
            '</div>'+
            '<div class="pop-window-body">'+
            '<div class="pop-window-wrapper">'+
            '<div class="pop-window-item">'+
            '<div class="pop-window-item-title">'+
            '<i class="blue-circle"></i>'+
            '<span class="pop-window-body-name">题目</span>'+
            '</div>'+
            '<div class="pop-window-item-content">'+
            '<p class="pop-window-body-detail">'+data.title+'</p>'+
            '</div>'+
            '</div>'+
            '<div class="pop-window-item">'+
            '<div class="pop-window-item-title">'+
            '<i class="blue-circle"></i>'+
            '<span class="del-window-body-name">竞赛要求</span>'+
            '</div>'+
            '<div class="pop-window-item-content">'+
            '<p class="pop-window-body-detail">'+data.content+'</p>'+
            '</div>'+
            '</div>'+
            '<div class="pop-window-item">'+
            '<div class="pop-window-item-title">'+
            '<i class="blue-circle"></i>'+
            '<span class="pop-window-body-name">竞赛起止时间</span>'+
            '</div>'+
            '<div class="pop-window-item-content">'+
            '<p class="pop-window-body-detail">'+data.competitionStarTime+'至'+data.competitionEndTime+'</p>'+
            '</div>'+
            '</div>'+
            '<div class="pop-window-item">'+
            '<div class="pop-window-item-title">'+
            '<i class="blue-circle"></i>'+
            '<span class="pop-window-body-name">报名起止时间</span>'+
            '</div>'+
            '<div class="pop-window-item-content">'+
            '<p class="pop-window-body-detail">'+data.applyStartTime+'至'+data.applyEndTime+'</p>'+
            '</div>'+
            '</div>'+
            '<div class="pop-window-item">'+
            '<div class="pop-window-item-title">'+
            '<i class="blue-circle"></i>'+
            '<span class="pop-window-body-name">评分起止时间</span>'+
            '</div>'+
            '<div class="pop-window-item-content">'+
            '<p class="pop-window-body-detail">'+data.gradeStartTime+'至'+data.gradeEndTime+'</p>'+
            '</div>'+
            '</div>'+
            '<div class="pop-window-item">'+
            '<div class="pop-window-item-title">'+
            '<i class="blue-circle"></i>'+
            '<span class="pop-window-body-name">作品提交结束时间</span>'+
            '</div>'+
            '<div class="pop-window-item-content">'+
            '<p class="pop-window-body-detail">'+data.worksEndTime+'</p>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '<div class="pop-window-footer">'+
            '<span class="pop-window-footer-btn cancel-btn">关闭</span>'+
            '</div>'+
            '</div>'+
            '</div>';
        $('body').append(detailWindow);
    }
    // toast提示
    function toastAdd(type,text) {
        $('.fade').remove();
        if(type==1){
            var delay = {
                showIn: 1200, // 显示时间
                fadeOut: 500 // 渐隐动画时间
            };
            var $toast = '<div class="toast-tip">'+text+'</div>';
            $('body').append($toast);
            setTimeout(function() {
                $('.toast-tip').remove();
            }, delay.showIn);
        }
        else if(type==2){
            var toast =
                '<div class="fade sure-window">'+
                '<div class="pop-window">'+
                '<div class="pop-window-item">'+
                '<div class="sure-title">确定报名吗？</div>'+
                '</div>'+
                '<div class="pop-window-footer">'+
                '<span class="pop-window-footer-btn submit-btn">确定</span>'+
                '<span class="pop-window-footer-btn cancel-btn">取消</span>'+
                '</div>'+
                '</div>'+
                '</div>';
        }
        $('body').append(toast);
    }
    //选择图片,上传
    function uploadFile(obj,type) {
        var file = obj.files[0];
        var reader = new FileReader();
        //读取文件过程方法
        reader.onloadstart = function (e) {
            console.log("开始读取....");
        };
        reader.onprogress = function (e) {
            console.log("正在读取中....");
        };
        reader.onabort = function (e) {
            console.log("中断读取....");
        };
        reader.onerror = function (e) {
            console.log("读取异常....");
        };
        reader.onload = function (e) {
            console.log("成功读取....");
            successLoad(e,type);
        };
        reader.readAsDataURL(file);
    }
    //上传成功后的操作
    function successLoad(e,type){
        if(type == 'img'){
            $('.picture').attr("src", e.target.result).show();
            $('.upload-name').hide();
            $('.img-file-input').attr("type","file");
        }else if(type == 'file'){
            var file = document.getElementsByClassName('file-input')[0];
            $('.file-name').attr("href", e.target.result).text(file.files[0].name);
        }
    }
    // 报告功能【未提交报告1，已提交报告2】
    function reportShow(type) {
        if(type==1){
            var report =
                '<div class="fade look-report-window">' +
                '<div class="pop-window">' +
                '<div class="pop-window-head">' +
                '<div class="pop-window-wrapper">' +
                '<span class="pop-window-head-title">我的报告</span>' +
                '<span class="close-icon"></span>' +
                '</div>' +
                '</div>'+
                '<div class="pop-window-body">' +
                '<div class="pop-window-wrapper">' +
                '<div class="pop-window-item">' +
                '<div class="pop-window-item-title">'+
                '<i class="blue-circle"></i>'+
                '<span class="pop-window-body-name">报告内容</span>'+
                '</div>'+
                '<div class="pop-window-item-content">'+
                '<div id="editor"></div>'+
                '</div>'+
                '</div>'+
                '<div class="pop-window-item">'+
                '<div class="pop-window-item-title">'+
                '<i class="blue-circle"></i>'+
                '<span class="pop-window-body-name">报告图片</span>'+
                '</div>'+
                '<div class="pop-window-item-content">'+
                '<div class="picture-upLoad">'+
                '<input type="file" class="img-file-input">'+
                '<img class="picture"/>'+
                '<div class="upload-name">上传图片</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="pop-window-item">'+
                '<div class="pop-window-item-title">'+
                '<i class="blue-circle"></i>'+
                '<span class="pop-window-body-name">报告附件</span>'+
                '</div>'+
                '<div class="pop-window-item-content">'+
                '<input type="file" class="file-input">'+
                '<span class="file-upload">上传文件</span>'+
                '<a href="" class="file-name">未选择文件</a>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="pop-window-footer">'+
                '<span class="pop-window-footer-btn submit-btn">提交</span>'+
                '<span class="pop-window-footer-btn save-btn">保存</span>'+
                '<span class="pop-window-footer-btn cancel-btn">取消</span>'+
                '</div>'+
                '</div>'+
                '</div>';
            $('body').append(report);
        }
        else if(type==2){
            var report =
                '<div class="fade look-report-window">' +
                '<div class="pop-window">' +
                '<div class="pop-window-head">' +
                '<div class="pop-window-wrapper">' +
                '<span class="pop-window-head-title">我的报告</span>' +
                '<span class="close-icon"></span>' +
                '</div>' +
                '</div>'+
                '<div class="pop-window-body">' +
                '<div class="pop-window-wrapper">' +
                '<div class="pop-window-item">' +
                '<div class="pop-window-item-title">'+
                '<i class="blue-circle"></i>'+
                '<span class="pop-window-body-name">报告内容</span>'+
                '</div>'+
                '<div class="pop-window-item-content">'+
                '<div id="editor"></div>'+
                '</div>'+
                '</div>'+
                '<div class="pop-window-item">'+
                '<div class="pop-window-item-title">'+
                '<i class="blue-circle"></i>'+
                '<span class="pop-window-body-name">报告图片</span>'+
                '</div>'+
                '<div class="pop-window-item-content">'+
                '<div class="picture-upLoad">'+
                '<input type="file" class="img-file-input">'+
                '<img class="picture"/>'+
                '<div class="upload-name">上传图片</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="pop-window-item">'+
                '<div class="pop-window-item-title">'+
                '<i class="blue-circle"></i>'+
                '<span class="pop-window-body-name">报告附件</span>'+
                '</div>'+
                '<div class="pop-window-item-content">'+
                '<input type="file" class="file-input">'+
                '<span class="file-upload">上传文件</span>'+
                '<a href="" class="file-name">未选择文件</a>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '<div class="pop-window-footer">'+
                '<span class="pop-window-footer-btn cancel-btn">关闭</span>'+
                '</div>'+
                '</div>'+
                '</div>';
            $('body').append(report);
        }
    }
});
