import Axios from './axios';
 

var SearchEngine = {
    Get: {

        Url:function (_pQuery, _pSelectProperties, _rowLimit, _sortExpression, _startrow) {
                    var _url = '';

                    _url =  "/_api/search/query?querytext='" + _pQuery + "'";
                    _startrow = _startrow || 0;

                    if (_pSelectProperties.constructor === Array && _pSelectProperties.length > 0) {
                        _url += "&selectproperties='" + _pSelectProperties.join() + "'";
                    }

                    if (_rowLimit === 0 || _rowLimit > 500)
                        _rowLimit = 500;

                    if (_sortExpression.length > 0)
                    _url += "&sortlist='" + _sortExpression + "'";

                    if (_startrow > 0)
                    _url += "&startrow=" + _startrow + "&rowsperpage=" + _rowLimit;

                    _url += "&rowlimit=" + _rowLimit + "&trimduplicates=false";
            
                    return _url;

        },
        executeQuery: function (_pQuery, _pSelectProperties, _rowLimit, _pSuccessCallback, _pFailureCallback, _sortExpression, _startrow) {
            /// <summary>Generic search function that receives a KQL command and uses asynchronous GET method to execute the query against the Sharepoint api.</summary>
            /// <param name="_pQuery" type="String">A KQL search string.</param>
            /// <param name="_pSelectProperties" type="String[]">Properties to be returned.</param>
            /// <param name="_rowLimit" type="Integer">Maximum number of rows to be returned. Limit: 500.</param>
            /// <param name="_pSuccessCallback" type="Function">A callback function to be called in case of success.</param>
            /// <param name="_pFailureCallback" type="Function">A callback function to be called in case of an error.</param>
            /// <param name="_sortExpression" type="String">A sort expression.</param>
            /// <param name="_startrow" type="String">Index row for paging.</param>
            /// <returns type="Object">The object containing the search results. RowsPerPAge = RowLimit</returns>



            const Results = {
                url: '',

                init: function () {
                    Results.url =  "/_api/search/query?querytext='" + _pQuery + "'";
                    _startrow = _startrow || 0;

                    if (_pSelectProperties.constructor === Array && _pSelectProperties.length > 0) {
                        Results.url += "&selectproperties='" + _pSelectProperties.join() + "'";
                    }

                    if (_rowLimit === 0 || _rowLimit > 500)
                        _rowLimit = 500;

                    if (_sortExpression.length > 0)
                        Results.url += "&sortlist='" + _sortExpression + "'";

                    if (_startrow > 0)
                        Results.url += "&startrow=" + _startrow + "&rowsperpage=" + _rowLimit;

                    Results.url += "&rowlimit=" + _rowLimit + "&trimduplicates=false";
                    //Results.url += "&ContentSource=\"Bradesco Portal Corporativo\"";

                },

                load: function () {
                    const data = {
                        'accept': "application/json;odata=verbose",
                        'Content-Type' : "application/json;odata=verbose" 
                      };
                    
                    var Querystring = require('querystring');
                    console.log(Results.url);
                      
                    Axios.get(Results.url, Querystring.stringify(data))
                            .then
                            (   
                                response =>{
                                    
                                    Results.onSuccess(response.data)
                                },
                                error => {
                                    console.log(error);
                                    Results.onError(error.data)
                                }
                            );
                },

                onSuccess: function (data) {

                    

                    try {
                        if (typeof data.PrimaryQueryResult !== "undefined" && data.PrimaryQueryResult !== null) {
                            var results = data.PrimaryQueryResult.RelevantResults.Table.Rows;
                            console.log(data);
                            console.log(results);

                            _pSuccessCallback(results, data.PrimaryQueryResult.RelevantResults.TotalRows);
                        }
                        else {
                            _pSuccessCallback([],0);
                        }
                    } catch (e) {
                        
                        _pFailureCallback(e.message);
                    }
                },

                onError: function (err) {
                    
                    console.log(err);
                    _pFailureCallback(err);
                }
            }

            Results.init();
            Results.load();

        },

        searchByContentType: function (_pQuery, _pContentType, _pSelectProperties, _rowLimit, _pSuccessCallback, _pFailureCallback, _sortExpression, _startrow) {
            /// <summary>Content type search function that receives a KQL command and uses asynchronous GET method to execute the query against the Sharepoint api.</summary>
            /// <param name="_pQuery" type="String">A KQL search string. Can be empty.</param>
            /// <param name="_pContentType" type="String">Content type name.</param>
            /// <param name="_pSelectProperties" type="String[]">Properties to be returned.</param>
            /// <param name="_rowLimit" type="Integer">Maximum number of rows to be returned. Limit: 500.</param>
            /// <param name="_pSuccessCallback" type="Function">A callback function to be called in case of success.</param>
            /// <param name="_pFailureCallback" type="Function">A callback function to be called in case of an error.</param>
            /// <param name="_sortExpression" type="String">A sort expression.</param>
            /// <param name="_startrow" type="String">Index row for paging.</param>

            /// <returns type="Object">The object containing the search results.</returns>
            var query = "ContentType:\"" + _pContentType + "\"";

            if (_pQuery !== "")
                query += " AND " + _pQuery;

            SearchEngine.Get.executeQuery(query, _pSelectProperties, _rowLimit, _pSuccessCallback, _pFailureCallback, _sortExpression, 0);
        },

        searchByTag: function (_pQuery, _pFieldTag, _pTags, _pSelectProperties, _rowLimit, _pSuccessCallback, _pFailureCallback, _sortExpression, _startrow) {
            /// <summary>Tag search function that receives a KQL command and uses asynchronous GET method to execute the query against the Sharepoint api.</summary>
            /// <param name="_pQuery" type="String">A KQL search string. Can be empty.</param>
            /// <param name="_pFieldTag" type="String">The name of the managed property that contains the tags.</param>
            /// <param name="_pTags" type="String[]">Tags to be found.</param>
            /// <param name="_pSelectProperties" type="String[]">Properties to be returned.</param>
            /// <param name="_rowLimit" type="Integer">Maximum number of rows to be returned. Limit: 500.</param>
            /// <param name="_pSuccessCallback" type="Function">A callback function to be called in case of success.</param>
            /// <param name="_pFailureCallback" type="Function">A callback function to be called in case of an error.</param>
            /// <param name="_sortExpression" type="String">A sort expression.</param>
            /// <param name="_startrow" type="String">Index row for paging.</param>

            /// <returns type="Object">The object containing the search results.</returns>
            var query = "";

            for (var i = 0; i < _pTags.length; i++) {
                if (i === 0)
                    query += "(" + _pFieldTag + ":\"" + _pTags[i] + "\"";
                else
                    query += " OR " + _pFieldTag + ":\"" + _pTags[i] + "\"";

                if (i === _pTags.length - 1)
                    query += ")";
            }

            if (_pQuery !== "")
                query += " AND " + _pQuery;

            SearchEngine.Get.executeQuery(query, _pSelectProperties, _rowLimit, _pSuccessCallback, _pFailureCallback, _sortExpression, _startrow);
        },

        searchByTagAndContentType: function (_pQuery, _pFieldTag, _pTags, _pContentType, _pSelectProperties, _rowLimit, _pSuccessCallback, _pFailureCallback, _sortExpression, _startrow) {
            /// <summary>Content type and tag search function that receives a KQL command and uses asynchronous GET method to execute the query against the Sharepoint api.</summary>
            /// <param name="_pQuery" type="String">A KQL search string. Can be empty.</param>
            /// <param name="_pFieldTag" type="String">The name of the managed property that contains the tags. Ex.: owstaxIdCategoria</param>
            /// <param name="_pTags" type="String[]">Tags to be found.</param>
            /// <param name="_pContentType" type="String">Content type name.</param>
            /// <param name="_pSelectProperties" type="String[]">Properties to be returned.</param>
            /// <param name="_rowLimit" type="Integer">Maximum number of rows to be returned. Limit: 500.</param>
            /// <param name="_pSuccessCallback" type="Function">A callback function to be called in case of success.</param>
            /// <param name="_pFailureCallback" type="Function">A callback function to be called in case of an error.</param>
            /// <param name="_sortExpression" type="String">A sort expression.</param>
            /// <param name="_startrow" type="String">Index row for paging.</param>

            /// <returns type="Object">The object containing the search results.</returns>
            var query = "ContentType:\"" + _pContentType + "\"";

            for (var i = 0; i < _pTags.length; i++) {
                if (i === 0)
                    query += " AND (" + _pFieldTag + ":\"" + _pTags[i] + "\"";
                else
                    query += " OR " + _pFieldTag + ":\"" + _pTags[i] + "\"";

                if (i === _pTags.length - 1)
                    query += ")";
            }

            if (_pQuery !== "")
                query += " AND " + _pQuery;

            SearchEngine.Get.executeQuery(query, _pSelectProperties, _rowLimit, _pSuccessCallback, _pFailureCallback, _sortExpression, _startrow);
        },

        executeQueryConectores: function (_pQuery, _pSelectProperties, _rowLimit, _pSuccessCallback, _pFailureCallback, _sortExpression, _startrow, _contentSource) {
            /// <summary>Generic search function that receives a KQL command and uses asynchronous GET method to execute the query against the Sharepoint api.</summary>
            /// <param name="_pQuery" type="String">A KQL search string.</param>
            /// <param name="_pSelectProperties" type="String[]">Properties to be returned.</param>
            /// <param name="_rowLimit" type="Integer">Maximum number of rows to be returned. Limit: 500.</param>
            /// <param name="_pSuccessCallback" type="Function">A callback function to be called in case of success.</param>
            /// <param name="_pFailureCallback" type="Function">A callback function to be called in case of an error.</param>
            /// <param name="_sortExpression" type="String">A sort expression.</param>
            /// <param name="_startrow" type="String">Index row for paging.</param>
            ///<param name="_contentSource" type="String">A name of Content Source</param>
            /// <returns type="Object">The object containing the search results. RowsPerPAge = RowLimit</returns>



            Results = {
                url: '',

                init: function () {
                    Results.url = BHS.Contantes.URL_ROOT + "/_api/search/query?querytext='" + _pQuery + "'";
                    _startrow = _startrow || 0;

                    if (_pSelectProperties.constructor === Array && _pSelectProperties.length > 0) {
                        Results.url += "&selectproperties='" + _pSelectProperties.join() + "'";
                    }

                    if (_rowLimit === 0 || _rowLimit > 500)
                        _rowLimit = 500;

                    if (_sortExpression.length > 0)
                        Results.url += "&sortlist='" + _sortExpression + "'";

                    if (_startrow > 0)
                        Results.url += "&startrow=" + _startrow + "&rowsperpage=" + _rowLimit;

                    Results.url += "&rowlimit=" + _rowLimit + "&trimduplicates=true";
                    Results.url += "&ContentSource=\"Conectores+Bradesco\"";

                },

                load: function () {
                    const data = {
                        'accept': "application/json;odata=verbose",
                        'Content-Type' : "application/json;odata=verbose",
                        'X-RequestDigest' : jQuery("#__REQUESTDIGEST").val() 
                      };
                    
                    Axios.get(Results.url, Querystring.stringify(data))
                            .then
                            (   
                                response =>{
                                    Results.onSuccess(response.data)
                                },
                                error => {
                                    Results.onError(response.data)
                                }
                            );
                },

                onSuccess: function (data) {
                    try {
                        if (typeof data.d.query.PrimaryQueryResult !== "undefined" && data.d.query.PrimaryQueryResult !== null) {
                            var results = data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
                            _pSuccessCallback(results, data.d.query.PrimaryQueryResult.RelevantResults.TotalRows);
                        }
                        else {
                            _pSuccessCallback([]);
                        }
                    } catch (e) {
                        
                        _pFailureCallback(e.message);
                    }
                },

                onError: function (err) {
                    
                    _pFailureCallback(err);
                }
            }

            Results.init();
            Results.load();

        },

    },
    Post: {

        executeQuery: function (_pQuery, _pSelectProperties, _rowLimit, _pSuccessCallback, _pFailureCallback, _sortExpression, _startrow) {
            /// <summary>Generic search function that receives a KQL command and uses asynchronous POST method to execute the query against the Sharepoint api.</summary>
            /// <param name="_pQuery" type="String">A KQL search string.</param>
            /// <param name="_pSelectProperties" type="String[]">Properties to be returned.</param>
            /// <param name="_rowLimit" type="Integer">Maximum number of rows to be returned. Limit: 500.</param>
            /// <param name="_pSuccessCallback" type="Function">A callback function to be called in case of success.</param>
            /// <param name="_pFailureCallback" type="Function">A callback function to be called in case of an error.</param> 
            /// <param name="_sortExpression" type="String">A sort expression.</param>
            /// <param name="_startrow" type="String">Index row for paging.</param> 
            /// <returns type="Object">The object containing the search results.</returns>

            Results = {
                url: '',
                query: "",

                init: function () {
                    Results.url = BHS.Contantes.URL_ROOT + "/_api/search/postquery";

                    if (_rowLimit === 0 || _rowLimit > 500)
                        _rowLimit = 500;

                    Results.query = "{ \"request\" : {";
                    Results.query += "\"Querytext\" : \"" + _pQuery + "\",";

                    Results.query += "\"RowLimit\" :" + _rowLimit + ",";

                    if (_sortExpression.length > 0)
                        Results.query += "\"SortList: \"'" + _sortExpression + "'";


                    Results.query += "\"StartRow\" :" + _startrow + ",";
                    Results.query += "\"RowsPerPage\" : " + _rowLimit + ",";


                    Results.query += "\"SelectProperties\" : {";
                    Results.query += "\"results\" : [";
                    Results.query += "'" + _pSelectProperties.join("','") + "'";
                    Results.query += "]";
                    Results.query += "},"


                    Results.query += "\"TrimDuplicates\" : \"False\",";
                    Results.query += "\"ContentSource\" : \"Bradesco Portal Corporativo\",";
                    Results.query += "\"QueryTemplatePropertiesUrl\" : \"spfile://webroot/queryparametertemplate.xml\"";
                    Results.query += "}}";

                },
                load: function () {

                    const data = {
                        'accept': "application/json;odata=verbose",
                        'Content-Type' : "application/json;odata=verbose",
                        'X-RequestDigest' : jQuery("#__REQUESTDIGEST").val() 
                      };
                    
                    Axios.get(Results.url, Querystring.stringify(data))
                            .then
                            (   
                                response =>{
                                    Results.onSuccess(response.data)
                                },
                                error => {
                                    Results.onError(response.data)
                                }
                            );
                },

                onSuccess: function (data) {
                    try {
                        if (typeof data.d.postquery.PrimaryQueryResult !== "undefined" && data.d.postquery.PrimaryQueryResult !== null) {
                            var results = data.d.postquery.PrimaryQueryResult.RelevantResults.Table.Rows.results;
                            _pSuccessCallback(results);
                        }
                        else {
                            _pSuccessCallback([]);
                        }
                    } catch (e) {
                        _pFailureCallback(e.message);
                    }
                },

                onError: function (err) {
                    _pFailureCallback(err);
                }
            }

            Results.init();
            Results.load();
        }
    }

}

export default SearchEngine;