$('#clfoot')
    .on('click', function(){
       $('#global_footer')
           .sidebar({
               overlay: false
           })
           .sidebar('toggle');
    });
