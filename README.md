# JShare
JQuery Plugin for Social Media share buttons

in your javascript:
```
  $( document ).ready(function(){
	$(".social_icons").JShare({
		message:"The message or title i want added to my share"
	});
  });
```
Then in the body of your page add:
```
  <div class="social_icons">
		<a data-share="facebook">facebook</a>
		<a data-share="twitter">twitter</a>
		<a data-share="email">email</a>
   </div>
```
