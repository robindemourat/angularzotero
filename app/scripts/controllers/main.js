'use strict';

/**
 * @ngdoc function
 * @name zoteroaccessApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zoteroaccessApp
 */
angular.module('zoteroaccessApp')
  .controller('MainCtrl', function ($scope, $http, $timeout,  ZoteroQueryHandler, ZoteroQueryBuilder) {

  	var userId = 1142649,//your base user ID here - here is mine
  	    apiKey = 'Your API Key',//paste your API key here - howto : https://www.zotero.org/settings/keys > create new private key
  	    query = ZoteroQueryBuilder;


  	var initScopeVariables = function(){
  		$scope.myItems = [];
  		$scope.myCollections = [];
  		$scope.myTags = [];
  	};

  	initScopeVariables();


  	var addItems = function(d){
  		$scope.myItems = $scope.myItems.concat(d);
  	};

  	var addTags = function(d){
  		$scope.myTags = $scope.myTags.concat(d);
  	};

  	var addCollections = function(d){
  		$scope.myCollections = $scope.myCollections.concat(d);
  	};

  	var feedExample = function(){
  		//init query object
  		query
  			.init(apiKey, userId);

  		ZoteroQueryHandler.getItems(query.get(), addItems);
  		ZoteroQueryHandler.getTags(query.get(), addTags);
  		ZoteroQueryHandler.getCollections(query.get(), addCollections);

      //example = how to override the 100 items limit by performing several queries to API (limit = not clearly specified, seems to be around 60/minute)
  		/*for(var i = 0 ; i < 60 ; i++){
  			query.start(i*100);
			ZoteroQueryHandler.getItems(query.get(), addItems);
	  	};*/
  	};
  	feedExample();

  });
