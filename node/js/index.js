/**
 * Created by Administrator on 2017/7/5.
 */
$(function(){
/***************************/
    let lists=$('.con .left > ul > li > .list-more');
    let cons=$('.con .left > ul > li > ul');
    lists.each(function (index,val) {
        $(val).click(function(){
            let icon=$(val).attr('id');
            if(icon=='bottom'){
                $(val).html('&#xe62c;');
                $(val).attr('id','top');
            }else{
                $(val).html('&#xe6c7;');
                $(val).attr('id','bottom');
            }
            cons.eq(index).slideToggle();
        })
    });
/*********************************/
});