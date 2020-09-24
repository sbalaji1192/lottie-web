var assetLoader = (function(){
	var assetCache = {};

	function formatResponse(xhr) {
		if(xhr.response && typeof xhr.response === 'object') {
			return xhr.response;
		} else if(xhr.response && typeof xhr.response === 'string') {
			return JSON.parse(xhr.response);
		} else if(xhr.responseText) {
			return JSON.parse(xhr.responseText);
		}
	}

	function loadAsset(path, callback, errorCallback) {
		if (assetCache[path]) {
			callback(assetCache[path]);
		}
		else {
			var response;
			var xhr = new XMLHttpRequest();
			xhr.open('GET', path, true);
			// set responseType after calling open or IE will break.
			xhr.responseType = "json";
			xhr.send();
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if(xhr.status == 200){
						response = formatResponse(xhr);
						assetCache[path] = response;
						callback(response);
					}else{
						try{
							response = formatResponse(xhr);
							assetCache[path] = response;
							callback(response);
						}catch(err){
							if(errorCallback) {
								errorCallback(err);
							}
						}
					}
				}
			};
		}
	}
	return {
		load: loadAsset
	}
}())
