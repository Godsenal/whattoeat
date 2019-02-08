/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5fb8a14433c137bee5a8";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/App.scss":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/App.scss ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Imports
exports.push([module.i, "@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);", ""]);
exports.push([module.i, "@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);", ""]);
exports.push([module.i, "@import url(http://fonts.googleapis.com/earlyaccess/hanna.css);", ""]);
exports.push([module.i, "@import url(http://fonts.googleapis.com/earlyaccess/jejugothic.css);", ""]);

// Module
exports.push([module.i, "/* Flex Sass */\n/*Flex Sass*/\nbody {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  overflow-x: hidden;\n  font-size: 90%; }\n\nbody, span, div, a, h1 {\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\nbody, button, input, select, textarea {\n  line-height: 1.5;\n  font-family: 'Ubuntu', 'Nanum Gothic', sans-serif;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n.mainContainer {\n  width: 100%;\n  height: 100vh;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  box-sizing: border-box; }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/flex.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/App.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/centerer.scss"],"names":[],"mappings":"AAAA,cAAA;AA8JA,YAAA;AChJA;EACE,WAAW;EACX,YAAY;EACZ,SAAS;EACT,kBAAkB;EAClB,cAAc,EAAA;;AAGhB;EACE,kCAAkC;EAClC,mCAAmC;EACnC,kCAAkC,EAAA;;AAGpC;EACE,gBAAgB;EAChB,iDAAiD;EACjD,kCAAkC;EAClC,mCAAmC;EACnC,kCAAkC,EAAA;;AAEpC;EACE,WAAW;EACX,aAAa;EDnCb,oBAAoB;EACpB,iBAAiB;EACjB,oBAAoB;EACpB,qBAAqB;EACrB,aAAa;EE6BX,uBAAuB;EACvB,sBAAsB;EDGxB,sBAAsB,EAAA","file":"App.scss","sourcesContent":["/* Flex Sass */\r\n@mixin flexbox() {\r\n  display: -webkit-box;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n\r\n// The 'flex' shorthand\r\n// - applies to: flex items\r\n// <positive-number>, initial, auto, or none\r\n@mixin flex($values) {\r\n  -webkit-box-flex: $values;\r\n     -moz-box-flex: $values;\r\n      -webkit-flex: $values;\r\n  \t  -ms-flex: $values;\r\n  \t      flex: $values;\r\n}\r\n\r\n// Flex Flow Direction\r\n// - applies to: flex containers\r\n// row | row-reverse | column | column-reverse\r\n@mixin flex-direction($direction) {\r\n  -webkit-flex-direction: $direction;\r\n     -moz-flex-direction: $direction;\r\n      -ms-flex-direction: $direction;\r\n          flex-direction: $direction;\r\n}\r\n\r\n// Flex Line Wrapping\r\n// - applies to: flex containers\r\n// nowrap | wrap | wrap-reverse\r\n@mixin flex-wrap($wrap) {\r\n  -webkit-flex-wrap: $wrap;\r\n     -moz-flex-wrap: $wrap;\r\n      -ms-flex-wrap: $wrap;\r\n          flex-wrap: $wrap;\r\n}\r\n\r\n// Flex Direction and Wrap\r\n// - applies to: flex containers\r\n// <flex-direction> || <flex-wrap>\r\n@mixin flex-flow($flow) {\r\n  -webkit-flex-flow: $flow;\r\n     -moz-flex-flow: $flow;\r\n      -ms-flex-flow: $flow;\r\n          flex-flow: $flow;\r\n}\r\n\r\n// Display Order\r\n// - applies to: flex items\r\n// <integer>\r\n@mixin order($val) {\r\n  -webkit-box-ordinal-group: $val;\r\n     -moz-box-ordinal-group: $val;\r\n  \t     -ms-flex-order: $val;\r\n  \t      -webkit-order: $val;\r\n  \t\t      order: $val;\r\n}\r\n\r\n// Flex grow factor\r\n// - applies to: flex items\r\n// <number>\r\n@mixin flex-grow($grow) {\r\n  -webkit-flex-grow: $grow;\r\n     -moz-flex-grow: $grow;\r\n      -ms-flex-grow: $grow;\r\n          flex-grow: $grow;\r\n}\r\n\r\n// Flex shrink\r\n// - applies to: flex item shrink factor\r\n// <number>\r\n@mixin flex-shrink($shrink) {\r\n  -webkit-flex-shrink: $shrink;\r\n     -moz-flex-shrink: $shrink;\r\n      -ms-flex-shrink: $shrink;\r\n          flex-shrink: $shrink;\r\n}\r\n\r\n// Flex basis\r\n// - the initial main size of the flex item\r\n// - applies to: flex itemsnitial main size of the flex item\r\n// <width>\r\n@mixin flex-basis($width) {\r\n  -webkit-flex-basis: $width;\r\n     -moz-flex-basis: $width;\r\n      -ms-flex-basis: $width;\r\n          flex-basis: $width;\r\n}\r\n\r\n// Axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | space-between | space-around\r\n@mixin justify-content($justify) {\r\n  -webkit-justify-content: $justify;\r\n     -moz-justify-content: $justify;\r\n      -ms-justify-content: $justify;\r\n          justify-content: $justify;\r\n            -ms-flex-pack: $justify;\r\n}\r\n\r\n// Packing Flex Lines\r\n// - applies to: multi-line flex containers\r\n// flex-start | flex-end | center | space-between | space-around | stretch\r\n@mixin align-content($align) {\r\n  -webkit-align-content: $align;\r\n     -moz-align-content: $align;\r\n      -ms-align-content: $align;\r\n          align-content: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | baseline | stretch\r\n@mixin align-items($align) {\r\n  -webkit-align-items: $align;\r\n     -moz-align-items: $align;\r\n      -ms-align-items: $align;\r\n          align-items: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex items\r\n// auto | flex-start | flex-end | center | baseline | stretch\r\n@mixin align-self($align) {\r\n  -webkit-align-self: $align;\r\n     -moz-align-self: $align;\r\n      -ms-align-self: $align;\r\n          align-self: $align;\r\n}\r\n\r\n@mixin flex-1-1{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-0-1{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-1-0{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(0);\r\n}\r\n\r\n@mixin flex-0-0{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(0);\r\n}\r\n/*Flex Sass*/","@import url(//fonts.googleapis.com/earlyaccess/nanumgothic.css);\r\n//Nanum Gothic\r\n@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);\r\n//Noto Sans KR\r\n@import url(http://fonts.googleapis.com/earlyaccess/hanna.css);\r\n//Hanna\r\n@import url(http://fonts.googleapis.com/earlyaccess/jejugothic.css);\r\n//Jeju Gothic\r\n\r\n@import './util/centerer.scss';\r\n@import './util/color.scss';\r\n@import './util/boxshadow.scss';\r\n@import './util/button.scss';\r\n\r\nbody {\r\n  width: 100%;\r\n  height: 100%;\r\n  margin: 0;\r\n  overflow-x: hidden;\r\n  font-size: 90%;\r\n}\r\n\r\nbody, span, div, a, h1 {\r\n  text-rendering: optimizeLegibility;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\nbody, button, input, select, textarea {\r\n  line-height: 1.5;\r\n  font-family: 'Ubuntu', 'Nanum Gothic', sans-serif;\r\n  text-rendering: optimizeLegibility;\r\n  -webkit-font-smoothing: antialiased;\r\n  -moz-osx-font-smoothing: grayscale;\r\n}\r\n.mainContainer{\r\n  width: 100%;\r\n  height: 100vh;\r\n  @include centererFlex;\r\n  box-sizing: border-box;\r\n}\r\n\r\n","@import './flex.scss';\r\n@mixin centerer($width: 50%, $height: 50%, $horizontal: true, $vertical: true) {\r\n  position: absolute;\r\n  @if ($horizontal and $vertical) {\r\n    top: $height;\r\n    left: $width;\r\n    transform: translate(-$width, -$height);\r\n  } @else if ($horizontal) {\r\n    left: $width;\r\n    transform: translate(-$width, 0);\r\n  } @else if ($vertical) {\r\n    top: $height;\r\n    transform: translate(0, -$height);\r\n  }\r\n}\r\n\r\n@mixin centerer-with-witdh($min-width:50%,$width: 50%, $height: 50%, $horizontal: true, $vertical: true) {\r\n  position: absolute;\r\n  min-width: $min-width;\r\n  @if ($horizontal and $vertical) {\r\n    top: $height;\r\n    left: $width;\r\n    transform: translate(-$width, -$height);\r\n  } @else if ($horizontal) {\r\n    left: $width;\r\n    transform: translate(-$width, 0);\r\n  } @else if ($vertical) {\r\n    top: $height;\r\n    transform: translate(0, -$height);\r\n  }\r\n}\r\n\r\n@mixin centererFlex($horizontal:true, $vertical: true){\r\n  @include flexbox;\r\n  @if ($horizontal and $vertical) {\r\n    justify-content: center;\r\n    flex-direction: column;\r\n  } @else if ($horizontal) {\r\n    \r\n  } @else if ($vertical) {\r\n    align-items: center;\r\n  }\r\n  \r\n}\r\n\r\n"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodAdd.scss":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/FoodAdd.scss ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/* Flex Sass */\n/*Flex Sass*/\n@-webkit-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-moz-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-ms-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-o-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-webkit-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-moz-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-ms-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-o-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-webkit-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-moz-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-ms-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-o-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-webkit-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@-moz-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@-ms-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@-o-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n.foodAddButton {\n  text-align: center;\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-size: 24px;\n  color: #FF404E; }\n  @media screen and (min-width: 1000px) {\n    .foodAddButton a:hover {\n      color: #f30012;\n      cursor: pointer; } }\n\n.foodAddContainer {\n  padding: 30px;\n  font-family: 'Hanna','Ubuntu', sans-serif;\n  font-size: 20px; }\n\n.foodAddInput {\n  display: block;\n  margin: auto;\n  width: 240px;\n  padding: 5px;\n  text-align: center;\n  border: 1px solid #aaa;\n  background-color: #fff;\n  font-family: 'Noto Sans KR','Ubuntu', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  border-radius: 5px;\n  outline: 0;\n  z-index: 2;\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5); }\n\n.foodAddInputError {\n  border: 1px solid lightcoral;\n  -webkit-animation: inputError 0.3s linear;\n  -moz-animation: inputError 0.3s linear;\n  -ms-animation: inputError 0.3s linear;\n  -o-animation: inputError 0.3s linear;\n  animation: inputError 0.3s linear; }\n\n.foodAddTag {\n  display: inline-block;\n  padding: 5px;\n  margin: 2px;\n  margin-top: 15px;\n  background-color: #FF404E;\n  color: white;\n  border-radius: 5px; }\n  .foodAddTag span {\n    color: black;\n    font-size: 16px;\n    background: transparent;\n    position: relative;\n    top: -15px;\n    right: -5px; }\n    .foodAddTag span:hover {\n      cursor: pointer; }\n\n.foodAddConfirm {\n  margin: 20px auto;\n  padding: 5px;\n  width: 50%;\n  cursor: pointer;\n  background: #4A404A;\n  color: white; }\n  @media screen and (min-width: 1000px) {\n    .foodAddConfirm:hover {\n      background: #342d34;\n      transition: all 0.3s ease;\n      -webkit-transition: all 0.3s ease; }\n    .foodAddConfirm:active {\n      background: #060506; } }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/flex.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/animation.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/FoodAdd.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/button.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/color.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/boxshadow.scss"],"names":[],"mappings":"AAAA,cAAA;AA8JA,YAAA;AC5JE;EA0BA;IACI,mBAAmB,EAAA;EAGvB;IACI,kBAAkB,EAAA,EAAA;;AA5BtB;EAuBA;IACI,mBAAmB,EAAA;EAGvB;IACI,kBAAkB,EAAA,EAAA;;AAzBtB;EAoBA;IACI,mBAAmB,EAAA;EAGvB;IACI,kBAAkB,EAAA,EACrB;;AAvBD;EAiBA;IACI,mBAAmB,EAAA;EAGvB;IACI,kBAAkB,EAAA,EAAA;;AAnBtB;EAcA;IACI,mBAAmB,EAAA;EAGvB;IACI,kBAAkB,EAAA,EAAA;;AA/BtB;EAoCA;IACI,UAAU,EAAA;EAGd;IACI,UAAU,EAAA,EAAA;;AAtCd;EAiCA;IACI,UAAU,EAAA;EAGd;IACI,UAAU,EAAA,EAAA;;AAnCd;EA8BA;IACI,UAAU,EAAA;EAGd;IACI,UAAU,EAAA,EACb;;AAjCD;EA2BA;IACI,UAAU,EAAA;EAGd;IACI,UAAU,EAAA,EAAA;;AA7Bd;EAwBA;IACI,UAAU,EAAA;EAGd;IACI,UAAU,EAAA,EAAA;;AAzCd;EA8CE;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA,EAAA;;AAxDhB;EA2CE;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA,EAAA;;AArDhB;EAwCE;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA,EACb;;AAnDH;EAqCE;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA,EAAA;;AA/ChB;EAkCE;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA;EAEd;IACI,UAAU,EAAA,EAAA;;AA3DhB;EAgEE;IACI,SAAS;IACT,UAAU;IACV,aAAa,EAAA;EAEjB;IACI,QAAQ;IACR,UAAU;IACV,cAAc,EAAA,EAAA;;AArEpB;EA6DE;IACI,SAAS;IACT,UAAU;IACV,aAAa,EAAA;EAEjB;IACI,QAAQ;IACR,UAAU;IACV,cAAc,EAAA,EAAA;;AAlEpB;EA0DE;IACI,SAAS;IACT,UAAU;IACV,aAAa,EAAA;EAEjB;IACI,QAAQ;IACR,UAAU;IACV,cAAc,EAAA,EACjB;;AAhEH;EAuDE;IACI,SAAS;IACT,UAAU;IACV,aAAa,EAAA;EAEjB;IACI,QAAQ;IACR,UAAU;IACV,cAAc,EAAA,EAAA;;AA5DpB;EAoDE;IACI,SAAS;IACT,UAAU;IACV,aAAa,EAAA;EAEjB;IACI,QAAQ;IACR,UAAU;IACV,cAAc,EAAA,EAAA;;ACpEtB;ECwFE,kBAAkB;EAClB,wCAAwC;EACxC,eAAe;EACf,cC9FiB,EAAA;ED+FjB;ID5FF;MC+FQ,cAAyB;MACzB,eAAe,EAAA,EAChB;;AD7FP;EACE,aAAa;EACb,yCAAyC;EACzC,eAAe,EAAA;;AAGjB;EACE,cAAc;EACd,YAAY;EACZ,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,sBAAsB;EACtB,sBAAsB;EACtB,gDAAgD;EAChD,gBAAgB;EAChB,eAAe;EACf,kBAAkB;EAClB,UAAU;EACV,UAAU;EGxBV,2DAAwD;EACxD,wDAAqD;EACrD,mDAAgD,EAAA;;AH0BlD;EACE,4BAA4B;EDd9B,yCAAmB;EACnB,sCAAgB;EAChB,qCAAe;EACf,oCAAc;EACd,iCAAW,EAAA;;ACaX;EACE,qBAAqB;EACrB,YAAY;EACZ,WAAW;EACX,gBAAgB;EAChB,yBEvCiB;EFwCjB,YAAY;EACZ,kBAAkB,EAAA;EAPpB;IASI,YAAY;IACZ,eAAe;IACf,uBAAuB;IACvB,kBAAkB;IAClB,UAAU;IACV,WAAW,EAAA;IAdf;MAgBM,eAAe,EAAA;;AAKrB;EACE,iBAAiB;EACjB,YAAY;EACZ,UAAU;EC5DV,eAAe;EACf,mBCEmB;EDDnB,YAHkC,EAAA;EAIlC;IDsDF;MCpDM,mBAAyB;MACzB,yBAAyB;MACzB,iCAAiC,EAAA;IDkDvC;MC/CM,mBAA0B,EAAA,EAC3B","file":"FoodAdd.scss","sourcesContent":["/* Flex Sass */\r\n@mixin flexbox() {\r\n  display: -webkit-box;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n\r\n// The 'flex' shorthand\r\n// - applies to: flex items\r\n// <positive-number>, initial, auto, or none\r\n@mixin flex($values) {\r\n  -webkit-box-flex: $values;\r\n     -moz-box-flex: $values;\r\n      -webkit-flex: $values;\r\n  \t  -ms-flex: $values;\r\n  \t      flex: $values;\r\n}\r\n\r\n// Flex Flow Direction\r\n// - applies to: flex containers\r\n// row | row-reverse | column | column-reverse\r\n@mixin flex-direction($direction) {\r\n  -webkit-flex-direction: $direction;\r\n     -moz-flex-direction: $direction;\r\n      -ms-flex-direction: $direction;\r\n          flex-direction: $direction;\r\n}\r\n\r\n// Flex Line Wrapping\r\n// - applies to: flex containers\r\n// nowrap | wrap | wrap-reverse\r\n@mixin flex-wrap($wrap) {\r\n  -webkit-flex-wrap: $wrap;\r\n     -moz-flex-wrap: $wrap;\r\n      -ms-flex-wrap: $wrap;\r\n          flex-wrap: $wrap;\r\n}\r\n\r\n// Flex Direction and Wrap\r\n// - applies to: flex containers\r\n// <flex-direction> || <flex-wrap>\r\n@mixin flex-flow($flow) {\r\n  -webkit-flex-flow: $flow;\r\n     -moz-flex-flow: $flow;\r\n      -ms-flex-flow: $flow;\r\n          flex-flow: $flow;\r\n}\r\n\r\n// Display Order\r\n// - applies to: flex items\r\n// <integer>\r\n@mixin order($val) {\r\n  -webkit-box-ordinal-group: $val;\r\n     -moz-box-ordinal-group: $val;\r\n  \t     -ms-flex-order: $val;\r\n  \t      -webkit-order: $val;\r\n  \t\t      order: $val;\r\n}\r\n\r\n// Flex grow factor\r\n// - applies to: flex items\r\n// <number>\r\n@mixin flex-grow($grow) {\r\n  -webkit-flex-grow: $grow;\r\n     -moz-flex-grow: $grow;\r\n      -ms-flex-grow: $grow;\r\n          flex-grow: $grow;\r\n}\r\n\r\n// Flex shrink\r\n// - applies to: flex item shrink factor\r\n// <number>\r\n@mixin flex-shrink($shrink) {\r\n  -webkit-flex-shrink: $shrink;\r\n     -moz-flex-shrink: $shrink;\r\n      -ms-flex-shrink: $shrink;\r\n          flex-shrink: $shrink;\r\n}\r\n\r\n// Flex basis\r\n// - the initial main size of the flex item\r\n// - applies to: flex itemsnitial main size of the flex item\r\n// <width>\r\n@mixin flex-basis($width) {\r\n  -webkit-flex-basis: $width;\r\n     -moz-flex-basis: $width;\r\n      -ms-flex-basis: $width;\r\n          flex-basis: $width;\r\n}\r\n\r\n// Axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | space-between | space-around\r\n@mixin justify-content($justify) {\r\n  -webkit-justify-content: $justify;\r\n     -moz-justify-content: $justify;\r\n      -ms-justify-content: $justify;\r\n          justify-content: $justify;\r\n            -ms-flex-pack: $justify;\r\n}\r\n\r\n// Packing Flex Lines\r\n// - applies to: multi-line flex containers\r\n// flex-start | flex-end | center | space-between | space-around | stretch\r\n@mixin align-content($align) {\r\n  -webkit-align-content: $align;\r\n     -moz-align-content: $align;\r\n      -ms-align-content: $align;\r\n          align-content: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | baseline | stretch\r\n@mixin align-items($align) {\r\n  -webkit-align-items: $align;\r\n     -moz-align-items: $align;\r\n      -ms-align-items: $align;\r\n          align-items: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex items\r\n// auto | flex-start | flex-end | center | baseline | stretch\r\n@mixin align-self($align) {\r\n  -webkit-align-self: $align;\r\n     -moz-align-self: $align;\r\n      -ms-align-self: $align;\r\n          align-self: $align;\r\n}\r\n\r\n@mixin flex-1-1{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-0-1{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-1-0{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(0);\r\n}\r\n\r\n@mixin flex-0-0{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(0);\r\n}\r\n/*Flex Sass*/","@import './color.scss';\r\n@mixin keyframes($animation-name) {\r\n  @-webkit-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @-moz-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @-ms-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @-o-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n}\r\n\r\n@mixin animation($name) {\r\n-webkit-animation: #{$name};\r\n-moz-animation: #{$name};\r\n-ms-animation: #{$name};\r\n-o-animation: #{$name};\r\nanimation: #{$name};\r\n}\r\n\r\n@include keyframes(changecolor) {\r\n  0% {\r\n      border-color: black;\r\n  }\r\n\r\n  100% {\r\n      border-color: #ccc;\r\n  }\r\n}\r\n\r\n@include keyframes(fadein) {\r\n  0% {\r\n      opacity: 0;\r\n  }\r\n\r\n  100% {\r\n      opacity: 1;\r\n  }\r\n}\r\n\r\n@include keyframes(inputError) {\r\n    0% {\r\n        opacity: 1;\r\n    } \r\n    25% {\r\n        opacity: 0;\r\n    }  \r\n    50%{\r\n        opacity: 1;\r\n    }\r\n    75%{\r\n        opacity: 0;\r\n    }\r\n    100% {\r\n        opacity: 1;\r\n    }\r\n  }\r\n\r\n@include keyframes(slideInFromBottom) {\r\n    0% {\r\n        top: 100%;\r\n        opacity: 0;\r\n        display: none;\r\n    }\r\n    100% {\r\n        top: 50%;\r\n        opacity: 1;\r\n        display: block;\r\n    }\r\n  }","@import 'util/color.scss';\n@import 'util/flex.scss';\n@import 'util/boxshadow.scss';\n@import 'util/button.scss';\n@import 'util/animation.scss';\n\n.foodAddButton{\n  @include button-a($light-red);\n}\n\n.foodAddContainer{\n  padding: 30px;\n  font-family: 'Hanna','Ubuntu', sans-serif;\n  font-size: 20px;\n}\n\n.foodAddInput{\n  display: block;\n  margin: auto;\n  width: 240px;\n  padding: 5px;\n  text-align: center;\n  border: 1px solid #aaa;\n  background-color: #fff;\n  font-family: 'Noto Sans KR','Ubuntu', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  border-radius: 5px;\n  outline: 0;\n  z-index: 2;\n  @include boxShadowBottomRightThinLighter;\n}\n\n.foodAddInputError{\n  border: 1px solid lightcoral;\n  @include animation(inputError 0.3s linear);\n}\n.foodAddTag{\n  display: inline-block;\n  padding: 5px;\n  margin: 2px;\n  margin-top: 15px;\n  background-color: $light-red;\n  color: white;\n  border-radius: 5px;\n  span{\n    color: black;\n    font-size: 16px;\n    background: transparent;\n    position: relative;\n    top: -15px;\n    right: -5px;\n    &:hover{\n      cursor: pointer;\n    }\n  }\n}\n\n.foodAddConfirm{\n  margin: 20px auto;\n  padding: 5px;\n  width: 50%;\n  @include button-fill($light-brown);\n}","@mixin button-fill($bg, $color:white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button-border($color,$bg: white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  border: 1px solid $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button($border){\r\n  cursor: pointer;\r\n  color: $border;\r\n  border: 1px solid $border;\r\n  position: relative;\r\n  transition: color 0.2s ease-in-out;\r\n  -webkit-transition: color 0.2s ease-in-out;\r\n  &:hover{\r\n    color: white;\r\n  }\r\n  &:before,\r\n  &:after{\r\n    content: '';\r\n    position: absolute;\r\n    z-index:-1;\r\n    width: 0%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: $border;\r\n    transition: width 0.2s ease-in-out;\r\n    -webkit-transition: width 0.2s ease-in-out;\r\n    \r\n  }\r\n  \r\n  &:hover:before,\r\n  &:hover:after{\r\n    width: 100%; //transition에 해당하는 element만 바뀔 때 reverse도 된다.\r\n  }\r\n}\r\n\r\n@mixin button-active($bg){\r\n  background: $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-border-active($bg){\r\n  background: $bg;\r\n  border: 1px solid $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-a($color){\r\n  text-align: center;\r\n  font-family: 'Hanna','Ubuntu',sans-serif;\r\n  font-size: 24px;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    a{\r\n      &:hover{\r\n        color: darken($color,15%); \r\n        cursor: pointer;\r\n      }\r\n    }\r\n    \r\n  }\r\n}","$dark-blue: rgb(51, 55, 69);\r\n$light-blue: #2980B9;\r\n$dark-yellow: rgb(255, 191, 0);\r\n$light-red: #FF404E;\r\n$light-brown: #4A404A;\r\n$dark-green: #7A8256;","@mixin boxShadowBottomThinLighter() {\r\n  box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);\r\n}\r\n\r\n@mixin boxShadowBottomRightThinLighter(){\r\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n}\r\n\r\n"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodEdit.scss":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/FoodEdit.scss ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/* Flex Sass */\n/*Flex Sass*/\n@-webkit-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-moz-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-ms-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-o-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-webkit-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-moz-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-ms-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-o-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-webkit-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-moz-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-ms-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-o-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-webkit-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@-moz-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@-ms-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@-o-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n.foodAddButton {\n  text-align: center;\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-size: 24px;\n  color: #FF404E; }\n  @media screen and (min-width: 1000px) {\n    .foodAddButton a:hover {\n      color: #f30012;\n      cursor: pointer; } }\n\n.foodEditContainer {\n  padding: 10px;\n  font-family: 'Hanna','Ubuntu', sans-serif;\n  font-size: 20px; }\n\n.foodEditInput {\n  display: block;\n  margin: auto;\n  width: 30%;\n  padding: 5px;\n  text-align: center;\n  border: 1px solid #aaa;\n  background-color: #fff;\n  font-family: 'Noto Sans KR','Ubuntu', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  border-radius: 5px;\n  outline: 0;\n  z-index: 2;\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5); }\n\n.foodEditInputError {\n  border: 1px solid lightcoral;\n  -webkit-animation: inputError 0.3s linear;\n  -moz-animation: inputError 0.3s linear;\n  -ms-animation: inputError 0.3s linear;\n  -o-animation: inputError 0.3s linear;\n  animation: inputError 0.3s linear; }\n\n.foodEditTag {\n  display: inline-block;\n  padding: 5px;\n  margin: 2px;\n  margin-top: 15px;\n  background-color: #FF404E;\n  color: white;\n  border-radius: 5px; }\n  .foodEditTag span {\n    color: black;\n    font-size: 16px;\n    background: transparent;\n    position: relative;\n    top: -15px;\n    right: -5px; }\n    .foodEditTag span:hover {\n      cursor: pointer; }\n\n.foodEditConfirm {\n  margin: 20px auto;\n  padding: 5px;\n  width: 50%;\n  cursor: pointer;\n  background: #4A404A;\n  color: white; }\n  @media screen and (min-width: 1000px) {\n    .foodEditConfirm:hover {\n      background: #342d34;\n      transition: all 0.3s ease;\n      -webkit-transition: all 0.3s ease; }\n    .foodEditConfirm:active {\n      background: #060506; } }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/flex.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/animation.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/FoodEdit.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/button.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/color.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/boxshadow.scss"],"names":[],"mappings":"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","file":"FoodEdit.scss","sourcesContent":["/* Flex Sass */\r\n@mixin flexbox() {\r\n  display: -webkit-box;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n\r\n// The 'flex' shorthand\r\n// - applies to: flex items\r\n// <positive-number>, initial, auto, or none\r\n@mixin flex($values) {\r\n  -webkit-box-flex: $values;\r\n     -moz-box-flex: $values;\r\n      -webkit-flex: $values;\r\n  \t  -ms-flex: $values;\r\n  \t      flex: $values;\r\n}\r\n\r\n// Flex Flow Direction\r\n// - applies to: flex containers\r\n// row | row-reverse | column | column-reverse\r\n@mixin flex-direction($direction) {\r\n  -webkit-flex-direction: $direction;\r\n     -moz-flex-direction: $direction;\r\n      -ms-flex-direction: $direction;\r\n          flex-direction: $direction;\r\n}\r\n\r\n// Flex Line Wrapping\r\n// - applies to: flex containers\r\n// nowrap | wrap | wrap-reverse\r\n@mixin flex-wrap($wrap) {\r\n  -webkit-flex-wrap: $wrap;\r\n     -moz-flex-wrap: $wrap;\r\n      -ms-flex-wrap: $wrap;\r\n          flex-wrap: $wrap;\r\n}\r\n\r\n// Flex Direction and Wrap\r\n// - applies to: flex containers\r\n// <flex-direction> || <flex-wrap>\r\n@mixin flex-flow($flow) {\r\n  -webkit-flex-flow: $flow;\r\n     -moz-flex-flow: $flow;\r\n      -ms-flex-flow: $flow;\r\n          flex-flow: $flow;\r\n}\r\n\r\n// Display Order\r\n// - applies to: flex items\r\n// <integer>\r\n@mixin order($val) {\r\n  -webkit-box-ordinal-group: $val;\r\n     -moz-box-ordinal-group: $val;\r\n  \t     -ms-flex-order: $val;\r\n  \t      -webkit-order: $val;\r\n  \t\t      order: $val;\r\n}\r\n\r\n// Flex grow factor\r\n// - applies to: flex items\r\n// <number>\r\n@mixin flex-grow($grow) {\r\n  -webkit-flex-grow: $grow;\r\n     -moz-flex-grow: $grow;\r\n      -ms-flex-grow: $grow;\r\n          flex-grow: $grow;\r\n}\r\n\r\n// Flex shrink\r\n// - applies to: flex item shrink factor\r\n// <number>\r\n@mixin flex-shrink($shrink) {\r\n  -webkit-flex-shrink: $shrink;\r\n     -moz-flex-shrink: $shrink;\r\n      -ms-flex-shrink: $shrink;\r\n          flex-shrink: $shrink;\r\n}\r\n\r\n// Flex basis\r\n// - the initial main size of the flex item\r\n// - applies to: flex itemsnitial main size of the flex item\r\n// <width>\r\n@mixin flex-basis($width) {\r\n  -webkit-flex-basis: $width;\r\n     -moz-flex-basis: $width;\r\n      -ms-flex-basis: $width;\r\n          flex-basis: $width;\r\n}\r\n\r\n// Axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | space-between | space-around\r\n@mixin justify-content($justify) {\r\n  -webkit-justify-content: $justify;\r\n     -moz-justify-content: $justify;\r\n      -ms-justify-content: $justify;\r\n          justify-content: $justify;\r\n            -ms-flex-pack: $justify;\r\n}\r\n\r\n// Packing Flex Lines\r\n// - applies to: multi-line flex containers\r\n// flex-start | flex-end | center | space-between | space-around | stretch\r\n@mixin align-content($align) {\r\n  -webkit-align-content: $align;\r\n     -moz-align-content: $align;\r\n      -ms-align-content: $align;\r\n          align-content: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | baseline | stretch\r\n@mixin align-items($align) {\r\n  -webkit-align-items: $align;\r\n     -moz-align-items: $align;\r\n      -ms-align-items: $align;\r\n          align-items: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex items\r\n// auto | flex-start | flex-end | center | baseline | stretch\r\n@mixin align-self($align) {\r\n  -webkit-align-self: $align;\r\n     -moz-align-self: $align;\r\n      -ms-align-self: $align;\r\n          align-self: $align;\r\n}\r\n\r\n@mixin flex-1-1{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-0-1{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-1-0{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(0);\r\n}\r\n\r\n@mixin flex-0-0{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(0);\r\n}\r\n/*Flex Sass*/","@import './color.scss';\r\n@mixin keyframes($animation-name) {\r\n  @-webkit-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @-moz-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @-ms-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @-o-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n}\r\n\r\n@mixin animation($name) {\r\n-webkit-animation: #{$name};\r\n-moz-animation: #{$name};\r\n-ms-animation: #{$name};\r\n-o-animation: #{$name};\r\nanimation: #{$name};\r\n}\r\n\r\n@include keyframes(changecolor) {\r\n  0% {\r\n      border-color: black;\r\n  }\r\n\r\n  100% {\r\n      border-color: #ccc;\r\n  }\r\n}\r\n\r\n@include keyframes(fadein) {\r\n  0% {\r\n      opacity: 0;\r\n  }\r\n\r\n  100% {\r\n      opacity: 1;\r\n  }\r\n}\r\n\r\n@include keyframes(inputError) {\r\n    0% {\r\n        opacity: 1;\r\n    } \r\n    25% {\r\n        opacity: 0;\r\n    }  \r\n    50%{\r\n        opacity: 1;\r\n    }\r\n    75%{\r\n        opacity: 0;\r\n    }\r\n    100% {\r\n        opacity: 1;\r\n    }\r\n  }\r\n\r\n@include keyframes(slideInFromBottom) {\r\n    0% {\r\n        top: 100%;\r\n        opacity: 0;\r\n        display: none;\r\n    }\r\n    100% {\r\n        top: 50%;\r\n        opacity: 1;\r\n        display: block;\r\n    }\r\n  }","@import 'util/color.scss';\n@import 'util/flex.scss';\n@import 'util/boxshadow.scss';\n@import 'util/button.scss';\n@import 'util/animation.scss';\n\n.foodAddButton{\n  @include button-a($light-red);\n}\n\n.foodEditContainer{\n  padding: 10px;\n  font-family: 'Hanna','Ubuntu', sans-serif;\n  font-size: 20px;\n}\n\n.foodEditInput{\n  display: block;\n  margin: auto;\n  width: 30%;\n  padding: 5px;\n  text-align: center;\n  border: 1px solid #aaa;\n  background-color: #fff;\n  font-family: 'Noto Sans KR','Ubuntu', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  border-radius: 5px;\n  outline: 0;\n  z-index: 2;\n  @include boxShadowBottomRightThinLighter;\n}\n\n.foodEditInputError{\n  border: 1px solid lightcoral;\n  @include animation(inputError 0.3s linear);\n}\n.foodEditTag{\n  display: inline-block;\n  padding: 5px;\n  margin: 2px;\n  margin-top: 15px;\n  background-color: $light-red;\n  color: white;\n  border-radius: 5px;\n  span{\n    color: black;\n    font-size: 16px;\n    background: transparent;\n    position: relative;\n    top: -15px;\n    right: -5px;\n    &:hover{\n      cursor: pointer;\n    }\n  }\n}\n\n.foodEditConfirm{\n  margin: 20px auto;\n  padding: 5px;\n  width: 50%;\n  @include button-fill($light-brown);\n}","@mixin button-fill($bg, $color:white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button-border($color,$bg: white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  border: 1px solid $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button($border){\r\n  cursor: pointer;\r\n  color: $border;\r\n  border: 1px solid $border;\r\n  position: relative;\r\n  transition: color 0.2s ease-in-out;\r\n  -webkit-transition: color 0.2s ease-in-out;\r\n  &:hover{\r\n    color: white;\r\n  }\r\n  &:before,\r\n  &:after{\r\n    content: '';\r\n    position: absolute;\r\n    z-index:-1;\r\n    width: 0%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: $border;\r\n    transition: width 0.2s ease-in-out;\r\n    -webkit-transition: width 0.2s ease-in-out;\r\n    \r\n  }\r\n  \r\n  &:hover:before,\r\n  &:hover:after{\r\n    width: 100%; //transition에 해당하는 element만 바뀔 때 reverse도 된다.\r\n  }\r\n}\r\n\r\n@mixin button-active($bg){\r\n  background: $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-border-active($bg){\r\n  background: $bg;\r\n  border: 1px solid $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-a($color){\r\n  text-align: center;\r\n  font-family: 'Hanna','Ubuntu',sans-serif;\r\n  font-size: 24px;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    a{\r\n      &:hover{\r\n        color: darken($color,15%); \r\n        cursor: pointer;\r\n      }\r\n    }\r\n    \r\n  }\r\n}","$dark-blue: rgb(51, 55, 69);\r\n$light-blue: #2980B9;\r\n$dark-yellow: rgb(255, 191, 0);\r\n$light-red: #FF404E;\r\n$light-brown: #4A404A;\r\n$dark-green: #7A8256;","@mixin boxShadowBottomThinLighter() {\r\n  box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);\r\n}\r\n\r\n@mixin boxShadowBottomRightThinLighter(){\r\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n}\r\n\r\n"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodInfo.scss":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/FoodInfo.scss ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/* Flex Sass */\n/*Flex Sass*/\n.foodInfoButton {\n  text-align: center;\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-size: 24px;\n  color: #FF404E; }\n  @media screen and (min-width: 1000px) {\n    .foodInfoButton a:hover {\n      color: #f30012;\n      cursor: pointer; } }\n\n.foodInfoList {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.15);\n  font-family: 'Hanna','Ubuntu', sans-serif; }\n\n.foodInfoHeader {\n  background: #4A404A;\n  color: white !important;\n  text-align: center;\n  font-size: 24px !important; }\n\n.foodInfoFood {\n  -webkit-box-flex: 1;\n  -moz-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-flex-grow: 0;\n  -moz-flex-grow: 0;\n  -ms-flex-grow: 0;\n  flex-grow: 0;\n  -webkit-flex-shrink: 0;\n  -moz-flex-shrink: 0;\n  -ms-flex-shrink: 0;\n  flex-shrink: 0;\n  flex-basis: 30%;\n  font-size: 20px;\n  line-height: 1.5;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 10px;\n  color: #4A404A; }\n\n.foodInfoTags {\n  -webkit-box-flex: 1;\n  -moz-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-flex-grow: 1;\n  -moz-flex-grow: 1;\n  -ms-flex-grow: 1;\n  flex-grow: 1;\n  -webkit-flex-shrink: 1;\n  -moz-flex-shrink: 1;\n  -ms-flex-shrink: 1;\n  flex-shrink: 1;\n  -webkit-flex-basis: auto;\n  -moz-flex-basis: auto;\n  -ms-flex-basis: auto;\n  flex-basis: auto;\n  font-size: 16px;\n  padding: 10px; }\n  .foodInfoTags span {\n    display: inline-block;\n    vertical-align: middle;\n    padding: 5px;\n    background: #FF404E;\n    color: white;\n    border-radius: 10px;\n    margin: 0 2px; }\n\n.foodInfoEdit {\n  -webkit-box-flex: 1;\n  -moz-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-flex-grow: 0;\n  -moz-flex-grow: 0;\n  -ms-flex-grow: 0;\n  flex-grow: 0;\n  -webkit-flex-shrink: 1;\n  -moz-flex-shrink: 1;\n  -ms-flex-shrink: 1;\n  flex-shrink: 1;\n  -webkit-flex-basis: auto;\n  -moz-flex-basis: auto;\n  -ms-flex-basis: auto;\n  flex-basis: auto;\n  font-size: 16px;\n  text-align: center;\n  color: #FF404E;\n  padding: 10px; }\n\n.foodInfoSearch {\n  padding: 10px; }\n\n.foodInfoSearchInput {\n  display: inline-block;\n  margin: auto;\n  width: 50%;\n  padding: 5px;\n  text-align: center;\n  border: 1px solid #aaa;\n  background-color: #fff;\n  font-family: 'Hanna','Ubuntu', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  border-radius: 5px;\n  outline: 0;\n  z-index: 2;\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5); }\n\n.foodInfoSearchIcon {\n  display: inline-block;\n  font-size: 16px;\n  padding: 5px;\n  border: 1px solid #aaa;\n  margin: 0 3px;\n  cursor: pointer;\n  background: white;\n  color: #aaa;\n  border: 1px solid #aaa;\n  color: black; }\n  @media screen and (min-width: 1000px) {\n    .foodInfoSearchIcon:hover {\n      background: #ebebeb;\n      transition: all 0.3s ease;\n      -webkit-transition: all 0.3s ease; }\n    .foodInfoSearchIcon:active {\n      background: #bfbfbf; } }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/flex.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/FoodInfo.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/button.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/color.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/boxshadow.scss"],"names":[],"mappings":"AAAA,cAAA;AA8JA,YAAA;ACzJA;ECyFE,kBAAkB;EAClB,wCAAwC;EACxC,eAAe;EACf,cC9FiB,EAAA;ED+FjB;ID7FF;MCgGQ,cAAyB;MACzB,eAAe,EAAA,EAChB;;AD9FP;EDPE,oBAAoB;EACpB,iBAAiB;EACjB,oBAAoB;EACpB,qBAAqB;EACrB,aAAa;EILb,8CAA0C;EHW1C,yCAAyC,EAAA;;AAE3C;EACE,mBEXmB;EFYnB,uBAAuB;EACvB,kBAAkB;EAClB,0BAA0B,EAAA;;AAE5B;EDPE,mBA6Ie;EA5IZ,gBA4IY;EA3IX,eA2IW;EA1IZ,WA0IY;EAzIR,OAyIQ;EAzFf,oBA0FoB;EAzFjB,iBAyFiB;EAxFhB,gBAwFgB;EAvFZ,YAuFY;EAhFpB,sBAiFsB;EAhFnB,mBAgFmB;EA/ElB,kBA+EkB;EA9Ed,cA8Ec;ECtItB,eAAe;EACf,eAAe;EACf,gBAAgB;EAChB,qBAAqB;EACrB,sBAAsB;EACtB,aAAa;EACb,cExBmB,EAAA;;AF2BrB;EDlBE,mBAyHe;EAxHZ,gBAwHY;EAvHX,eAuHW;EAtHZ,WAsHY;EArHR,OAqHQ;EArEf,oBAsEoB;EArEjB,iBAqEiB;EApEhB,gBAoEgB;EAnEZ,YAmEY;EA5DpB,sBA6DsB;EA5DnB,mBA4DmB;EA3DlB,kBA2DkB;EA1Dd,cA0Dc;EAlDtB,wBAmDwB;EAlDrB,qBAkDqB;EAjDpB,oBAiDoB;EAhDhB,gBAgDgB;ECxGxB,eAAe;EACf,aAAa,EAAA;EAHf;IAKI,qBAAqB;IACrB,sBAAsB;IACtB,YAAY;IACZ,mBEpCe;IFqCf,YAAY;IACZ,mBAAmB;IACnB,aAAa,EAAA;;AAIjB;EDjCE,mBAgIe;EA/HZ,gBA+HY;EA9HX,eA8HW;EA7HZ,WA6HY;EA5HR,OA4HQ;EA5Ef,oBA6EoB;EA5EjB,iBA4EiB;EA3EhB,gBA2EgB;EA1EZ,YA0EY;EAnEpB,sBAoEsB;EAnEnB,mBAmEmB;EAlElB,kBAkEkB;EAjEd,cAiEc;EAzDtB,wBA0DwB;EAzDrB,qBAyDqB;EAxDpB,oBAwDoB;EAvDhB,gBAuDgB;EChGxB,eAAe;EACf,kBAAkB;EAClB,cE/CiB;EFgDjB,aAAa,EAAA;;AAGf;EACE,aAAa,EAAA;;AAGf;EACE,qBAAqB;EACrB,YAAY;EACZ,UAAU;EACV,YAAY;EACZ,kBAAkB;EAClB,sBAAsB;EACtB,sBAAsB;EACtB,yCAAyC;EACzC,gBAAgB;EAChB,eAAe;EACf,kBAAkB;EAClB,UAAU;EACV,UAAU;EGlEV,2DAAwD;EACxD,wDAAqD;EACrD,mDAAgD,EAAA;;AHoElD;EACE,qBAAqB;EACrB,eAAe;EACf,YAAY;EACZ,sBAAsB;EACtB,aAAa;EC/Db,eAAe;EACf,iBAFoC;EAGpC,WD8D2B;EC7D3B,sBD6D2B;EAC3B,YAAY,EAAA;EC7DZ;IDsDF;MCpDM,mBAAyB;MACzB,yBAAyB;MACzB,iCAAiC,EAAA;IDkDvC;MC/CM,mBAA0B,EAAA,EAC3B","file":"FoodInfo.scss","sourcesContent":["/* Flex Sass */\r\n@mixin flexbox() {\r\n  display: -webkit-box;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n\r\n// The 'flex' shorthand\r\n// - applies to: flex items\r\n// <positive-number>, initial, auto, or none\r\n@mixin flex($values) {\r\n  -webkit-box-flex: $values;\r\n     -moz-box-flex: $values;\r\n      -webkit-flex: $values;\r\n  \t  -ms-flex: $values;\r\n  \t      flex: $values;\r\n}\r\n\r\n// Flex Flow Direction\r\n// - applies to: flex containers\r\n// row | row-reverse | column | column-reverse\r\n@mixin flex-direction($direction) {\r\n  -webkit-flex-direction: $direction;\r\n     -moz-flex-direction: $direction;\r\n      -ms-flex-direction: $direction;\r\n          flex-direction: $direction;\r\n}\r\n\r\n// Flex Line Wrapping\r\n// - applies to: flex containers\r\n// nowrap | wrap | wrap-reverse\r\n@mixin flex-wrap($wrap) {\r\n  -webkit-flex-wrap: $wrap;\r\n     -moz-flex-wrap: $wrap;\r\n      -ms-flex-wrap: $wrap;\r\n          flex-wrap: $wrap;\r\n}\r\n\r\n// Flex Direction and Wrap\r\n// - applies to: flex containers\r\n// <flex-direction> || <flex-wrap>\r\n@mixin flex-flow($flow) {\r\n  -webkit-flex-flow: $flow;\r\n     -moz-flex-flow: $flow;\r\n      -ms-flex-flow: $flow;\r\n          flex-flow: $flow;\r\n}\r\n\r\n// Display Order\r\n// - applies to: flex items\r\n// <integer>\r\n@mixin order($val) {\r\n  -webkit-box-ordinal-group: $val;\r\n     -moz-box-ordinal-group: $val;\r\n  \t     -ms-flex-order: $val;\r\n  \t      -webkit-order: $val;\r\n  \t\t      order: $val;\r\n}\r\n\r\n// Flex grow factor\r\n// - applies to: flex items\r\n// <number>\r\n@mixin flex-grow($grow) {\r\n  -webkit-flex-grow: $grow;\r\n     -moz-flex-grow: $grow;\r\n      -ms-flex-grow: $grow;\r\n          flex-grow: $grow;\r\n}\r\n\r\n// Flex shrink\r\n// - applies to: flex item shrink factor\r\n// <number>\r\n@mixin flex-shrink($shrink) {\r\n  -webkit-flex-shrink: $shrink;\r\n     -moz-flex-shrink: $shrink;\r\n      -ms-flex-shrink: $shrink;\r\n          flex-shrink: $shrink;\r\n}\r\n\r\n// Flex basis\r\n// - the initial main size of the flex item\r\n// - applies to: flex itemsnitial main size of the flex item\r\n// <width>\r\n@mixin flex-basis($width) {\r\n  -webkit-flex-basis: $width;\r\n     -moz-flex-basis: $width;\r\n      -ms-flex-basis: $width;\r\n          flex-basis: $width;\r\n}\r\n\r\n// Axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | space-between | space-around\r\n@mixin justify-content($justify) {\r\n  -webkit-justify-content: $justify;\r\n     -moz-justify-content: $justify;\r\n      -ms-justify-content: $justify;\r\n          justify-content: $justify;\r\n            -ms-flex-pack: $justify;\r\n}\r\n\r\n// Packing Flex Lines\r\n// - applies to: multi-line flex containers\r\n// flex-start | flex-end | center | space-between | space-around | stretch\r\n@mixin align-content($align) {\r\n  -webkit-align-content: $align;\r\n     -moz-align-content: $align;\r\n      -ms-align-content: $align;\r\n          align-content: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | baseline | stretch\r\n@mixin align-items($align) {\r\n  -webkit-align-items: $align;\r\n     -moz-align-items: $align;\r\n      -ms-align-items: $align;\r\n          align-items: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex items\r\n// auto | flex-start | flex-end | center | baseline | stretch\r\n@mixin align-self($align) {\r\n  -webkit-align-self: $align;\r\n     -moz-align-self: $align;\r\n      -ms-align-self: $align;\r\n          align-self: $align;\r\n}\r\n\r\n@mixin flex-1-1{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-0-1{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-1-0{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(0);\r\n}\r\n\r\n@mixin flex-0-0{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(0);\r\n}\r\n/*Flex Sass*/","@import 'util/color.scss';\n@import 'util/flex.scss';\n@import 'util/boxshadow.scss';\n@import 'util/button.scss';\n\n.foodInfoButton{\n  @include button-a($light-red);\n}\n\n.foodInfoList{\n  @include flexbox;\n  @include boxShadowBottomThinLighter;\n  font-family: 'Hanna','Ubuntu', sans-serif;\n}\n.foodInfoHeader{\n  background: $light-brown;\n  color: white !important;\n  text-align: center;\n  font-size: 24px !important;\n}\n.foodInfoFood{\n  @include flex-0-0;\n  flex-basis: 30%;\n  font-size: 20px;\n  line-height: 1.5;\n  display: inline-block;\n  vertical-align: middle;\n  padding: 10px;\n  color: $light-brown;\n}\n\n.foodInfoTags{\n  @include flex-1-1;\n  font-size: 16px;\n  padding: 10px;\n  span{\n    display: inline-block;\n    vertical-align: middle;\n    padding: 5px;\n    background: $light-red;\n    color: white;\n    border-radius: 10px;\n    margin: 0 2px;\n  }\n}\n\n.foodInfoEdit{\n  @include flex-0-1;\n  font-size: 16px;\n  text-align: center;\n  color: $light-red;\n  padding: 10px;\n}\n\n.foodInfoSearch{\n  padding: 10px;\n}\n\n.foodInfoSearchInput{\n  display: inline-block;\n  margin: auto;\n  width: 50%;\n  padding: 5px;\n  text-align: center;\n  border: 1px solid #aaa;\n  background-color: #fff;\n  font-family: 'Hanna','Ubuntu', sans-serif;\n  font-weight: 400;\n  font-size: 16px;\n  border-radius: 5px;\n  outline: 0;\n  z-index: 2;\n  @include boxShadowBottomRightThinLighter;\n}\n\n.foodInfoSearchIcon{\n  display: inline-block;\n  font-size: 16px;\n  padding: 5px;\n  border: 1px solid #aaa;\n  margin: 0 3px;\n  @include button-border(#aaa);\n  color: black;\n}","@mixin button-fill($bg, $color:white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button-border($color,$bg: white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  border: 1px solid $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button($border){\r\n  cursor: pointer;\r\n  color: $border;\r\n  border: 1px solid $border;\r\n  position: relative;\r\n  transition: color 0.2s ease-in-out;\r\n  -webkit-transition: color 0.2s ease-in-out;\r\n  &:hover{\r\n    color: white;\r\n  }\r\n  &:before,\r\n  &:after{\r\n    content: '';\r\n    position: absolute;\r\n    z-index:-1;\r\n    width: 0%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: $border;\r\n    transition: width 0.2s ease-in-out;\r\n    -webkit-transition: width 0.2s ease-in-out;\r\n    \r\n  }\r\n  \r\n  &:hover:before,\r\n  &:hover:after{\r\n    width: 100%; //transition에 해당하는 element만 바뀔 때 reverse도 된다.\r\n  }\r\n}\r\n\r\n@mixin button-active($bg){\r\n  background: $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-border-active($bg){\r\n  background: $bg;\r\n  border: 1px solid $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-a($color){\r\n  text-align: center;\r\n  font-family: 'Hanna','Ubuntu',sans-serif;\r\n  font-size: 24px;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    a{\r\n      &:hover{\r\n        color: darken($color,15%); \r\n        cursor: pointer;\r\n      }\r\n    }\r\n    \r\n  }\r\n}","$dark-blue: rgb(51, 55, 69);\r\n$light-blue: #2980B9;\r\n$dark-yellow: rgb(255, 191, 0);\r\n$light-red: #FF404E;\r\n$light-brown: #4A404A;\r\n$dark-green: #7A8256;","@mixin boxShadowBottomThinLighter() {\r\n  box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);\r\n}\r\n\r\n@mixin boxShadowBottomRightThinLighter(){\r\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n}\r\n\r\n"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Header.scss":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/Header.scss ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/* Flex Sass */\n/*Flex Sass*/\n.headerContainer {\n  position: relative;\n  width: 100%;\n  height: 60px;\n  top: 0;\n  align-items: center;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex; }\n\n.headerInnerContainer {\n  padding: 10px;\n  color: #24292e;\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-weight: 400;\n  text-align: center;\n  -webkit-box-flex: 1;\n  -moz-box-flex: 1;\n  -webkit-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-flex-grow: 1;\n  -moz-flex-grow: 1;\n  -ms-flex-grow: 1;\n  flex-grow: 1;\n  -webkit-flex-shrink: 1;\n  -moz-flex-shrink: 1;\n  -ms-flex-shrink: 1;\n  flex-shrink: 1;\n  -webkit-flex-basis: auto;\n  -moz-flex-basis: auto;\n  -ms-flex-basis: auto;\n  flex-basis: auto; }\n  @media screen and (min-width: 1000px) {\n    .headerInnerContainer {\n      font-size: 36px; } }\n  @media screen and (max-width: 999px) {\n    .headerInnerContainer {\n      font-size: 54px; } }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/flex.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/Header.scss"],"names":[],"mappings":"AAAA,cAAA;AA8JA,YAAA;AC3JA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,MAAM;EACN,mBAAmB;EDNnB,oBAAoB;EACpB,iBAAiB;EACjB,oBAAoB;EACpB,qBAAqB;EACrB,aAAa,EAAA;;ACMf;EACE,aAAa;EACb,cAAc;EAOd,wCAAwC;EACxC,gBAAgB;EAChB,kBAAkB;EDVlB,mBAyHe;EAxHZ,gBAwHY;EAvHX,eAuHW;EAtHZ,WAsHY;EArHR,OAqHQ;EArEf,oBAsEoB;EArEjB,iBAqEiB;EApEhB,gBAoEgB;EAnEZ,YAmEY;EA5DpB,sBA6DsB;EA5DnB,mBA4DmB;EA3DlB,kBA2DkB;EA1Dd,cA0Dc;EAlDtB,wBAmDwB;EAlDrB,qBAkDqB;EAjDpB,oBAiDoB;EAhDhB,gBAgDgB,EAAA;EC1HxB;IAHF;MAII,eAAe,EAAA,EAUlB;EARC;IANF;MAOI,eAAe,EAAA,EAOlB","file":"Header.scss","sourcesContent":["/* Flex Sass */\r\n@mixin flexbox() {\r\n  display: -webkit-box;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n\r\n// The 'flex' shorthand\r\n// - applies to: flex items\r\n// <positive-number>, initial, auto, or none\r\n@mixin flex($values) {\r\n  -webkit-box-flex: $values;\r\n     -moz-box-flex: $values;\r\n      -webkit-flex: $values;\r\n  \t  -ms-flex: $values;\r\n  \t      flex: $values;\r\n}\r\n\r\n// Flex Flow Direction\r\n// - applies to: flex containers\r\n// row | row-reverse | column | column-reverse\r\n@mixin flex-direction($direction) {\r\n  -webkit-flex-direction: $direction;\r\n     -moz-flex-direction: $direction;\r\n      -ms-flex-direction: $direction;\r\n          flex-direction: $direction;\r\n}\r\n\r\n// Flex Line Wrapping\r\n// - applies to: flex containers\r\n// nowrap | wrap | wrap-reverse\r\n@mixin flex-wrap($wrap) {\r\n  -webkit-flex-wrap: $wrap;\r\n     -moz-flex-wrap: $wrap;\r\n      -ms-flex-wrap: $wrap;\r\n          flex-wrap: $wrap;\r\n}\r\n\r\n// Flex Direction and Wrap\r\n// - applies to: flex containers\r\n// <flex-direction> || <flex-wrap>\r\n@mixin flex-flow($flow) {\r\n  -webkit-flex-flow: $flow;\r\n     -moz-flex-flow: $flow;\r\n      -ms-flex-flow: $flow;\r\n          flex-flow: $flow;\r\n}\r\n\r\n// Display Order\r\n// - applies to: flex items\r\n// <integer>\r\n@mixin order($val) {\r\n  -webkit-box-ordinal-group: $val;\r\n     -moz-box-ordinal-group: $val;\r\n  \t     -ms-flex-order: $val;\r\n  \t      -webkit-order: $val;\r\n  \t\t      order: $val;\r\n}\r\n\r\n// Flex grow factor\r\n// - applies to: flex items\r\n// <number>\r\n@mixin flex-grow($grow) {\r\n  -webkit-flex-grow: $grow;\r\n     -moz-flex-grow: $grow;\r\n      -ms-flex-grow: $grow;\r\n          flex-grow: $grow;\r\n}\r\n\r\n// Flex shrink\r\n// - applies to: flex item shrink factor\r\n// <number>\r\n@mixin flex-shrink($shrink) {\r\n  -webkit-flex-shrink: $shrink;\r\n     -moz-flex-shrink: $shrink;\r\n      -ms-flex-shrink: $shrink;\r\n          flex-shrink: $shrink;\r\n}\r\n\r\n// Flex basis\r\n// - the initial main size of the flex item\r\n// - applies to: flex itemsnitial main size of the flex item\r\n// <width>\r\n@mixin flex-basis($width) {\r\n  -webkit-flex-basis: $width;\r\n     -moz-flex-basis: $width;\r\n      -ms-flex-basis: $width;\r\n          flex-basis: $width;\r\n}\r\n\r\n// Axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | space-between | space-around\r\n@mixin justify-content($justify) {\r\n  -webkit-justify-content: $justify;\r\n     -moz-justify-content: $justify;\r\n      -ms-justify-content: $justify;\r\n          justify-content: $justify;\r\n            -ms-flex-pack: $justify;\r\n}\r\n\r\n// Packing Flex Lines\r\n// - applies to: multi-line flex containers\r\n// flex-start | flex-end | center | space-between | space-around | stretch\r\n@mixin align-content($align) {\r\n  -webkit-align-content: $align;\r\n     -moz-align-content: $align;\r\n      -ms-align-content: $align;\r\n          align-content: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | baseline | stretch\r\n@mixin align-items($align) {\r\n  -webkit-align-items: $align;\r\n     -moz-align-items: $align;\r\n      -ms-align-items: $align;\r\n          align-items: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex items\r\n// auto | flex-start | flex-end | center | baseline | stretch\r\n@mixin align-self($align) {\r\n  -webkit-align-self: $align;\r\n     -moz-align-self: $align;\r\n      -ms-align-self: $align;\r\n          align-self: $align;\r\n}\r\n\r\n@mixin flex-1-1{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-0-1{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-1-0{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(0);\r\n}\r\n\r\n@mixin flex-0-0{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(0);\r\n}\r\n/*Flex Sass*/","@import './util/boxshadow.scss';\r\n@import './util/color.scss';\r\n@import './util/flex';\r\n.headerContainer{\r\n  position: relative;\r\n  width: 100%;\r\n  height: 60px;\r\n  top: 0;\r\n  align-items: center;\r\n  @include flexbox;\r\n}\r\n\r\n.headerInnerContainer{\r\n  padding: 10px;\r\n  color: #24292e;\r\n  @media screen and (min-width: 1000px){\r\n    font-size: 36px;\r\n  }\r\n  @media screen and (max-width: 999px){\r\n    font-size: 54px;\r\n  }\r\n  font-family: 'Hanna','Ubuntu',sans-serif;\r\n  font-weight: 400;\r\n  text-align: center;\r\n  @include flex-1-1;\r\n  \r\n}"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Modal.scss":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/Modal.scss ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "@-webkit-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-moz-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-ms-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-o-keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@keyframes changecolor {\n  0% {\n    border-color: black; }\n  100% {\n    border-color: #ccc; } }\n\n@-webkit-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-moz-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-ms-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-o-keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes fadein {\n  0% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-webkit-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-moz-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-ms-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-o-keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@keyframes inputError {\n  0% {\n    opacity: 1; }\n  25% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 0; }\n  100% {\n    opacity: 1; } }\n\n@-webkit-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@-moz-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@-ms-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@-o-keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n@keyframes slideInFromBottom {\n  0% {\n    top: 100%;\n    opacity: 0;\n    display: none; }\n  100% {\n    top: 50%;\n    opacity: 1;\n    display: block; } }\n\n/* Flex Sass */\n/*Flex Sass*/\n/* Flex Sass */\n/*Flex Sass*/\n.modalContainer {\n  position: fixed;\n  z-index: 999;\n  background: white;\n  width: 50%;\n  max-height: 70%;\n  height: 70%;\n  overflow: hidden;\n  opacity: 0;\n  top: 100%;\n  left: 0;\n  right: 0;\n  margin: auto;\n  text-align: center;\n  visibility: hidden;\n  box-sizing: border-box;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: 5px;\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  transition: top 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;\n  -webkit-transition: top 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out; }\n  @media screen and (max-width: 999px) {\n    .modalContainer {\n      width: 90%; } }\n\n.modalContainer-active {\n  top: 10%;\n  opacity: 1;\n  visibility: visible; }\n\n.modalInnerContainer {\n  height: 100%; }\n\n.modalHeader {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  align-items: center;\n  height: 60px;\n  font-size: 24px;\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-weight: 600;\n  background: #FF404E;\n  color: white;\n  padding: 5px;\n  box-sizing: border-box; }\n  .modalHeader div {\n    position: absolute;\n    width: 100%;\n    text-align: center;\n    z-index: 1; }\n  .modalHeader a {\n    width: 100%;\n    text-align: right;\n    margin-right: 5px;\n    z-index: 3; }\n    .modalHeader a svg:hover {\n      cursor: pointer; }\n\n.modalContent {\n  position: absolute;\n  box-sizing: border-box;\n  height: calc(100% - 120px);\n  max-height: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n  width: 100%; }\n\n.modalFooter {\n  position: absolute;\n  box-sizing: border-box;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n  background: #FF404E;\n  width: 100%;\n  height: 60px;\n  bottom: 0;\n  padding: 10px 6px;\n  text-align: right; }\n\n.modalAction {\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  background: transparent;\n  border: 0;\n  cursor: pointer;\n  background: #FF404E;\n  color: white;\n  font-size: 20px;\n  margin-top: 4px; }\n  @media screen and (min-width: 1000px) {\n    .modalAction:hover {\n      background: #ff1728;\n      transition: all 0.3s ease;\n      -webkit-transition: all 0.3s ease; }\n    .modalAction:active {\n      background: #c0000e; } }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/animation.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/flex.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/Modal.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/boxshadow.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/centerer.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/color.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/button.scss"],"names":[],"mappings":"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","file":"Modal.scss","sourcesContent":["@import './color.scss';\r\n@mixin keyframes($animation-name) {\r\n  @-webkit-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @-moz-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @-ms-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @-o-keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n  @keyframes #{$animation-name} {\r\n      @content;\r\n  }\r\n}\r\n\r\n@mixin animation($name) {\r\n-webkit-animation: #{$name};\r\n-moz-animation: #{$name};\r\n-ms-animation: #{$name};\r\n-o-animation: #{$name};\r\nanimation: #{$name};\r\n}\r\n\r\n@include keyframes(changecolor) {\r\n  0% {\r\n      border-color: black;\r\n  }\r\n\r\n  100% {\r\n      border-color: #ccc;\r\n  }\r\n}\r\n\r\n@include keyframes(fadein) {\r\n  0% {\r\n      opacity: 0;\r\n  }\r\n\r\n  100% {\r\n      opacity: 1;\r\n  }\r\n}\r\n\r\n@include keyframes(inputError) {\r\n    0% {\r\n        opacity: 1;\r\n    } \r\n    25% {\r\n        opacity: 0;\r\n    }  \r\n    50%{\r\n        opacity: 1;\r\n    }\r\n    75%{\r\n        opacity: 0;\r\n    }\r\n    100% {\r\n        opacity: 1;\r\n    }\r\n  }\r\n\r\n@include keyframes(slideInFromBottom) {\r\n    0% {\r\n        top: 100%;\r\n        opacity: 0;\r\n        display: none;\r\n    }\r\n    100% {\r\n        top: 50%;\r\n        opacity: 1;\r\n        display: block;\r\n    }\r\n  }","/* Flex Sass */\r\n@mixin flexbox() {\r\n  display: -webkit-box;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n\r\n// The 'flex' shorthand\r\n// - applies to: flex items\r\n// <positive-number>, initial, auto, or none\r\n@mixin flex($values) {\r\n  -webkit-box-flex: $values;\r\n     -moz-box-flex: $values;\r\n      -webkit-flex: $values;\r\n  \t  -ms-flex: $values;\r\n  \t      flex: $values;\r\n}\r\n\r\n// Flex Flow Direction\r\n// - applies to: flex containers\r\n// row | row-reverse | column | column-reverse\r\n@mixin flex-direction($direction) {\r\n  -webkit-flex-direction: $direction;\r\n     -moz-flex-direction: $direction;\r\n      -ms-flex-direction: $direction;\r\n          flex-direction: $direction;\r\n}\r\n\r\n// Flex Line Wrapping\r\n// - applies to: flex containers\r\n// nowrap | wrap | wrap-reverse\r\n@mixin flex-wrap($wrap) {\r\n  -webkit-flex-wrap: $wrap;\r\n     -moz-flex-wrap: $wrap;\r\n      -ms-flex-wrap: $wrap;\r\n          flex-wrap: $wrap;\r\n}\r\n\r\n// Flex Direction and Wrap\r\n// - applies to: flex containers\r\n// <flex-direction> || <flex-wrap>\r\n@mixin flex-flow($flow) {\r\n  -webkit-flex-flow: $flow;\r\n     -moz-flex-flow: $flow;\r\n      -ms-flex-flow: $flow;\r\n          flex-flow: $flow;\r\n}\r\n\r\n// Display Order\r\n// - applies to: flex items\r\n// <integer>\r\n@mixin order($val) {\r\n  -webkit-box-ordinal-group: $val;\r\n     -moz-box-ordinal-group: $val;\r\n  \t     -ms-flex-order: $val;\r\n  \t      -webkit-order: $val;\r\n  \t\t      order: $val;\r\n}\r\n\r\n// Flex grow factor\r\n// - applies to: flex items\r\n// <number>\r\n@mixin flex-grow($grow) {\r\n  -webkit-flex-grow: $grow;\r\n     -moz-flex-grow: $grow;\r\n      -ms-flex-grow: $grow;\r\n          flex-grow: $grow;\r\n}\r\n\r\n// Flex shrink\r\n// - applies to: flex item shrink factor\r\n// <number>\r\n@mixin flex-shrink($shrink) {\r\n  -webkit-flex-shrink: $shrink;\r\n     -moz-flex-shrink: $shrink;\r\n      -ms-flex-shrink: $shrink;\r\n          flex-shrink: $shrink;\r\n}\r\n\r\n// Flex basis\r\n// - the initial main size of the flex item\r\n// - applies to: flex itemsnitial main size of the flex item\r\n// <width>\r\n@mixin flex-basis($width) {\r\n  -webkit-flex-basis: $width;\r\n     -moz-flex-basis: $width;\r\n      -ms-flex-basis: $width;\r\n          flex-basis: $width;\r\n}\r\n\r\n// Axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | space-between | space-around\r\n@mixin justify-content($justify) {\r\n  -webkit-justify-content: $justify;\r\n     -moz-justify-content: $justify;\r\n      -ms-justify-content: $justify;\r\n          justify-content: $justify;\r\n            -ms-flex-pack: $justify;\r\n}\r\n\r\n// Packing Flex Lines\r\n// - applies to: multi-line flex containers\r\n// flex-start | flex-end | center | space-between | space-around | stretch\r\n@mixin align-content($align) {\r\n  -webkit-align-content: $align;\r\n     -moz-align-content: $align;\r\n      -ms-align-content: $align;\r\n          align-content: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | baseline | stretch\r\n@mixin align-items($align) {\r\n  -webkit-align-items: $align;\r\n     -moz-align-items: $align;\r\n      -ms-align-items: $align;\r\n          align-items: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex items\r\n// auto | flex-start | flex-end | center | baseline | stretch\r\n@mixin align-self($align) {\r\n  -webkit-align-self: $align;\r\n     -moz-align-self: $align;\r\n      -ms-align-self: $align;\r\n          align-self: $align;\r\n}\r\n\r\n@mixin flex-1-1{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-0-1{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-1-0{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(0);\r\n}\r\n\r\n@mixin flex-0-0{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(0);\r\n}\r\n/*Flex Sass*/","@import 'util/animation.scss';\n@import 'util/color.scss';\n@import 'util/flex.scss';\n@import 'util/centerer.scss';\n@import 'util/boxshadow.scss';\n@import 'util/button.scss';\n.modalContainer{\n  position: fixed;\n  z-index: 999;\n  background: white;\n  width: 50%;\n  @media screen and (max-width: 999px){\n    width: 90%;\n  }\n  max-height: 70%;\n  height: 70%;\n  overflow: hidden;\n  opacity: 0;\n  top: 100%;\n  left: 0;\n  right: 0;\n  margin: auto;\n  text-align: center;\n  visibility: hidden;\n  box-sizing: border-box;\n  border: 1px solid rgba(0,0,0,.1);\n  border-radius: 5px;\n  @include boxShadowBottomRightThinLighter;\n  transition: top 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;\n  -webkit-transition: top 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;\n}\n.modalContainer-active{\n  top: 10%;\n  opacity: 1;\n  visibility: visible;\n}\n.modalInnerContainer{\n  height: 100%;\n}\n\n.modalHeader{\n  @include centererFlex(false,true);\n  height: 60px;\n  font-size: 24px;\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-weight: 600;\n  background: $light-red;\n  color: white;\n  padding: 5px;\n  div{\n    position: absolute;\n    width: 100%;\n    text-align: center;\n    z-index: 1;\n  }\n  a{\n    width: 100%;\n    text-align: right;\n    margin-right: 5px;\n    z-index: 3;\n    svg{\n      &:hover{\n        cursor: pointer;\n      }\n    }\n  }\n  box-sizing: border-box;\n}\n.modalContent{\n  position: absolute;\n  box-sizing: border-box;\n  height: calc(100% - 120px);\n  max-height: 100%;\n  overflow-y: auto;\n  overflow-x: hidden;\n  width: 100%;\n}\n\n.modalFooter{\n  position: absolute;\n  box-sizing: border-box;\n  border-top: 1px solid rgba(0,0,0,.1);\n  background: #FF404E;\n  width: 100%;\n  height: 60px;\n  bottom: 0;\n  padding: 10px 6px;\n  text-align: right;\n}\n\n.modalAction{\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  background: transparent;\n  border: 0;\n  @include button-fill($light-red);\n  font-size: 20px;\n  margin-top: 4px;\n}\n","@mixin boxShadowBottomThinLighter() {\r\n  box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);\r\n}\r\n\r\n@mixin boxShadowBottomRightThinLighter(){\r\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n}\r\n\r\n","@import './flex.scss';\r\n@mixin centerer($width: 50%, $height: 50%, $horizontal: true, $vertical: true) {\r\n  position: absolute;\r\n  @if ($horizontal and $vertical) {\r\n    top: $height;\r\n    left: $width;\r\n    transform: translate(-$width, -$height);\r\n  } @else if ($horizontal) {\r\n    left: $width;\r\n    transform: translate(-$width, 0);\r\n  } @else if ($vertical) {\r\n    top: $height;\r\n    transform: translate(0, -$height);\r\n  }\r\n}\r\n\r\n@mixin centerer-with-witdh($min-width:50%,$width: 50%, $height: 50%, $horizontal: true, $vertical: true) {\r\n  position: absolute;\r\n  min-width: $min-width;\r\n  @if ($horizontal and $vertical) {\r\n    top: $height;\r\n    left: $width;\r\n    transform: translate(-$width, -$height);\r\n  } @else if ($horizontal) {\r\n    left: $width;\r\n    transform: translate(-$width, 0);\r\n  } @else if ($vertical) {\r\n    top: $height;\r\n    transform: translate(0, -$height);\r\n  }\r\n}\r\n\r\n@mixin centererFlex($horizontal:true, $vertical: true){\r\n  @include flexbox;\r\n  @if ($horizontal and $vertical) {\r\n    justify-content: center;\r\n    flex-direction: column;\r\n  } @else if ($horizontal) {\r\n    \r\n  } @else if ($vertical) {\r\n    align-items: center;\r\n  }\r\n  \r\n}\r\n\r\n","$dark-blue: rgb(51, 55, 69);\r\n$light-blue: #2980B9;\r\n$dark-yellow: rgb(255, 191, 0);\r\n$light-red: #FF404E;\r\n$light-brown: #4A404A;\r\n$dark-green: #7A8256;","@mixin button-fill($bg, $color:white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button-border($color,$bg: white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  border: 1px solid $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button($border){\r\n  cursor: pointer;\r\n  color: $border;\r\n  border: 1px solid $border;\r\n  position: relative;\r\n  transition: color 0.2s ease-in-out;\r\n  -webkit-transition: color 0.2s ease-in-out;\r\n  &:hover{\r\n    color: white;\r\n  }\r\n  &:before,\r\n  &:after{\r\n    content: '';\r\n    position: absolute;\r\n    z-index:-1;\r\n    width: 0%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: $border;\r\n    transition: width 0.2s ease-in-out;\r\n    -webkit-transition: width 0.2s ease-in-out;\r\n    \r\n  }\r\n  \r\n  &:hover:before,\r\n  &:hover:after{\r\n    width: 100%; //transition에 해당하는 element만 바뀔 때 reverse도 된다.\r\n  }\r\n}\r\n\r\n@mixin button-active($bg){\r\n  background: $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-border-active($bg){\r\n  background: $bg;\r\n  border: 1px solid $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-a($color){\r\n  text-align: center;\r\n  font-family: 'Hanna','Ubuntu',sans-serif;\r\n  font-size: 24px;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    a{\r\n      &:hover{\r\n        color: darken($color,15%); \r\n        cursor: pointer;\r\n      }\r\n    }\r\n    \r\n  }\r\n}"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Result.scss":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/Result.scss ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".container {\n  width: 95%;\n  box-sizing: border-box;\n  padding: 15px;\n  margin: auto;\n  text-align: center; }\n\n.startButton {\n  padding: 20px;\n  margin: auto;\n  position: relative;\n  font-family: \"Hanna\", \"Ubuntu\", sans-serif;\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n  background: #FF404E;\n  color: white;\n  transition: padding 0.3s ease-in-out, bottom 0.3s ease-in-out; }\n  @media screen and (min-width: 1000px) {\n    .startButton {\n      font-size: 32px;\n      width: 35%; } }\n  @media screen and (max-width: 999px) {\n    .startButton {\n      font-size: 26px;\n      width: 50%; } }\n  @media screen and (min-width: 1000px) {\n    .startButton:hover {\n      background: #ff1728;\n      transition: all 0.3s ease;\n      -webkit-transition: all 0.3s ease; }\n    .startButton:active {\n      background: #c0000e; } }\n\n.startButton-in-active {\n  padding-bottom: 100px;\n  cursor: auto; }\n\n.result {\n  position: absolute;\n  text-align: center;\n  width: 100%;\n  height: 100px;\n  padding: 20px;\n  opacity: 0;\n  box-sizing: border-box;\n  margin: 0 -20px;\n  font-weight: 600;\n  font-family: \"Hanna\", \"Ubuntu\", sans-serif;\n  color: #ffbf00; }\n  @media screen and (min-width: 1000px) {\n    .result {\n      font-size: 36px; } }\n  @media screen and (max-width: 999px) {\n    .result {\n      font-size: 32px; } }\n\n.result-in-active {\n  opacity: 1; }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/Result.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/boxshadow.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/button.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/color.scss"],"names":[],"mappings":"AAGA;EACE,UAAU;EACV,sBAAsB;EACtB,aAAa;EACb,YAAY;EACZ,kBAAkB,EAAA;;AAGpB;EAUE,aAAa;EACb,YAAY;EACZ,kBAAkB;EAClB,0CAA0C;ECnB1C,2DAAwD;EACxD,wDAAqD;EACrD,mDAAgD;ECNhD,eAAe;EACf,mBCCiB;EDAjB,YAHkC;EF6BlC,6DAA6D,EAAA;EAjB7D;IADF;MAEI,eAAe;MACf,UAAU,EAAA,EAgBb;EAdC;IALF;MAMI,eAAe;MACf,UAAU,EAAA,EAYb;EE1BC;IFOF;MELM,mBAAyB;MACzB,yBAAyB;MACzB,iCAAiC,EAAA;IFGvC;MEAM,mBAA0B,EAAA,EAC3B;;AFoBL;EACE,qBAAqB;EACrB,YAAY,EAAA;;AAGd;EACE,kBAAkB;EAClB,kBAAkB;EAClB,WAAW;EACX,aAAa;EACb,aAAa;EACb,UAAU;EACV,sBAAsB;EACtB,eAAe;EACf,gBAAgB;EAChB,0CAA0C;EAO1C,cGpD4B,EAAA;EH8C5B;IAXF;MAYI,eAAe,EAAA,EAMlB;EAJC;IAdF;MAeI,eAAe,EAAA,EAGlB;;AAED;EACE,UAAU,EAAA","file":"Result.scss","sourcesContent":["@import 'util/button.scss';\r\n@import 'util/color.scss';\r\n@import 'util/boxshadow.scss';\r\n.container{\r\n  width: 95%;\r\n  box-sizing: border-box;\r\n  padding: 15px;\r\n  margin: auto;\r\n  text-align: center;\r\n}\r\n\r\n.startButton{\r\n  @media screen and (min-width: 1000px){\r\n    font-size: 32px;\r\n    width: 35%;\r\n  }\r\n  @media screen and (max-width: 999px){\r\n    font-size: 26px;\r\n    width: 50%;\r\n  }\r\n  \r\n  padding: 20px;\r\n  margin: auto;\r\n  position: relative;\r\n  font-family: \"Hanna\", \"Ubuntu\", sans-serif;\r\n  @include boxShadowBottomRightThinLighter;\r\n  \r\n  @include button-fill($light-red);\r\n  \r\n  transition: padding 0.3s ease-in-out, bottom 0.3s ease-in-out;\r\n}\r\n\r\n.startButton-in-active{\r\n  padding-bottom: 100px;\r\n  cursor: auto;\r\n}\r\n\r\n.result{\r\n  position: absolute;\r\n  text-align: center;\r\n  width: 100%;\r\n  height: 100px;\r\n  padding: 20px;\r\n  opacity: 0;\r\n  box-sizing: border-box;\r\n  margin: 0 -20px;\r\n  font-weight: 600;\r\n  font-family: \"Hanna\", \"Ubuntu\", sans-serif;\r\n  @media screen and (min-width: 1000px){\r\n    font-size: 36px;\r\n  }\r\n  @media screen and (max-width: 999px){\r\n    font-size: 32px;\r\n  }\r\n  color: $dark-yellow;\r\n}\r\n\r\n.result-in-active{\r\n  opacity: 1;\r\n}","@mixin boxShadowBottomThinLighter() {\r\n  box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);\r\n}\r\n\r\n@mixin boxShadowBottomRightThinLighter(){\r\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n}\r\n\r\n","@mixin button-fill($bg, $color:white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button-border($color,$bg: white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  border: 1px solid $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button($border){\r\n  cursor: pointer;\r\n  color: $border;\r\n  border: 1px solid $border;\r\n  position: relative;\r\n  transition: color 0.2s ease-in-out;\r\n  -webkit-transition: color 0.2s ease-in-out;\r\n  &:hover{\r\n    color: white;\r\n  }\r\n  &:before,\r\n  &:after{\r\n    content: '';\r\n    position: absolute;\r\n    z-index:-1;\r\n    width: 0%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: $border;\r\n    transition: width 0.2s ease-in-out;\r\n    -webkit-transition: width 0.2s ease-in-out;\r\n    \r\n  }\r\n  \r\n  &:hover:before,\r\n  &:hover:after{\r\n    width: 100%; //transition에 해당하는 element만 바뀔 때 reverse도 된다.\r\n  }\r\n}\r\n\r\n@mixin button-active($bg){\r\n  background: $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-border-active($bg){\r\n  background: $bg;\r\n  border: 1px solid $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-a($color){\r\n  text-align: center;\r\n  font-family: 'Hanna','Ubuntu',sans-serif;\r\n  font-size: 24px;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    a{\r\n      &:hover{\r\n        color: darken($color,15%); \r\n        cursor: pointer;\r\n      }\r\n    }\r\n    \r\n  }\r\n}","$dark-blue: rgb(51, 55, 69);\r\n$light-blue: #2980B9;\r\n$dark-yellow: rgb(255, 191, 0);\r\n$light-red: #FF404E;\r\n$light-brown: #4A404A;\r\n$dark-green: #7A8256;"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/ResultPage.scss":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/ResultPage.scss ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/* Flex Sass */\n/*Flex Sass*/\n/* Flex Sass */\n/*Flex Sass*/\n.resetTagButton {\n  text-align: center;\n  width: 36px;\n  margin: auto;\n  font-size: 2em;\n  padding: .1rem;\n  margin-top: 1rem;\n  color: #FF404E;\n  background-color: #ffbf00;\n  border-radius: 100px;\n  cursor: pointer;\n  cursor: pointer;\n  background: #ffbf00;\n  color: white; }\n  @media screen and (min-width: 1000px) {\n    .resetTagButton:hover {\n      background: #d6a000;\n      transition: all 0.3s ease;\n      -webkit-transition: all 0.3s ease; }\n    .resetTagButton:active {\n      background: #806000; } }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/flex.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/ResultPage.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/color.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/button.scss"],"names":[],"mappings":"AAAA,cAAA;AA8JA,YAAA;AA9JA,cAAA;AA8JA,YAAA;ACxJA;EACE,kBAAkB;EAClB,WAAW;EACX,YAAY;EACZ,cAAc;EACd,cAAc;EACd,gBAAgB;EAChB,cCViB;EDWjB,yBCZ4B;EDa5B,oBAAoB;EACpB,eAAe;EEff,eAAe;EACf,mBDA4B;ECC5B,YAHkC,EAAA;EAIlC;IFEF;MEAM,mBAAyB;MACzB,yBAAyB;MACzB,iCAAiC,EAAA;IFFvC;MEKM,mBAA0B,EAAA,EAC3B","file":"ResultPage.scss","sourcesContent":["/* Flex Sass */\r\n@mixin flexbox() {\r\n  display: -webkit-box;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n\r\n// The 'flex' shorthand\r\n// - applies to: flex items\r\n// <positive-number>, initial, auto, or none\r\n@mixin flex($values) {\r\n  -webkit-box-flex: $values;\r\n     -moz-box-flex: $values;\r\n      -webkit-flex: $values;\r\n  \t  -ms-flex: $values;\r\n  \t      flex: $values;\r\n}\r\n\r\n// Flex Flow Direction\r\n// - applies to: flex containers\r\n// row | row-reverse | column | column-reverse\r\n@mixin flex-direction($direction) {\r\n  -webkit-flex-direction: $direction;\r\n     -moz-flex-direction: $direction;\r\n      -ms-flex-direction: $direction;\r\n          flex-direction: $direction;\r\n}\r\n\r\n// Flex Line Wrapping\r\n// - applies to: flex containers\r\n// nowrap | wrap | wrap-reverse\r\n@mixin flex-wrap($wrap) {\r\n  -webkit-flex-wrap: $wrap;\r\n     -moz-flex-wrap: $wrap;\r\n      -ms-flex-wrap: $wrap;\r\n          flex-wrap: $wrap;\r\n}\r\n\r\n// Flex Direction and Wrap\r\n// - applies to: flex containers\r\n// <flex-direction> || <flex-wrap>\r\n@mixin flex-flow($flow) {\r\n  -webkit-flex-flow: $flow;\r\n     -moz-flex-flow: $flow;\r\n      -ms-flex-flow: $flow;\r\n          flex-flow: $flow;\r\n}\r\n\r\n// Display Order\r\n// - applies to: flex items\r\n// <integer>\r\n@mixin order($val) {\r\n  -webkit-box-ordinal-group: $val;\r\n     -moz-box-ordinal-group: $val;\r\n  \t     -ms-flex-order: $val;\r\n  \t      -webkit-order: $val;\r\n  \t\t      order: $val;\r\n}\r\n\r\n// Flex grow factor\r\n// - applies to: flex items\r\n// <number>\r\n@mixin flex-grow($grow) {\r\n  -webkit-flex-grow: $grow;\r\n     -moz-flex-grow: $grow;\r\n      -ms-flex-grow: $grow;\r\n          flex-grow: $grow;\r\n}\r\n\r\n// Flex shrink\r\n// - applies to: flex item shrink factor\r\n// <number>\r\n@mixin flex-shrink($shrink) {\r\n  -webkit-flex-shrink: $shrink;\r\n     -moz-flex-shrink: $shrink;\r\n      -ms-flex-shrink: $shrink;\r\n          flex-shrink: $shrink;\r\n}\r\n\r\n// Flex basis\r\n// - the initial main size of the flex item\r\n// - applies to: flex itemsnitial main size of the flex item\r\n// <width>\r\n@mixin flex-basis($width) {\r\n  -webkit-flex-basis: $width;\r\n     -moz-flex-basis: $width;\r\n      -ms-flex-basis: $width;\r\n          flex-basis: $width;\r\n}\r\n\r\n// Axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | space-between | space-around\r\n@mixin justify-content($justify) {\r\n  -webkit-justify-content: $justify;\r\n     -moz-justify-content: $justify;\r\n      -ms-justify-content: $justify;\r\n          justify-content: $justify;\r\n            -ms-flex-pack: $justify;\r\n}\r\n\r\n// Packing Flex Lines\r\n// - applies to: multi-line flex containers\r\n// flex-start | flex-end | center | space-between | space-around | stretch\r\n@mixin align-content($align) {\r\n  -webkit-align-content: $align;\r\n     -moz-align-content: $align;\r\n      -ms-align-content: $align;\r\n          align-content: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | baseline | stretch\r\n@mixin align-items($align) {\r\n  -webkit-align-items: $align;\r\n     -moz-align-items: $align;\r\n      -ms-align-items: $align;\r\n          align-items: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex items\r\n// auto | flex-start | flex-end | center | baseline | stretch\r\n@mixin align-self($align) {\r\n  -webkit-align-self: $align;\r\n     -moz-align-self: $align;\r\n      -ms-align-self: $align;\r\n          align-self: $align;\r\n}\r\n\r\n@mixin flex-1-1{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-0-1{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-1-0{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(0);\r\n}\r\n\r\n@mixin flex-0-0{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(0);\r\n}\r\n/*Flex Sass*/","@import 'util/color.scss';\n@import 'util/centerer.scss';\n@import 'util/button.scss';\n@import 'util/flex.scss';\n@import 'util/boxshadow.scss';\n\n.resetTagButton{\n  text-align: center;\n  width: 36px;\n  margin: auto;\n  font-size: 2em;\n  padding: .1rem;\n  margin-top: 1rem;\n  color: $light-red;\n  background-color: $dark-yellow;\n  border-radius: 100px;\n  cursor: pointer;\n  @include button-fill($dark-yellow);\n}\n","$dark-blue: rgb(51, 55, 69);\r\n$light-blue: #2980B9;\r\n$dark-yellow: rgb(255, 191, 0);\r\n$light-red: #FF404E;\r\n$light-brown: #4A404A;\r\n$dark-green: #7A8256;","@mixin button-fill($bg, $color:white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button-border($color,$bg: white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  border: 1px solid $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button($border){\r\n  cursor: pointer;\r\n  color: $border;\r\n  border: 1px solid $border;\r\n  position: relative;\r\n  transition: color 0.2s ease-in-out;\r\n  -webkit-transition: color 0.2s ease-in-out;\r\n  &:hover{\r\n    color: white;\r\n  }\r\n  &:before,\r\n  &:after{\r\n    content: '';\r\n    position: absolute;\r\n    z-index:-1;\r\n    width: 0%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: $border;\r\n    transition: width 0.2s ease-in-out;\r\n    -webkit-transition: width 0.2s ease-in-out;\r\n    \r\n  }\r\n  \r\n  &:hover:before,\r\n  &:hover:after{\r\n    width: 100%; //transition에 해당하는 element만 바뀔 때 reverse도 된다.\r\n  }\r\n}\r\n\r\n@mixin button-active($bg){\r\n  background: $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-border-active($bg){\r\n  background: $bg;\r\n  border: 1px solid $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-a($color){\r\n  text-align: center;\r\n  font-family: 'Hanna','Ubuntu',sans-serif;\r\n  font-size: 24px;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    a{\r\n      &:hover{\r\n        color: darken($color,15%); \r\n        cursor: pointer;\r\n      }\r\n    }\r\n    \r\n  }\r\n}"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagFinder.scss":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/TagFinder.scss ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/* Flex Sass */\n/*Flex Sass*/\n.tagFinderContainer {\n  text-align: center;\n  width: 100%; }\n\n.tagFinderContainer input {\n  width: 200px;\n  padding: 5px;\n  z-index: 3;\n  text-align: center;\n  background: transparent;\n  line-height: 1.5;\n  vertical-align: baseline;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  outline: 0;\n  font-size: 1.2em;\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  box-shadow: 17px 19px 30px -16px rgba(0, 0, 0, 0.5);\n  -webkit-appearance: none; }\n\n.tagFinderButton {\n  box-sizing: border-box;\n  width: 36px;\n  height: 36px;\n  text-align: center;\n  font-size: 16px;\n  margin: auto;\n  margin-bottom: 0px;\n  border-radius: 100px;\n  cursor: pointer;\n  background: #FF404E;\n  color: white;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  align-items: center;\n  transition: margin-bottom 0.3s ease-in-out;\n  -webkit-transition: margin-bottom 0.3s ease-in-out; }\n  @media screen and (min-width: 1000px) {\n    .tagFinderButton:hover {\n      background: #ff1728;\n      transition: all 0.3s ease;\n      -webkit-transition: all 0.3s ease; }\n    .tagFinderButton:active {\n      background: #c0000e; } }\n\n.tagFinderButton-inactive {\n  margin-bottom: 20px; }\n\n.tagFinderButtonIcon {\n  margin: auto;\n  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;\n  -webkit-transition: transform 0.3s ease-in-out, color 0.3s ease-in-out; }\n\n.tagFinderButtonIcon-rotate {\n  transform: rotate(45deg); }\n\n.tagFinderInput {\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-size: 16px;\n  width: 240px;\n  padding: 0px;\n  height: 0px;\n  visibility: hidden;\n  opacity: 0;\n  margin: 0px auto;\n  transition: height 0.3s ease-in-out,opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;\n  -webkit-transition: height 0.3s ease-in-out, opacity 0.3s ease-in-out,  visibility 0.3s ease-in-out; }\n\n.tagFinderInput-active {\n  height: 40px;\n  visibility: visible;\n  opacity: 1; }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/flex.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/TagFinder.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/boxshadow.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/button.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/color.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/centerer.scss"],"names":[],"mappings":"AAAA,cAAA;AA8JA,YAAA;AC1JA;EACE,kBAAkB;EAClB,WAAW,EAAA;;AAGb;EACE,YAAY;EACZ,YAAY;EACZ,UAAU;EACV,kBAAkB;EAClB,uBAAuB;EACvB,gBAAgB;EAChB,wBAAwB;EACxB,kBAAkB;EAClB,sBAAsB;EACtB,UAAU;EACV,gBAAgB;ECfhB,2DAAwD;EACxD,wDAAqD;EACrD,mDAAgD;EDehD,wBAAwB,EAAA;;AAG1B;EACE,sBAAsB;EACtB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,YAAY;EACZ,kBAAkB;EAClB,oBAAoB;EEhCpB,eAAe;EACf,mBCCiB;EDAjB,YAHkC;EHElC,oBAAoB;EACpB,iBAAiB;EACjB,oBAAoB;EACpB,qBAAqB;EACrB,aAAa;EKkCX,mBAAmB;EJHrB,0CAA0C;EAC1C,kDAAkD,EAAA;EElClD;IFqBF;MEnBM,mBAAyB;MACzB,yBAAyB;MACzB,iCAAiC,EAAA;IFiBvC;MEdM,mBAA0B,EAAA,EAC3B;;AF6BL;EACE,mBAAmB,EAAA;;AAGrB;EACE,YAAY;EACZ,8DAA8D;EAC9D,sEAAsE,EAAA;;AAGxE;EACE,wBAAwB,EAAA;;AAE1B;EACE,wCAAwC;EACxC,eAAe;EACf,YAAY;EACZ,YAAY;EACZ,WAAW;EACX,kBAAkB;EAClB,UAAU;EACV,gBAAgB;EAChB,yFAAyF;EACzF,mGAAmG,EAAA;;AAErG;EACE,YAAY;EACZ,mBAAmB;EACnB,UAAU,EAAA","file":"TagFinder.scss","sourcesContent":["/* Flex Sass */\r\n@mixin flexbox() {\r\n  display: -webkit-box;\r\n  display: -moz-box;\r\n  display: -ms-flexbox;\r\n  display: -webkit-flex;\r\n  display: flex;\r\n}\r\n\r\n// The 'flex' shorthand\r\n// - applies to: flex items\r\n// <positive-number>, initial, auto, or none\r\n@mixin flex($values) {\r\n  -webkit-box-flex: $values;\r\n     -moz-box-flex: $values;\r\n      -webkit-flex: $values;\r\n  \t  -ms-flex: $values;\r\n  \t      flex: $values;\r\n}\r\n\r\n// Flex Flow Direction\r\n// - applies to: flex containers\r\n// row | row-reverse | column | column-reverse\r\n@mixin flex-direction($direction) {\r\n  -webkit-flex-direction: $direction;\r\n     -moz-flex-direction: $direction;\r\n      -ms-flex-direction: $direction;\r\n          flex-direction: $direction;\r\n}\r\n\r\n// Flex Line Wrapping\r\n// - applies to: flex containers\r\n// nowrap | wrap | wrap-reverse\r\n@mixin flex-wrap($wrap) {\r\n  -webkit-flex-wrap: $wrap;\r\n     -moz-flex-wrap: $wrap;\r\n      -ms-flex-wrap: $wrap;\r\n          flex-wrap: $wrap;\r\n}\r\n\r\n// Flex Direction and Wrap\r\n// - applies to: flex containers\r\n// <flex-direction> || <flex-wrap>\r\n@mixin flex-flow($flow) {\r\n  -webkit-flex-flow: $flow;\r\n     -moz-flex-flow: $flow;\r\n      -ms-flex-flow: $flow;\r\n          flex-flow: $flow;\r\n}\r\n\r\n// Display Order\r\n// - applies to: flex items\r\n// <integer>\r\n@mixin order($val) {\r\n  -webkit-box-ordinal-group: $val;\r\n     -moz-box-ordinal-group: $val;\r\n  \t     -ms-flex-order: $val;\r\n  \t      -webkit-order: $val;\r\n  \t\t      order: $val;\r\n}\r\n\r\n// Flex grow factor\r\n// - applies to: flex items\r\n// <number>\r\n@mixin flex-grow($grow) {\r\n  -webkit-flex-grow: $grow;\r\n     -moz-flex-grow: $grow;\r\n      -ms-flex-grow: $grow;\r\n          flex-grow: $grow;\r\n}\r\n\r\n// Flex shrink\r\n// - applies to: flex item shrink factor\r\n// <number>\r\n@mixin flex-shrink($shrink) {\r\n  -webkit-flex-shrink: $shrink;\r\n     -moz-flex-shrink: $shrink;\r\n      -ms-flex-shrink: $shrink;\r\n          flex-shrink: $shrink;\r\n}\r\n\r\n// Flex basis\r\n// - the initial main size of the flex item\r\n// - applies to: flex itemsnitial main size of the flex item\r\n// <width>\r\n@mixin flex-basis($width) {\r\n  -webkit-flex-basis: $width;\r\n     -moz-flex-basis: $width;\r\n      -ms-flex-basis: $width;\r\n          flex-basis: $width;\r\n}\r\n\r\n// Axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | space-between | space-around\r\n@mixin justify-content($justify) {\r\n  -webkit-justify-content: $justify;\r\n     -moz-justify-content: $justify;\r\n      -ms-justify-content: $justify;\r\n          justify-content: $justify;\r\n            -ms-flex-pack: $justify;\r\n}\r\n\r\n// Packing Flex Lines\r\n// - applies to: multi-line flex containers\r\n// flex-start | flex-end | center | space-between | space-around | stretch\r\n@mixin align-content($align) {\r\n  -webkit-align-content: $align;\r\n     -moz-align-content: $align;\r\n      -ms-align-content: $align;\r\n          align-content: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex containers\r\n// flex-start | flex-end | center | baseline | stretch\r\n@mixin align-items($align) {\r\n  -webkit-align-items: $align;\r\n     -moz-align-items: $align;\r\n      -ms-align-items: $align;\r\n          align-items: $align;\r\n}\r\n\r\n// Cross-axis Alignment\r\n// - applies to: flex items\r\n// auto | flex-start | flex-end | center | baseline | stretch\r\n@mixin align-self($align) {\r\n  -webkit-align-self: $align;\r\n     -moz-align-self: $align;\r\n      -ms-align-self: $align;\r\n          align-self: $align;\r\n}\r\n\r\n@mixin flex-1-1{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-0-1{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(1);\r\n  @include flex-basis(auto);\r\n}\r\n\r\n@mixin flex-1-0{\r\n  @include flex(1);\r\n  @include flex-grow(1);\r\n  @include flex-shrink(0);\r\n}\r\n\r\n@mixin flex-0-0{\r\n  @include flex(1);\r\n  @include flex-grow(0);\r\n  @include flex-shrink(0);\r\n}\r\n/*Flex Sass*/","@import './util/centerer.scss';\n@import './util/color.scss';\n@import './util/boxshadow.scss';\n@import './util/button.scss';\n.tagFinderContainer{\n  text-align: center;\n  width: 100%;\n}\n\n.tagFinderContainer input{\n  width: 200px;\n  padding: 5px;\n  z-index: 3;\n  text-align: center;\n  background: transparent;\n  line-height: 1.5;\n  vertical-align: baseline;\n  border-radius: 5px;\n  border: 1px solid #ccc;\n  outline: 0;\n  font-size: 1.2em;\n  @include boxShadowBottomRightThinLighter;\n  -webkit-appearance: none;\n}\n\n.tagFinderButton{\n  box-sizing: border-box;\n  width: 36px;\n  height: 36px;\n  text-align: center;\n  font-size: 16px;\n  margin: auto;\n  margin-bottom: 0px;\n  border-radius: 100px;\n  @include button-fill($light-red);\n  @include centererFlex(false,true);\n\n  transition: margin-bottom 0.3s ease-in-out;\n  -webkit-transition: margin-bottom 0.3s ease-in-out;\n}\n\n.tagFinderButton-inactive{\n  margin-bottom: 20px;\n}\n\n.tagFinderButtonIcon{\n  margin: auto;\n  transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;\n  -webkit-transition: transform 0.3s ease-in-out, color 0.3s ease-in-out;\n}\n\n.tagFinderButtonIcon-rotate{\n  transform: rotate(45deg);\n}\n.tagFinderInput{\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-size: 16px;\n  width: 240px;\n  padding: 0px;\n  height: 0px;\n  visibility: hidden;\n  opacity: 0;\n  margin: 0px auto;\n  transition: height 0.3s ease-in-out,opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;\n  -webkit-transition: height 0.3s ease-in-out, opacity 0.3s ease-in-out,  visibility 0.3s ease-in-out;\n}\n.tagFinderInput-active{\n  height: 40px;\n  visibility: visible;\n  opacity: 1;\n  \n}\n","@mixin boxShadowBottomThinLighter() {\r\n  box-shadow: 0 2px 2px -2px rgba(0,0,0,.15);\r\n}\r\n\r\n@mixin boxShadowBottomRightThinLighter(){\r\n  -webkit-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  -moz-box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n  box-shadow: 17px 19px 30px -16px rgba(0,0,0,0.5);\r\n}\r\n\r\n","@mixin button-fill($bg, $color:white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button-border($color,$bg: white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  border: 1px solid $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button($border){\r\n  cursor: pointer;\r\n  color: $border;\r\n  border: 1px solid $border;\r\n  position: relative;\r\n  transition: color 0.2s ease-in-out;\r\n  -webkit-transition: color 0.2s ease-in-out;\r\n  &:hover{\r\n    color: white;\r\n  }\r\n  &:before,\r\n  &:after{\r\n    content: '';\r\n    position: absolute;\r\n    z-index:-1;\r\n    width: 0%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: $border;\r\n    transition: width 0.2s ease-in-out;\r\n    -webkit-transition: width 0.2s ease-in-out;\r\n    \r\n  }\r\n  \r\n  &:hover:before,\r\n  &:hover:after{\r\n    width: 100%; //transition에 해당하는 element만 바뀔 때 reverse도 된다.\r\n  }\r\n}\r\n\r\n@mixin button-active($bg){\r\n  background: $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-border-active($bg){\r\n  background: $bg;\r\n  border: 1px solid $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-a($color){\r\n  text-align: center;\r\n  font-family: 'Hanna','Ubuntu',sans-serif;\r\n  font-size: 24px;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    a{\r\n      &:hover{\r\n        color: darken($color,15%); \r\n        cursor: pointer;\r\n      }\r\n    }\r\n    \r\n  }\r\n}","$dark-blue: rgb(51, 55, 69);\r\n$light-blue: #2980B9;\r\n$dark-yellow: rgb(255, 191, 0);\r\n$light-red: #FF404E;\r\n$light-brown: #4A404A;\r\n$dark-green: #7A8256;","@import './flex.scss';\r\n@mixin centerer($width: 50%, $height: 50%, $horizontal: true, $vertical: true) {\r\n  position: absolute;\r\n  @if ($horizontal and $vertical) {\r\n    top: $height;\r\n    left: $width;\r\n    transform: translate(-$width, -$height);\r\n  } @else if ($horizontal) {\r\n    left: $width;\r\n    transform: translate(-$width, 0);\r\n  } @else if ($vertical) {\r\n    top: $height;\r\n    transform: translate(0, -$height);\r\n  }\r\n}\r\n\r\n@mixin centerer-with-witdh($min-width:50%,$width: 50%, $height: 50%, $horizontal: true, $vertical: true) {\r\n  position: absolute;\r\n  min-width: $min-width;\r\n  @if ($horizontal and $vertical) {\r\n    top: $height;\r\n    left: $width;\r\n    transform: translate(-$width, -$height);\r\n  } @else if ($horizontal) {\r\n    left: $width;\r\n    transform: translate(-$width, 0);\r\n  } @else if ($vertical) {\r\n    top: $height;\r\n    transform: translate(0, -$height);\r\n  }\r\n}\r\n\r\n@mixin centererFlex($horizontal:true, $vertical: true){\r\n  @include flexbox;\r\n  @if ($horizontal and $vertical) {\r\n    justify-content: center;\r\n    flex-direction: column;\r\n  } @else if ($horizontal) {\r\n    \r\n  } @else if ($vertical) {\r\n    align-items: center;\r\n  }\r\n  \r\n}\r\n\r\n"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagList.scss":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/TagList.scss ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".tagListInnerContainer {\n  margin: 10px auto;\n  text-align: center;\n  box-sizing: border-box; }\n  @media screen and (min-width: 1000px) {\n    .tagListInnerContainer {\n      width: 70%; } }\n  @media screen and (max-width: 999px) {\n    .tagListInnerContainer {\n      width: 95%; } }\n\n.tag, .normalTag, .activeTag {\n  padding: 10px;\n  margin: 0.3em;\n  display: inline-block;\n  font-family: \"Jeju Gothic\", \"Ubuntu\", sans-serif; }\n  @media screen and (min-width: 1000px) {\n    .tag, .normalTag, .activeTag {\n      font-size: 18px;\n      width: 10%; } }\n  @media screen and (max-width: 999px) {\n    .tag, .normalTag, .activeTag {\n      font-size: 14px;\n      width: 20%; } }\n\n.normalTag {\n  border-radius: 20px;\n  cursor: pointer;\n  background: white;\n  color: #2980B9;\n  border: 1px solid #2980B9;\n  -webkit-transition: width .3s ease-in-out;\n  transition: width .3s ease-in-out; }\n  @media screen and (min-width: 1000px) {\n    .normalTag:hover {\n      background: #ebebeb;\n      transition: all 0.3s ease;\n      -webkit-transition: all 0.3s ease; }\n    .normalTag:active {\n      background: #bfbfbf; } }\n\n.activeTag {\n  border-radius: 20px;\n  background: #2980B9;\n  border: 1px solid #2980B9;\n  cursor: pointer;\n  color: #ffbf00;\n  cursor: pointer;\n  -webkit-transition: width .3s ease-in-out;\n  transition: width .3s ease-in-out; }\n  @media screen and (min-width: 1000px) {\n    .activeTag:hover {\n      background: #3896d3; }\n    .activeTag:active {\n      background: #7fbbe3; } }\n\n.addTag {\n  padding: 10px;\n  margin: 0.3em;\n  display: inline-block;\n  font-family: \"Jeju Gothic\", \"Ubuntu\", sans-serif;\n  cursor: pointer;\n  background: #FF404E;\n  color: white;\n  border-radius: 20px;\n  color: white; }\n  @media screen and (min-width: 1000px) {\n    .addTag {\n      font-size: 18px; } }\n  @media screen and (max-width: 999px) {\n    .addTag {\n      font-size: 14px; } }\n  @media screen and (min-width: 1000px) {\n    .addTag:hover {\n      background: #ff1728;\n      transition: all 0.3s ease;\n      -webkit-transition: all 0.3s ease; }\n    .addTag:active {\n      background: #c0000e; } }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/TagList.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/button.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/color.scss"],"names":[],"mappings":"AAEA;EAOE,iBAAiB;EACjB,kBAAkB;EAClB,sBAAsB,EAAA;EARtB;IADF;MAEI,UAAU,EAAA,EAQb;EANC;IAJF;MAKI,UAAU,EAAA,EAKb;;AACD;EACE,aAAa;EACb,aAAa;EACb,qBAAqB;EASrB,gDAAgD,EAAA;EARhD;IAJF;MAKI,eAAe;MACf,UAAU,EAAA,EASb;EAPC;IARF;MASI,eAAe;MACf,UAAU,EAAA,EAKb;;AACD;EAEE,mBAAmB;ECdnB,eAAe;EACf,iBAFoC;EAGpC,cClBkB;EDmBlB,yBCnBkB;EFgClB,yCAAyC;EACzC,iCAAiC,EAAA;ECbjC;IDQF;MCNM,mBAAyB;MACzB,yBAAyB;MACzB,iCAAiC,EAAA;IDIvC;MCDM,mBAA0B,EAAA,EAC3B;;ADQL;EAEE,mBAAmB;ECwCnB,mBC9EkB;ED+ElB,yBC/EkB;EDgFlB,eAAe;EDxCf,cEvC4B;EFwC5B,eAAe;EACf,yCAAyC;EACzC,iCAAiC,EAAA;ECsCjC;ID7CF;MC+CM,mBAA0B,EAAA;ID/ChC;MCkDM,mBAA2B,EAAA,EAC5B;;AD1CL;EACE,aAAa;EACb,aAAa;EACb,qBAAqB;EACrB,gDAAgD;ECjDhD,eAAe;EACf,mBCCiB;EDAjB,YAHkC;ED0DlC,mBAAmB;EACnB,YAAY,EAAA;EARZ;IALF;MAMI,eAAe,EAAA,EAQlB;EANC;IARF;MASI,eAAe,EAAA,EAKlB;ECxDC;ID0CF;MCxCM,mBAAyB;MACzB,yBAAyB;MACzB,iCAAiC,EAAA;IDsCvC;MCnCM,mBAA0B,EAAA,EAC3B","file":"TagList.scss","sourcesContent":["@import './util/button.scss';\r\n@import './util/color.scss';\r\n.tagListInnerContainer{\r\n  @media screen and (min-width: 1000px){\r\n    width: 70%;\r\n  }\r\n  @media screen and (max-width: 999px){\r\n    width: 95%;\r\n  }\r\n  margin: 10px auto;\r\n  text-align: center;\r\n  box-sizing: border-box;\r\n}\r\n.tag{\r\n  padding: 10px;\r\n  margin: 0.3em;\r\n  display: inline-block;\r\n  @media screen and (min-width: 1000px){\r\n    font-size: 18px;\r\n    width: 10%;\r\n  }\r\n  @media screen and (max-width: 999px){\r\n    font-size: 14px;\r\n    width: 20%;\r\n  }\r\n  font-family: \"Jeju Gothic\", \"Ubuntu\", sans-serif;\r\n  \r\n  \r\n}\r\n.normalTag{\r\n  @extend .tag;\r\n  border-radius: 20px;\r\n  @include button-border($light-blue);\r\n  -webkit-transition: width .3s ease-in-out;\r\n  transition: width .3s ease-in-out;\r\n    \r\n}\r\n.activeTag{\r\n  @extend .tag;\r\n  border-radius: 20px;\r\n  @include button-border-active($light-blue);\r\n  color: $dark-yellow;\r\n  cursor: pointer;\r\n  -webkit-transition: width .3s ease-in-out;\r\n  transition: width .3s ease-in-out;\r\n}\r\n.addTag{\r\n  padding: 10px;\r\n  margin: 0.3em;\r\n  display: inline-block;\r\n  font-family: \"Jeju Gothic\", \"Ubuntu\", sans-serif;\r\n  @media screen and (min-width: 1000px){\r\n    font-size: 18px;\r\n  }\r\n  @media screen and (max-width: 999px){\r\n    font-size: 14px;\r\n  }\r\n  @include button-fill($light-red);\r\n  border-radius: 20px;\r\n  color: white;\r\n}\r\n","@mixin button-fill($bg, $color:white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button-border($color,$bg: white) {\r\n  cursor: pointer;\r\n  background: $bg;\r\n  color: $color;\r\n  border: 1px solid $color;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:darken($bg,8%);\r\n      transition: all 0.3s ease;\r\n      -webkit-transition: all 0.3s ease;\r\n    }\r\n    &:active {\r\n      background:darken($bg,25%);\r\n    } \r\n  }\r\n}\r\n\r\n@mixin button($border){\r\n  cursor: pointer;\r\n  color: $border;\r\n  border: 1px solid $border;\r\n  position: relative;\r\n  transition: color 0.2s ease-in-out;\r\n  -webkit-transition: color 0.2s ease-in-out;\r\n  &:hover{\r\n    color: white;\r\n  }\r\n  &:before,\r\n  &:after{\r\n    content: '';\r\n    position: absolute;\r\n    z-index:-1;\r\n    width: 0%;\r\n    height: 100%;\r\n    top: 0;\r\n    left: 0;\r\n    background-color: $border;\r\n    transition: width 0.2s ease-in-out;\r\n    -webkit-transition: width 0.2s ease-in-out;\r\n    \r\n  }\r\n  \r\n  &:hover:before,\r\n  &:hover:after{\r\n    width: 100%; //transition에 해당하는 element만 바뀔 때 reverse도 된다.\r\n  }\r\n}\r\n\r\n@mixin button-active($bg){\r\n  background: $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-border-active($bg){\r\n  background: $bg;\r\n  border: 1px solid $bg;\r\n  cursor: pointer;\r\n  @media screen and (min-width: 1000px){\r\n    &:hover {\r\n      background:lighten($bg,8%);\r\n    }\r\n    &:active {\r\n      background:lighten($bg,25%);\r\n    } \r\n  }\r\n  \r\n}\r\n\r\n@mixin button-a($color){\r\n  text-align: center;\r\n  font-family: 'Hanna','Ubuntu',sans-serif;\r\n  font-size: 24px;\r\n  color: $color;\r\n  @media screen and (min-width: 1000px){\r\n    a{\r\n      &:hover{\r\n        color: darken($color,15%); \r\n        cursor: pointer;\r\n      }\r\n    }\r\n    \r\n  }\r\n}","$dark-blue: rgb(51, 55, 69);\r\n$light-blue: #2980B9;\r\n$dark-yellow: rgb(255, 191, 0);\r\n$light-red: #FF404E;\r\n$light-brown: #4A404A;\r\n$dark-green: #7A8256;"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagPage.scss":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/TagPage.scss ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".tagContainer {\n  max-height: 500px;\n  width: 100%;\n  margin: 0 auto;\n  transition: max-height 0.3s ease-in-out;\n  -webkit-transition: max-height 0.3s ease-in-out; }\n\n.tagContainer-inactive {\n  max-height: 0px;\n  overflow: hidden; }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/TagPage.scss"],"names":[],"mappings":"AAGA;EACE,iBAAiB;EACjB,WAAW;EACX,cAAc;EACd,uCAAuC;EACvC,+CAA+C,EAAA;;AAGjD;EACE,eAAe;EACf,gBAAgB,EAAA","file":"TagPage.scss","sourcesContent":["@import 'util/color.scss';\n@import 'util/button.scss';\n\n.tagContainer{\n  max-height: 500px;\n  width: 100%;\n  margin: 0 auto;\n  transition: max-height 0.3s ease-in-out;\n  -webkit-transition: max-height 0.3s ease-in-out;\n}\n\n.tagContainer-inactive{\n  max-height: 0px;\n  overflow: hidden;\n}"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Toast.scss":
/*!*********************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--8-1!./node_modules/sass-loader/lib/loader.js??ref--8-2!./src/style/Toast.scss ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".toastContainer {\n  background: #FF404E;\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-size: 20px;\n  text-align: center;\n  word-wrap: break-word;\n  word-break: keep-all; }\n\n.toastContainer_info {\n  background: #2980B9;\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-size: 20px;\n  text-align: center; }\n", "",{"version":3,"sources":["/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/Toast.scss","/mnt/c/LTH/LTH_2019/whattoeat/src/style/src/style/util/color.scss"],"names":[],"mappings":"AACA;EACE,mBCCiB;EDAjB,wCAAwC;EACxC,eAAe;EACf,kBAAkB;EAClB,qBAAqB;EACrB,oBAAoB,EAAA;;AAGtB;EACE,mBCVkB;EDWlB,wCAAwC;EACxC,eAAe;EACf,kBAAkB,EAAA","file":"Toast.scss","sourcesContent":["@import 'util/color.scss';\n.toastContainer{\n  background: $light-red;\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-size: 20px;\n  text-align: center;\n  word-wrap: break-word;\n  word-break: keep-all;\n}\n\n.toastContainer_info{\n  background: $light-blue;\n  font-family: 'Hanna','Ubuntu',sans-serif;\n  font-size: 20px;\n  text-align: center;\n}","$dark-blue: rgb(51, 55, 69);\r\n$light-blue: #2980B9;\r\n$dark-yellow: rgb(255, 191, 0);\r\n$light-red: #FF404E;\r\n$light-brown: #4A404A;\r\n$dark-green: #7A8256;"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?modules&importLoaders=true&localIdentName=[name]__[local]___[hash:base64:5]!./src/style/AutoSuggest.css":
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?modules&importLoaders=true&localIdentName=[name]__[local]___[hash:base64:5]!./src/style/AutoSuggest.css ***!
  \*****************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, ".AutoSuggest__container___kBl-j {\n  position: relative;\n  text-align: center;\n  width: 240px;\n}\n\n.AutoSuggest__input___262q8{\n  font-family: 'Hanna','Ubuntu', sans-serif;\n}\n\n.AutoSuggest__suggestionsContainer___Dd0Wb {\n  display: none;\n}\n\n.AutoSuggest__suggestionsContainerOpen___35Wgv {\n  display: block;\n  position: absolute;\n  top: 51px;\n  width: 240px;\n  text-align: center;\n  border: 1px solid #aaa;\n  background-color: #fff;\n  font-family: 'Hanna','Ubuntu', sans-serif;\n  font-weight: 300;\n  font-size: 16px;\n  border-bottom-left-radius: 4px;\n  border-bottom-right-radius: 4px;\n  z-index: 2;\n}\n\n.AutoSuggest__suggestionsList___pQxq0 {\n  margin: 0;\n  padding: 10px;\n  list-style-type: none;\n}\n\n.AutoSuggest__suggestion___3f-q3 {\n  cursor: pointer;\n  padding: 10px 20px;\n}\n\n.AutoSuggest__suggestionHighlighted___23J5u {\n  background-color: #ddd;\n}\n", ""]);

// Exports
exports.locals = {
	"container": "AutoSuggest__container___kBl-j",
	"input": "AutoSuggest__input___262q8",
	"suggestionsContainer": "AutoSuggest__suggestionsContainer___Dd0Wb",
	"suggestionsContainerOpen": "AutoSuggest__suggestionsContainerOpen___35Wgv",
	"suggestionsList": "AutoSuggest__suggestionsList___pQxq0",
	"suggestion": "AutoSuggest__suggestion___3f-q3",
	"suggestionHighlighted": "AutoSuggest__suggestionHighlighted___23J5u"
};

/***/ }),

/***/ "./src/actions/ActionTypes.js":
/*!************************************!*\
  !*** ./src/actions/ActionTypes.js ***!
  \************************************/
/*! exports provided: GET_FOODS, GET_FOODS_SUCCESS, GET_FOODS_FAILURE, GET_RANDOM_FOOD_CLEAR, GET_RANDOM_FOOD, GET_RANDOM_FOOD_SUCCESS, GET_RANDOM_FOOD_FAILURE, GET_FOODS_BY_SCROLL, GET_FOODS_BY_SCROLL_SUCCESS, GET_FOODS_BY_SCROLL_FAILURE, GET_FOOD_BY_NAME, GET_FOOD_BY_NAME_SUCCESS, GET_FOOD_BY_NAME_FAILURE, GET_FOODS_BY_TAGS, GET_FOODS_BY_TAGS_SUCCESS, GET_FOODS_BY_TAGS_FAILURE, GET_FOODS_BY_TAG, GET_FOODS_BY_TAG_SUCCESS, GET_FOODS_BY_TAG_FAILURE, GET_FOODS_BY_SEARCH, GET_FOODS_BY_SEARCH_SUCCESS, GET_FOODS_BY_SEARCH_FAILURE, POST_FOODS, POST_FOODS_SUCCESS, POST_FOODS_FAILURE, UPDATE_FOOD, UPDATE_FOOD_SUCCESS, UPDATE_FOOD_FAILURE, GET_TAGS, GET_TAGS_SUCCESS, GET_TAGS_FAILURE, GET_RANDOM_TAGS, GET_RANDOM_TAGS_SUCCESS, GET_RANDOM_TAGS_FAILURE, GET_SUGGEST_TAGS, GET_SUGGEST_TAGS_SUCCESS, GET_SUGGEST_TAGS_FAILURE, POST_TAGS, POST_TAGS_SUCCESS, POST_TAGS_FAILURE, CHANGE_IS_MOBILE, CHANGE_WIDTH_AND_HEIGHT, INIT_ENVIRONMENT, ADD_ACTIVE_TAG, DELETE_ACTIVE_TAG */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS", function() { return GET_FOODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_SUCCESS", function() { return GET_FOODS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_FAILURE", function() { return GET_FOODS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_RANDOM_FOOD_CLEAR", function() { return GET_RANDOM_FOOD_CLEAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_RANDOM_FOOD", function() { return GET_RANDOM_FOOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_RANDOM_FOOD_SUCCESS", function() { return GET_RANDOM_FOOD_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_RANDOM_FOOD_FAILURE", function() { return GET_RANDOM_FOOD_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_SCROLL", function() { return GET_FOODS_BY_SCROLL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_SCROLL_SUCCESS", function() { return GET_FOODS_BY_SCROLL_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_SCROLL_FAILURE", function() { return GET_FOODS_BY_SCROLL_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOOD_BY_NAME", function() { return GET_FOOD_BY_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOOD_BY_NAME_SUCCESS", function() { return GET_FOOD_BY_NAME_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOOD_BY_NAME_FAILURE", function() { return GET_FOOD_BY_NAME_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_TAGS", function() { return GET_FOODS_BY_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_TAGS_SUCCESS", function() { return GET_FOODS_BY_TAGS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_TAGS_FAILURE", function() { return GET_FOODS_BY_TAGS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_TAG", function() { return GET_FOODS_BY_TAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_TAG_SUCCESS", function() { return GET_FOODS_BY_TAG_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_TAG_FAILURE", function() { return GET_FOODS_BY_TAG_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_SEARCH", function() { return GET_FOODS_BY_SEARCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_SEARCH_SUCCESS", function() { return GET_FOODS_BY_SEARCH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_FOODS_BY_SEARCH_FAILURE", function() { return GET_FOODS_BY_SEARCH_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_FOODS", function() { return POST_FOODS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_FOODS_SUCCESS", function() { return POST_FOODS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_FOODS_FAILURE", function() { return POST_FOODS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_FOOD", function() { return UPDATE_FOOD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_FOOD_SUCCESS", function() { return UPDATE_FOOD_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPDATE_FOOD_FAILURE", function() { return UPDATE_FOOD_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_TAGS", function() { return GET_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_TAGS_SUCCESS", function() { return GET_TAGS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_TAGS_FAILURE", function() { return GET_TAGS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_RANDOM_TAGS", function() { return GET_RANDOM_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_RANDOM_TAGS_SUCCESS", function() { return GET_RANDOM_TAGS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_RANDOM_TAGS_FAILURE", function() { return GET_RANDOM_TAGS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_SUGGEST_TAGS", function() { return GET_SUGGEST_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_SUGGEST_TAGS_SUCCESS", function() { return GET_SUGGEST_TAGS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_SUGGEST_TAGS_FAILURE", function() { return GET_SUGGEST_TAGS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_TAGS", function() { return POST_TAGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_TAGS_SUCCESS", function() { return POST_TAGS_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_TAGS_FAILURE", function() { return POST_TAGS_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_IS_MOBILE", function() { return CHANGE_IS_MOBILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_WIDTH_AND_HEIGHT", function() { return CHANGE_WIDTH_AND_HEIGHT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INIT_ENVIRONMENT", function() { return INIT_ENVIRONMENT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_ACTIVE_TAG", function() { return ADD_ACTIVE_TAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_ACTIVE_TAG", function() { return DELETE_ACTIVE_TAG; });
/* FOODS */
var GET_FOODS = 'GET_FOODS';
var GET_FOODS_SUCCESS = 'GET_FOODS_SUCCESS';
var GET_FOODS_FAILURE = 'GET_FOODS_FAILURE';
var GET_RANDOM_FOOD_CLEAR = 'GET_RANDOM_FOOD_CLEAR';
var GET_RANDOM_FOOD = 'GET_RANDOM_FOOD';
var GET_RANDOM_FOOD_SUCCESS = 'GET_RANDOM_FOOD_SUCCESS';
var GET_RANDOM_FOOD_FAILURE = 'GET_RANDOME_FOOD_FAILURE';
var GET_FOODS_BY_SCROLL = 'GET_FOODS_BY_SCROLL';
var GET_FOODS_BY_SCROLL_SUCCESS = 'GET_FOODS_BY_SCROLL_SUCCESS';
var GET_FOODS_BY_SCROLL_FAILURE = 'GET_FOODS_BY_SCROLL_FAILURE';
var GET_FOOD_BY_NAME = 'GET_FOOD_BY_NAME';
var GET_FOOD_BY_NAME_SUCCESS = 'GET_FOOD_BY_NAME_SUCCESS';
var GET_FOOD_BY_NAME_FAILURE = 'GET_FOOD_BY_NAME_FAILURE';
var GET_FOODS_BY_TAGS = 'GET_FOODS_BY_TAGS';
var GET_FOODS_BY_TAGS_SUCCESS = 'GET_FOODS_BY_TAGS_SUCCESS';
var GET_FOODS_BY_TAGS_FAILURE = 'GET_FOODS_BY_TAGS_FAILURE';
var GET_FOODS_BY_TAG = 'GET_FOODS_BY_TAG';
var GET_FOODS_BY_TAG_SUCCESS = 'GET_FOODS_BY_TAG_SUCCESS';
var GET_FOODS_BY_TAG_FAILURE = 'GET_FOODS_BY_TAG_FAILURE';
var GET_FOODS_BY_SEARCH = 'GET_FOODS_BY_SEARCH';
var GET_FOODS_BY_SEARCH_SUCCESS = 'GET_FOODS_BY_SEARCH_SUCCESS';
var GET_FOODS_BY_SEARCH_FAILURE = 'GET_FOODS_BY_SEARCH_FAILURE';
var POST_FOODS = 'POST_FOODS';
var POST_FOODS_SUCCESS = 'POST_FOODS_SUCCESS';
var POST_FOODS_FAILURE = 'POST_FOODS_FAILURE';
var UPDATE_FOOD = 'UPDATE_FOOD';
var UPDATE_FOOD_SUCCESS = 'UPDATE_FOOD_SUCCESS';
var UPDATE_FOOD_FAILURE = 'UPDATE_FOOD_FAILURE';
/* TAGS */

var GET_TAGS = 'GET_TAGS';
var GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
var GET_TAGS_FAILURE = 'GET_TAGS_FAILURE';
var GET_RANDOM_TAGS = 'GET_RANDOM_TAGS';
var GET_RANDOM_TAGS_SUCCESS = 'GET_RANDOM_TAGS_SUCCESS';
var GET_RANDOM_TAGS_FAILURE = 'GET_RANDOM_TAGS_FAILURE';
var GET_SUGGEST_TAGS = 'GET_SUGGEST_TAGS';
var GET_SUGGEST_TAGS_SUCCESS = 'GET_SUGGEST_TAGS_SUCCESS';
var GET_SUGGEST_TAGS_FAILURE = 'GET_SUGGEST_TAGS_FAILURE';
var POST_TAGS = 'POST_TAGS';
var POST_TAGS_SUCCESS = 'POST_TAGS_SUCCESS';
var POST_TAGS_FAILURE = 'POST_TAGS_FAILURE';
/* RAW FUNC */

var CHANGE_IS_MOBILE = 'CHANGE_IS_MOBILE';
var CHANGE_WIDTH_AND_HEIGHT = 'CHANGE_WIDTH_AND_HEIGHT';
var INIT_ENVIRONMENT = 'INIT_ENVIRONMENT';
var ADD_ACTIVE_TAG = 'ADD_ACTIVE_TAG';
var DELETE_ACTIVE_TAG = 'DELETE_ACTIVE_TAG';

/***/ }),

/***/ "./src/actions/environment.js":
/*!************************************!*\
  !*** ./src/actions/environment.js ***!
  \************************************/
/*! exports provided: changeIsMobile, changeWidthAndHeight, initEnvironment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeIsMobile", function() { return changeIsMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "changeWidthAndHeight", function() { return changeWidthAndHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initEnvironment", function() { return initEnvironment; });
/* harmony import */ var _ActionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionTypes */ "./src/actions/ActionTypes.js");

function changeIsMobile() {
  var isMobile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_IS_MOBILE"],
    isMobile: isMobile
  };
}
function changeWidthAndHeight(screenWidth, screenHeight) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_WIDTH_AND_HEIGHT"],
    screenWidth: screenWidth,
    screenHeight: screenHeight
  };
}
function initEnvironment() {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["INIT_ENVIRONMENT"]
  };
}

/***/ }),

/***/ "./src/actions/food.js":
/*!*****************************!*\
  !*** ./src/actions/food.js ***!
  \*****************************/
/*! exports provided: getRandomFood, getRandomFoodSuccess, getRandomFoodFailure, getRandomFoodClear, getFoods, getFoodsSuccess, getFoodsFailure, getFoodsByScroll, getFoodsByScrollSuccess, getFoodsByScrollFailure, getFoodByName, getFoodByNameSuccess, getFoodByNameFailure, getFoodsByTag, getFoodsByTagSuccess, getFoodsByTagFailure, getFoodsByTags, getFoodsByTagsSuccess, getFoodsByTagsFailure, getFoodsBySearch, getFoodsBySearchSuccess, getFoodsBySearchFailure, postFoods, postFoodsSuccess, postFoodsFailure, updateFood, updateFoodSuccess, updateFoodFailure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomFood", function() { return getRandomFood; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomFoodSuccess", function() { return getRandomFoodSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomFoodFailure", function() { return getRandomFoodFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomFoodClear", function() { return getRandomFoodClear; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoods", function() { return getFoods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsSuccess", function() { return getFoodsSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsFailure", function() { return getFoodsFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByScroll", function() { return getFoodsByScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByScrollSuccess", function() { return getFoodsByScrollSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByScrollFailure", function() { return getFoodsByScrollFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodByName", function() { return getFoodByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodByNameSuccess", function() { return getFoodByNameSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodByNameFailure", function() { return getFoodByNameFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByTag", function() { return getFoodsByTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByTagSuccess", function() { return getFoodsByTagSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByTagFailure", function() { return getFoodsByTagFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByTags", function() { return getFoodsByTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByTagsSuccess", function() { return getFoodsByTagsSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByTagsFailure", function() { return getFoodsByTagsFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsBySearch", function() { return getFoodsBySearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsBySearchSuccess", function() { return getFoodsBySearchSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsBySearchFailure", function() { return getFoodsBySearchFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postFoods", function() { return postFoods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postFoodsSuccess", function() { return postFoodsSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postFoodsFailure", function() { return postFoodsFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFood", function() { return updateFood; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFoodSuccess", function() { return updateFoodSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFoodFailure", function() { return updateFoodFailure; });
/* harmony import */ var _ActionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionTypes */ "./src/actions/ActionTypes.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/*
function action(type, payload = {}) {
  return {type, ...payload}
}
*/

function getRandomFood(tags) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_FOOD"],
    tags: tags
  };
}
function getRandomFoodSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_FOOD_SUCCESS"]
  }, data);
}
function getRandomFoodFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_FOOD_FAILURE"]
  }, error);
}
function getRandomFoodClear() {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_FOOD_CLEAR"]
  };
}
function getFoods() {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS"]
  };
}
function getFoodsSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_SUCCESS"]
  }, data);
}
function getFoodsFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_FAILURE"]
  }, error);
}
function getFoodsByScroll() {
  var isInitial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SCROLL"],
    isInitial: isInitial,
    id: id
  };
}
function getFoodsByScrollSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SCROLL_SUCCESS"]
  }, data);
}
function getFoodsByScrollFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SCROLL_FAILURE"]
  }, error);
}
function getFoodByName(name) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOOD_BY_NAME"],
    name: name
  };
}
function getFoodByNameSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOOD_BY_NAME_SUCCESS"]
  }, data);
}
function getFoodByNameFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOOD_BY_NAME_FAILURE"]
  }, error);
}
function getFoodsByTag(tag) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAG"],
    tag: tag
  };
}
function getFoodsByTagSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAG_SUCCESS"]
  }, data);
}
function getFoodsByTagFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAG_FAILURE"]
  }, error);
}
function getFoodsByTags(tags) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAGS"],
    tags: tags
  };
}
function getFoodsByTagsSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAGS_SUCCESS"]
  }, data);
}
function getFoodsByTagsFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAGS_FAILURE"]
  }, error);
}
function getFoodsBySearch(name) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SEARCH"],
    name: name
  };
}
function getFoodsBySearchSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SEARCH_SUCCESS"]
  }, data);
}
function getFoodsBySearchFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SEARCH_FAILURE"]
  }, error);
}
function postFoods(foods) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_FOODS"],
    foods: foods
  };
}
function postFoodsSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_FOODS_SUCCESS"]
  }, data);
}
function postFoodsFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_FOODS_FAILURE"]
  }, error);
}
function updateFood(food) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["UPDATE_FOOD"],
    food: food
  };
}
function updateFoodSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["UPDATE_FOOD_SUCCESS"]
  }, data);
}
function updateFoodFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["UPDATE_FOOD_FAILURE"]
  }, error);
}

/***/ }),

/***/ "./src/actions/tag.js":
/*!****************************!*\
  !*** ./src/actions/tag.js ***!
  \****************************/
/*! exports provided: addActiveTag, deleteActiveTag, getTags, getTagsSuccess, getTagsFailure, getRandomTags, getRandomTagsSuccess, getRandomTagsFailure, getSuggestTags, getSuggestTagsSuccess, getSuggestTagsFailure, postTags, postTagsSuccess, postTagsFailure */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addActiveTag", function() { return addActiveTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteActiveTag", function() { return deleteActiveTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTags", function() { return getTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTagsSuccess", function() { return getTagsSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTagsFailure", function() { return getTagsFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomTags", function() { return getRandomTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomTagsSuccess", function() { return getRandomTagsSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomTagsFailure", function() { return getRandomTagsFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSuggestTags", function() { return getSuggestTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSuggestTagsSuccess", function() { return getSuggestTagsSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSuggestTagsFailure", function() { return getSuggestTagsFailure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postTags", function() { return postTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postTagsSuccess", function() { return postTagsSuccess; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postTagsFailure", function() { return postTagsFailure; });
/* harmony import */ var _ActionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ActionTypes */ "./src/actions/ActionTypes.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


function addActiveTag(tag) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["ADD_ACTIVE_TAG"],
    tag: tag
  };
}
function deleteActiveTag(index) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["DELETE_ACTIVE_TAG"],
    index: index
  };
}
function getTags() {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_TAGS"]
  };
}
function getTagsSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_TAGS_SUCCESS"]
  }, data);
}
function getTagsFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_TAGS_FAILURE"]
  }, error);
}
function getRandomTags(size) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_TAGS"],
    size: size
  };
}
function getRandomTagsSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_TAGS_SUCCESS"]
  }, data);
}
function getRandomTagsFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_TAGS_FAILURE"]
  }, error);
}
function getSuggestTags(word) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_SUGGEST_TAGS"],
    word: word
  };
}
function getSuggestTagsSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_SUGGEST_TAGS_SUCCESS"]
  }, data);
}
function getSuggestTagsFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_SUGGEST_TAGS_FAILURE"]
  }, error);
}
function postTags(tags) {
  return {
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_TAGS"],
    tags: tags
  };
}
function postTagsSuccess(data) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_TAGS_SUCCESS"]
  }, data);
}
function postTagsFailure(error) {
  return _objectSpread({
    type: _ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_TAGS_FAILURE"]
  }, error);
}

/***/ }),

/***/ "./src/api/food.js":
/*!*************************!*\
  !*** ./src/api/food.js ***!
  \*************************/
/*! exports provided: getFoods, getFoodsByScroll, getFoodByName, getFoodsByTag, getFoodsByTags, getFoodsBySearch, postFoods, updateFood */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoods", function() { return getFoods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByScroll", function() { return getFoodsByScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodByName", function() { return getFoodByName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByTag", function() { return getFoodsByTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsByTags", function() { return getFoodsByTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFoodsBySearch", function() { return getFoodsBySearch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postFoods", function() { return postFoods; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateFood", function() { return updateFood; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var url = '/api/food';
function getFoods() {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url + '/all').then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}
function getFoodsByScroll(isInitial, id) {
  var scrollUrl = url + '/scroll';

  if (!isInitial) {
    scrollUrl += "/".concat(id);
  }

  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(scrollUrl).then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}
function getFoodByName(name) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url + "/name/".concat(name)).then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}
function getFoodsByTag(tag) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url + "/tag/".concat(tag)).then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}
function getFoodsByTags(tags) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url + '/tags', {
    tags: tags
  }).then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}
function getFoodsBySearch(name) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url + "/search/".concat(name)).then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}
function postFoods(foods) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, {
    foods: foods
  }).then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}
function updateFood(food) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.put(url, {
    food: food
  }).then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}

/***/ }),

/***/ "./src/api/tag.js":
/*!************************!*\
  !*** ./src/api/tag.js ***!
  \************************/
/*! exports provided: getTags, getRandomTags, getSuggestTags, postTags */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTags", function() { return getTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomTags", function() { return getRandomTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSuggestTags", function() { return getSuggestTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postTags", function() { return postTags; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var url = '/api/tag';
function getTags() {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url + '/all').then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}
function getRandomTags(size) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url + "/random/".concat(size)).then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}
function getSuggestTags(word) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url + "/search/".concat(word)).then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}
function postTags(tags) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, {
    tags: tags
  }).then(function (res) {
    return {
      res: res
    };
  }).catch(function (err) {
    return {
      err: err
    };
  });
}

/***/ }),

/***/ "./src/component/FoodAdd.js":
/*!**********************************!*\
  !*** ./src/component/FoodAdd.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FoodAdd; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.mjs");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ */ "./src/component/index.js");
/* harmony import */ var _style_FoodAdd_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/FoodAdd.scss */ "./src/style/FoodAdd.scss");
/* harmony import */ var _style_FoodAdd_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_style_FoodAdd_scss__WEBPACK_IMPORTED_MODULE_6__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_2___default.a.bind(_style_FoodAdd_scss__WEBPACK_IMPORTED_MODULE_6___default.a);
var re = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

var checkAndReplace = function checkAndReplace(value) {
  var word = value;
  var hasSpecial = re.test(word);

  if (word && hasSpecial) {
    word = word.replace(re, '');
  }

  return word;
};

var FoodAdd =
/*#__PURE__*/
function (_Component) {
  _inherits(FoodAdd, _Component);

  function FoodAdd() {
    var _this;

    _classCallCheck(this, FoodAdd);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FoodAdd).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillReceiveProps", function (nextProps) {
      if (_this.props.post.status !== nextProps.post.status) {
        switch (nextProps.post.status) {
          case 'SUCCESS':
            react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].info('음식 등록 성공!', {
              className: 'toastContainer_info'
            });

            _this.setState({
              open: false,
              tags: [],
              value: ''
            });

            break;

          case 'FAILURE':
            if (react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].code == 1) {
              react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error('DB에러', {
                className: 'toastContainer'
              });
            } else {
              react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error('음식 등록 실패...이미 있는 이름', {
                className: 'toastContainer'
              });

              _this.setState({
                value: ''
              });
            }

            break;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (e) {
      var value = checkAndReplace(e.target.value);

      _this.setState({
        value: value,
        wordValid: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleToggleModal", function () {
      _this.setState({
        open: !_this.state.open,
        value: '',
        tags: [],
        wordValid: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAddTag", function (tag) {
      var tags = _this.state.tags;
      var isIn = false;

      for (var i = 0; i < tags.length; i++) {
        if (tags[i] == tag) {
          isIn = true;
          break;
        }
      }

      if (!isIn) {
        _this.setState({
          tags: [].concat(_toConsumableArray(tags), [tag])
        });
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error('이미 있는 태그입니다.', {
          className: 'toastContainer'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDeleteTag", function (index) {
      var tags = _this.state.tags;

      _this.setState({
        tags: [].concat(_toConsumableArray(tags.slice(0, index)), _toConsumableArray(tags.slice(index + 1)))
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAddFood", function () {
      var _this$state = _this.state,
          value = _this$state.value,
          tags = _this$state.tags;

      if (!value || !value.trim()) {
        react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error('음식 이름을 입력해 주세요!', {
          className: 'toastContainer'
        });

        _this.setState({
          wordValid: false
        });

        return;
      }

      if (!tags.length) {
        react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error('적어도 한 가지 이상의 태그를 골라주세요!', {
          className: 'toastContainer'
        });
        return;
      }

      _this.props.postFoods([{
        name: value.trim(),
        tags: tags
      }]);
    });

    _this.state = {
      open: false,
      tags: [],
      value: '',
      wordValid: true
    };
    return _this;
  }

  _createClass(FoodAdd, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          open = _this$state2.open,
          value = _this$state2.value,
          tags = _this$state2.tags,
          wordValid = _this$state2.wordValid;
      var isMobile = this.props.isMobile;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodAddButton')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: this.handleToggleModal
      }, "\uC74C\uC2DD \uCD94\uAC00!")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_5__["Modal"], {
        open: open,
        header: '음식 추가',
        width: isMobile ? '90%' : '50%',
        handleToggleModal: this.handleToggleModal
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodAddContainer')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaBeer"], null), " \uC74C\uC2DD\uBA85"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: cx('foodAddInput', !wordValid ? 'foodAddInputError' : null),
        value: value,
        onChange: this.handleChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          marginTop: 20
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaTags"], null), " \uD0DC\uADF8 \uCD94\uAC00"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_5__["TagFinder"], {
        isAdd: true,
        handleAddTag: this.handleAddTag
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodAddTags')
      }, tags.map(function (tag, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          key: index,
          className: cx('foodAddTag')
        }, tag, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          onClick: function onClick() {
            return _this2.handleDeleteTag(index);
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaRegTimesCircle"], null)));
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodAddConfirm'),
        onClick: this.handleAddFood
      }, "\uCD94\uAC00!"))));
    }
  }]);

  return FoodAdd;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);


FoodAdd.propTypes = {
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  post: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  postFoods: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

/***/ }),

/***/ "./src/component/FoodEdit.js":
/*!***********************************!*\
  !*** ./src/component/FoodEdit.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FoodEdit; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.mjs");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ */ "./src/component/index.js");
/* harmony import */ var _style_FoodEdit_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/FoodEdit.scss */ "./src/style/FoodEdit.scss");
/* harmony import */ var _style_FoodEdit_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_style_FoodEdit_scss__WEBPACK_IMPORTED_MODULE_6__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_2___default.a.bind(_style_FoodEdit_scss__WEBPACK_IMPORTED_MODULE_6___default.a);
var re = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

var checkAndReplace = function checkAndReplace(value) {
  var word = value;
  var hasSpecial = re.test(word);

  if (word && hasSpecial) {
    word = word.replace(re, '');
  }

  return word;
};

var FoodEdit =
/*#__PURE__*/
function (_Component) {
  _inherits(FoodEdit, _Component);

  function FoodEdit(props) {
    var _this;

    _classCallCheck(this, FoodEdit);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FoodEdit).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillReceiveProps", function (nextProps) {
      if (_this.props.food !== nextProps.food) {
        var _nextProps$food = nextProps.food,
            _id = _nextProps$food._id,
            name = _nextProps$food.name,
            tags = _nextProps$food.tags;

        _this.setState({
          _id: _id,
          value: name,
          tags: tags
        });
      }

      if (_this.props.update.status !== nextProps.update.status) {
        switch (nextProps.update.status) {
          case 'SUCCESS':
            react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].info('음식 수정 성공!', {
              className: 'toastContainer_info'
            });

            _this.handleToggleModal();

            break;

          case 'FAILURE':
            if (react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].code == 1) {
              react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error('DB에러', {
                className: 'toastContainer'
              });

              _this.handleToggleModal();
            } else {
              react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error('음식 수정 실패...이미 있는 이름', {
                className: 'toastContainer'
              });

              _this.setState({
                value: ''
              });
            }

            break;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (e) {
      var value = checkAndReplace(e.target.value);

      _this.setState({
        value: value,
        wordValid: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleToggleModal", function () {
      _this.setState({
        value: '',
        tags: [],
        wordValid: true
      });

      _this.props.handleToggleModal();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAddTag", function (tag) {
      var tags = _this.state.tags;
      var isIn = false;

      for (var i = 0; i < tags.length; i++) {
        if (tags[i] == tag) {
          isIn = true;
          break;
        }
      }

      if (!isIn) {
        _this.setState({
          tags: [].concat(_toConsumableArray(tags), [tag])
        });
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error('이미 있는 태그입니다.', {
          className: 'toastContainer'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleDeleteTag", function (index) {
      var tags = _this.state.tags;

      _this.setState({
        tags: [].concat(_toConsumableArray(tags.slice(0, index)), _toConsumableArray(tags.slice(index + 1)))
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleEditFood", function () {
      var _this$state = _this.state,
          _id = _this$state._id,
          value = _this$state.value,
          tags = _this$state.tags;

      if (!value || !value.trim()) {
        react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error('음식 이름을 입력해 주세요!', {
          className: 'toastContainer'
        });

        _this.setState({
          wordValid: false
        });

        return;
      }

      if (!tags.length) {
        react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error('적어도 한 가지 이상의 태그를 골라주세요!', {
          className: 'toastContainer'
        });
        return;
      }

      var food = {
        id: _id,
        name: value.trim(),
        tags: tags
      };

      _this.props.updateFood(food);
    });

    _this.state = {
      _id: '',
      value: '',
      tags: [],
      wordValid: true
    };
    return _this;
  }

  _createClass(FoodEdit, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var open = this.props.open;
      var _this$state2 = this.state,
          value = _this$state2.value,
          tags = _this$state2.tags,
          wordValid = _this$state2.wordValid;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodEditContainer')
      }, open ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FaSpoon, null), " \uC74C\uC2DD\uBA85"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: cx('foodEditInput', !wordValid ? 'foodEditInputError' : null),
        value: value,
        onChange: this.handleChange
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          marginTop: 20
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaTags"], null), " \uD0DC\uADF8 \uCD94\uAC00"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_5__["TagFinder"], {
        isAdd: true,
        handleAddTag: this.handleAddTag
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodEditTags')
      }, tags.map(function (tag, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          key: index,
          className: cx('foodEditTag')
        }, tag, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          onClick: function onClick() {
            return _this2.handleDeleteTag(index);
          }
        }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FaClose, null)));
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodEditConfirm'),
        onClick: this.handleEditFood
      }, "\uC218\uC815!")) : null);
    }
  }]);

  return FoodEdit;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);


FoodEdit.defaultProps = {
  open: false,
  food: {
    _id: '',
    name: '',
    tags: []
  }
};
FoodEdit.propTypes = {
  open: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  food: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  update: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  handleToggleModal: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  updateFood: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

/***/ }),

/***/ "./src/component/FoodInfo.js":
/*!***********************************!*\
  !*** ./src/component/FoodInfo.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FoodInfo; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_waypoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-waypoint */ "./node_modules/react-waypoint/es/index.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.mjs");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ */ "./src/component/index.js");
/* harmony import */ var _style_FoodInfo_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/FoodInfo.scss */ "./src/style/FoodInfo.scss");
/* harmony import */ var _style_FoodInfo_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_style_FoodInfo_scss__WEBPACK_IMPORTED_MODULE_7__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_3___default.a.bind(_style_FoodInfo_scss__WEBPACK_IMPORTED_MODULE_7___default.a);
var re = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

var checkAndReplace = function checkAndReplace(value) {
  var word = value;
  var hasSpecial = re.test(word);

  if (word && hasSpecial) {
    word = word.replace(re, '');
  }

  return word;
};

var FoodInfo =
/*#__PURE__*/
function (_Component) {
  _inherits(FoodInfo, _Component);

  function FoodInfo() {
    var _this;

    _classCallCheck(this, FoodInfo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(FoodInfo).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (e) {
      var searchWord = checkAndReplace(e.target.value);
      var isSearching = searchWord.length == 0 ? false : _this.state.isSearching;

      _this.setState({
        searchWord: searchWord,
        isSearching: isSearching
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePress", function (e) {
      if (e.key === 'Enter') {
        _this.handleSearch();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSearch", function () {
      if (_this.state.searchWord && _this.state.searchWord.trim().length >= 2) {
        _this.props.getFoodsBySearch(_this.state.searchWord.trim());

        _this.setState({
          isSearching: true
        });
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_4__["toast"].error('두 글자 이상의 검색어가 필요합니다!', {
          className: 'toastContainer'
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleScrollMore", function (scroll) {
      if (scroll.previousPosition === 'below' && !_this.props.getByScroll.isLast) {
        _this.props.getFoodsByScroll(false, _this.props.getByScroll.foods[_this.props.getByScroll.foods.length - 1]._id);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleToggleModal", function () {
      if (!_this.state.open) {
        _this.props.getFoodsByScroll(true);
      }

      _this.setState({
        open: !_this.state.open,
        searchWord: '',
        isSearching: false,
        editOpen: false,
        editFood: {}
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleToggleEditModal", function () {
      var food = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this.setState({
        editOpen: !_this.state.editOpen,
        editFood: food
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "renderFoodInfoList", function (food, index) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: index,
        className: cx('foodInfoList')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodInfoFood')
      }, food.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodInfoTags')
      }, food.tags.map(function (tag, index) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          key: index
        }, tag);
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodInfoEdit')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaPencilAlt"], {
        onClick: function onClick() {
          return _this.handleToggleEditModal(food);
        }
      })));
    });

    _this.state = {
      open: false,
      searchWord: '',
      isSearching: false,
      editOpen: false,
      editFood: {}
    };
    return _this;
  }

  _createClass(FoodInfo, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          open = _this$state.open,
          editOpen = _this$state.editOpen,
          editFood = _this$state.editFood,
          searchWord = _this$state.searchWord,
          isSearching = _this$state.isSearching;
      var _this$props = this.props,
          getByScroll = _this$props.getByScroll,
          getBySearch = _this$props.getBySearch,
          isMobile = _this$props.isMobile,
          update = _this$props.update,
          updateFood = _this$props.updateFood;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodInfoButton')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        onClick: this.handleToggleModal
      }, "\uC5B4\uB5A4 \uC74C\uC2DD?")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_6__["Modal"], {
        open: open,
        header: '음식 정보',
        width: isMobile ? '90%' : '50%',
        handleToggleModal: this.handleToggleModal
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodInfoSearch')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: cx('foodInfoSearchInput'),
        value: searchWord,
        autoFocus: true,
        placeholder: '검색어 입력 후 엔터!',
        onChange: this.handleChange,
        onKeyPress: this.handlePress
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaSearch"], {
        className: cx('foodInfoSearchIcon'),
        onClick: this.handleSearch
      })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodInfoList')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodInfoFood', 'foodInfoHeader')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaBeer"], null)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('foodInfoTags', 'foodInfoHeader')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaTags"], null))), isSearching && getBySearch.foods.length ? getBySearch.foods.map(this.renderFoodInfoList) : !isSearching && getByScroll.foods.length ? getByScroll.foods.map(this.renderFoodInfoList) : null, isSearching ? null : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_waypoint__WEBPACK_IMPORTED_MODULE_2__["default"], {
        onEnter: this.handleScrollMore
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_6__["Modal"], {
        open: editOpen,
        header: '음식 수정',
        width: isMobile ? '80%' : '40%',
        height: '60%',
        handleToggleModal: this.handleToggleEditModal
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_6__["FoodEdit"], {
        open: editOpen,
        food: editFood,
        update: update,
        updateFood: updateFood,
        handleToggleModal: this.handleToggleEditModal
      })));
    }
  }]);

  return FoodInfo;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);


FoodInfo.propTypes = {
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  update: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  getByScroll: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  getBySearch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  updateFood: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getFoodsByScroll: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getFoodsBySearch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

/***/ }),

/***/ "./src/component/Header.js":
/*!*********************************!*\
  !*** ./src/component/Header.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_Header_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/Header.scss */ "./src/style/Header.scss");
/* harmony import */ var _style_Header_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_Header_scss__WEBPACK_IMPORTED_MODULE_2__);



var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_1___default.a.bind(_style_Header_scss__WEBPACK_IMPORTED_MODULE_2___default.a);

var Header = function Header() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: cx('headerContainer')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: cx('headerInnerContainer')
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "\uBB34\uC5C7\uC744 \uBA39\uC744\uAE4C?")));
};

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./src/component/Modal.js":
/*!********************************!*\
  !*** ./src/component/Modal.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Modal; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_Modal_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/Modal.scss */ "./src/style/Modal.scss");
/* harmony import */ var _style_Modal_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_Modal_scss__WEBPACK_IMPORTED_MODULE_4__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_3___default.a.bind(_style_Modal_scss__WEBPACK_IMPORTED_MODULE_4___default.a);

var Modal =
/*#__PURE__*/
function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidUpdate", function (prevProps, prevState) {
      /* SCROLL TO TOP WHEN MODAL OPENS AGAIN */
      if (!prevProps.open && _this.props.open) {
        var el = react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.findDOMNode(_this.content);

        if (el) {
          el.scrollTop = 0;
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillReceiveProps", function (nextProps) {
      if (!_this.props.open && nextProps.open) {
        _this.setState({
          display: 'block'
        });

        setTimeout(function () {
          _this.setState({
            show: true
          });
        }, 10);
      } else if (_this.props.open && !nextProps.open) {
        _this.setState({
          show: false
        });

        setTimeout(function () {
          _this.setState({
            display: 'none'
          });
        }, 300); //transition time
      }
    });

    _this.state = {
      display: 'none',
      show: false
    };
    return _this;
  }

  _createClass(Modal, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          display = _this$state.display,
          show = _this$state.show;
      var _this$props = this.props,
          handleToggleModal = _this$props.handleToggleModal,
          header = _this$props.header,
          children = _this$props.children,
          width = _this$props.width,
          height = _this$props.height;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: display,
          width: width,
          height: height
        },
        className: cx('modalContainer', show ? 'modalContainer-active' : null)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('modalHeader')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, header))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        ref: function ref(_ref) {
          return _this2.content = _ref;
        },
        className: cx('modalContent')
      }, children), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('modalFooter')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        className: cx('modalAction'),
        onClick: handleToggleModal
      }, "\uB2EB\uAE30")));
    }
  }]);

  return Modal;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);


Modal.defaultProps = {
  width: '50%',
  height: '70%'
};
Modal.propTypes = {
  width: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  height: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string,
  open: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired,
  header: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string.isRequired,
  children: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.node.isRequired,
  handleToggleModal: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func.isRequired
};

/***/ }),

/***/ "./src/component/Result.js":
/*!*********************************!*\
  !*** ./src/component/Result.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_Result_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/Result.scss */ "./src/style/Result.scss");
/* harmony import */ var _style_Result_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_Result_scss__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_2___default.a.bind(_style_Result_scss__WEBPACK_IMPORTED_MODULE_3___default.a);

var Result =
/*#__PURE__*/
function (_Component) {
  _inherits(Result, _Component);

  function Result() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Result);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Result)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillReceiveProps", function (nextProps) {
      if (_this.props.activeTags !== nextProps.activeTags) {
        _this.props.getRandomFoodClear();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleStart", function () {
      _this.props.getRandomFood(_this.props.activeTags);
    });

    return _this;
  }

  _createClass(Result, [{
    key: "render",
    value: function render() {
      var getRandom = this.props.getRandom;
      var status = getRandom.status,
          food = getRandom.food,
          isRandom = getRandom.isRandom;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('container')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('startButton', status == 'WAITING' || status == 'SUCCESS' ? 'startButton-in-active' : null),
        onClick: status == 'WAITING' || status == 'SUCCESS' ? null : this.handleStart
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, status === 'INIT' ? '골라보자!' : status == 'FAILURE' ? '다른 태그!' : status === 'SUCCESS' && !isRandom ? '이거다!' : '고르는 중...'), status == 'WAITING' || status == 'SUCCESS' ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('result', 'result-in-active')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, food.name)) : null));
    }
  }]);

  return Result;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

Result.defaultProps = {
  activeTags: []
};
Result.propTypes = {
  activeTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  getRandom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  getByTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  getRandomFood: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getRandomFoodClear: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getFoodsByTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (Result);

/***/ }),

/***/ "./src/component/TagFinder.js":
/*!************************************!*\
  !*** ./src/component/TagFinder.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_autosuggest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-autosuggest */ "./node_modules/react-autosuggest/dist/index.js");
/* harmony import */ var react_autosuggest__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_autosuggest__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.mjs");
/* harmony import */ var _style_TagFinder_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../style/TagFinder.scss */ "./src/style/TagFinder.scss");
/* harmony import */ var _style_TagFinder_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_style_TagFinder_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _style_AutoSuggest_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/AutoSuggest.css */ "./src/style/AutoSuggest.css");
/* harmony import */ var _style_AutoSuggest_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_style_AutoSuggest_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _actions_tag__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../actions/tag */ "./src/actions/tag.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_3___default.a.bind(_style_TagFinder_scss__WEBPACK_IMPORTED_MODULE_6___default.a);
var re = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

var checkAndReplace = function checkAndReplace(value) {
  var word = value;
  var hasSpecial = re.test(word);

  if (word && hasSpecial) {
    word = word.replace(re, '');
  }

  return word;
};

var TagFinder =
/*#__PURE__*/
function (_Component) {
  _inherits(TagFinder, _Component);

  function TagFinder() {
    var _this;

    _classCallCheck(this, TagFinder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TagFinder).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (e, _ref) {
      var newValue = _ref.newValue;
      var word = checkAndReplace(newValue);

      _this.setState({
        word: word
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSelect", function (e, _ref2) {
      var suggestion = _ref2.suggestion;

      if (_this.props.isAdd && 'value' in suggestion) {
        _this.props.handleAddTag(suggestion.value);
      } else {
        _this.props.handleAddTag(suggestion.name);
      }

      _this.setState({
        word: ''
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleButtonClick", function () {
      _this.setState({
        isSearch: !_this.state.isSearch
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "getSuggestionValue", function (item) {
      if (_this.props.isAdd && 'value' in item) {
        return item.value.trim();
      } else {
        return item.name.trim();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSuggestionsFetchRequested", function (_ref3) {
      var value = _ref3.value;
      var word = checkAndReplace(value);

      if (word) {
        _this.props.getSuggestTags(word.trim());
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onSuggestionsClearRequested", function () {
      _this.props.getSuggestTags('');
    });

    _this.state = {
      word: '',
      isSearch: false
    };
    return _this;
  }

  _createClass(TagFinder, [{
    key: "render",
    value: function render() {
      var _this$state = this.state,
          word = _this$state.word,
          isSearch = _this$state.isSearch;
      var _this$props = this.props,
          getSuggest = _this$props.getSuggest,
          isAdd = _this$props.isAdd;
      var suggestions = getSuggest.tags.length == 0 && isAdd ? [{
        name: word + '...을(를) 새로운 태그로 추가',
        value: word
      }] : getSuggest.tags;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('tagFinderContainer')
      }, !isAdd ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('tagFinderButton', isSearch ? 'tagFinderButton-inactive' : null),
        onClick: this.handleButtonClick
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_5__["FaPlus"], {
        className: cx('tagFinderButtonIcon', isSearch ? 'tagFinderButtonIcon-rotate' : null)
      })) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('tagFinderInput', isSearch || isAdd ? 'tagFinderInput-active' : null)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_autosuggest__WEBPACK_IMPORTED_MODULE_4___default.a, {
        suggestions: suggestions,
        onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
        onSuggestionsClearRequested: this.onSuggestionsClearRequested,
        onSuggestionSelected: this.handleSelect,
        getSuggestionValue: this.getSuggestionValue,
        renderSuggestion: function renderSuggestion(item) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            className: cx('tagSuggenstion')
          }, item.name);
        },
        inputProps: {
          placeholder: '태그 검색',
          onChange: this.handleChange,
          value: word
        },
        theme: _style_AutoSuggest_css__WEBPACK_IMPORTED_MODULE_7___default.a
      })));
    }
  }]);

  return TagFinder;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

TagFinder.defaultProps = {
  getSuggest: {},
  isAdd: false
};
TagFinder.propTypes = {
  getSuggest: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  getSuggestTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  handleAddTag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  isAdd: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    getSuggest: state.tag.getSuggest
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getSuggestTags: function getSuggestTags(word) {
      return dispatch(Object(_actions_tag__WEBPACK_IMPORTED_MODULE_8__["getSuggestTags"])(word));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(TagFinder));

/***/ }),

/***/ "./src/component/TagList.js":
/*!**********************************!*\
  !*** ./src/component/TagList.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_TagList_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../style/TagList.scss */ "./src/style/TagList.scss");
/* harmony import */ var _style_TagList_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_TagList_scss__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_2___default.a.bind(_style_TagList_scss__WEBPACK_IMPORTED_MODULE_3___default.a);

var TagList =
/*#__PURE__*/
function (_Component) {
  _inherits(TagList, _Component);

  function TagList() {
    _classCallCheck(this, TagList);

    return _possibleConstructorReturn(this, _getPrototypeOf(TagList).call(this));
  }

  _createClass(TagList, [{
    key: "handleClick",
    value: function handleClick(tag, isActive, activeIndex) {
      var _this$props = this.props,
          addActiveTag = _this$props.addActiveTag,
          deleteActiveTag = _this$props.deleteActiveTag;

      if (isActive) {
        deleteActiveTag(activeIndex);
      } else {
        addActiveTag(tag);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props2 = this.props,
          activeTags = _this$props2.activeTags,
          showTags = _this$props2.showTags,
          isMobile = _this$props2.isMobile;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('tagListInnerContainer')
      }, showTags.map(function (tag, index) {
        var isActive = false;
        var activeIndex = 0;

        for (var i = 0; i < activeTags.length; ++i) {
          if (activeTags[i] == tag.name) {
            isActive = true;
            activeIndex = i;
            break;
          }
        }

        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: cx(isActive ? 'activeTag' : 'normalTag'),
          onClick: function onClick() {
            return _this.handleClick(tag.name, isActive, activeIndex);
          },
          key: index
        }, tag.name);
      }));
    }
  }]);

  return TagList;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

TagList.defaultProps = {
  isMobile: false,
  activeTags: [],
  showTags: [],
  addActiveTag: function addActiveTag() {
    console.log('TagList props error');
  },
  deleteActiveTag: function deleteActiveTag() {
    console.log('TagList props error');
  }
};
TagList.propTypes = {
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  activeTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  showTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  getRandom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  addActiveTag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  deleteActiveTag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getRandomTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (TagList);

/***/ }),

/***/ "./src/component/index.js":
/*!********************************!*\
  !*** ./src/component/index.js ***!
  \********************************/
/*! exports provided: Header, TagList, TagFinder, FoodInfo, FoodAdd, FoodEdit, Result, Modal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header */ "./src/component/Header.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return _Header__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _TagList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagList */ "./src/component/TagList.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TagList", function() { return _TagList__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _TagFinder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TagFinder */ "./src/component/TagFinder.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TagFinder", function() { return _TagFinder__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _FoodInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FoodInfo */ "./src/component/FoodInfo.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FoodInfo", function() { return _FoodInfo__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _FoodAdd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FoodAdd */ "./src/component/FoodAdd.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FoodAdd", function() { return _FoodAdd__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _FoodEdit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FoodEdit */ "./src/component/FoodEdit.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FoodEdit", function() { return _FoodEdit__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _Result__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Result */ "./src/component/Result.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Result", function() { return _Result__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Modal */ "./src/component/Modal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return _Modal__WEBPACK_IMPORTED_MODULE_7__["default"]; });











/***/ }),

/***/ "./src/container/App.js":
/*!******************************!*\
  !*** ./src/container/App.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../component */ "./src/component/index.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ */ "./src/container/index.js");
/* harmony import */ var _actions_environment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions/environment */ "./src/actions/environment.js");
/* harmony import */ var _style_App_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/App.scss */ "./src/style/App.scss");
/* harmony import */ var _style_App_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_App_scss__WEBPACK_IMPORTED_MODULE_8__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_2___default.a.bind(_style_App_scss__WEBPACK_IMPORTED_MODULE_8___default.a);

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).call(this));
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener('resize', this.props.initEnvironment);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.props.initEnvironment);
    }
  }, {
    key: "render",
    value: function render() {
      var environment = this.props.environment;
      var screenWidth = environment.screenWidth,
          screenHeight = environment.screenHeight,
          isMobile = environment.isMobile;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('mainContainer')
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component__WEBPACK_IMPORTED_MODULE_5__["Header"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_6__["TagPage"], {
        isMobile: isMobile
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(___WEBPACK_IMPORTED_MODULE_6__["ResultPage"], {
        isMobile: isMobile
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_4__["ToastContainer"], {
        position: "bottom-center",
        type: "error",
        autoClose: 3000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true
      }));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

App.defaultProps = {
  environment: {},
  initEnvironment: function initEnvironment() {
    console.log('init Environment props error.');
  }
};
App.propTypes = {
  environment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  initEnvironment: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    environment: state.environment
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    initEnvironment: function initEnvironment() {
      return dispatch(Object(_actions_environment__WEBPACK_IMPORTED_MODULE_7__["initEnvironment"])());
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(App));

/***/ }),

/***/ "./src/container/ResultPage.js":
/*!*************************************!*\
  !*** ./src/container/ResultPage.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-icons/fa */ "./node_modules/react-icons/fa/index.mjs");
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../component */ "./src/component/index.js");
/* harmony import */ var _actions_food__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions/food */ "./src/actions/food.js");
/* harmony import */ var _style_ResultPage_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../style/ResultPage.scss */ "./src/style/ResultPage.scss");
/* harmony import */ var _style_ResultPage_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_style_ResultPage_scss__WEBPACK_IMPORTED_MODULE_7__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_2___default.a.bind(_style_ResultPage_scss__WEBPACK_IMPORTED_MODULE_7___default.a);

var ResultPage =
/*#__PURE__*/
function (_Component) {
  _inherits(ResultPage, _Component);

  function ResultPage() {
    _classCallCheck(this, ResultPage);

    return _possibleConstructorReturn(this, _getPrototypeOf(ResultPage).apply(this, arguments));
  }

  _createClass(ResultPage, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isMobile = _this$props.isMobile,
          activeTags = _this$props.activeTags,
          get = _this$props.get,
          update = _this$props.update,
          post = _this$props.post,
          getByScroll = _this$props.getByScroll,
          getBySearch = _this$props.getBySearch,
          getRandom = _this$props.getRandom,
          getRandomFood = _this$props.getRandomFood,
          getRandomFoodClear = _this$props.getRandomFoodClear,
          getByTags = _this$props.getByTags,
          getFoodsByTags = _this$props.getFoodsByTags,
          getFoodsByScroll = _this$props.getFoodsByScroll,
          getFoodsBySearch = _this$props.getFoodsBySearch,
          postFoods = _this$props.postFoods,
          updateFood = _this$props.updateFood;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, getRandom.status == 'SUCCESS' && !getRandom.isRandom ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('resetTagButton'),
        onClick: getRandomFoodClear
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_icons_fa__WEBPACK_IMPORTED_MODULE_4__["FaAngleDoubleDown"], null)) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component__WEBPACK_IMPORTED_MODULE_5__["Result"], {
        activeTags: activeTags,
        getByTags: getByTags,
        getRandom: getRandom,
        getFoodsByTags: getFoodsByTags,
        getRandomFood: getRandomFood,
        getRandomFoodClear: getRandomFoodClear
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component__WEBPACK_IMPORTED_MODULE_5__["FoodInfo"], {
        isMobile: isMobile,
        update: update,
        updateFood: updateFood,
        getByScroll: getByScroll,
        getBySearch: getBySearch,
        getFoodsByScroll: getFoodsByScroll,
        getFoodsBySearch: getFoodsBySearch
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component__WEBPACK_IMPORTED_MODULE_5__["FoodAdd"], {
        isMobile: isMobile,
        post: post,
        postFoods: postFoods
      }));
    }
  }]);

  return ResultPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

ResultPage.defaultProps = {
  activeTags: [],
  isMobile: false
};
ResultPage.propTypes = {
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  activeTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  post: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  get: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  getRandom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  getByScroll: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  getBySearch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  getByTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  update: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  getFoods: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getRandomFood: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getRandomFoodClear: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getFoodByName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getFoodsByTag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getFoodsByTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getFoodsByScroll: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getFoodsBySearch: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  postFoods: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  updateFood: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    activeTags: state.tag.activeTags,
    post: state.food.post,
    get: state.food.get,
    getRandom: state.food.getRandom,
    getByTags: state.food.getByTags,
    getByScroll: state.food.getByScroll,
    getBySearch: state.food.getBySearch,
    update: state.food.update
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getFoods: function getFoods() {
      return dispatch(Object(_actions_food__WEBPACK_IMPORTED_MODULE_6__["getFoods"])());
    },
    getRandomFood: function getRandomFood(tags) {
      return dispatch(Object(_actions_food__WEBPACK_IMPORTED_MODULE_6__["getRandomFood"])(tags));
    },
    getRandomFoodClear: function getRandomFoodClear() {
      return dispatch(Object(_actions_food__WEBPACK_IMPORTED_MODULE_6__["getRandomFoodClear"])());
    },
    getFoodByName: function getFoodByName(name) {
      return dispatch(Object(_actions_food__WEBPACK_IMPORTED_MODULE_6__["getFoodByName"])(name));
    },
    getFoodsByTag: function getFoodsByTag(tag) {
      return dispatch(Object(_actions_food__WEBPACK_IMPORTED_MODULE_6__["getFoodsByTag"])(tag));
    },
    getFoodsByTags: function getFoodsByTags(tags) {
      return dispatch(Object(_actions_food__WEBPACK_IMPORTED_MODULE_6__["getFoodsByTags"])(tags));
    },
    getFoodsByScroll: function getFoodsByScroll(isInitial, id) {
      return dispatch(Object(_actions_food__WEBPACK_IMPORTED_MODULE_6__["getFoodsByScroll"])(isInitial, id));
    },
    getFoodsBySearch: function getFoodsBySearch(name) {
      return dispatch(Object(_actions_food__WEBPACK_IMPORTED_MODULE_6__["getFoodsBySearch"])(name));
    },
    postFoods: function postFoods(foods) {
      return dispatch(Object(_actions_food__WEBPACK_IMPORTED_MODULE_6__["postFoods"])(foods));
    },
    updateFood: function updateFood(food) {
      return dispatch(Object(_actions_food__WEBPACK_IMPORTED_MODULE_6__["updateFood"])(food));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(ResultPage));

/***/ }),

/***/ "./src/container/TagPage.js":
/*!**********************************!*\
  !*** ./src/container/TagPage.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../component */ "./src/component/index.js");
/* harmony import */ var _actions_tag__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions/tag */ "./src/actions/tag.js");
/* harmony import */ var react_toastify_dist_ReactToastify_min_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify/dist/ReactToastify.min.css */ "./node_modules/react-toastify/dist/ReactToastify.min.css");
/* harmony import */ var react_toastify_dist_ReactToastify_min_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_toastify_dist_ReactToastify_min_css__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _style_TagPage_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../style/TagPage.scss */ "./src/style/TagPage.scss");
/* harmony import */ var _style_TagPage_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_TagPage_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _style_Toast_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../style/Toast.scss */ "./src/style/Toast.scss");
/* harmony import */ var _style_Toast_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_style_Toast_scss__WEBPACK_IMPORTED_MODULE_9__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_2___default.a.bind(_style_TagPage_scss__WEBPACK_IMPORTED_MODULE_8___default.a);

var TagPage =
/*#__PURE__*/
function (_Component) {
  _inherits(TagPage, _Component);

  function TagPage() {
    var _this;

    _classCallCheck(this, TagPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TagPage).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      var getRandomTags = _this.props.getRandomTags;
      getRandomTags(10);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillReceiveProps", function (nextProps) {
      if (_this.props.getRandom !== nextProps.getRandom) {
        if (nextProps.getRandom.status === 'SUCCESS') {
          _this.setState({
            showTags: nextProps.getRandom.tags
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAddTag", function (tag) {
      var showTags = _this.state.showTags;
      var isIn = false;

      for (var i = 0; i < showTags.length; i++) {
        if (showTags[i].name == tag) {
          isIn = true;
          break;
        }
      }

      if (!isIn) {
        _this.setState({
          showTags: [].concat(_toConsumableArray(showTags), [{
            name: tag
          }])
        });

        _this.props.addActiveTag(tag);
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_4__["toast"].error('이미 있는 태그입니다.', {
          className: 'toastContainer'
        });
      }
    });

    _this.state = {
      showTags: []
    };
    return _this;
  }

  _createClass(TagPage, [{
    key: "render",
    value: function render() {
      var showTags = this.state.showTags;
      var _this$props = this.props,
          activeTags = _this$props.activeTags,
          isMobile = _this$props.isMobile,
          getRandom = _this$props.getRandom,
          getFoodRandom = _this$props.getFoodRandom,
          addActiveTag = _this$props.addActiveTag,
          deleteActiveTag = _this$props.deleteActiveTag,
          getRandomTags = _this$props.getRandomTags;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx('tagContainer', getFoodRandom.status !== 'INIT' && getFoodRandom.status !== 'FAILURE' ? 'tagContainer-inactive' : null)
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component__WEBPACK_IMPORTED_MODULE_5__["TagFinder"], {
        handleAddTag: this.handleAddTag
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component__WEBPACK_IMPORTED_MODULE_5__["TagList"], {
        isMobile: isMobile,
        activeTags: activeTags,
        showTags: showTags,
        getRandom: getRandom,
        addActiveTag: addActiveTag,
        deleteActiveTag: deleteActiveTag,
        getRandomTags: getRandomTags,
        postTags: _actions_tag__WEBPACK_IMPORTED_MODULE_6__["postTags"]
      }));
    }
  }]);

  return TagPage;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

TagPage.defaultProps = {
  activeTags: [],
  isMobile: false
};
TagPage.propTypes = {
  activeTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  isMobile: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired,
  getRandom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  getFoodRandom: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  addActiveTag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  deleteActiveTag: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  getRandomTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  postTags: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  return {
    activeTags: state.tag.activeTags,
    getRandom: state.tag.getRandom,
    getFoodRandom: state.food.getRandom
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    addActiveTag: function addActiveTag(tag) {
      return dispatch(Object(_actions_tag__WEBPACK_IMPORTED_MODULE_6__["addActiveTag"])(tag));
    },
    deleteActiveTag: function deleteActiveTag(index) {
      return dispatch(Object(_actions_tag__WEBPACK_IMPORTED_MODULE_6__["deleteActiveTag"])(index));
    },
    getTags: function getTags() {
      return dispatch(Object(_actions_tag__WEBPACK_IMPORTED_MODULE_6__["getTags"])());
    },
    getRandomTags: function getRandomTags(size) {
      return dispatch(Object(_actions_tag__WEBPACK_IMPORTED_MODULE_6__["getRandomTags"])(size));
    },
    postTags: function postTags(tags) {
      return dispatch(Object(_actions_tag__WEBPACK_IMPORTED_MODULE_6__["postTags"])(tags));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(TagPage));

/***/ }),

/***/ "./src/container/index.js":
/*!********************************!*\
  !*** ./src/container/index.js ***!
  \********************************/
/*! exports provided: App, TagPage, ResultPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/container/App.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "App", function() { return _App__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _TagPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TagPage */ "./src/container/TagPage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TagPage", function() { return _TagPage__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _ResultPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ResultPage */ "./src/container/ResultPage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResultPage", function() { return _ResultPage__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _container__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./container */ "./src/container/index.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./store */ "./src/store.js");






react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
  store: Object(_store__WEBPACK_IMPORTED_MODULE_5__["default"])()
}, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
  exact: true,
  path: "/",
  component: _container__WEBPACK_IMPORTED_MODULE_4__["App"]
})))), document.getElementById('root'));

/***/ }),

/***/ "./src/reducers/environment.js":
/*!*************************************!*\
  !*** ./src/reducers/environment.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return environment; });
/* harmony import */ var _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/ActionTypes */ "./src/actions/ActionTypes.js");
/* harmony import */ var react_addons_update__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-addons-update */ "./node_modules/react-addons-update/index.js");
/* harmony import */ var react_addons_update__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_addons_update__WEBPACK_IMPORTED_MODULE_1__);


var initialState = {
  isMobile: window.innerWidth < 1000 ? true : false,
  screenHeight: window.innerHeight,
  screenWidth: window.innerWidth
};
function environment(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_IS_MOBILE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        isMobile: {
          $set: action.isMobile
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["CHANGE_WIDTH_AND_HEIGHT"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        screenHeight: {
          $set: action.screenHeight
        },
        screenWidth: {
          $set: action.screenWidth
        }
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/reducers/food.js":
/*!******************************!*\
  !*** ./src/reducers/food.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return food; });
/* harmony import */ var _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/ActionTypes */ "./src/actions/ActionTypes.js");
/* harmony import */ var react_addons_update__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-addons-update */ "./node_modules/react-addons-update/index.js");
/* harmony import */ var react_addons_update__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_addons_update__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var initialState = {
  get: {
    status: 'INIT',
    foods: [],
    error: '',
    code: 1
  },
  getRandom: {
    status: 'INIT',
    food: {},
    isRandom: false
  },
  getByScroll: {
    status: 'INIT',
    foods: [],
    size: 15,
    isLast: false
  },
  getByName: {
    status: 'INIT',
    food: '',
    error: '',
    code: 1
  },
  getByTag: {
    status: 'INIT',
    foods: [],
    error: '',
    code: 1
  },
  getByTags: {
    status: 'INIT',
    foods: [],
    error: '',
    code: 1
  },
  getBySearch: {
    status: 'INIT',
    foods: [],
    error: '',
    code: 1
  },
  post: {
    status: 'INIT',
    isSaved: false,
    error: '',
    code: 1
  },
  update: {
    status: 'INIT',
    food: {},
    error: '',
    code: 1
  }
};
function food(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        get: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_SUCCESS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        get: {
          status: {
            $set: 'SUCCESS'
          },
          foods: {
            $set: action.foods
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        get: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_FOOD"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getRandom: {
          status: {
            $set: 'WAITING'
          },
          food: {
            $set: {}
          },
          isRandom: {
            $set: false
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_FOOD_SUCCESS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getRandom: {
          status: {
            $set: 'SUCCESS'
          },
          food: {
            $set: action.food
          },
          isRandom: {
            $set: action.isRandom
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_FOOD_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getRandom: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_FOOD_CLEAR"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getRandom: {
          status: {
            $set: 'INIT'
          },
          food: {
            $set: {}
          },
          isRandom: {
            $set: false
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SCROLL"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getByScroll: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SCROLL_SUCCESS"]:
      if (action.isInitial) {
        return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
          getByScroll: {
            status: {
              $set: 'SUCCESS'
            },
            foods: {
              $set: action.foods
            },
            isLast: {
              $set: action.foods < 15
            }
          }
        });
      } else {
        return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
          getByScroll: {
            status: {
              $set: 'SUCCESS'
            },
            foods: {
              $push: action.foods
            },
            isLast: {
              $set: action.foods < 15
            }
          }
        });
      }

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SCROLL_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getByScroll: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOOD_BY_NAME"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getByName: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOOD_BY_NAME_SUCCESS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getByName: {
          status: {
            $set: 'SUCCESS'
          },
          food: {
            $set: action.food
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOOD_BY_NAME_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getByName: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAG"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getByTag: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAG_SUCCESS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getByTag: {
          status: {
            $set: 'SUCCESS'
          },
          foods: {
            $set: action.foods
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAG_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getByTag: {
          status: {
            $set: 'WAITING'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAGS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getByTags: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAGS_SUCCESS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getByTags: {
          status: {
            $set: 'SUCCESS'
          },
          foods: {
            $set: action.foods
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_TAGS_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getByTags: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SEARCH"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getBySearch: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SEARCH_SUCCESS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getBySearch: {
          status: {
            $set: 'SUCCESS'
          },
          foods: {
            $set: action.foods
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_FOODS_BY_SEARCH_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getBySearch: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_FOODS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        post: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_FOODS_SUCCESS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        post: {
          status: {
            $set: 'SUCCESS'
          },
          isSaved: {
            $set: action.isSaved
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_FOODS_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        post: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["UPDATE_FOOD"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        update: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["UPDATE_FOOD_SUCCESS"]:
      var index = -1;

      for (var i = 0; i < state.getByScroll.foods.length; i++) {
        if (state.getByScroll.foods[i]._id === action.food._id) {
          index = i;
          break;
        }
      }

      var searchIndex = -1;

      for (var i = 0; i < state.getBySearch.foods.length; i++) {
        if (state.getBySearch.foods[i]._id === action.food._id) {
          searchIndex = i;
          break;
        }
      }

      if (index >= 0) {
        state = react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
          getByScroll: {
            foods: _defineProperty({}, index, {
              $set: action.food
            })
          }
        });
      }

      if (searchIndex >= 0) {
        state = react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
          getBySearch: {
            foods: _defineProperty({}, index, {
              $set: action.food
            })
          }
        });
      }

      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        update: {
          status: {
            $set: 'SUCCESS'
          },
          food: {
            $set: action.food
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["UPDATE_FOOD_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        update: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tag */ "./src/reducers/tag.js");
/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./food */ "./src/reducers/food.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environment */ "./src/reducers/environment.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");




var appReducers = Object(redux__WEBPACK_IMPORTED_MODULE_3__["combineReducers"])({
  tag: _tag__WEBPACK_IMPORTED_MODULE_0__["default"],
  food: _food__WEBPACK_IMPORTED_MODULE_1__["default"],
  environment: _environment__WEBPACK_IMPORTED_MODULE_2__["default"]
});
/*
const rootReducer = (state, action) => {
  if (action.type === 'AUTH_SIGNOUT') { //reducer가 이걸 거치게 만들어서 signout할 때 state를 모두 없애도록 함.
    state = undefined;
  }

  return appReducers(state, action);
};
*/

/* harmony default export */ __webpack_exports__["default"] = (appReducers);

/***/ }),

/***/ "./src/reducers/tag.js":
/*!*****************************!*\
  !*** ./src/reducers/tag.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return tag; });
/* harmony import */ var _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../actions/ActionTypes */ "./src/actions/ActionTypes.js");
/* harmony import */ var react_addons_update__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-addons-update */ "./node_modules/react-addons-update/index.js");
/* harmony import */ var react_addons_update__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_addons_update__WEBPACK_IMPORTED_MODULE_1__);


var initialState = {
  activeTags: [],
  get: {
    status: 'INIT',
    tags: []
  },
  getRandom: {
    status: 'INIT',
    tags: []
  },
  getSuggest: {
    status: 'INIT',
    tags: []
  },
  post: {
    status: 'INIT',
    isSaved: false
  }
};
function tag(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }

  switch (action.type) {
    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["ADD_ACTIVE_TAG"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        activeTags: {
          $push: [action.tag]
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["DELETE_ACTIVE_TAG"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        activeTags: {
          $splice: [[action.index, 1]]
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_TAGS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        get: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_TAGS_SUCCESS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        get: {
          status: {
            $set: 'SUCCESS'
          },
          tags: {
            $set: action.tags
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_TAGS_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        get: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_TAGS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getRandom: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_TAGS_SUCCESS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getRandom: {
          status: {
            $set: 'SUCCESS'
          },
          tags: {
            $set: action.tags
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_RANDOM_TAGS_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getRandom: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_SUGGEST_TAGS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getSuggest: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_SUGGEST_TAGS_SUCCESS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getSuggest: {
          status: {
            $set: 'SUCCESS'
          },
          tags: {
            $set: action.tags
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["GET_SUGGEST_TAGS_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        getSuggest: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_TAGS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        post: {
          status: {
            $set: 'WAITING'
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_TAGS_SUCCESS"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        post: {
          status: {
            $set: 'SUCCESS'
          },
          isSaved: {
            $set: action.isSaved
          }
        }
      });

    case _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_0__["POST_TAGS_FAILURE"]:
      return react_addons_update__WEBPACK_IMPORTED_MODULE_1___default()(state, {
        post: {
          status: {
            $set: 'FAILURE'
          },
          error: {
            $set: action.error
          },
          code: {
            $set: action.code
          }
        }
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/sagas/environment.js":
/*!**********************************!*\
  !*** ./src/sagas/environment.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rootSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js");
/* harmony import */ var _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/ActionTypes */ "./src/actions/ActionTypes.js");
/* harmony import */ var _actions_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/environment */ "./src/actions/environment.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(handleInitEnvironment),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);





function handleInitEnvironment() {
  var isMobile;
  return regeneratorRuntime.wrap(function handleInitEnvironment$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (false) {}

          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["INIT_ENVIRONMENT"]);

        case 3:
          isMobile = false;

          if (window.innerWidth < 800) {
            isMobile = true;
          } //Dispatch Action - PUT


          _context.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(Object(_actions_environment__WEBPACK_IMPORTED_MODULE_2__["changeIsMobile"])(isMobile));

        case 7:
          _context.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(Object(_actions_environment__WEBPACK_IMPORTED_MODULE_2__["changeWidthAndHeight"])(window.innerWidth, window.innerHeight));

        case 9:
          _context.next = 0;
          break;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleInitEnvironment);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

/***/ }),

/***/ "./src/sagas/food.js":
/*!***************************!*\
  !*** ./src/sagas/food.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rootSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js");
/* harmony import */ var _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/ActionTypes */ "./src/actions/ActionTypes.js");
/* harmony import */ var _actions_food__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/food */ "./src/actions/food.js");
/* harmony import */ var _api_food__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/food */ "./src/api/food.js");
/* harmony import */ var _api_tag__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../api/tag */ "./src/api/tag.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(handleGetFoods),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(handleGetFoodByName),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(handleGetFoodsByTags),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(handleGetFoodsByTag),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(handlePostTags),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(handlePostFoods),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(handleUpdateFood),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(generateFood),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(handleGetRandomFood),
    _marked10 =
/*#__PURE__*/
regeneratorRuntime.mark(handleGetFoodsBySroll),
    _marked11 =
/*#__PURE__*/
regeneratorRuntime.mark(handleGetFoodsBySearch),
    _marked12 =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);






var MAX_RANDOM = 15;

function handleGetFoods() {
  var _ref, res, err;

  return regeneratorRuntime.wrap(function handleGetFoods$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (false) {}

          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["GET_FOODS"]);

        case 3:
          _context.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_food__WEBPACK_IMPORTED_MODULE_3__["getFoods"]);

        case 5:
          _ref = _context.sent;
          res = _ref.res;
          err = _ref.err;

          if (!(res && !err)) {
            _context.next = 13;
            break;
          }

          _context.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodsSuccess"](res.data));

        case 11:
          _context.next = 15;
          break;

        case 13:
          _context.next = 15;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodsFailure"](err.response.data));

        case 15:
          _context.next = 0;
          break;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function handleGetFoodByName() {
  var action, _ref2, _res, _err;

  return regeneratorRuntime.wrap(function handleGetFoodByName$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (false) {}

          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["GET_FOOD_BY_NAME"]);

        case 3:
          action = _context2.sent;
          _context2.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_food__WEBPACK_IMPORTED_MODULE_3__["getFoodByName"], action.name);

        case 6:
          _ref2 = _context2.sent;
          _res = _ref2.res;
          _err = _ref2.err;

          if (!(_res && !_err)) {
            _context2.next = 14;
            break;
          }

          _context2.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodByNameSuccess"](_res.data));

        case 12:
          _context2.next = 16;
          break;

        case 14:
          _context2.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodByNameFailure"](_err.response.data));

        case 16:
          _context2.next = 0;
          break;

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function handleGetFoodsByTags() {
  var action, _ref3, _res2, _err2;

  return regeneratorRuntime.wrap(function handleGetFoodsByTags$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          if (false) {}

          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["GET_FOODS_BY_TAGS"]);

        case 3:
          action = _context3.sent;
          _context3.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_food__WEBPACK_IMPORTED_MODULE_3__["getFoodsByTags"], action.tags);

        case 6:
          _ref3 = _context3.sent;
          _res2 = _ref3.res;
          _err2 = _ref3.err;

          if (!(_res2 && !_err2)) {
            _context3.next = 14;
            break;
          }

          _context3.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodsByTagsSuccess"](_res2.data));

        case 12:
          _context3.next = 16;
          break;

        case 14:
          _context3.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodsByTagsFailure"](_err2.response.data));

        case 16:
          _context3.next = 0;
          break;

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function handleGetFoodsByTag() {
  var action, _ref4, _res3, _err3;

  return regeneratorRuntime.wrap(function handleGetFoodsByTag$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (false) {}

          _context4.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["GET_FOODS_BY_TAG"]);

        case 3:
          action = _context4.sent;
          _context4.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_food__WEBPACK_IMPORTED_MODULE_3__["getFoodsByTag"], action.tag);

        case 6:
          _ref4 = _context4.sent;
          _res3 = _ref4.res;
          _err3 = _ref4.err;

          if (!(_res3 && !_err3)) {
            _context4.next = 14;
            break;
          }

          _context4.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodsByTagSuccess"](_res3.data));

        case 12:
          _context4.next = 16;
          break;

        case 14:
          _context4.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodsByTagFailure"](_err3.response.data));

        case 16:
          _context4.next = 0;
          break;

        case 18:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function handlePostTags(foods) {
  return regeneratorRuntime.wrap(function handlePostTags$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return foods.map(function (food) {
            var tagArr = food.tags.map(function (tag) {
              return {
                name: tag.trim()
              };
            });
            return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_tag__WEBPACK_IMPORTED_MODULE_4__["postTags"], tagArr);
          });

        case 2:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

function handlePostFoods() {
  var action, _ref5, _res4, _err4;

  return regeneratorRuntime.wrap(function handlePostFoods$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (false) {}

          _context6.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["POST_FOODS"]);

        case 3:
          action = _context6.sent;
          _context6.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_food__WEBPACK_IMPORTED_MODULE_3__["postFoods"], action.foods);

        case 6:
          _ref5 = _context6.sent;
          _res4 = _ref5.res;
          _err4 = _ref5.err;

          if (!(_res4 && !_err4)) {
            _context6.next = 16;
            break;
          }

          _context6.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["postFoodsSuccess"](_res4.data));

        case 12:
          _context6.next = 14;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handlePostTags, action.foods);

        case 14:
          _context6.next = 18;
          break;

        case 16:
          _context6.next = 18;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["postFoodsFailure"](_err4.response.data));

        case 18:
          _context6.next = 0;
          break;

        case 20:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, this);
}

function handleUpdateFood() {
  var action, _ref6, _res5, _err5;

  return regeneratorRuntime.wrap(function handleUpdateFood$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (false) {}

          _context7.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["UPDATE_FOOD"]);

        case 3:
          action = _context7.sent;
          _context7.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_food__WEBPACK_IMPORTED_MODULE_3__["updateFood"], action.food);

        case 6:
          _ref6 = _context7.sent;
          _res5 = _ref6.res;
          _err5 = _ref6.err;

          if (!(_res5 && !_err5)) {
            _context7.next = 16;
            break;
          }

          _context7.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["updateFoodSuccess"](_res5.data));

        case 12:
          _context7.next = 14;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handlePostTags, [action.food]);

        case 14:
          _context7.next = 18;
          break;

        case 16:
          _context7.next = 18;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["updateFoodFailure"](_err5.response.data));

        case 18:
          _context7.next = 0;
          break;

        case 20:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, this);
}

function generateFood(foods) {
  var i, isRandom, random;
  return regeneratorRuntime.wrap(function generateFood$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          if (!(foods.length == 0)) {
            _context8.next = 5;
            break;
          }

          _context8.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getRandomFoodFailure"]());

        case 3:
          _context8.next = 21;
          break;

        case 5:
          if (!(foods.length == 1)) {
            _context8.next = 10;
            break;
          }

          _context8.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getRandomFoodSuccess"]({
            food: foods[0]
          }));

        case 8:
          _context8.next = 21;
          break;

        case 10:
          i = 0;

        case 11:
          if (!(i < MAX_RANDOM)) {
            _context8.next = 21;
            break;
          }

          isRandom = i == MAX_RANDOM - 1 ? false : true;
          random = i == MAX_RANDOM - 1 ? Math.floor(Math.random() * foods.length) : i % foods.length;
          _context8.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["delay"], 150);

        case 16:
          _context8.next = 18;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getRandomFoodSuccess"]({
            food: foods[random],
            isRandom: isRandom
          }));

        case 18:
          i++;
          _context8.next = 11;
          break;

        case 21:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8, this);
}

function handleGetRandomFood() {
  var action, _ref7, _res6, _err6;

  return regeneratorRuntime.wrap(function handleGetRandomFood$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          if (false) {}

          _context9.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["GET_RANDOM_FOOD"]);

        case 3:
          action = _context9.sent;
          _context9.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_food__WEBPACK_IMPORTED_MODULE_3__["getFoodsByTags"], action.tags);

        case 6:
          _ref7 = _context9.sent;
          _res6 = _ref7.res;
          _err6 = _ref7.err;

          if (!(_res6 && !_err6)) {
            _context9.next = 14;
            break;
          }

          _context9.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(generateFood, _res6.data.foods);

        case 12:
          _context9.next = 16;
          break;

        case 14:
          _context9.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getRandomFoodFailure"]());

        case 16:
          _context9.next = 0;
          break;

        case 18:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9, this);
}

function handleGetFoodsBySroll() {
  var action, _ref8, _res7, _err7;

  return regeneratorRuntime.wrap(function handleGetFoodsBySroll$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          if (false) {}

          _context10.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["GET_FOODS_BY_SCROLL"]);

        case 3:
          action = _context10.sent;
          _context10.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_food__WEBPACK_IMPORTED_MODULE_3__["getFoodsByScroll"], action.isInitial, action.id);

        case 6:
          _ref8 = _context10.sent;
          _res7 = _ref8.res;
          _err7 = _ref8.err;

          if (!(_res7 && !_err7)) {
            _context10.next = 14;
            break;
          }

          _context10.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodsByScrollSuccess"](_objectSpread({}, _res7.data, {
            isInitial: action.isInitial
          })));

        case 12:
          _context10.next = 16;
          break;

        case 14:
          _context10.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodsByScrollFailure"](_err7.response.data));

        case 16:
          _context10.next = 0;
          break;

        case 18:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10, this);
}

function handleGetFoodsBySearch() {
  var action, _ref9, _res8, _err8;

  return regeneratorRuntime.wrap(function handleGetFoodsBySearch$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          if (false) {}

          _context11.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["GET_FOODS_BY_SEARCH"]);

        case 3:
          action = _context11.sent;
          _context11.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_food__WEBPACK_IMPORTED_MODULE_3__["getFoodsBySearch"], action.name);

        case 6:
          _ref9 = _context11.sent;
          _res8 = _ref9.res;
          _err8 = _ref9.err;

          if (!(_res8 && !_err8)) {
            _context11.next = 14;
            break;
          }

          _context11.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodsBySearchSuccess"](_res8.data));

        case 12:
          _context11.next = 16;
          break;

        case 14:
          _context11.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_food__WEBPACK_IMPORTED_MODULE_2__["getFoodsBySearchFailure"](_err8.response.data));

        case 16:
          _context11.next = 0;
          break;

        case 18:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11, this);
}

function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleGetRandomFood), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleGetFoods), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleGetFoodsBySroll), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleGetFoodByName), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleGetFoodsByTag), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleGetFoodsByTags), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleGetFoodsBySearch), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handlePostFoods), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleUpdateFood)]);

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12, this);
}

/***/ }),

/***/ "./src/sagas/index.js":
/*!****************************!*\
  !*** ./src/sagas/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rootSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js");
/* harmony import */ var _environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environment */ "./src/sagas/environment.js");
/* harmony import */ var _food__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./food */ "./src/sagas/food.js");
/* harmony import */ var _tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tag */ "./src/sagas/tag.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);





function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_environment__WEBPACK_IMPORTED_MODULE_1__["default"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_food__WEBPACK_IMPORTED_MODULE_2__["default"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_tag__WEBPACK_IMPORTED_MODULE_3__["default"])]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/***/ }),

/***/ "./src/sagas/tag.js":
/*!**************************!*\
  !*** ./src/sagas/tag.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rootSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/dist/redux-saga-effects-npm-proxy.esm.js");
/* harmony import */ var _actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/ActionTypes */ "./src/actions/ActionTypes.js");
/* harmony import */ var _actions_tag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions/tag */ "./src/actions/tag.js");
/* harmony import */ var _api_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/tag */ "./src/api/tag.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(handleGetTags),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(handleGetRandomTags),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(runRequestSuggest),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(handleGetSuggestTags),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(handlePostTags),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);






function handleGetTags() {
  var _ref, res, err;

  return regeneratorRuntime.wrap(function handleGetTags$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (false) {}

          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["GET_TAGS"]);

        case 3:
          _context.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_tag__WEBPACK_IMPORTED_MODULE_3__["getTags"]);

        case 5:
          _ref = _context.sent;
          res = _ref.res;
          err = _ref.err;

          if (!(res && !err)) {
            _context.next = 13;
            break;
          }

          _context.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_tag__WEBPACK_IMPORTED_MODULE_2__["getTagsSuccess"](res.data));

        case 11:
          _context.next = 15;
          break;

        case 13:
          _context.next = 15;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_tag__WEBPACK_IMPORTED_MODULE_2__["getTagsFailure"](err.response.data));

        case 15:
          _context.next = 0;
          break;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function handleGetRandomTags() {
  var action, _ref2, _res, _err;

  return regeneratorRuntime.wrap(function handleGetRandomTags$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (false) {}

          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["GET_RANDOM_TAGS"]);

        case 3:
          action = _context2.sent;
          _context2.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_tag__WEBPACK_IMPORTED_MODULE_3__["getRandomTags"], action.size);

        case 6:
          _ref2 = _context2.sent;
          _res = _ref2.res;
          _err = _ref2.err;

          if (!(_res && !_err)) {
            _context2.next = 14;
            break;
          }

          _context2.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_tag__WEBPACK_IMPORTED_MODULE_2__["getRandomTagsSuccess"](_res.data));

        case 12:
          _context2.next = 16;
          break;

        case 14:
          _context2.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_tag__WEBPACK_IMPORTED_MODULE_2__["getRandomTagsFailure"](_err.response.data));

        case 16:
          _context2.next = 0;
          break;

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function runRequestSuggest(word) {
  var _ref3, res, err;

  return regeneratorRuntime.wrap(function runRequestSuggest$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_tag__WEBPACK_IMPORTED_MODULE_3__["getSuggestTags"], word);

        case 2:
          _ref3 = _context3.sent;
          res = _ref3.res;
          err = _ref3.err;

          if (!(res && !err)) {
            _context3.next = 10;
            break;
          }

          _context3.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_tag__WEBPACK_IMPORTED_MODULE_2__["getSuggestTagsSuccess"](res.data));

        case 8:
          _context3.next = 12;
          break;

        case 10:
          _context3.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_tag__WEBPACK_IMPORTED_MODULE_2__["getSuggestTagsFailure"](err.response.data));

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function createLazily() {
  var msec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  var ongoing;
  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2(task) {
      var _len,
          args,
          _key,
          _args5 = arguments;

      return regeneratorRuntime.wrap(function _callee2$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              for (_len = _args5.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = _args5[_key];
              }

              if (ongoing && ongoing.isRunning()) {
                ongoing.cancel();
              }

              _context5.next = 4;
              return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["delay"], msec);

                      case 2:
                        _context4.next = 4;
                        return redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"].apply(void 0, [task].concat(args));

                      case 4:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee, this);
              }));

            case 4:
              ongoing = _context5.sent;

            case 5:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee2, this);
    })
  );
}

function handleGetSuggestTags() {
  var lazily, action;
  return regeneratorRuntime.wrap(function handleGetSuggestTags$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          lazily = createLazily();

        case 1:
          if (false) {}

          _context6.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["GET_SUGGEST_TAGS"]);

        case 4:
          action = _context6.sent;
          _context6.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(lazily, runRequestSuggest, action.word);

        case 7:
          _context6.next = 1;
          break;

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked4, this);
}

function handlePostTags() {
  var action, _ref4, _res2, _err2;

  return regeneratorRuntime.wrap(function handlePostTags$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          if (false) {}

          _context7.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["take"])(_actions_ActionTypes__WEBPACK_IMPORTED_MODULE_1__["POST_TAGS"]);

        case 3:
          action = _context7.sent;
          _context7.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(_api_tag__WEBPACK_IMPORTED_MODULE_3__["postTags"], action.tags);

        case 6:
          _ref4 = _context7.sent;
          _res2 = _ref4.res;
          _err2 = _ref4.err;

          if (!(_res2 && !_err2)) {
            _context7.next = 14;
            break;
          }

          _context7.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_tag__WEBPACK_IMPORTED_MODULE_2__["postTagsSuccess"](_res2.data));

        case 12:
          _context7.next = 16;
          break;

        case 14:
          _context7.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])(_actions_tag__WEBPACK_IMPORTED_MODULE_2__["postTagsFailure"](_err2.response.data));

        case 16:
          _context7.next = 0;
          break;

        case 18:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked5, this);
}

function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleGetTags), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleGetRandomTags), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handleGetSuggestTags), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(handlePostTags)]);

        case 2:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked6, this);
}

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return configureStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/dist/redux-saga-core-npm-proxy.esm.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducers */ "./src/reducers/index.js");
/* harmony import */ var _sagas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sagas */ "./src/sagas/index.js");




function configureStore(initialState) {
  var sagaMiddleware = Object(redux_saga__WEBPACK_IMPORTED_MODULE_1__["default"])();
  var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_2__["default"], initialState, Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(sagaMiddleware));
  sagaMiddleware.run(_sagas__WEBPACK_IMPORTED_MODULE_3__["default"]);
  return store;
}

/***/ }),

/***/ "./src/style/App.scss":
/*!****************************!*\
  !*** ./src/style/App.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/App.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/App.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/App.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/AutoSuggest.css":
/*!***********************************!*\
  !*** ./src/style/AutoSuggest.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js?modules&importLoaders=true&localIdentName=[name]__[local]___[hash:base64:5]!./AutoSuggest.css */ "./node_modules/css-loader/dist/cjs.js?modules&importLoaders=true&localIdentName=[name]__[local]___[hash:base64:5]!./src/style/AutoSuggest.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js?modules&importLoaders=true&localIdentName=[name]__[local]___[hash:base64:5]!./AutoSuggest.css */ "./node_modules/css-loader/dist/cjs.js?modules&importLoaders=true&localIdentName=[name]__[local]___[hash:base64:5]!./src/style/AutoSuggest.css", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js?modules&importLoaders=true&localIdentName=[name]__[local]___[hash:base64:5]!./AutoSuggest.css */ "./node_modules/css-loader/dist/cjs.js?modules&importLoaders=true&localIdentName=[name]__[local]___[hash:base64:5]!./src/style/AutoSuggest.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/FoodAdd.scss":
/*!********************************!*\
  !*** ./src/style/FoodAdd.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FoodAdd.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodAdd.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FoodAdd.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodAdd.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FoodAdd.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodAdd.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/FoodEdit.scss":
/*!*********************************!*\
  !*** ./src/style/FoodEdit.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FoodEdit.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodEdit.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FoodEdit.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodEdit.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FoodEdit.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodEdit.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/FoodInfo.scss":
/*!*********************************!*\
  !*** ./src/style/FoodInfo.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FoodInfo.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodInfo.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FoodInfo.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodInfo.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./FoodInfo.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/FoodInfo.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/Header.scss":
/*!*******************************!*\
  !*** ./src/style/Header.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Header.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Header.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Header.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Header.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Header.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Header.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/Modal.scss":
/*!******************************!*\
  !*** ./src/style/Modal.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Modal.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Modal.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Modal.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Modal.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Modal.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Modal.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/Result.scss":
/*!*******************************!*\
  !*** ./src/style/Result.scss ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Result.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Result.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Result.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Result.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Result.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Result.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/ResultPage.scss":
/*!***********************************!*\
  !*** ./src/style/ResultPage.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ResultPage.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/ResultPage.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ResultPage.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/ResultPage.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./ResultPage.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/ResultPage.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/TagFinder.scss":
/*!**********************************!*\
  !*** ./src/style/TagFinder.scss ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./TagFinder.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagFinder.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./TagFinder.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagFinder.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./TagFinder.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagFinder.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/TagList.scss":
/*!********************************!*\
  !*** ./src/style/TagList.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./TagList.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagList.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./TagList.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagList.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./TagList.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagList.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/TagPage.scss":
/*!********************************!*\
  !*** ./src/style/TagPage.scss ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./TagPage.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagPage.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./TagPage.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagPage.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./TagPage.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/TagPage.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/style/Toast.scss":
/*!******************************!*\
  !*** ./src/style/Toast.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Toast.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Toast.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Toast.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Toast.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--8-1!../../node_modules/sass-loader/lib/loader.js??ref--8-2!./Toast.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/style/Toast.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/index.js */"./src/index.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL0FwcC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9Gb29kQWRkLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL0Zvb2RFZGl0LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL0Zvb2RJbmZvLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL0hlYWRlci5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9Nb2RhbC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9SZXN1bHQuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvUmVzdWx0UGFnZS5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9UYWdGaW5kZXIuc2NzcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvVGFnTGlzdC5zY3NzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9UYWdQYWdlLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL1RvYXN0LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL0F1dG9TdWdnZXN0LmNzcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9BY3Rpb25UeXBlcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9lbnZpcm9ubWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYWN0aW9ucy9mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9hY3Rpb25zL3RhZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvYXBpL2Zvb2QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwaS90YWcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC9Gb29kQWRkLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnQvRm9vZEVkaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC9Gb29kSW5mby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50L0hlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50L01vZGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnQvUmVzdWx0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnQvVGFnRmluZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnQvVGFnTGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXIvQXBwLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250YWluZXIvUmVzdWx0UGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGFpbmVyL1RhZ1BhZ2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlZHVjZXJzL2Vudmlyb25tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1Y2Vycy9mb29kLmpzIiwid2VicGFjazovLy8uL3NyYy9yZWR1Y2Vycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVkdWNlcnMvdGFnLmpzIiwid2VicGFjazovLy8uL3NyYy9zYWdhcy9lbnZpcm9ubWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2FnYXMvZm9vZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2FnYXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NhZ2FzL3RhZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL0FwcC5zY3NzPzc4OGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL0F1dG9TdWdnZXN0LmNzcz80MTIzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9Gb29kQWRkLnNjc3M/ZWI3MCIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvRm9vZEVkaXQuc2Nzcz84NmQ5Iiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9Gb29kSW5mby5zY3NzPzlkMzciLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL0hlYWRlci5zY3NzPzg4NzgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL01vZGFsLnNjc3M/OGUzZSIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvUmVzdWx0LnNjc3M/MjhiOCIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvUmVzdWx0UGFnZS5zY3NzP2Q3ZTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL1RhZ0ZpbmRlci5zY3NzPzBjMWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0eWxlL1RhZ0xpc3Quc2Nzcz84MmJlIiwid2VicGFjazovLy8uL3NyYy9zdHlsZS9UYWdQYWdlLnNjc3M/NzY0YyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGUvVG9hc3Quc2Nzcz9iMTVlIl0sIm5hbWVzIjpbIkdFVF9GT09EUyIsIkdFVF9GT09EU19TVUNDRVNTIiwiR0VUX0ZPT0RTX0ZBSUxVUkUiLCJHRVRfUkFORE9NX0ZPT0RfQ0xFQVIiLCJHRVRfUkFORE9NX0ZPT0QiLCJHRVRfUkFORE9NX0ZPT0RfU1VDQ0VTUyIsIkdFVF9SQU5ET01fRk9PRF9GQUlMVVJFIiwiR0VUX0ZPT0RTX0JZX1NDUk9MTCIsIkdFVF9GT09EU19CWV9TQ1JPTExfU1VDQ0VTUyIsIkdFVF9GT09EU19CWV9TQ1JPTExfRkFJTFVSRSIsIkdFVF9GT09EX0JZX05BTUUiLCJHRVRfRk9PRF9CWV9OQU1FX1NVQ0NFU1MiLCJHRVRfRk9PRF9CWV9OQU1FX0ZBSUxVUkUiLCJHRVRfRk9PRFNfQllfVEFHUyIsIkdFVF9GT09EU19CWV9UQUdTX1NVQ0NFU1MiLCJHRVRfRk9PRFNfQllfVEFHU19GQUlMVVJFIiwiR0VUX0ZPT0RTX0JZX1RBRyIsIkdFVF9GT09EU19CWV9UQUdfU1VDQ0VTUyIsIkdFVF9GT09EU19CWV9UQUdfRkFJTFVSRSIsIkdFVF9GT09EU19CWV9TRUFSQ0giLCJHRVRfRk9PRFNfQllfU0VBUkNIX1NVQ0NFU1MiLCJHRVRfRk9PRFNfQllfU0VBUkNIX0ZBSUxVUkUiLCJQT1NUX0ZPT0RTIiwiUE9TVF9GT09EU19TVUNDRVNTIiwiUE9TVF9GT09EU19GQUlMVVJFIiwiVVBEQVRFX0ZPT0QiLCJVUERBVEVfRk9PRF9TVUNDRVNTIiwiVVBEQVRFX0ZPT0RfRkFJTFVSRSIsIkdFVF9UQUdTIiwiR0VUX1RBR1NfU1VDQ0VTUyIsIkdFVF9UQUdTX0ZBSUxVUkUiLCJHRVRfUkFORE9NX1RBR1MiLCJHRVRfUkFORE9NX1RBR1NfU1VDQ0VTUyIsIkdFVF9SQU5ET01fVEFHU19GQUlMVVJFIiwiR0VUX1NVR0dFU1RfVEFHUyIsIkdFVF9TVUdHRVNUX1RBR1NfU1VDQ0VTUyIsIkdFVF9TVUdHRVNUX1RBR1NfRkFJTFVSRSIsIlBPU1RfVEFHUyIsIlBPU1RfVEFHU19TVUNDRVNTIiwiUE9TVF9UQUdTX0ZBSUxVUkUiLCJDSEFOR0VfSVNfTU9CSUxFIiwiQ0hBTkdFX1dJRFRIX0FORF9IRUlHSFQiLCJJTklUX0VOVklST05NRU5UIiwiQUREX0FDVElWRV9UQUciLCJERUxFVEVfQUNUSVZFX1RBRyIsImNoYW5nZUlzTW9iaWxlIiwiaXNNb2JpbGUiLCJ0eXBlIiwiY2hhbmdlV2lkdGhBbmRIZWlnaHQiLCJzY3JlZW5XaWR0aCIsInNjcmVlbkhlaWdodCIsImluaXRFbnZpcm9ubWVudCIsImdldFJhbmRvbUZvb2QiLCJ0YWdzIiwiZ2V0UmFuZG9tRm9vZFN1Y2Nlc3MiLCJkYXRhIiwiZ2V0UmFuZG9tRm9vZEZhaWx1cmUiLCJlcnJvciIsImdldFJhbmRvbUZvb2RDbGVhciIsImdldEZvb2RzIiwiZ2V0Rm9vZHNTdWNjZXNzIiwiZ2V0Rm9vZHNGYWlsdXJlIiwiZ2V0Rm9vZHNCeVNjcm9sbCIsImlzSW5pdGlhbCIsImlkIiwiZ2V0Rm9vZHNCeVNjcm9sbFN1Y2Nlc3MiLCJnZXRGb29kc0J5U2Nyb2xsRmFpbHVyZSIsImdldEZvb2RCeU5hbWUiLCJuYW1lIiwiZ2V0Rm9vZEJ5TmFtZVN1Y2Nlc3MiLCJnZXRGb29kQnlOYW1lRmFpbHVyZSIsImdldEZvb2RzQnlUYWciLCJ0YWciLCJnZXRGb29kc0J5VGFnU3VjY2VzcyIsImdldEZvb2RzQnlUYWdGYWlsdXJlIiwiZ2V0Rm9vZHNCeVRhZ3MiLCJnZXRGb29kc0J5VGFnc1N1Y2Nlc3MiLCJnZXRGb29kc0J5VGFnc0ZhaWx1cmUiLCJnZXRGb29kc0J5U2VhcmNoIiwiZ2V0Rm9vZHNCeVNlYXJjaFN1Y2Nlc3MiLCJnZXRGb29kc0J5U2VhcmNoRmFpbHVyZSIsInBvc3RGb29kcyIsImZvb2RzIiwicG9zdEZvb2RzU3VjY2VzcyIsInBvc3RGb29kc0ZhaWx1cmUiLCJ1cGRhdGVGb29kIiwiZm9vZCIsInVwZGF0ZUZvb2RTdWNjZXNzIiwidXBkYXRlRm9vZEZhaWx1cmUiLCJhZGRBY3RpdmVUYWciLCJkZWxldGVBY3RpdmVUYWciLCJpbmRleCIsImdldFRhZ3MiLCJnZXRUYWdzU3VjY2VzcyIsImdldFRhZ3NGYWlsdXJlIiwiZ2V0UmFuZG9tVGFncyIsInNpemUiLCJnZXRSYW5kb21UYWdzU3VjY2VzcyIsImdldFJhbmRvbVRhZ3NGYWlsdXJlIiwiZ2V0U3VnZ2VzdFRhZ3MiLCJ3b3JkIiwiZ2V0U3VnZ2VzdFRhZ3NTdWNjZXNzIiwiZ2V0U3VnZ2VzdFRhZ3NGYWlsdXJlIiwicG9zdFRhZ3MiLCJwb3N0VGFnc1N1Y2Nlc3MiLCJwb3N0VGFnc0ZhaWx1cmUiLCJ1cmwiLCJheGlvcyIsImdldCIsInRoZW4iLCJyZXMiLCJjYXRjaCIsImVyciIsInNjcm9sbFVybCIsInBvc3QiLCJwdXQiLCJjeCIsImNsYXNzTmFtZXMiLCJiaW5kIiwic3R5bGVzIiwicmUiLCJjaGVja0FuZFJlcGxhY2UiLCJ2YWx1ZSIsImhhc1NwZWNpYWwiLCJ0ZXN0IiwicmVwbGFjZSIsIkZvb2RBZGQiLCJuZXh0UHJvcHMiLCJwcm9wcyIsInN0YXR1cyIsInRvYXN0IiwiaW5mbyIsImNsYXNzTmFtZSIsInNldFN0YXRlIiwib3BlbiIsImNvZGUiLCJlIiwidGFyZ2V0Iiwid29yZFZhbGlkIiwic3RhdGUiLCJpc0luIiwiaSIsImxlbmd0aCIsInNsaWNlIiwidHJpbSIsImhhbmRsZVRvZ2dsZU1vZGFsIiwiaGFuZGxlQ2hhbmdlIiwibWFyZ2luVG9wIiwiaGFuZGxlQWRkVGFnIiwibWFwIiwiaGFuZGxlRGVsZXRlVGFnIiwiaGFuZGxlQWRkRm9vZCIsIkNvbXBvbmVudCIsInByb3BUeXBlcyIsIlByb3BUeXBlcyIsImJvb2wiLCJvYmplY3QiLCJpc1JlcXVpcmVkIiwiZnVuYyIsIkZvb2RFZGl0IiwiX2lkIiwidXBkYXRlIiwiaGFuZGxlRWRpdEZvb2QiLCJkZWZhdWx0UHJvcHMiLCJGb29kSW5mbyIsInNlYXJjaFdvcmQiLCJpc1NlYXJjaGluZyIsImtleSIsImhhbmRsZVNlYXJjaCIsInNjcm9sbCIsInByZXZpb3VzUG9zaXRpb24iLCJnZXRCeVNjcm9sbCIsImlzTGFzdCIsImVkaXRPcGVuIiwiZWRpdEZvb2QiLCJoYW5kbGVUb2dnbGVFZGl0TW9kYWwiLCJnZXRCeVNlYXJjaCIsImhhbmRsZVByZXNzIiwicmVuZGVyRm9vZEluZm9MaXN0IiwiaGFuZGxlU2Nyb2xsTW9yZSIsIkhlYWRlciIsIk1vZGFsIiwicHJldlByb3BzIiwicHJldlN0YXRlIiwiZWwiLCJSZWFjdERPTSIsImZpbmRET01Ob2RlIiwiY29udGVudCIsInNjcm9sbFRvcCIsImRpc3BsYXkiLCJzZXRUaW1lb3V0Iiwic2hvdyIsImhlYWRlciIsImNoaWxkcmVuIiwid2lkdGgiLCJoZWlnaHQiLCJyZWYiLCJzdHJpbmciLCJub2RlIiwiUmVzdWx0IiwiYWN0aXZlVGFncyIsImdldFJhbmRvbSIsImlzUmFuZG9tIiwiaGFuZGxlU3RhcnQiLCJhcnJheSIsImdldEJ5VGFncyIsIlRhZ0ZpbmRlciIsIm5ld1ZhbHVlIiwic3VnZ2VzdGlvbiIsImlzQWRkIiwiaXNTZWFyY2giLCJpdGVtIiwiZ2V0U3VnZ2VzdCIsInN1Z2dlc3Rpb25zIiwiaGFuZGxlQnV0dG9uQ2xpY2siLCJvblN1Z2dlc3Rpb25zRmV0Y2hSZXF1ZXN0ZWQiLCJvblN1Z2dlc3Rpb25zQ2xlYXJSZXF1ZXN0ZWQiLCJoYW5kbGVTZWxlY3QiLCJnZXRTdWdnZXN0aW9uVmFsdWUiLCJwbGFjZWhvbGRlciIsIm9uQ2hhbmdlIiwidGhlbWUiLCJtYXBTdGF0ZVRvUHJvcHMiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsImNvbm5lY3QiLCJUYWdMaXN0IiwiaXNBY3RpdmUiLCJhY3RpdmVJbmRleCIsInNob3dUYWdzIiwiaGFuZGxlQ2xpY2siLCJjb25zb2xlIiwibG9nIiwiQXBwIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJlbnZpcm9ubWVudCIsIlJlc3VsdFBhZ2UiLCJUYWdQYWdlIiwiZ2V0Rm9vZFJhbmRvbSIsInJlbmRlciIsImNvbmZpZ3VyZVN0b3JlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImluaXRpYWxTdGF0ZSIsImlubmVyV2lkdGgiLCJpbm5lckhlaWdodCIsImFjdGlvbiIsInR5cGVzIiwiJHNldCIsImdldEJ5TmFtZSIsImdldEJ5VGFnIiwiaXNTYXZlZCIsIiRwdXNoIiwic2VhcmNoSW5kZXgiLCJhcHBSZWR1Y2VycyIsImNvbWJpbmVSZWR1Y2VycyIsIiRzcGxpY2UiLCJoYW5kbGVJbml0RW52aXJvbm1lbnQiLCJyb290U2FnYSIsInRha2UiLCJmb3JrIiwiaGFuZGxlR2V0Rm9vZHMiLCJoYW5kbGVHZXRGb29kQnlOYW1lIiwiaGFuZGxlR2V0Rm9vZHNCeVRhZ3MiLCJoYW5kbGVHZXRGb29kc0J5VGFnIiwiaGFuZGxlUG9zdFRhZ3MiLCJoYW5kbGVQb3N0Rm9vZHMiLCJoYW5kbGVVcGRhdGVGb29kIiwiZ2VuZXJhdGVGb29kIiwiaGFuZGxlR2V0UmFuZG9tRm9vZCIsImhhbmRsZUdldEZvb2RzQnlTcm9sbCIsImhhbmRsZUdldEZvb2RzQnlTZWFyY2giLCJNQVhfUkFORE9NIiwiY2FsbCIsImFwaSIsImFjdGlvbnMiLCJyZXNwb25zZSIsInRhZ0FyciIsInJhbmRvbSIsIk1hdGgiLCJmbG9vciIsImRlbGF5IiwiYWxsIiwiaGFuZGxlR2V0VGFncyIsImhhbmRsZUdldFJhbmRvbVRhZ3MiLCJydW5SZXF1ZXN0U3VnZ2VzdCIsImhhbmRsZUdldFN1Z2dlc3RUYWdzIiwiY3JlYXRlTGF6aWx5IiwibXNlYyIsIm9uZ29pbmciLCJ0YXNrIiwiYXJncyIsImlzUnVubmluZyIsImNhbmNlbCIsImxhemlseSIsInNhZ2FNaWRkbGV3YXJlIiwiY3JlYXRlU2FnYU1pZGRsZXdhcmUiLCJzdG9yZSIsImNyZWF0ZVN0b3JlIiwicmVkdWNlciIsImFwcGx5TWlkZGxld2FyZSIsInJ1biJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQVEsb0JBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLDRCQUE0QjtBQUM3QztBQUNBO0FBQ0EsMEJBQWtCLDJCQUEyQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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O0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0EsRUFBRTs7QUFFRixnQ0FBZ0MsVUFBVSxFQUFFO0FBQzVDLEMiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBpbnN0YWxsIGEgSlNPTlAgY2FsbGJhY2sgZm9yIGNodW5rIGxvYWRpbmdcbiBcdGZ1bmN0aW9uIHdlYnBhY2tKc29ucENhbGxiYWNrKGRhdGEpIHtcbiBcdFx0dmFyIGNodW5rSWRzID0gZGF0YVswXTtcbiBcdFx0dmFyIG1vcmVNb2R1bGVzID0gZGF0YVsxXTtcbiBcdFx0dmFyIGV4ZWN1dGVNb2R1bGVzID0gZGF0YVsyXTtcblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0XHQvLyBhZGQgZW50cnkgbW9kdWxlcyBmcm9tIGxvYWRlZCBjaHVuayB0byBkZWZlcnJlZCBsaXN0XG4gXHRcdGRlZmVycmVkTW9kdWxlcy5wdXNoLmFwcGx5KGRlZmVycmVkTW9kdWxlcywgZXhlY3V0ZU1vZHVsZXMgfHwgW10pO1xuXG4gXHRcdC8vIHJ1biBkZWZlcnJlZCBtb2R1bGVzIHdoZW4gYWxsIGNodW5rcyByZWFkeVxuIFx0XHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiBcdH07XG4gXHRmdW5jdGlvbiBjaGVja0RlZmVycmVkTW9kdWxlcygpIHtcbiBcdFx0dmFyIHJlc3VsdDtcbiBcdFx0Zm9yKHZhciBpID0gMDsgaSA8IGRlZmVycmVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdHZhciBkZWZlcnJlZE1vZHVsZSA9IGRlZmVycmVkTW9kdWxlc1tpXTtcbiBcdFx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcbiBcdFx0XHRmb3IodmFyIGogPSAxOyBqIDwgZGVmZXJyZWRNb2R1bGUubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBkZXBJZCA9IGRlZmVycmVkTW9kdWxlW2pdO1xuIFx0XHRcdFx0aWYoaW5zdGFsbGVkQ2h1bmtzW2RlcElkXSAhPT0gMCkgZnVsZmlsbGVkID0gZmFsc2U7XG4gXHRcdFx0fVxuIFx0XHRcdGlmKGZ1bGZpbGxlZCkge1xuIFx0XHRcdFx0ZGVmZXJyZWRNb2R1bGVzLnNwbGljZShpLS0sIDEpO1xuIFx0XHRcdFx0cmVzdWx0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBkZWZlcnJlZE1vZHVsZVswXSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdHJldHVybiByZXN1bHQ7XG4gXHR9XG4gXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuIFx0XHRzY3JpcHQuY2hhcnNldCA9IFwidXRmLThcIjtcbiBcdFx0c2NyaXB0LnNyYyA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBob3RDdXJyZW50SGFzaCArIFwiLmhvdC11cGRhdGUuanNcIjtcbiBcdFx0aWYgKG51bGwpIHNjcmlwdC5jcm9zc09yaWdpbiA9IG51bGw7XG4gXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3REb3dubG9hZE1hbmlmZXN0KHJlcXVlc3RUaW1lb3V0KSB7XG4gXHRcdHJlcXVlc3RUaW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQgfHwgMTAwMDA7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiBcdFx0XHRpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydFwiKSk7XG4gXHRcdFx0fVxuIFx0XHRcdHRyeSB7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuIFx0XHRcdFx0dmFyIHJlcXVlc3RQYXRoID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgXCJcIiArIGhvdEN1cnJlbnRIYXNoICsgXCIuaG90LXVwZGF0ZS5qc29uXCI7XG4gXHRcdFx0XHRyZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgcmVxdWVzdFBhdGgsIHRydWUpO1xuIFx0XHRcdFx0cmVxdWVzdC50aW1lb3V0ID0gcmVxdWVzdFRpbWVvdXQ7XG4gXHRcdFx0XHRyZXF1ZXN0LnNlbmQobnVsbCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRyZXR1cm4gcmVqZWN0KGVycik7XG4gXHRcdFx0fVxuIFx0XHRcdHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0KSByZXR1cm47XG4gXHRcdFx0XHRpZiAocmVxdWVzdC5zdGF0dXMgPT09IDApIHtcbiBcdFx0XHRcdFx0Ly8gdGltZW91dFxuIFx0XHRcdFx0XHRyZWplY3QoXG4gXHRcdFx0XHRcdFx0bmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgdGltZWQgb3V0LlwiKVxuIFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gNDA0KSB7XG4gXHRcdFx0XHRcdC8vIG5vIHVwZGF0ZSBhdmFpbGFibGVcbiBcdFx0XHRcdFx0cmVzb2x2ZSgpO1xuIFx0XHRcdFx0fSBlbHNlIGlmIChyZXF1ZXN0LnN0YXR1cyAhPT0gMjAwICYmIHJlcXVlc3Quc3RhdHVzICE9PSAzMDQpIHtcbiBcdFx0XHRcdFx0Ly8gb3RoZXIgZmFpbHVyZVxuIFx0XHRcdFx0XHRyZWplY3QobmV3IEVycm9yKFwiTWFuaWZlc3QgcmVxdWVzdCB0byBcIiArIHJlcXVlc3RQYXRoICsgXCIgZmFpbGVkLlwiKSk7XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHQvLyBzdWNjZXNzXG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0dmFyIHVwZGF0ZSA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlKSB7XG4gXHRcdFx0XHRcdFx0cmVqZWN0KGUpO1xuIFx0XHRcdFx0XHRcdHJldHVybjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRyZXNvbHZlKHVwZGF0ZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fSk7XG4gXHR9XG5cbiBcdHZhciBob3RBcHBseU9uVXBkYXRlID0gdHJ1ZTtcbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCI1ZmI4YTE0NDMzYzEzN2JlZTVhOFwiO1xuIFx0dmFyIGhvdFJlcXVlc3RUaW1lb3V0ID0gMTAwMDA7XG4gXHR2YXIgaG90Q3VycmVudE1vZHVsZURhdGEgPSB7fTtcbiBcdHZhciBob3RDdXJyZW50Q2hpbGRNb2R1bGU7XG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50cyA9IFtdO1xuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90Q3VycmVudFBhcmVudHNUZW1wID0gW107XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0aWYgKCFtZSkgcmV0dXJuIF9fd2VicGFja19yZXF1aXJlX187XG4gXHRcdHZhciBmbiA9IGZ1bmN0aW9uKHJlcXVlc3QpIHtcbiBcdFx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuIFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcbiBcdFx0XHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0ucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMucHVzaChtb2R1bGVJZCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuIFx0XHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcbiBcdFx0XHRcdFx0XHRyZXF1ZXN0ICtcbiBcdFx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuIFx0XHRcdFx0XHRcdG1vZHVsZUlkXG4gXHRcdFx0XHQpO1xuIFx0XHRcdFx0aG90Q3VycmVudFBhcmVudHMgPSBbXTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ocmVxdWVzdCk7XG4gXHRcdH07XG4gXHRcdHZhciBPYmplY3RGYWN0b3J5ID0gZnVuY3Rpb24gT2JqZWN0RmFjdG9yeShuYW1lKSB7XG4gXHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfX1tuYW1lXTtcbiBcdFx0XHRcdH0sXG4gXHRcdFx0XHRzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX19bbmFtZV0gPSB2YWx1ZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9O1xuIFx0XHRmb3IgKHZhciBuYW1lIGluIF9fd2VicGFja19yZXF1aXJlX18pIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoX193ZWJwYWNrX3JlcXVpcmVfXywgbmFtZSkgJiZcbiBcdFx0XHRcdG5hbWUgIT09IFwiZVwiICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcInRcIlxuIFx0XHRcdCkge1xuIFx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBPYmplY3RGYWN0b3J5KG5hbWUpKTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0Zm4uZSA9IGZ1bmN0aW9uKGNodW5rSWQpIHtcbiBcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInJlYWR5XCIpIGhvdFNldFN0YXR1cyhcInByZXBhcmVcIik7XG4gXHRcdFx0aG90Q2h1bmtzTG9hZGluZysrO1xuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLmUoY2h1bmtJZCkudGhlbihmaW5pc2hDaHVua0xvYWRpbmcsIGZ1bmN0aW9uKGVycikge1xuIFx0XHRcdFx0ZmluaXNoQ2h1bmtMb2FkaW5nKCk7XG4gXHRcdFx0XHR0aHJvdyBlcnI7XG4gXHRcdFx0fSk7XG5cbiBcdFx0XHRmdW5jdGlvbiBmaW5pc2hDaHVua0xvYWRpbmcoKSB7XG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nLS07XG4gXHRcdFx0XHRpZiAoaG90U3RhdHVzID09PSBcInByZXBhcmVcIikge1xuIFx0XHRcdFx0XHRpZiAoIWhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChob3RDaHVua3NMb2FkaW5nID09PSAwICYmIGhvdFdhaXRpbmdGaWxlcyA9PT0gMCkge1xuIFx0XHRcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fTtcbiBcdFx0Zm4udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdFx0aWYgKG1vZGUgJiAxKSB2YWx1ZSA9IGZuKHZhbHVlKTtcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy50KHZhbHVlLCBtb2RlICYgfjEpO1xuIFx0XHR9O1xuIFx0XHRyZXR1cm4gZm47XG4gXHR9XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90Q3JlYXRlTW9kdWxlKG1vZHVsZUlkKSB7XG4gXHRcdHZhciBob3QgPSB7XG4gXHRcdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuIFx0XHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcbiBcdFx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcbiBcdFx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcbiBcdFx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcbiBcdFx0XHRfbWFpbjogaG90Q3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZCxcblxuIFx0XHRcdC8vIE1vZHVsZSBBUElcbiBcdFx0XHRhY3RpdmU6IHRydWUsXG4gXHRcdFx0YWNjZXB0OiBmdW5jdGlvbihkZXAsIGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIpXG4gXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuIFx0XHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG4gXHRcdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG4gXHRcdFx0fSxcbiBcdFx0XHRkaXNwb3NlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGREaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuIFx0XHRcdGNoZWNrOiBob3RDaGVjayxcbiBcdFx0XHRhcHBseTogaG90QXBwbHksXG4gXHRcdFx0c3RhdHVzOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRpZiAoIWwpIHJldHVybiBob3RTdGF0dXM7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0aG90U3RhdHVzSGFuZGxlcnMucHVzaChsKTtcbiBcdFx0XHR9LFxuIFx0XHRcdHJlbW92ZVN0YXR1c0hhbmRsZXI6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3RTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuIFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBob3RTdGF0dXNIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHR9LFxuXG4gXHRcdFx0Ly9pbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG4gXHRcdFx0ZGF0YTogaG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG4gXHRcdH07XG4gXHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcbiBcdFx0cmV0dXJuIGhvdDtcbiBcdH1cblxuIFx0dmFyIGhvdFN0YXR1c0hhbmRsZXJzID0gW107XG4gXHR2YXIgaG90U3RhdHVzID0gXCJpZGxlXCI7XG5cbiBcdGZ1bmN0aW9uIGhvdFNldFN0YXR1cyhuZXdTdGF0dXMpIHtcbiBcdFx0aG90U3RhdHVzID0gbmV3U3RhdHVzO1xuIFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGhvdFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuIFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzW2ldLmNhbGwobnVsbCwgbmV3U3RhdHVzKTtcbiBcdH1cblxuIFx0Ly8gd2hpbGUgZG93bmxvYWRpbmdcbiBcdHZhciBob3RXYWl0aW5nRmlsZXMgPSAwO1xuIFx0dmFyIGhvdENodW5rc0xvYWRpbmcgPSAwO1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90QXZhaWxhYmxlRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3REZWZlcnJlZDtcblxuIFx0Ly8gVGhlIHVwZGF0ZSBpbmZvXG4gXHR2YXIgaG90VXBkYXRlLCBob3RVcGRhdGVOZXdIYXNoO1xuXG4gXHRmdW5jdGlvbiB0b01vZHVsZUlkKGlkKSB7XG4gXHRcdHZhciBpc051bWJlciA9ICtpZCArIFwiXCIgPT09IGlkO1xuIFx0XHRyZXR1cm4gaXNOdW1iZXIgPyAraWQgOiBpZDtcbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90Q2hlY2soYXBwbHkpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcbiBcdFx0fVxuIFx0XHRob3RBcHBseU9uVXBkYXRlID0gYXBwbHk7XG4gXHRcdGhvdFNldFN0YXR1cyhcImNoZWNrXCIpO1xuIFx0XHRyZXR1cm4gaG90RG93bmxvYWRNYW5pZmVzdChob3RSZXF1ZXN0VGltZW91dCkudGhlbihmdW5jdGlvbih1cGRhdGUpIHtcbiBcdFx0XHRpZiAoIXVwZGF0ZSkge1xuIFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0XHRcdHJldHVybiBudWxsO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RSZXF1ZXN0ZWRGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcCA9IHt9O1xuIFx0XHRcdGhvdEF2YWlsYWJsZUZpbGVzTWFwID0gdXBkYXRlLmM7XG4gXHRcdFx0aG90VXBkYXRlTmV3SGFzaCA9IHVwZGF0ZS5oO1xuXG4gXHRcdFx0aG90U2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcbiBcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0aG90RGVmZXJyZWQgPSB7XG4gXHRcdFx0XHRcdHJlc29sdmU6IHJlc29sdmUsXG4gXHRcdFx0XHRcdHJlamVjdDogcmVqZWN0XG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdGhvdFVwZGF0ZSA9IHt9O1xuIFx0XHRcdGZvcih2YXIgY2h1bmtJZCBpbiBpbnN0YWxsZWRDaHVua3MpXG4gXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvbmUtYmxvY2tzXG4gXHRcdFx0e1xuIFx0XHRcdFx0LypnbG9iYWxzIGNodW5rSWQgKi9cbiBcdFx0XHRcdGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRob3RTdGF0dXMgPT09IFwicHJlcGFyZVwiICYmXG4gXHRcdFx0XHRob3RDaHVua3NMb2FkaW5nID09PSAwICYmXG4gXHRcdFx0XHRob3RXYWl0aW5nRmlsZXMgPT09IDBcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmV0dXJuIHByb21pc2U7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdEFkZFVwZGF0ZUNodW5rKGNodW5rSWQsIG1vcmVNb2R1bGVzKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0gfHwgIWhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdKVxuIFx0XHRcdHJldHVybjtcbiBcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSBmYWxzZTtcbiBcdFx0Zm9yICh2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdGhvdFVwZGF0ZVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGlmICgtLWhvdFdhaXRpbmdGaWxlcyA9PT0gMCAmJiBob3RDaHVua3NMb2FkaW5nID09PSAwKSB7XG4gXHRcdFx0aG90VXBkYXRlRG93bmxvYWRlZCgpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEVuc3VyZVVwZGF0ZUNodW5rKGNodW5rSWQpIHtcbiBcdFx0aWYgKCFob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSkge1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlc01hcFtjaHVua0lkXSA9IHRydWU7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0aG90UmVxdWVzdGVkRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHRcdGhvdFdhaXRpbmdGaWxlcysrO1xuIFx0XHRcdGhvdERvd25sb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCk7XG4gXHRcdH1cbiBcdH1cblxuIFx0ZnVuY3Rpb24gaG90VXBkYXRlRG93bmxvYWRlZCgpIHtcbiBcdFx0aG90U2V0U3RhdHVzKFwicmVhZHlcIik7XG4gXHRcdHZhciBkZWZlcnJlZCA9IGhvdERlZmVycmVkO1xuIFx0XHRob3REZWZlcnJlZCA9IG51bGw7XG4gXHRcdGlmICghZGVmZXJyZWQpIHJldHVybjtcbiBcdFx0aWYgKGhvdEFwcGx5T25VcGRhdGUpIHtcbiBcdFx0XHQvLyBXcmFwIGRlZmVycmVkIG9iamVjdCBpbiBQcm9taXNlIHRvIG1hcmsgaXQgYXMgYSB3ZWxsLWhhbmRsZWQgUHJvbWlzZSB0b1xuIFx0XHRcdC8vIGF2b2lkIHRyaWdnZXJpbmcgdW5jYXVnaHQgZXhjZXB0aW9uIHdhcm5pbmcgaW4gQ2hyb21lLlxuIFx0XHRcdC8vIFNlZSBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjU2NjZcbiBcdFx0XHRQcm9taXNlLnJlc29sdmUoKVxuIFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG4gXHRcdFx0XHRcdHJldHVybiBob3RBcHBseShob3RBcHBseU9uVXBkYXRlKTtcbiBcdFx0XHRcdH0pXG4gXHRcdFx0XHQudGhlbihcbiBcdFx0XHRcdFx0ZnVuY3Rpb24ocmVzdWx0KSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShyZXN1bHQpO1xuIFx0XHRcdFx0XHR9LFxuIFx0XHRcdFx0XHRmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdFx0XHRkZWZlcnJlZC5yZWplY3QoZXJyKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0KTtcbiBcdFx0fSBlbHNlIHtcbiBcdFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHRvTW9kdWxlSWQoaWQpKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcbiBcdFx0aWYgKGhvdFN0YXR1cyAhPT0gXCJyZWFkeVwiKVxuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImFwcGx5KCkgaXMgb25seSBhbGxvd2VkIGluIHJlYWR5IHN0YXR1c1wiKTtcbiBcdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiBcdFx0dmFyIGNiO1xuIFx0XHR2YXIgaTtcbiBcdFx0dmFyIGo7XG4gXHRcdHZhciBtb2R1bGU7XG4gXHRcdHZhciBtb2R1bGVJZDtcblxuIFx0XHRmdW5jdGlvbiBnZXRBZmZlY3RlZFN0dWZmKHVwZGF0ZU1vZHVsZUlkKSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG4gXHRcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cbiBcdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKS5tYXAoZnVuY3Rpb24oaWQpIHtcbiBcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdGNoYWluOiBbaWRdLFxuIFx0XHRcdFx0XHRpZDogaWRcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiBcdFx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcbiBcdFx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKCFtb2R1bGUgfHwgbW9kdWxlLmhvdC5fc2VsZkFjY2VwdGVkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuIFx0XHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG4gXHRcdFx0XHRcdHZhciBwYXJlbnQgPSBpbnN0YWxsZWRNb2R1bGVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcbiBcdFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcbiBcdFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuIFx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG4gXHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcbiBcdFx0XHRcdFx0XHRjb250aW51ZTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG4gXHRcdFx0XHRcdHF1ZXVlLnB1c2goe1xuIFx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG4gXHRcdFx0XHRcdFx0aWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cblxuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG4gXHRcdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG4gXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcbiBcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuIFx0XHRcdH07XG4gXHRcdH1cblxuIFx0XHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG4gXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHR2YXIgaXRlbSA9IGJbaV07XG4gXHRcdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG4gXHRcdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cbiBcdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG4gXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuIFx0XHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKCkge1xuIFx0XHRcdGNvbnNvbGUud2FybihcbiBcdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgcmVzdWx0Lm1vZHVsZUlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG4gXHRcdFx0KTtcbiBcdFx0fTtcblxuIFx0XHRmb3IgKHZhciBpZCBpbiBob3RVcGRhdGUpIHtcbiBcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGhvdFVwZGF0ZSwgaWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVJZCA9IHRvTW9kdWxlSWQoaWQpO1xuIFx0XHRcdFx0LyoqIEB0eXBlIHtUT0RPfSAqL1xuIFx0XHRcdFx0dmFyIHJlc3VsdDtcbiBcdFx0XHRcdGlmIChob3RVcGRhdGVbaWRdKSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IGdldEFmZmVjdGVkU3R1ZmYobW9kdWxlSWQpO1xuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0cmVzdWx0ID0ge1xuIFx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZDogaWRcbiBcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdC8qKiBAdHlwZSB7RXJyb3J8ZmFsc2V9ICovXG4gXHRcdFx0XHR2YXIgYWJvcnRFcnJvciA9IGZhbHNlO1xuIFx0XHRcdFx0dmFyIGRvQXBwbHkgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0Rpc3Bvc2UgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBjaGFpbkluZm8gPSBcIlwiO1xuIFx0XHRcdFx0aWYgKHJlc3VsdC5jaGFpbikge1xuIFx0XHRcdFx0XHRjaGFpbkluZm8gPSBcIlxcblVwZGF0ZSBwcm9wYWdhdGlvbjogXCIgKyByZXN1bHQuY2hhaW4uam9pbihcIiAtPiBcIik7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRzd2l0Y2ggKHJlc3VsdC50eXBlKSB7XG4gXHRcdFx0XHRcdGNhc2UgXCJzZWxmLWRlY2xpbmVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2Ygc2VsZiBkZWNsaW5lOiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJkZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIGRlY2xpbmVkIGRlcGVuZGVuY3k6IFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdFwiIGluIFwiICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRyZXN1bHQucGFyZW50SWQgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcInVuYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblVuYWNjZXB0ZWQpIG9wdGlvbnMub25VbmFjY2VwdGVkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZVVuYWNjZXB0ZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBcIiArIG1vZHVsZUlkICsgXCIgaXMgbm90IGFjY2VwdGVkXCIgKyBjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJhY2NlcHRlZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQWNjZXB0ZWQpIG9wdGlvbnMub25BY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGRvQXBwbHkgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGlzcG9zZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRpc3Bvc2VkKSBvcHRpb25zLm9uRGlzcG9zZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0Rpc3Bvc2UgPSB0cnVlO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRkZWZhdWx0OlxuIFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlVuZXhjZXB0aW9uIHR5cGUgXCIgKyByZXN1bHQudHlwZSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoYWJvcnRFcnJvcikge1xuIFx0XHRcdFx0XHRob3RTZXRTdGF0dXMoXCJhYm9ydFwiKTtcbiBcdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGFib3J0RXJyb3IpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGRvQXBwbHkpIHtcbiBcdFx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBob3RVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdFx0XHRcdGlmIChcbiBcdFx0XHRcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0XHRcdFx0KVxuIFx0XHRcdFx0XHRcdCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdFx0YWRkQWxsVG9TZXQoXG4gXHRcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSxcbiBcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXVxuIFx0XHRcdFx0XHRcdFx0KTtcbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0Rpc3Bvc2UpIHtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCBbcmVzdWx0Lm1vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIFN0b3JlIHNlbGYgYWNjZXB0ZWQgb3V0ZGF0ZWQgbW9kdWxlcyB0byByZXF1aXJlIHRoZW0gbGF0ZXIgYnkgdGhlIG1vZHVsZSBzeXN0ZW1cbiBcdFx0dmFyIG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbaV07XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gJiZcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0KVxuIFx0XHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuIFx0XHRcdFx0XHRtb2R1bGU6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRlcnJvckhhbmRsZXI6IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmhvdC5fc2VsZkFjY2VwdGVkXG4gXHRcdFx0XHR9KTtcbiBcdFx0fVxuXG4gXHRcdC8vIE5vdyBpbiBcImRpc3Bvc2VcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJkaXNwb3NlXCIpO1xuIFx0XHRPYmplY3Qua2V5cyhob3RBdmFpbGFibGVGaWxlc01hcCkuZm9yRWFjaChmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdID09PSBmYWxzZSkge1xuIFx0XHRcdFx0aG90RGlzcG9zZUNodW5rKGNodW5rSWQpO1xuIFx0XHRcdH1cbiBcdFx0fSk7XG5cbiBcdFx0dmFyIGlkeDtcbiBcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCk7XG4gXHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0bW9kdWxlSWQgPSBxdWV1ZS5wb3AoKTtcbiBcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cbiBcdFx0XHR2YXIgZGF0YSA9IHt9O1xuXG4gXHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG4gXHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgZGlzcG9zZUhhbmRsZXJzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRjYiA9IGRpc3Bvc2VIYW5kbGVyc1tqXTtcbiBcdFx0XHRcdGNiKGRhdGEpO1xuIFx0XHRcdH1cbiBcdFx0XHRob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF0gPSBkYXRhO1xuXG4gXHRcdFx0Ly8gZGlzYWJsZSBtb2R1bGUgKHRoaXMgZGlzYWJsZXMgcmVxdWlyZXMgZnJvbSB0aGlzIG1vZHVsZSlcbiBcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG4gXHRcdFx0ZGVsZXRlIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gd2hlbiBkaXNwb3NpbmcgdGhlcmUgaXMgbm8gbmVlZCB0byBjYWxsIGRpc3Bvc2UgaGFuZGxlclxuIFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cbiBcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuIFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGUuY2hpbGRyZW4ubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdHZhciBjaGlsZCA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlLmNoaWxkcmVuW2pdXTtcbiBcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuIFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkge1xuIFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG4gXHRcdHZhciBkZXBlbmRlbmN5O1xuIFx0XHR2YXIgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXM7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcbiBcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG4gXHRcdFx0XHRcdFx0aWR4ID0gbW9kdWxlLmNoaWxkcmVuLmluZGV4T2YoZGVwZW5kZW5jeSk7XG4gXHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBOb3QgaW4gXCJhcHBseVwiIHBoYXNlXG4gXHRcdGhvdFNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG4gXHRcdGhvdEN1cnJlbnRIYXNoID0gaG90VXBkYXRlTmV3SGFzaDtcblxuIFx0XHQvLyBpbnNlcnQgbmV3IGNvZGVcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhcHBsaWVkVXBkYXRlLCBtb2R1bGVJZCkpIHtcbiBcdFx0XHRcdG1vZHVsZXNbbW9kdWxlSWRdID0gYXBwbGllZFVwZGF0ZVttb2R1bGVJZF07XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcbiBcdFx0dmFyIGVycm9yID0gbnVsbDtcbiBcdFx0Zm9yIChtb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmIChtb2R1bGUpIHtcbiBcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcbiBcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldO1xuIFx0XHRcdFx0XHRcdGNiID0gbW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG4gXHRcdFx0XHRcdFx0aWYgKGNiKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2tzLmluZGV4T2YoY2IpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChjYik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHRcdFx0XHRjYiA9IGNhbGxiYWNrc1tpXTtcbiBcdFx0XHRcdFx0XHR0cnkge1xuIFx0XHRcdFx0XHRcdFx0Y2IobW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuIFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcbiBcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbaV0sXG4gXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG4gXHRcdGZvciAoaSA9IDA7IGkgPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiBcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tpXTtcbiBcdFx0XHRtb2R1bGVJZCA9IGl0ZW0ubW9kdWxlO1xuIFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcbiBcdFx0XHR0cnkge1xuIFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCk7XG4gXHRcdFx0fSBjYXRjaCAoZXJyKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIpO1xuIFx0XHRcdFx0XHR9IGNhdGNoIChlcnIyKSB7XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG4gXHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuIFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjI7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcbiBcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcbiBcdFx0aWYgKGVycm9yKSB7XG4gXHRcdFx0aG90U2V0U3RhdHVzKFwiZmFpbFwiKTtcbiBcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuIFx0XHR9XG5cbiBcdFx0aG90U2V0U3RhdHVzKFwiaWRsZVwiKTtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiBcdFx0XHRyZXNvbHZlKG91dGRhdGVkTW9kdWxlcyk7XG4gXHRcdH0pO1xuIFx0fVxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJtYWluXCI6IDBcbiBcdH07XG5cbiBcdHZhciBkZWZlcnJlZE1vZHVsZXMgPSBbXTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBfX3dlYnBhY2tfaGFzaF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhvdEN1cnJlbnRIYXNoOyB9O1xuXG4gXHR2YXIganNvbnBBcnJheSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucFwiXSB8fCBbXTtcbiBcdHZhciBvbGRKc29ucEZ1bmN0aW9uID0ganNvbnBBcnJheS5wdXNoLmJpbmQoanNvbnBBcnJheSk7XG4gXHRqc29ucEFycmF5LnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjaztcbiBcdGpzb25wQXJyYXkgPSBqc29ucEFycmF5LnNsaWNlKCk7XG4gXHRmb3IodmFyIGkgPSAwOyBpIDwganNvbnBBcnJheS5sZW5ndGg7IGkrKykgd2VicGFja0pzb25wQ2FsbGJhY2soanNvbnBBcnJheVtpXSk7XG4gXHR2YXIgcGFyZW50SnNvbnBGdW5jdGlvbiA9IG9sZEpzb25wRnVuY3Rpb247XG5cblxuIFx0Ly8gYWRkIGVudHJ5IG1vZHVsZSB0byBkZWZlcnJlZCBsaXN0XG4gXHRkZWZlcnJlZE1vZHVsZXMucHVzaChbMCxcInZlbmRvcnN+bWFpblwiXSk7XG4gXHQvLyBydW4gZGVmZXJyZWQgbW9kdWxlcyB3aGVuIHJlYWR5XG4gXHRyZXR1cm4gY2hlY2tEZWZlcnJlZE1vZHVsZXMoKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKHRydWUpO1xuLy8gSW1wb3J0c1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoLy9mb250cy5nb29nbGVhcGlzLmNvbS9lYXJseWFjY2Vzcy9uYW51bWdvdGhpYy5jc3MpO1wiLCBcIlwiXSk7XG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybCgvL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Vhcmx5YWNjZXNzL25vdG9zYW5za3IuY3NzKTtcIiwgXCJcIl0pO1xuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cDovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Vhcmx5YWNjZXNzL2hhbm5hLmNzcyk7XCIsIFwiXCJdKTtcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHA6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9lYXJseWFjY2Vzcy9qZWp1Z290aGljLmNzcyk7XCIsIFwiXCJdKTtcblxuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBGbGV4IFNhc3MgKi9cXG4vKkZsZXggU2FzcyovXFxuYm9keSB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG1hcmdpbjogMDtcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gIGZvbnQtc2l6ZTogOTAlOyB9XFxuXFxuYm9keSwgc3BhbiwgZGl2LCBhLCBoMSB7XFxuICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlOyB9XFxuXFxuYm9keSwgYnV0dG9uLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSB7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgZm9udC1mYW1pbHk6ICdVYnVudHUnLCAnTmFudW0gR290aGljJywgc2Fucy1zZXJpZjtcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7IH1cXG5cXG4ubWFpbkNvbnRhaW5lciB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tb3otYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9mbGV4LnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvQXBwLnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9jZW50ZXJlci5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGNBQUE7QUE4SkEsWUFBQTtBQ2hKQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osU0FBUztFQUNULGtCQUFrQjtFQUNsQixjQUFjLEVBQUE7O0FBR2hCO0VBQ0Usa0NBQWtDO0VBQ2xDLG1DQUFtQztFQUNuQyxrQ0FBa0MsRUFBQTs7QUFHcEM7RUFDRSxnQkFBZ0I7RUFDaEIsaURBQWlEO0VBQ2pELGtDQUFrQztFQUNsQyxtQ0FBbUM7RUFDbkMsa0NBQWtDLEVBQUE7O0FBRXBDO0VBQ0UsV0FBVztFQUNYLGFBQWE7RURuQ2Isb0JBQW9CO0VBQ3BCLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLGFBQWE7RUU2QlgsdUJBQXVCO0VBQ3ZCLHNCQUFzQjtFREd4QixzQkFBc0IsRUFBQVwiLFwiZmlsZVwiOlwiQXBwLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyogRmxleCBTYXNzICovXFxyXFxuQG1peGluIGZsZXhib3goKSB7XFxyXFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXHJcXG4gIGRpc3BsYXk6IC1tb3otYm94O1xcclxcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxyXFxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4vLyBUaGUgJ2ZsZXgnIHNob3J0aGFuZFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtc1xcclxcbi8vIDxwb3NpdGl2ZS1udW1iZXI+LCBpbml0aWFsLCBhdXRvLCBvciBub25lXFxyXFxuQG1peGluIGZsZXgoJHZhbHVlcykge1xcclxcbiAgLXdlYmtpdC1ib3gtZmxleDogJHZhbHVlcztcXHJcXG4gICAgIC1tb3otYm94LWZsZXg6ICR2YWx1ZXM7XFxyXFxuICAgICAgLXdlYmtpdC1mbGV4OiAkdmFsdWVzO1xcclxcbiAgXFx0ICAtbXMtZmxleDogJHZhbHVlcztcXHJcXG4gIFxcdCAgICAgIGZsZXg6ICR2YWx1ZXM7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggRmxvdyBEaXJlY3Rpb25cXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggY29udGFpbmVyc1xcclxcbi8vIHJvdyB8IHJvdy1yZXZlcnNlIHwgY29sdW1uIHwgY29sdW1uLXJldmVyc2VcXHJcXG5AbWl4aW4gZmxleC1kaXJlY3Rpb24oJGRpcmVjdGlvbikge1xcclxcbiAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjtcXHJcXG4gICAgIC1tb3otZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiAkZGlyZWN0aW9uO1xcclxcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBMaW5lIFdyYXBwaW5nXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyBub3dyYXAgfCB3cmFwIHwgd3JhcC1yZXZlcnNlXFxyXFxuQG1peGluIGZsZXgtd3JhcCgkd3JhcCkge1xcclxcbiAgLXdlYmtpdC1mbGV4LXdyYXA6ICR3cmFwO1xcclxcbiAgICAgLW1vei1mbGV4LXdyYXA6ICR3cmFwO1xcclxcbiAgICAgIC1tcy1mbGV4LXdyYXA6ICR3cmFwO1xcclxcbiAgICAgICAgICBmbGV4LXdyYXA6ICR3cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IERpcmVjdGlvbiBhbmQgV3JhcFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gPGZsZXgtZGlyZWN0aW9uPiB8fCA8ZmxleC13cmFwPlxcclxcbkBtaXhpbiBmbGV4LWZsb3coJGZsb3cpIHtcXHJcXG4gIC13ZWJraXQtZmxleC1mbG93OiAkZmxvdztcXHJcXG4gICAgIC1tb3otZmxleC1mbG93OiAkZmxvdztcXHJcXG4gICAgICAtbXMtZmxleC1mbG93OiAkZmxvdztcXHJcXG4gICAgICAgICAgZmxleC1mbG93OiAkZmxvdztcXHJcXG59XFxyXFxuXFxyXFxuLy8gRGlzcGxheSBPcmRlclxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtc1xcclxcbi8vIDxpbnRlZ2VyPlxcclxcbkBtaXhpbiBvcmRlcigkdmFsKSB7XFxyXFxuICAtd2Via2l0LWJveC1vcmRpbmFsLWdyb3VwOiAkdmFsO1xcclxcbiAgICAgLW1vei1ib3gtb3JkaW5hbC1ncm91cDogJHZhbDtcXHJcXG4gIFxcdCAgICAgLW1zLWZsZXgtb3JkZXI6ICR2YWw7XFxyXFxuICBcXHQgICAgICAtd2Via2l0LW9yZGVyOiAkdmFsO1xcclxcbiAgXFx0XFx0ICAgICAgb3JkZXI6ICR2YWw7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggZ3JvdyBmYWN0b3JcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8bnVtYmVyPlxcclxcbkBtaXhpbiBmbGV4LWdyb3coJGdyb3cpIHtcXHJcXG4gIC13ZWJraXQtZmxleC1ncm93OiAkZ3JvdztcXHJcXG4gICAgIC1tb3otZmxleC1ncm93OiAkZ3JvdztcXHJcXG4gICAgICAtbXMtZmxleC1ncm93OiAkZ3JvdztcXHJcXG4gICAgICAgICAgZmxleC1ncm93OiAkZ3JvdztcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBzaHJpbmtcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbSBzaHJpbmsgZmFjdG9yXFxyXFxuLy8gPG51bWJlcj5cXHJcXG5AbWl4aW4gZmxleC1zaHJpbmsoJHNocmluaykge1xcclxcbiAgLXdlYmtpdC1mbGV4LXNocmluazogJHNocmluaztcXHJcXG4gICAgIC1tb3otZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxuICAgICAgLW1zLWZsZXgtc2hyaW5rOiAkc2hyaW5rO1xcclxcbiAgICAgICAgICBmbGV4LXNocmluazogJHNocmluaztcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBiYXNpc1xcclxcbi8vIC0gdGhlIGluaXRpYWwgbWFpbiBzaXplIG9mIHRoZSBmbGV4IGl0ZW1cXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNuaXRpYWwgbWFpbiBzaXplIG9mIHRoZSBmbGV4IGl0ZW1cXHJcXG4vLyA8d2lkdGg+XFxyXFxuQG1peGluIGZsZXgtYmFzaXMoJHdpZHRoKSB7XFxyXFxuICAtd2Via2l0LWZsZXgtYmFzaXM6ICR3aWR0aDtcXHJcXG4gICAgIC1tb3otZmxleC1iYXNpczogJHdpZHRoO1xcclxcbiAgICAgIC1tcy1mbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxuICAgICAgICAgIGZsZXgtYmFzaXM6ICR3aWR0aDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQXhpcyBBbGlnbm1lbnRcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggY29udGFpbmVyc1xcclxcbi8vIGZsZXgtc3RhcnQgfCBmbGV4LWVuZCB8IGNlbnRlciB8IHNwYWNlLWJldHdlZW4gfCBzcGFjZS1hcm91bmRcXHJcXG5AbWl4aW4ganVzdGlmeS1jb250ZW50KCRqdXN0aWZ5KSB7XFxyXFxuICAtd2Via2l0LWp1c3RpZnktY29udGVudDogJGp1c3RpZnk7XFxyXFxuICAgICAtbW96LWp1c3RpZnktY29udGVudDogJGp1c3RpZnk7XFxyXFxuICAgICAgLW1zLWp1c3RpZnktY29udGVudDogJGp1c3RpZnk7XFxyXFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogJGp1c3RpZnk7XFxyXFxuICAgICAgICAgICAgLW1zLWZsZXgtcGFjazogJGp1c3RpZnk7XFxyXFxufVxcclxcblxcclxcbi8vIFBhY2tpbmcgRmxleCBMaW5lc1xcclxcbi8vIC0gYXBwbGllcyB0bzogbXVsdGktbGluZSBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBzcGFjZS1iZXR3ZWVuIHwgc3BhY2UtYXJvdW5kIHwgc3RyZXRjaFxcclxcbkBtaXhpbiBhbGlnbi1jb250ZW50KCRhbGlnbikge1xcclxcbiAgLXdlYmtpdC1hbGlnbi1jb250ZW50OiAkYWxpZ247XFxyXFxuICAgICAtbW96LWFsaWduLWNvbnRlbnQ6ICRhbGlnbjtcXHJcXG4gICAgICAtbXMtYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbiAgICAgICAgICBhbGlnbi1jb250ZW50OiAkYWxpZ247XFxyXFxufVxcclxcblxcclxcbi8vIENyb3NzLWF4aXMgQWxpZ25tZW50XFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24taXRlbXMoJGFsaWduKSB7XFxyXFxuICAtd2Via2l0LWFsaWduLWl0ZW1zOiAkYWxpZ247XFxyXFxuICAgICAtbW96LWFsaWduLWl0ZW1zOiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLWl0ZW1zOiAkYWxpZ247XFxyXFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiAkYWxpZ247XFxyXFxufVxcclxcblxcclxcbi8vIENyb3NzLWF4aXMgQWxpZ25tZW50XFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zXFxyXFxuLy8gYXV0byB8IGZsZXgtc3RhcnQgfCBmbGV4LWVuZCB8IGNlbnRlciB8IGJhc2VsaW5lIHwgc3RyZXRjaFxcclxcbkBtaXhpbiBhbGlnbi1zZWxmKCRhbGlnbikge1xcclxcbiAgLXdlYmtpdC1hbGlnbi1zZWxmOiAkYWxpZ247XFxyXFxuICAgICAtbW96LWFsaWduLXNlbGY6ICRhbGlnbjtcXHJcXG4gICAgICAtbXMtYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbiAgICAgICAgICBhbGlnbi1zZWxmOiAkYWxpZ247XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBmbGV4LTEtMXtcXHJcXG4gIEBpbmNsdWRlIGZsZXgoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWdyb3coMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LXNocmluaygxKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtYmFzaXMoYXV0byk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBmbGV4LTAtMXtcXHJcXG4gIEBpbmNsdWRlIGZsZXgoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWdyb3coMCk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LXNocmluaygxKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtYmFzaXMoYXV0byk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBmbGV4LTEtMHtcXHJcXG4gIEBpbmNsdWRlIGZsZXgoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWdyb3coMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LXNocmluaygwKTtcXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGZsZXgtMC0we1xcclxcbiAgQGluY2x1ZGUgZmxleCgxKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtZ3JvdygwKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtc2hyaW5rKDApO1xcclxcbn1cXHJcXG4vKkZsZXggU2FzcyovXCIsXCJAaW1wb3J0IHVybCgvL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Vhcmx5YWNjZXNzL25hbnVtZ290aGljLmNzcyk7XFxyXFxuLy9OYW51bSBHb3RoaWNcXHJcXG5AaW1wb3J0IHVybCgvL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2Vhcmx5YWNjZXNzL25vdG9zYW5za3IuY3NzKTtcXHJcXG4vL05vdG8gU2FucyBLUlxcclxcbkBpbXBvcnQgdXJsKGh0dHA6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9lYXJseWFjY2Vzcy9oYW5uYS5jc3MpO1xcclxcbi8vSGFubmFcXHJcXG5AaW1wb3J0IHVybChodHRwOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vZWFybHlhY2Nlc3MvamVqdWdvdGhpYy5jc3MpO1xcclxcbi8vSmVqdSBHb3RoaWNcXHJcXG5cXHJcXG5AaW1wb3J0ICcuL3V0aWwvY2VudGVyZXIuc2Nzcyc7XFxyXFxuQGltcG9ydCAnLi91dGlsL2NvbG9yLnNjc3MnO1xcclxcbkBpbXBvcnQgJy4vdXRpbC9ib3hzaGFkb3cuc2Nzcyc7XFxyXFxuQGltcG9ydCAnLi91dGlsL2J1dHRvbi5zY3NzJztcXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcclxcbiAgZm9udC1zaXplOiA5MCU7XFxyXFxufVxcclxcblxcclxcbmJvZHksIHNwYW4sIGRpdiwgYSwgaDEge1xcclxcbiAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXHJcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcclxcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSwgYnV0dG9uLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSB7XFxyXFxuICBsaW5lLWhlaWdodDogMS41O1xcclxcbiAgZm9udC1mYW1pbHk6ICdVYnVudHUnLCAnTmFudW0gR290aGljJywgc2Fucy1zZXJpZjtcXHJcXG4gIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxyXFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXHJcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxyXFxufVxcclxcbi5tYWluQ29udGFpbmVye1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDEwMHZoO1xcclxcbiAgQGluY2x1ZGUgY2VudGVyZXJGbGV4O1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuXCIsXCJAaW1wb3J0ICcuL2ZsZXguc2Nzcyc7XFxyXFxuQG1peGluIGNlbnRlcmVyKCR3aWR0aDogNTAlLCAkaGVpZ2h0OiA1MCUsICRob3Jpem9udGFsOiB0cnVlLCAkdmVydGljYWw6IHRydWUpIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIEBpZiAoJGhvcml6b250YWwgYW5kICR2ZXJ0aWNhbCkge1xcclxcbiAgICB0b3A6ICRoZWlnaHQ7XFxyXFxuICAgIGxlZnQ6ICR3aWR0aDtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLSR3aWR0aCwgLSRoZWlnaHQpO1xcclxcbiAgfSBAZWxzZSBpZiAoJGhvcml6b250YWwpIHtcXHJcXG4gICAgbGVmdDogJHdpZHRoO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtJHdpZHRoLCAwKTtcXHJcXG4gIH0gQGVsc2UgaWYgKCR2ZXJ0aWNhbCkge1xcclxcbiAgICB0b3A6ICRoZWlnaHQ7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0kaGVpZ2h0KTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGNlbnRlcmVyLXdpdGgtd2l0ZGgoJG1pbi13aWR0aDo1MCUsJHdpZHRoOiA1MCUsICRoZWlnaHQ6IDUwJSwgJGhvcml6b250YWw6IHRydWUsICR2ZXJ0aWNhbDogdHJ1ZSkge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgbWluLXdpZHRoOiAkbWluLXdpZHRoO1xcclxcbiAgQGlmICgkaG9yaXpvbnRhbCBhbmQgJHZlcnRpY2FsKSB7XFxyXFxuICAgIHRvcDogJGhlaWdodDtcXHJcXG4gICAgbGVmdDogJHdpZHRoO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtJHdpZHRoLCAtJGhlaWdodCk7XFxyXFxuICB9IEBlbHNlIGlmICgkaG9yaXpvbnRhbCkge1xcclxcbiAgICBsZWZ0OiAkd2lkdGg7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0kd2lkdGgsIDApO1xcclxcbiAgfSBAZWxzZSBpZiAoJHZlcnRpY2FsKSB7XFxyXFxuICAgIHRvcDogJGhlaWdodDtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLSRoZWlnaHQpO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gY2VudGVyZXJGbGV4KCRob3Jpem9udGFsOnRydWUsICR2ZXJ0aWNhbDogdHJ1ZSl7XFxyXFxuICBAaW5jbHVkZSBmbGV4Ym94O1xcclxcbiAgQGlmICgkaG9yaXpvbnRhbCBhbmQgJHZlcnRpY2FsKSB7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgfSBAZWxzZSBpZiAoJGhvcml6b250YWwpIHtcXHJcXG4gICAgXFxyXFxuICB9IEBlbHNlIGlmICgkdmVydGljYWwpIHtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIH1cXHJcXG4gIFxcclxcbn1cXHJcXG5cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikodHJ1ZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIEZsZXggU2FzcyAqL1xcbi8qRmxleCBTYXNzKi9cXG5ALXdlYmtpdC1rZXlmcmFtZXMgY2hhbmdlY29sb3Ige1xcbiAgMCUge1xcbiAgICBib3JkZXItY29sb3I6IGJsYWNrOyB9XFxuICAxMDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgY2hhbmdlY29sb3Ige1xcbiAgMCUge1xcbiAgICBib3JkZXItY29sb3I6IGJsYWNrOyB9XFxuICAxMDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjOyB9IH1cXG5cXG5ALW1zLWtleWZyYW1lcyBjaGFuZ2Vjb2xvciB7XFxuICAwJSB7XFxuICAgIGJvcmRlci1jb2xvcjogYmxhY2s7IH1cXG4gIDEwMCUge1xcbiAgICBib3JkZXItY29sb3I6ICNjY2M7IH0gfVxcblxcbkAtby1rZXlmcmFtZXMgY2hhbmdlY29sb3Ige1xcbiAgMCUge1xcbiAgICBib3JkZXItY29sb3I6IGJsYWNrOyB9XFxuICAxMDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGNoYW5nZWNvbG9yIHtcXG4gIDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiBibGFjazsgfVxcbiAgMTAwJSB7XFxuICAgIGJvcmRlci1jb2xvcjogI2NjYzsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgZmFkZWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkAtbXMta2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW8ta2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgaW5wdXRFcnJvciB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDI1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDc1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgaW5wdXRFcnJvciB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDI1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDc1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW1zLWtleWZyYW1lcyBpbnB1dEVycm9yIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgMjUlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgNTAlIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgNzUlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkAtby1rZXlmcmFtZXMgaW5wdXRFcnJvciB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDI1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDc1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGlucHV0RXJyb3Ige1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICAyNSUge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICA1MCUge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICA3NSUge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgc2xpZGVJbkZyb21Cb3R0b20ge1xcbiAgMCUge1xcbiAgICB0b3A6IDEwMCU7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gIDEwMCUge1xcbiAgICB0b3A6IDUwJTtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgZGlzcGxheTogYmxvY2s7IH0gfVxcblxcbkAtbXMta2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG5ALW8ta2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG4uZm9vZEFkZEJ1dHRvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1JyxzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgY29sb3I6ICNGRjQwNEU7IH1cXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgICAuZm9vZEFkZEJ1dHRvbiBhOmhvdmVyIHtcXG4gICAgICBjb2xvcjogI2YzMDAxMjtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7IH0gfVxcblxcbi5mb29kQWRkQ29udGFpbmVyIHtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1Jywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMjBweDsgfVxcblxcbi5mb29kQWRkSW5wdXQge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBtYXJnaW46IGF1dG87XFxuICB3aWR0aDogMjQwcHg7XFxuICBwYWRkaW5nOiA1cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjYWFhO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGZvbnQtZmFtaWx5OiAnTm90byBTYW5zIEtSJywnVWJ1bnR1Jywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBvdXRsaW5lOiAwO1xcbiAgei1pbmRleDogMjtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMTdweCAxOXB4IDMwcHggLTE2cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgLW1vei1ib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsIDAsIDAsIDAuNSk7IH1cXG5cXG4uZm9vZEFkZElucHV0RXJyb3Ige1xcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRjb3JhbDtcXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBpbnB1dEVycm9yIDAuM3MgbGluZWFyO1xcbiAgLW1vei1hbmltYXRpb246IGlucHV0RXJyb3IgMC4zcyBsaW5lYXI7XFxuICAtbXMtYW5pbWF0aW9uOiBpbnB1dEVycm9yIDAuM3MgbGluZWFyO1xcbiAgLW8tYW5pbWF0aW9uOiBpbnB1dEVycm9yIDAuM3MgbGluZWFyO1xcbiAgYW5pbWF0aW9uOiBpbnB1dEVycm9yIDAuM3MgbGluZWFyOyB9XFxuXFxuLmZvb2RBZGRUYWcge1xcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgbWFyZ2luOiAycHg7XFxuICBtYXJnaW4tdG9wOiAxNXB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGNDA0RTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDsgfVxcbiAgLmZvb2RBZGRUYWcgc3BhbiB7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IC0xNXB4O1xcbiAgICByaWdodDogLTVweDsgfVxcbiAgICAuZm9vZEFkZFRhZyBzcGFuOmhvdmVyIHtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG5cXG4uZm9vZEFkZENvbmZpcm0ge1xcbiAgbWFyZ2luOiAyMHB4IGF1dG87XFxuICBwYWRkaW5nOiA1cHg7XFxuICB3aWR0aDogNTAlO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZDogIzRBNDA0QTtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAgIC5mb29kQWRkQ29uZmlybTpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzM0MmQzNDtcXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcbiAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTsgfVxcbiAgICAuZm9vZEFkZENvbmZpcm06YWN0aXZlIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjMDYwNTA2OyB9IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvZmxleC5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvYW5pbWF0aW9uLnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvRm9vZEFkZC5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvYnV0dG9uLnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9jb2xvci5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvYm94c2hhZG93LnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsY0FBQTtBQThKQSxZQUFBO0FDNUpFO0VBMEJBO0lBQ0ksbUJBQW1CLEVBQUE7RUFHdkI7SUFDSSxrQkFBa0IsRUFBQSxFQUFBOztBQTVCdEI7RUF1QkE7SUFDSSxtQkFBbUIsRUFBQTtFQUd2QjtJQUNJLGtCQUFrQixFQUFBLEVBQUE7O0FBekJ0QjtFQW9CQTtJQUNJLG1CQUFtQixFQUFBO0VBR3ZCO0lBQ0ksa0JBQWtCLEVBQUEsRUFDckI7O0FBdkJEO0VBaUJBO0lBQ0ksbUJBQW1CLEVBQUE7RUFHdkI7SUFDSSxrQkFBa0IsRUFBQSxFQUFBOztBQW5CdEI7RUFjQTtJQUNJLG1CQUFtQixFQUFBO0VBR3ZCO0lBQ0ksa0JBQWtCLEVBQUEsRUFBQTs7QUEvQnRCO0VBb0NBO0lBQ0ksVUFBVSxFQUFBO0VBR2Q7SUFDSSxVQUFVLEVBQUEsRUFBQTs7QUF0Q2Q7RUFpQ0E7SUFDSSxVQUFVLEVBQUE7RUFHZDtJQUNJLFVBQVUsRUFBQSxFQUFBOztBQW5DZDtFQThCQTtJQUNJLFVBQVUsRUFBQTtFQUdkO0lBQ0ksVUFBVSxFQUFBLEVBQ2I7O0FBakNEO0VBMkJBO0lBQ0ksVUFBVSxFQUFBO0VBR2Q7SUFDSSxVQUFVLEVBQUEsRUFBQTs7QUE3QmQ7RUF3QkE7SUFDSSxVQUFVLEVBQUE7RUFHZDtJQUNJLFVBQVUsRUFBQSxFQUFBOztBQXpDZDtFQThDRTtJQUNJLFVBQVUsRUFBQTtFQUVkO0lBQ0ksVUFBVSxFQUFBO0VBRWQ7SUFDSSxVQUFVLEVBQUE7RUFFZDtJQUNJLFVBQVUsRUFBQTtFQUVkO0lBQ0ksVUFBVSxFQUFBLEVBQUE7O0FBeERoQjtFQTJDRTtJQUNJLFVBQVUsRUFBQTtFQUVkO0lBQ0ksVUFBVSxFQUFBO0VBRWQ7SUFDSSxVQUFVLEVBQUE7RUFFZDtJQUNJLFVBQVUsRUFBQTtFQUVkO0lBQ0ksVUFBVSxFQUFBLEVBQUE7O0FBckRoQjtFQXdDRTtJQUNJLFVBQVUsRUFBQTtFQUVkO0lBQ0ksVUFBVSxFQUFBO0VBRWQ7SUFDSSxVQUFVLEVBQUE7RUFFZDtJQUNJLFVBQVUsRUFBQTtFQUVkO0lBQ0ksVUFBVSxFQUFBLEVBQ2I7O0FBbkRIO0VBcUNFO0lBQ0ksVUFBVSxFQUFBO0VBRWQ7SUFDSSxVQUFVLEVBQUE7RUFFZDtJQUNJLFVBQVUsRUFBQTtFQUVkO0lBQ0ksVUFBVSxFQUFBO0VBRWQ7SUFDSSxVQUFVLEVBQUEsRUFBQTs7QUEvQ2hCO0VBa0NFO0lBQ0ksVUFBVSxFQUFBO0VBRWQ7SUFDSSxVQUFVLEVBQUE7RUFFZDtJQUNJLFVBQVUsRUFBQTtFQUVkO0lBQ0ksVUFBVSxFQUFBO0VBRWQ7SUFDSSxVQUFVLEVBQUEsRUFBQTs7QUEzRGhCO0VBZ0VFO0lBQ0ksU0FBUztJQUNULFVBQVU7SUFDVixhQUFhLEVBQUE7RUFFakI7SUFDSSxRQUFRO0lBQ1IsVUFBVTtJQUNWLGNBQWMsRUFBQSxFQUFBOztBQXJFcEI7RUE2REU7SUFDSSxTQUFTO0lBQ1QsVUFBVTtJQUNWLGFBQWEsRUFBQTtFQUVqQjtJQUNJLFFBQVE7SUFDUixVQUFVO0lBQ1YsY0FBYyxFQUFBLEVBQUE7O0FBbEVwQjtFQTBERTtJQUNJLFNBQVM7SUFDVCxVQUFVO0lBQ1YsYUFBYSxFQUFBO0VBRWpCO0lBQ0ksUUFBUTtJQUNSLFVBQVU7SUFDVixjQUFjLEVBQUEsRUFDakI7O0FBaEVIO0VBdURFO0lBQ0ksU0FBUztJQUNULFVBQVU7SUFDVixhQUFhLEVBQUE7RUFFakI7SUFDSSxRQUFRO0lBQ1IsVUFBVTtJQUNWLGNBQWMsRUFBQSxFQUFBOztBQTVEcEI7RUFvREU7SUFDSSxTQUFTO0lBQ1QsVUFBVTtJQUNWLGFBQWEsRUFBQTtFQUVqQjtJQUNJLFFBQVE7SUFDUixVQUFVO0lBQ1YsY0FBYyxFQUFBLEVBQUE7O0FDcEV0QjtFQ3dGRSxrQkFBa0I7RUFDbEIsd0NBQXdDO0VBQ3hDLGVBQWU7RUFDZixjQzlGaUIsRUFBQTtFRCtGakI7SUQ1RkY7TUMrRlEsY0FBeUI7TUFDekIsZUFBZSxFQUFBLEVBQ2hCOztBRDdGUDtFQUNFLGFBQWE7RUFDYix5Q0FBeUM7RUFDekMsZUFBZSxFQUFBOztBQUdqQjtFQUNFLGNBQWM7RUFDZCxZQUFZO0VBQ1osWUFBWTtFQUNaLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLHNCQUFzQjtFQUN0QixnREFBZ0Q7RUFDaEQsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFVBQVU7RUd4QlYsMkRBQXdEO0VBQ3hELHdEQUFxRDtFQUNyRCxtREFBZ0QsRUFBQTs7QUgwQmxEO0VBQ0UsNEJBQTRCO0VEZDlCLHlDQUFtQjtFQUNuQixzQ0FBZ0I7RUFDaEIscUNBQWU7RUFDZixvQ0FBYztFQUNkLGlDQUFXLEVBQUE7O0FDYVg7RUFDRSxxQkFBcUI7RUFDckIsWUFBWTtFQUNaLFdBQVc7RUFDWCxnQkFBZ0I7RUFDaEIseUJFdkNpQjtFRndDakIsWUFBWTtFQUNaLGtCQUFrQixFQUFBO0VBUHBCO0lBU0ksWUFBWTtJQUNaLGVBQWU7SUFDZix1QkFBdUI7SUFDdkIsa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixXQUFXLEVBQUE7SUFkZjtNQWdCTSxlQUFlLEVBQUE7O0FBS3JCO0VBQ0UsaUJBQWlCO0VBQ2pCLFlBQVk7RUFDWixVQUFVO0VDNURWLGVBQWU7RUFDZixtQkNFbUI7RUREbkIsWUFIa0MsRUFBQTtFQUlsQztJRHNERjtNQ3BETSxtQkFBeUI7TUFDekIseUJBQXlCO01BQ3pCLGlDQUFpQyxFQUFBO0lEa0R2QztNQy9DTSxtQkFBMEIsRUFBQSxFQUMzQlwiLFwiZmlsZVwiOlwiRm9vZEFkZC5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIEZsZXggU2FzcyAqL1xcclxcbkBtaXhpbiBmbGV4Ym94KCkge1xcclxcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxyXFxuICBkaXNwbGF5OiAtbW96LWJveDtcXHJcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcclxcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gVGhlICdmbGV4JyBzaG9ydGhhbmRcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8cG9zaXRpdmUtbnVtYmVyPiwgaW5pdGlhbCwgYXV0bywgb3Igbm9uZVxcclxcbkBtaXhpbiBmbGV4KCR2YWx1ZXMpIHtcXHJcXG4gIC13ZWJraXQtYm94LWZsZXg6ICR2YWx1ZXM7XFxyXFxuICAgICAtbW96LWJveC1mbGV4OiAkdmFsdWVzO1xcclxcbiAgICAgIC13ZWJraXQtZmxleDogJHZhbHVlcztcXHJcXG4gIFxcdCAgLW1zLWZsZXg6ICR2YWx1ZXM7XFxyXFxuICBcXHQgICAgICBmbGV4OiAkdmFsdWVzO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IEZsb3cgRGlyZWN0aW9uXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyByb3cgfCByb3ctcmV2ZXJzZSB8IGNvbHVtbiB8IGNvbHVtbi1yZXZlcnNlXFxyXFxuQG1peGluIGZsZXgtZGlyZWN0aW9uKCRkaXJlY3Rpb24pIHtcXHJcXG4gIC13ZWJraXQtZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxuICAgICAtbW96LWZsZXgtZGlyZWN0aW9uOiAkZGlyZWN0aW9uO1xcclxcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjtcXHJcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggTGluZSBXcmFwcGluZ1xcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gbm93cmFwIHwgd3JhcCB8IHdyYXAtcmV2ZXJzZVxcclxcbkBtaXhpbiBmbGV4LXdyYXAoJHdyYXApIHtcXHJcXG4gIC13ZWJraXQtZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgIC1tb3otZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgICAtbXMtZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgICAgICAgZmxleC13cmFwOiAkd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBEaXJlY3Rpb24gYW5kIFdyYXBcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggY29udGFpbmVyc1xcclxcbi8vIDxmbGV4LWRpcmVjdGlvbj4gfHwgPGZsZXgtd3JhcD5cXHJcXG5AbWl4aW4gZmxleC1mbG93KCRmbG93KSB7XFxyXFxuICAtd2Via2l0LWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAtbW96LWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAgLW1zLWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAgICAgIGZsZXgtZmxvdzogJGZsb3c7XFxyXFxufVxcclxcblxcclxcbi8vIERpc3BsYXkgT3JkZXJcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8aW50ZWdlcj5cXHJcXG5AbWl4aW4gb3JkZXIoJHZhbCkge1xcclxcbiAgLXdlYmtpdC1ib3gtb3JkaW5hbC1ncm91cDogJHZhbDtcXHJcXG4gICAgIC1tb3otYm94LW9yZGluYWwtZ3JvdXA6ICR2YWw7XFxyXFxuICBcXHQgICAgIC1tcy1mbGV4LW9yZGVyOiAkdmFsO1xcclxcbiAgXFx0ICAgICAgLXdlYmtpdC1vcmRlcjogJHZhbDtcXHJcXG4gIFxcdFxcdCAgICAgIG9yZGVyOiAkdmFsO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IGdyb3cgZmFjdG9yXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zXFxyXFxuLy8gPG51bWJlcj5cXHJcXG5AbWl4aW4gZmxleC1ncm93KCRncm93KSB7XFxyXFxuICAtd2Via2l0LWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAtbW96LWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAgLW1zLWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAgICAgIGZsZXgtZ3JvdzogJGdyb3c7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggc2hyaW5rXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW0gc2hyaW5rIGZhY3Rvclxcclxcbi8vIDxudW1iZXI+XFxyXFxuQG1peGluIGZsZXgtc2hyaW5rKCRzaHJpbmspIHtcXHJcXG4gIC13ZWJraXQtZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxuICAgICAtbW96LWZsZXgtc2hyaW5rOiAkc2hyaW5rO1xcclxcbiAgICAgIC1tcy1mbGV4LXNocmluazogJHNocmluaztcXHJcXG4gICAgICAgICAgZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggYmFzaXNcXHJcXG4vLyAtIHRoZSBpbml0aWFsIG1haW4gc2l6ZSBvZiB0aGUgZmxleCBpdGVtXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zbml0aWFsIG1haW4gc2l6ZSBvZiB0aGUgZmxleCBpdGVtXFxyXFxuLy8gPHdpZHRoPlxcclxcbkBtaXhpbiBmbGV4LWJhc2lzKCR3aWR0aCkge1xcclxcbiAgLXdlYmtpdC1mbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxuICAgICAtbW96LWZsZXgtYmFzaXM6ICR3aWR0aDtcXHJcXG4gICAgICAtbXMtZmxleC1iYXNpczogJHdpZHRoO1xcclxcbiAgICAgICAgICBmbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxufVxcclxcblxcclxcbi8vIEF4aXMgQWxpZ25tZW50XFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBzcGFjZS1iZXR3ZWVuIHwgc3BhY2UtYXJvdW5kXFxyXFxuQG1peGluIGp1c3RpZnktY29udGVudCgkanVzdGlmeSkge1xcclxcbiAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgLW1vei1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgIC1tcy1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgICAgICAgIC1tcy1mbGV4LXBhY2s6ICRqdXN0aWZ5O1xcclxcbn1cXHJcXG5cXHJcXG4vLyBQYWNraW5nIEZsZXggTGluZXNcXHJcXG4vLyAtIGFwcGxpZXMgdG86IG11bHRpLWxpbmUgZmxleCBjb250YWluZXJzXFxyXFxuLy8gZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgc3BhY2UtYmV0d2VlbiB8IHNwYWNlLWFyb3VuZCB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24tY29udGVudCgkYWxpZ24pIHtcXHJcXG4gIC13ZWJraXQtYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1jb250ZW50OiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLWNvbnRlbnQ6ICRhbGlnbjtcXHJcXG4gICAgICAgICAgYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDcm9zcy1heGlzIEFsaWdubWVudFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgYmFzZWxpbmUgfCBzdHJldGNoXFxyXFxuQG1peGluIGFsaWduLWl0ZW1zKCRhbGlnbikge1xcclxcbiAgLXdlYmtpdC1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgIC1tcy1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgICAgICBhbGlnbi1pdGVtczogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDcm9zcy1heGlzIEFsaWdubWVudFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtc1xcclxcbi8vIGF1dG8gfCBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24tc2VsZigkYWxpZ24pIHtcXHJcXG4gIC13ZWJraXQtYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1zZWxmOiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLXNlbGY6ICRhbGlnbjtcXHJcXG4gICAgICAgICAgYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0xLTF7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWJhc2lzKGF1dG8pO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0wLTF7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDApO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWJhc2lzKGF1dG8pO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0xLTB7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMCk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBmbGV4LTAtMHtcXHJcXG4gIEBpbmNsdWRlIGZsZXgoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWdyb3coMCk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LXNocmluaygwKTtcXHJcXG59XFxyXFxuLypGbGV4IFNhc3MqL1wiLFwiQGltcG9ydCAnLi9jb2xvci5zY3NzJztcXHJcXG5AbWl4aW4ga2V5ZnJhbWVzKCRhbmltYXRpb24tbmFtZSkge1xcclxcbiAgQC13ZWJraXQta2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuICBALW1vei1rZXlmcmFtZXMgI3skYW5pbWF0aW9uLW5hbWV9IHtcXHJcXG4gICAgICBAY29udGVudDtcXHJcXG4gIH1cXHJcXG4gIEAtbXMta2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuICBALW8ta2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuICBAa2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBhbmltYXRpb24oJG5hbWUpIHtcXHJcXG4td2Via2l0LWFuaW1hdGlvbjogI3skbmFtZX07XFxyXFxuLW1vei1hbmltYXRpb246ICN7JG5hbWV9O1xcclxcbi1tcy1hbmltYXRpb246ICN7JG5hbWV9O1xcclxcbi1vLWFuaW1hdGlvbjogI3skbmFtZX07XFxyXFxuYW5pbWF0aW9uOiAjeyRuYW1lfTtcXHJcXG59XFxyXFxuXFxyXFxuQGluY2x1ZGUga2V5ZnJhbWVzKGNoYW5nZWNvbG9yKSB7XFxyXFxuICAwJSB7XFxyXFxuICAgICAgYm9yZGVyLWNvbG9yOiBibGFjaztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDEwMCUge1xcclxcbiAgICAgIGJvcmRlci1jb2xvcjogI2NjYztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQGluY2x1ZGUga2V5ZnJhbWVzKGZhZGVpbikge1xcclxcbiAgMCUge1xcclxcbiAgICAgIG9wYWNpdHk6IDA7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAxMDAlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAxO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AaW5jbHVkZSBrZXlmcmFtZXMoaW5wdXRFcnJvcikge1xcclxcbiAgICAwJSB7XFxyXFxuICAgICAgICBvcGFjaXR5OiAxO1xcclxcbiAgICB9IFxcclxcbiAgICAyNSUge1xcclxcbiAgICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgfSAgXFxyXFxuICAgIDUwJXtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxyXFxuICAgIH1cXHJcXG4gICAgNzUle1xcclxcbiAgICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgfVxcclxcbiAgICAxMDAlIHtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG5cXHJcXG5AaW5jbHVkZSBrZXlmcmFtZXMoc2xpZGVJbkZyb21Cb3R0b20pIHtcXHJcXG4gICAgMCUge1xcclxcbiAgICAgICAgdG9wOiAxMDAlO1xcclxcbiAgICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG4gICAgMTAwJSB7XFxyXFxuICAgICAgICB0b3A6IDUwJTtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxyXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgfVxcclxcbiAgfVwiLFwiQGltcG9ydCAndXRpbC9jb2xvci5zY3NzJztcXG5AaW1wb3J0ICd1dGlsL2ZsZXguc2Nzcyc7XFxuQGltcG9ydCAndXRpbC9ib3hzaGFkb3cuc2Nzcyc7XFxuQGltcG9ydCAndXRpbC9idXR0b24uc2Nzcyc7XFxuQGltcG9ydCAndXRpbC9hbmltYXRpb24uc2Nzcyc7XFxuXFxuLmZvb2RBZGRCdXR0b257XFxuICBAaW5jbHVkZSBidXR0b24tYSgkbGlnaHQtcmVkKTtcXG59XFxuXFxuLmZvb2RBZGRDb250YWluZXJ7XFxuICBwYWRkaW5nOiAzMHB4O1xcbiAgZm9udC1mYW1pbHk6ICdIYW5uYScsJ1VidW50dScsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDIwcHg7XFxufVxcblxcbi5mb29kQWRkSW5wdXR7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbjogYXV0bztcXG4gIHdpZHRoOiAyNDBweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNhYWE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgZm9udC1mYW1pbHk6ICdOb3RvIFNhbnMgS1InLCdVYnVudHUnLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIG91dGxpbmU6IDA7XFxuICB6LWluZGV4OiAyO1xcbiAgQGluY2x1ZGUgYm94U2hhZG93Qm90dG9tUmlnaHRUaGluTGlnaHRlcjtcXG59XFxuXFxuLmZvb2RBZGRJbnB1dEVycm9ye1xcbiAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRjb3JhbDtcXG4gIEBpbmNsdWRlIGFuaW1hdGlvbihpbnB1dEVycm9yIDAuM3MgbGluZWFyKTtcXG59XFxuLmZvb2RBZGRUYWd7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBtYXJnaW46IDJweDtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkbGlnaHQtcmVkO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgc3BhbntcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIHRvcDogLTE1cHg7XFxuICAgIHJpZ2h0OiAtNXB4O1xcbiAgICAmOmhvdmVye1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4uZm9vZEFkZENvbmZpcm17XFxuICBtYXJnaW46IDIwcHggYXV0bztcXG4gIHBhZGRpbmc6IDVweDtcXG4gIHdpZHRoOiA1MCU7XFxuICBAaW5jbHVkZSBidXR0b24tZmlsbCgkbGlnaHQtYnJvd24pO1xcbn1cIixcIkBtaXhpbiBidXR0b24tZmlsbCgkYmcsICRjb2xvcjp3aGl0ZSkge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgY29sb3I6ICRjb2xvcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZyw4JSk7XFxyXFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWJvcmRlcigkY29sb3IsJGJnOiB3aGl0ZSkge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgY29sb3I6ICRjb2xvcjtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZyw4JSk7XFxyXFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uKCRib3JkZXIpe1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgY29sb3I6ICRib3JkZXI7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gICY6aG92ZXJ7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gIH1cXHJcXG4gICY6YmVmb3JlLFxcclxcbiAgJjphZnRlcntcXHJcXG4gICAgY29udGVudDogJyc7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgei1pbmRleDotMTtcXHJcXG4gICAgd2lkdGg6IDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJvcmRlcjtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiB3aWR0aCAwLjJzIGVhc2UtaW4tb3V0O1xcclxcbiAgICBcXHJcXG4gIH1cXHJcXG4gIFxcclxcbiAgJjpob3ZlcjpiZWZvcmUsXFxyXFxuICAmOmhvdmVyOmFmdGVye1xcclxcbiAgICB3aWR0aDogMTAwJTsgLy90cmFuc2l0aW9u7JeQIO2VtOuLue2VmOuKlCBlbGVtZW5066eMIOuwlOuAlCDrlYwgcmV2ZXJzZeuPhCDrkJzri6QuXFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBidXR0b24tYWN0aXZlKCRiZyl7XFxyXFxuICBiYWNrZ3JvdW5kOiAkYmc7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmxpZ2h0ZW4oJGJnLDglKTtcXHJcXG4gICAgfVxcclxcbiAgICAmOmFjdGl2ZSB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbiAgXFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBidXR0b24tYm9yZGVyLWFjdGl2ZSgkYmcpe1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgJGJnO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZyw4JSk7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6bGlnaHRlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG4gIFxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWEoJGNvbG9yKXtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnSGFubmEnLCdVYnVudHUnLHNhbnMtc2VyaWY7XFxyXFxuICBmb250LXNpemU6IDI0cHg7XFxyXFxuICBjb2xvcjogJGNvbG9yO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgYXtcXHJcXG4gICAgICAmOmhvdmVye1xcclxcbiAgICAgICAgY29sb3I6IGRhcmtlbigkY29sb3IsMTUlKTsgXFxyXFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICAgIFxcclxcbiAgfVxcclxcbn1cIixcIiRkYXJrLWJsdWU6IHJnYig1MSwgNTUsIDY5KTtcXHJcXG4kbGlnaHQtYmx1ZTogIzI5ODBCOTtcXHJcXG4kZGFyay15ZWxsb3c6IHJnYigyNTUsIDE5MSwgMCk7XFxyXFxuJGxpZ2h0LXJlZDogI0ZGNDA0RTtcXHJcXG4kbGlnaHQtYnJvd246ICM0QTQwNEE7XFxyXFxuJGRhcmstZ3JlZW46ICM3QTgyNTY7XCIsXCJAbWl4aW4gYm94U2hhZG93Qm90dG9tVGhpbkxpZ2h0ZXIoKSB7XFxyXFxuICBib3gtc2hhZG93OiAwIDJweCAycHggLTJweCByZ2JhKDAsMCwwLC4xNSk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBib3hTaGFkb3dCb3R0b21SaWdodFRoaW5MaWdodGVyKCl7XFxyXFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDE3cHggMTlweCAzMHB4IC0xNnB4IHJnYmEoMCwwLDAsMC41KTtcXHJcXG4gIC1tb3otYm94LXNoYWRvdzogMTdweCAxOXB4IDMwcHggLTE2cHggcmdiYSgwLDAsMCwwLjUpO1xcclxcbiAgYm94LXNoYWRvdzogMTdweCAxOXB4IDMwcHggLTE2cHggcmdiYSgwLDAsMCwwLjUpO1xcclxcbn1cXHJcXG5cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikodHJ1ZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIEZsZXggU2FzcyAqL1xcbi8qRmxleCBTYXNzKi9cXG5ALXdlYmtpdC1rZXlmcmFtZXMgY2hhbmdlY29sb3Ige1xcbiAgMCUge1xcbiAgICBib3JkZXItY29sb3I6IGJsYWNrOyB9XFxuICAxMDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgY2hhbmdlY29sb3Ige1xcbiAgMCUge1xcbiAgICBib3JkZXItY29sb3I6IGJsYWNrOyB9XFxuICAxMDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjOyB9IH1cXG5cXG5ALW1zLWtleWZyYW1lcyBjaGFuZ2Vjb2xvciB7XFxuICAwJSB7XFxuICAgIGJvcmRlci1jb2xvcjogYmxhY2s7IH1cXG4gIDEwMCUge1xcbiAgICBib3JkZXItY29sb3I6ICNjY2M7IH0gfVxcblxcbkAtby1rZXlmcmFtZXMgY2hhbmdlY29sb3Ige1xcbiAgMCUge1xcbiAgICBib3JkZXItY29sb3I6IGJsYWNrOyB9XFxuICAxMDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGNoYW5nZWNvbG9yIHtcXG4gIDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiBibGFjazsgfVxcbiAgMTAwJSB7XFxuICAgIGJvcmRlci1jb2xvcjogI2NjYzsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgZmFkZWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkAtbXMta2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW8ta2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgaW5wdXRFcnJvciB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDI1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDc1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgaW5wdXRFcnJvciB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDI1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDc1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW1zLWtleWZyYW1lcyBpbnB1dEVycm9yIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgMjUlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgNTAlIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgNzUlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkAtby1rZXlmcmFtZXMgaW5wdXRFcnJvciB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDI1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDc1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGlucHV0RXJyb3Ige1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICAyNSUge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICA1MCUge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICA3NSUge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgc2xpZGVJbkZyb21Cb3R0b20ge1xcbiAgMCUge1xcbiAgICB0b3A6IDEwMCU7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gIDEwMCUge1xcbiAgICB0b3A6IDUwJTtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgZGlzcGxheTogYmxvY2s7IH0gfVxcblxcbkAtbXMta2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG5ALW8ta2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG4uZm9vZEFkZEJ1dHRvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1JyxzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgY29sb3I6ICNGRjQwNEU7IH1cXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgICAuZm9vZEFkZEJ1dHRvbiBhOmhvdmVyIHtcXG4gICAgICBjb2xvcjogI2YzMDAxMjtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7IH0gfVxcblxcbi5mb29kRWRpdENvbnRhaW5lciB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgZm9udC1mYW1pbHk6ICdIYW5uYScsJ1VidW50dScsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDIwcHg7IH1cXG5cXG4uZm9vZEVkaXRJbnB1dCB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIG1hcmdpbjogYXV0bztcXG4gIHdpZHRoOiAzMCU7XFxuICBwYWRkaW5nOiA1cHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjYWFhO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGZvbnQtZmFtaWx5OiAnTm90byBTYW5zIEtSJywnVWJ1bnR1Jywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBvdXRsaW5lOiAwO1xcbiAgei1pbmRleDogMjtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMTdweCAxOXB4IDMwcHggLTE2cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgLW1vei1ib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsIDAsIDAsIDAuNSk7IH1cXG5cXG4uZm9vZEVkaXRJbnB1dEVycm9yIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Y29yYWw7XFxuICAtd2Via2l0LWFuaW1hdGlvbjogaW5wdXRFcnJvciAwLjNzIGxpbmVhcjtcXG4gIC1tb3otYW5pbWF0aW9uOiBpbnB1dEVycm9yIDAuM3MgbGluZWFyO1xcbiAgLW1zLWFuaW1hdGlvbjogaW5wdXRFcnJvciAwLjNzIGxpbmVhcjtcXG4gIC1vLWFuaW1hdGlvbjogaW5wdXRFcnJvciAwLjNzIGxpbmVhcjtcXG4gIGFuaW1hdGlvbjogaW5wdXRFcnJvciAwLjNzIGxpbmVhcjsgfVxcblxcbi5mb29kRWRpdFRhZyB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBtYXJnaW46IDJweDtcXG4gIG1hcmdpbi10b3A6IDE1cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkY0MDRFO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4OyB9XFxuICAuZm9vZEVkaXRUYWcgc3BhbiB7XFxuICAgIGNvbG9yOiBibGFjaztcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB0b3A6IC0xNXB4O1xcbiAgICByaWdodDogLTVweDsgfVxcbiAgICAuZm9vZEVkaXRUYWcgc3Bhbjpob3ZlciB7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyOyB9XFxuXFxuLmZvb2RFZGl0Q29uZmlybSB7XFxuICBtYXJnaW46IDIwcHggYXV0bztcXG4gIHBhZGRpbmc6IDVweDtcXG4gIHdpZHRoOiA1MCU7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kOiAjNEE0MDRBO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLmZvb2RFZGl0Q29uZmlybTpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzM0MmQzNDtcXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcbiAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTsgfVxcbiAgICAuZm9vZEVkaXRDb25maXJtOmFjdGl2ZSB7XFxuICAgICAgYmFja2dyb3VuZDogIzA2MDUwNjsgfSB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS91dGlsL2ZsZXguc2Nzc1wiLFwiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS91dGlsL2FuaW1hdGlvbi5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL0Zvb2RFZGl0LnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9idXR0b24uc2Nzc1wiLFwiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS91dGlsL2NvbG9yLnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9ib3hzaGFkb3cuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxjQUFBO0FBOEpBLFlBQUE7QUM1SkU7RUEwQkE7SUFDSSxtQkFBbUIsRUFBQTtFQUd2QjtJQUNJLGtCQUFrQixFQUFBLEVBQUE7O0FBNUJ0QjtFQXVCQTtJQUNJLG1CQUFtQixFQUFBO0VBR3ZCO0lBQ0ksa0JBQWtCLEVBQUEsRUFBQTs7QUF6QnRCO0VBb0JBO0lBQ0ksbUJBQW1CLEVBQUE7RUFHdkI7SUFDSSxrQkFBa0IsRUFBQSxFQUNyQjs7QUF2QkQ7RUFpQkE7SUFDSSxtQkFBbUIsRUFBQTtFQUd2QjtJQUNJLGtCQUFrQixFQUFBLEVBQUE7O0FBbkJ0QjtFQWNBO0lBQ0ksbUJBQW1CLEVBQUE7RUFHdkI7SUFDSSxrQkFBa0IsRUFBQSxFQUFBOztBQS9CdEI7RUFvQ0E7SUFDSSxV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QUFZO0VBQ1osa0JBQWtCLEVBQUE7RUFQcEI7SUFTSSxZQUFZO0lBQ1osZUFBZTtJQUNmLHVCQUF1QjtJQUN2QixrQkFBa0I7SUFDbEIsVUFBVTtJQUNWLFdBQVcsRUFBQTtJQWRmO01BZ0JNLGVBQWUsRUFBQTs7QUFLckI7RUFDRSxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLFVBQVU7RUM1RFYsZUFBZTtFQUNmLG1CQ0VtQjtFRERuQixZQUhrQyxFQUFBO0VBSWxDO0lEc0RGO01DcERNLG1CQUF5QjtNQUN6Qix5QkFBeUI7TUFDekIsaUNBQWlDLEVBQUE7SURrRHZDO01DL0NNLG1CQUEwQixFQUFBLEVBQzNCXCIsXCJmaWxlXCI6XCJGb29kRWRpdC5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIEZsZXggU2FzcyAqL1xcclxcbkBtaXhpbiBmbGV4Ym94KCkge1xcclxcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxyXFxuICBkaXNwbGF5OiAtbW96LWJveDtcXHJcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcclxcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gVGhlICdmbGV4JyBzaG9ydGhhbmRcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8cG9zaXRpdmUtbnVtYmVyPiwgaW5pdGlhbCwgYXV0bywgb3Igbm9uZVxcclxcbkBtaXhpbiBmbGV4KCR2YWx1ZXMpIHtcXHJcXG4gIC13ZWJraXQtYm94LWZsZXg6ICR2YWx1ZXM7XFxyXFxuICAgICAtbW96LWJveC1mbGV4OiAkdmFsdWVzO1xcclxcbiAgICAgIC13ZWJraXQtZmxleDogJHZhbHVlcztcXHJcXG4gIFxcdCAgLW1zLWZsZXg6ICR2YWx1ZXM7XFxyXFxuICBcXHQgICAgICBmbGV4OiAkdmFsdWVzO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IEZsb3cgRGlyZWN0aW9uXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyByb3cgfCByb3ctcmV2ZXJzZSB8IGNvbHVtbiB8IGNvbHVtbi1yZXZlcnNlXFxyXFxuQG1peGluIGZsZXgtZGlyZWN0aW9uKCRkaXJlY3Rpb24pIHtcXHJcXG4gIC13ZWJraXQtZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxuICAgICAtbW96LWZsZXgtZGlyZWN0aW9uOiAkZGlyZWN0aW9uO1xcclxcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjtcXHJcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggTGluZSBXcmFwcGluZ1xcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gbm93cmFwIHwgd3JhcCB8IHdyYXAtcmV2ZXJzZVxcclxcbkBtaXhpbiBmbGV4LXdyYXAoJHdyYXApIHtcXHJcXG4gIC13ZWJraXQtZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgIC1tb3otZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgICAtbXMtZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgICAgICAgZmxleC13cmFwOiAkd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBEaXJlY3Rpb24gYW5kIFdyYXBcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggY29udGFpbmVyc1xcclxcbi8vIDxmbGV4LWRpcmVjdGlvbj4gfHwgPGZsZXgtd3JhcD5cXHJcXG5AbWl4aW4gZmxleC1mbG93KCRmbG93KSB7XFxyXFxuICAtd2Via2l0LWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAtbW96LWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAgLW1zLWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAgICAgIGZsZXgtZmxvdzogJGZsb3c7XFxyXFxufVxcclxcblxcclxcbi8vIERpc3BsYXkgT3JkZXJcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8aW50ZWdlcj5cXHJcXG5AbWl4aW4gb3JkZXIoJHZhbCkge1xcclxcbiAgLXdlYmtpdC1ib3gtb3JkaW5hbC1ncm91cDogJHZhbDtcXHJcXG4gICAgIC1tb3otYm94LW9yZGluYWwtZ3JvdXA6ICR2YWw7XFxyXFxuICBcXHQgICAgIC1tcy1mbGV4LW9yZGVyOiAkdmFsO1xcclxcbiAgXFx0ICAgICAgLXdlYmtpdC1vcmRlcjogJHZhbDtcXHJcXG4gIFxcdFxcdCAgICAgIG9yZGVyOiAkdmFsO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IGdyb3cgZmFjdG9yXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zXFxyXFxuLy8gPG51bWJlcj5cXHJcXG5AbWl4aW4gZmxleC1ncm93KCRncm93KSB7XFxyXFxuICAtd2Via2l0LWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAtbW96LWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAgLW1zLWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAgICAgIGZsZXgtZ3JvdzogJGdyb3c7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggc2hyaW5rXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW0gc2hyaW5rIGZhY3Rvclxcclxcbi8vIDxudW1iZXI+XFxyXFxuQG1peGluIGZsZXgtc2hyaW5rKCRzaHJpbmspIHtcXHJcXG4gIC13ZWJraXQtZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxuICAgICAtbW96LWZsZXgtc2hyaW5rOiAkc2hyaW5rO1xcclxcbiAgICAgIC1tcy1mbGV4LXNocmluazogJHNocmluaztcXHJcXG4gICAgICAgICAgZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggYmFzaXNcXHJcXG4vLyAtIHRoZSBpbml0aWFsIG1haW4gc2l6ZSBvZiB0aGUgZmxleCBpdGVtXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zbml0aWFsIG1haW4gc2l6ZSBvZiB0aGUgZmxleCBpdGVtXFxyXFxuLy8gPHdpZHRoPlxcclxcbkBtaXhpbiBmbGV4LWJhc2lzKCR3aWR0aCkge1xcclxcbiAgLXdlYmtpdC1mbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxuICAgICAtbW96LWZsZXgtYmFzaXM6ICR3aWR0aDtcXHJcXG4gICAgICAtbXMtZmxleC1iYXNpczogJHdpZHRoO1xcclxcbiAgICAgICAgICBmbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxufVxcclxcblxcclxcbi8vIEF4aXMgQWxpZ25tZW50XFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBzcGFjZS1iZXR3ZWVuIHwgc3BhY2UtYXJvdW5kXFxyXFxuQG1peGluIGp1c3RpZnktY29udGVudCgkanVzdGlmeSkge1xcclxcbiAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgLW1vei1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgIC1tcy1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgICAgICAgIC1tcy1mbGV4LXBhY2s6ICRqdXN0aWZ5O1xcclxcbn1cXHJcXG5cXHJcXG4vLyBQYWNraW5nIEZsZXggTGluZXNcXHJcXG4vLyAtIGFwcGxpZXMgdG86IG11bHRpLWxpbmUgZmxleCBjb250YWluZXJzXFxyXFxuLy8gZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgc3BhY2UtYmV0d2VlbiB8IHNwYWNlLWFyb3VuZCB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24tY29udGVudCgkYWxpZ24pIHtcXHJcXG4gIC13ZWJraXQtYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1jb250ZW50OiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLWNvbnRlbnQ6ICRhbGlnbjtcXHJcXG4gICAgICAgICAgYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDcm9zcy1heGlzIEFsaWdubWVudFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgYmFzZWxpbmUgfCBzdHJldGNoXFxyXFxuQG1peGluIGFsaWduLWl0ZW1zKCRhbGlnbikge1xcclxcbiAgLXdlYmtpdC1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgIC1tcy1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgICAgICBhbGlnbi1pdGVtczogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDcm9zcy1heGlzIEFsaWdubWVudFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtc1xcclxcbi8vIGF1dG8gfCBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24tc2VsZigkYWxpZ24pIHtcXHJcXG4gIC13ZWJraXQtYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1zZWxmOiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLXNlbGY6ICRhbGlnbjtcXHJcXG4gICAgICAgICAgYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0xLTF7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWJhc2lzKGF1dG8pO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0wLTF7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDApO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWJhc2lzKGF1dG8pO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0xLTB7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMCk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBmbGV4LTAtMHtcXHJcXG4gIEBpbmNsdWRlIGZsZXgoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWdyb3coMCk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LXNocmluaygwKTtcXHJcXG59XFxyXFxuLypGbGV4IFNhc3MqL1wiLFwiQGltcG9ydCAnLi9jb2xvci5zY3NzJztcXHJcXG5AbWl4aW4ga2V5ZnJhbWVzKCRhbmltYXRpb24tbmFtZSkge1xcclxcbiAgQC13ZWJraXQta2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuICBALW1vei1rZXlmcmFtZXMgI3skYW5pbWF0aW9uLW5hbWV9IHtcXHJcXG4gICAgICBAY29udGVudDtcXHJcXG4gIH1cXHJcXG4gIEAtbXMta2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuICBALW8ta2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuICBAa2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBhbmltYXRpb24oJG5hbWUpIHtcXHJcXG4td2Via2l0LWFuaW1hdGlvbjogI3skbmFtZX07XFxyXFxuLW1vei1hbmltYXRpb246ICN7JG5hbWV9O1xcclxcbi1tcy1hbmltYXRpb246ICN7JG5hbWV9O1xcclxcbi1vLWFuaW1hdGlvbjogI3skbmFtZX07XFxyXFxuYW5pbWF0aW9uOiAjeyRuYW1lfTtcXHJcXG59XFxyXFxuXFxyXFxuQGluY2x1ZGUga2V5ZnJhbWVzKGNoYW5nZWNvbG9yKSB7XFxyXFxuICAwJSB7XFxyXFxuICAgICAgYm9yZGVyLWNvbG9yOiBibGFjaztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDEwMCUge1xcclxcbiAgICAgIGJvcmRlci1jb2xvcjogI2NjYztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQGluY2x1ZGUga2V5ZnJhbWVzKGZhZGVpbikge1xcclxcbiAgMCUge1xcclxcbiAgICAgIG9wYWNpdHk6IDA7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAxMDAlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAxO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AaW5jbHVkZSBrZXlmcmFtZXMoaW5wdXRFcnJvcikge1xcclxcbiAgICAwJSB7XFxyXFxuICAgICAgICBvcGFjaXR5OiAxO1xcclxcbiAgICB9IFxcclxcbiAgICAyNSUge1xcclxcbiAgICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgfSAgXFxyXFxuICAgIDUwJXtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxyXFxuICAgIH1cXHJcXG4gICAgNzUle1xcclxcbiAgICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgfVxcclxcbiAgICAxMDAlIHtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG5cXHJcXG5AaW5jbHVkZSBrZXlmcmFtZXMoc2xpZGVJbkZyb21Cb3R0b20pIHtcXHJcXG4gICAgMCUge1xcclxcbiAgICAgICAgdG9wOiAxMDAlO1xcclxcbiAgICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG4gICAgMTAwJSB7XFxyXFxuICAgICAgICB0b3A6IDUwJTtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxyXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgfVxcclxcbiAgfVwiLFwiQGltcG9ydCAndXRpbC9jb2xvci5zY3NzJztcXG5AaW1wb3J0ICd1dGlsL2ZsZXguc2Nzcyc7XFxuQGltcG9ydCAndXRpbC9ib3hzaGFkb3cuc2Nzcyc7XFxuQGltcG9ydCAndXRpbC9idXR0b24uc2Nzcyc7XFxuQGltcG9ydCAndXRpbC9hbmltYXRpb24uc2Nzcyc7XFxuXFxuLmZvb2RBZGRCdXR0b257XFxuICBAaW5jbHVkZSBidXR0b24tYSgkbGlnaHQtcmVkKTtcXG59XFxuXFxuLmZvb2RFZGl0Q29udGFpbmVye1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGZvbnQtZmFtaWx5OiAnSGFubmEnLCdVYnVudHUnLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbn1cXG5cXG4uZm9vZEVkaXRJbnB1dHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgd2lkdGg6IDMwJTtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNhYWE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xcbiAgZm9udC1mYW1pbHk6ICdOb3RvIFNhbnMgS1InLCdVYnVudHUnLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIG91dGxpbmU6IDA7XFxuICB6LWluZGV4OiAyO1xcbiAgQGluY2x1ZGUgYm94U2hhZG93Qm90dG9tUmlnaHRUaGluTGlnaHRlcjtcXG59XFxuXFxuLmZvb2RFZGl0SW5wdXRFcnJvcntcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Y29yYWw7XFxuICBAaW5jbHVkZSBhbmltYXRpb24oaW5wdXRFcnJvciAwLjNzIGxpbmVhcik7XFxufVxcbi5mb29kRWRpdFRhZ3tcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHBhZGRpbmc6IDVweDtcXG4gIG1hcmdpbjogMnB4O1xcbiAgbWFyZ2luLXRvcDogMTVweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICRsaWdodC1yZWQ7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBzcGFue1xcbiAgICBjb2xvcjogYmxhY2s7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgdG9wOiAtMTVweDtcXG4gICAgcmlnaHQ6IC01cHg7XFxuICAgICY6aG92ZXJ7XFxuICAgICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICB9XFxuICB9XFxufVxcblxcbi5mb29kRWRpdENvbmZpcm17XFxuICBtYXJnaW46IDIwcHggYXV0bztcXG4gIHBhZGRpbmc6IDVweDtcXG4gIHdpZHRoOiA1MCU7XFxuICBAaW5jbHVkZSBidXR0b24tZmlsbCgkbGlnaHQtYnJvd24pO1xcbn1cIixcIkBtaXhpbiBidXR0b24tZmlsbCgkYmcsICRjb2xvcjp3aGl0ZSkge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgY29sb3I6ICRjb2xvcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZyw4JSk7XFxyXFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWJvcmRlcigkY29sb3IsJGJnOiB3aGl0ZSkge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgY29sb3I6ICRjb2xvcjtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZyw4JSk7XFxyXFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uKCRib3JkZXIpe1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgY29sb3I6ICRib3JkZXI7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gICY6aG92ZXJ7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gIH1cXHJcXG4gICY6YmVmb3JlLFxcclxcbiAgJjphZnRlcntcXHJcXG4gICAgY29udGVudDogJyc7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgei1pbmRleDotMTtcXHJcXG4gICAgd2lkdGg6IDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJvcmRlcjtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiB3aWR0aCAwLjJzIGVhc2UtaW4tb3V0O1xcclxcbiAgICBcXHJcXG4gIH1cXHJcXG4gIFxcclxcbiAgJjpob3ZlcjpiZWZvcmUsXFxyXFxuICAmOmhvdmVyOmFmdGVye1xcclxcbiAgICB3aWR0aDogMTAwJTsgLy90cmFuc2l0aW9u7JeQIO2VtOuLue2VmOuKlCBlbGVtZW5066eMIOuwlOuAlCDrlYwgcmV2ZXJzZeuPhCDrkJzri6QuXFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBidXR0b24tYWN0aXZlKCRiZyl7XFxyXFxuICBiYWNrZ3JvdW5kOiAkYmc7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmxpZ2h0ZW4oJGJnLDglKTtcXHJcXG4gICAgfVxcclxcbiAgICAmOmFjdGl2ZSB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbiAgXFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBidXR0b24tYm9yZGVyLWFjdGl2ZSgkYmcpe1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgJGJnO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZyw4JSk7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6bGlnaHRlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG4gIFxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWEoJGNvbG9yKXtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnSGFubmEnLCdVYnVudHUnLHNhbnMtc2VyaWY7XFxyXFxuICBmb250LXNpemU6IDI0cHg7XFxyXFxuICBjb2xvcjogJGNvbG9yO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgYXtcXHJcXG4gICAgICAmOmhvdmVye1xcclxcbiAgICAgICAgY29sb3I6IGRhcmtlbigkY29sb3IsMTUlKTsgXFxyXFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICAgIFxcclxcbiAgfVxcclxcbn1cIixcIiRkYXJrLWJsdWU6IHJnYig1MSwgNTUsIDY5KTtcXHJcXG4kbGlnaHQtYmx1ZTogIzI5ODBCOTtcXHJcXG4kZGFyay15ZWxsb3c6IHJnYigyNTUsIDE5MSwgMCk7XFxyXFxuJGxpZ2h0LXJlZDogI0ZGNDA0RTtcXHJcXG4kbGlnaHQtYnJvd246ICM0QTQwNEE7XFxyXFxuJGRhcmstZ3JlZW46ICM3QTgyNTY7XCIsXCJAbWl4aW4gYm94U2hhZG93Qm90dG9tVGhpbkxpZ2h0ZXIoKSB7XFxyXFxuICBib3gtc2hhZG93OiAwIDJweCAycHggLTJweCByZ2JhKDAsMCwwLC4xNSk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBib3hTaGFkb3dCb3R0b21SaWdodFRoaW5MaWdodGVyKCl7XFxyXFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDE3cHggMTlweCAzMHB4IC0xNnB4IHJnYmEoMCwwLDAsMC41KTtcXHJcXG4gIC1tb3otYm94LXNoYWRvdzogMTdweCAxOXB4IDMwcHggLTE2cHggcmdiYSgwLDAsMCwwLjUpO1xcclxcbiAgYm94LXNoYWRvdzogMTdweCAxOXB4IDMwcHggLTE2cHggcmdiYSgwLDAsMCwwLjUpO1xcclxcbn1cXHJcXG5cXHJcXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikodHJ1ZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIEZsZXggU2FzcyAqL1xcbi8qRmxleCBTYXNzKi9cXG4uZm9vZEluZm9CdXR0b24ge1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1mYW1pbHk6ICdIYW5uYScsJ1VidW50dScsc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMjRweDtcXG4gIGNvbG9yOiAjRkY0MDRFOyB9XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLmZvb2RJbmZvQnV0dG9uIGE6aG92ZXIge1xcbiAgICAgIGNvbG9yOiAjZjMwMDEyO1xcbiAgICAgIGN1cnNvcjogcG9pbnRlcjsgfSB9XFxuXFxuLmZvb2RJbmZvTGlzdCB7XFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXG4gIGRpc3BsYXk6IC1tb3otYm94O1xcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYm94LXNoYWRvdzogMCAycHggMnB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcXG4gIGZvbnQtZmFtaWx5OiAnSGFubmEnLCdVYnVudHUnLCBzYW5zLXNlcmlmOyB9XFxuXFxuLmZvb2RJbmZvSGVhZGVyIHtcXG4gIGJhY2tncm91bmQ6ICM0QTQwNEE7XFxuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGZvbnQtc2l6ZTogMjRweCAhaW1wb3J0YW50OyB9XFxuXFxuLmZvb2RJbmZvRm9vZCB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgLW1vei1ib3gtZmxleDogMTtcXG4gIC13ZWJraXQtZmxleDogMTtcXG4gIC1tcy1mbGV4OiAxO1xcbiAgZmxleDogMTtcXG4gIC13ZWJraXQtZmxleC1ncm93OiAwO1xcbiAgLW1vei1mbGV4LWdyb3c6IDA7XFxuICAtbXMtZmxleC1ncm93OiAwO1xcbiAgZmxleC1ncm93OiAwO1xcbiAgLXdlYmtpdC1mbGV4LXNocmluazogMDtcXG4gIC1tb3otZmxleC1zaHJpbms6IDA7XFxuICAtbXMtZmxleC1zaHJpbms6IDA7XFxuICBmbGV4LXNocmluazogMDtcXG4gIGZsZXgtYmFzaXM6IDMwJTtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGNvbG9yOiAjNEE0MDRBOyB9XFxuXFxuLmZvb2RJbmZvVGFncyB7XFxuICAtd2Via2l0LWJveC1mbGV4OiAxO1xcbiAgLW1vei1ib3gtZmxleDogMTtcXG4gIC13ZWJraXQtZmxleDogMTtcXG4gIC1tcy1mbGV4OiAxO1xcbiAgZmxleDogMTtcXG4gIC13ZWJraXQtZmxleC1ncm93OiAxO1xcbiAgLW1vei1mbGV4LWdyb3c6IDE7XFxuICAtbXMtZmxleC1ncm93OiAxO1xcbiAgZmxleC1ncm93OiAxO1xcbiAgLXdlYmtpdC1mbGV4LXNocmluazogMTtcXG4gIC1tb3otZmxleC1zaHJpbms6IDE7XFxuICAtbXMtZmxleC1zaHJpbms6IDE7XFxuICBmbGV4LXNocmluazogMTtcXG4gIC13ZWJraXQtZmxleC1iYXNpczogYXV0bztcXG4gIC1tb3otZmxleC1iYXNpczogYXV0bztcXG4gIC1tcy1mbGV4LWJhc2lzOiBhdXRvO1xcbiAgZmxleC1iYXNpczogYXV0bztcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIHBhZGRpbmc6IDEwcHg7IH1cXG4gIC5mb29kSW5mb1RhZ3Mgc3BhbiB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBiYWNrZ3JvdW5kOiAjRkY0MDRFO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIG1hcmdpbjogMCAycHg7IH1cXG5cXG4uZm9vZEluZm9FZGl0IHtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAtbW96LWJveC1mbGV4OiAxO1xcbiAgLXdlYmtpdC1mbGV4OiAxO1xcbiAgLW1zLWZsZXg6IDE7XFxuICBmbGV4OiAxO1xcbiAgLXdlYmtpdC1mbGV4LWdyb3c6IDA7XFxuICAtbW96LWZsZXgtZ3JvdzogMDtcXG4gIC1tcy1mbGV4LWdyb3c6IDA7XFxuICBmbGV4LWdyb3c6IDA7XFxuICAtd2Via2l0LWZsZXgtc2hyaW5rOiAxO1xcbiAgLW1vei1mbGV4LXNocmluazogMTtcXG4gIC1tcy1mbGV4LXNocmluazogMTtcXG4gIGZsZXgtc2hyaW5rOiAxO1xcbiAgLXdlYmtpdC1mbGV4LWJhc2lzOiBhdXRvO1xcbiAgLW1vei1mbGV4LWJhc2lzOiBhdXRvO1xcbiAgLW1zLWZsZXgtYmFzaXM6IGF1dG87XFxuICBmbGV4LWJhc2lzOiBhdXRvO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgY29sb3I6ICNGRjQwNEU7XFxuICBwYWRkaW5nOiAxMHB4OyB9XFxuXFxuLmZvb2RJbmZvU2VhcmNoIHtcXG4gIHBhZGRpbmc6IDEwcHg7IH1cXG5cXG4uZm9vZEluZm9TZWFyY2hJbnB1dCB7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW46IGF1dG87XFxuICB3aWR0aDogNTAlO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2FhYTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1Jywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBvdXRsaW5lOiAwO1xcbiAgei1pbmRleDogMjtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMTdweCAxOXB4IDMwcHggLTE2cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgLW1vei1ib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsIDAsIDAsIDAuNSk7IH1cXG5cXG4uZm9vZEluZm9TZWFyY2hJY29uIHtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNhYWE7XFxuICBtYXJnaW46IDAgM3B4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxuICBjb2xvcjogI2FhYTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICNhYWE7XFxuICBjb2xvcjogYmxhY2s7IH1cXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgICAuZm9vZEluZm9TZWFyY2hJY29uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZWJlYmViO1xcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlOyB9XFxuICAgIC5mb29kSW5mb1NlYXJjaEljb246YWN0aXZlIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjYmZiZmJmOyB9IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvZmxleC5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL0Zvb2RJbmZvLnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9idXR0b24uc2Nzc1wiLFwiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS91dGlsL2NvbG9yLnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9ib3hzaGFkb3cuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxjQUFBO0FBOEpBLFlBQUE7QUN6SkE7RUN5RkUsa0JBQWtCO0VBQ2xCLHdDQUF3QztFQUN4QyxlQUFlO0VBQ2YsY0M5RmlCLEVBQUE7RUQrRmpCO0lEN0ZGO01DZ0dRLGNBQXlCO01BQ3pCLGVBQWUsRUFBQSxFQUNoQjs7QUQ5RlA7RURQRSxvQkFBb0I7RUFDcEIsaUJBQWlCO0VBQ2pCLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsYUFBYTtFSUxiLDhDQUEwQztFSFcxQyx5Q0FBeUMsRUFBQTs7QUFFM0M7RUFDRSxtQkVYbUI7RUZZbkIsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQiwwQkFBMEIsRUFBQTs7QUFFNUI7RURQRSxtQkE2SWU7RUE1SVosZ0JBNElZO0VBM0lYLGVBMklXO0VBMUlaLFdBMElZO0VBeklSLE9BeUlRO0VBekZmLG9CQTBGb0I7RUF6RmpCLGlCQXlGaUI7RUF4RmhCLGdCQXdGZ0I7RUF2RlosWUF1Rlk7RUFoRnBCLHNCQWlGc0I7RUFoRm5CLG1CQWdGbUI7RUEvRWxCLGtCQStFa0I7RUE5RWQsY0E4RWM7RUN0SXRCLGVBQWU7RUFDZixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLHFCQUFxQjtFQUNyQixzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLGNFeEJtQixFQUFBOztBRjJCckI7RURsQkUsbUJBeUhlO0VBeEhaLGdCQXdIWTtFQXZIWCxlQXVIVztFQXRIWixXQXNIWTtFQXJIUixPQXFIUTtFQXJFZixvQkFzRW9CO0VBckVqQixpQkFxRWlCO0VBcEVoQixnQkFvRWdCO0VBbkVaLFlBbUVZO0VBNURwQixzQkE2RHNCO0VBNURuQixtQkE0RG1CO0VBM0RsQixrQkEyRGtCO0VBMURkLGNBMERjO0VBbER0Qix3QkFtRHdCO0VBbERyQixxQkFrRHFCO0VBakRwQixvQkFpRG9CO0VBaERoQixnQkFnRGdCO0VDeEd4QixlQUFlO0VBQ2YsYUFBYSxFQUFBO0VBSGY7SUFLSSxxQkFBcUI7SUFDckIsc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixtQkVwQ2U7SUZxQ2YsWUFBWTtJQUNaLG1CQUFtQjtJQUNuQixhQUFhLEVBQUE7O0FBSWpCO0VEakNFLG1CQWdJZTtFQS9IWixnQkErSFk7RUE5SFgsZUE4SFc7RUE3SFosV0E2SFk7RUE1SFIsT0E0SFE7RUE1RWYsb0JBNkVvQjtFQTVFakIsaUJBNEVpQjtFQTNFaEIsZ0JBMkVnQjtFQTFFWixZQTBFWTtFQW5FcEIsc0JBb0VzQjtFQW5FbkIsbUJBbUVtQjtFQWxFbEIsa0JBa0VrQjtFQWpFZCxjQWlFYztFQXpEdEIsd0JBMER3QjtFQXpEckIscUJBeURxQjtFQXhEcEIsb0JBd0RvQjtFQXZEaEIsZ0JBdURnQjtFQ2hHeEIsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixjRS9DaUI7RUZnRGpCLGFBQWEsRUFBQTs7QUFHZjtFQUNFLGFBQWEsRUFBQTs7QUFHZjtFQUNFLHFCQUFxQjtFQUNyQixZQUFZO0VBQ1osVUFBVTtFQUNWLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsc0JBQXNCO0VBQ3RCLHNCQUFzQjtFQUN0Qix5Q0FBeUM7RUFDekMsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsVUFBVTtFQUNWLFVBQVU7RUdsRVYsMkRBQXdEO0VBQ3hELHdEQUFxRDtFQUNyRCxtREFBZ0QsRUFBQTs7QUhvRWxEO0VBQ0UscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZixZQUFZO0VBQ1osc0JBQXNCO0VBQ3RCLGFBQWE7RUMvRGIsZUFBZTtFQUNmLGlCQUZvQztFQUdwQyxXRDhEMkI7RUM3RDNCLHNCRDZEMkI7RUFDM0IsWUFBWSxFQUFBO0VDN0RaO0lEc0RGO01DcERNLG1CQUF5QjtNQUN6Qix5QkFBeUI7TUFDekIsaUNBQWlDLEVBQUE7SURrRHZDO01DL0NNLG1CQUEwQixFQUFBLEVBQzNCXCIsXCJmaWxlXCI6XCJGb29kSW5mby5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIEZsZXggU2FzcyAqL1xcclxcbkBtaXhpbiBmbGV4Ym94KCkge1xcclxcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxyXFxuICBkaXNwbGF5OiAtbW96LWJveDtcXHJcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcclxcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gVGhlICdmbGV4JyBzaG9ydGhhbmRcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8cG9zaXRpdmUtbnVtYmVyPiwgaW5pdGlhbCwgYXV0bywgb3Igbm9uZVxcclxcbkBtaXhpbiBmbGV4KCR2YWx1ZXMpIHtcXHJcXG4gIC13ZWJraXQtYm94LWZsZXg6ICR2YWx1ZXM7XFxyXFxuICAgICAtbW96LWJveC1mbGV4OiAkdmFsdWVzO1xcclxcbiAgICAgIC13ZWJraXQtZmxleDogJHZhbHVlcztcXHJcXG4gIFxcdCAgLW1zLWZsZXg6ICR2YWx1ZXM7XFxyXFxuICBcXHQgICAgICBmbGV4OiAkdmFsdWVzO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IEZsb3cgRGlyZWN0aW9uXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyByb3cgfCByb3ctcmV2ZXJzZSB8IGNvbHVtbiB8IGNvbHVtbi1yZXZlcnNlXFxyXFxuQG1peGluIGZsZXgtZGlyZWN0aW9uKCRkaXJlY3Rpb24pIHtcXHJcXG4gIC13ZWJraXQtZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxuICAgICAtbW96LWZsZXgtZGlyZWN0aW9uOiAkZGlyZWN0aW9uO1xcclxcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjtcXHJcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggTGluZSBXcmFwcGluZ1xcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gbm93cmFwIHwgd3JhcCB8IHdyYXAtcmV2ZXJzZVxcclxcbkBtaXhpbiBmbGV4LXdyYXAoJHdyYXApIHtcXHJcXG4gIC13ZWJraXQtZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgIC1tb3otZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgICAtbXMtZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgICAgICAgZmxleC13cmFwOiAkd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBEaXJlY3Rpb24gYW5kIFdyYXBcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggY29udGFpbmVyc1xcclxcbi8vIDxmbGV4LWRpcmVjdGlvbj4gfHwgPGZsZXgtd3JhcD5cXHJcXG5AbWl4aW4gZmxleC1mbG93KCRmbG93KSB7XFxyXFxuICAtd2Via2l0LWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAtbW96LWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAgLW1zLWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAgICAgIGZsZXgtZmxvdzogJGZsb3c7XFxyXFxufVxcclxcblxcclxcbi8vIERpc3BsYXkgT3JkZXJcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8aW50ZWdlcj5cXHJcXG5AbWl4aW4gb3JkZXIoJHZhbCkge1xcclxcbiAgLXdlYmtpdC1ib3gtb3JkaW5hbC1ncm91cDogJHZhbDtcXHJcXG4gICAgIC1tb3otYm94LW9yZGluYWwtZ3JvdXA6ICR2YWw7XFxyXFxuICBcXHQgICAgIC1tcy1mbGV4LW9yZGVyOiAkdmFsO1xcclxcbiAgXFx0ICAgICAgLXdlYmtpdC1vcmRlcjogJHZhbDtcXHJcXG4gIFxcdFxcdCAgICAgIG9yZGVyOiAkdmFsO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IGdyb3cgZmFjdG9yXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zXFxyXFxuLy8gPG51bWJlcj5cXHJcXG5AbWl4aW4gZmxleC1ncm93KCRncm93KSB7XFxyXFxuICAtd2Via2l0LWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAtbW96LWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAgLW1zLWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAgICAgIGZsZXgtZ3JvdzogJGdyb3c7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggc2hyaW5rXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW0gc2hyaW5rIGZhY3Rvclxcclxcbi8vIDxudW1iZXI+XFxyXFxuQG1peGluIGZsZXgtc2hyaW5rKCRzaHJpbmspIHtcXHJcXG4gIC13ZWJraXQtZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxuICAgICAtbW96LWZsZXgtc2hyaW5rOiAkc2hyaW5rO1xcclxcbiAgICAgIC1tcy1mbGV4LXNocmluazogJHNocmluaztcXHJcXG4gICAgICAgICAgZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggYmFzaXNcXHJcXG4vLyAtIHRoZSBpbml0aWFsIG1haW4gc2l6ZSBvZiB0aGUgZmxleCBpdGVtXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zbml0aWFsIG1haW4gc2l6ZSBvZiB0aGUgZmxleCBpdGVtXFxyXFxuLy8gPHdpZHRoPlxcclxcbkBtaXhpbiBmbGV4LWJhc2lzKCR3aWR0aCkge1xcclxcbiAgLXdlYmtpdC1mbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxuICAgICAtbW96LWZsZXgtYmFzaXM6ICR3aWR0aDtcXHJcXG4gICAgICAtbXMtZmxleC1iYXNpczogJHdpZHRoO1xcclxcbiAgICAgICAgICBmbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxufVxcclxcblxcclxcbi8vIEF4aXMgQWxpZ25tZW50XFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBzcGFjZS1iZXR3ZWVuIHwgc3BhY2UtYXJvdW5kXFxyXFxuQG1peGluIGp1c3RpZnktY29udGVudCgkanVzdGlmeSkge1xcclxcbiAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgLW1vei1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgIC1tcy1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgICAgICAgIC1tcy1mbGV4LXBhY2s6ICRqdXN0aWZ5O1xcclxcbn1cXHJcXG5cXHJcXG4vLyBQYWNraW5nIEZsZXggTGluZXNcXHJcXG4vLyAtIGFwcGxpZXMgdG86IG11bHRpLWxpbmUgZmxleCBjb250YWluZXJzXFxyXFxuLy8gZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgc3BhY2UtYmV0d2VlbiB8IHNwYWNlLWFyb3VuZCB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24tY29udGVudCgkYWxpZ24pIHtcXHJcXG4gIC13ZWJraXQtYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1jb250ZW50OiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLWNvbnRlbnQ6ICRhbGlnbjtcXHJcXG4gICAgICAgICAgYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDcm9zcy1heGlzIEFsaWdubWVudFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgYmFzZWxpbmUgfCBzdHJldGNoXFxyXFxuQG1peGluIGFsaWduLWl0ZW1zKCRhbGlnbikge1xcclxcbiAgLXdlYmtpdC1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgIC1tcy1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgICAgICBhbGlnbi1pdGVtczogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDcm9zcy1heGlzIEFsaWdubWVudFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtc1xcclxcbi8vIGF1dG8gfCBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24tc2VsZigkYWxpZ24pIHtcXHJcXG4gIC13ZWJraXQtYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1zZWxmOiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLXNlbGY6ICRhbGlnbjtcXHJcXG4gICAgICAgICAgYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0xLTF7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWJhc2lzKGF1dG8pO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0wLTF7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDApO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWJhc2lzKGF1dG8pO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0xLTB7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMCk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBmbGV4LTAtMHtcXHJcXG4gIEBpbmNsdWRlIGZsZXgoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWdyb3coMCk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LXNocmluaygwKTtcXHJcXG59XFxyXFxuLypGbGV4IFNhc3MqL1wiLFwiQGltcG9ydCAndXRpbC9jb2xvci5zY3NzJztcXG5AaW1wb3J0ICd1dGlsL2ZsZXguc2Nzcyc7XFxuQGltcG9ydCAndXRpbC9ib3hzaGFkb3cuc2Nzcyc7XFxuQGltcG9ydCAndXRpbC9idXR0b24uc2Nzcyc7XFxuXFxuLmZvb2RJbmZvQnV0dG9ue1xcbiAgQGluY2x1ZGUgYnV0dG9uLWEoJGxpZ2h0LXJlZCk7XFxufVxcblxcbi5mb29kSW5mb0xpc3R7XFxuICBAaW5jbHVkZSBmbGV4Ym94O1xcbiAgQGluY2x1ZGUgYm94U2hhZG93Qm90dG9tVGhpbkxpZ2h0ZXI7XFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1Jywgc2Fucy1zZXJpZjtcXG59XFxuLmZvb2RJbmZvSGVhZGVye1xcbiAgYmFja2dyb3VuZDogJGxpZ2h0LWJyb3duO1xcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDI0cHggIWltcG9ydGFudDtcXG59XFxuLmZvb2RJbmZvRm9vZHtcXG4gIEBpbmNsdWRlIGZsZXgtMC0wO1xcbiAgZmxleC1iYXNpczogMzAlO1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgY29sb3I6ICRsaWdodC1icm93bjtcXG59XFxuXFxuLmZvb2RJbmZvVGFnc3tcXG4gIEBpbmNsdWRlIGZsZXgtMS0xO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIHNwYW57XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBiYWNrZ3JvdW5kOiAkbGlnaHQtcmVkO1xcbiAgICBjb2xvcjogd2hpdGU7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIG1hcmdpbjogMCAycHg7XFxuICB9XFxufVxcblxcbi5mb29kSW5mb0VkaXR7XFxuICBAaW5jbHVkZSBmbGV4LTAtMTtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIGNvbG9yOiAkbGlnaHQtcmVkO1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuXFxuLmZvb2RJbmZvU2VhcmNoe1xcbiAgcGFkZGluZzogMTBweDtcXG59XFxuXFxuLmZvb2RJbmZvU2VhcmNoSW5wdXR7XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBtYXJnaW46IGF1dG87XFxuICB3aWR0aDogNTAlO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2FhYTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1Jywgc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBvdXRsaW5lOiAwO1xcbiAgei1pbmRleDogMjtcXG4gIEBpbmNsdWRlIGJveFNoYWRvd0JvdHRvbVJpZ2h0VGhpbkxpZ2h0ZXI7XFxufVxcblxcbi5mb29kSW5mb1NlYXJjaEljb257XFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICBmb250LXNpemU6IDE2cHg7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjYWFhO1xcbiAgbWFyZ2luOiAwIDNweDtcXG4gIEBpbmNsdWRlIGJ1dHRvbi1ib3JkZXIoI2FhYSk7XFxuICBjb2xvcjogYmxhY2s7XFxufVwiLFwiQG1peGluIGJ1dHRvbi1maWxsKCRiZywgJGNvbG9yOndoaXRlKSB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kOiAkYmc7XFxyXFxuICBjb2xvcjogJGNvbG9yO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpkYXJrZW4oJGJnLDglKTtcXHJcXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcclxcbiAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gICAgfVxcclxcbiAgICAmOmFjdGl2ZSB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpkYXJrZW4oJGJnLDI1JSk7XFxyXFxuICAgIH0gXFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBidXR0b24tYm9yZGVyKCRjb2xvciwkYmc6IHdoaXRlKSB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBiYWNrZ3JvdW5kOiAkYmc7XFxyXFxuICBjb2xvcjogJGNvbG9yO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgJGNvbG9yO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpkYXJrZW4oJGJnLDglKTtcXHJcXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcclxcbiAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gICAgfVxcclxcbiAgICAmOmFjdGl2ZSB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpkYXJrZW4oJGJnLDI1JSk7XFxyXFxuICAgIH0gXFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBidXR0b24oJGJvcmRlcil7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBjb2xvcjogJGJvcmRlcjtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICRib3JkZXI7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjJzIGVhc2UtaW4tb3V0O1xcclxcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBjb2xvciAwLjJzIGVhc2UtaW4tb3V0O1xcclxcbiAgJjpob3ZlcntcXHJcXG4gICAgY29sb3I6IHdoaXRlO1xcclxcbiAgfVxcclxcbiAgJjpiZWZvcmUsXFxyXFxuICAmOmFmdGVye1xcclxcbiAgICBjb250ZW50OiAnJztcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICB6LWluZGV4Oi0xO1xcclxcbiAgICB3aWR0aDogMCU7XFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG4gICAgdG9wOiAwO1xcclxcbiAgICBsZWZ0OiAwO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYm9yZGVyO1xcclxcbiAgICB0cmFuc2l0aW9uOiB3aWR0aCAwLjJzIGVhc2UtaW4tb3V0O1xcclxcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IHdpZHRoIDAuMnMgZWFzZS1pbi1vdXQ7XFxyXFxuICAgIFxcclxcbiAgfVxcclxcbiAgXFxyXFxuICAmOmhvdmVyOmJlZm9yZSxcXHJcXG4gICY6aG92ZXI6YWZ0ZXJ7XFxyXFxuICAgIHdpZHRoOiAxMDAlOyAvL3RyYW5zaXRpb27sl5Ag7ZW064u57ZWY64qUIGVsZW1lbnTrp4wg67CU64CUIOuVjCByZXZlcnNl64+EIOuQnOuLpC5cXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJ1dHRvbi1hY3RpdmUoJGJnKXtcXHJcXG4gIGJhY2tncm91bmQ6ICRiZztcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6bGlnaHRlbigkYmcsOCUpO1xcclxcbiAgICB9XFxyXFxuICAgICY6YWN0aXZlIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmxpZ2h0ZW4oJGJnLDI1JSk7XFxyXFxuICAgIH0gXFxyXFxuICB9XFxyXFxuICBcXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJ1dHRvbi1ib3JkZXItYWN0aXZlKCRiZyl7XFxyXFxuICBiYWNrZ3JvdW5kOiAkYmc7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAkYmc7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmxpZ2h0ZW4oJGJnLDglKTtcXHJcXG4gICAgfVxcclxcbiAgICAmOmFjdGl2ZSB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbiAgXFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBidXR0b24tYSgkY29sb3Ipe1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1mYW1pbHk6ICdIYW5uYScsJ1VidW50dScsc2Fucy1zZXJpZjtcXHJcXG4gIGZvbnQtc2l6ZTogMjRweDtcXHJcXG4gIGNvbG9yOiAkY29sb3I7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICBhe1xcclxcbiAgICAgICY6aG92ZXJ7XFxyXFxuICAgICAgICBjb2xvcjogZGFya2VuKCRjb2xvciwxNSUpOyBcXHJcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gICAgICB9XFxyXFxuICAgIH1cXHJcXG4gICAgXFxyXFxuICB9XFxyXFxufVwiLFwiJGRhcmstYmx1ZTogcmdiKDUxLCA1NSwgNjkpO1xcclxcbiRsaWdodC1ibHVlOiAjMjk4MEI5O1xcclxcbiRkYXJrLXllbGxvdzogcmdiKDI1NSwgMTkxLCAwKTtcXHJcXG4kbGlnaHQtcmVkOiAjRkY0MDRFO1xcclxcbiRsaWdodC1icm93bjogIzRBNDA0QTtcXHJcXG4kZGFyay1ncmVlbjogIzdBODI1NjtcIixcIkBtaXhpbiBib3hTaGFkb3dCb3R0b21UaGluTGlnaHRlcigpIHtcXHJcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDJweCAtMnB4IHJnYmEoMCwwLDAsLjE1KTtcXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJveFNoYWRvd0JvdHRvbVJpZ2h0VGhpbkxpZ2h0ZXIoKXtcXHJcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMTdweCAxOXB4IDMwcHggLTE2cHggcmdiYSgwLDAsMCwwLjUpO1xcclxcbiAgLW1vei1ib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsMCwwLDAuNSk7XFxyXFxuICBib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsMCwwLDAuNSk7XFxyXFxufVxcclxcblxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKSh0cnVlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyogRmxleCBTYXNzICovXFxuLypGbGV4IFNhc3MqL1xcbi5oZWFkZXJDb250YWluZXIge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICB0b3A6IDA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbW96LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xcbiAgZGlzcGxheTogZmxleDsgfVxcblxcbi5oZWFkZXJJbm5lckNvbnRhaW5lciB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgY29sb3I6ICMyNDI5MmU7XFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1JyxzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDQwMDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIC13ZWJraXQtYm94LWZsZXg6IDE7XFxuICAtbW96LWJveC1mbGV4OiAxO1xcbiAgLXdlYmtpdC1mbGV4OiAxO1xcbiAgLW1zLWZsZXg6IDE7XFxuICBmbGV4OiAxO1xcbiAgLXdlYmtpdC1mbGV4LWdyb3c6IDE7XFxuICAtbW96LWZsZXgtZ3JvdzogMTtcXG4gIC1tcy1mbGV4LWdyb3c6IDE7XFxuICBmbGV4LWdyb3c6IDE7XFxuICAtd2Via2l0LWZsZXgtc2hyaW5rOiAxO1xcbiAgLW1vei1mbGV4LXNocmluazogMTtcXG4gIC1tcy1mbGV4LXNocmluazogMTtcXG4gIGZsZXgtc2hyaW5rOiAxO1xcbiAgLXdlYmtpdC1mbGV4LWJhc2lzOiBhdXRvO1xcbiAgLW1vei1mbGV4LWJhc2lzOiBhdXRvO1xcbiAgLW1zLWZsZXgtYmFzaXM6IGF1dG87XFxuICBmbGV4LWJhc2lzOiBhdXRvOyB9XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLmhlYWRlcklubmVyQ29udGFpbmVyIHtcXG4gICAgICBmb250LXNpemU6IDM2cHg7IH0gfVxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTk5cHgpIHtcXG4gICAgLmhlYWRlcklubmVyQ29udGFpbmVyIHtcXG4gICAgICBmb250LXNpemU6IDU0cHg7IH0gfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9mbGV4LnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvSGVhZGVyLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsY0FBQTtBQThKQSxZQUFBO0FDM0pBO0VBQ0Usa0JBQWtCO0VBQ2xCLFdBQVc7RUFDWCxZQUFZO0VBQ1osTUFBTTtFQUNOLG1CQUFtQjtFRE5uQixvQkFBb0I7RUFDcEIsaUJBQWlCO0VBQ2pCLG9CQUFvQjtFQUNwQixxQkFBcUI7RUFDckIsYUFBYSxFQUFBOztBQ01mO0VBQ0UsYUFBYTtFQUNiLGNBQWM7RUFPZCx3Q0FBd0M7RUFDeEMsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFRFZsQixtQkF5SGU7RUF4SFosZ0JBd0hZO0VBdkhYLGVBdUhXO0VBdEhaLFdBc0hZO0VBckhSLE9BcUhRO0VBckVmLG9CQXNFb0I7RUFyRWpCLGlCQXFFaUI7RUFwRWhCLGdCQW9FZ0I7RUFuRVosWUFtRVk7RUE1RHBCLHNCQTZEc0I7RUE1RG5CLG1CQTREbUI7RUEzRGxCLGtCQTJEa0I7RUExRGQsY0EwRGM7RUFsRHRCLHdCQW1Ed0I7RUFsRHJCLHFCQWtEcUI7RUFqRHBCLG9CQWlEb0I7RUFoRGhCLGdCQWdEZ0IsRUFBQTtFQzFIeEI7SUFIRjtNQUlJLGVBQWUsRUFBQSxFQVVsQjtFQVJDO0lBTkY7TUFPSSxlQUFlLEVBQUEsRUFPbEJcIixcImZpbGVcIjpcIkhlYWRlci5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIEZsZXggU2FzcyAqL1xcclxcbkBtaXhpbiBmbGV4Ym94KCkge1xcclxcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxyXFxuICBkaXNwbGF5OiAtbW96LWJveDtcXHJcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcclxcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gVGhlICdmbGV4JyBzaG9ydGhhbmRcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8cG9zaXRpdmUtbnVtYmVyPiwgaW5pdGlhbCwgYXV0bywgb3Igbm9uZVxcclxcbkBtaXhpbiBmbGV4KCR2YWx1ZXMpIHtcXHJcXG4gIC13ZWJraXQtYm94LWZsZXg6ICR2YWx1ZXM7XFxyXFxuICAgICAtbW96LWJveC1mbGV4OiAkdmFsdWVzO1xcclxcbiAgICAgIC13ZWJraXQtZmxleDogJHZhbHVlcztcXHJcXG4gIFxcdCAgLW1zLWZsZXg6ICR2YWx1ZXM7XFxyXFxuICBcXHQgICAgICBmbGV4OiAkdmFsdWVzO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IEZsb3cgRGlyZWN0aW9uXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyByb3cgfCByb3ctcmV2ZXJzZSB8IGNvbHVtbiB8IGNvbHVtbi1yZXZlcnNlXFxyXFxuQG1peGluIGZsZXgtZGlyZWN0aW9uKCRkaXJlY3Rpb24pIHtcXHJcXG4gIC13ZWJraXQtZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxuICAgICAtbW96LWZsZXgtZGlyZWN0aW9uOiAkZGlyZWN0aW9uO1xcclxcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjtcXHJcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggTGluZSBXcmFwcGluZ1xcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gbm93cmFwIHwgd3JhcCB8IHdyYXAtcmV2ZXJzZVxcclxcbkBtaXhpbiBmbGV4LXdyYXAoJHdyYXApIHtcXHJcXG4gIC13ZWJraXQtZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgIC1tb3otZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgICAtbXMtZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgICAgICAgZmxleC13cmFwOiAkd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBEaXJlY3Rpb24gYW5kIFdyYXBcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggY29udGFpbmVyc1xcclxcbi8vIDxmbGV4LWRpcmVjdGlvbj4gfHwgPGZsZXgtd3JhcD5cXHJcXG5AbWl4aW4gZmxleC1mbG93KCRmbG93KSB7XFxyXFxuICAtd2Via2l0LWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAtbW96LWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAgLW1zLWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAgICAgIGZsZXgtZmxvdzogJGZsb3c7XFxyXFxufVxcclxcblxcclxcbi8vIERpc3BsYXkgT3JkZXJcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8aW50ZWdlcj5cXHJcXG5AbWl4aW4gb3JkZXIoJHZhbCkge1xcclxcbiAgLXdlYmtpdC1ib3gtb3JkaW5hbC1ncm91cDogJHZhbDtcXHJcXG4gICAgIC1tb3otYm94LW9yZGluYWwtZ3JvdXA6ICR2YWw7XFxyXFxuICBcXHQgICAgIC1tcy1mbGV4LW9yZGVyOiAkdmFsO1xcclxcbiAgXFx0ICAgICAgLXdlYmtpdC1vcmRlcjogJHZhbDtcXHJcXG4gIFxcdFxcdCAgICAgIG9yZGVyOiAkdmFsO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IGdyb3cgZmFjdG9yXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zXFxyXFxuLy8gPG51bWJlcj5cXHJcXG5AbWl4aW4gZmxleC1ncm93KCRncm93KSB7XFxyXFxuICAtd2Via2l0LWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAtbW96LWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAgLW1zLWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAgICAgIGZsZXgtZ3JvdzogJGdyb3c7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggc2hyaW5rXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW0gc2hyaW5rIGZhY3Rvclxcclxcbi8vIDxudW1iZXI+XFxyXFxuQG1peGluIGZsZXgtc2hyaW5rKCRzaHJpbmspIHtcXHJcXG4gIC13ZWJraXQtZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxuICAgICAtbW96LWZsZXgtc2hyaW5rOiAkc2hyaW5rO1xcclxcbiAgICAgIC1tcy1mbGV4LXNocmluazogJHNocmluaztcXHJcXG4gICAgICAgICAgZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggYmFzaXNcXHJcXG4vLyAtIHRoZSBpbml0aWFsIG1haW4gc2l6ZSBvZiB0aGUgZmxleCBpdGVtXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zbml0aWFsIG1haW4gc2l6ZSBvZiB0aGUgZmxleCBpdGVtXFxyXFxuLy8gPHdpZHRoPlxcclxcbkBtaXhpbiBmbGV4LWJhc2lzKCR3aWR0aCkge1xcclxcbiAgLXdlYmtpdC1mbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxuICAgICAtbW96LWZsZXgtYmFzaXM6ICR3aWR0aDtcXHJcXG4gICAgICAtbXMtZmxleC1iYXNpczogJHdpZHRoO1xcclxcbiAgICAgICAgICBmbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxufVxcclxcblxcclxcbi8vIEF4aXMgQWxpZ25tZW50XFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBzcGFjZS1iZXR3ZWVuIHwgc3BhY2UtYXJvdW5kXFxyXFxuQG1peGluIGp1c3RpZnktY29udGVudCgkanVzdGlmeSkge1xcclxcbiAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgLW1vei1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgIC1tcy1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgICAgICAgIC1tcy1mbGV4LXBhY2s6ICRqdXN0aWZ5O1xcclxcbn1cXHJcXG5cXHJcXG4vLyBQYWNraW5nIEZsZXggTGluZXNcXHJcXG4vLyAtIGFwcGxpZXMgdG86IG11bHRpLWxpbmUgZmxleCBjb250YWluZXJzXFxyXFxuLy8gZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgc3BhY2UtYmV0d2VlbiB8IHNwYWNlLWFyb3VuZCB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24tY29udGVudCgkYWxpZ24pIHtcXHJcXG4gIC13ZWJraXQtYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1jb250ZW50OiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLWNvbnRlbnQ6ICRhbGlnbjtcXHJcXG4gICAgICAgICAgYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDcm9zcy1heGlzIEFsaWdubWVudFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgYmFzZWxpbmUgfCBzdHJldGNoXFxyXFxuQG1peGluIGFsaWduLWl0ZW1zKCRhbGlnbikge1xcclxcbiAgLXdlYmtpdC1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgIC1tcy1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgICAgICBhbGlnbi1pdGVtczogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDcm9zcy1heGlzIEFsaWdubWVudFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtc1xcclxcbi8vIGF1dG8gfCBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24tc2VsZigkYWxpZ24pIHtcXHJcXG4gIC13ZWJraXQtYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1zZWxmOiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLXNlbGY6ICRhbGlnbjtcXHJcXG4gICAgICAgICAgYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0xLTF7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWJhc2lzKGF1dG8pO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0wLTF7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDApO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWJhc2lzKGF1dG8pO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0xLTB7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMCk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBmbGV4LTAtMHtcXHJcXG4gIEBpbmNsdWRlIGZsZXgoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWdyb3coMCk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LXNocmluaygwKTtcXHJcXG59XFxyXFxuLypGbGV4IFNhc3MqL1wiLFwiQGltcG9ydCAnLi91dGlsL2JveHNoYWRvdy5zY3NzJztcXHJcXG5AaW1wb3J0ICcuL3V0aWwvY29sb3Iuc2Nzcyc7XFxyXFxuQGltcG9ydCAnLi91dGlsL2ZsZXgnO1xcclxcbi5oZWFkZXJDb250YWluZXJ7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogNjBweDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICBAaW5jbHVkZSBmbGV4Ym94O1xcclxcbn1cXHJcXG5cXHJcXG4uaGVhZGVySW5uZXJDb250YWluZXJ7XFxyXFxuICBwYWRkaW5nOiAxMHB4O1xcclxcbiAgY29sb3I6ICMyNDI5MmU7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICBmb250LXNpemU6IDM2cHg7XFxyXFxuICB9XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTlweCl7XFxyXFxuICAgIGZvbnQtc2l6ZTogNTRweDtcXHJcXG4gIH1cXHJcXG4gIGZvbnQtZmFtaWx5OiAnSGFubmEnLCdVYnVudHUnLHNhbnMtc2VyaWY7XFxyXFxuICBmb250LXdlaWdodDogNDAwO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgQGluY2x1ZGUgZmxleC0xLTE7XFxyXFxuICBcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKHRydWUpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJALXdlYmtpdC1rZXlmcmFtZXMgY2hhbmdlY29sb3Ige1xcbiAgMCUge1xcbiAgICBib3JkZXItY29sb3I6IGJsYWNrOyB9XFxuICAxMDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgY2hhbmdlY29sb3Ige1xcbiAgMCUge1xcbiAgICBib3JkZXItY29sb3I6IGJsYWNrOyB9XFxuICAxMDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjOyB9IH1cXG5cXG5ALW1zLWtleWZyYW1lcyBjaGFuZ2Vjb2xvciB7XFxuICAwJSB7XFxuICAgIGJvcmRlci1jb2xvcjogYmxhY2s7IH1cXG4gIDEwMCUge1xcbiAgICBib3JkZXItY29sb3I6ICNjY2M7IH0gfVxcblxcbkAtby1rZXlmcmFtZXMgY2hhbmdlY29sb3Ige1xcbiAgMCUge1xcbiAgICBib3JkZXItY29sb3I6IGJsYWNrOyB9XFxuICAxMDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiAjY2NjOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGNoYW5nZWNvbG9yIHtcXG4gIDAlIHtcXG4gICAgYm9yZGVyLWNvbG9yOiBibGFjazsgfVxcbiAgMTAwJSB7XFxuICAgIGJvcmRlci1jb2xvcjogI2NjYzsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgZmFkZWluIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkAtbXMta2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW8ta2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGZhZGVpbiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALXdlYmtpdC1rZXlmcmFtZXMgaW5wdXRFcnJvciB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDI1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDc1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgaW5wdXRFcnJvciB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDI1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDc1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5ALW1zLWtleWZyYW1lcyBpbnB1dEVycm9yIHtcXG4gIDAlIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgMjUlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgNTAlIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgNzUlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbkAtby1rZXlmcmFtZXMgaW5wdXRFcnJvciB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDI1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDc1JSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIGlucHV0RXJyb3Ige1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICAyNSUge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICA1MCUge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICA3NSUge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTsgfSB9XFxuXFxuQC13ZWJraXQta2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG5ALW1vei1rZXlmcmFtZXMgc2xpZGVJbkZyb21Cb3R0b20ge1xcbiAgMCUge1xcbiAgICB0b3A6IDEwMCU7XFxuICAgIG9wYWNpdHk6IDA7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gIDEwMCUge1xcbiAgICB0b3A6IDUwJTtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgZGlzcGxheTogYmxvY2s7IH0gfVxcblxcbkAtbXMta2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG5ALW8ta2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIHNsaWRlSW5Gcm9tQm90dG9tIHtcXG4gIDAlIHtcXG4gICAgdG9wOiAxMDAlO1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuICAxMDAlIHtcXG4gICAgdG9wOiA1MCU7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIGRpc3BsYXk6IGJsb2NrOyB9IH1cXG5cXG4vKiBGbGV4IFNhc3MgKi9cXG4vKkZsZXggU2FzcyovXFxuLyogRmxleCBTYXNzICovXFxuLypGbGV4IFNhc3MqL1xcbi5tb2RhbENvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB6LWluZGV4OiA5OTk7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIHdpZHRoOiA1MCU7XFxuICBtYXgtaGVpZ2h0OiA3MCU7XFxuICBoZWlnaHQ6IDcwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxuICBvcGFjaXR5OiAwO1xcbiAgdG9wOiAxMDAlO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xKTtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC13ZWJraXQtYm94LXNoYWRvdzogMTdweCAxOXB4IDMwcHggLTE2cHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgLW1vei1ib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICBib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICB0cmFuc2l0aW9uOiB0b3AgMC4zcyBlYXNlLWluLW91dCwgb3BhY2l0eSAwLjNzIGVhc2UtaW4tb3V0LCB2aXNpYmlsaXR5IDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IHRvcCAwLjNzIGVhc2UtaW4tb3V0LCBvcGFjaXR5IDAuM3MgZWFzZS1pbi1vdXQsIHZpc2liaWxpdHkgMC4zcyBlYXNlLWluLW91dDsgfVxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTk5cHgpIHtcXG4gICAgLm1vZGFsQ29udGFpbmVyIHtcXG4gICAgICB3aWR0aDogOTAlOyB9IH1cXG5cXG4ubW9kYWxDb250YWluZXItYWN0aXZlIHtcXG4gIHRvcDogMTAlO1xcbiAgb3BhY2l0eTogMTtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7IH1cXG5cXG4ubW9kYWxJbm5lckNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IDEwMCU7IH1cXG5cXG4ubW9kYWxIZWFkZXIge1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbW96LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICBmb250LXNpemU6IDI0cHg7XFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1JyxzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gIGJhY2tncm91bmQ6ICNGRjQwNEU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiA1cHg7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94OyB9XFxuICAubW9kYWxIZWFkZXIgZGl2IHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB6LWluZGV4OiAxOyB9XFxuICAubW9kYWxIZWFkZXIgYSB7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcXG4gICAgbWFyZ2luLXJpZ2h0OiA1cHg7XFxuICAgIHotaW5kZXg6IDM7IH1cXG4gICAgLm1vZGFsSGVhZGVyIGEgc3ZnOmhvdmVyIHtcXG4gICAgICBjdXJzb3I6IHBvaW50ZXI7IH1cXG5cXG4ubW9kYWxDb250ZW50IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDEyMHB4KTtcXG4gIG1heC1oZWlnaHQ6IDEwMCU7XFxuICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbiAgd2lkdGg6IDEwMCU7IH1cXG5cXG4ubW9kYWxGb290ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDAuMSk7XFxuICBiYWNrZ3JvdW5kOiAjRkY0MDRFO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDYwcHg7XFxuICBib3R0b206IDA7XFxuICBwYWRkaW5nOiAxMHB4IDZweDtcXG4gIHRleHQtYWxpZ246IHJpZ2h0OyB9XFxuXFxuLm1vZGFsQWN0aW9uIHtcXG4gIGZvbnQtZmFtaWx5OiAnSGFubmEnLCdVYnVudHUnLHNhbnMtc2VyaWY7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGJvcmRlcjogMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQ6ICNGRjQwNEU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBtYXJnaW4tdG9wOiA0cHg7IH1cXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgICAubW9kYWxBY3Rpb246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICNmZjE3Mjg7XFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7IH1cXG4gICAgLm1vZGFsQWN0aW9uOmFjdGl2ZSB7XFxuICAgICAgYmFja2dyb3VuZDogI2MwMDAwZTsgfSB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS91dGlsL2FuaW1hdGlvbi5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvZmxleC5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL01vZGFsLnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9ib3hzaGFkb3cuc2Nzc1wiLFwiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS91dGlsL2NlbnRlcmVyLnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9jb2xvci5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvYnV0dG9uLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUU7RUEwQkE7SUFDSSxtQkFBbUIsRUFBQTtFQUd2QjtJQUNJLGtCQUFrQixFQUFBLEVBQUE7O0FBNUJ0QjtFQXVCQTtJQUNJLG1CQUFtQixFQUFBO0VBR3ZCO0lBQ0ksa0JBQWtCLEVBQUEsRUFBQTs7QUF6QnRCO0VBb0JBO0lBQ0ksbUJBQW1CLEVBQUE7RUFHdkI7SUFDSSxrQkFBa0IsRUFBQSxFQUNyQjs7QUF2QkQ7RUFpQkE7SUFDSSxtQkFBbUIsRUFBQTtFQUd2QjtJQUNJLGtCQUFrQixFQUFBLEVBQUE7O0FBbkJ0QjtFQWNBO0lBQ0ksbUJBQW1CLEVBQUE7RUFHdkI7SUFDSSxrQkFBa0IsRUFBQSxFQUFBOztBQS9CdEI7RUFvQ0E7SUFDSSxVQUFVLEVBQUE7RUFHZDtJQUNJLFVBQVUsRUFBQSxFQUFBOztBQXRDZDtFQWlDQTtJQUNJLFVBQVUsRUFBQTtFQUdkO0lBQ0ksVUFBVSxFQUFBLEVBQUE7O0FBbkNkO0VBOEJBO0lBQ0ksVUFBVSxF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VztJQUNYLGtCQUFrQjtJQUNsQixVQUFVLEVBQUE7RUFiZDtJQWdCSSxXQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLGlCQUFpQjtJQUNqQixVQUFVLEVBQUE7SUFuQmQ7TUFzQlEsZUFBZSxFQUFBOztBQU12QjtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsMEJBQTBCO0VBQzFCLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsa0JBQWtCO0VBQ2xCLFdBQVcsRUFBQTs7QUFHYjtFQUNFLGtCQUFrQjtFQUNsQixzQkFBc0I7RUFDdEIsd0NBQW9DO0VBQ3BDLG1CQUFtQjtFQUNuQixXQUFXO0VBQ1gsWUFBWTtFQUNaLFNBQVM7RUFDVCxpQkFBaUI7RUFDakIsaUJBQWlCLEVBQUE7O0FBR25CO0VBQ0Usd0NBQXdDO0VBQ3hDLHVCQUF1QjtFQUN2QixTQUFTO0VJNUZULGVBQWU7RUFDZixtQkRDaUI7RUNBakIsWUFIa0M7RUorRmxDLGVBQWU7RUFDZixlQUFlLEVBQUE7RUk1RmY7SUpzRkY7TUlwRk0sbUJBQXlCO01BQ3pCLHlCQUF5QjtNQUN6QixpQ0FBaUMsRUFBQTtJSmtGdkM7TUkvRU0sbUJBQTBCLEVBQUEsRUFDM0JcIixcImZpbGVcIjpcIk1vZGFsLnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCAnLi9jb2xvci5zY3NzJztcXHJcXG5AbWl4aW4ga2V5ZnJhbWVzKCRhbmltYXRpb24tbmFtZSkge1xcclxcbiAgQC13ZWJraXQta2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuICBALW1vei1rZXlmcmFtZXMgI3skYW5pbWF0aW9uLW5hbWV9IHtcXHJcXG4gICAgICBAY29udGVudDtcXHJcXG4gIH1cXHJcXG4gIEAtbXMta2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuICBALW8ta2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxuICBAa2V5ZnJhbWVzICN7JGFuaW1hdGlvbi1uYW1lfSB7XFxyXFxuICAgICAgQGNvbnRlbnQ7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBhbmltYXRpb24oJG5hbWUpIHtcXHJcXG4td2Via2l0LWFuaW1hdGlvbjogI3skbmFtZX07XFxyXFxuLW1vei1hbmltYXRpb246ICN7JG5hbWV9O1xcclxcbi1tcy1hbmltYXRpb246ICN7JG5hbWV9O1xcclxcbi1vLWFuaW1hdGlvbjogI3skbmFtZX07XFxyXFxuYW5pbWF0aW9uOiAjeyRuYW1lfTtcXHJcXG59XFxyXFxuXFxyXFxuQGluY2x1ZGUga2V5ZnJhbWVzKGNoYW5nZWNvbG9yKSB7XFxyXFxuICAwJSB7XFxyXFxuICAgICAgYm9yZGVyLWNvbG9yOiBibGFjaztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDEwMCUge1xcclxcbiAgICAgIGJvcmRlci1jb2xvcjogI2NjYztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQGluY2x1ZGUga2V5ZnJhbWVzKGZhZGVpbikge1xcclxcbiAgMCUge1xcclxcbiAgICAgIG9wYWNpdHk6IDA7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAxMDAlIHtcXHJcXG4gICAgICBvcGFjaXR5OiAxO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AaW5jbHVkZSBrZXlmcmFtZXMoaW5wdXRFcnJvcikge1xcclxcbiAgICAwJSB7XFxyXFxuICAgICAgICBvcGFjaXR5OiAxO1xcclxcbiAgICB9IFxcclxcbiAgICAyNSUge1xcclxcbiAgICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgfSAgXFxyXFxuICAgIDUwJXtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxyXFxuICAgIH1cXHJcXG4gICAgNzUle1xcclxcbiAgICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgfVxcclxcbiAgICAxMDAlIHtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxyXFxuICAgIH1cXHJcXG4gIH1cXHJcXG5cXHJcXG5AaW5jbHVkZSBrZXlmcmFtZXMoc2xpZGVJbkZyb21Cb3R0b20pIHtcXHJcXG4gICAgMCUge1xcclxcbiAgICAgICAgdG9wOiAxMDAlO1xcclxcbiAgICAgICAgb3BhY2l0eTogMDtcXHJcXG4gICAgICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIH1cXHJcXG4gICAgMTAwJSB7XFxyXFxuICAgICAgICB0b3A6IDUwJTtcXHJcXG4gICAgICAgIG9wYWNpdHk6IDE7XFxyXFxuICAgICAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gICAgfVxcclxcbiAgfVwiLFwiLyogRmxleCBTYXNzICovXFxyXFxuQG1peGluIGZsZXhib3goKSB7XFxyXFxuICBkaXNwbGF5OiAtd2Via2l0LWJveDtcXHJcXG4gIGRpc3BsYXk6IC1tb3otYm94O1xcclxcbiAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxyXFxuICBkaXNwbGF5OiAtd2Via2l0LWZsZXg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbn1cXHJcXG5cXHJcXG4vLyBUaGUgJ2ZsZXgnIHNob3J0aGFuZFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtc1xcclxcbi8vIDxwb3NpdGl2ZS1udW1iZXI+LCBpbml0aWFsLCBhdXRvLCBvciBub25lXFxyXFxuQG1peGluIGZsZXgoJHZhbHVlcykge1xcclxcbiAgLXdlYmtpdC1ib3gtZmxleDogJHZhbHVlcztcXHJcXG4gICAgIC1tb3otYm94LWZsZXg6ICR2YWx1ZXM7XFxyXFxuICAgICAgLXdlYmtpdC1mbGV4OiAkdmFsdWVzO1xcclxcbiAgXFx0ICAtbXMtZmxleDogJHZhbHVlcztcXHJcXG4gIFxcdCAgICAgIGZsZXg6ICR2YWx1ZXM7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggRmxvdyBEaXJlY3Rpb25cXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggY29udGFpbmVyc1xcclxcbi8vIHJvdyB8IHJvdy1yZXZlcnNlIHwgY29sdW1uIHwgY29sdW1uLXJldmVyc2VcXHJcXG5AbWl4aW4gZmxleC1kaXJlY3Rpb24oJGRpcmVjdGlvbikge1xcclxcbiAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjtcXHJcXG4gICAgIC1tb3otZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxuICAgICAgLW1zLWZsZXgtZGlyZWN0aW9uOiAkZGlyZWN0aW9uO1xcclxcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBMaW5lIFdyYXBwaW5nXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyBub3dyYXAgfCB3cmFwIHwgd3JhcC1yZXZlcnNlXFxyXFxuQG1peGluIGZsZXgtd3JhcCgkd3JhcCkge1xcclxcbiAgLXdlYmtpdC1mbGV4LXdyYXA6ICR3cmFwO1xcclxcbiAgICAgLW1vei1mbGV4LXdyYXA6ICR3cmFwO1xcclxcbiAgICAgIC1tcy1mbGV4LXdyYXA6ICR3cmFwO1xcclxcbiAgICAgICAgICBmbGV4LXdyYXA6ICR3cmFwO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IERpcmVjdGlvbiBhbmQgV3JhcFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gPGZsZXgtZGlyZWN0aW9uPiB8fCA8ZmxleC13cmFwPlxcclxcbkBtaXhpbiBmbGV4LWZsb3coJGZsb3cpIHtcXHJcXG4gIC13ZWJraXQtZmxleC1mbG93OiAkZmxvdztcXHJcXG4gICAgIC1tb3otZmxleC1mbG93OiAkZmxvdztcXHJcXG4gICAgICAtbXMtZmxleC1mbG93OiAkZmxvdztcXHJcXG4gICAgICAgICAgZmxleC1mbG93OiAkZmxvdztcXHJcXG59XFxyXFxuXFxyXFxuLy8gRGlzcGxheSBPcmRlclxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtc1xcclxcbi8vIDxpbnRlZ2VyPlxcclxcbkBtaXhpbiBvcmRlcigkdmFsKSB7XFxyXFxuICAtd2Via2l0LWJveC1vcmRpbmFsLWdyb3VwOiAkdmFsO1xcclxcbiAgICAgLW1vei1ib3gtb3JkaW5hbC1ncm91cDogJHZhbDtcXHJcXG4gIFxcdCAgICAgLW1zLWZsZXgtb3JkZXI6ICR2YWw7XFxyXFxuICBcXHQgICAgICAtd2Via2l0LW9yZGVyOiAkdmFsO1xcclxcbiAgXFx0XFx0ICAgICAgb3JkZXI6ICR2YWw7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggZ3JvdyBmYWN0b3JcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8bnVtYmVyPlxcclxcbkBtaXhpbiBmbGV4LWdyb3coJGdyb3cpIHtcXHJcXG4gIC13ZWJraXQtZmxleC1ncm93OiAkZ3JvdztcXHJcXG4gICAgIC1tb3otZmxleC1ncm93OiAkZ3JvdztcXHJcXG4gICAgICAtbXMtZmxleC1ncm93OiAkZ3JvdztcXHJcXG4gICAgICAgICAgZmxleC1ncm93OiAkZ3JvdztcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBzaHJpbmtcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbSBzaHJpbmsgZmFjdG9yXFxyXFxuLy8gPG51bWJlcj5cXHJcXG5AbWl4aW4gZmxleC1zaHJpbmsoJHNocmluaykge1xcclxcbiAgLXdlYmtpdC1mbGV4LXNocmluazogJHNocmluaztcXHJcXG4gICAgIC1tb3otZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxuICAgICAgLW1zLWZsZXgtc2hyaW5rOiAkc2hyaW5rO1xcclxcbiAgICAgICAgICBmbGV4LXNocmluazogJHNocmluaztcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBiYXNpc1xcclxcbi8vIC0gdGhlIGluaXRpYWwgbWFpbiBzaXplIG9mIHRoZSBmbGV4IGl0ZW1cXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNuaXRpYWwgbWFpbiBzaXplIG9mIHRoZSBmbGV4IGl0ZW1cXHJcXG4vLyA8d2lkdGg+XFxyXFxuQG1peGluIGZsZXgtYmFzaXMoJHdpZHRoKSB7XFxyXFxuICAtd2Via2l0LWZsZXgtYmFzaXM6ICR3aWR0aDtcXHJcXG4gICAgIC1tb3otZmxleC1iYXNpczogJHdpZHRoO1xcclxcbiAgICAgIC1tcy1mbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxuICAgICAgICAgIGZsZXgtYmFzaXM6ICR3aWR0aDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQXhpcyBBbGlnbm1lbnRcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggY29udGFpbmVyc1xcclxcbi8vIGZsZXgtc3RhcnQgfCBmbGV4LWVuZCB8IGNlbnRlciB8IHNwYWNlLWJldHdlZW4gfCBzcGFjZS1hcm91bmRcXHJcXG5AbWl4aW4ganVzdGlmeS1jb250ZW50KCRqdXN0aWZ5KSB7XFxyXFxuICAtd2Via2l0LWp1c3RpZnktY29udGVudDogJGp1c3RpZnk7XFxyXFxuICAgICAtbW96LWp1c3RpZnktY29udGVudDogJGp1c3RpZnk7XFxyXFxuICAgICAgLW1zLWp1c3RpZnktY29udGVudDogJGp1c3RpZnk7XFxyXFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogJGp1c3RpZnk7XFxyXFxuICAgICAgICAgICAgLW1zLWZsZXgtcGFjazogJGp1c3RpZnk7XFxyXFxufVxcclxcblxcclxcbi8vIFBhY2tpbmcgRmxleCBMaW5lc1xcclxcbi8vIC0gYXBwbGllcyB0bzogbXVsdGktbGluZSBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBzcGFjZS1iZXR3ZWVuIHwgc3BhY2UtYXJvdW5kIHwgc3RyZXRjaFxcclxcbkBtaXhpbiBhbGlnbi1jb250ZW50KCRhbGlnbikge1xcclxcbiAgLXdlYmtpdC1hbGlnbi1jb250ZW50OiAkYWxpZ247XFxyXFxuICAgICAtbW96LWFsaWduLWNvbnRlbnQ6ICRhbGlnbjtcXHJcXG4gICAgICAtbXMtYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbiAgICAgICAgICBhbGlnbi1jb250ZW50OiAkYWxpZ247XFxyXFxufVxcclxcblxcclxcbi8vIENyb3NzLWF4aXMgQWxpZ25tZW50XFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24taXRlbXMoJGFsaWduKSB7XFxyXFxuICAtd2Via2l0LWFsaWduLWl0ZW1zOiAkYWxpZ247XFxyXFxuICAgICAtbW96LWFsaWduLWl0ZW1zOiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLWl0ZW1zOiAkYWxpZ247XFxyXFxuICAgICAgICAgIGFsaWduLWl0ZW1zOiAkYWxpZ247XFxyXFxufVxcclxcblxcclxcbi8vIENyb3NzLWF4aXMgQWxpZ25tZW50XFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zXFxyXFxuLy8gYXV0byB8IGZsZXgtc3RhcnQgfCBmbGV4LWVuZCB8IGNlbnRlciB8IGJhc2VsaW5lIHwgc3RyZXRjaFxcclxcbkBtaXhpbiBhbGlnbi1zZWxmKCRhbGlnbikge1xcclxcbiAgLXdlYmtpdC1hbGlnbi1zZWxmOiAkYWxpZ247XFxyXFxuICAgICAtbW96LWFsaWduLXNlbGY6ICRhbGlnbjtcXHJcXG4gICAgICAtbXMtYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbiAgICAgICAgICBhbGlnbi1zZWxmOiAkYWxpZ247XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBmbGV4LTEtMXtcXHJcXG4gIEBpbmNsdWRlIGZsZXgoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWdyb3coMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LXNocmluaygxKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtYmFzaXMoYXV0byk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBmbGV4LTAtMXtcXHJcXG4gIEBpbmNsdWRlIGZsZXgoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWdyb3coMCk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LXNocmluaygxKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtYmFzaXMoYXV0byk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBmbGV4LTEtMHtcXHJcXG4gIEBpbmNsdWRlIGZsZXgoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWdyb3coMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LXNocmluaygwKTtcXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGZsZXgtMC0we1xcclxcbiAgQGluY2x1ZGUgZmxleCgxKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtZ3JvdygwKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtc2hyaW5rKDApO1xcclxcbn1cXHJcXG4vKkZsZXggU2FzcyovXCIsXCJAaW1wb3J0ICd1dGlsL2FuaW1hdGlvbi5zY3NzJztcXG5AaW1wb3J0ICd1dGlsL2NvbG9yLnNjc3MnO1xcbkBpbXBvcnQgJ3V0aWwvZmxleC5zY3NzJztcXG5AaW1wb3J0ICd1dGlsL2NlbnRlcmVyLnNjc3MnO1xcbkBpbXBvcnQgJ3V0aWwvYm94c2hhZG93LnNjc3MnO1xcbkBpbXBvcnQgJ3V0aWwvYnV0dG9uLnNjc3MnO1xcbi5tb2RhbENvbnRhaW5lcntcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHotaW5kZXg6IDk5OTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgd2lkdGg6IDUwJTtcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5OXB4KXtcXG4gICAgd2lkdGg6IDkwJTtcXG4gIH1cXG4gIG1heC1oZWlnaHQ6IDcwJTtcXG4gIGhlaWdodDogNzAlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIG9wYWNpdHk6IDA7XFxuICB0b3A6IDEwMCU7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBtYXJnaW46IGF1dG87XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgwLDAsMCwuMSk7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBAaW5jbHVkZSBib3hTaGFkb3dCb3R0b21SaWdodFRoaW5MaWdodGVyO1xcbiAgdHJhbnNpdGlvbjogdG9wIDAuM3MgZWFzZS1pbi1vdXQsIG9wYWNpdHkgMC4zcyBlYXNlLWluLW91dCwgdmlzaWJpbGl0eSAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiB0b3AgMC4zcyBlYXNlLWluLW91dCwgb3BhY2l0eSAwLjNzIGVhc2UtaW4tb3V0LCB2aXNpYmlsaXR5IDAuM3MgZWFzZS1pbi1vdXQ7XFxufVxcbi5tb2RhbENvbnRhaW5lci1hY3RpdmV7XFxuICB0b3A6IDEwJTtcXG4gIG9wYWNpdHk6IDE7XFxuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xcbn1cXG4ubW9kYWxJbm5lckNvbnRhaW5lcntcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuLm1vZGFsSGVhZGVye1xcbiAgQGluY2x1ZGUgY2VudGVyZXJGbGV4KGZhbHNlLHRydWUpO1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgZm9udC1zaXplOiAyNHB4O1xcbiAgZm9udC1mYW1pbHk6ICdIYW5uYScsJ1VidW50dScsc2Fucy1zZXJpZjtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBiYWNrZ3JvdW5kOiAkbGlnaHQtcmVkO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogNXB4O1xcbiAgZGl2e1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIHotaW5kZXg6IDE7XFxuICB9XFxuICBhe1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICAgIG1hcmdpbi1yaWdodDogNXB4O1xcbiAgICB6LWluZGV4OiAzO1xcbiAgICBzdmd7XFxuICAgICAgJjpob3ZlcntcXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcbi5tb2RhbENvbnRlbnR7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAxMjBweCk7XFxuICBtYXgtaGVpZ2h0OiAxMDAlO1xcbiAgb3ZlcmZsb3cteTogYXV0bztcXG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gIHdpZHRoOiAxMDAlO1xcbn1cXG5cXG4ubW9kYWxGb290ZXJ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHJnYmEoMCwwLDAsLjEpO1xcbiAgYmFja2dyb3VuZDogI0ZGNDA0RTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiA2MHB4O1xcbiAgYm90dG9tOiAwO1xcbiAgcGFkZGluZzogMTBweCA2cHg7XFxuICB0ZXh0LWFsaWduOiByaWdodDtcXG59XFxuXFxuLm1vZGFsQWN0aW9ue1xcbiAgZm9udC1mYW1pbHk6ICdIYW5uYScsJ1VidW50dScsc2Fucy1zZXJpZjtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xcbiAgYm9yZGVyOiAwO1xcbiAgQGluY2x1ZGUgYnV0dG9uLWZpbGwoJGxpZ2h0LXJlZCk7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICBtYXJnaW4tdG9wOiA0cHg7XFxufVxcblwiLFwiQG1peGluIGJveFNoYWRvd0JvdHRvbVRoaW5MaWdodGVyKCkge1xcclxcbiAgYm94LXNoYWRvdzogMCAycHggMnB4IC0ycHggcmdiYSgwLDAsMCwuMTUpO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYm94U2hhZG93Qm90dG9tUmlnaHRUaGluTGlnaHRlcigpe1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsMCwwLDAuNSk7XFxyXFxuICAtbW96LWJveC1zaGFkb3c6IDE3cHggMTlweCAzMHB4IC0xNnB4IHJnYmEoMCwwLDAsMC41KTtcXHJcXG4gIGJveC1zaGFkb3c6IDE3cHggMTlweCAzMHB4IC0xNnB4IHJnYmEoMCwwLDAsMC41KTtcXHJcXG59XFxyXFxuXFxyXFxuXCIsXCJAaW1wb3J0ICcuL2ZsZXguc2Nzcyc7XFxyXFxuQG1peGluIGNlbnRlcmVyKCR3aWR0aDogNTAlLCAkaGVpZ2h0OiA1MCUsICRob3Jpem9udGFsOiB0cnVlLCAkdmVydGljYWw6IHRydWUpIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIEBpZiAoJGhvcml6b250YWwgYW5kICR2ZXJ0aWNhbCkge1xcclxcbiAgICB0b3A6ICRoZWlnaHQ7XFxyXFxuICAgIGxlZnQ6ICR3aWR0aDtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLSR3aWR0aCwgLSRoZWlnaHQpO1xcclxcbiAgfSBAZWxzZSBpZiAoJGhvcml6b250YWwpIHtcXHJcXG4gICAgbGVmdDogJHdpZHRoO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtJHdpZHRoLCAwKTtcXHJcXG4gIH0gQGVsc2UgaWYgKCR2ZXJ0aWNhbCkge1xcclxcbiAgICB0b3A6ICRoZWlnaHQ7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0kaGVpZ2h0KTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGNlbnRlcmVyLXdpdGgtd2l0ZGgoJG1pbi13aWR0aDo1MCUsJHdpZHRoOiA1MCUsICRoZWlnaHQ6IDUwJSwgJGhvcml6b250YWw6IHRydWUsICR2ZXJ0aWNhbDogdHJ1ZSkge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgbWluLXdpZHRoOiAkbWluLXdpZHRoO1xcclxcbiAgQGlmICgkaG9yaXpvbnRhbCBhbmQgJHZlcnRpY2FsKSB7XFxyXFxuICAgIHRvcDogJGhlaWdodDtcXHJcXG4gICAgbGVmdDogJHdpZHRoO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtJHdpZHRoLCAtJGhlaWdodCk7XFxyXFxuICB9IEBlbHNlIGlmICgkaG9yaXpvbnRhbCkge1xcclxcbiAgICBsZWZ0OiAkd2lkdGg7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0kd2lkdGgsIDApO1xcclxcbiAgfSBAZWxzZSBpZiAoJHZlcnRpY2FsKSB7XFxyXFxuICAgIHRvcDogJGhlaWdodDtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMCwgLSRoZWlnaHQpO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gY2VudGVyZXJGbGV4KCRob3Jpem9udGFsOnRydWUsICR2ZXJ0aWNhbDogdHJ1ZSl7XFxyXFxuICBAaW5jbHVkZSBmbGV4Ym94O1xcclxcbiAgQGlmICgkaG9yaXpvbnRhbCBhbmQgJHZlcnRpY2FsKSB7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgfSBAZWxzZSBpZiAoJGhvcml6b250YWwpIHtcXHJcXG4gICAgXFxyXFxuICB9IEBlbHNlIGlmICgkdmVydGljYWwpIHtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gIH1cXHJcXG4gIFxcclxcbn1cXHJcXG5cXHJcXG5cIixcIiRkYXJrLWJsdWU6IHJnYig1MSwgNTUsIDY5KTtcXHJcXG4kbGlnaHQtYmx1ZTogIzI5ODBCOTtcXHJcXG4kZGFyay15ZWxsb3c6IHJnYigyNTUsIDE5MSwgMCk7XFxyXFxuJGxpZ2h0LXJlZDogI0ZGNDA0RTtcXHJcXG4kbGlnaHQtYnJvd246ICM0QTQwNEE7XFxyXFxuJGRhcmstZ3JlZW46ICM3QTgyNTY7XCIsXCJAbWl4aW4gYnV0dG9uLWZpbGwoJGJnLCAkY29sb3I6d2hpdGUpIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGJhY2tncm91bmQ6ICRiZztcXHJcXG4gIGNvbG9yOiAkY29sb3I7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsOCUpO1xcclxcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcclxcbiAgICB9XFxyXFxuICAgICY6YWN0aXZlIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJ1dHRvbi1ib3JkZXIoJGNvbG9yLCRiZzogd2hpdGUpIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGJhY2tncm91bmQ6ICRiZztcXHJcXG4gIGNvbG9yOiAkY29sb3I7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAkY29sb3I7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsOCUpO1xcclxcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcclxcbiAgICB9XFxyXFxuICAgICY6YWN0aXZlIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJ1dHRvbigkYm9yZGVyKXtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGNvbG9yOiAkYm9yZGVyO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlcjtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZS1pbi1vdXQ7XFxyXFxuICAtd2Via2l0LXRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZS1pbi1vdXQ7XFxyXFxuICAmOmhvdmVye1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICB9XFxyXFxuICAmOmJlZm9yZSxcXHJcXG4gICY6YWZ0ZXJ7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHotaW5kZXg6LTE7XFxyXFxuICAgIHdpZHRoOiAwJTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRib3JkZXI7XFxyXFxuICAgIHRyYW5zaXRpb246IHdpZHRoIDAuMnMgZWFzZS1pbi1vdXQ7XFxyXFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogd2lkdGggMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gICAgXFxyXFxuICB9XFxyXFxuICBcXHJcXG4gICY6aG92ZXI6YmVmb3JlLFxcclxcbiAgJjpob3ZlcjphZnRlcntcXHJcXG4gICAgd2lkdGg6IDEwMCU7IC8vdHJhbnNpdGlvbuyXkCDtlbTri7ntlZjripQgZWxlbWVudOunjCDrsJTrgJQg65WMIHJldmVyc2Xrj4Qg65Cc64ukLlxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWFjdGl2ZSgkYmcpe1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZyw4JSk7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6bGlnaHRlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG4gIFxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWJvcmRlci1hY3RpdmUoJGJnKXtcXHJcXG4gIGJhY2tncm91bmQ6ICRiZztcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICRiZztcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6bGlnaHRlbigkYmcsOCUpO1xcclxcbiAgICB9XFxyXFxuICAgICY6YWN0aXZlIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmxpZ2h0ZW4oJGJnLDI1JSk7XFxyXFxuICAgIH0gXFxyXFxuICB9XFxyXFxuICBcXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJ1dHRvbi1hKCRjb2xvcil7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1JyxzYW5zLXNlcmlmO1xcclxcbiAgZm9udC1zaXplOiAyNHB4O1xcclxcbiAgY29sb3I6ICRjb2xvcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgIGF7XFxyXFxuICAgICAgJjpob3ZlcntcXHJcXG4gICAgICAgIGNvbG9yOiBkYXJrZW4oJGNvbG9yLDE1JSk7IFxcclxcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgICBcXHJcXG4gIH1cXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKHRydWUpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIuY29udGFpbmVyIHtcXG4gIHdpZHRoOiA5NSU7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMTVweDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxcblxcbi5zdGFydEJ1dHRvbiB7XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgZm9udC1mYW1pbHk6IFxcXCJIYW5uYVxcXCIsIFxcXCJVYnVudHVcXFwiLCBzYW5zLXNlcmlmO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAtbW96LWJveC1zaGFkb3c6IDE3cHggMTlweCAzMHB4IC0xNnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJveC1zaGFkb3c6IDE3cHggMTlweCAzMHB4IC0xNnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQ6ICNGRjQwNEU7XFxuICBjb2xvcjogd2hpdGU7XFxuICB0cmFuc2l0aW9uOiBwYWRkaW5nIDAuM3MgZWFzZS1pbi1vdXQsIGJvdHRvbSAwLjNzIGVhc2UtaW4tb3V0OyB9XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLnN0YXJ0QnV0dG9uIHtcXG4gICAgICBmb250LXNpemU6IDMycHg7XFxuICAgICAgd2lkdGg6IDM1JTsgfSB9XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTlweCkge1xcbiAgICAuc3RhcnRCdXR0b24ge1xcbiAgICAgIGZvbnQtc2l6ZTogMjZweDtcXG4gICAgICB3aWR0aDogNTAlOyB9IH1cXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgICAuc3RhcnRCdXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICNmZjE3Mjg7XFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7IH1cXG4gICAgLnN0YXJ0QnV0dG9uOmFjdGl2ZSB7XFxuICAgICAgYmFja2dyb3VuZDogI2MwMDAwZTsgfSB9XFxuXFxuLnN0YXJ0QnV0dG9uLWluLWFjdGl2ZSB7XFxuICBwYWRkaW5nLWJvdHRvbTogMTAwcHg7XFxuICBjdXJzb3I6IGF1dG87IH1cXG5cXG4ucmVzdWx0IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDBweDtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBvcGFjaXR5OiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMCAtMjBweDtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxuICBmb250LWZhbWlseTogXFxcIkhhbm5hXFxcIiwgXFxcIlVidW50dVxcXCIsIHNhbnMtc2VyaWY7XFxuICBjb2xvcjogI2ZmYmYwMDsgfVxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAgIC5yZXN1bHQge1xcbiAgICAgIGZvbnQtc2l6ZTogMzZweDsgfSB9XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTlweCkge1xcbiAgICAucmVzdWx0IHtcXG4gICAgICBmb250LXNpemU6IDMycHg7IH0gfVxcblxcbi5yZXN1bHQtaW4tYWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL1Jlc3VsdC5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvYm94c2hhZG93LnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9idXR0b24uc2Nzc1wiLFwiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS91dGlsL2NvbG9yLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBR0E7RUFDRSxVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixZQUFZO0VBQ1osa0JBQWtCLEVBQUE7O0FBR3BCO0VBVUUsYUFBYTtFQUNiLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsMENBQTBDO0VDbkIxQywyREFBd0Q7RUFDeEQsd0RBQXFEO0VBQ3JELG1EQUFnRDtFQ05oRCxlQUFlO0VBQ2YsbUJDQ2lCO0VEQWpCLFlBSGtDO0VGNkJsQyw2REFBNkQsRUFBQTtFQWpCN0Q7SUFERjtNQUVJLGVBQWU7TUFDZixVQUFVLEVBQUEsRUFnQmI7RUFkQztJQUxGO01BTUksZUFBZTtNQUNmLFVBQVUsRUFBQSxFQVliO0VFMUJDO0lGT0Y7TUVMTSxtQkFBeUI7TUFDekIseUJBQXlCO01BQ3pCLGlDQUFpQyxFQUFBO0lGR3ZDO01FQU0sbUJBQTBCLEVBQUEsRUFDM0I7O0FGb0JMO0VBQ0UscUJBQXFCO0VBQ3JCLFlBQVksRUFBQTs7QUFHZDtFQUNFLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsV0FBVztFQUNYLGFBQWE7RUFDYixhQUFhO0VBQ2IsVUFBVTtFQUNWLHNCQUFzQjtFQUN0QixlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLDBDQUEwQztFQU8xQyxjR3BENEIsRUFBQTtFSDhDNUI7SUFYRjtNQVlJLGVBQWUsRUFBQSxFQU1sQjtFQUpDO0lBZEY7TUFlSSxlQUFlLEVBQUEsRUFHbEI7O0FBRUQ7RUFDRSxVQUFVLEVBQUFcIixcImZpbGVcIjpcIlJlc3VsdC5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgJ3V0aWwvYnV0dG9uLnNjc3MnO1xcclxcbkBpbXBvcnQgJ3V0aWwvY29sb3Iuc2Nzcyc7XFxyXFxuQGltcG9ydCAndXRpbC9ib3hzaGFkb3cuc2Nzcyc7XFxyXFxuLmNvbnRhaW5lcntcXHJcXG4gIHdpZHRoOiA5NSU7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgcGFkZGluZzogMTVweDtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXJ0QnV0dG9ue1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgZm9udC1zaXplOiAzMnB4O1xcclxcbiAgICB3aWR0aDogMzUlO1xcclxcbiAgfVxcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTk5cHgpe1xcclxcbiAgICBmb250LXNpemU6IDI2cHg7XFxyXFxuICAgIHdpZHRoOiA1MCU7XFxyXFxuICB9XFxyXFxuICBcXHJcXG4gIHBhZGRpbmc6IDIwcHg7XFxyXFxuICBtYXJnaW46IGF1dG87XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBmb250LWZhbWlseTogXFxcIkhhbm5hXFxcIiwgXFxcIlVidW50dVxcXCIsIHNhbnMtc2VyaWY7XFxyXFxuICBAaW5jbHVkZSBib3hTaGFkb3dCb3R0b21SaWdodFRoaW5MaWdodGVyO1xcclxcbiAgXFxyXFxuICBAaW5jbHVkZSBidXR0b24tZmlsbCgkbGlnaHQtcmVkKTtcXHJcXG4gIFxcclxcbiAgdHJhbnNpdGlvbjogcGFkZGluZyAwLjNzIGVhc2UtaW4tb3V0LCBib3R0b20gMC4zcyBlYXNlLWluLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXJ0QnV0dG9uLWluLWFjdGl2ZXtcXHJcXG4gIHBhZGRpbmctYm90dG9tOiAxMDBweDtcXHJcXG4gIGN1cnNvcjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLnJlc3VsdHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxMDBweDtcXHJcXG4gIHBhZGRpbmc6IDIwcHg7XFxyXFxuICBvcGFjaXR5OiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gIG1hcmdpbjogMCAtMjBweDtcXHJcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxyXFxuICBmb250LWZhbWlseTogXFxcIkhhbm5hXFxcIiwgXFxcIlVidW50dVxcXCIsIHNhbnMtc2VyaWY7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICBmb250LXNpemU6IDM2cHg7XFxyXFxuICB9XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTlweCl7XFxyXFxuICAgIGZvbnQtc2l6ZTogMzJweDtcXHJcXG4gIH1cXHJcXG4gIGNvbG9yOiAkZGFyay15ZWxsb3c7XFxyXFxufVxcclxcblxcclxcbi5yZXN1bHQtaW4tYWN0aXZle1xcclxcbiAgb3BhY2l0eTogMTtcXHJcXG59XCIsXCJAbWl4aW4gYm94U2hhZG93Qm90dG9tVGhpbkxpZ2h0ZXIoKSB7XFxyXFxuICBib3gtc2hhZG93OiAwIDJweCAycHggLTJweCByZ2JhKDAsMCwwLC4xNSk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBib3hTaGFkb3dCb3R0b21SaWdodFRoaW5MaWdodGVyKCl7XFxyXFxuICAtd2Via2l0LWJveC1zaGFkb3c6IDE3cHggMTlweCAzMHB4IC0xNnB4IHJnYmEoMCwwLDAsMC41KTtcXHJcXG4gIC1tb3otYm94LXNoYWRvdzogMTdweCAxOXB4IDMwcHggLTE2cHggcmdiYSgwLDAsMCwwLjUpO1xcclxcbiAgYm94LXNoYWRvdzogMTdweCAxOXB4IDMwcHggLTE2cHggcmdiYSgwLDAsMCwwLjUpO1xcclxcbn1cXHJcXG5cXHJcXG5cIixcIkBtaXhpbiBidXR0b24tZmlsbCgkYmcsICRjb2xvcjp3aGl0ZSkge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgY29sb3I6ICRjb2xvcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZyw4JSk7XFxyXFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWJvcmRlcigkY29sb3IsJGJnOiB3aGl0ZSkge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgY29sb3I6ICRjb2xvcjtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZyw4JSk7XFxyXFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uKCRib3JkZXIpe1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgY29sb3I6ICRib3JkZXI7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gICY6aG92ZXJ7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gIH1cXHJcXG4gICY6YmVmb3JlLFxcclxcbiAgJjphZnRlcntcXHJcXG4gICAgY29udGVudDogJyc7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgei1pbmRleDotMTtcXHJcXG4gICAgd2lkdGg6IDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJvcmRlcjtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiB3aWR0aCAwLjJzIGVhc2UtaW4tb3V0O1xcclxcbiAgICBcXHJcXG4gIH1cXHJcXG4gIFxcclxcbiAgJjpob3ZlcjpiZWZvcmUsXFxyXFxuICAmOmhvdmVyOmFmdGVye1xcclxcbiAgICB3aWR0aDogMTAwJTsgLy90cmFuc2l0aW9u7JeQIO2VtOuLue2VmOuKlCBlbGVtZW5066eMIOuwlOuAlCDrlYwgcmV2ZXJzZeuPhCDrkJzri6QuXFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBidXR0b24tYWN0aXZlKCRiZyl7XFxyXFxuICBiYWNrZ3JvdW5kOiAkYmc7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmxpZ2h0ZW4oJGJnLDglKTtcXHJcXG4gICAgfVxcclxcbiAgICAmOmFjdGl2ZSB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbiAgXFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBidXR0b24tYm9yZGVyLWFjdGl2ZSgkYmcpe1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgJGJnO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZyw4JSk7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6bGlnaHRlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG4gIFxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWEoJGNvbG9yKXtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnSGFubmEnLCdVYnVudHUnLHNhbnMtc2VyaWY7XFxyXFxuICBmb250LXNpemU6IDI0cHg7XFxyXFxuICBjb2xvcjogJGNvbG9yO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgYXtcXHJcXG4gICAgICAmOmhvdmVye1xcclxcbiAgICAgICAgY29sb3I6IGRhcmtlbigkY29sb3IsMTUlKTsgXFxyXFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICAgIFxcclxcbiAgfVxcclxcbn1cIixcIiRkYXJrLWJsdWU6IHJnYig1MSwgNTUsIDY5KTtcXHJcXG4kbGlnaHQtYmx1ZTogIzI5ODBCOTtcXHJcXG4kZGFyay15ZWxsb3c6IHJnYigyNTUsIDE5MSwgMCk7XFxyXFxuJGxpZ2h0LXJlZDogI0ZGNDA0RTtcXHJcXG4kbGlnaHQtYnJvd246ICM0QTQwNEE7XFxyXFxuJGRhcmstZ3JlZW46ICM3QTgyNTY7XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKHRydWUpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBGbGV4IFNhc3MgKi9cXG4vKkZsZXggU2FzcyovXFxuLyogRmxleCBTYXNzICovXFxuLypGbGV4IFNhc3MqL1xcbi5yZXNldFRhZ0J1dHRvbiB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aWR0aDogMzZweDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgcGFkZGluZzogLjFyZW07XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgY29sb3I6ICNGRjQwNEU7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZiZjAwO1xcbiAgYm9yZGVyLXJhZGl1czogMTAwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kOiAjZmZiZjAwO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLnJlc2V0VGFnQnV0dG9uOmhvdmVyIHtcXG4gICAgICBiYWNrZ3JvdW5kOiAjZDZhMDAwO1xcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlOyB9XFxuICAgIC5yZXNldFRhZ0J1dHRvbjphY3RpdmUge1xcbiAgICAgIGJhY2tncm91bmQ6ICM4MDYwMDA7IH0gfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9mbGV4LnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvUmVzdWx0UGFnZS5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvY29sb3Iuc2Nzc1wiLFwiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS91dGlsL2J1dHRvbi5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGNBQUE7QUE4SkEsWUFBQTtBQTlKQSxjQUFBO0FBOEpBLFlBQUE7QUN4SkE7RUFDRSxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixjQUFjO0VBQ2QsY0FBYztFQUNkLGdCQUFnQjtFQUNoQixjQ1ZpQjtFRFdqQix5QkNaNEI7RURhNUIsb0JBQW9CO0VBQ3BCLGVBQWU7RUVmZixlQUFlO0VBQ2YsbUJEQTRCO0VDQzVCLFlBSGtDLEVBQUE7RUFJbEM7SUZFRjtNRUFNLG1CQUF5QjtNQUN6Qix5QkFBeUI7TUFDekIsaUNBQWlDLEVBQUE7SUZGdkM7TUVLTSxtQkFBMEIsRUFBQSxFQUMzQlwiLFwiZmlsZVwiOlwiUmVzdWx0UGFnZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIEZsZXggU2FzcyAqL1xcclxcbkBtaXhpbiBmbGV4Ym94KCkge1xcclxcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxyXFxuICBkaXNwbGF5OiAtbW96LWJveDtcXHJcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcclxcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gVGhlICdmbGV4JyBzaG9ydGhhbmRcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8cG9zaXRpdmUtbnVtYmVyPiwgaW5pdGlhbCwgYXV0bywgb3Igbm9uZVxcclxcbkBtaXhpbiBmbGV4KCR2YWx1ZXMpIHtcXHJcXG4gIC13ZWJraXQtYm94LWZsZXg6ICR2YWx1ZXM7XFxyXFxuICAgICAtbW96LWJveC1mbGV4OiAkdmFsdWVzO1xcclxcbiAgICAgIC13ZWJraXQtZmxleDogJHZhbHVlcztcXHJcXG4gIFxcdCAgLW1zLWZsZXg6ICR2YWx1ZXM7XFxyXFxuICBcXHQgICAgICBmbGV4OiAkdmFsdWVzO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IEZsb3cgRGlyZWN0aW9uXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyByb3cgfCByb3ctcmV2ZXJzZSB8IGNvbHVtbiB8IGNvbHVtbi1yZXZlcnNlXFxyXFxuQG1peGluIGZsZXgtZGlyZWN0aW9uKCRkaXJlY3Rpb24pIHtcXHJcXG4gIC13ZWJraXQtZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxuICAgICAtbW96LWZsZXgtZGlyZWN0aW9uOiAkZGlyZWN0aW9uO1xcclxcbiAgICAgIC1tcy1mbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjtcXHJcXG4gICAgICAgICAgZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggTGluZSBXcmFwcGluZ1xcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gbm93cmFwIHwgd3JhcCB8IHdyYXAtcmV2ZXJzZVxcclxcbkBtaXhpbiBmbGV4LXdyYXAoJHdyYXApIHtcXHJcXG4gIC13ZWJraXQtZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgIC1tb3otZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgICAtbXMtZmxleC13cmFwOiAkd3JhcDtcXHJcXG4gICAgICAgICAgZmxleC13cmFwOiAkd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBEaXJlY3Rpb24gYW5kIFdyYXBcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggY29udGFpbmVyc1xcclxcbi8vIDxmbGV4LWRpcmVjdGlvbj4gfHwgPGZsZXgtd3JhcD5cXHJcXG5AbWl4aW4gZmxleC1mbG93KCRmbG93KSB7XFxyXFxuICAtd2Via2l0LWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAtbW96LWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAgLW1zLWZsZXgtZmxvdzogJGZsb3c7XFxyXFxuICAgICAgICAgIGZsZXgtZmxvdzogJGZsb3c7XFxyXFxufVxcclxcblxcclxcbi8vIERpc3BsYXkgT3JkZXJcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyA8aW50ZWdlcj5cXHJcXG5AbWl4aW4gb3JkZXIoJHZhbCkge1xcclxcbiAgLXdlYmtpdC1ib3gtb3JkaW5hbC1ncm91cDogJHZhbDtcXHJcXG4gICAgIC1tb3otYm94LW9yZGluYWwtZ3JvdXA6ICR2YWw7XFxyXFxuICBcXHQgICAgIC1tcy1mbGV4LW9yZGVyOiAkdmFsO1xcclxcbiAgXFx0ICAgICAgLXdlYmtpdC1vcmRlcjogJHZhbDtcXHJcXG4gIFxcdFxcdCAgICAgIG9yZGVyOiAkdmFsO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IGdyb3cgZmFjdG9yXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zXFxyXFxuLy8gPG51bWJlcj5cXHJcXG5AbWl4aW4gZmxleC1ncm93KCRncm93KSB7XFxyXFxuICAtd2Via2l0LWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAtbW96LWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAgLW1zLWZsZXgtZ3JvdzogJGdyb3c7XFxyXFxuICAgICAgICAgIGZsZXgtZ3JvdzogJGdyb3c7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggc2hyaW5rXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW0gc2hyaW5rIGZhY3Rvclxcclxcbi8vIDxudW1iZXI+XFxyXFxuQG1peGluIGZsZXgtc2hyaW5rKCRzaHJpbmspIHtcXHJcXG4gIC13ZWJraXQtZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxuICAgICAtbW96LWZsZXgtc2hyaW5rOiAkc2hyaW5rO1xcclxcbiAgICAgIC1tcy1mbGV4LXNocmluazogJHNocmluaztcXHJcXG4gICAgICAgICAgZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggYmFzaXNcXHJcXG4vLyAtIHRoZSBpbml0aWFsIG1haW4gc2l6ZSBvZiB0aGUgZmxleCBpdGVtXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zbml0aWFsIG1haW4gc2l6ZSBvZiB0aGUgZmxleCBpdGVtXFxyXFxuLy8gPHdpZHRoPlxcclxcbkBtaXhpbiBmbGV4LWJhc2lzKCR3aWR0aCkge1xcclxcbiAgLXdlYmtpdC1mbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxuICAgICAtbW96LWZsZXgtYmFzaXM6ICR3aWR0aDtcXHJcXG4gICAgICAtbXMtZmxleC1iYXNpczogJHdpZHRoO1xcclxcbiAgICAgICAgICBmbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxufVxcclxcblxcclxcbi8vIEF4aXMgQWxpZ25tZW50XFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBzcGFjZS1iZXR3ZWVuIHwgc3BhY2UtYXJvdW5kXFxyXFxuQG1peGluIGp1c3RpZnktY29udGVudCgkanVzdGlmeSkge1xcclxcbiAgLXdlYmtpdC1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgLW1vei1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgIC1tcy1qdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6ICRqdXN0aWZ5O1xcclxcbiAgICAgICAgICAgIC1tcy1mbGV4LXBhY2s6ICRqdXN0aWZ5O1xcclxcbn1cXHJcXG5cXHJcXG4vLyBQYWNraW5nIEZsZXggTGluZXNcXHJcXG4vLyAtIGFwcGxpZXMgdG86IG11bHRpLWxpbmUgZmxleCBjb250YWluZXJzXFxyXFxuLy8gZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgc3BhY2UtYmV0d2VlbiB8IHNwYWNlLWFyb3VuZCB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24tY29udGVudCgkYWxpZ24pIHtcXHJcXG4gIC13ZWJraXQtYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1jb250ZW50OiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLWNvbnRlbnQ6ICRhbGlnbjtcXHJcXG4gICAgICAgICAgYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDcm9zcy1heGlzIEFsaWdubWVudFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgYmFzZWxpbmUgfCBzdHJldGNoXFxyXFxuQG1peGluIGFsaWduLWl0ZW1zKCRhbGlnbikge1xcclxcbiAgLXdlYmtpdC1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgIC1tcy1hbGlnbi1pdGVtczogJGFsaWduO1xcclxcbiAgICAgICAgICBhbGlnbi1pdGVtczogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBDcm9zcy1heGlzIEFsaWdubWVudFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtc1xcclxcbi8vIGF1dG8gfCBmbGV4LXN0YXJ0IHwgZmxleC1lbmQgfCBjZW50ZXIgfCBiYXNlbGluZSB8IHN0cmV0Y2hcXHJcXG5AbWl4aW4gYWxpZ24tc2VsZigkYWxpZ24pIHtcXHJcXG4gIC13ZWJraXQtYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbiAgICAgLW1vei1hbGlnbi1zZWxmOiAkYWxpZ247XFxyXFxuICAgICAgLW1zLWFsaWduLXNlbGY6ICRhbGlnbjtcXHJcXG4gICAgICAgICAgYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0xLTF7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWJhc2lzKGF1dG8pO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0wLTF7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDApO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWJhc2lzKGF1dG8pO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0xLTB7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMCk7XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBmbGV4LTAtMHtcXHJcXG4gIEBpbmNsdWRlIGZsZXgoMSk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LWdyb3coMCk7XFxyXFxuICBAaW5jbHVkZSBmbGV4LXNocmluaygwKTtcXHJcXG59XFxyXFxuLypGbGV4IFNhc3MqL1wiLFwiQGltcG9ydCAndXRpbC9jb2xvci5zY3NzJztcXG5AaW1wb3J0ICd1dGlsL2NlbnRlcmVyLnNjc3MnO1xcbkBpbXBvcnQgJ3V0aWwvYnV0dG9uLnNjc3MnO1xcbkBpbXBvcnQgJ3V0aWwvZmxleC5zY3NzJztcXG5AaW1wb3J0ICd1dGlsL2JveHNoYWRvdy5zY3NzJztcXG5cXG4ucmVzZXRUYWdCdXR0b257XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aWR0aDogMzZweDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGZvbnQtc2l6ZTogMmVtO1xcbiAgcGFkZGluZzogLjFyZW07XFxuICBtYXJnaW4tdG9wOiAxcmVtO1xcbiAgY29sb3I6ICRsaWdodC1yZWQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAkZGFyay15ZWxsb3c7XFxuICBib3JkZXItcmFkaXVzOiAxMDBweDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIEBpbmNsdWRlIGJ1dHRvbi1maWxsKCRkYXJrLXllbGxvdyk7XFxufVxcblwiLFwiJGRhcmstYmx1ZTogcmdiKDUxLCA1NSwgNjkpO1xcclxcbiRsaWdodC1ibHVlOiAjMjk4MEI5O1xcclxcbiRkYXJrLXllbGxvdzogcmdiKDI1NSwgMTkxLCAwKTtcXHJcXG4kbGlnaHQtcmVkOiAjRkY0MDRFO1xcclxcbiRsaWdodC1icm93bjogIzRBNDA0QTtcXHJcXG4kZGFyay1ncmVlbjogIzdBODI1NjtcIixcIkBtaXhpbiBidXR0b24tZmlsbCgkYmcsICRjb2xvcjp3aGl0ZSkge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgY29sb3I6ICRjb2xvcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZyw4JSk7XFxyXFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWJvcmRlcigkY29sb3IsJGJnOiB3aGl0ZSkge1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgY29sb3I6ICRjb2xvcjtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICRjb2xvcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZyw4JSk7XFxyXFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXHJcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6ZGFya2VuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uKCRib3JkZXIpe1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgY29sb3I6ICRib3JkZXI7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAkYm9yZGVyO1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gICY6aG92ZXJ7XFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gIH1cXHJcXG4gICY6YmVmb3JlLFxcclxcbiAgJjphZnRlcntcXHJcXG4gICAgY29udGVudDogJyc7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgei1pbmRleDotMTtcXHJcXG4gICAgd2lkdGg6IDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuICAgIHRvcDogMDtcXHJcXG4gICAgbGVmdDogMDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJvcmRlcjtcXHJcXG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiB3aWR0aCAwLjJzIGVhc2UtaW4tb3V0O1xcclxcbiAgICBcXHJcXG4gIH1cXHJcXG4gIFxcclxcbiAgJjpob3ZlcjpiZWZvcmUsXFxyXFxuICAmOmhvdmVyOmFmdGVye1xcclxcbiAgICB3aWR0aDogMTAwJTsgLy90cmFuc2l0aW9u7JeQIO2VtOuLue2VmOuKlCBlbGVtZW5066eMIOuwlOuAlCDrlYwgcmV2ZXJzZeuPhCDrkJzri6QuXFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBidXR0b24tYWN0aXZlKCRiZyl7XFxyXFxuICBiYWNrZ3JvdW5kOiAkYmc7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmxpZ2h0ZW4oJGJnLDglKTtcXHJcXG4gICAgfVxcclxcbiAgICAmOmFjdGl2ZSB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZywyNSUpO1xcclxcbiAgICB9IFxcclxcbiAgfVxcclxcbiAgXFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBidXR0b24tYm9yZGVyLWFjdGl2ZSgkYmcpe1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgJGJnO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZyw4JSk7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6bGlnaHRlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG4gIFxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWEoJGNvbG9yKXtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtZmFtaWx5OiAnSGFubmEnLCdVYnVudHUnLHNhbnMtc2VyaWY7XFxyXFxuICBmb250LXNpemU6IDI0cHg7XFxyXFxuICBjb2xvcjogJGNvbG9yO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgYXtcXHJcXG4gICAgICAmOmhvdmVye1xcclxcbiAgICAgICAgY29sb3I6IGRhcmtlbigkY29sb3IsMTUlKTsgXFxyXFxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICAgICAgfVxcclxcbiAgICB9XFxyXFxuICAgIFxcclxcbiAgfVxcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIikodHJ1ZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIEZsZXggU2FzcyAqL1xcbi8qRmxleCBTYXNzKi9cXG4udGFnRmluZGVyQ29udGFpbmVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlOyB9XFxuXFxuLnRhZ0ZpbmRlckNvbnRhaW5lciBpbnB1dCB7XFxuICB3aWR0aDogMjAwcHg7XFxuICBwYWRkaW5nOiA1cHg7XFxuICB6LWluZGV4OiAzO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBsaW5lLWhlaWdodDogMS41O1xcbiAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgI2NjYztcXG4gIG91dGxpbmU6IDA7XFxuICBmb250LXNpemU6IDEuMmVtO1xcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICAtbW96LWJveC1zaGFkb3c6IDE3cHggMTlweCAzMHB4IC0xNnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIGJveC1zaGFkb3c6IDE3cHggMTlweCAzMHB4IC0xNnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTsgfVxcblxcbi50YWdGaW5kZXJCdXR0b24ge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHdpZHRoOiAzNnB4O1xcbiAgaGVpZ2h0OiAzNnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTAwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kOiAjRkY0MDRFO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZGlzcGxheTogLXdlYmtpdC1ib3g7XFxuICBkaXNwbGF5OiAtbW96LWJveDtcXG4gIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgZGlzcGxheTogLXdlYmtpdC1mbGV4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB0cmFuc2l0aW9uOiBtYXJnaW4tYm90dG9tIDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG1hcmdpbi1ib3R0b20gMC4zcyBlYXNlLWluLW91dDsgfVxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAgIC50YWdGaW5kZXJCdXR0b246aG92ZXIge1xcbiAgICAgIGJhY2tncm91bmQ6ICNmZjE3Mjg7XFxuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXG4gICAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7IH1cXG4gICAgLnRhZ0ZpbmRlckJ1dHRvbjphY3RpdmUge1xcbiAgICAgIGJhY2tncm91bmQ6ICNjMDAwMGU7IH0gfVxcblxcbi50YWdGaW5kZXJCdXR0b24taW5hY3RpdmUge1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDsgfVxcblxcbi50YWdGaW5kZXJCdXR0b25JY29uIHtcXG4gIG1hcmdpbjogYXV0bztcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2UtaW4tb3V0LCBjb2xvciAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dCwgY29sb3IgMC4zcyBlYXNlLWluLW91dDsgfVxcblxcbi50YWdGaW5kZXJCdXR0b25JY29uLXJvdGF0ZSB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7IH1cXG5cXG4udGFnRmluZGVySW5wdXQge1xcbiAgZm9udC1mYW1pbHk6ICdIYW5uYScsJ1VidW50dScsc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIHdpZHRoOiAyNDBweDtcXG4gIHBhZGRpbmc6IDBweDtcXG4gIGhlaWdodDogMHB4O1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgb3BhY2l0eTogMDtcXG4gIG1hcmdpbjogMHB4IGF1dG87XFxuICB0cmFuc2l0aW9uOiBoZWlnaHQgMC4zcyBlYXNlLWluLW91dCxvcGFjaXR5IDAuM3MgZWFzZS1pbi1vdXQsIHZpc2liaWxpdHkgMC4zcyBlYXNlLWluLW91dDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogaGVpZ2h0IDAuM3MgZWFzZS1pbi1vdXQsIG9wYWNpdHkgMC4zcyBlYXNlLWluLW91dCwgIHZpc2liaWxpdHkgMC4zcyBlYXNlLWluLW91dDsgfVxcblxcbi50YWdGaW5kZXJJbnB1dC1hY3RpdmUge1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcXG4gIG9wYWNpdHk6IDE7IH1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvZmxleC5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL1RhZ0ZpbmRlci5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvYm94c2hhZG93LnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9idXR0b24uc2Nzc1wiLFwiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS91dGlsL2NvbG9yLnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9jZW50ZXJlci5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBLGNBQUE7QUE4SkEsWUFBQTtBQzFKQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXLEVBQUE7O0FBR2I7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLFVBQVU7RUFDVixrQkFBa0I7RUFDbEIsdUJBQXVCO0VBQ3ZCLGdCQUFnQjtFQUNoQix3QkFBd0I7RUFDeEIsa0JBQWtCO0VBQ2xCLHNCQUFzQjtFQUN0QixVQUFVO0VBQ1YsZ0JBQWdCO0VDZmhCLDJEQUF3RDtFQUN4RCx3REFBcUQ7RUFDckQsbURBQWdEO0VEZWhELHdCQUF3QixFQUFBOztBQUcxQjtFQUNFLHNCQUFzQjtFQUN0QixXQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixvQkFBb0I7RUVoQ3BCLGVBQWU7RUFDZixtQkNDaUI7RURBakIsWUFIa0M7RUhFbEMsb0JBQW9CO0VBQ3BCLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIscUJBQXFCO0VBQ3JCLGFBQWE7RUtrQ1gsbUJBQW1CO0VKSHJCLDBDQUEwQztFQUMxQyxrREFBa0QsRUFBQTtFRWxDbEQ7SUZxQkY7TUVuQk0sbUJBQXlCO01BQ3pCLHlCQUF5QjtNQUN6QixpQ0FBaUMsRUFBQTtJRmlCdkM7TUVkTSxtQkFBMEIsRUFBQSxFQUMzQjs7QUY2Qkw7RUFDRSxtQkFBbUIsRUFBQTs7QUFHckI7RUFDRSxZQUFZO0VBQ1osOERBQThEO0VBQzlELHNFQUFzRSxFQUFBOztBQUd4RTtFQUNFLHdCQUF3QixFQUFBOztBQUUxQjtFQUNFLHdDQUF3QztFQUN4QyxlQUFlO0VBQ2YsWUFBWTtFQUNaLFlBQVk7RUFDWixXQUFXO0VBQ1gsa0JBQWtCO0VBQ2xCLFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIseUZBQXlGO0VBQ3pGLG1HQUFtRyxFQUFBOztBQUVyRztFQUNFLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsVUFBVSxFQUFBXCIsXCJmaWxlXCI6XCJUYWdGaW5kZXIuc2Nzc1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKiBGbGV4IFNhc3MgKi9cXHJcXG5AbWl4aW4gZmxleGJveCgpIHtcXHJcXG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xcclxcbiAgZGlzcGxheTogLW1vei1ib3g7XFxyXFxuICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXHJcXG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi8vIFRoZSAnZmxleCcgc2hvcnRoYW5kXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zXFxyXFxuLy8gPHBvc2l0aXZlLW51bWJlcj4sIGluaXRpYWwsIGF1dG8sIG9yIG5vbmVcXHJcXG5AbWl4aW4gZmxleCgkdmFsdWVzKSB7XFxyXFxuICAtd2Via2l0LWJveC1mbGV4OiAkdmFsdWVzO1xcclxcbiAgICAgLW1vei1ib3gtZmxleDogJHZhbHVlcztcXHJcXG4gICAgICAtd2Via2l0LWZsZXg6ICR2YWx1ZXM7XFxyXFxuICBcXHQgIC1tcy1mbGV4OiAkdmFsdWVzO1xcclxcbiAgXFx0ICAgICAgZmxleDogJHZhbHVlcztcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBGbG93IERpcmVjdGlvblxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gcm93IHwgcm93LXJldmVyc2UgfCBjb2x1bW4gfCBjb2x1bW4tcmV2ZXJzZVxcclxcbkBtaXhpbiBmbGV4LWRpcmVjdGlvbigkZGlyZWN0aW9uKSB7XFxyXFxuICAtd2Via2l0LWZsZXgtZGlyZWN0aW9uOiAkZGlyZWN0aW9uO1xcclxcbiAgICAgLW1vei1mbGV4LWRpcmVjdGlvbjogJGRpcmVjdGlvbjtcXHJcXG4gICAgICAtbXMtZmxleC1kaXJlY3Rpb246ICRkaXJlY3Rpb247XFxyXFxuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiAkZGlyZWN0aW9uO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IExpbmUgV3JhcHBpbmdcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggY29udGFpbmVyc1xcclxcbi8vIG5vd3JhcCB8IHdyYXAgfCB3cmFwLXJldmVyc2VcXHJcXG5AbWl4aW4gZmxleC13cmFwKCR3cmFwKSB7XFxyXFxuICAtd2Via2l0LWZsZXgtd3JhcDogJHdyYXA7XFxyXFxuICAgICAtbW96LWZsZXgtd3JhcDogJHdyYXA7XFxyXFxuICAgICAgLW1zLWZsZXgtd3JhcDogJHdyYXA7XFxyXFxuICAgICAgICAgIGZsZXgtd3JhcDogJHdyYXA7XFxyXFxufVxcclxcblxcclxcbi8vIEZsZXggRGlyZWN0aW9uIGFuZCBXcmFwXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGNvbnRhaW5lcnNcXHJcXG4vLyA8ZmxleC1kaXJlY3Rpb24+IHx8IDxmbGV4LXdyYXA+XFxyXFxuQG1peGluIGZsZXgtZmxvdygkZmxvdykge1xcclxcbiAgLXdlYmtpdC1mbGV4LWZsb3c6ICRmbG93O1xcclxcbiAgICAgLW1vei1mbGV4LWZsb3c6ICRmbG93O1xcclxcbiAgICAgIC1tcy1mbGV4LWZsb3c6ICRmbG93O1xcclxcbiAgICAgICAgICBmbGV4LWZsb3c6ICRmbG93O1xcclxcbn1cXHJcXG5cXHJcXG4vLyBEaXNwbGF5IE9yZGVyXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBmbGV4IGl0ZW1zXFxyXFxuLy8gPGludGVnZXI+XFxyXFxuQG1peGluIG9yZGVyKCR2YWwpIHtcXHJcXG4gIC13ZWJraXQtYm94LW9yZGluYWwtZ3JvdXA6ICR2YWw7XFxyXFxuICAgICAtbW96LWJveC1vcmRpbmFsLWdyb3VwOiAkdmFsO1xcclxcbiAgXFx0ICAgICAtbXMtZmxleC1vcmRlcjogJHZhbDtcXHJcXG4gIFxcdCAgICAgIC13ZWJraXQtb3JkZXI6ICR2YWw7XFxyXFxuICBcXHRcXHQgICAgICBvcmRlcjogJHZhbDtcXHJcXG59XFxyXFxuXFxyXFxuLy8gRmxleCBncm93IGZhY3Rvclxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtc1xcclxcbi8vIDxudW1iZXI+XFxyXFxuQG1peGluIGZsZXgtZ3JvdygkZ3Jvdykge1xcclxcbiAgLXdlYmtpdC1mbGV4LWdyb3c6ICRncm93O1xcclxcbiAgICAgLW1vei1mbGV4LWdyb3c6ICRncm93O1xcclxcbiAgICAgIC1tcy1mbGV4LWdyb3c6ICRncm93O1xcclxcbiAgICAgICAgICBmbGV4LWdyb3c6ICRncm93O1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IHNocmlua1xcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtIHNocmluayBmYWN0b3JcXHJcXG4vLyA8bnVtYmVyPlxcclxcbkBtaXhpbiBmbGV4LXNocmluaygkc2hyaW5rKSB7XFxyXFxuICAtd2Via2l0LWZsZXgtc2hyaW5rOiAkc2hyaW5rO1xcclxcbiAgICAgLW1vei1mbGV4LXNocmluazogJHNocmluaztcXHJcXG4gICAgICAtbXMtZmxleC1zaHJpbms6ICRzaHJpbms7XFxyXFxuICAgICAgICAgIGZsZXgtc2hyaW5rOiAkc2hyaW5rO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBGbGV4IGJhc2lzXFxyXFxuLy8gLSB0aGUgaW5pdGlhbCBtYWluIHNpemUgb2YgdGhlIGZsZXggaXRlbVxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBpdGVtc25pdGlhbCBtYWluIHNpemUgb2YgdGhlIGZsZXggaXRlbVxcclxcbi8vIDx3aWR0aD5cXHJcXG5AbWl4aW4gZmxleC1iYXNpcygkd2lkdGgpIHtcXHJcXG4gIC13ZWJraXQtZmxleC1iYXNpczogJHdpZHRoO1xcclxcbiAgICAgLW1vei1mbGV4LWJhc2lzOiAkd2lkdGg7XFxyXFxuICAgICAgLW1zLWZsZXgtYmFzaXM6ICR3aWR0aDtcXHJcXG4gICAgICAgICAgZmxleC1iYXNpczogJHdpZHRoO1xcclxcbn1cXHJcXG5cXHJcXG4vLyBBeGlzIEFsaWdubWVudFxcclxcbi8vIC0gYXBwbGllcyB0bzogZmxleCBjb250YWluZXJzXFxyXFxuLy8gZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgc3BhY2UtYmV0d2VlbiB8IHNwYWNlLWFyb3VuZFxcclxcbkBtaXhpbiBqdXN0aWZ5LWNvbnRlbnQoJGp1c3RpZnkpIHtcXHJcXG4gIC13ZWJraXQtanVzdGlmeS1jb250ZW50OiAkanVzdGlmeTtcXHJcXG4gICAgIC1tb3otanVzdGlmeS1jb250ZW50OiAkanVzdGlmeTtcXHJcXG4gICAgICAtbXMtanVzdGlmeS1jb250ZW50OiAkanVzdGlmeTtcXHJcXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiAkanVzdGlmeTtcXHJcXG4gICAgICAgICAgICAtbXMtZmxleC1wYWNrOiAkanVzdGlmeTtcXHJcXG59XFxyXFxuXFxyXFxuLy8gUGFja2luZyBGbGV4IExpbmVzXFxyXFxuLy8gLSBhcHBsaWVzIHRvOiBtdWx0aS1saW5lIGZsZXggY29udGFpbmVyc1xcclxcbi8vIGZsZXgtc3RhcnQgfCBmbGV4LWVuZCB8IGNlbnRlciB8IHNwYWNlLWJldHdlZW4gfCBzcGFjZS1hcm91bmQgfCBzdHJldGNoXFxyXFxuQG1peGluIGFsaWduLWNvbnRlbnQoJGFsaWduKSB7XFxyXFxuICAtd2Via2l0LWFsaWduLWNvbnRlbnQ6ICRhbGlnbjtcXHJcXG4gICAgIC1tb3otYWxpZ24tY29udGVudDogJGFsaWduO1xcclxcbiAgICAgIC1tcy1hbGlnbi1jb250ZW50OiAkYWxpZ247XFxyXFxuICAgICAgICAgIGFsaWduLWNvbnRlbnQ6ICRhbGlnbjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQ3Jvc3MtYXhpcyBBbGlnbm1lbnRcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggY29udGFpbmVyc1xcclxcbi8vIGZsZXgtc3RhcnQgfCBmbGV4LWVuZCB8IGNlbnRlciB8IGJhc2VsaW5lIHwgc3RyZXRjaFxcclxcbkBtaXhpbiBhbGlnbi1pdGVtcygkYWxpZ24pIHtcXHJcXG4gIC13ZWJraXQtYWxpZ24taXRlbXM6ICRhbGlnbjtcXHJcXG4gICAgIC1tb3otYWxpZ24taXRlbXM6ICRhbGlnbjtcXHJcXG4gICAgICAtbXMtYWxpZ24taXRlbXM6ICRhbGlnbjtcXHJcXG4gICAgICAgICAgYWxpZ24taXRlbXM6ICRhbGlnbjtcXHJcXG59XFxyXFxuXFxyXFxuLy8gQ3Jvc3MtYXhpcyBBbGlnbm1lbnRcXHJcXG4vLyAtIGFwcGxpZXMgdG86IGZsZXggaXRlbXNcXHJcXG4vLyBhdXRvIHwgZmxleC1zdGFydCB8IGZsZXgtZW5kIHwgY2VudGVyIHwgYmFzZWxpbmUgfCBzdHJldGNoXFxyXFxuQG1peGluIGFsaWduLXNlbGYoJGFsaWduKSB7XFxyXFxuICAtd2Via2l0LWFsaWduLXNlbGY6ICRhbGlnbjtcXHJcXG4gICAgIC1tb3otYWxpZ24tc2VsZjogJGFsaWduO1xcclxcbiAgICAgIC1tcy1hbGlnbi1zZWxmOiAkYWxpZ247XFxyXFxuICAgICAgICAgIGFsaWduLXNlbGY6ICRhbGlnbjtcXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGZsZXgtMS0xe1xcclxcbiAgQGluY2x1ZGUgZmxleCgxKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtZ3JvdygxKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtc2hyaW5rKDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1iYXNpcyhhdXRvKTtcXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGZsZXgtMC0xe1xcclxcbiAgQGluY2x1ZGUgZmxleCgxKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtZ3JvdygwKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtc2hyaW5rKDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1iYXNpcyhhdXRvKTtcXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGZsZXgtMS0we1xcclxcbiAgQGluY2x1ZGUgZmxleCgxKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtZ3JvdygxKTtcXHJcXG4gIEBpbmNsdWRlIGZsZXgtc2hyaW5rKDApO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gZmxleC0wLTB7XFxyXFxuICBAaW5jbHVkZSBmbGV4KDEpO1xcclxcbiAgQGluY2x1ZGUgZmxleC1ncm93KDApO1xcclxcbiAgQGluY2x1ZGUgZmxleC1zaHJpbmsoMCk7XFxyXFxufVxcclxcbi8qRmxleCBTYXNzKi9cIixcIkBpbXBvcnQgJy4vdXRpbC9jZW50ZXJlci5zY3NzJztcXG5AaW1wb3J0ICcuL3V0aWwvY29sb3Iuc2Nzcyc7XFxuQGltcG9ydCAnLi91dGlsL2JveHNoYWRvdy5zY3NzJztcXG5AaW1wb3J0ICcuL3V0aWwvYnV0dG9uLnNjc3MnO1xcbi50YWdGaW5kZXJDb250YWluZXJ7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG59XFxuXFxuLnRhZ0ZpbmRlckNvbnRhaW5lciBpbnB1dHtcXG4gIHdpZHRoOiAyMDBweDtcXG4gIHBhZGRpbmc6IDVweDtcXG4gIHotaW5kZXg6IDM7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjY2NjO1xcbiAgb3V0bGluZTogMDtcXG4gIGZvbnQtc2l6ZTogMS4yZW07XFxuICBAaW5jbHVkZSBib3hTaGFkb3dCb3R0b21SaWdodFRoaW5MaWdodGVyO1xcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcbn1cXG5cXG4udGFnRmluZGVyQnV0dG9ue1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHdpZHRoOiAzNnB4O1xcbiAgaGVpZ2h0OiAzNnB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgZm9udC1zaXplOiAxNnB4O1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogMTAwcHg7XFxuICBAaW5jbHVkZSBidXR0b24tZmlsbCgkbGlnaHQtcmVkKTtcXG4gIEBpbmNsdWRlIGNlbnRlcmVyRmxleChmYWxzZSx0cnVlKTtcXG5cXG4gIHRyYW5zaXRpb246IG1hcmdpbi1ib3R0b20gMC4zcyBlYXNlLWluLW91dDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogbWFyZ2luLWJvdHRvbSAwLjNzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udGFnRmluZGVyQnV0dG9uLWluYWN0aXZle1xcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcXG59XFxuXFxuLnRhZ0ZpbmRlckJ1dHRvbkljb257XFxuICBtYXJnaW46IGF1dG87XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlLWluLW91dCwgY29sb3IgMC4zcyBlYXNlLWluLW91dDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZS1pbi1vdXQsIGNvbG9yIDAuM3MgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi50YWdGaW5kZXJCdXR0b25JY29uLXJvdGF0ZXtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcXG59XFxuLnRhZ0ZpbmRlcklucHV0e1xcbiAgZm9udC1mYW1pbHk6ICdIYW5uYScsJ1VidW50dScsc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIHdpZHRoOiAyNDBweDtcXG4gIHBhZGRpbmc6IDBweDtcXG4gIGhlaWdodDogMHB4O1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbiAgb3BhY2l0eTogMDtcXG4gIG1hcmdpbjogMHB4IGF1dG87XFxuICB0cmFuc2l0aW9uOiBoZWlnaHQgMC4zcyBlYXNlLWluLW91dCxvcGFjaXR5IDAuM3MgZWFzZS1pbi1vdXQsIHZpc2liaWxpdHkgMC4zcyBlYXNlLWluLW91dDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogaGVpZ2h0IDAuM3MgZWFzZS1pbi1vdXQsIG9wYWNpdHkgMC4zcyBlYXNlLWluLW91dCwgIHZpc2liaWxpdHkgMC4zcyBlYXNlLWluLW91dDtcXG59XFxuLnRhZ0ZpbmRlcklucHV0LWFjdGl2ZXtcXG4gIGhlaWdodDogNDBweDtcXG4gIHZpc2liaWxpdHk6IHZpc2libGU7XFxuICBvcGFjaXR5OiAxO1xcbiAgXFxufVxcblwiLFwiQG1peGluIGJveFNoYWRvd0JvdHRvbVRoaW5MaWdodGVyKCkge1xcclxcbiAgYm94LXNoYWRvdzogMCAycHggMnB4IC0ycHggcmdiYSgwLDAsMCwuMTUpO1xcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYm94U2hhZG93Qm90dG9tUmlnaHRUaGluTGlnaHRlcigpe1xcclxcbiAgLXdlYmtpdC1ib3gtc2hhZG93OiAxN3B4IDE5cHggMzBweCAtMTZweCByZ2JhKDAsMCwwLDAuNSk7XFxyXFxuICAtbW96LWJveC1zaGFkb3c6IDE3cHggMTlweCAzMHB4IC0xNnB4IHJnYmEoMCwwLDAsMC41KTtcXHJcXG4gIGJveC1zaGFkb3c6IDE3cHggMTlweCAzMHB4IC0xNnB4IHJnYmEoMCwwLDAsMC41KTtcXHJcXG59XFxyXFxuXFxyXFxuXCIsXCJAbWl4aW4gYnV0dG9uLWZpbGwoJGJnLCAkY29sb3I6d2hpdGUpIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGJhY2tncm91bmQ6ICRiZztcXHJcXG4gIGNvbG9yOiAkY29sb3I7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsOCUpO1xcclxcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcclxcbiAgICB9XFxyXFxuICAgICY6YWN0aXZlIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJ1dHRvbi1ib3JkZXIoJGNvbG9yLCRiZzogd2hpdGUpIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGJhY2tncm91bmQ6ICRiZztcXHJcXG4gIGNvbG9yOiAkY29sb3I7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAkY29sb3I7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsOCUpO1xcclxcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcclxcbiAgICB9XFxyXFxuICAgICY6YWN0aXZlIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJ1dHRvbigkYm9yZGVyKXtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGNvbG9yOiAkYm9yZGVyO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlcjtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZS1pbi1vdXQ7XFxyXFxuICAtd2Via2l0LXRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZS1pbi1vdXQ7XFxyXFxuICAmOmhvdmVye1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICB9XFxyXFxuICAmOmJlZm9yZSxcXHJcXG4gICY6YWZ0ZXJ7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHotaW5kZXg6LTE7XFxyXFxuICAgIHdpZHRoOiAwJTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRib3JkZXI7XFxyXFxuICAgIHRyYW5zaXRpb246IHdpZHRoIDAuMnMgZWFzZS1pbi1vdXQ7XFxyXFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogd2lkdGggMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gICAgXFxyXFxuICB9XFxyXFxuICBcXHJcXG4gICY6aG92ZXI6YmVmb3JlLFxcclxcbiAgJjpob3ZlcjphZnRlcntcXHJcXG4gICAgd2lkdGg6IDEwMCU7IC8vdHJhbnNpdGlvbuyXkCDtlbTri7ntlZjripQgZWxlbWVudOunjCDrsJTrgJQg65WMIHJldmVyc2Xrj4Qg65Cc64ukLlxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWFjdGl2ZSgkYmcpe1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZyw4JSk7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6bGlnaHRlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG4gIFxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWJvcmRlci1hY3RpdmUoJGJnKXtcXHJcXG4gIGJhY2tncm91bmQ6ICRiZztcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICRiZztcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6bGlnaHRlbigkYmcsOCUpO1xcclxcbiAgICB9XFxyXFxuICAgICY6YWN0aXZlIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmxpZ2h0ZW4oJGJnLDI1JSk7XFxyXFxuICAgIH0gXFxyXFxuICB9XFxyXFxuICBcXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJ1dHRvbi1hKCRjb2xvcil7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1JyxzYW5zLXNlcmlmO1xcclxcbiAgZm9udC1zaXplOiAyNHB4O1xcclxcbiAgY29sb3I6ICRjb2xvcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgIGF7XFxyXFxuICAgICAgJjpob3ZlcntcXHJcXG4gICAgICAgIGNvbG9yOiBkYXJrZW4oJGNvbG9yLDE1JSk7IFxcclxcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgICBcXHJcXG4gIH1cXHJcXG59XCIsXCIkZGFyay1ibHVlOiByZ2IoNTEsIDU1LCA2OSk7XFxyXFxuJGxpZ2h0LWJsdWU6ICMyOTgwQjk7XFxyXFxuJGRhcmsteWVsbG93OiByZ2IoMjU1LCAxOTEsIDApO1xcclxcbiRsaWdodC1yZWQ6ICNGRjQwNEU7XFxyXFxuJGxpZ2h0LWJyb3duOiAjNEE0MDRBO1xcclxcbiRkYXJrLWdyZWVuOiAjN0E4MjU2O1wiLFwiQGltcG9ydCAnLi9mbGV4LnNjc3MnO1xcclxcbkBtaXhpbiBjZW50ZXJlcigkd2lkdGg6IDUwJSwgJGhlaWdodDogNTAlLCAkaG9yaXpvbnRhbDogdHJ1ZSwgJHZlcnRpY2FsOiB0cnVlKSB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICBAaWYgKCRob3Jpem9udGFsIGFuZCAkdmVydGljYWwpIHtcXHJcXG4gICAgdG9wOiAkaGVpZ2h0O1xcclxcbiAgICBsZWZ0OiAkd2lkdGg7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0kd2lkdGgsIC0kaGVpZ2h0KTtcXHJcXG4gIH0gQGVsc2UgaWYgKCRob3Jpem9udGFsKSB7XFxyXFxuICAgIGxlZnQ6ICR3aWR0aDtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLSR3aWR0aCwgMCk7XFxyXFxuICB9IEBlbHNlIGlmICgkdmVydGljYWwpIHtcXHJcXG4gICAgdG9wOiAkaGVpZ2h0O1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAtJGhlaWdodCk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBtaXhpbiBjZW50ZXJlci13aXRoLXdpdGRoKCRtaW4td2lkdGg6NTAlLCR3aWR0aDogNTAlLCAkaGVpZ2h0OiA1MCUsICRob3Jpem9udGFsOiB0cnVlLCAkdmVydGljYWw6IHRydWUpIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIG1pbi13aWR0aDogJG1pbi13aWR0aDtcXHJcXG4gIEBpZiAoJGhvcml6b250YWwgYW5kICR2ZXJ0aWNhbCkge1xcclxcbiAgICB0b3A6ICRoZWlnaHQ7XFxyXFxuICAgIGxlZnQ6ICR3aWR0aDtcXHJcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLSR3aWR0aCwgLSRoZWlnaHQpO1xcclxcbiAgfSBAZWxzZSBpZiAoJGhvcml6b250YWwpIHtcXHJcXG4gICAgbGVmdDogJHdpZHRoO1xcclxcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtJHdpZHRoLCAwKTtcXHJcXG4gIH0gQGVsc2UgaWYgKCR2ZXJ0aWNhbCkge1xcclxcbiAgICB0b3A6ICRoZWlnaHQ7XFxyXFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDAsIC0kaGVpZ2h0KTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGNlbnRlcmVyRmxleCgkaG9yaXpvbnRhbDp0cnVlLCAkdmVydGljYWw6IHRydWUpe1xcclxcbiAgQGluY2x1ZGUgZmxleGJveDtcXHJcXG4gIEBpZiAoJGhvcml6b250YWwgYW5kICR2ZXJ0aWNhbCkge1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIH0gQGVsc2UgaWYgKCRob3Jpem9udGFsKSB7XFxyXFxuICAgIFxcclxcbiAgfSBAZWxzZSBpZiAoJHZlcnRpY2FsKSB7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICB9XFxyXFxuICBcXHJcXG59XFxyXFxuXFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKHRydWUpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudGFnTGlzdElubmVyQ29udGFpbmVyIHtcXG4gIG1hcmdpbjogMTBweCBhdXRvO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDsgfVxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAgIC50YWdMaXN0SW5uZXJDb250YWluZXIge1xcbiAgICAgIHdpZHRoOiA3MCU7IH0gfVxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTk5cHgpIHtcXG4gICAgLnRhZ0xpc3RJbm5lckNvbnRhaW5lciB7XFxuICAgICAgd2lkdGg6IDk1JTsgfSB9XFxuXFxuLnRhZywgLm5vcm1hbFRhZywgLmFjdGl2ZVRhZyB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgbWFyZ2luOiAwLjNlbTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtZmFtaWx5OiBcXFwiSmVqdSBHb3RoaWNcXFwiLCBcXFwiVWJ1bnR1XFxcIiwgc2Fucy1zZXJpZjsgfVxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KSB7XFxuICAgIC50YWcsIC5ub3JtYWxUYWcsIC5hY3RpdmVUYWcge1xcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcXG4gICAgICB3aWR0aDogMTAlOyB9IH1cXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5OXB4KSB7XFxuICAgIC50YWcsIC5ub3JtYWxUYWcsIC5hY3RpdmVUYWcge1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgICB3aWR0aDogMjAlOyB9IH1cXG5cXG4ubm9ybWFsVGFnIHtcXG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGNvbG9yOiAjMjk4MEI5O1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzI5ODBCOTtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogd2lkdGggLjNzIGVhc2UtaW4tb3V0O1xcbiAgdHJhbnNpdGlvbjogd2lkdGggLjNzIGVhc2UtaW4tb3V0OyB9XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLm5vcm1hbFRhZzpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogI2ViZWJlYjtcXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcbiAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTsgfVxcbiAgICAubm9ybWFsVGFnOmFjdGl2ZSB7XFxuICAgICAgYmFja2dyb3VuZDogI2JmYmZiZjsgfSB9XFxuXFxuLmFjdGl2ZVRhZyB7XFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgYmFja2dyb3VuZDogIzI5ODBCOTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICMyOTgwQjk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBjb2xvcjogI2ZmYmYwMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogd2lkdGggLjNzIGVhc2UtaW4tb3V0O1xcbiAgdHJhbnNpdGlvbjogd2lkdGggLjNzIGVhc2UtaW4tb3V0OyB9XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLmFjdGl2ZVRhZzpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogIzM4OTZkMzsgfVxcbiAgICAuYWN0aXZlVGFnOmFjdGl2ZSB7XFxuICAgICAgYmFja2dyb3VuZDogIzdmYmJlMzsgfSB9XFxuXFxuLmFkZFRhZyB7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgbWFyZ2luOiAwLjNlbTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIGZvbnQtZmFtaWx5OiBcXFwiSmVqdSBHb3RoaWNcXFwiLCBcXFwiVWJ1bnR1XFxcIiwgc2Fucy1zZXJpZjtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGJhY2tncm91bmQ6ICNGRjQwNEU7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLmFkZFRhZyB7XFxuICAgICAgZm9udC1zaXplOiAxOHB4OyB9IH1cXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5OXB4KSB7XFxuICAgIC5hZGRUYWcge1xcbiAgICAgIGZvbnQtc2l6ZTogMTRweDsgfSB9XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLmFkZFRhZzpob3ZlciB7XFxuICAgICAgYmFja2dyb3VuZDogI2ZmMTcyODtcXG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcbiAgICAgIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTsgfVxcbiAgICAuYWRkVGFnOmFjdGl2ZSB7XFxuICAgICAgYmFja2dyb3VuZDogI2MwMDAwZTsgfSB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS9UYWdMaXN0LnNjc3NcIixcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvdXRpbC9idXR0b24uc2Nzc1wiLFwiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS91dGlsL2NvbG9yLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBRUE7RUFPRSxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLHNCQUFzQixFQUFBO0VBUnRCO0lBREY7TUFFSSxVQUFVLEVBQUEsRUFRYjtFQU5DO0lBSkY7TUFLSSxVQUFVLEVBQUEsRUFLYjs7QUFDRDtFQUNFLGFBQWE7RUFDYixhQUFhO0VBQ2IscUJBQXFCO0VBU3JCLGdEQUFnRCxFQUFBO0VBUmhEO0lBSkY7TUFLSSxlQUFlO01BQ2YsVUFBVSxFQUFBLEVBU2I7RUFQQztJQVJGO01BU0ksZUFBZTtNQUNmLFVBQVUsRUFBQSxFQUtiOztBQUNEO0VBRUUsbUJBQW1CO0VDZG5CLGVBQWU7RUFDZixpQkFGb0M7RUFHcEMsY0NsQmtCO0VEbUJsQix5QkNuQmtCO0VGZ0NsQix5Q0FBeUM7RUFDekMsaUNBQWlDLEVBQUE7RUNiakM7SURRRjtNQ05NLG1CQUF5QjtNQUN6Qix5QkFBeUI7TUFDekIsaUNBQWlDLEVBQUE7SURJdkM7TUNETSxtQkFBMEIsRUFBQSxFQUMzQjs7QURRTDtFQUVFLG1CQUFtQjtFQ3dDbkIsbUJDOUVrQjtFRCtFbEIseUJDL0VrQjtFRGdGbEIsZUFBZTtFRHhDZixjRXZDNEI7RUZ3QzVCLGVBQWU7RUFDZix5Q0FBeUM7RUFDekMsaUNBQWlDLEVBQUE7RUNzQ2pDO0lEN0NGO01DK0NNLG1CQUEwQixFQUFBO0lEL0NoQztNQ2tETSxtQkFBMkIsRUFBQSxFQUM1Qjs7QUQxQ0w7RUFDRSxhQUFhO0VBQ2IsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixnREFBZ0Q7RUNqRGhELGVBQWU7RUFDZixtQkNDaUI7RURBakIsWUFIa0M7RUQwRGxDLG1CQUFtQjtFQUNuQixZQUFZLEVBQUE7RUFSWjtJQUxGO01BTUksZUFBZSxFQUFBLEVBUWxCO0VBTkM7SUFSRjtNQVNJLGVBQWUsRUFBQSxFQUtsQjtFQ3hEQztJRDBDRjtNQ3hDTSxtQkFBeUI7TUFDekIseUJBQXlCO01BQ3pCLGlDQUFpQyxFQUFBO0lEc0N2QztNQ25DTSxtQkFBMEIsRUFBQSxFQUMzQlwiLFwiZmlsZVwiOlwiVGFnTGlzdC5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgJy4vdXRpbC9idXR0b24uc2Nzcyc7XFxyXFxuQGltcG9ydCAnLi91dGlsL2NvbG9yLnNjc3MnO1xcclxcbi50YWdMaXN0SW5uZXJDb250YWluZXJ7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICB3aWR0aDogNzAlO1xcclxcbiAgfVxcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTk5cHgpe1xcclxcbiAgICB3aWR0aDogOTUlO1xcclxcbiAgfVxcclxcbiAgbWFyZ2luOiAxMHB4IGF1dG87XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG4udGFne1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIG1hcmdpbjogMC4zZW07XFxyXFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICBmb250LXNpemU6IDE4cHg7XFxyXFxuICAgIHdpZHRoOiAxMCU7XFxyXFxuICB9XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTlweCl7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gICAgd2lkdGg6IDIwJTtcXHJcXG4gIH1cXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwiSmVqdSBHb3RoaWNcXFwiLCBcXFwiVWJ1bnR1XFxcIiwgc2Fucy1zZXJpZjtcXHJcXG4gIFxcclxcbiAgXFxyXFxufVxcclxcbi5ub3JtYWxUYWd7XFxyXFxuICBAZXh0ZW5kIC50YWc7XFxyXFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcclxcbiAgQGluY2x1ZGUgYnV0dG9uLWJvcmRlcigkbGlnaHQtYmx1ZSk7XFxyXFxuICAtd2Via2l0LXRyYW5zaXRpb246IHdpZHRoIC4zcyBlYXNlLWluLW91dDtcXHJcXG4gIHRyYW5zaXRpb246IHdpZHRoIC4zcyBlYXNlLWluLW91dDtcXHJcXG4gICAgXFxyXFxufVxcclxcbi5hY3RpdmVUYWd7XFxyXFxuICBAZXh0ZW5kIC50YWc7XFxyXFxuICBib3JkZXItcmFkaXVzOiAyMHB4O1xcclxcbiAgQGluY2x1ZGUgYnV0dG9uLWJvcmRlci1hY3RpdmUoJGxpZ2h0LWJsdWUpO1xcclxcbiAgY29sb3I6ICRkYXJrLXllbGxvdztcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogd2lkdGggLjNzIGVhc2UtaW4tb3V0O1xcclxcbiAgdHJhbnNpdGlvbjogd2lkdGggLjNzIGVhc2UtaW4tb3V0O1xcclxcbn1cXHJcXG4uYWRkVGFne1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIG1hcmdpbjogMC4zZW07XFxyXFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICBmb250LWZhbWlseTogXFxcIkplanUgR290aGljXFxcIiwgXFxcIlVidW50dVxcXCIsIHNhbnMtc2VyaWY7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICBmb250LXNpemU6IDE4cHg7XFxyXFxuICB9XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTlweCl7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gIH1cXHJcXG4gIEBpbmNsdWRlIGJ1dHRvbi1maWxsKCRsaWdodC1yZWQpO1xcclxcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXCIsXCJAbWl4aW4gYnV0dG9uLWZpbGwoJGJnLCAkY29sb3I6d2hpdGUpIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGJhY2tncm91bmQ6ICRiZztcXHJcXG4gIGNvbG9yOiAkY29sb3I7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsOCUpO1xcclxcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcclxcbiAgICB9XFxyXFxuICAgICY6YWN0aXZlIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJ1dHRvbi1ib3JkZXIoJGNvbG9yLCRiZzogd2hpdGUpIHtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGJhY2tncm91bmQ6ICRiZztcXHJcXG4gIGNvbG9yOiAkY29sb3I7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAkY29sb3I7XFxyXFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMDAwcHgpe1xcclxcbiAgICAmOmhvdmVyIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsOCUpO1xcclxcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XFxyXFxuICAgICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xcclxcbiAgICB9XFxyXFxuICAgICY6YWN0aXZlIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmRhcmtlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJ1dHRvbigkYm9yZGVyKXtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGNvbG9yOiAkYm9yZGVyO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgJGJvcmRlcjtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZS1pbi1vdXQ7XFxyXFxuICAtd2Via2l0LXRyYW5zaXRpb246IGNvbG9yIDAuMnMgZWFzZS1pbi1vdXQ7XFxyXFxuICAmOmhvdmVye1xcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICB9XFxyXFxuICAmOmJlZm9yZSxcXHJcXG4gICY6YWZ0ZXJ7XFxyXFxuICAgIGNvbnRlbnQ6ICcnO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIHotaW5kZXg6LTE7XFxyXFxuICAgIHdpZHRoOiAwJTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgICB0b3A6IDA7XFxyXFxuICAgIGxlZnQ6IDA7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRib3JkZXI7XFxyXFxuICAgIHRyYW5zaXRpb246IHdpZHRoIDAuMnMgZWFzZS1pbi1vdXQ7XFxyXFxuICAgIC13ZWJraXQtdHJhbnNpdGlvbjogd2lkdGggMC4ycyBlYXNlLWluLW91dDtcXHJcXG4gICAgXFxyXFxuICB9XFxyXFxuICBcXHJcXG4gICY6aG92ZXI6YmVmb3JlLFxcclxcbiAgJjpob3ZlcjphZnRlcntcXHJcXG4gICAgd2lkdGg6IDEwMCU7IC8vdHJhbnNpdGlvbuyXkCDtlbTri7ntlZjripQgZWxlbWVudOunjCDrsJTrgJQg65WMIHJldmVyc2Xrj4Qg65Cc64ukLlxcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWFjdGl2ZSgkYmcpe1xcclxcbiAgYmFja2dyb3VuZDogJGJnO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTAwMHB4KXtcXHJcXG4gICAgJjpob3ZlciB7XFxyXFxuICAgICAgYmFja2dyb3VuZDpsaWdodGVuKCRiZyw4JSk7XFxyXFxuICAgIH1cXHJcXG4gICAgJjphY3RpdmUge1xcclxcbiAgICAgIGJhY2tncm91bmQ6bGlnaHRlbigkYmcsMjUlKTtcXHJcXG4gICAgfSBcXHJcXG4gIH1cXHJcXG4gIFxcclxcbn1cXHJcXG5cXHJcXG5AbWl4aW4gYnV0dG9uLWJvcmRlci1hY3RpdmUoJGJnKXtcXHJcXG4gIGJhY2tncm91bmQ6ICRiZztcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICRiZztcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgICY6aG92ZXIge1xcclxcbiAgICAgIGJhY2tncm91bmQ6bGlnaHRlbigkYmcsOCUpO1xcclxcbiAgICB9XFxyXFxuICAgICY6YWN0aXZlIHtcXHJcXG4gICAgICBiYWNrZ3JvdW5kOmxpZ2h0ZW4oJGJnLDI1JSk7XFxyXFxuICAgIH0gXFxyXFxuICB9XFxyXFxuICBcXHJcXG59XFxyXFxuXFxyXFxuQG1peGluIGJ1dHRvbi1hKCRjb2xvcil7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1JyxzYW5zLXNlcmlmO1xcclxcbiAgZm9udC1zaXplOiAyNHB4O1xcclxcbiAgY29sb3I6ICRjb2xvcjtcXHJcXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEwMDBweCl7XFxyXFxuICAgIGF7XFxyXFxuICAgICAgJjpob3ZlcntcXHJcXG4gICAgICAgIGNvbG9yOiBkYXJrZW4oJGNvbG9yLDE1JSk7IFxcclxcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgICAgIH1cXHJcXG4gICAgfVxcclxcbiAgICBcXHJcXG4gIH1cXHJcXG59XCIsXCIkZGFyay1ibHVlOiByZ2IoNTEsIDU1LCA2OSk7XFxyXFxuJGxpZ2h0LWJsdWU6ICMyOTgwQjk7XFxyXFxuJGRhcmsteWVsbG93OiByZ2IoMjU1LCAxOTEsIDApO1xcclxcbiRsaWdodC1yZWQ6ICNGRjQwNEU7XFxyXFxuJGxpZ2h0LWJyb3duOiAjNEE0MDRBO1xcclxcbiRkYXJrLWdyZWVuOiAjN0E4MjU2O1wiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKSh0cnVlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLnRhZ0NvbnRhaW5lciB7XFxuICBtYXgtaGVpZ2h0OiA1MDBweDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICB0cmFuc2l0aW9uOiBtYXgtaGVpZ2h0IDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IG1heC1oZWlnaHQgMC4zcyBlYXNlLWluLW91dDsgfVxcblxcbi50YWdDb250YWluZXItaW5hY3RpdmUge1xcbiAgbWF4LWhlaWdodDogMHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9tbnQvYy9MVEgvTFRIXzIwMTkvd2hhdHRvZWF0L3NyYy9zdHlsZS9zcmMvc3R5bGUvVGFnUGFnZS5zY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUdBO0VBQ0UsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxjQUFjO0VBQ2QsdUNBQXVDO0VBQ3ZDLCtDQUErQyxFQUFBOztBQUdqRDtFQUNFLGVBQWU7RUFDZixnQkFBZ0IsRUFBQVwiLFwiZmlsZVwiOlwiVGFnUGFnZS5zY3NzXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgJ3V0aWwvY29sb3Iuc2Nzcyc7XFxuQGltcG9ydCAndXRpbC9idXR0b24uc2Nzcyc7XFxuXFxuLnRhZ0NvbnRhaW5lcntcXG4gIG1heC1oZWlnaHQ6IDUwMHB4O1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC4zcyBlYXNlLWluLW91dDtcXG4gIC13ZWJraXQtdHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjNzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udGFnQ29udGFpbmVyLWluYWN0aXZle1xcbiAgbWF4LWhlaWdodDogMHB4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKHRydWUpO1xuLy8gTW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIudG9hc3RDb250YWluZXIge1xcbiAgYmFja2dyb3VuZDogI0ZGNDA0RTtcXG4gIGZvbnQtZmFtaWx5OiAnSGFubmEnLCdVYnVudHUnLHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDIwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICB3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XFxuICB3b3JkLWJyZWFrOiBrZWVwLWFsbDsgfVxcblxcbi50b2FzdENvbnRhaW5lcl9pbmZvIHtcXG4gIGJhY2tncm91bmQ6ICMyOTgwQjk7XFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1JyxzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAyMHB4O1xcbiAgdGV4dC1hbGlnbjogY2VudGVyOyB9XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wiL21udC9jL0xUSC9MVEhfMjAxOS93aGF0dG9lYXQvc3JjL3N0eWxlL3NyYy9zdHlsZS9Ub2FzdC5zY3NzXCIsXCIvbW50L2MvTFRIL0xUSF8yMDE5L3doYXR0b2VhdC9zcmMvc3R5bGUvc3JjL3N0eWxlL3V0aWwvY29sb3Iuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFDQTtFQUNFLG1CQ0NpQjtFREFqQix3Q0FBd0M7RUFDeEMsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixxQkFBcUI7RUFDckIsb0JBQW9CLEVBQUE7O0FBR3RCO0VBQ0UsbUJDVmtCO0VEV2xCLHdDQUF3QztFQUN4QyxlQUFlO0VBQ2Ysa0JBQWtCLEVBQUFcIixcImZpbGVcIjpcIlRvYXN0LnNjc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCAndXRpbC9jb2xvci5zY3NzJztcXG4udG9hc3RDb250YWluZXJ7XFxuICBiYWNrZ3JvdW5kOiAkbGlnaHQtcmVkO1xcbiAgZm9udC1mYW1pbHk6ICdIYW5uYScsJ1VidW50dScsc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcXG4gIHdvcmQtYnJlYWs6IGtlZXAtYWxsO1xcbn1cXG5cXG4udG9hc3RDb250YWluZXJfaW5mb3tcXG4gIGJhY2tncm91bmQ6ICRsaWdodC1ibHVlO1xcbiAgZm9udC1mYW1pbHk6ICdIYW5uYScsJ1VidW50dScsc2Fucy1zZXJpZjtcXG4gIGZvbnQtc2l6ZTogMjBweDtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XCIsXCIkZGFyay1ibHVlOiByZ2IoNTEsIDU1LCA2OSk7XFxyXFxuJGxpZ2h0LWJsdWU6ICMyOTgwQjk7XFxyXFxuJGRhcmsteWVsbG93OiByZ2IoMjU1LCAxOTEsIDApO1xcclxcbiRsaWdodC1yZWQ6ICNGRjQwNEU7XFxyXFxuJGxpZ2h0LWJyb3duOiAjNEE0MDRBO1xcclxcbiRkYXJrLWdyZWVuOiAjN0E4MjU2O1wiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiKShmYWxzZSk7XG4vLyBNb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5BdXRvU3VnZ2VzdF9fY29udGFpbmVyX19fa0JsLWoge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgd2lkdGg6IDI0MHB4O1xcbn1cXG5cXG4uQXV0b1N1Z2dlc3RfX2lucHV0X19fMjYycTh7XFxuICBmb250LWZhbWlseTogJ0hhbm5hJywnVWJ1bnR1Jywgc2Fucy1zZXJpZjtcXG59XFxuXFxuLkF1dG9TdWdnZXN0X19zdWdnZXN0aW9uc0NvbnRhaW5lcl9fX0RkMFdiIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5BdXRvU3VnZ2VzdF9fc3VnZ2VzdGlvbnNDb250YWluZXJPcGVuX19fMzVXZ3Yge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDUxcHg7XFxuICB3aWR0aDogMjQwcHg7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjYWFhO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcXG4gIGZvbnQtZmFtaWx5OiAnSGFubmEnLCdVYnVudHUnLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDMwMDtcXG4gIGZvbnQtc2l6ZTogMTZweDtcXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDRweDtcXG4gIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiA0cHg7XFxuICB6LWluZGV4OiAyO1xcbn1cXG5cXG4uQXV0b1N1Z2dlc3RfX3N1Z2dlc3Rpb25zTGlzdF9fX3BReHEwIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XFxufVxcblxcbi5BdXRvU3VnZ2VzdF9fc3VnZ2VzdGlvbl9fXzNmLXEzIHtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHBhZGRpbmc6IDEwcHggMjBweDtcXG59XFxuXFxuLkF1dG9TdWdnZXN0X19zdWdnZXN0aW9uSGlnaGxpZ2h0ZWRfX18yM0o1dSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBFeHBvcnRzXG5leHBvcnRzLmxvY2FscyA9IHtcblx0XCJjb250YWluZXJcIjogXCJBdXRvU3VnZ2VzdF9fY29udGFpbmVyX19fa0JsLWpcIixcblx0XCJpbnB1dFwiOiBcIkF1dG9TdWdnZXN0X19pbnB1dF9fXzI2MnE4XCIsXG5cdFwic3VnZ2VzdGlvbnNDb250YWluZXJcIjogXCJBdXRvU3VnZ2VzdF9fc3VnZ2VzdGlvbnNDb250YWluZXJfX19EZDBXYlwiLFxuXHRcInN1Z2dlc3Rpb25zQ29udGFpbmVyT3BlblwiOiBcIkF1dG9TdWdnZXN0X19zdWdnZXN0aW9uc0NvbnRhaW5lck9wZW5fX18zNVdndlwiLFxuXHRcInN1Z2dlc3Rpb25zTGlzdFwiOiBcIkF1dG9TdWdnZXN0X19zdWdnZXN0aW9uc0xpc3RfX19wUXhxMFwiLFxuXHRcInN1Z2dlc3Rpb25cIjogXCJBdXRvU3VnZ2VzdF9fc3VnZ2VzdGlvbl9fXzNmLXEzXCIsXG5cdFwic3VnZ2VzdGlvbkhpZ2hsaWdodGVkXCI6IFwiQXV0b1N1Z2dlc3RfX3N1Z2dlc3Rpb25IaWdobGlnaHRlZF9fXzIzSjV1XCJcbn07IiwiLyogRk9PRFMgKi9cclxuXHJcblxyXG5leHBvcnQgY29uc3QgR0VUX0ZPT0RTID0gJ0dFVF9GT09EUyc7XHJcbmV4cG9ydCBjb25zdCBHRVRfRk9PRFNfU1VDQ0VTUyA9ICdHRVRfRk9PRFNfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBHRVRfRk9PRFNfRkFJTFVSRSA9ICdHRVRfRk9PRFNfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgR0VUX1JBTkRPTV9GT09EX0NMRUFSID0gJ0dFVF9SQU5ET01fRk9PRF9DTEVBUic7XHJcbmV4cG9ydCBjb25zdCBHRVRfUkFORE9NX0ZPT0QgPSAnR0VUX1JBTkRPTV9GT09EJztcclxuZXhwb3J0IGNvbnN0IEdFVF9SQU5ET01fRk9PRF9TVUNDRVNTID0gJ0dFVF9SQU5ET01fRk9PRF9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IEdFVF9SQU5ET01fRk9PRF9GQUlMVVJFID0gJ0dFVF9SQU5ET01FX0ZPT0RfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgR0VUX0ZPT0RTX0JZX1NDUk9MTCA9ICdHRVRfRk9PRFNfQllfU0NST0xMJztcclxuZXhwb3J0IGNvbnN0IEdFVF9GT09EU19CWV9TQ1JPTExfU1VDQ0VTUyA9ICdHRVRfRk9PRFNfQllfU0NST0xMX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgR0VUX0ZPT0RTX0JZX1NDUk9MTF9GQUlMVVJFID0gJ0dFVF9GT09EU19CWV9TQ1JPTExfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgR0VUX0ZPT0RfQllfTkFNRSA9ICdHRVRfRk9PRF9CWV9OQU1FJztcclxuZXhwb3J0IGNvbnN0IEdFVF9GT09EX0JZX05BTUVfU1VDQ0VTUyA9ICdHRVRfRk9PRF9CWV9OQU1FX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgR0VUX0ZPT0RfQllfTkFNRV9GQUlMVVJFID0gJ0dFVF9GT09EX0JZX05BTUVfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgR0VUX0ZPT0RTX0JZX1RBR1MgPSAnR0VUX0ZPT0RTX0JZX1RBR1MnO1xyXG5leHBvcnQgY29uc3QgR0VUX0ZPT0RTX0JZX1RBR1NfU1VDQ0VTUyA9ICdHRVRfRk9PRFNfQllfVEFHU19TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IEdFVF9GT09EU19CWV9UQUdTX0ZBSUxVUkUgPSAnR0VUX0ZPT0RTX0JZX1RBR1NfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgR0VUX0ZPT0RTX0JZX1RBRyA9ICdHRVRfRk9PRFNfQllfVEFHJztcclxuZXhwb3J0IGNvbnN0IEdFVF9GT09EU19CWV9UQUdfU1VDQ0VTUyA9ICdHRVRfRk9PRFNfQllfVEFHX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgR0VUX0ZPT0RTX0JZX1RBR19GQUlMVVJFID0gJ0dFVF9GT09EU19CWV9UQUdfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgR0VUX0ZPT0RTX0JZX1NFQVJDSCA9ICdHRVRfRk9PRFNfQllfU0VBUkNIJztcclxuZXhwb3J0IGNvbnN0IEdFVF9GT09EU19CWV9TRUFSQ0hfU1VDQ0VTUyA9ICdHRVRfRk9PRFNfQllfU0VBUkNIX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgR0VUX0ZPT0RTX0JZX1NFQVJDSF9GQUlMVVJFID0gJ0dFVF9GT09EU19CWV9TRUFSQ0hfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgUE9TVF9GT09EUyA9ICdQT1NUX0ZPT0RTJztcclxuZXhwb3J0IGNvbnN0IFBPU1RfRk9PRFNfU1VDQ0VTUyA9ICdQT1NUX0ZPT0RTX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgUE9TVF9GT09EU19GQUlMVVJFID0gJ1BPU1RfRk9PRFNfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgVVBEQVRFX0ZPT0QgPSAnVVBEQVRFX0ZPT0QnO1xyXG5leHBvcnQgY29uc3QgVVBEQVRFX0ZPT0RfU1VDQ0VTUyA9ICdVUERBVEVfRk9PRF9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IFVQREFURV9GT09EX0ZBSUxVUkUgPSAnVVBEQVRFX0ZPT0RfRkFJTFVSRSc7XHJcbi8qIFRBR1MgKi9cclxuZXhwb3J0IGNvbnN0IEdFVF9UQUdTID0gJ0dFVF9UQUdTJztcclxuZXhwb3J0IGNvbnN0IEdFVF9UQUdTX1NVQ0NFU1MgPSAnR0VUX1RBR1NfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBHRVRfVEFHU19GQUlMVVJFID0gJ0dFVF9UQUdTX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEdFVF9SQU5ET01fVEFHUyA9ICdHRVRfUkFORE9NX1RBR1MnO1xyXG5leHBvcnQgY29uc3QgR0VUX1JBTkRPTV9UQUdTX1NVQ0NFU1MgPSAnR0VUX1JBTkRPTV9UQUdTX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgR0VUX1JBTkRPTV9UQUdTX0ZBSUxVUkUgPSAnR0VUX1JBTkRPTV9UQUdTX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEdFVF9TVUdHRVNUX1RBR1MgPSAnR0VUX1NVR0dFU1RfVEFHUyc7XHJcbmV4cG9ydCBjb25zdCBHRVRfU1VHR0VTVF9UQUdTX1NVQ0NFU1MgPSAnR0VUX1NVR0dFU1RfVEFHU19TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IEdFVF9TVUdHRVNUX1RBR1NfRkFJTFVSRSA9ICdHRVRfU1VHR0VTVF9UQUdTX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBPU1RfVEFHUyA9ICdQT1NUX1RBR1MnO1xyXG5leHBvcnQgY29uc3QgUE9TVF9UQUdTX1NVQ0NFU1MgPSAnUE9TVF9UQUdTX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgUE9TVF9UQUdTX0ZBSUxVUkUgPSAnUE9TVF9UQUdTX0ZBSUxVUkUnO1xyXG5cclxuLyogUkFXIEZVTkMgKi9cclxuZXhwb3J0IGNvbnN0IENIQU5HRV9JU19NT0JJTEUgPSAnQ0hBTkdFX0lTX01PQklMRSc7XHJcbmV4cG9ydCBjb25zdCBDSEFOR0VfV0lEVEhfQU5EX0hFSUdIVCA9ICdDSEFOR0VfV0lEVEhfQU5EX0hFSUdIVCc7XHJcbmV4cG9ydCBjb25zdCBJTklUX0VOVklST05NRU5UID0gJ0lOSVRfRU5WSVJPTk1FTlQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFERF9BQ1RJVkVfVEFHID0gJ0FERF9BQ1RJVkVfVEFHJztcclxuZXhwb3J0IGNvbnN0IERFTEVURV9BQ1RJVkVfVEFHID0gJ0RFTEVURV9BQ1RJVkVfVEFHJztcclxuIiwiaW1wb3J0e1xyXG4gIENIQU5HRV9JU19NT0JJTEUsXHJcbiAgQ0hBTkdFX1dJRFRIX0FORF9IRUlHSFQsXHJcbiAgSU5JVF9FTlZJUk9OTUVOVCxcclxufSBmcm9tICcuL0FjdGlvblR5cGVzJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VJc01vYmlsZShpc01vYmlsZSA9IGZhbHNlKXtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogQ0hBTkdFX0lTX01PQklMRSxcclxuICAgIGlzTW9iaWxlLFxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVdpZHRoQW5kSGVpZ2h0KHNjcmVlbldpZHRoLCBzY3JlZW5IZWlnaHQpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogQ0hBTkdFX1dJRFRIX0FORF9IRUlHSFQsXHJcbiAgICBzY3JlZW5XaWR0aCxcclxuICAgIHNjcmVlbkhlaWdodFxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXRFbnZpcm9ubWVudCgpe1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBJTklUX0VOVklST05NRU5ULFxyXG4gIH07XHJcbn0iLCJpbXBvcnQge1xyXG4gIEdFVF9SQU5ET01fRk9PRCxcclxuICBHRVRfUkFORE9NX0ZPT0RfU1VDQ0VTUyxcclxuICBHRVRfUkFORE9NX0ZPT0RfRkFJTFVSRSxcclxuICBHRVRfUkFORE9NX0ZPT0RfQ0xFQVIsXHJcbiAgR0VUX0ZPT0RTLFxyXG4gIEdFVF9GT09EU19TVUNDRVNTLFxyXG4gIEdFVF9GT09EU19GQUlMVVJFLFxyXG4gIEdFVF9GT09EU19CWV9TQ1JPTEwsXHJcbiAgR0VUX0ZPT0RTX0JZX1NDUk9MTF9TVUNDRVNTLFxyXG4gIEdFVF9GT09EU19CWV9TQ1JPTExfRkFJTFVSRSxcclxuICBHRVRfRk9PRF9CWV9OQU1FLFxyXG4gIEdFVF9GT09EX0JZX05BTUVfU1VDQ0VTUyxcclxuICBHRVRfRk9PRF9CWV9OQU1FX0ZBSUxVUkUsXHJcbiAgR0VUX0ZPT0RTX0JZX1RBRyxcclxuICBHRVRfRk9PRFNfQllfVEFHX1NVQ0NFU1MsXHJcbiAgR0VUX0ZPT0RTX0JZX1RBR19GQUlMVVJFLFxyXG4gIEdFVF9GT09EU19CWV9UQUdTLFxyXG4gIEdFVF9GT09EU19CWV9UQUdTX1NVQ0NFU1MsXHJcbiAgR0VUX0ZPT0RTX0JZX1RBR1NfRkFJTFVSRSxcclxuICBHRVRfRk9PRFNfQllfU0VBUkNILFxyXG4gIEdFVF9GT09EU19CWV9TRUFSQ0hfU1VDQ0VTUyxcclxuICBHRVRfRk9PRFNfQllfU0VBUkNIX0ZBSUxVUkUsXHJcbiAgUE9TVF9GT09EUyxcclxuICBQT1NUX0ZPT0RTX1NVQ0NFU1MsXHJcbiAgUE9TVF9GT09EU19GQUlMVVJFLFxyXG4gIFVQREFURV9GT09ELFxyXG4gIFVQREFURV9GT09EX1NVQ0NFU1MsXHJcbiAgVVBEQVRFX0ZPT0RfRkFJTFVSRSxcclxufSBmcm9tICcuL0FjdGlvblR5cGVzJztcclxuLypcclxuZnVuY3Rpb24gYWN0aW9uKHR5cGUsIHBheWxvYWQgPSB7fSkge1xyXG4gIHJldHVybiB7dHlwZSwgLi4ucGF5bG9hZH1cclxufVxyXG4qL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tRm9vZCh0YWdzKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBHRVRfUkFORE9NX0ZPT0QsXHJcbiAgICB0YWdzXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmFuZG9tRm9vZFN1Y2Nlc3MoZGF0YSl7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTpHRVRfUkFORE9NX0ZPT0RfU1VDQ0VTUyxcclxuICAgIC4uLmRhdGFcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbUZvb2RGYWlsdXJlKGVycm9yKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOkdFVF9SQU5ET01fRk9PRF9GQUlMVVJFLFxyXG4gICAgLi4uZXJyb3JcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbUZvb2RDbGVhcigpe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6R0VUX1JBTkRPTV9GT09EX0NMRUFSXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9vZHMoKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBHRVRfRk9PRFMsXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9vZHNTdWNjZXNzKGRhdGEpe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6IEdFVF9GT09EU19TVUNDRVNTLFxyXG4gICAgLi4uZGF0YVxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvb2RzRmFpbHVyZShlcnJvcil7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogR0VUX0ZPT0RTX0ZBSUxVUkUsXHJcbiAgICAuLi5lcnJvclxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvb2RzQnlTY3JvbGwoaXNJbml0aWFsID0gZmFsc2UsIGlkID0gMCl7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogR0VUX0ZPT0RTX0JZX1NDUk9MTCxcclxuICAgIGlzSW5pdGlhbCxcclxuICAgIGlkXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9vZHNCeVNjcm9sbFN1Y2Nlc3MoZGF0YSl7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogR0VUX0ZPT0RTX0JZX1NDUk9MTF9TVUNDRVNTLFxyXG4gICAgLi4uZGF0YVxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvb2RzQnlTY3JvbGxGYWlsdXJlKGVycm9yKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBHRVRfRk9PRFNfQllfU0NST0xMX0ZBSUxVUkUsXHJcbiAgICAuLi5lcnJvclxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvb2RCeU5hbWUobmFtZSl7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogR0VUX0ZPT0RfQllfTkFNRSxcclxuICAgIG5hbWVcclxuICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb29kQnlOYW1lU3VjY2VzcyhkYXRhKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBHRVRfRk9PRF9CWV9OQU1FX1NVQ0NFU1MsXHJcbiAgICAuLi5kYXRhXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9vZEJ5TmFtZUZhaWx1cmUoZXJyb3Ipe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6IEdFVF9GT09EX0JZX05BTUVfRkFJTFVSRSxcclxuICAgIC4uLmVycm9yXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvb2RzQnlUYWcodGFnKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBHRVRfRk9PRFNfQllfVEFHLFxyXG4gICAgdGFnXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9vZHNCeVRhZ1N1Y2Nlc3MoZGF0YSl7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogR0VUX0ZPT0RTX0JZX1RBR19TVUNDRVNTLFxyXG4gICAgLi4uZGF0YVxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvb2RzQnlUYWdGYWlsdXJlKGVycm9yKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBHRVRfRk9PRFNfQllfVEFHX0ZBSUxVUkUsXHJcbiAgICAuLi5lcnJvclxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb29kc0J5VGFncyh0YWdzKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBHRVRfRk9PRFNfQllfVEFHUyxcclxuICAgIHRhZ3NcclxuICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb29kc0J5VGFnc1N1Y2Nlc3MoZGF0YSl7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogR0VUX0ZPT0RTX0JZX1RBR1NfU1VDQ0VTUyxcclxuICAgIC4uLmRhdGFcclxuICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb29kc0J5VGFnc0ZhaWx1cmUoZXJyb3Ipe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6IEdFVF9GT09EU19CWV9UQUdTX0ZBSUxVUkUsXHJcbiAgICAuLi5lcnJvclxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRGb29kc0J5U2VhcmNoKG5hbWUpe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6IEdFVF9GT09EU19CWV9TRUFSQ0gsXHJcbiAgICBuYW1lXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9vZHNCeVNlYXJjaFN1Y2Nlc3MoZGF0YSl7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTpHRVRfRk9PRFNfQllfU0VBUkNIX1NVQ0NFU1MsXHJcbiAgICAuLi5kYXRhXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9vZHNCeVNlYXJjaEZhaWx1cmUoZXJyb3Ipe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6IEdFVF9GT09EU19CWV9TRUFSQ0hfRkFJTFVSRSxcclxuICAgIC4uLmVycm9yXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvc3RGb29kcyhmb29kcyl7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogUE9TVF9GT09EUyxcclxuICAgIGZvb2RzXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcG9zdEZvb2RzU3VjY2VzcyhkYXRhKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBQT1NUX0ZPT0RTX1NVQ0NFU1MsXHJcbiAgICAuLi5kYXRhXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcG9zdEZvb2RzRmFpbHVyZShlcnJvcil7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogUE9TVF9GT09EU19GQUlMVVJFLFxyXG4gICAgLi4uZXJyb3JcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlRm9vZChmb29kKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBVUERBVEVfRk9PRCxcclxuICAgIGZvb2RcclxuICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVGb29kU3VjY2VzcyhkYXRhKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBVUERBVEVfRk9PRF9TVUNDRVNTLFxyXG4gICAgLi4uZGF0YVxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZvb2RGYWlsdXJlKGVycm9yKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBVUERBVEVfRk9PRF9GQUlMVVJFLFxyXG4gICAgLi4uZXJyb3JcclxuICB9O1xyXG59IiwiaW1wb3J0e1xyXG4gIEFERF9BQ1RJVkVfVEFHLFxyXG4gIERFTEVURV9BQ1RJVkVfVEFHLFxyXG4gIEdFVF9UQUdTLFxyXG4gIEdFVF9UQUdTX1NVQ0NFU1MsXHJcbiAgR0VUX1RBR1NfRkFJTFVSRSxcclxuICBHRVRfUkFORE9NX1RBR1MsXHJcbiAgR0VUX1JBTkRPTV9UQUdTX1NVQ0NFU1MsXHJcbiAgR0VUX1JBTkRPTV9UQUdTX0ZBSUxVUkUsXHJcbiAgR0VUX1NVR0dFU1RfVEFHUyxcclxuICBHRVRfU1VHR0VTVF9UQUdTX1NVQ0NFU1MsXHJcbiAgR0VUX1NVR0dFU1RfVEFHU19GQUlMVVJFLFxyXG4gIFBPU1RfVEFHUyxcclxuICBQT1NUX1RBR1NfU1VDQ0VTUyxcclxuICBQT1NUX1RBR1NfRkFJTFVSRVxyXG59IGZyb20gJy4vQWN0aW9uVHlwZXMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZEFjdGl2ZVRhZyh0YWcpIHtcclxuICByZXR1cm4ge1xyXG4gICAgdHlwZTogQUREX0FDVElWRV9UQUcsXHJcbiAgICB0YWdcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlQWN0aXZlVGFnKGluZGV4KSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIHR5cGU6IERFTEVURV9BQ1RJVkVfVEFHLFxyXG4gICAgaW5kZXhcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFncygpe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6IEdFVF9UQUdTXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFnc1N1Y2Nlc3MoZGF0YSl7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogR0VUX1RBR1NfU1VDQ0VTUyxcclxuICAgIC4uLmRhdGFcclxuICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUYWdzRmFpbHVyZShlcnJvcil7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogR0VUX1RBR1NfRkFJTFVSRSxcclxuICAgIC4uLmVycm9yXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbVRhZ3Moc2l6ZSl7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogR0VUX1JBTkRPTV9UQUdTLFxyXG4gICAgc2l6ZVxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbVRhZ3NTdWNjZXNzKGRhdGEpe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6IEdFVF9SQU5ET01fVEFHU19TVUNDRVNTLFxyXG4gICAgLi4uZGF0YVxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbVRhZ3NGYWlsdXJlKGVycm9yKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBHRVRfUkFORE9NX1RBR1NfRkFJTFVSRSxcclxuICAgIC4uLmVycm9yXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFN1Z2dlc3RUYWdzKHdvcmQpe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6IEdFVF9TVUdHRVNUX1RBR1MsXHJcbiAgICB3b3JkXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3VnZ2VzdFRhZ3NTdWNjZXNzKGRhdGEpe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6IEdFVF9TVUdHRVNUX1RBR1NfU1VDQ0VTUyxcclxuICAgIC4uLmRhdGFcclxuICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTdWdnZXN0VGFnc0ZhaWx1cmUoZXJyb3Ipe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6IEdFVF9TVUdHRVNUX1RBR1NfRkFJTFVSRSxcclxuICAgIC4uLmVycm9yXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHBvc3RUYWdzKHRhZ3Mpe1xyXG4gIHJldHVybntcclxuICAgIHR5cGU6IFBPU1RfVEFHUyxcclxuICAgIHRhZ3NcclxuICB9O1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBwb3N0VGFnc1N1Y2Nlc3MoZGF0YSl7XHJcbiAgcmV0dXJue1xyXG4gICAgdHlwZTogUE9TVF9UQUdTX1NVQ0NFU1MsXHJcbiAgICAuLi5kYXRhXHJcbiAgfTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gcG9zdFRhZ3NGYWlsdXJlKGVycm9yKXtcclxuICByZXR1cm57XHJcbiAgICB0eXBlOiBQT1NUX1RBR1NfRkFJTFVSRSxcclxuICAgIC4uLmVycm9yXHJcbiAgfTtcclxufSIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5cbmNvbnN0IHVybCA9ICcvYXBpL2Zvb2QnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9vZHMoKXtcbiAgcmV0dXJuIGF4aW9zLmdldCh1cmwrJy9hbGwnKVxuICAgIC50aGVuKChyZXMpPT57XG4gICAgICByZXR1cm4ge3Jlc307XG4gICAgfSkuY2F0Y2goKGVycik9PntcbiAgICAgIHJldHVybiB7ZXJyfTtcbiAgICB9KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb29kc0J5U2Nyb2xsKGlzSW5pdGlhbCwgaWQpe1xuICB2YXIgc2Nyb2xsVXJsID0gdXJsICsnL3Njcm9sbCc7XG4gIGlmKCFpc0luaXRpYWwpe1xuICAgIHNjcm9sbFVybCArPSBgLyR7aWR9YDtcbiAgfVxuICByZXR1cm4gYXhpb3MuZ2V0KHNjcm9sbFVybClcbiAgICAudGhlbigocmVzKT0+e1xuICAgICAgcmV0dXJuIHtyZXN9O1xuICAgIH0pLmNhdGNoKChlcnIpPT57XG4gICAgICByZXR1cm4ge2Vycn07XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb29kQnlOYW1lKG5hbWUpe1xuICByZXR1cm4gYXhpb3MuZ2V0KHVybCtgL25hbWUvJHtuYW1lfWApXG4gICAgLnRoZW4oKHJlcyk9PntcbiAgICAgIHJldHVybiB7cmVzfTtcbiAgICB9KS5jYXRjaCgoZXJyKT0+e1xuICAgICAgcmV0dXJuIHtlcnJ9O1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9vZHNCeVRhZyh0YWcpe1xuICByZXR1cm4gYXhpb3MuZ2V0KHVybCtgL3RhZy8ke3RhZ31gKVxuICAgIC50aGVuKChyZXMpPT57XG4gICAgICByZXR1cm4ge3Jlc307XG4gICAgfSkuY2F0Y2goKGVycik9PntcbiAgICAgIHJldHVybiB7ZXJyfTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvb2RzQnlUYWdzKHRhZ3Mpe1xuICByZXR1cm4gYXhpb3MucG9zdCh1cmwrJy90YWdzJyx7dGFnc30pXG4gICAgLnRoZW4oKHJlcyk9PntcbiAgICAgIHJldHVybiB7cmVzfTtcbiAgICB9KS5jYXRjaCgoZXJyKT0+e1xuICAgICAgcmV0dXJuIHtlcnJ9O1xuICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9vZHNCeVNlYXJjaChuYW1lKXtcbiAgcmV0dXJuIGF4aW9zLmdldCh1cmwrYC9zZWFyY2gvJHtuYW1lfWApXG4gICAgLnRoZW4oKHJlcyk9PntcbiAgICAgIHJldHVybiB7cmVzfTtcbiAgICB9KS5jYXRjaCgoZXJyKT0+e1xuICAgICAgcmV0dXJuIHtlcnJ9O1xuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBvc3RGb29kcyhmb29kcyl7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCx7Zm9vZHN9KVxuICAgIC50aGVuKChyZXMpPT57XG4gICAgICByZXR1cm4ge3Jlc307XG4gICAgfSkuY2F0Y2goKGVycik9PntcbiAgICAgIHJldHVybiB7ZXJyfTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUZvb2QoZm9vZCl7XG4gIHJldHVybiBheGlvcy5wdXQodXJsLHtmb29kfSlcbiAgICAudGhlbigocmVzKT0+e1xuICAgICAgcmV0dXJuIHtyZXN9O1xuICAgIH0pLmNhdGNoKChlcnIpPT57XG4gICAgICByZXR1cm4ge2Vycn07XG4gICAgfSk7XG59IiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxuY29uc3QgdXJsID0gJy9hcGkvdGFnJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhZ3MoKXtcbiAgcmV0dXJuIGF4aW9zLmdldCh1cmwrJy9hbGwnKVxuICAgIC50aGVuKChyZXMpPT57XG4gICAgICByZXR1cm4ge3Jlc307XG4gICAgfSkuY2F0Y2goKGVycik9PntcbiAgICAgIHJldHVybiB7ZXJyfTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmRvbVRhZ3Moc2l6ZSl7XG4gIHJldHVybiBheGlvcy5nZXQodXJsK2AvcmFuZG9tLyR7c2l6ZX1gKVxuICAgIC50aGVuKChyZXMpPT57XG4gICAgICByZXR1cm4ge3Jlc307XG4gICAgfSkuY2F0Y2goKGVycik9PntcbiAgICAgIHJldHVybiB7ZXJyfTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN1Z2dlc3RUYWdzKHdvcmQpe1xuICByZXR1cm4gYXhpb3MuZ2V0KHVybCtgL3NlYXJjaC8ke3dvcmR9YClcbiAgICAudGhlbigocmVzKT0+e1xuICAgICAgcmV0dXJuIHtyZXN9O1xuICAgIH0pLmNhdGNoKChlcnIpPT57XG4gICAgICByZXR1cm4ge2Vycn07XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3N0VGFncyh0YWdzKXtcbiAgcmV0dXJuIGF4aW9zLnBvc3QodXJsLHt0YWdzfSlcbiAgICAudGhlbigocmVzKT0+e1xuICAgICAgcmV0dXJuIHtyZXN9O1xuICAgIH0pLmNhdGNoKChlcnIpPT57XG4gICAgICByZXR1cm4ge2Vycn07XG4gICAgfSk7XG59IiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzL2JpbmQnO1xuaW1wb3J0IHsgdG9hc3QgfSBmcm9tICdyZWFjdC10b2FzdGlmeSc7XG5cbmltcG9ydCB7IEZhUmVnVGltZXNDaXJjbGUsIEZhQmVlciwgRmFUYWdzIH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuXG5pbXBvcnQgeyBNb2RhbCwgVGFnRmluZGVyIH0gZnJvbSAnLi8nO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4uL3N0eWxlL0Zvb2RBZGQuc2Nzcyc7XG5jb25zdCBjeCA9IGNsYXNzTmFtZXMuYmluZChzdHlsZXMpO1xuXG5jb25zdCByZSA9IC9bXFx7XFx9XFxbXFxdXFwvPy4sOzp8XFwpKn5gIV5cXC1fKzw+QFxcIyQlJlxcXFxcXD1cXChcXCdcXFwiXS9naTtcblxuY29uc3QgY2hlY2tBbmRSZXBsYWNlID0gdmFsdWUgPT4ge1xuICBsZXQgd29yZCA9IHZhbHVlO1xuICBsZXQgaGFzU3BlY2lhbCA9IHJlLnRlc3Qod29yZCk7XG4gIGlmICh3b3JkICYmIGhhc1NwZWNpYWwpIHtcbiAgICB3b3JkID0gd29yZC5yZXBsYWNlKHJlLCAnJyk7XG4gIH1cbiAgcmV0dXJuIHdvcmQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb29kQWRkIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgb3BlbjogZmFsc2UsXG4gICAgICB0YWdzOiBbXSxcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHdvcmRWYWxpZDogdHJ1ZSxcbiAgICB9O1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBuZXh0UHJvcHMgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLnBvc3Quc3RhdHVzICE9PSBuZXh0UHJvcHMucG9zdC5zdGF0dXMpIHtcbiAgICAgIHN3aXRjaCAobmV4dFByb3BzLnBvc3Quc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgJ1NVQ0NFU1MnOlxuICAgICAgICAgIHRvYXN0LmluZm8oJ+ydjOyLnSDrk7HroZ0g7ISx6rO1IScsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3RvYXN0Q29udGFpbmVyX2luZm8nLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgb3BlbjogZmFsc2UsXG4gICAgICAgICAgICB0YWdzOiBbXSxcbiAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRkFJTFVSRSc6XG4gICAgICAgICAgaWYgKHRvYXN0LmNvZGUgPT0gMSkge1xuICAgICAgICAgICAgdG9hc3QuZXJyb3IoJ0RC7JeQ65+sJywge1xuICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0b2FzdENvbnRhaW5lcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9hc3QuZXJyb3IoJ+ydjOyLnSDrk7HroZ0g7Iuk7YyoLi4u7J2066+4IOyeiOuKlCDsnbTrpoQnLCB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3RvYXN0Q29udGFpbmVyJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gZSA9PiB7XG4gICAgbGV0IHZhbHVlID0gY2hlY2tBbmRSZXBsYWNlKGUudGFyZ2V0LnZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlLFxuICAgICAgd29yZFZhbGlkOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuICBoYW5kbGVUb2dnbGVNb2RhbCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIG9wZW46ICF0aGlzLnN0YXRlLm9wZW4sXG4gICAgICB2YWx1ZTogJycsXG4gICAgICB0YWdzOiBbXSxcbiAgICAgIHdvcmRWYWxpZDogdHJ1ZSxcbiAgICB9KTtcbiAgfTtcbiAgaGFuZGxlQWRkVGFnID0gdGFnID0+IHtcbiAgICBjb25zdCB7IHRhZ3MgfSA9IHRoaXMuc3RhdGU7XG4gICAgdmFyIGlzSW4gPSBmYWxzZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0YWdzW2ldID09IHRhZykge1xuICAgICAgICBpc0luID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghaXNJbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRhZ3M6IFsuLi50YWdzLCB0YWddLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvYXN0LmVycm9yKCfsnbTrr7gg7J6I64qUIO2DnOq3uOyeheuLiOuLpC4nLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ3RvYXN0Q29udGFpbmVyJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgaGFuZGxlRGVsZXRlVGFnID0gaW5kZXggPT4ge1xuICAgIGNvbnN0IHsgdGFncyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRhZ3M6IFsuLi50YWdzLnNsaWNlKDAsIGluZGV4KSwgLi4udGFncy5zbGljZShpbmRleCArIDEpXSxcbiAgICB9KTtcbiAgfTtcbiAgaGFuZGxlQWRkRm9vZCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHZhbHVlLCB0YWdzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICghdmFsdWUgfHwgIXZhbHVlLnRyaW0oKSkge1xuICAgICAgdG9hc3QuZXJyb3IoJ+ydjOyLnSDsnbTrpoTsnYQg7J6F66Cl7ZW0IOyjvOyEuOyalCEnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ3RvYXN0Q29udGFpbmVyJyxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHdvcmRWYWxpZDogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0YWdzLmxlbmd0aCkge1xuICAgICAgdG9hc3QuZXJyb3IoJ+yggeyWtOuPhCDtlZwg6rCA7KeAIOydtOyDgeydmCDtg5zqt7jrpbwg6rOo65287KO87IS47JqUIScsIHtcbiAgICAgICAgY2xhc3NOYW1lOiAndG9hc3RDb250YWluZXInLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucHJvcHMucG9zdEZvb2RzKFt7IG5hbWU6IHZhbHVlLnRyaW0oKSwgdGFncyB9XSk7XG4gIH07XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG9wZW4sIHZhbHVlLCB0YWdzLCB3b3JkVmFsaWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3QgeyBpc01vYmlsZSB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KCdmb29kQWRkQnV0dG9uJyl9PlxuICAgICAgICAgIDxhIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG9nZ2xlTW9kYWx9PuydjOyLnSDstpTqsIAhPC9hPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPE1vZGFsXG4gICAgICAgICAgb3Blbj17b3Blbn1cbiAgICAgICAgICBoZWFkZXI9eyfsnYzsi50g7LaU6rCAJ31cbiAgICAgICAgICB3aWR0aD17aXNNb2JpbGUgPyAnOTAlJyA6ICc1MCUnfVxuICAgICAgICAgIGhhbmRsZVRvZ2dsZU1vZGFsPXt0aGlzLmhhbmRsZVRvZ2dsZU1vZGFsfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KCdmb29kQWRkQ29udGFpbmVyJyl9PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgPEZhQmVlciAvPiDsnYzsi53rqoVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICAgICAgICAgICAgJ2Zvb2RBZGRJbnB1dCcsXG4gICAgICAgICAgICAgICAgICAhd29yZFZhbGlkID8gJ2Zvb2RBZGRJbnB1dEVycm9yJyA6IG51bGwsXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAyMCB9fT5cbiAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgPEZhVGFncyAvPiDtg5zqt7gg7LaU6rCAXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPFRhZ0ZpbmRlciBpc0FkZD17dHJ1ZX0gaGFuZGxlQWRkVGFnPXt0aGlzLmhhbmRsZUFkZFRhZ30gLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KCdmb29kQWRkVGFncycpfT5cbiAgICAgICAgICAgICAgICB7dGFncy5tYXAoKHRhZywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aW5kZXh9IGNsYXNzTmFtZT17Y3goJ2Zvb2RBZGRUYWcnKX0+XG4gICAgICAgICAgICAgICAgICAgICAge3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXsoKSA9PiB0aGlzLmhhbmRsZURlbGV0ZVRhZyhpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZhUmVnVGltZXNDaXJjbGUgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goJ2Zvb2RBZGRDb25maXJtJyl9IG9uQ2xpY2s9e3RoaXMuaGFuZGxlQWRkRm9vZH0+XG4gICAgICAgICAgICAgIOy2lOqwgCFcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L01vZGFsPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5Gb29kQWRkLnByb3BUeXBlcyA9IHtcbiAgaXNNb2JpbGU6IFByb3BUeXBlcy5ib29sLFxuICBwb3N0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHBvc3RGb29kczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMvYmluZCc7XG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJ3JlYWN0LXRvYXN0aWZ5JztcblxuaW1wb3J0IHsgRmFSZWdUaW1lc0NpcmNsZSwgRmFCZWVyLCBGYVRhZ3MgfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XG5cbmltcG9ydCB7IFRhZ0ZpbmRlciB9IGZyb20gJy4vJztcblxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZS9Gb29kRWRpdC5zY3NzJztcbmNvbnN0IGN4ID0gY2xhc3NOYW1lcy5iaW5kKHN0eWxlcyk7XG5cbmNvbnN0IHJlID0gL1tcXHtcXH1cXFtcXF1cXC8/Liw7OnxcXCkqfmAhXlxcLV8rPD5AXFwjJCUmXFxcXFxcPVxcKFxcJ1xcXCJdL2dpO1xuXG5jb25zdCBjaGVja0FuZFJlcGxhY2UgPSB2YWx1ZSA9PiB7XG4gIGxldCB3b3JkID0gdmFsdWU7XG4gIGxldCBoYXNTcGVjaWFsID0gcmUudGVzdCh3b3JkKTtcbiAgaWYgKHdvcmQgJiYgaGFzU3BlY2lhbCkge1xuICAgIHdvcmQgPSB3b3JkLnJlcGxhY2UocmUsICcnKTtcbiAgfVxuICByZXR1cm4gd29yZDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvb2RFZGl0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIF9pZDogJycsXG4gICAgICB2YWx1ZTogJycsXG4gICAgICB0YWdzOiBbXSxcbiAgICAgIHdvcmRWYWxpZDogdHJ1ZSxcbiAgICB9O1xuICB9XG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBuZXh0UHJvcHMgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmZvb2QgIT09IG5leHRQcm9wcy5mb29kKSB7XG4gICAgICBjb25zdCB7IF9pZCwgbmFtZSwgdGFncyB9ID0gbmV4dFByb3BzLmZvb2Q7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgX2lkLFxuICAgICAgICB2YWx1ZTogbmFtZSxcbiAgICAgICAgdGFncyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLnVwZGF0ZS5zdGF0dXMgIT09IG5leHRQcm9wcy51cGRhdGUuc3RhdHVzKSB7XG4gICAgICBzd2l0Y2ggKG5leHRQcm9wcy51cGRhdGUuc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgJ1NVQ0NFU1MnOlxuICAgICAgICAgIHRvYXN0LmluZm8oJ+ydjOyLnSDsiJjsoJUg7ISx6rO1IScsIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ3RvYXN0Q29udGFpbmVyX2luZm8nLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuaGFuZGxlVG9nZ2xlTW9kYWwoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRkFJTFVSRSc6XG4gICAgICAgICAgaWYgKHRvYXN0LmNvZGUgPT0gMSkge1xuICAgICAgICAgICAgdG9hc3QuZXJyb3IoJ0RC7JeQ65+sJywge1xuICAgICAgICAgICAgICBjbGFzc05hbWU6ICd0b2FzdENvbnRhaW5lcicsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlVG9nZ2xlTW9kYWwoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9hc3QuZXJyb3IoJ+ydjOyLnSDsiJjsoJUg7Iuk7YyoLi4u7J2066+4IOyeiOuKlCDsnbTrpoQnLCB7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTogJ3RvYXN0Q29udGFpbmVyJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ2hhbmdlID0gZSA9PiB7XG4gICAgbGV0IHZhbHVlID0gY2hlY2tBbmRSZXBsYWNlKGUudGFyZ2V0LnZhbHVlKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlLFxuICAgICAgd29yZFZhbGlkOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuICBoYW5kbGVUb2dnbGVNb2RhbCA9ICgpID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHZhbHVlOiAnJyxcbiAgICAgIHRhZ3M6IFtdLFxuICAgICAgd29yZFZhbGlkOiB0cnVlLFxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMuaGFuZGxlVG9nZ2xlTW9kYWwoKTtcbiAgfTtcbiAgaGFuZGxlQWRkVGFnID0gdGFnID0+IHtcbiAgICBjb25zdCB7IHRhZ3MgfSA9IHRoaXMuc3RhdGU7XG4gICAgdmFyIGlzSW4gPSBmYWxzZTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0YWdzW2ldID09IHRhZykge1xuICAgICAgICBpc0luID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghaXNJbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHRhZ3M6IFsuLi50YWdzLCB0YWddLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRvYXN0LmVycm9yKCfsnbTrr7gg7J6I64qUIO2DnOq3uOyeheuLiOuLpC4nLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ3RvYXN0Q29udGFpbmVyJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgaGFuZGxlRGVsZXRlVGFnID0gaW5kZXggPT4ge1xuICAgIGNvbnN0IHsgdGFncyB9ID0gdGhpcy5zdGF0ZTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHRhZ3M6IFsuLi50YWdzLnNsaWNlKDAsIGluZGV4KSwgLi4udGFncy5zbGljZShpbmRleCArIDEpXSxcbiAgICB9KTtcbiAgfTtcbiAgaGFuZGxlRWRpdEZvb2QgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBfaWQsIHZhbHVlLCB0YWdzIH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmICghdmFsdWUgfHwgIXZhbHVlLnRyaW0oKSkge1xuICAgICAgdG9hc3QuZXJyb3IoJ+ydjOyLnSDsnbTrpoTsnYQg7J6F66Cl7ZW0IOyjvOyEuOyalCEnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ3RvYXN0Q29udGFpbmVyJyxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHdvcmRWYWxpZDogZmFsc2UsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0YWdzLmxlbmd0aCkge1xuICAgICAgdG9hc3QuZXJyb3IoJ+yggeyWtOuPhCDtlZwg6rCA7KeAIOydtOyDgeydmCDtg5zqt7jrpbwg6rOo65287KO87IS47JqUIScsIHtcbiAgICAgICAgY2xhc3NOYW1lOiAndG9hc3RDb250YWluZXInLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGxldCBmb29kID0ge1xuICAgICAgaWQ6IF9pZCxcbiAgICAgIG5hbWU6IHZhbHVlLnRyaW0oKSxcbiAgICAgIHRhZ3MsXG4gICAgfTtcbiAgICB0aGlzLnByb3BzLnVwZGF0ZUZvb2QoZm9vZCk7XG4gIH07XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG9wZW4gfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyB2YWx1ZSwgdGFncywgd29yZFZhbGlkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goJ2Zvb2RFZGl0Q29udGFpbmVyJyl9PlxuICAgICAgICB7b3BlbiA/IChcbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgPEZhU3Bvb24gLz4g7J2M7Iud66qFXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAgICAgICAgICAgICdmb29kRWRpdElucHV0JyxcbiAgICAgICAgICAgICAgICAgICF3b3JkVmFsaWQgPyAnZm9vZEVkaXRJbnB1dEVycm9yJyA6IG51bGwsXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogMjAgfX0+XG4gICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgIDxGYVRhZ3MgLz4g7YOc6re4IOy2lOqwgFxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxUYWdGaW5kZXIgaXNBZGQ9e3RydWV9IGhhbmRsZUFkZFRhZz17dGhpcy5oYW5kbGVBZGRUYWd9IC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgnZm9vZEVkaXRUYWdzJyl9PlxuICAgICAgICAgICAgICAgIHt0YWdzLm1hcCgodGFnLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4ga2V5PXtpbmRleH0gY2xhc3NOYW1lPXtjeCgnZm9vZEVkaXRUYWcnKX0+XG4gICAgICAgICAgICAgICAgICAgICAge3RhZ31cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXsoKSA9PiB0aGlzLmhhbmRsZURlbGV0ZVRhZyhpbmRleCl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZhQ2xvc2UgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ2Zvb2RFZGl0Q29uZmlybScpfVxuICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUVkaXRGb29kfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICDsiJjsoJUhXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5Gb29kRWRpdC5kZWZhdWx0UHJvcHMgPSB7XG4gIG9wZW46IGZhbHNlLFxuICBmb29kOiB7XG4gICAgX2lkOiAnJyxcbiAgICBuYW1lOiAnJyxcbiAgICB0YWdzOiBbXSxcbiAgfSxcbn07XG5Gb29kRWRpdC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGZvb2Q6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgdXBkYXRlOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG5cbiAgaGFuZGxlVG9nZ2xlTW9kYWw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHVwZGF0ZUZvb2Q6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgV2F5cG9pbnQgZnJvbSAncmVhY3Qtd2F5cG9pbnQnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcy9iaW5kJztcbmltcG9ydCB7IHRvYXN0IH0gZnJvbSAncmVhY3QtdG9hc3RpZnknO1xuXG5pbXBvcnQgeyBGYVBlbmNpbEFsdCwgRmFTZWFyY2gsIEZhQmVlciwgRmFUYWdzIH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuXG5pbXBvcnQgeyBNb2RhbCwgRm9vZEVkaXQgfSBmcm9tICcuLyc7XG5pbXBvcnQgc3R5bGVzIGZyb20gJy4uL3N0eWxlL0Zvb2RJbmZvLnNjc3MnO1xuY29uc3QgY3ggPSBjbGFzc05hbWVzLmJpbmQoc3R5bGVzKTtcblxuY29uc3QgcmUgPSAvW1xce1xcfVxcW1xcXVxcLz8uLDs6fFxcKSp+YCFeXFwtXys8PkBcXCMkJSZcXFxcXFw9XFwoXFwnXFxcIl0vZ2k7XG5cbmNvbnN0IGNoZWNrQW5kUmVwbGFjZSA9IHZhbHVlID0+IHtcbiAgbGV0IHdvcmQgPSB2YWx1ZTtcbiAgbGV0IGhhc1NwZWNpYWwgPSByZS50ZXN0KHdvcmQpO1xuICBpZiAod29yZCAmJiBoYXNTcGVjaWFsKSB7XG4gICAgd29yZCA9IHdvcmQucmVwbGFjZShyZSwgJycpO1xuICB9XG4gIHJldHVybiB3b3JkO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9vZEluZm8gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBvcGVuOiBmYWxzZSxcbiAgICAgIHNlYXJjaFdvcmQ6ICcnLFxuICAgICAgaXNTZWFyY2hpbmc6IGZhbHNlLFxuICAgICAgZWRpdE9wZW46IGZhbHNlLFxuICAgICAgZWRpdEZvb2Q6IHt9LFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVDaGFuZ2UgPSBlID0+IHtcbiAgICBsZXQgc2VhcmNoV29yZCA9IGNoZWNrQW5kUmVwbGFjZShlLnRhcmdldC52YWx1ZSk7XG4gICAgbGV0IGlzU2VhcmNoaW5nID0gc2VhcmNoV29yZC5sZW5ndGggPT0gMCA/IGZhbHNlIDogdGhpcy5zdGF0ZS5pc1NlYXJjaGluZztcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNlYXJjaFdvcmQsXG4gICAgICBpc1NlYXJjaGluZyxcbiAgICB9KTtcbiAgfTtcbiAgaGFuZGxlUHJlc3MgPSBlID0+IHtcbiAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgIHRoaXMuaGFuZGxlU2VhcmNoKCk7XG4gICAgfVxuICB9O1xuICBoYW5kbGVTZWFyY2ggPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuc3RhdGUuc2VhcmNoV29yZCAmJiB0aGlzLnN0YXRlLnNlYXJjaFdvcmQudHJpbSgpLmxlbmd0aCA+PSAyKSB7XG4gICAgICB0aGlzLnByb3BzLmdldEZvb2RzQnlTZWFyY2godGhpcy5zdGF0ZS5zZWFyY2hXb3JkLnRyaW0oKSk7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNTZWFyY2hpbmc6IHRydWUsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9hc3QuZXJyb3IoJ+uRkCDquIDsnpAg7J207IOB7J2YIOqygOyDieyWtOqwgCDtlYTsmpTtlanri4jri6QhJywge1xuICAgICAgICBjbGFzc05hbWU6ICd0b2FzdENvbnRhaW5lcicsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIGhhbmRsZVNjcm9sbE1vcmUgPSBzY3JvbGwgPT4ge1xuICAgIGlmIChzY3JvbGwucHJldmlvdXNQb3NpdGlvbiA9PT0gJ2JlbG93JyAmJiAhdGhpcy5wcm9wcy5nZXRCeVNjcm9sbC5pc0xhc3QpIHtcbiAgICAgIHRoaXMucHJvcHMuZ2V0Rm9vZHNCeVNjcm9sbChcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIHRoaXMucHJvcHMuZ2V0QnlTY3JvbGwuZm9vZHNbdGhpcy5wcm9wcy5nZXRCeVNjcm9sbC5mb29kcy5sZW5ndGggLSAxXVxuICAgICAgICAgIC5faWQsXG4gICAgICApO1xuICAgIH1cbiAgfTtcbiAgaGFuZGxlVG9nZ2xlTW9kYWwgPSAoKSA9PiB7XG4gICAgaWYgKCF0aGlzLnN0YXRlLm9wZW4pIHtcbiAgICAgIHRoaXMucHJvcHMuZ2V0Rm9vZHNCeVNjcm9sbCh0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBvcGVuOiAhdGhpcy5zdGF0ZS5vcGVuLFxuICAgICAgc2VhcmNoV29yZDogJycsXG4gICAgICBpc1NlYXJjaGluZzogZmFsc2UsXG4gICAgICBlZGl0T3BlbjogZmFsc2UsXG4gICAgICBlZGl0Rm9vZDoge30sXG4gICAgfSk7XG4gIH07XG4gIGhhbmRsZVRvZ2dsZUVkaXRNb2RhbCA9IChmb29kID0ge30pID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGVkaXRPcGVuOiAhdGhpcy5zdGF0ZS5lZGl0T3BlbixcbiAgICAgIGVkaXRGb29kOiBmb29kLFxuICAgIH0pO1xuICB9O1xuICByZW5kZXJGb29kSW5mb0xpc3QgPSAoZm9vZCwgaW5kZXgpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBrZXk9e2luZGV4fSBjbGFzc05hbWU9e2N4KCdmb29kSW5mb0xpc3QnKX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgnZm9vZEluZm9Gb29kJyl9Pntmb29kLm5hbWV9PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgnZm9vZEluZm9UYWdzJyl9PlxuICAgICAgICAgIHtmb29kLnRhZ3MubWFwKCh0YWcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gPHNwYW4ga2V5PXtpbmRleH0+e3RhZ308L3NwYW4+O1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KCdmb29kSW5mb0VkaXQnKX0+XG4gICAgICAgICAgPEZhUGVuY2lsQWx0IG9uQ2xpY2s9eygpID0+IHRoaXMuaGFuZGxlVG9nZ2xlRWRpdE1vZGFsKGZvb2QpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH07XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IG9wZW4sIGVkaXRPcGVuLCBlZGl0Rm9vZCwgc2VhcmNoV29yZCwgaXNTZWFyY2hpbmcgfSA9IHRoaXMuc3RhdGU7XG4gICAgY29uc3Qge1xuICAgICAgZ2V0QnlTY3JvbGwsXG4gICAgICBnZXRCeVNlYXJjaCxcbiAgICAgIGlzTW9iaWxlLFxuICAgICAgdXBkYXRlLFxuICAgICAgdXBkYXRlRm9vZCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KCdmb29kSW5mb0J1dHRvbicpfT5cbiAgICAgICAgICA8YSBvbkNsaWNrPXt0aGlzLmhhbmRsZVRvZ2dsZU1vZGFsfT7slrTrlqQg7J2M7IudPzwvYT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxNb2RhbFxuICAgICAgICAgIG9wZW49e29wZW59XG4gICAgICAgICAgaGVhZGVyPXsn7J2M7IudIOygleuztCd9XG4gICAgICAgICAgd2lkdGg9e2lzTW9iaWxlID8gJzkwJScgOiAnNTAlJ31cbiAgICAgICAgICBoYW5kbGVUb2dnbGVNb2RhbD17dGhpcy5oYW5kbGVUb2dnbGVNb2RhbH1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goJ2Zvb2RJbmZvU2VhcmNoJyl9PlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KCdmb29kSW5mb1NlYXJjaElucHV0Jyl9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFdvcmR9XG4gICAgICAgICAgICAgICAgYXV0b0ZvY3VzPXt0cnVlfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsn6rKA7IOJ7Ja0IOyeheugpSDtm4Qg7JeU7YSwISd9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgIG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlUHJlc3N9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxGYVNlYXJjaFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goJ2Zvb2RJbmZvU2VhcmNoSWNvbicpfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlU2VhcmNofVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goJ2Zvb2RJbmZvTGlzdCcpfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KCdmb29kSW5mb0Zvb2QnLCAnZm9vZEluZm9IZWFkZXInKX0+XG4gICAgICAgICAgICAgICAgPEZhQmVlciAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2N4KCdmb29kSW5mb1RhZ3MnLCAnZm9vZEluZm9IZWFkZXInKX0+XG4gICAgICAgICAgICAgICAgPEZhVGFncyAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2lzU2VhcmNoaW5nICYmIGdldEJ5U2VhcmNoLmZvb2RzLmxlbmd0aFxuICAgICAgICAgICAgICA/IGdldEJ5U2VhcmNoLmZvb2RzLm1hcCh0aGlzLnJlbmRlckZvb2RJbmZvTGlzdClcbiAgICAgICAgICAgICAgOiAhaXNTZWFyY2hpbmcgJiYgZ2V0QnlTY3JvbGwuZm9vZHMubGVuZ3RoXG4gICAgICAgICAgICAgID8gZ2V0QnlTY3JvbGwuZm9vZHMubWFwKHRoaXMucmVuZGVyRm9vZEluZm9MaXN0KVxuICAgICAgICAgICAgICA6IG51bGx9XG4gICAgICAgICAgICB7aXNTZWFyY2hpbmcgPyBudWxsIDogPFdheXBvaW50IG9uRW50ZXI9e3RoaXMuaGFuZGxlU2Nyb2xsTW9yZX0gLz59XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvTW9kYWw+XG4gICAgICAgIDxNb2RhbFxuICAgICAgICAgIG9wZW49e2VkaXRPcGVufVxuICAgICAgICAgIGhlYWRlcj17J+ydjOyLnSDsiJjsoJUnfVxuICAgICAgICAgIHdpZHRoPXtpc01vYmlsZSA/ICc4MCUnIDogJzQwJSd9XG4gICAgICAgICAgaGVpZ2h0PXsnNjAlJ31cbiAgICAgICAgICBoYW5kbGVUb2dnbGVNb2RhbD17dGhpcy5oYW5kbGVUb2dnbGVFZGl0TW9kYWx9XG4gICAgICAgID5cbiAgICAgICAgICA8Rm9vZEVkaXRcbiAgICAgICAgICAgIG9wZW49e2VkaXRPcGVufVxuICAgICAgICAgICAgZm9vZD17ZWRpdEZvb2R9XG4gICAgICAgICAgICB1cGRhdGU9e3VwZGF0ZX1cbiAgICAgICAgICAgIHVwZGF0ZUZvb2Q9e3VwZGF0ZUZvb2R9XG4gICAgICAgICAgICBoYW5kbGVUb2dnbGVNb2RhbD17dGhpcy5oYW5kbGVUb2dnbGVFZGl0TW9kYWx9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Nb2RhbD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuRm9vZEluZm8ucHJvcFR5cGVzID0ge1xuICBpc01vYmlsZTogUHJvcFR5cGVzLmJvb2wsXG4gIHVwZGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBnZXRCeVNjcm9sbDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBnZXRCeVNlYXJjaDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXG4gIHVwZGF0ZUZvb2Q6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldEZvb2RzQnlTY3JvbGw6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldEZvb2RzQnlTZWFyY2g6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcy9iaW5kJztcclxuXHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vc3R5bGUvSGVhZGVyLnNjc3MnO1xyXG5cclxuY29uc3QgY3ggPSBjbGFzc05hbWVzLmJpbmQoc3R5bGVzKTtcclxuXHJcbmNvbnN0IEhlYWRlciA9ICgpID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9e2N4KCdoZWFkZXJDb250YWluZXInKX0+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgnaGVhZGVySW5uZXJDb250YWluZXInKX0+XHJcbiAgICAgICAgPHNwYW4+66y07JeH7J2EIOuoueydhOq5jD88L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyOyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzL2JpbmQnO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gJy4uL3N0eWxlL01vZGFsLnNjc3MnO1xuXG5jb25zdCBjeCA9IGNsYXNzTmFtZXMuYmluZChzdHlsZXMpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgIH07XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUgPSAocHJldlByb3BzLCBwcmV2U3RhdGUpID0+IHtcbiAgICAvKiBTQ1JPTEwgVE8gVE9QIFdIRU4gTU9EQUwgT1BFTlMgQUdBSU4gKi9cbiAgICBpZiAoIXByZXZQcm9wcy5vcGVuICYmIHRoaXMucHJvcHMub3Blbikge1xuICAgICAgY29uc3QgZWwgPSBSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLmNvbnRlbnQpO1xuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIGVsLnNjcm9sbFRvcCA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBuZXh0UHJvcHMgPT4ge1xuICAgIGlmICghdGhpcy5wcm9wcy5vcGVuICYmIG5leHRQcm9wcy5vcGVuKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgIH0pO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfSwgMTApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy5vcGVuICYmICFuZXh0UHJvcHMub3Blbikge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICB9KTtcbiAgICAgIH0sIDMwMCk7IC8vdHJhbnNpdGlvbiB0aW1lXG4gICAgfVxuICB9O1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBkaXNwbGF5LCBzaG93IH0gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHsgaGFuZGxlVG9nZ2xlTW9kYWwsIGhlYWRlciwgY2hpbGRyZW4sIHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMucHJvcHM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17eyBkaXNwbGF5LCB3aWR0aCwgaGVpZ2h0IH19XG4gICAgICAgIGNsYXNzTmFtZT17Y3goJ21vZGFsQ29udGFpbmVyJywgc2hvdyA/ICdtb2RhbENvbnRhaW5lci1hY3RpdmUnIDogbnVsbCl9XG4gICAgICA+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgnbW9kYWxIZWFkZXInKX0+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxzcGFuPntoZWFkZXJ9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiByZWY9e3JlZiA9PiAodGhpcy5jb250ZW50ID0gcmVmKX0gY2xhc3NOYW1lPXtjeCgnbW9kYWxDb250ZW50Jyl9PlxuICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgnbW9kYWxGb290ZXInKX0+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2N4KCdtb2RhbEFjdGlvbicpfSBvbkNsaWNrPXtoYW5kbGVUb2dnbGVNb2RhbH0+XG4gICAgICAgICAgICDri6vquLBcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG5cbk1vZGFsLmRlZmF1bHRQcm9wcyA9IHtcbiAgd2lkdGg6ICc1MCUnLFxuICBoZWlnaHQ6ICc3MCUnLFxufTtcbk1vZGFsLnByb3BUeXBlcyA9IHtcbiAgd2lkdGg6IFByb3BUeXBlcy5zdHJpbmcsXG4gIGhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgb3BlbjogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgaGVhZGVyOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICBoYW5kbGVUb2dnbGVNb2RhbDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbn07XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcy9iaW5kJztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZS9SZXN1bHQuc2Nzcyc7XHJcblxyXG5jb25zdCBjeCA9IGNsYXNzTmFtZXMuYmluZChzdHlsZXMpO1xyXG5cclxuY2xhc3MgUmVzdWx0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IChuZXh0UHJvcHMpID0+IHtcclxuICAgIGlmKHRoaXMucHJvcHMuYWN0aXZlVGFncyAhPT0gbmV4dFByb3BzLmFjdGl2ZVRhZ3Mpe1xyXG4gICAgICB0aGlzLnByb3BzLmdldFJhbmRvbUZvb2RDbGVhcigpO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICBoYW5kbGVTdGFydCA9ICgpID0+IHtcclxuICAgIHRoaXMucHJvcHMuZ2V0UmFuZG9tRm9vZCh0aGlzLnByb3BzLmFjdGl2ZVRhZ3MpO1xyXG4gIH1cclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7Z2V0UmFuZG9tfSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7c3RhdHVzLCBmb29kLCBpc1JhbmRvbX0gPSBnZXRSYW5kb207XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goJ2NvbnRhaW5lcicpfT5cclxuICAgICAgICA8ZGl2IFxyXG4gICAgICAgICAgY2xhc3NOYW1lPXtjeCgnc3RhcnRCdXR0b24nLHN0YXR1cz09J1dBSVRJTkcnfHxzdGF0dXM9PSdTVUNDRVNTJz8nc3RhcnRCdXR0b24taW4tYWN0aXZlJzpudWxsKX1cclxuICAgICAgICAgIG9uQ2xpY2s9e3N0YXR1cz09J1dBSVRJTkcnfHxzdGF0dXM9PSdTVUNDRVNTJz9udWxsOnRoaXMuaGFuZGxlU3RhcnR9PlxyXG4gICAgICAgICAgPHNwYW4+e3N0YXR1cz09PSdJTklUJz8n6rOo652867O07J6QISc6c3RhdHVzPT0nRkFJTFVSRSc/J+uLpOuluCDtg5zqt7ghJzpzdGF0dXM9PT0nU1VDQ0VTUycmJiFpc1JhbmRvbT8n7J206rGw64ukISc6J+qzoOultOuKlCDspJEuLi4nfTwvc3Bhbj5cclxuICAgICAgICAgIHtzdGF0dXM9PSdXQUlUSU5HJ3x8c3RhdHVzPT0nU1VDQ0VTUyc/XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgncmVzdWx0JywncmVzdWx0LWluLWFjdGl2ZScpfT5cclxuICAgICAgICAgICAgICA8c3Bhbj57Zm9vZC5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDpudWxsXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblJlc3VsdC5kZWZhdWx0UHJvcHMgPSB7XHJcbiAgYWN0aXZlVGFnczogW10sXHJcbn07XHJcblJlc3VsdC5wcm9wVHlwZXMgPSB7XHJcbiAgYWN0aXZlVGFnczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgZ2V0UmFuZG9tOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcblxyXG4gIGdldEJ5VGFnczogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gIGdldFJhbmRvbUZvb2Q6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgZ2V0UmFuZG9tRm9vZENsZWFyOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gIGdldEZvb2RzQnlUYWdzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgUmVzdWx0OyIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMvYmluZCc7XG5pbXBvcnQgQXV0b3N1Z2dlc3QgZnJvbSAncmVhY3QtYXV0b3N1Z2dlc3QnO1xuaW1wb3J0IHsgRmFQbHVzIH0gZnJvbSAncmVhY3QtaWNvbnMvZmEnO1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZS9UYWdGaW5kZXIuc2Nzcyc7XG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vc3R5bGUvQXV0b1N1Z2dlc3QuY3NzJztcblxuaW1wb3J0IHsgZ2V0U3VnZ2VzdFRhZ3MgfSBmcm9tICcuLi9hY3Rpb25zL3RhZyc7XG5cbmNvbnN0IGN4ID0gY2xhc3NOYW1lcy5iaW5kKHN0eWxlcyk7XG5jb25zdCByZSA9IC9bXFx7XFx9XFxbXFxdXFwvPy4sOzp8XFwpKn5gIV5cXC1fKzw+QFxcIyQlJlxcXFxcXD1cXChcXCdcXFwiXS9naTtcblxuY29uc3QgY2hlY2tBbmRSZXBsYWNlID0gdmFsdWUgPT4ge1xuICBsZXQgd29yZCA9IHZhbHVlO1xuICBsZXQgaGFzU3BlY2lhbCA9IHJlLnRlc3Qod29yZCk7XG4gIGlmICh3b3JkICYmIGhhc1NwZWNpYWwpIHtcbiAgICB3b3JkID0gd29yZC5yZXBsYWNlKHJlLCAnJyk7XG4gIH1cbiAgcmV0dXJuIHdvcmQ7XG59O1xuXG5jbGFzcyBUYWdGaW5kZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICB3b3JkOiAnJyxcbiAgICAgIGlzU2VhcmNoOiBmYWxzZSxcbiAgICB9O1xuICB9XG4gIGhhbmRsZUNoYW5nZSA9IChlLCB7IG5ld1ZhbHVlIH0pID0+IHtcbiAgICBsZXQgd29yZCA9IGNoZWNrQW5kUmVwbGFjZShuZXdWYWx1ZSk7XG5cbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHdvcmQsXG4gICAgfSk7XG4gIH07XG4gIGhhbmRsZVNlbGVjdCA9IChlLCB7IHN1Z2dlc3Rpb24gfSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmlzQWRkICYmICd2YWx1ZScgaW4gc3VnZ2VzdGlvbikge1xuICAgICAgdGhpcy5wcm9wcy5oYW5kbGVBZGRUYWcoc3VnZ2VzdGlvbi52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJvcHMuaGFuZGxlQWRkVGFnKHN1Z2dlc3Rpb24ubmFtZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICB3b3JkOiAnJyxcbiAgICB9KTtcbiAgfTtcbiAgaGFuZGxlQnV0dG9uQ2xpY2sgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBpc1NlYXJjaDogIXRoaXMuc3RhdGUuaXNTZWFyY2gsXG4gICAgfSk7XG4gIH07XG4gIGdldFN1Z2dlc3Rpb25WYWx1ZSA9IGl0ZW0gPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmlzQWRkICYmICd2YWx1ZScgaW4gaXRlbSkge1xuICAgICAgcmV0dXJuIGl0ZW0udmFsdWUudHJpbSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaXRlbS5uYW1lLnRyaW0oKTtcbiAgICB9XG4gIH07XG4gIG9uU3VnZ2VzdGlvbnNGZXRjaFJlcXVlc3RlZCA9ICh7IHZhbHVlIH0pID0+IHtcbiAgICBsZXQgd29yZCA9IGNoZWNrQW5kUmVwbGFjZSh2YWx1ZSk7XG4gICAgaWYgKHdvcmQpIHtcbiAgICAgIHRoaXMucHJvcHMuZ2V0U3VnZ2VzdFRhZ3Mod29yZC50cmltKCkpO1xuICAgIH1cbiAgfTtcbiAgb25TdWdnZXN0aW9uc0NsZWFyUmVxdWVzdGVkID0gKCkgPT4ge1xuICAgIHRoaXMucHJvcHMuZ2V0U3VnZ2VzdFRhZ3MoJycpO1xuICB9O1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyB3b3JkLCBpc1NlYXJjaCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGdldFN1Z2dlc3QsIGlzQWRkIH0gPSB0aGlzLnByb3BzO1xuICAgIGxldCBzdWdnZXN0aW9ucyA9XG4gICAgICBnZXRTdWdnZXN0LnRhZ3MubGVuZ3RoID09IDAgJiYgaXNBZGRcbiAgICAgICAgPyBbeyBuYW1lOiB3b3JkICsgJy4uLuydhCjrpbwpIOyDiOuhnOyatCDtg5zqt7jroZwg7LaU6rCAJywgdmFsdWU6IHdvcmQgfV1cbiAgICAgICAgOiBnZXRTdWdnZXN0LnRhZ3M7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgndGFnRmluZGVyQ29udGFpbmVyJyl9PlxuICAgICAgICB7IWlzQWRkID8gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y3goXG4gICAgICAgICAgICAgICd0YWdGaW5kZXJCdXR0b24nLFxuICAgICAgICAgICAgICBpc1NlYXJjaCA/ICd0YWdGaW5kZXJCdXR0b24taW5hY3RpdmUnIDogbnVsbCxcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUJ1dHRvbkNsaWNrfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxGYVBsdXNcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjeChcbiAgICAgICAgICAgICAgICAndGFnRmluZGVyQnV0dG9uSWNvbicsXG4gICAgICAgICAgICAgICAgaXNTZWFyY2ggPyAndGFnRmluZGVyQnV0dG9uSWNvbi1yb3RhdGUnIDogbnVsbCxcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2N4KFxuICAgICAgICAgICAgJ3RhZ0ZpbmRlcklucHV0JyxcbiAgICAgICAgICAgIGlzU2VhcmNoIHx8IGlzQWRkID8gJ3RhZ0ZpbmRlcklucHV0LWFjdGl2ZScgOiBudWxsLFxuICAgICAgICAgICl9XG4gICAgICAgID5cbiAgICAgICAgICA8QXV0b3N1Z2dlc3RcbiAgICAgICAgICAgIHN1Z2dlc3Rpb25zPXtzdWdnZXN0aW9uc31cbiAgICAgICAgICAgIG9uU3VnZ2VzdGlvbnNGZXRjaFJlcXVlc3RlZD17dGhpcy5vblN1Z2dlc3Rpb25zRmV0Y2hSZXF1ZXN0ZWR9XG4gICAgICAgICAgICBvblN1Z2dlc3Rpb25zQ2xlYXJSZXF1ZXN0ZWQ9e3RoaXMub25TdWdnZXN0aW9uc0NsZWFyUmVxdWVzdGVkfVxuICAgICAgICAgICAgb25TdWdnZXN0aW9uU2VsZWN0ZWQ9e3RoaXMuaGFuZGxlU2VsZWN0fVxuICAgICAgICAgICAgZ2V0U3VnZ2VzdGlvblZhbHVlPXt0aGlzLmdldFN1Z2dlc3Rpb25WYWx1ZX1cbiAgICAgICAgICAgIHJlbmRlclN1Z2dlc3Rpb249e2l0ZW0gPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y3goJ3RhZ1N1Z2dlbnN0aW9uJyl9PntpdGVtLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgaW5wdXRQcm9wcz17e1xuICAgICAgICAgICAgICBwbGFjZWhvbGRlcjogJ+2DnOq3uCDqsoDsg4knLFxuICAgICAgICAgICAgICBvbkNoYW5nZTogdGhpcy5oYW5kbGVDaGFuZ2UsXG4gICAgICAgICAgICAgIHZhbHVlOiB3b3JkLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVGFnRmluZGVyLmRlZmF1bHRQcm9wcyA9IHtcbiAgZ2V0U3VnZ2VzdDoge30sXG4gIGlzQWRkOiBmYWxzZSxcbn07XG5cblRhZ0ZpbmRlci5wcm9wVHlwZXMgPSB7XG4gIGdldFN1Z2dlc3Q6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgZ2V0U3VnZ2VzdFRhZ3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGhhbmRsZUFkZFRhZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgaXNBZGQ6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XG4gIHJldHVybiB7XG4gICAgZ2V0U3VnZ2VzdDogc3RhdGUudGFnLmdldFN1Z2dlc3QsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgZ2V0U3VnZ2VzdFRhZ3M6IHdvcmQgPT4ge1xuICAgICAgcmV0dXJuIGRpc3BhdGNoKGdldFN1Z2dlc3RUYWdzKHdvcmQpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFRhZ0ZpbmRlcik7XG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcy9iaW5kJztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZS9UYWdMaXN0LnNjc3MnO1xyXG5cclxuXHJcbmNvbnN0IGN4ID0gY2xhc3NOYW1lcy5iaW5kKHN0eWxlcyk7XHJcbmNsYXNzIFRhZ0xpc3QgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKCl7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuICBoYW5kbGVDbGljayh0YWcsaXNBY3RpdmUsYWN0aXZlSW5kZXgpe1xyXG4gICAgY29uc3Qge2FkZEFjdGl2ZVRhZywgZGVsZXRlQWN0aXZlVGFnfSA9IHRoaXMucHJvcHM7XHJcbiAgICBpZihpc0FjdGl2ZSl7XHJcbiAgICAgIGRlbGV0ZUFjdGl2ZVRhZyhhY3RpdmVJbmRleCk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICBhZGRBY3RpdmVUYWcodGFnKTtcclxuICAgIH1cclxuICAgIFxyXG4gIH1cclxuICByZW5kZXIoKXtcclxuICAgIGNvbnN0IHthY3RpdmVUYWdzLCBzaG93VGFncywgaXNNb2JpbGV9ID0gdGhpcy5wcm9wcztcclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgndGFnTGlzdElubmVyQ29udGFpbmVyJyl9PlxyXG4gICAgICAgIHtzaG93VGFncy5tYXAoKHRhZyxpbmRleCk9PntcclxuICAgICAgICAgIGxldCBpc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgbGV0IGFjdGl2ZUluZGV4ID0gMDtcclxuICAgICAgICAgIGZvcih2YXIgaT0wOyBpPGFjdGl2ZVRhZ3MubGVuZ3RoOyArK2kpe1xyXG4gICAgICAgICAgICBpZihhY3RpdmVUYWdzW2ldID09IHRhZy5uYW1lKXtcclxuICAgICAgICAgICAgICBpc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4oXHJcbiAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2N4KGlzQWN0aXZlPydhY3RpdmVUYWcnOidub3JtYWxUYWcnKX1cclxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKT0+dGhpcy5oYW5kbGVDbGljayh0YWcubmFtZSxpc0FjdGl2ZSxhY3RpdmVJbmRleCl9IFxyXG4gICAgICAgICAgICAgIGtleT17aW5kZXh9Pnt0YWcubmFtZX08L2Rpdj5cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfSl9XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcblRhZ0xpc3QuZGVmYXVsdFByb3BzID0ge1xyXG4gIGlzTW9iaWxlOiBmYWxzZSxcclxuICBhY3RpdmVUYWdzOiBbXSxcclxuICBzaG93VGFnczogW10sXHJcbiAgYWRkQWN0aXZlVGFnOiAoKT0+e2NvbnNvbGUubG9nKCdUYWdMaXN0IHByb3BzIGVycm9yJyk7fSxcclxuICBkZWxldGVBY3RpdmVUYWc6ICgpPT57Y29uc29sZS5sb2coJ1RhZ0xpc3QgcHJvcHMgZXJyb3InKTt9LFxyXG59O1xyXG5UYWdMaXN0LnByb3BUeXBlcyA9IHtcclxuICBpc01vYmlsZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcclxuICBhY3RpdmVUYWdzOiBQcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICBzaG93VGFnczogUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgZ2V0UmFuZG9tOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcblxyXG4gIGFkZEFjdGl2ZVRhZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICBkZWxldGVBY3RpdmVUYWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgZ2V0UmFuZG9tVGFnczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgVGFnTGlzdDsiLCJpbXBvcnQgSGVhZGVyIGZyb20gJy4vSGVhZGVyJztcclxuaW1wb3J0IFRhZ0xpc3QgZnJvbSAnLi9UYWdMaXN0JztcclxuaW1wb3J0IFRhZ0ZpbmRlciBmcm9tICcuL1RhZ0ZpbmRlcic7XHJcbmltcG9ydCBGb29kSW5mbyBmcm9tICcuL0Zvb2RJbmZvJztcclxuaW1wb3J0IEZvb2RBZGQgZnJvbSAnLi9Gb29kQWRkJztcclxuaW1wb3J0IEZvb2RFZGl0IGZyb20gJy4vRm9vZEVkaXQnO1xyXG5pbXBvcnQgUmVzdWx0IGZyb20gJy4vUmVzdWx0JztcclxuaW1wb3J0IE1vZGFsIGZyb20gJy4vTW9kYWwnO1xyXG5cclxuZXhwb3J0IHtIZWFkZXIsIFRhZ0xpc3QsIFRhZ0ZpbmRlciwgRm9vZEluZm8sIEZvb2RBZGQsIEZvb2RFZGl0LCBSZXN1bHQsIE1vZGFsfTsiLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcclxuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcy9iaW5kJztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgVG9hc3RDb250YWluZXIgfSBmcm9tICdyZWFjdC10b2FzdGlmeSc7XHJcblxyXG5pbXBvcnQgeyBIZWFkZXJ9IGZyb20gJy4uL2NvbXBvbmVudCc7XHJcbmltcG9ydCB7IFRhZ1BhZ2UsIFJlc3VsdFBhZ2UgfSBmcm9tICcuLyc7XHJcbmltcG9ydCB7aW5pdEVudmlyb25tZW50fSBmcm9tICcuLi9hY3Rpb25zL2Vudmlyb25tZW50JztcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZS9BcHAuc2Nzcyc7XHJcbmNvbnN0IGN4ID0gY2xhc3NOYW1lcy5iaW5kKHN0eWxlcyk7XHJcblxyXG5jbGFzcyBBcHAgZXh0ZW5kcyBDb21wb25lbnR7XHJcbiAgY29uc3RydWN0b3IoKXtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMucHJvcHMuaW5pdEVudmlyb25tZW50KTtcclxuICB9XHJcbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJyx0aGlzLnByb3BzLmluaXRFbnZpcm9ubWVudCk7XHJcbiAgfVxyXG4gIHJlbmRlcigpe1xyXG4gICAgY29uc3Qge2Vudmlyb25tZW50fSA9IHRoaXMucHJvcHM7XHJcbiAgICBjb25zdCB7c2NyZWVuV2lkdGgsIHNjcmVlbkhlaWdodCwgaXNNb2JpbGV9ID0gZW52aXJvbm1lbnQ7XHJcbiAgICByZXR1cm4oXHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgnbWFpbkNvbnRhaW5lcicpfT5cclxuICAgICAgICA8SGVhZGVyIC8+XHJcbiAgICAgICAgPFRhZ1BhZ2UgXHJcbiAgICAgICAgICBpc01vYmlsZT17aXNNb2JpbGV9Lz5cclxuICAgICAgICA8UmVzdWx0UGFnZVxyXG4gICAgICAgICAgaXNNb2JpbGU9e2lzTW9iaWxlfS8+XHJcbiAgICAgICAgPFRvYXN0Q29udGFpbmVyIFxyXG4gICAgICAgICAgcG9zaXRpb249XCJib3R0b20tY2VudGVyXCJcclxuICAgICAgICAgIHR5cGU9XCJlcnJvclwiXHJcbiAgICAgICAgICBhdXRvQ2xvc2U9ezMwMDB9XHJcbiAgICAgICAgICBoaWRlUHJvZ3Jlc3NCYXI9e2ZhbHNlfVxyXG4gICAgICAgICAgbmV3ZXN0T25Ub3A9e2ZhbHNlfVxyXG4gICAgICAgICAgY2xvc2VPbkNsaWNrXHJcbiAgICAgICAgLz5cclxuICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG4gIH1cclxuICBcclxufVxyXG5BcHAuZGVmYXVsdFByb3BzID0ge1xyXG4gIGVudmlyb25tZW50IDoge30sXHJcbiAgaW5pdEVudmlyb25tZW50IDogKCk9Pntjb25zb2xlLmxvZygnaW5pdCBFbnZpcm9ubWVudCBwcm9wcyBlcnJvci4nKTt9XHJcbn07XHJcbkFwcC5wcm9wVHlwZXMgPSB7XHJcbiAgZW52aXJvbm1lbnQgOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgaW5pdEVudmlyb25tZW50IDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxufTtcclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKSA9PiB7XHJcbiAgcmV0dXJuIHtcclxuICAgIGVudmlyb25tZW50OiBzdGF0ZS5lbnZpcm9ubWVudCxcclxuICB9O1xyXG59O1xyXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcclxuICByZXR1cm4ge1xyXG4gICAgaW5pdEVudmlyb25tZW50IDogKCkgPT4ge1xyXG4gICAgICByZXR1cm4gZGlzcGF0Y2goaW5pdEVudmlyb25tZW50KCkpO1xyXG4gICAgfSxcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoQXBwKTtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzL2JpbmQnO1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHsgRmFBbmdsZURvdWJsZURvd24gfSBmcm9tICdyZWFjdC1pY29ucy9mYSc7XG5pbXBvcnQgeyBSZXN1bHQsIEZvb2RJbmZvLCBGb29kQWRkIH0gZnJvbSAnLi4vY29tcG9uZW50JztcbmltcG9ydCB7XG4gIGdldEZvb2RzLFxuICBnZXRSYW5kb21Gb29kLFxuICBnZXRSYW5kb21Gb29kQ2xlYXIsXG4gIGdldEZvb2RCeU5hbWUsXG4gIGdldEZvb2RzQnlUYWcsXG4gIGdldEZvb2RzQnlUYWdzLFxuICBnZXRGb29kc0J5U2Nyb2xsLFxuICBnZXRGb29kc0J5U2VhcmNoLFxuICBwb3N0Rm9vZHMsXG4gIHVwZGF0ZUZvb2QsXG59IGZyb20gJy4uL2FjdGlvbnMvZm9vZCc7XG5cbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vc3R5bGUvUmVzdWx0UGFnZS5zY3NzJztcbmNvbnN0IGN4ID0gY2xhc3NOYW1lcy5iaW5kKHN0eWxlcyk7XG5cbmNsYXNzIFJlc3VsdFBhZ2UgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgaXNNb2JpbGUsXG4gICAgICBhY3RpdmVUYWdzLFxuICAgICAgZ2V0LFxuICAgICAgdXBkYXRlLFxuICAgICAgcG9zdCxcbiAgICAgIGdldEJ5U2Nyb2xsLFxuICAgICAgZ2V0QnlTZWFyY2gsXG4gICAgICBnZXRSYW5kb20sXG4gICAgICBnZXRSYW5kb21Gb29kLFxuICAgICAgZ2V0UmFuZG9tRm9vZENsZWFyLFxuICAgICAgZ2V0QnlUYWdzLFxuICAgICAgZ2V0Rm9vZHNCeVRhZ3MsXG4gICAgICBnZXRGb29kc0J5U2Nyb2xsLFxuICAgICAgZ2V0Rm9vZHNCeVNlYXJjaCxcbiAgICAgIHBvc3RGb29kcyxcbiAgICAgIHVwZGF0ZUZvb2QsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIHtnZXRSYW5kb20uc3RhdHVzID09ICdTVUNDRVNTJyAmJiAhZ2V0UmFuZG9tLmlzUmFuZG9tID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgncmVzZXRUYWdCdXR0b24nKX0gb25DbGljaz17Z2V0UmFuZG9tRm9vZENsZWFyfT5cbiAgICAgICAgICAgIDxGYUFuZ2xlRG91YmxlRG93biAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPFJlc3VsdFxuICAgICAgICAgIGFjdGl2ZVRhZ3M9e2FjdGl2ZVRhZ3N9XG4gICAgICAgICAgZ2V0QnlUYWdzPXtnZXRCeVRhZ3N9XG4gICAgICAgICAgZ2V0UmFuZG9tPXtnZXRSYW5kb219XG4gICAgICAgICAgZ2V0Rm9vZHNCeVRhZ3M9e2dldEZvb2RzQnlUYWdzfVxuICAgICAgICAgIGdldFJhbmRvbUZvb2Q9e2dldFJhbmRvbUZvb2R9XG4gICAgICAgICAgZ2V0UmFuZG9tRm9vZENsZWFyPXtnZXRSYW5kb21Gb29kQ2xlYXJ9XG4gICAgICAgIC8+XG4gICAgICAgIDxGb29kSW5mb1xuICAgICAgICAgIGlzTW9iaWxlPXtpc01vYmlsZX1cbiAgICAgICAgICB1cGRhdGU9e3VwZGF0ZX1cbiAgICAgICAgICB1cGRhdGVGb29kPXt1cGRhdGVGb29kfVxuICAgICAgICAgIGdldEJ5U2Nyb2xsPXtnZXRCeVNjcm9sbH1cbiAgICAgICAgICBnZXRCeVNlYXJjaD17Z2V0QnlTZWFyY2h9XG4gICAgICAgICAgZ2V0Rm9vZHNCeVNjcm9sbD17Z2V0Rm9vZHNCeVNjcm9sbH1cbiAgICAgICAgICBnZXRGb29kc0J5U2VhcmNoPXtnZXRGb29kc0J5U2VhcmNofVxuICAgICAgICAvPlxuICAgICAgICA8Rm9vZEFkZCBpc01vYmlsZT17aXNNb2JpbGV9IHBvc3Q9e3Bvc3R9IHBvc3RGb29kcz17cG9zdEZvb2RzfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuXG5SZXN1bHRQYWdlLmRlZmF1bHRQcm9wcyA9IHtcbiAgYWN0aXZlVGFnczogW10sXG4gIGlzTW9iaWxlOiBmYWxzZSxcbn07XG5SZXN1bHRQYWdlLnByb3BUeXBlcyA9IHtcbiAgaXNNb2JpbGU6IFByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWQsXG4gIGFjdGl2ZVRhZ3M6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICBwb3N0OiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGdldDogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICBnZXRSYW5kb206IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgZ2V0QnlTY3JvbGw6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgZ2V0QnlTZWFyY2g6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgZ2V0QnlUYWdzOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIHVwZGF0ZTogUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuXG4gIGdldEZvb2RzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBnZXRSYW5kb21Gb29kOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBnZXRSYW5kb21Gb29kQ2xlYXI6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldEZvb2RCeU5hbWU6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldEZvb2RzQnlUYWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGdldEZvb2RzQnlUYWdzOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBnZXRGb29kc0J5U2Nyb2xsOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBnZXRGb29kc0J5U2VhcmNoOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICBwb3N0Rm9vZHM6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIHVwZGF0ZUZvb2Q6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XG4gIHJldHVybiB7XG4gICAgYWN0aXZlVGFnczogc3RhdGUudGFnLmFjdGl2ZVRhZ3MsXG4gICAgcG9zdDogc3RhdGUuZm9vZC5wb3N0LFxuICAgIGdldDogc3RhdGUuZm9vZC5nZXQsXG4gICAgZ2V0UmFuZG9tOiBzdGF0ZS5mb29kLmdldFJhbmRvbSxcbiAgICBnZXRCeVRhZ3M6IHN0YXRlLmZvb2QuZ2V0QnlUYWdzLFxuICAgIGdldEJ5U2Nyb2xsOiBzdGF0ZS5mb29kLmdldEJ5U2Nyb2xsLFxuICAgIGdldEJ5U2VhcmNoOiBzdGF0ZS5mb29kLmdldEJ5U2VhcmNoLFxuICAgIHVwZGF0ZTogc3RhdGUuZm9vZC51cGRhdGUsXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSBkaXNwYXRjaCA9PiB7XG4gIHJldHVybiB7XG4gICAgZ2V0Rm9vZHM6ICgpID0+IHtcbiAgICAgIHJldHVybiBkaXNwYXRjaChnZXRGb29kcygpKTtcbiAgICB9LFxuICAgIGdldFJhbmRvbUZvb2Q6IHRhZ3MgPT4ge1xuICAgICAgcmV0dXJuIGRpc3BhdGNoKGdldFJhbmRvbUZvb2QodGFncykpO1xuICAgIH0sXG4gICAgZ2V0UmFuZG9tRm9vZENsZWFyOiAoKSA9PiB7XG4gICAgICByZXR1cm4gZGlzcGF0Y2goZ2V0UmFuZG9tRm9vZENsZWFyKCkpO1xuICAgIH0sXG4gICAgZ2V0Rm9vZEJ5TmFtZTogbmFtZSA9PiB7XG4gICAgICByZXR1cm4gZGlzcGF0Y2goZ2V0Rm9vZEJ5TmFtZShuYW1lKSk7XG4gICAgfSxcbiAgICBnZXRGb29kc0J5VGFnOiB0YWcgPT4ge1xuICAgICAgcmV0dXJuIGRpc3BhdGNoKGdldEZvb2RzQnlUYWcodGFnKSk7XG4gICAgfSxcbiAgICBnZXRGb29kc0J5VGFnczogdGFncyA9PiB7XG4gICAgICByZXR1cm4gZGlzcGF0Y2goZ2V0Rm9vZHNCeVRhZ3ModGFncykpO1xuICAgIH0sXG4gICAgZ2V0Rm9vZHNCeVNjcm9sbDogKGlzSW5pdGlhbCwgaWQpID0+IHtcbiAgICAgIHJldHVybiBkaXNwYXRjaChnZXRGb29kc0J5U2Nyb2xsKGlzSW5pdGlhbCwgaWQpKTtcbiAgICB9LFxuICAgIGdldEZvb2RzQnlTZWFyY2g6IG5hbWUgPT4ge1xuICAgICAgcmV0dXJuIGRpc3BhdGNoKGdldEZvb2RzQnlTZWFyY2gobmFtZSkpO1xuICAgIH0sXG4gICAgcG9zdEZvb2RzOiBmb29kcyA9PiB7XG4gICAgICByZXR1cm4gZGlzcGF0Y2gocG9zdEZvb2RzKGZvb2RzKSk7XG4gICAgfSxcbiAgICB1cGRhdGVGb29kOiBmb29kID0+IHtcbiAgICAgIHJldHVybiBkaXNwYXRjaCh1cGRhdGVGb29kKGZvb2QpKTtcbiAgICB9LFxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChcbiAgbWFwU3RhdGVUb1Byb3BzLFxuICBtYXBEaXNwYXRjaFRvUHJvcHMsXG4pKFJlc3VsdFBhZ2UpO1xuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcy9iaW5kJztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gJ3JlYWN0LXRvYXN0aWZ5JztcblxuaW1wb3J0IHsgVGFnTGlzdCwgVGFnRmluZGVyIH0gZnJvbSAnLi4vY29tcG9uZW50JztcbmltcG9ydCB7YWRkQWN0aXZlVGFnLCBkZWxldGVBY3RpdmVUYWcsIGdldFRhZ3MsIGdldFJhbmRvbVRhZ3MsIHBvc3RUYWdzIH0gZnJvbSAnLi4vYWN0aW9ucy90YWcnO1xuXG5pbXBvcnQgJ3JlYWN0LXRvYXN0aWZ5L2Rpc3QvUmVhY3RUb2FzdGlmeS5taW4uY3NzJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vc3R5bGUvVGFnUGFnZS5zY3NzJztcbmltcG9ydCB0b2FzdFN0eWxlIGZyb20gJy4uL3N0eWxlL1RvYXN0LnNjc3MnO1xuY29uc3QgY3ggPSBjbGFzc05hbWVzLmJpbmQoc3R5bGVzKTtcblxuY2xhc3MgVGFnUGFnZSBleHRlbmRzIENvbXBvbmVudHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBzaG93VGFnczogW10sXG4gICAgfTtcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCA9ICgpID0+IHtcbiAgICBjb25zdCB7Z2V0UmFuZG9tVGFnc30gPSB0aGlzLnByb3BzO1xuICAgIGdldFJhbmRvbVRhZ3MoMTApO1xuICB9XG4gIFxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzID0gKG5leHRQcm9wcykgPT4ge1xuICAgIGlmKHRoaXMucHJvcHMuZ2V0UmFuZG9tICE9PSBuZXh0UHJvcHMuZ2V0UmFuZG9tKXtcbiAgICAgIGlmKG5leHRQcm9wcy5nZXRSYW5kb20uc3RhdHVzID09PSAnU1VDQ0VTUycpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICBzaG93VGFnczogbmV4dFByb3BzLmdldFJhbmRvbS50YWdzXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFkZFRhZyA9ICh0YWcpID0+IHtcbiAgICBjb25zdCB7c2hvd1RhZ3N9ID0gdGhpcy5zdGF0ZTtcbiAgICB2YXIgaXNJbiA9IGZhbHNlO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzaG93VGFncy5sZW5ndGg7IGkrKyl7XG4gICAgICBpZihzaG93VGFnc1tpXS5uYW1lID09IHRhZyl7XG4gICAgICAgIGlzSW4gPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoIWlzSW4pe1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIHNob3dUYWdzOiBbLi4uc2hvd1RhZ3Mse25hbWU6dGFnfV1cbiAgICAgIH0pO1xuICAgICAgdGhpcy5wcm9wcy5hZGRBY3RpdmVUYWcodGFnKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIHRvYXN0LmVycm9yKCfsnbTrr7gg7J6I64qUIO2DnOq3uOyeheuLiOuLpC4nLHtcbiAgICAgICAgY2xhc3NOYW1lOiAndG9hc3RDb250YWluZXInXG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gIH1cbiAgXG4gIHJlbmRlcigpe1xuICAgIGNvbnN0IHtzaG93VGFnc30gPSB0aGlzLnN0YXRlO1xuICAgIGNvbnN0IHtcbiAgICAgIGFjdGl2ZVRhZ3MsIFxuICAgICAgaXNNb2JpbGUsIFxuICAgICAgZ2V0UmFuZG9tLFxuICAgICAgZ2V0Rm9vZFJhbmRvbSxcbiAgICAgIGFkZEFjdGl2ZVRhZyxcbiAgICAgIGRlbGV0ZUFjdGl2ZVRhZywgXG4gICAgICBnZXRSYW5kb21UYWdzLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybihcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtjeCgndGFnQ29udGFpbmVyJyxnZXRGb29kUmFuZG9tLnN0YXR1cyAhPT0gJ0lOSVQnICYmIGdldEZvb2RSYW5kb20uc3RhdHVzICE9PSAnRkFJTFVSRSc/J3RhZ0NvbnRhaW5lci1pbmFjdGl2ZSc6bnVsbCl9PlxuICAgICAgICA8VGFnRmluZGVyXG4gICAgICAgICAgaGFuZGxlQWRkVGFnPXt0aGlzLmhhbmRsZUFkZFRhZ30vPlxuICAgICAgICA8VGFnTGlzdCBcbiAgICAgICAgICBpc01vYmlsZT17aXNNb2JpbGV9XG4gICAgICAgICAgYWN0aXZlVGFncz17YWN0aXZlVGFnc31cbiAgICAgICAgICBzaG93VGFncz17c2hvd1RhZ3N9XG4gICAgICAgICAgZ2V0UmFuZG9tPXtnZXRSYW5kb219XG4gICAgICAgICAgYWRkQWN0aXZlVGFnPXthZGRBY3RpdmVUYWd9XG4gICAgICAgICAgZGVsZXRlQWN0aXZlVGFnPXtkZWxldGVBY3RpdmVUYWd9XG4gICAgICAgICAgZ2V0UmFuZG9tVGFncz17Z2V0UmFuZG9tVGFnc31cbiAgICAgICAgICBwb3N0VGFncz17cG9zdFRhZ3N9Lz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuVGFnUGFnZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGFjdGl2ZVRhZ3M6IFtdLFxuICBpc01vYmlsZTogZmFsc2UsXG59O1xuVGFnUGFnZS5wcm9wVHlwZXMgPSB7XG4gIGFjdGl2ZVRhZ3M6IFByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICBpc01vYmlsZTogUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgZ2V0UmFuZG9tOiBQcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gIGdldEZvb2RSYW5kb206IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcblxuICBhZGRBY3RpdmVUYWc6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gIGRlbGV0ZUFjdGl2ZVRhZzogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZ2V0VGFnczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgZ2V0UmFuZG9tVGFnczogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgcG9zdFRhZ3M6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhY3RpdmVUYWdzOiBzdGF0ZS50YWcuYWN0aXZlVGFncyxcbiAgICBnZXRSYW5kb206IHN0YXRlLnRhZy5nZXRSYW5kb20sXG4gICAgZ2V0Rm9vZFJhbmRvbTogc3RhdGUuZm9vZC5nZXRSYW5kb20sXG4gIH07XG59O1xuXG5jb25zdCBtYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpID0+IHtcbiAgcmV0dXJuIHtcbiAgICBhZGRBY3RpdmVUYWcgOiAodGFnKSA9PiB7XG4gICAgICByZXR1cm4gZGlzcGF0Y2goYWRkQWN0aXZlVGFnKHRhZykpO1xuICAgIH0sXG4gICAgZGVsZXRlQWN0aXZlVGFnIDogKGluZGV4KSA9PiB7XG4gICAgICByZXR1cm4gZGlzcGF0Y2goZGVsZXRlQWN0aXZlVGFnKGluZGV4KSk7XG4gICAgfSxcbiAgICBnZXRUYWdzIDogKCkgPT4ge1xuICAgICAgcmV0dXJuIGRpc3BhdGNoKGdldFRhZ3MoKSk7XG4gICAgfSxcbiAgICBnZXRSYW5kb21UYWdzIDogKHNpemUpID0+IHtcbiAgICAgIHJldHVybiBkaXNwYXRjaChnZXRSYW5kb21UYWdzKHNpemUpKTtcbiAgICB9LFxuICAgIHBvc3RUYWdzIDogKHRhZ3MpID0+IHtcbiAgICAgIHJldHVybiBkaXNwYXRjaChwb3N0VGFncyh0YWdzKSk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcykoVGFnUGFnZSk7IiwiaW1wb3J0IEFwcCBmcm9tICcuL0FwcCc7XHJcbmltcG9ydCBUYWdQYWdlIGZyb20gJy4vVGFnUGFnZSc7XHJcbmltcG9ydCBSZXN1bHRQYWdlIGZyb20gJy4vUmVzdWx0UGFnZSc7XHJcbmV4cG9ydCB7IEFwcCwgVGFnUGFnZSwgUmVzdWx0UGFnZSB9OyIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBSZWFjdERPTSBmcm9tICdyZWFjdC1kb20nO1xyXG5cclxuaW1wb3J0IHsgQnJvd3NlclJvdXRlciBhcyBSb3V0ZXIsIFJvdXRlIH0gZnJvbSAncmVhY3Qtcm91dGVyLWRvbSc7XHJcblxyXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuXHJcbmltcG9ydCB7IEFwcCB9IGZyb20gJy4vY29udGFpbmVyJztcclxuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJy4vc3RvcmUnO1xyXG5cclxuUmVhY3RET00ucmVuZGVyKFxyXG4gIDxQcm92aWRlciBzdG9yZT17Y29uZmlndXJlU3RvcmUoKX0+XHJcbiAgICA8Um91dGVyPlxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxSb3V0ZSBleGFjdCBwYXRoPVwiL1wiIGNvbXBvbmVudD17QXBwfSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvUm91dGVyPlxyXG4gIDwvUHJvdmlkZXI+LFxyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JyksXHJcbik7XHJcbiIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL2FjdGlvbnMvQWN0aW9uVHlwZXMnO1xyXG5pbXBvcnQgdXBkYXRlIGZyb20gJ3JlYWN0LWFkZG9ucy11cGRhdGUnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gIGlzTW9iaWxlOiB3aW5kb3cuaW5uZXJXaWR0aDwxMDAwP3RydWU6ZmFsc2UsXHJcbiAgc2NyZWVuSGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXHJcbiAgc2NyZWVuV2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlbnZpcm9ubWVudChzdGF0ZSwgYWN0aW9uKXtcclxuICBpZih0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKXtcclxuICAgIHJldHVybiBpbml0aWFsU3RhdGU7XHJcbiAgfVxyXG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcclxuICBjYXNlIHR5cGVzLkNIQU5HRV9JU19NT0JJTEU6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgaXNNb2JpbGU6IHskc2V0OiBhY3Rpb24uaXNNb2JpbGV9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkNIQU5HRV9XSURUSF9BTkRfSEVJR0hUOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIHNjcmVlbkhlaWdodDogeyRzZXQ6IGFjdGlvbi5zY3JlZW5IZWlnaHR9LFxyXG4gICAgICBzY3JlZW5XaWR0aDogeyRzZXQ6IGFjdGlvbi5zY3JlZW5XaWR0aH1cclxuICAgIH0pOyBcclxuICBkZWZhdWx0OlxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufSIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL2FjdGlvbnMvQWN0aW9uVHlwZXMnO1xyXG5pbXBvcnQgdXBkYXRlIGZyb20gJ3JlYWN0LWFkZG9ucy11cGRhdGUnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gIGdldDp7XHJcbiAgICBzdGF0dXM6ICdJTklUJyxcclxuICAgIGZvb2RzOiBbXSxcclxuICAgIGVycm9yOiAnJyxcclxuICAgIGNvZGU6IDEsXHJcbiAgfSxcclxuICBnZXRSYW5kb206e1xyXG4gICAgc3RhdHVzOiAnSU5JVCcsXHJcbiAgICBmb29kOiB7fSxcclxuICAgIGlzUmFuZG9tOiBmYWxzZSxcclxuICB9LFxyXG4gIGdldEJ5U2Nyb2xsOntcclxuICAgIHN0YXR1czogJ0lOSVQnLFxyXG4gICAgZm9vZHM6IFtdLFxyXG4gICAgc2l6ZTogMTUsXHJcbiAgICBpc0xhc3Q6IGZhbHNlXHJcbiAgfSxcclxuICBnZXRCeU5hbWU6e1xyXG4gICAgc3RhdHVzOiAnSU5JVCcsXHJcbiAgICBmb29kOiAnJyxcclxuICAgIGVycm9yOiAnJyxcclxuICAgIGNvZGU6IDEsXHJcbiAgfSxcclxuICBnZXRCeVRhZzp7XHJcbiAgICBzdGF0dXM6ICdJTklUJyxcclxuICAgIGZvb2RzOiBbXSxcclxuICAgIGVycm9yOiAnJyxcclxuICAgIGNvZGU6IDEsXHJcbiAgfSxcclxuICBnZXRCeVRhZ3M6e1xyXG4gICAgc3RhdHVzOiAnSU5JVCcsXHJcbiAgICBmb29kczogW10sXHJcbiAgICBlcnJvcjogJycsXHJcbiAgICBjb2RlOiAxLFxyXG4gIH0sXHJcbiAgZ2V0QnlTZWFyY2g6e1xyXG4gICAgc3RhdHVzOiAnSU5JVCcsXHJcbiAgICBmb29kczogW10sXHJcbiAgICBlcnJvcjogJycsXHJcbiAgICBjb2RlOiAxLFxyXG4gIH0sXHJcbiAgcG9zdDp7XHJcbiAgICBzdGF0dXM6ICdJTklUJyxcclxuICAgIGlzU2F2ZWQ6IGZhbHNlLFxyXG4gICAgZXJyb3I6ICcnLFxyXG4gICAgY29kZTogMSxcclxuICB9LFxyXG4gIHVwZGF0ZTp7XHJcbiAgICBzdGF0dXM6ICdJTklUJyxcclxuICAgIGZvb2Q6IHt9LFxyXG4gICAgZXJyb3I6ICcnLFxyXG4gICAgY29kZTogMSxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9vZChzdGF0ZSxhY3Rpb24pe1xyXG4gIGlmKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcclxuICB9XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gIGNhc2UgdHlwZXMuR0VUX0ZPT0RTOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIGdldDoge1xyXG4gICAgICAgIHN0YXR1czogeyRzZXQ6ICdXQUlUSU5HJ30sXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuR0VUX0ZPT0RTX1NVQ0NFU1M6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgZ2V0OiB7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ1NVQ0NFU1MnfSxcclxuICAgICAgICBmb29kczogeyRzZXQ6IGFjdGlvbi5mb29kc31cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgY2FzZSB0eXBlcy5HRVRfRk9PRFNfRkFJTFVSRTpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXQ6IHtcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnRkFJTFVSRSd9LFxyXG4gICAgICAgIGVycm9yOiB7JHNldDogYWN0aW9uLmVycm9yfSxcclxuICAgICAgICBjb2RlOiB7JHNldDogYWN0aW9uLmNvZGV9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuR0VUX1JBTkRPTV9GT09EOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIGdldFJhbmRvbToge1xyXG4gICAgICAgIHN0YXR1czogeyRzZXQ6ICdXQUlUSU5HJ30sXHJcbiAgICAgICAgZm9vZDogeyRzZXQ6IHt9fSxcclxuICAgICAgICBpc1JhbmRvbTp7JHNldDpmYWxzZX1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgY2FzZSB0eXBlcy5HRVRfUkFORE9NX0ZPT0RfU1VDQ0VTUzpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXRSYW5kb206IHtcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnU1VDQ0VTUyd9LFxyXG4gICAgICAgIGZvb2Q6IHskc2V0OiBhY3Rpb24uZm9vZH0sXHJcbiAgICAgICAgaXNSYW5kb206IHskc2V0OiBhY3Rpb24uaXNSYW5kb219XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuR0VUX1JBTkRPTV9GT09EX0ZBSUxVUkU6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgZ2V0UmFuZG9tOiB7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ0ZBSUxVUkUnfSxcclxuICAgICAgICBlcnJvcjogeyRzZXQ6IGFjdGlvbi5lcnJvcn0sXHJcbiAgICAgICAgY29kZTogeyRzZXQ6IGFjdGlvbi5jb2RlfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9SQU5ET01fRk9PRF9DTEVBUjpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXRSYW5kb206IHtcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnSU5JVCd9LFxyXG4gICAgICAgIGZvb2Q6IHskc2V0OiB7fX0sXHJcbiAgICAgICAgaXNSYW5kb206IHskc2V0OiBmYWxzZX1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgY2FzZSB0eXBlcy5HRVRfRk9PRFNfQllfU0NST0xMOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIGdldEJ5U2Nyb2xsOntcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnV0FJVElORyd9LFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9GT09EU19CWV9TQ1JPTExfU1VDQ0VTUzpcclxuICAgIGlmKGFjdGlvbi5pc0luaXRpYWwpe1xyXG4gICAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgICBnZXRCeVNjcm9sbDp7XHJcbiAgICAgICAgICBzdGF0dXM6IHskc2V0OiAnU1VDQ0VTUyd9LFxyXG4gICAgICAgICAgZm9vZHM6IHskc2V0OiBhY3Rpb24uZm9vZHN9LFxyXG4gICAgICAgICAgaXNMYXN0OiB7JHNldDogYWN0aW9uLmZvb2RzIDwgMTV9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICAgIGdldEJ5U2Nyb2xsOntcclxuICAgICAgICAgIHN0YXR1czogeyRzZXQ6ICdTVUNDRVNTJ30sXHJcbiAgICAgICAgICBmb29kczogeyRwdXNoOiBhY3Rpb24uZm9vZHN9LFxyXG4gICAgICAgICAgaXNMYXN0OiB7JHNldDogYWN0aW9uLmZvb2RzIDwgMTV9XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIFxyXG4gIGNhc2UgdHlwZXMuR0VUX0ZPT0RTX0JZX1NDUk9MTF9GQUlMVVJFOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIGdldEJ5U2Nyb2xsOntcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnRkFJTFVSRSd9LFxyXG4gICAgICAgIGVycm9yOiB7JHNldDogYWN0aW9uLmVycm9yfSxcclxuICAgICAgICBjb2RlOiB7JHNldDogYWN0aW9uLmNvZGV9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuR0VUX0ZPT0RfQllfTkFNRTpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXRCeU5hbWU6IHtcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnV0FJVElORyd9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuR0VUX0ZPT0RfQllfTkFNRV9TVUNDRVNTOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIGdldEJ5TmFtZToge1xyXG4gICAgICAgIHN0YXR1czogeyRzZXQ6ICdTVUNDRVNTJ30sXHJcbiAgICAgICAgZm9vZDogeyRzZXQ6IGFjdGlvbi5mb29kfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9GT09EX0JZX05BTUVfRkFJTFVSRTpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXRCeU5hbWU6IHtcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnRkFJTFVSRSd9LFxyXG4gICAgICAgIGVycm9yOiB7JHNldDogYWN0aW9uLmVycm9yfSxcclxuICAgICAgICBjb2RlOiB7JHNldDogYWN0aW9uLmNvZGV9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuR0VUX0ZPT0RTX0JZX1RBRzpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXRCeVRhZzoge1xyXG4gICAgICAgIHN0YXR1czogeyRzZXQ6ICdXQUlUSU5HJ31cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgY2FzZSB0eXBlcy5HRVRfRk9PRFNfQllfVEFHX1NVQ0NFU1M6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgZ2V0QnlUYWc6IHtcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnU1VDQ0VTUyd9LFxyXG4gICAgICAgIGZvb2RzOiB7JHNldDogYWN0aW9uLmZvb2RzfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9GT09EU19CWV9UQUdfRkFJTFVSRTpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXRCeVRhZzoge1xyXG4gICAgICAgIHN0YXR1czogeyRzZXQ6ICdXQUlUSU5HJ30sXHJcbiAgICAgICAgZXJyb3I6IHskc2V0OiBhY3Rpb24uZXJyb3J9LFxyXG4gICAgICAgIGNvZGU6IHskc2V0OiBhY3Rpb24uY29kZX1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgY2FzZSB0eXBlcy5HRVRfRk9PRFNfQllfVEFHUzpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXRCeVRhZ3M6IHtcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnV0FJVElORyd9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuR0VUX0ZPT0RTX0JZX1RBR1NfU1VDQ0VTUzpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXRCeVRhZ3M6IHtcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnU1VDQ0VTUyd9LFxyXG4gICAgICAgIGZvb2RzOiB7JHNldDogYWN0aW9uLmZvb2RzfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9GT09EU19CWV9UQUdTX0ZBSUxVUkU6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgZ2V0QnlUYWdzOiB7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ0ZBSUxVUkUnfSxcclxuICAgICAgICBlcnJvcjogeyRzZXQ6IGFjdGlvbi5lcnJvcn0sXHJcbiAgICAgICAgY29kZTogeyRzZXQ6IGFjdGlvbi5jb2RlfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9GT09EU19CWV9TRUFSQ0g6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgZ2V0QnlTZWFyY2g6IHtcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnV0FJVElORyd9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuR0VUX0ZPT0RTX0JZX1NFQVJDSF9TVUNDRVNTOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIGdldEJ5U2VhcmNoOiB7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ1NVQ0NFU1MnfSxcclxuICAgICAgICBmb29kczogeyRzZXQ6IGFjdGlvbi5mb29kc31cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgY2FzZSB0eXBlcy5HRVRfRk9PRFNfQllfU0VBUkNIX0ZBSUxVUkU6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgZ2V0QnlTZWFyY2g6IHtcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnRkFJTFVSRSd9LFxyXG4gICAgICAgIGVycm9yOiB7JHNldDogYWN0aW9uLmVycm9yfSxcclxuICAgICAgICBjb2RlOiB7JHNldDogYWN0aW9uLmNvZGV9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuUE9TVF9GT09EUzpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBwb3N0OiB7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ1dBSVRJTkcnfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLlBPU1RfRk9PRFNfU1VDQ0VTUzpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBwb3N0OiB7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ1NVQ0NFU1MnfSxcclxuICAgICAgICBpc1NhdmVkOiB7JHNldDogYWN0aW9uLmlzU2F2ZWR9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuUE9TVF9GT09EU19GQUlMVVJFOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIHBvc3Q6IHtcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnRkFJTFVSRSd9LFxyXG4gICAgICAgIGVycm9yOiB7JHNldDogYWN0aW9uLmVycm9yfSxcclxuICAgICAgICBjb2RlOiB7JHNldDogYWN0aW9uLmNvZGV9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuVVBEQVRFX0ZPT0Q6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgdXBkYXRlOiB7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ1dBSVRJTkcnfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLlVQREFURV9GT09EX1NVQ0NFU1M6XHJcbiAgICB2YXIgaW5kZXggPSAtMTtcclxuICAgIGZvcih2YXIgaSA9IDA7IGk8IHN0YXRlLmdldEJ5U2Nyb2xsLmZvb2RzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgaWYoc3RhdGUuZ2V0QnlTY3JvbGwuZm9vZHNbaV0uX2lkID09PSBhY3Rpb24uZm9vZC5faWQpe1xyXG4gICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdmFyIHNlYXJjaEluZGV4ID0gLTE7XHJcbiAgICBmb3IodmFyIGkgPSAwOyBpPCBzdGF0ZS5nZXRCeVNlYXJjaC5mb29kcy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgIGlmKHN0YXRlLmdldEJ5U2VhcmNoLmZvb2RzW2ldLl9pZCA9PT0gYWN0aW9uLmZvb2QuX2lkKXtcclxuICAgICAgICBzZWFyY2hJbmRleCA9IGk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKGluZGV4ID49IDApe1xyXG4gICAgICBzdGF0ZSA9IHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgICAgZ2V0QnlTY3JvbGw6IHtcclxuICAgICAgICAgIGZvb2RzOntcclxuICAgICAgICAgICAgW2luZGV4XTogeyRzZXQ6IGFjdGlvbi5mb29kfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZihzZWFyY2hJbmRleCA+PTApe1xyXG4gICAgICBzdGF0ZSA9IHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgICAgZ2V0QnlTZWFyY2g6IHtcclxuICAgICAgICAgIGZvb2RzOntcclxuICAgICAgICAgICAgW2luZGV4XTogeyRzZXQ6IGFjdGlvbi5mb29kfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgdXBkYXRlOiB7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ1NVQ0NFU1MnfSxcclxuICAgICAgICBmb29kOiB7JHNldDogYWN0aW9uLmZvb2R9LFxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLlVQREFURV9GT09EX0ZBSUxVUkU6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgdXBkYXRlOiB7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ0ZBSUxVUkUnfSxcclxuICAgICAgICBlcnJvcjogeyRzZXQ6IGFjdGlvbi5lcnJvcn0sXHJcbiAgICAgICAgY29kZTogeyRzZXQ6IGFjdGlvbi5jb2RlfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBkZWZhdWx0OlxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufSIsImltcG9ydCB0YWcgZnJvbSAnLi90YWcnO1xyXG5pbXBvcnQgZm9vZCBmcm9tICcuL2Zvb2QnO1xyXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi9lbnZpcm9ubWVudCc7XHJcblxyXG5pbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XHJcblxyXG5jb25zdCBhcHBSZWR1Y2VycyA9IGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgdGFnLCBmb29kLCBlbnZpcm9ubWVudFxyXG59KTtcclxuLypcclxuY29uc3Qgcm9vdFJlZHVjZXIgPSAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ0FVVEhfU0lHTk9VVCcpIHsgLy9yZWR1Y2Vy6rCAIOydtOqxuCDqsbDsuZjqsowg66eM65Ok7Ja07IScIHNpZ25vdXTtlaAg65WMIHN0YXRl66W8IOuqqOuRkCDsl4bslaDrj4TroZ0g7ZWoLlxyXG4gICAgc3RhdGUgPSB1bmRlZmluZWQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gYXBwUmVkdWNlcnMoc3RhdGUsIGFjdGlvbik7XHJcbn07XHJcbiovXHJcbmV4cG9ydCBkZWZhdWx0IGFwcFJlZHVjZXJzOyIsImltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL2FjdGlvbnMvQWN0aW9uVHlwZXMnO1xyXG5pbXBvcnQgdXBkYXRlIGZyb20gJ3JlYWN0LWFkZG9ucy11cGRhdGUnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gIGFjdGl2ZVRhZ3M6IFtdLFxyXG4gIGdldDp7XHJcbiAgICBzdGF0dXM6ICdJTklUJyxcclxuICAgIHRhZ3M6IFtdLFxyXG4gIH0sXHJcbiAgZ2V0UmFuZG9tOntcclxuICAgIHN0YXR1czogJ0lOSVQnLFxyXG4gICAgdGFnczogW10sXHJcbiAgfSxcclxuICBnZXRTdWdnZXN0OntcclxuICAgIHN0YXR1czogJ0lOSVQnLFxyXG4gICAgdGFnczogW10sXHJcbiAgfSxcclxuICBwb3N0OntcclxuICAgIHN0YXR1czogJ0lOSVQnLFxyXG4gICAgaXNTYXZlZDogZmFsc2UsXHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGFnKHN0YXRlLCBhY3Rpb24pe1xyXG4gIGlmKHR5cGVvZiBzdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgcmV0dXJuIGluaXRpYWxTdGF0ZTtcclxuICB9XHJcbiAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gIGNhc2UgdHlwZXMuQUREX0FDVElWRV9UQUc6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgYWN0aXZlVGFnczogeyRwdXNoOiBbYWN0aW9uLnRhZ119XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkRFTEVURV9BQ1RJVkVfVEFHOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIGFjdGl2ZVRhZ3M6IHskc3BsaWNlOiBbW2FjdGlvbi5pbmRleCwxXV19XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9UQUdTOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIGdldDp7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ1dBSVRJTkcnfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9UQUdTX1NVQ0NFU1M6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgZ2V0OntcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnU1VDQ0VTUyd9LFxyXG4gICAgICAgIHRhZ3M6IHskc2V0OiBhY3Rpb24udGFnc31cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgY2FzZSB0eXBlcy5HRVRfVEFHU19GQUlMVVJFOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIGdldDp7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ0ZBSUxVUkUnfSxcclxuICAgICAgICBlcnJvcjogeyRzZXQ6IGFjdGlvbi5lcnJvcn0sXHJcbiAgICAgICAgY29kZTogeyRzZXQ6IGFjdGlvbi5jb2RlfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9SQU5ET01fVEFHUzpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXRSYW5kb206e1xyXG4gICAgICAgIHN0YXR1czogeyRzZXQ6ICdXQUlUSU5HJ31cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgY2FzZSB0eXBlcy5HRVRfUkFORE9NX1RBR1NfU1VDQ0VTUzpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXRSYW5kb206e1xyXG4gICAgICAgIHN0YXR1czogeyRzZXQ6ICdTVUNDRVNTJ30sXHJcbiAgICAgICAgdGFnczogeyRzZXQ6IGFjdGlvbi50YWdzfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9SQU5ET01fVEFHU19GQUlMVVJFOlxyXG4gICAgcmV0dXJuIHVwZGF0ZShzdGF0ZSx7XHJcbiAgICAgIGdldFJhbmRvbTp7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ0ZBSUxVUkUnfSxcclxuICAgICAgICBlcnJvcjogeyRzZXQ6IGFjdGlvbi5lcnJvcn0sXHJcbiAgICAgICAgY29kZTogeyRzZXQ6IGFjdGlvbi5jb2RlfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9TVUdHRVNUX1RBR1M6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgZ2V0U3VnZ2VzdDp7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ1dBSVRJTkcnfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLkdFVF9TVUdHRVNUX1RBR1NfU1VDQ0VTUzpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBnZXRTdWdnZXN0OntcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnU1VDQ0VTUyd9LFxyXG4gICAgICAgIHRhZ3M6IHskc2V0OiBhY3Rpb24udGFnc31cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgY2FzZSB0eXBlcy5HRVRfU1VHR0VTVF9UQUdTX0ZBSUxVUkU6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgZ2V0U3VnZ2VzdDp7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ0ZBSUxVUkUnfSxcclxuICAgICAgICBlcnJvcjogeyRzZXQ6IGFjdGlvbi5lcnJvcn0sXHJcbiAgICAgICAgY29kZTogeyRzZXQ6IGFjdGlvbi5jb2RlfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBjYXNlIHR5cGVzLlBPU1RfVEFHUzpcclxuICAgIHJldHVybiB1cGRhdGUoc3RhdGUse1xyXG4gICAgICBwb3N0OntcclxuICAgICAgICBzdGF0dXM6IHskc2V0OiAnV0FJVElORyd9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuUE9TVF9UQUdTX1NVQ0NFU1M6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgcG9zdDp7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ1NVQ0NFU1MnfSxcclxuICAgICAgICBpc1NhdmVkOiB7JHNldDogYWN0aW9uLmlzU2F2ZWR9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIGNhc2UgdHlwZXMuUE9TVF9UQUdTX0ZBSUxVUkU6XHJcbiAgICByZXR1cm4gdXBkYXRlKHN0YXRlLHtcclxuICAgICAgcG9zdDp7XHJcbiAgICAgICAgc3RhdHVzOiB7JHNldDogJ0ZBSUxVUkUnfSxcclxuICAgICAgICBlcnJvcjogeyRzZXQ6IGFjdGlvbi5lcnJvcn0sXHJcbiAgICAgICAgY29kZTogeyRzZXQ6IGFjdGlvbi5jb2RlfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICBkZWZhdWx0OlxyXG4gICAgcmV0dXJuIHN0YXRlO1xyXG4gIH1cclxufSIsImltcG9ydCB7IGZvcmssIHRha2UsIHB1dCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9hY3Rpb25zL0FjdGlvblR5cGVzJztcbmltcG9ydCB7IGNoYW5nZVdpZHRoQW5kSGVpZ2h0LCBjaGFuZ2VJc01vYmlsZSB9IGZyb20gJy4uL2FjdGlvbnMvZW52aXJvbm1lbnQnO1xuXG5mdW5jdGlvbiogaGFuZGxlSW5pdEVudmlyb25tZW50KCkge1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIC8vV2FpdCBmb3IgSU5JVF9FTlZJUk9OTUVOVCBBQ1RJT04gIC0gVEFLRVxuICAgIHlpZWxkIHRha2UodHlwZXMuSU5JVF9FTlZJUk9OTUVOVCk7XG5cbiAgICBsZXQgaXNNb2JpbGUgPSBmYWxzZTtcbiAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA4MDApIHtcbiAgICAgIGlzTW9iaWxlID0gdHJ1ZTtcbiAgICB9XG4gICAgLy9EaXNwYXRjaCBBY3Rpb24gLSBQVVRcbiAgICB5aWVsZCBwdXQoY2hhbmdlSXNNb2JpbGUoaXNNb2JpbGUpKTtcbiAgICB5aWVsZCBwdXQoY2hhbmdlV2lkdGhBbmRIZWlnaHQod2luZG93LmlubmVyV2lkdGgsIHdpbmRvdy5pbm5lckhlaWdodCkpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKiByb290U2FnYSgpIHtcbiAgeWllbGQgZm9yayhoYW5kbGVJbml0RW52aXJvbm1lbnQpO1xufVxuIiwiaW1wb3J0IHsgZm9yaywgdGFrZSwgcHV0LCBjYWxsLCBhbGwsIGRlbGF5IH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcbmltcG9ydCAqIGFzIHR5cGVzIGZyb20gJy4uL2FjdGlvbnMvQWN0aW9uVHlwZXMnO1xuaW1wb3J0ICogYXMgYWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zL2Zvb2QnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4uL2FwaS9mb29kJztcbmltcG9ydCB7IHBvc3RUYWdzIH0gZnJvbSAnLi4vYXBpL3RhZyc7XG5cbmNvbnN0IE1BWF9SQU5ET00gPSAxNTtcbmZ1bmN0aW9uKiBoYW5kbGVHZXRGb29kcygpIHtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICB5aWVsZCB0YWtlKHR5cGVzLkdFVF9GT09EUyk7XG4gICAgY29uc3QgeyByZXMsIGVyciB9ID0geWllbGQgY2FsbChhcGkuZ2V0Rm9vZHMpO1xuICAgIGlmIChyZXMgJiYgIWVycikge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMuZ2V0Rm9vZHNTdWNjZXNzKHJlcy5kYXRhKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHlpZWxkIHB1dChhY3Rpb25zLmdldEZvb2RzRmFpbHVyZShlcnIucmVzcG9uc2UuZGF0YSkpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24qIGhhbmRsZUdldEZvb2RCeU5hbWUoKSB7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3QgYWN0aW9uID0geWllbGQgdGFrZSh0eXBlcy5HRVRfRk9PRF9CWV9OQU1FKTtcbiAgICBjb25zdCB7IHJlcywgZXJyIH0gPSB5aWVsZCBjYWxsKGFwaS5nZXRGb29kQnlOYW1lLCBhY3Rpb24ubmFtZSk7XG4gICAgaWYgKHJlcyAmJiAhZXJyKSB7XG4gICAgICB5aWVsZCBwdXQoYWN0aW9ucy5nZXRGb29kQnlOYW1lU3VjY2VzcyhyZXMuZGF0YSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB5aWVsZCBwdXQoYWN0aW9ucy5nZXRGb29kQnlOYW1lRmFpbHVyZShlcnIucmVzcG9uc2UuZGF0YSkpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24qIGhhbmRsZUdldEZvb2RzQnlUYWdzKCkge1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHlpZWxkIHRha2UodHlwZXMuR0VUX0ZPT0RTX0JZX1RBR1MpO1xuICAgIGNvbnN0IHsgcmVzLCBlcnIgfSA9IHlpZWxkIGNhbGwoYXBpLmdldEZvb2RzQnlUYWdzLCBhY3Rpb24udGFncyk7XG4gICAgaWYgKHJlcyAmJiAhZXJyKSB7XG4gICAgICB5aWVsZCBwdXQoYWN0aW9ucy5nZXRGb29kc0J5VGFnc1N1Y2Nlc3MocmVzLmRhdGEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMuZ2V0Rm9vZHNCeVRhZ3NGYWlsdXJlKGVyci5yZXNwb25zZS5kYXRhKSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uKiBoYW5kbGVHZXRGb29kc0J5VGFnKCkge1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHlpZWxkIHRha2UodHlwZXMuR0VUX0ZPT0RTX0JZX1RBRyk7XG4gICAgY29uc3QgeyByZXMsIGVyciB9ID0geWllbGQgY2FsbChhcGkuZ2V0Rm9vZHNCeVRhZywgYWN0aW9uLnRhZyk7XG4gICAgaWYgKHJlcyAmJiAhZXJyKSB7XG4gICAgICB5aWVsZCBwdXQoYWN0aW9ucy5nZXRGb29kc0J5VGFnU3VjY2VzcyhyZXMuZGF0YSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB5aWVsZCBwdXQoYWN0aW9ucy5nZXRGb29kc0J5VGFnRmFpbHVyZShlcnIucmVzcG9uc2UuZGF0YSkpO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24qIGhhbmRsZVBvc3RUYWdzKGZvb2RzKSB7XG4gIHlpZWxkIGZvb2RzLm1hcChmb29kID0+IHtcbiAgICB2YXIgdGFnQXJyID0gZm9vZC50YWdzLm1hcCh0YWcgPT4ge1xuICAgICAgcmV0dXJuIHsgbmFtZTogdGFnLnRyaW0oKSB9O1xuICAgIH0pO1xuICAgIHJldHVybiBjYWxsKHBvc3RUYWdzLCB0YWdBcnIpO1xuICB9KTtcbn1cbmZ1bmN0aW9uKiBoYW5kbGVQb3N0Rm9vZHMoKSB7XG4gIHdoaWxlICh0cnVlKSB7XG4gICAgY29uc3QgYWN0aW9uID0geWllbGQgdGFrZSh0eXBlcy5QT1NUX0ZPT0RTKTtcblxuICAgIGNvbnN0IHsgcmVzLCBlcnIgfSA9IHlpZWxkIGNhbGwoYXBpLnBvc3RGb29kcywgYWN0aW9uLmZvb2RzKTtcblxuICAgIGlmIChyZXMgJiYgIWVycikge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMucG9zdEZvb2RzU3VjY2VzcyhyZXMuZGF0YSkpO1xuICAgICAgeWllbGQgZm9yayhoYW5kbGVQb3N0VGFncywgYWN0aW9uLmZvb2RzKTsgLy8g7IOIIEZvb2Tsl5Ag66ee64qUIFRhZ3Mg7LaU6rCAXG4gICAgfSBlbHNlIHtcbiAgICAgIHlpZWxkIHB1dChhY3Rpb25zLnBvc3RGb29kc0ZhaWx1cmUoZXJyLnJlc3BvbnNlLmRhdGEpKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uKiBoYW5kbGVVcGRhdGVGb29kKCkge1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHlpZWxkIHRha2UodHlwZXMuVVBEQVRFX0ZPT0QpO1xuXG4gICAgY29uc3QgeyByZXMsIGVyciB9ID0geWllbGQgY2FsbChhcGkudXBkYXRlRm9vZCwgYWN0aW9uLmZvb2QpO1xuICAgIGlmIChyZXMgJiYgIWVycikge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMudXBkYXRlRm9vZFN1Y2Nlc3MocmVzLmRhdGEpKTtcbiAgICAgIHlpZWxkIGZvcmsoaGFuZGxlUG9zdFRhZ3MsIFthY3Rpb24uZm9vZF0pOyAvLyDsiJjsoJXrkJwgRm9vZOyXkCDrp57ripQgVGFncyDstpTqsIBcbiAgICB9IGVsc2Uge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMudXBkYXRlRm9vZEZhaWx1cmUoZXJyLnJlc3BvbnNlLmRhdGEpKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uKiBnZW5lcmF0ZUZvb2QoZm9vZHMpIHtcbiAgaWYgKGZvb2RzLmxlbmd0aCA9PSAwKSB7XG4gICAgeWllbGQgcHV0KGFjdGlvbnMuZ2V0UmFuZG9tRm9vZEZhaWx1cmUoKSk7XG4gIH0gZWxzZSBpZiAoZm9vZHMubGVuZ3RoID09IDEpIHtcbiAgICB5aWVsZCBwdXQoYWN0aW9ucy5nZXRSYW5kb21Gb29kU3VjY2Vzcyh7IGZvb2Q6IGZvb2RzWzBdIH0pKTtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IE1BWF9SQU5ET007IGkrKykge1xuICAgICAgbGV0IGlzUmFuZG9tID0gaSA9PSBNQVhfUkFORE9NIC0gMSA/IGZhbHNlIDogdHJ1ZTtcbiAgICAgIGxldCByYW5kb20gPVxuICAgICAgICBpID09IE1BWF9SQU5ET00gLSAxXG4gICAgICAgICAgPyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmb29kcy5sZW5ndGgpXG4gICAgICAgICAgOiBpICUgZm9vZHMubGVuZ3RoO1xuICAgICAgeWllbGQgY2FsbChkZWxheSwgMTUwKTtcbiAgICAgIHlpZWxkIHB1dChcbiAgICAgICAgYWN0aW9ucy5nZXRSYW5kb21Gb29kU3VjY2Vzcyh7IGZvb2Q6IGZvb2RzW3JhbmRvbV0sIGlzUmFuZG9tIH0pLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uKiBoYW5kbGVHZXRSYW5kb21Gb29kKCkge1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHlpZWxkIHRha2UodHlwZXMuR0VUX1JBTkRPTV9GT09EKTtcbiAgICBjb25zdCB7IHJlcywgZXJyIH0gPSB5aWVsZCBjYWxsKGFwaS5nZXRGb29kc0J5VGFncywgYWN0aW9uLnRhZ3MpO1xuICAgIGlmIChyZXMgJiYgIWVycikge1xuICAgICAgeWllbGQgZm9yayhnZW5lcmF0ZUZvb2QsIHJlcy5kYXRhLmZvb2RzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMuZ2V0UmFuZG9tRm9vZEZhaWx1cmUoKSk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiogaGFuZGxlR2V0Rm9vZHNCeVNyb2xsKCkge1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHlpZWxkIHRha2UodHlwZXMuR0VUX0ZPT0RTX0JZX1NDUk9MTCk7XG4gICAgY29uc3QgeyByZXMsIGVyciB9ID0geWllbGQgY2FsbChcbiAgICAgIGFwaS5nZXRGb29kc0J5U2Nyb2xsLFxuICAgICAgYWN0aW9uLmlzSW5pdGlhbCxcbiAgICAgIGFjdGlvbi5pZCxcbiAgICApO1xuICAgIGlmIChyZXMgJiYgIWVycikge1xuICAgICAgeWllbGQgcHV0KFxuICAgICAgICBhY3Rpb25zLmdldEZvb2RzQnlTY3JvbGxTdWNjZXNzKHtcbiAgICAgICAgICAuLi5yZXMuZGF0YSxcbiAgICAgICAgICBpc0luaXRpYWw6IGFjdGlvbi5pc0luaXRpYWwsXG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMuZ2V0Rm9vZHNCeVNjcm9sbEZhaWx1cmUoZXJyLnJlc3BvbnNlLmRhdGEpKTtcbiAgICB9XG4gIH1cbn1cbmZ1bmN0aW9uKiBoYW5kbGVHZXRGb29kc0J5U2VhcmNoKCkge1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHlpZWxkIHRha2UodHlwZXMuR0VUX0ZPT0RTX0JZX1NFQVJDSCk7XG4gICAgY29uc3QgeyByZXMsIGVyciB9ID0geWllbGQgY2FsbChhcGkuZ2V0Rm9vZHNCeVNlYXJjaCwgYWN0aW9uLm5hbWUpO1xuICAgIGlmIChyZXMgJiYgIWVycikge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMuZ2V0Rm9vZHNCeVNlYXJjaFN1Y2Nlc3MocmVzLmRhdGEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMuZ2V0Rm9vZHNCeVNlYXJjaEZhaWx1cmUoZXJyLnJlc3BvbnNlLmRhdGEpKTtcbiAgICB9XG4gIH1cbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKiByb290U2FnYSgpIHtcbiAgeWllbGQgYWxsKFtcbiAgICBmb3JrKGhhbmRsZUdldFJhbmRvbUZvb2QpLFxuICAgIGZvcmsoaGFuZGxlR2V0Rm9vZHMpLFxuICAgIGZvcmsoaGFuZGxlR2V0Rm9vZHNCeVNyb2xsKSxcbiAgICBmb3JrKGhhbmRsZUdldEZvb2RCeU5hbWUpLFxuICAgIGZvcmsoaGFuZGxlR2V0Rm9vZHNCeVRhZyksXG4gICAgZm9yayhoYW5kbGVHZXRGb29kc0J5VGFncyksXG4gICAgZm9yayhoYW5kbGVHZXRGb29kc0J5U2VhcmNoKSxcbiAgICBmb3JrKGhhbmRsZVBvc3RGb29kcyksXG4gICAgZm9yayhoYW5kbGVVcGRhdGVGb29kKSxcbiAgXSk7XG59XG4iLCJpbXBvcnQgeyBmb3JrLCBhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xyXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi9lbnZpcm9ubWVudCc7XHJcbmltcG9ydCBmb29kIGZyb20gJy4vZm9vZCc7XHJcbmltcG9ydCB0YWcgZnJvbSAnLi90YWcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qIHJvb3RTYWdhKCkge1xyXG4gIHlpZWxkIGFsbChbXHJcbiAgICBmb3JrKGVudmlyb25tZW50KSxcclxuICAgIGZvcmsoZm9vZCksXHJcbiAgICBmb3JrKHRhZylcclxuICBdKTtcclxufSIsImltcG9ydCB7IGZvcmssIHRha2UsIHB1dCwgY2FsbCwgYWxsLCBkZWxheSB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XG5pbXBvcnQgKiBhcyB0eXBlcyBmcm9tICcuLi9hY3Rpb25zL0FjdGlvblR5cGVzJztcbmltcG9ydCAqIGFzIGFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucy90YWcnO1xuaW1wb3J0ICogYXMgYXBpIGZyb20gJy4uL2FwaS90YWcnO1xuXG5mdW5jdGlvbiogaGFuZGxlR2V0VGFncygpIHtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICB5aWVsZCB0YWtlKHR5cGVzLkdFVF9UQUdTKTtcbiAgICBjb25zdCB7IHJlcywgZXJyIH0gPSB5aWVsZCBjYWxsKGFwaS5nZXRUYWdzKTtcbiAgICBpZiAocmVzICYmICFlcnIpIHtcbiAgICAgIHlpZWxkIHB1dChhY3Rpb25zLmdldFRhZ3NTdWNjZXNzKHJlcy5kYXRhKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHlpZWxkIHB1dChhY3Rpb25zLmdldFRhZ3NGYWlsdXJlKGVyci5yZXNwb25zZS5kYXRhKSk7XG4gICAgfVxuICB9XG59XG5mdW5jdGlvbiogaGFuZGxlR2V0UmFuZG9tVGFncygpIHtcbiAgd2hpbGUgKHRydWUpIHtcbiAgICBjb25zdCBhY3Rpb24gPSB5aWVsZCB0YWtlKHR5cGVzLkdFVF9SQU5ET01fVEFHUyk7XG4gICAgY29uc3QgeyByZXMsIGVyciB9ID0geWllbGQgY2FsbChhcGkuZ2V0UmFuZG9tVGFncywgYWN0aW9uLnNpemUpO1xuICAgIGlmIChyZXMgJiYgIWVycikge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMuZ2V0UmFuZG9tVGFnc1N1Y2Nlc3MocmVzLmRhdGEpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMuZ2V0UmFuZG9tVGFnc0ZhaWx1cmUoZXJyLnJlc3BvbnNlLmRhdGEpKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24qIHJ1blJlcXVlc3RTdWdnZXN0KHdvcmQpIHtcbiAgY29uc3QgeyByZXMsIGVyciB9ID0geWllbGQgY2FsbChhcGkuZ2V0U3VnZ2VzdFRhZ3MsIHdvcmQpO1xuICBpZiAocmVzICYmICFlcnIpIHtcbiAgICB5aWVsZCBwdXQoYWN0aW9ucy5nZXRTdWdnZXN0VGFnc1N1Y2Nlc3MocmVzLmRhdGEpKTtcbiAgfSBlbHNlIHtcbiAgICB5aWVsZCBwdXQoYWN0aW9ucy5nZXRTdWdnZXN0VGFnc0ZhaWx1cmUoZXJyLnJlc3BvbnNlLmRhdGEpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVMYXppbHkobXNlYyA9IDEwMCkge1xuICBsZXQgb25nb2luZztcbiAgcmV0dXJuIGZ1bmN0aW9uKih0YXNrLCAuLi5hcmdzKSB7XG4gICAgaWYgKG9uZ29pbmcgJiYgb25nb2luZy5pc1J1bm5pbmcoKSkge1xuICAgICAgb25nb2luZy5jYW5jZWwoKTtcbiAgICB9XG4gICAgb25nb2luZyA9IHlpZWxkIGZvcmsoZnVuY3Rpb24qKCkge1xuICAgICAgeWllbGQgY2FsbChkZWxheSwgbXNlYyk7XG4gICAgICB5aWVsZCBmb3JrKHRhc2ssIC4uLmFyZ3MpO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiogaGFuZGxlR2V0U3VnZ2VzdFRhZ3MoKSB7XG4gIGNvbnN0IGxhemlseSA9IGNyZWF0ZUxhemlseSgpO1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHlpZWxkIHRha2UodHlwZXMuR0VUX1NVR0dFU1RfVEFHUyk7XG4gICAgeWllbGQgZm9yayhsYXppbHksIHJ1blJlcXVlc3RTdWdnZXN0LCBhY3Rpb24ud29yZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24qIGhhbmRsZVBvc3RUYWdzKCkge1xuICB3aGlsZSAodHJ1ZSkge1xuICAgIGNvbnN0IGFjdGlvbiA9IHlpZWxkIHRha2UodHlwZXMuUE9TVF9UQUdTKTtcbiAgICBjb25zdCB7IHJlcywgZXJyIH0gPSB5aWVsZCBjYWxsKGFwaS5wb3N0VGFncywgYWN0aW9uLnRhZ3MpO1xuICAgIGlmIChyZXMgJiYgIWVycikge1xuICAgICAgeWllbGQgcHV0KGFjdGlvbnMucG9zdFRhZ3NTdWNjZXNzKHJlcy5kYXRhKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHlpZWxkIHB1dChhY3Rpb25zLnBvc3RUYWdzRmFpbHVyZShlcnIucmVzcG9uc2UuZGF0YSkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiogcm9vdFNhZ2EoKSB7XG4gIHlpZWxkIGFsbChbXG4gICAgZm9yayhoYW5kbGVHZXRUYWdzKSxcbiAgICBmb3JrKGhhbmRsZUdldFJhbmRvbVRhZ3MpLFxuICAgIGZvcmsoaGFuZGxlR2V0U3VnZ2VzdFRhZ3MpLFxuICAgIGZvcmsoaGFuZGxlUG9zdFRhZ3MpLFxuICBdKTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZVN0b3JlLCBhcHBseU1pZGRsZXdhcmUgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSBmcm9tICdyZWR1eC1zYWdhJztcclxuaW1wb3J0IHJlZHVjZXIgZnJvbSAnLi9yZWR1Y2Vycyc7XHJcbmltcG9ydCByb290U2FnYSBmcm9tICcuL3NhZ2FzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbmZpZ3VyZVN0b3JlKGluaXRpYWxTdGF0ZSkge1xyXG4gIGNvbnN0IHNhZ2FNaWRkbGV3YXJlID0gY3JlYXRlU2FnYU1pZGRsZXdhcmUoKTtcclxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKFxyXG4gICAgcmVkdWNlcixcclxuICAgIGluaXRpYWxTdGF0ZSxcclxuICAgIGFwcGx5TWlkZGxld2FyZShcclxuICAgICAgc2FnYU1pZGRsZXdhcmVcclxuICAgIClcclxuICApO1xyXG4gIHNhZ2FNaWRkbGV3YXJlLnJ1bihyb290U2FnYSk7XHJcbiAgcmV0dXJuIHN0b3JlO1xyXG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9BcHAuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tOC0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0FwcC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tOC0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0FwcC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzP21vZHVsZXMmaW1wb3J0TG9hZGVycz10cnVlJmxvY2FsSWRlbnROYW1lPVtuYW1lXV9fW2xvY2FsXV9fX1toYXNoOmJhc2U2NDo1XSEuL0F1dG9TdWdnZXN0LmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/bW9kdWxlcyZpbXBvcnRMb2FkZXJzPXRydWUmbG9jYWxJZGVudE5hbWU9W25hbWVdX19bbG9jYWxdX19fW2hhc2g6YmFzZTY0OjVdIS4vQXV0b1N1Z2dlc3QuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/bW9kdWxlcyZpbXBvcnRMb2FkZXJzPXRydWUmbG9jYWxJZGVudE5hbWU9W25hbWVdX19bbG9jYWxdX19fW2hhc2g6YmFzZTY0OjVdIS4vQXV0b1N1Z2dlc3QuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Gb29kQWRkLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Gb29kQWRkLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vRm9vZEFkZC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Gb29kRWRpdC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vRm9vZEVkaXQuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Gb29kRWRpdC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Gb29kSW5mby5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vRm9vZEluZm8uc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Gb29kSW5mby5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9IZWFkZXIuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tOC0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0hlYWRlci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tOC0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL0hlYWRlci5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Nb2RhbC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vTW9kYWwuc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Nb2RhbC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9SZXN1bHQuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tOC0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL1Jlc3VsdC5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tOC0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL1Jlc3VsdC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9SZXN1bHRQYWdlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9SZXN1bHRQYWdlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vUmVzdWx0UGFnZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9UYWdGaW5kZXIuc2Nzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tOC0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL1RhZ0ZpbmRlci5zY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tOC0xIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9saWIvbG9hZGVyLmpzPz9yZWYtLTgtMiEuL1RhZ0ZpbmRlci5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9UYWdMaXN0LnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9UYWdMaXN0LnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vVGFnTGlzdC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9UYWdQYWdlLnNjc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9UYWdQYWdlLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vVGFnUGFnZS5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Ub2FzdC5zY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS04LTEhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2xpYi9sb2FkZXIuanM/P3JlZi0tOC0yIS4vVG9hc3Quc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9yZWYtLTgtMSEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvbGliL2xvYWRlci5qcz8/cmVmLS04LTIhLi9Ub2FzdC5zY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==