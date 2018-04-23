/**
 * Created by wangyuqing6 on 2018/4/23.
 */
$(function () {
    $('.login-btn').on('click',function () {
        var data = {
            username:$('.login-input.user-name').val(),
            password:$('.login-input.user-password').val(),
        };
        if(data.username==''){
            toastAdd('请输入用户名');
            return
        }
        if(data.password==''){
            toastAdd('请输入密码');
            return
        }
        $.ajax({
            data:data,
            url:'',
            success:function (res) {
                if(res.code == 0){
                    // 跳转管理员页面
                    // window.location.href = '网址'
                }else if(res.code == 1){
                    // 跳转学生页面
                }else if(res.code == 2){
                    // 跳转教师页面
                }else if(res.code == 3){
                    toastAdd('密码错误请重试')
                }
            },
            error:function () {
                toastAdd('网络错误请重试')
            }
        })
    })
    // toast提示
    function toastAdd(text) {
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
});