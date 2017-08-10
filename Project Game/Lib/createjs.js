
var p=1;
var ps=1;
var l=0;
var q=1;
var i=1.0;
var levelchoosen=1;
i=1.0;
    $('#showinstruction').hide();
   $('#exit').click(function(){
       if(ps==1){
            $('#showinstruction').show();
            ps=0;
        }else{
            $('#showinstruction').hide();
            ps=1;
        }
   });


    $('#showinstructions').hide();
    $('#playlevel').hide();

    $('#instructions').click(function(){
        if(p==1){
            $('#showinstructions').show();
            p=0;
        }else{
            $('#showinstructions').hide();
            p=1;
        }
    });
    
    $('#play').click(function(){
        if(q==1){
            $('#playlevel').show();
            q=0;
        }else{
            $('#playlevel').hide();
            q=1;
        }
    });
    
    $('#level1').click(function(){
        game(1);
//        $('#menu').css('display','none');
//        $('.maingame').css('display','block');
    });
    $('#level2').click(function(){
        game(2);
//        $('#menu').css('display','none');
//        $('.maingame').css('display','block');
    });
    $('#level3').click(function(){
        game(3);
//        $('#menu').css('display','none');
//        $('.maingame').css('display','block');
    });

    $('#yes').click(function(){
         var restart_div = $('#restart_div');
            l=1;
            restart_div.slideUp();
            game(levelchoosen);
            i=i+1;
        });
    $('#no').click(function(){
        var restart_div = $('#restart_div');
        restart_div.slideUp();
//        $('.maingame').css('display','none');
//        $('#menu').css('display','block');
        
    });




    
