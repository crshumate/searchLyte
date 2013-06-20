/*--Created by Chris Shumate - http://chris-shumate.com
 Copyright 2013, Chris Shumate
 Free to use under the MIT license.
 http://www.opensource.org/licenses/mit-license.php

--*/

(function($) {
    $.fn.searchLyte = function(options) {
        var defaults = {
                searchList:'#list',
                resultBox:'#searchLyte',
				ajax:false,
				scrollSpeed:300,
				autoComplete: 'off'
            },
            settings = $.extend({}, defaults, options);


		return this.each(function(){
			var resultBox = $(settings.resultBox);
			var resultList = jQuery('<ul />');
			resultBox.append(resultList);
    		var arr=$(settings.searchList).text();
		    var searchTerms = arr.split(";");
			var searchBox = $(this); 
			searchBox.attr('autoComplete', settings.autoComplete);   
			var userInput;


		    searchBox.keyup(function(e){
		        var currentVal=$(this).val().toLowerCase();
		        var results = resultList.find("li.result").length;
		       	var slHeight = resultList.height();
		        var rbHeight = resultBox.height();
		        if(((e.keyCode==38 || e.keyCode==40) && results > 0) || e.keyCode==13 && results > 0){
		         	resultLogic(e, slHeight, rbHeight)	
   
		         }else if(currentVal.match(/[A-z0-9\-\s]+/g)){
		            userInput = currentVal;
		            resultBox.fadeIn(500);
		            resultList.html("<li class='nomatch'>No match found.</li>");

		            for(var i in searchTerms){
			            var searchString = searchTerms[i];
			 			searchString = $.trim(searchString);
						var keyVal = searchString.split("::");
						var href = keyVal[1];
						var title=keyVal[0]
						var searchArr = $.trim(title).split(" ");
						
						for (var j in searchArr){
							if($('li.nomatch').length > 0) $("li.nomatch").remove();
		                	var searchTerm = searchArr[j].toLowerCase();
							var keyLength = currentVal.length;
							var searchTermSlice = searchTerm.slice(0,keyLength);
		                
						
							if(currentVal==searchTermSlice){
			                    var link = $('<a />').text(title).attr('href', href);
								var li  = $('<li />').addClass('result').append(link);
			                    resultList.append(li);
								break;
										
			                }
					}

		            }

				}else{
		            resultBox.fadeOut(500);
		            resultList.empty();

		        }
		    });


		    //Fade out on blur...
		    searchBox.blur(function(e){
		       if(!resultBox.hasClass('hovered')){
                   resultBox.fadeOut(500);
               }

            });
            resultBox.hover(function(){
               $(this).addClass('hovered');
            }, function(){
				if($(this).hasClass('hovered')){
                   resultBox.fadeOut(500).removeClass('hovered');
                }
	
			});
			
 			//fade in on focus...
		    searchBox.bind('focus click',function(){
		        if(resultList.find('li').length >0){
		 			resultBox.fadeIn(500);
		        }
            });

		function resultLogic(e, slHeight, rbHeight){
            var scrollPos;
            var activeElement =  resultList.find('li.active');
            var liHeight = activeElement.innerHeight();
		    var activeIdx = resultList.find('li').index(activeElement);
            var allResults = resultList.find('li');
            var nextLi = activeIdx+1;
			var prevLi =  activeIdx-1;
			var totalLi= resultList.find('li').length;
			var lastLi = totalLi-1;
			if(!settings.offset){
			 var offset = rbHeight-liHeight;	
			}
           

			if (e.keyCode == 38) {
              if(activeIdx!=-1){
				  if(activeIdx==0){
                        activeElement.removeClass('active');
						searchBox.val(userInput)

				}else{
                        activeElement.removeClass('active');
                        allResults.eq(prevLi).addClass('active');
                        searchBox.val(resultList.find('li.active a').text());

                      scrollPos = resultList.find('li.active').position();
                      if(typeof(scrollPos)=='object'){
                          if(scrollPos.top <= liHeight){
                              resultBox.animate({scrollTop: '-='+offset}, settings.scrollSpeed);
                          }
                      }
					}
			
				}else if(activeIdx==-1){
					activeElement.removeClass('active');
                    allResults.eq(lastLi).addClass('active');
					searchBox.val(activeElement.find("a").text());

                  scrollPos = resultList.find('li.active').position();
                  if(typeof(scrollPos)=='object'){
                     resultBox.animate({scrollTop: slHeight}, settings.scrollSpeed)
                  }
				}
          
			    }else if (e.keyCode == 40) {
				    if(activeIdx==-1){
                        allResults.eq(0).addClass('active');
                        searchBox.val(resultList.find('li.active a').text());
						}else{
                              allResults.eq(activeIdx).removeClass('active');
                              allResults.eq((nextLi)).addClass('active');
                              searchBox.val(resultList.find('li.active a').text());


                        scrollPos = resultList.find('li.active').position();
                        if(typeof(scrollPos)=='object'){
                            if(scrollPos.top >= offset){
                                resultBox.animate({scrollTop: '+='+offset}, settings.scrollSpeed);
                            }
                        }



                        if(nextLi == totalLi){
							searchBox.val(userInput);
                            resultBox.animate({scrollTop: -slHeight}, settings.scrollSpeed);
							}
				
						}   

				    }else if(e.keyCode==13){
                        if(activeElement.length > 0){
                            window.location= activeElement.find('a').attr('href');
                        }

				    }
			}

	 });
	}
})(jQuery);
	

