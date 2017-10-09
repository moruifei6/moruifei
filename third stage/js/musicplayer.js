$(function(){
	var audio=document.getElementsByTagName("audio")[0];
	
			var playonoff=true;
			var volonoff=true;
			var level;
			var levelnow;
			
			var arrmusics=[["music/丑八怪 - 薛之谦.mp3","丑八怪"],["music/绅士 - 薛之谦.mp3","绅士"],["music/一半 - 薛之谦.mp3","一半"],["music/认真的雪 - 薛之谦.mp3","认真的雪"]];
			var $index=4;
			
			//选中播放音乐
			$(".bottom li").click(function(){
				changeMusicActive();
				$index=$(this).index();
				audio.src=arrmusics[$index][0];
				$("h1").text(arrmusics[$index][1]);
				musicStart();
			});
			
			//添加播放位置改变触发事件
			audio.addEventListener("timeupdate",function(){
				levelnow=audio.currentTime;	//此属性以秒计
				var levelmin=parseInt(levelnow/60)<10?"0"+parseInt(levelnow/60):parseInt(levelnow/60);
				var levelsec=parseInt(levelnow%60)<10?"0"+parseInt(levelnow%60):parseInt(levelnow%60);
				$("n.min1").text(levelmin);
				$("n.sec1").text(levelsec);
				var percent=audio.currentTime/audio.duration;
				$(".levelnow").css("width",300*percent);
				if(levelnow>=level){
					rotateClear();
					$index++;
					if($index>3)$index=0;
					audio.src=arrmusics[$index][0];
					$("h1").text(arrmusics[$index][1]);
					musicStart()
					changeMusicActive();
				}
			})
			//上一首
			$(".prev").click(function(){
				$index--;
				if($index<0)$index=3;
				audio.src=arrmusics[$index][0];
				$("h1").text(arrmusics[$index][1]);
				musicStart();
				changeMusicActive();
			});
			
			//播放暂停按钮
			$(".play2").click(function(){
				level=0;
				levelnow=0;
				musicTime();
				if(playonoff){
					audio.play();
					$(this).removeClass("icon-you-copy");
					$(this).addClass("icon-zantingjian");
					
					$(".bigbg").css("animation","active 3s linear infinite .5s");
					$(".button").css("transform","rotate(0deg)");
				}else{
					audio.pause();
					$(this).removeClass("icon-zantingjian");
					$(this).addClass("icon-you-copy");
					rotateClear();
				}
				playonoff=!playonoff;
			});
			
			//下一首
			$(".next").click(function(){
				$index++;
				if($index>3)$index=0;
				audio.src=arrmusics[$index][0];
				$("h1").text(arrmusics[$index][1]);
				musicStart();
				changeMusicActive();
			});
			
			//随机播放
			$(".icon-suijibofang").click(function(e){
				$index=Math.floor(Math.random()*4);
				audio.src=arrmusics[$index][0];
				$("h1").text(arrmusics[$index][1]);
				musicStart();
				changeMusicActive();
			});
			
			//加快进度
			$(".level").click(function(e){
				e=e || event;
				var levelmove=e.clientX-$(".level").offset().left;
				audio.currenTime=parseInt(levelmove/300*audio.duration);
			});
			
			//设置音量键
			audio.volume=0.5;
			var t=null;
			$(".icon-1yinpinbofangmin").mouseover(function(){
				$(".vol").show();
			});
			$(".icon-1yinpinbofangmin").mouseout(function(){
				t=setTimeout(function(e){
					$(".vol").hide();
				},1000);
			});
			var volpast;
			$(".icon-1yinpinbofangmin").click(function(){
				if(volonoff){
					volpast=$(".vol1").css("height");
					$(this).attr("class","iconfont icon-1");
					audio.volume=0;
					$(".vol1").css("height",0);
				}else{
					$(this).attr("class","iconfont icon-1yinpinbofangmin");
					audio.volume=parseInt(volpast)/100;
					$(".vol1").css("height",volpast);
				}
				volonoff=!volonoff;
			});
			$(".vol").mouseover(function(){
				clearInterval(t);
				$(this).show();
			}).mouseout(function(e){
				$(this).hide();
			});
			
			//声音大小控制
			$(".vol").click(function(e){
				e=e || event;
				var volHeight=$(".vol").offset().top+100-e.clientY;
				$(".vol1").css("height",volHeight);
				audio.volume=volHeight/100;
			});
			
			//重新播放
			$(".icon-chongxinbofangicon").click(function(){
				musicStart();
			});
			function changeMusicActive(){
				clearTimeout(timer);
				rotateClear();
				$(".play2").removeClass("icon-you-copy");
				$(".play2").addClass("icon-zantingjian");
				playonoff=false;
				
				var timer=setTimeout(function(){
					$(".bigbg").css("animation","active 3s linear infinite .5s");
					$(".button").css("transform","rotate(0deg)");
					musicTime();
				},500);
			}
			
			function musicStart(){
				audio.load();
				audio.play();
			}
			
			function rotateClear(){
				$(".bigbg").css("animation","");
				$(".button").css("transform","rotate(-21deg)");
			}
			
			function musicTime(){
				var time=null;
				level=audio.duration;
				$("n.min2").text(parseInt(level/60));
				$("n.sec2").text(parseInt(level%60));
			}
})
