'use strict';

/**
 * @ngdoc service
 * @name zoteroaccessApp.ZoteroQueryHandler
 * @description
 * # ZoteroQuery
 * Factory in the zoteroaccessApp.
 */
angular.module('zoteroaccessApp')
  .factory('ZoteroQueryHandler', function ($http, $log) {

  	var factory = {};

  	var base = "https://api.zotero.org/";


  	var getResults = function(query, callback){
  		$log.info("sending request for ",query);
  		$http
  			.get(query)
  			.success(function(d){
  				return callback(d);
  			})
  			.error(function(e){
  				$log.error('HTTP error :', e);
  			});
  	};

  	var buildFinalQuery = function(query, key, options){
  		var outOptions = '?key='+key;
  		if(options){
  			for(var i in options){
  				outOptions+= '&' + i + '='+options[i];
  			}
  		}
  		return (base + query + outOptions);
  	};

  	//security check of mandatory params
  	var getAndEvalParams = function(params){
  		if(!angular.isDefined(params)){
  			$log.error('you must specify a param object property in your request containing at least an entityId and an entityType');
  			return;
  		}
  		if(!angular.isDefined(params.entityId)){
  			$log.error('You must specify an entityId(user or group Id) to be able to do a query');
  			return;
  		}
  		if(!angular.isDefined(params.entityType)){
  			$log.alert('You must specify an entityType("user" or "group") to be able to do a query, I have set "user" as default');
  			params.entityType = 'user';
  		}
  		if(!angular.isDefined(params.key)){
  			$log.error('You must specify an API key to be able to do a query (see https://www.zotero.org/support/dev/web_api/v3/basics)');
  			return;
  		}
  		return params;
  	};
  	var buildQuery = function(params, queryType, querySpecifier, additionalKey){
  		var options = (params.options)?params.options:{},
			params = getAndEvalParams(params.params);

  		if(!angular.isDefined(params)){
  			$log.log("couldn't perform getItems API request because specified mandatory params are not valid");
  			return undefined;
  		}
  		var queryParams = params.entityType + 's/'+params.entityId + '/' + queryType;
  		if(additionalKey)
  			queryParams += '/' + additionnalKey;
  		if(querySpecifier)
  			queryParams += '/'+querySpecifier;

  		return buildFinalQuery(queryParams, params.key, options);
  	}

  	//CALLABLE FUNCTIONS
  	factory.getItems = function(params, callback){
  		var query = buildQuery(params, 'items');
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getTopItems = function(params, callback){
  		var query = buildQuery(params, 'items', 'top');
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getTrashedItems = function(params, callback){
  		var query = buildQuery(params, 'items', 'trash');
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getSpecificItem = function(params, key, callback){
  		var query = buildQuery(params, 'items', undefined, key);
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getItemChildren = function(params, key, callback){
  		var query = buildQuery(params, 'items', 'children', key);
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getItemTags = function(params, key, callback){
  		var query = buildQuery(params, 'items', 'tags', key);
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getTags = function(params, callback){
  		var query = buildQuery(params, 'tags');
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.searchTags = function(params, query, callback){
  		var query = buildQuery(params, encodeURIComponent(query), 'tags');
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getCollections = function(params, callback){
  		var query = buildQuery(params, 'collections');
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getTopCollections = function(params, callback){
  		var query = buildQuery(params, 'collections', 'top');
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getSpecificCollection = function(params, key, callback){
  		var query = buildQuery(params, 'collections', undefined, key);
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getCollectionChildrenCollections = function(params, key, callback){
  		var query = buildQuery(params, 'collections', 'collections', key);
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getCollectionItems = function(params, key, callback){
  		var query = buildQuery(params, 'collections', 'items', key);
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getCollectionTags = function(params, key, callback){
  		var query = buildQuery(params, 'collections', 'tags', key);
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getSearches = function(params, callback){
  		var query = buildQuery(params, 'searches');
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	factory.getSpecificSearch = function(params, key, callback){
  		var query = buildQuery(params, 'searches', undefined, key);
  		getResults(query, function(d){
  			return callback(d);
  		});
  	};

  	return factory;
  });
