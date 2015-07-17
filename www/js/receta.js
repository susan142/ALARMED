var RECETA=(function () {
    var my = {};
    ////////////
    
    my.cargarReceta=function(idReceta){
        var param={};
        param.id=idReceta;
        
        $.ajax({
            type:"POST",
            url:"http://192.168.56.1:9095/getMostrarReceta",
            data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                console.log(data);
              
            },
            error:function(data){
            
                console.log("ERROR:"+data);
            }
        });
    
    };//////////////////////////////////////////////////////////////////////////////////
    
    //////////
    return my;
}());