function game(level) {
    var anim_id;

    //saving dom objects to variables
    var container = $('#container');
    var car = $('#car');
    var car_1 = $('#car_1');
    var car_2 = $('#car_2');
    var car_3 = $('#car_3');
    var car_4 = $('#car_4');
    var line_1 = $('#line_1');
    var line_2 = $('#line_2');
    var line_3 = $('#line_3');
    var restart_div = $('#restart_div');
    var score = $('#score');
    var speedindex = $('#speed');
    var target_div=$('#target');
    

    //saving some initial setup
    var container_left = parseInt(container.css('left'));
    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var car_width = parseInt(car.width());
    var car_height = parseInt(car.height());

    var game_over = false; 
    var score_counter = 1;
    var speed=5.0;
    var line_speed = 7;
    var score_incrementor=10;
    var move_right = false;
    var move_left = false;
    var move_up = false;
    var move_down = false;
    var target=1500;
    //some other declarations
   
    start(level);
    function start(level){
        $('#car_1').css('top','-100px');
        $('#car_1').css('left','60%');
        $('#car_2').css('top','-200px');
        $('#car_2').css('left','40%');
        $('#car_3').css('top','-350px');
        $('#car_3').css('left','50%');
        $('#car_4').css('top','-450px');
        $('#car_4').css('left','10%');
        $('#car').css('bottom','8%');
        $('#car').css('left','60%');
        l=0;
        game_over = false;
        score.text(0);
        score_counter = 1;
//        console.log("A");
        move_right = false;
        move_left = false;
        move_up = false;
        move_down = false;
        
        if(level==1){
            speed = 5.0;
            line_speed = 7;
            score_incrementor=10;
            target=500;
        }else if(level==2){
            speed = 6.0;
            line_speed = 8;
            score_incrementor=9;
            target=1500;
        }else{
            speed = 7.0;
            line_speed = 9;
            score_incrementor=8;
            target=2500;
        }
        speedindex.text(speedindex);
        target_div.text(target);
        var x = document.getElementById("car_sound"); 
        x.play();
        x.loop=true;
        anim_id=requestAnimationFrame(repeat);
    }
    
    
//    CODE START
    
    
    
    // WHAT KEYS ARE DOING START
    $(document).on('keydown',function(e){
       if(game_over===false){
           var key=e.keyCode;
           if(key===37 && move_left === false){
               move_left=requestAnimationFrame(left);
           }else if(key==39 &&move_right==false){
               move_right=requestAnimationFrame(right);
           } else if(key==38 &&move_up==false){
               move_up=requestAnimationFrame(up);
           } else if(key==40 &&move_down==false){
               move_down=requestAnimationFrame(down);
           }else if(key==88){
               increase_speed();
           }else if(key==90){
               decrease_speed();
           }
       } 
    });
    
    $(document).on('keyup',function(e){
        if(game_over===false){
            var key=e.keyCode;
            if(key === 37){
                cancelAnimationFrame(move_left);
                move_left=false;
                return;
            }
        }
        
    });
    
    function left(){
        if(game_over === false && parseInt(car.css('left'))>5){
            car.css('left',parseInt(car.css('left'))-5.0/(i));
            move_left=requestAnimationFrame(left);
        }else return;
    }
    
    
    $(document).on('keyup',function(e){
        if(game_over===false){
            var key=e.keyCode;
            if(key === 39){
                cancelAnimationFrame(move_right);
                move_right=false;
                return;
            }
        }
        
    });
    
    function right(){
         if(game_over === false&& parseInt(car.css('left'))<container_width-car_width-5){
            car.css('left',parseFloat(car.css('left'))+(5.0/(i*1.0)));
            move_right=requestAnimationFrame(right);
        }else return;
    }
    
    
     $(document).on('keyup',function(e){
        if(game_over===false){
            var key=e.keyCode;
            if(key === 38){
                cancelAnimationFrame(move_up);
                move_up=false;
                return;
            }
        }
        
    });
    
    function up(){
        if(game_over === false  && parseInt(car.css('top'))>5){
            car.css('top',parseInt(car.css('top'))-5.0/(i));
            move_up=requestAnimationFrame(up);
        }else 
            return;
    }
    
    
     $(document).on('keyup',function(e){
        if(game_over===false){
            var key=e.keyCode;
            if(key === 40){
                cancelAnimationFrame(move_down);
                move_down=false;
                return;
            }
        }
        
    });
    
    function down(){
        if(game_over === false  && parseInt(car.css('top'))<container_height-car_height-5){
            car.css('top',parseFloat(car.css('top'))+(5.0/(i*1.0 -0.3)));
            move_down=requestAnimationFrame(down);
        }
    }
//     WHAT KEYS ARE DOIND ENDS
    
    //cars moving code start
    
    

    function repeat(){
        if(game_over===false){
//            console.log("s");
            if(collision(car,car_1)||collision(car,car_2)||collision(car,car_3)||collision(car,car_4)){
                stop_the_game();
                return;
            }
            if(target<= parseInt(score.text())){
                stop_the_game();
                return;
            }
            speedindex.text(speed*15);
            score_counter++;
            if(score_counter % score_incrementor==0){
                score.text(parseInt(score.text())+1);
                score_counter=1;
            }
            
            car_move(car_1);
            car_move(car_2);
            car_move(car_3);
            car_move(car_4);
            
            line_down(line_1);
            line_down(line_2);
            line_down(line_3);
            
            anim_id=requestAnimationFrame(repeat);
        }
    }
    
    function car_move(car){
        var current_top=parseInt(car.css('top'));
//        console.log("s:"+speed);
        if(current_top>container_height){
            current_top=-200;
            var car_newleft=parseInt(Math.random() *(container_width-car_width));
            car.css('left',car_newleft);
        }
        car.css('top',current_top+speed);
    }
    
    function line_down(line){
        var current_line=parseInt(line.css('top'));
        if(current_line>container_height){
            current_line=-300;
        }
        line.css('top',current_line+line_speed);
    }
    
    function increase_speed(){
        speed=speed+2;
        line_speed+=2;
        if(score_incrementor>2)
            score_incrementor-=2;
    }
    
    function decrease_speed(){
        if(speed>2){
            speed=speed-2;
            line_speed-=2;
            score_incrementor+=2;
        }
            
    }
    function stop_the_game(){
        var x = document.getElementById("car_sound"); 
        x.pause();
        game_over==true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        
        levelchoosen=level;
        if(target<= parseInt(score.text())){
            var restart_text = $('#restart_text');
            restart_text.text("You Won The Game. Do You Want To Start New Game ?");
        }else{
              var xx = document.getElementById("car_crash_sound"); 
            xx.play();
            var restart_text = $('#restart_text');
            restart_text.text("Do You Want To Start New Game ?");
        }
        restart_div.slideDown();
        game.stop();
        return;
    }
    
    
//    CODE ENDS
    
 function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
    
    
    
}

