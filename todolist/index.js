window.onload=function(){
	var submit=document.getElementById("submit");
	var text=document.getElementById("text");
	var active_list=document.getElementById("active_list");
	var over_list=document.getElementById("over_list");
	var active_num=document.getElementById("active_num");
	var over_num=document.getElementById("over_num");
	var show_write=document.getElementById("show_Write");
	var change_text=document.getElementById("change_text");
	var list_type=document.getElementsByClassName("list_type");
	var activeData=getData("active");
	if(!activeData){
		activeData=[];
	}
	var overData=getData("over");
	if(!overData){
		overData=[];
	}
	showList(activeData,active_list,"icon/win1.png",active_num);
	showList(overData,over_list,"icon/win2.png",over_num);
	submit.onclick=function(){
		if(text.value==""){
			alert("请输入内容,然后提交!");
		}else{
			activeData.push(text.value);
			saveData("active",activeData)
			showList(activeData,active_list,"icon/win1.png",active_num);
			text.value="";
		}
	}
	function showList(dataList,id,url,shownum){
		id.innerHTML="";
		if(dataList.length>=0){
			for(var i=0;i<dataList.length;i++){
				var list=document.createElement("li");
				list.className="active_li";
				id.appendChild(list);
				list.appendChild(creatElementa(url));
				var text=document.createElement("p");
				text.innerText=dataList[i];
				list.appendChild(text);
				if(url=="icon/win1.png"){
					list.appendChild(creatElementa("icon/write.png"));
				}
				list.appendChild(creatElementa("icon/remove.png"));
			}
			shownum.innerText=dataList.length;
		}
	}
	function creatElementa(url){
		var aox=document.createElement("a");
		var img=document.createElement("img");
		img.src=url;
		aox.appendChild(img);
		return aox;
	}
		
	for(var i=0;i<list_type.length;i++){
		list_type[i].setAttribute("index",i);
		list_type[i].getElementsByTagName("div")[0].onclick=function(e){
			for(var j=0;j<list_type.length;j++){
				if(this==list_type[j].getElementsByTagName("div")[0]){
					var everyUl=list_type[j].getElementsByTagName("ul");
					if(everyUl[0].style.display=="block"){
						everyUl[0].style.display="none";
					}else{
						everyUl[0].style.display="block";
					}
				}else{
					list_type[j].getElementsByTagName("ul")[0].style.display="none";
				}
			}
			var index=this.parentNode.getAttribute("index");
			if(index==0){
				list_type[index].onmouseover=function(){
					updata();
					write();
					remove(activeData,"active");
				}
			}else if(index==1){
				list_type[index].onmouseover=function(){
					remove(overData,"over");
				}
			}
		}
	}
	function remove(data,type){
		var active_lis=document.getElementsByClassName("active_li");
		for(var i=0;i<active_lis.length;i++){
			active_lis[i].setAttribute("index",i);
			var num=1;
			if(type=="active"){
				num=2;
			}else{
				num=1;
			}
			active_lis[i].getElementsByTagName("a")[num].onclick=function(){
				var index=this.parentNode.getAttribute("index");
				data.splice(index,1);
				saveData(type,data)
				if(type=="active"){
					showList(activeData,active_list,"icon/win1.png",active_num);
				}else if(type=="over"){
					showList(overData,over_list,"icon/win2.png",over_num);
				}
			}
		}
	}
	function write(){
		var active_lis=document.getElementsByClassName("active_li");
			for(var i=0;i<active_lis.length;i++){
				active_lis[i].setAttribute("index",i);
				active_lis[i].getElementsByTagName("a")[1].onclick=function(){
					show_write.style.display="block";
					var index=this.parentNode.getAttribute("index");
					change_text.value=activeData[index];
					console.log(show_write.getElementsByTagName("input")[0])
					show_write.getElementsByTagName("input")[0].onclick=function(){
						activeData[index]=change_text.value;
						saveData("active",activeData);
						show_write.style.display="none";
						showList(activeData,active_list,"icon/win1.png",active_num);
					}
					show_write.getElementsByTagName("input")[1].onclick=function(){
						show_write.style.display="none";
					}

				}
			}
	}
	function updata(){
		var active_lis=document.getElementsByClassName("active_li");
		for(var i=0;i<active_lis.length;i++){
			active_lis[i].setAttribute("index",i);
			active_lis[i].getElementsByTagName("a")[0].onclick=function(){
				var index=this.parentNode.getAttribute("index");

				overData.push(activeData[index]);
				activeData.splice(index,1);
				saveData("active",activeData);
				saveData("over",overData);
				showList(activeData,active_list,"icon/win1.png",active_num);
				showList(overData,over_list,"icon/win2.png",over_num);
				
			}
		}
	}
	function saveData(type,data){
		window.localStorage.setItem(type,JSON.stringify(data));
	}
	function getData(type){
		return JSON.parse(localStorage.getItem(type));
	}

}