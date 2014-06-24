$(function () {
	var $fu = $('#fileupload'),
	$btn = $("#process-btn"),
	$table = $("#upload-table"),
	$tableHeader = $("#table-header"),
	$form = $("#download-form"),
	$formxml = $("#form-xmlstr"),
	$formsub = $('#form-submit'),
	$errorList = $('#error-list'),
	$errorAlert = $('#error-alert'),
	$dlAnyway = $('#download-anyway')

	$fu.fileupload({
		autoUpload: false,
		add: function (e, data) {						
			if(!/(\.xml)$/.test(data.files[0].name)){
				console.log('invalid file', data.files[0].name);
				return
			}
			var $item = $("<tr class=" + data.files[0].name + "><td>" + data.files[0].name + "</td><td><input class=\"process-chbx\" type=\"checkbox\" checked/></td></tr>");
			$tableHeader[0].style.display = "table-row";
			$btn[0].style.display = 'block';
			$item.data('upload', data.files[0])
			$item.click(function(){ console.log( $(this).data('upload') )})
			$table.append($item);
		}
	});

	$btn.click(function(){
		var filelist = [];
		$errorAlert.hide();
		$errorList.html("");
		$dlAnyway.hide()

		$table.find('tr').each(function(){
			if( $(this).find('.process-chbx').is(':checked') ){
				var updata = $(this).data('upload');
				filelist.push(updata);
			} else {
				console.log('dont use this: ', $(this).data('upload'))
			}
		})

		$fu.fileupload({
			done: function(e, data){
				var res = JSON.parse(data.result);
				if(res.errors.length){
					for(var el in res.errors){
						$errorAlert.show();
						$errorList.append("<li>" + res.errors[el] + "</li>");
					}

					if(res.recipeCount){
						$dlAnyway.show();
						$formxml.val(res.response);
					}
				} else {
					$formxml.val(res.response);
					$form.submit();	
				}
			},
			progress: function(e, data) {
				console.log('progress', e, data);
			},
			fail: function(e, data) {
				$errorAlert.show();
				$errorList.append("<li>We encountered a server error!</li>");
			}
		});

		$fu.fileupload('send', {files: filelist} );
	});

	$dlAnyway.click(function(){
		$form.submit();	
	})
});